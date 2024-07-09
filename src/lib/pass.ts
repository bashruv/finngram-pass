import path from "path";
import { Readable } from "stream";
import { Member } from "@prisma/client";
import { PKPass } from "passkit-generator";
import { GetObjectCommand } from "@aws-sdk/client-s3";

import { r2 } from "./r2";
import { streamToBuffer } from "@/util/stream-to-buffer";

async function getCert() {
  const wwdrStream = await r2.send(
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: process.env.PASS_WWDR_KEY_NAME,
    })
  );

  const signerCertStream = await r2.send(
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: process.env.PASS_SIGNER_CERT_NAME,
    })
  );

  const signerKeyStream = await r2.send(
    new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: process.env.PASS_SIGNER_KEY_NAME,
    })
  );

  return {
    wwdr: await streamToBuffer(wwdrStream.Body as Readable),
    signerCert: await streamToBuffer(signerCertStream.Body as Readable),
    signerKey: await streamToBuffer(signerKeyStream.Body as Readable),
    signerKeyPassphrase: process.env.PASS_SIGNER_KEY_PASSPHRASE,
  };
}

export async function createPass(userInfo: Member) {
  const certificates = await getCert();

  // 패스 생성
  const pass = await PKPass.from(
    {
      model: path.join(process.cwd(), "src", "assets", "BizCard.pass"),
      certificates,
    },
    {
      serialNumber: userInfo.serial,
      passTypeIdentifier: process.env.PASS_TYPE_IDENTIFIER,
      teamIdentifier: process.env.PASS_TEAM_IDENTIFIER,
      description: `Finngram Inc.\n${userInfo.name}`,
    }
  );

  // 패스 디테일 정보 추가
  pass.headerFields.push({
    key: "position",
    label: "POSITION",
    value: userInfo.position,
  });

  pass.primaryFields.push({
    key: "name",
    label: "NAME",
    value: userInfo.name,
  });

  pass.secondaryFields.push({
    key: "phone",
    label: "TEL",
    value: `+82 10 ${userInfo.phone.slice(0, 4)} ${userInfo.phone.slice(
      -4
    )} (KR)`,
  });

  pass.auxiliaryFields.push(
    {
      key: "email",
      label: "EMAIL",
      value: userInfo.email,
    },
    {
      key: "telegram",
      label: "TELEGRAM",
      value: `@${userInfo.telegram}`,
      textAlignment: "PKTextAlignmentRight",
    }
  );

  pass.backFields.push(
    {
      key: "bf-profile",
      label: "Profile",
      value: `<a href='https://finngram.com/profile/${userInfo.serial}'>Link</a>`,
      dataDetectorTypes: ["PKDataDetectorTypeLink"],
    },
    {
      key: "bf-phone",
      label: "Tel",
      value: `+82 10 ${userInfo.phone.slice(0, 4)} ${userInfo.phone.slice(-4)}`,
      dataDetectorTypes: ["PKDataDetectorTypePhoneNumber"],
    },
    {
      key: "bf-email",
      label: "Email",
      value: userInfo.email,
      dataDetectorTypes: ["PKDataDetectorTypeLink"],
    },
    {
      key: "bf-telegram",
      label: "Telegram",
      value: `<a href='https://t.me/${userInfo.telegram}'>@bashruv</a>`,
      dataDetectorTypes: ["PKDataDetectorTypeLink"],
    }
  );

  // QR 추가
  pass.setBarcodes({
    message: `https://finngram.com/profile/${userInfo.serial}`,
    format: "PKBarcodeFormatQR",
    messageEncoding: "iso-8859-1",
    altText: "Profile Page",
  });

  const buffer = pass.getAsBuffer();

  return buffer;
}
