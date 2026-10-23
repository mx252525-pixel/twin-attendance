# 트윈디자인 근무 기록

평소 접속: https://mx252525-pixel.github.io/twin-attendance/

홈 화면 첫 설치: https://mx252525-pixel.github.io/twin-attendance/install.html

평소 접속 주소에서는 별도의 버튼을 누르지 않고 기존 직원 로그인 화면으로 자동 연결됩니다. Google·카카오 인증과 근무기록은 기존 Apps Script에서 처리합니다. 이 저장소는 정적 진입 화면과 설치 정보만 제공합니다.

## 홈 화면에 처음 추가하기

**첫 설치할 때는 반드시 위 install.html 주소를 사용하세요.** 평소 접속 주소는 바로 Apps Script로 이동하므로 설치할 페이지에 머무르지 않습니다.

- iPhone: install.html을 Safari로 열기 → 공유 → 홈 화면에 추가 → ‘웹 앱으로 열기’가 보이면 켜기 → 추가.
- Android: install.html을 Chrome으로 열기 → ⋮ 메뉴 → 설치 및 바로가기 만들기 / 홈 화면에 추가 → 설치 또는 추가.
- 설치한 트윈디자인 아이콘을 누르면 직원 로그인 화면으로 연결됩니다. 큰 접속·설치 버튼은 없습니다.
- 이전 버전에서 이미 설치했다면 다시 설치할 필요 없이 같은 아이콘을 사용합니다.

manifest의 id·start_url·scope는 기존과 같은 루트 경로를 유지합니다. 구형 iOS 등에서 설치 안내 주소로 시작하더라도 웹 앱 실행 모드라면 자동 연결합니다.

기기에 따라 외부 Apps Script 화면으로 이동할 때 주소 표시줄이나 브라우저가 나타날 수 있습니다. 실제 휴대폰의 설치 및 로그인 복귀는 기기에서 확인해야 합니다. 근무기록 조회·제출에는 인터넷이 필요합니다.

## 오류 시

인터넷이 끊겼거나 연결이 지연되면 작은 ‘다시 연결’ 링크를 표시합니다. JavaScript를 사용할 수 없는 환경에는 기본 이동 링크를 제공합니다. 메인 화면에서 인증 요청을 직접 생성하거나 OAuth를 감싸지 않습니다.

## 배포와 업데이트

GitHub Pages: main 브랜치, /(root), HTTPS. 파일명을 유지해서 업로드합니다.

- 근태관리 본체 업데이트: 기존 Apps Script 배포를 새 버전으로 업데이트하고 /exec 주소를 유지합니다. 홈 화면 아이콘을 다시 설치할 필요가 없습니다.
- 이 진입 화면 업데이트: 같은 저장소의 같은 파일을 변경합니다. 정적 파일을 바꾸면 sw.js 캐시 버전도 올립니다. 현재 버전은 v2입니다.
- 연결 주소 변경: index.html과 install.html의 retryLink 및 JavaScript 미사용 시의 이동 링크를 같은 공개 웹앱 URL로 변경합니다. OAuth 응답의 code·state·token 등을 URL에 붙이지 않습니다.

## 공개 파일과 캐시

인증 비밀값, 관리자 비밀번호, 직원·계좌·급여 자료, Apps Script 서버 코드는 포함하지 않습니다. 서비스 워커는 이 폴더의 지정된 정적 파일만 저장하고 로그인 응답·근무기록·외부 요청·쿼리 요청을 캐시하지 않습니다. 다른 앱의 캐시는 지우지 않습니다.

## 공식 안내

- [iPhone 홈 화면 웹 앱](https://support.apple.com/guide/iphone/turn-a-website-into-an-app-iphea86e5236/ios)
- [Android Chrome 웹 앱](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=en)
- [GitHub Pages 배포](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [다른 출처로 이동할 때의 웹 앱 범위](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/scope)
