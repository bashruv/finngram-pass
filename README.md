# Finngram Apple Wallet Pass
주식회사 핀그램의 애플월렛 명함 생성 페이지 소스코드입니다.

## 절차
1. 회사 도메인(finngram.com)의 구글 계정으로 로그인합니다.
2. 로그인된 정보를 바탕으로 데이터를 확인합니다.
   * 정보 존재 시 정보 확인 페이지로 넘어갑니다.
   * 정보 미존재 시 404 에러가 표시됩니다.
3. 애플월렛 패스를 데이터로 생성 → 디바이스로 저장합니다.

## 사용 라이브러리
* [auth.js](https://authjs.dev/) - Google OAuth 기반 JWT 생성 / 인증용으로 사용되었습니다.
* [Prisma](https://www.prisma.io/) - DB 모델 설계 반영 및 데이터 호출용으로 사용되었습니다.
* [pass-generator](https://github.com/alexandercerutti/passkit-generator) - 애플 월렛 패스 생성용으로 사용되었습니다.
