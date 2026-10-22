# 트윈디자인 홈 화면 앱

기존 트윈디자인 근태관리로 연결하는 정적 진입 화면입니다. 앱 본체, 로그인 인증, 근무기록 저장은 기존 Apps Script에서 처리합니다.

## 사용

1. 배포한 GitHub Pages 주소를 휴대폰에서 엽니다.
2. iPhone: Safari 공유 메뉴 → **홈 화면에 추가** → ‘웹 앱으로 열기’가 보이면 켜기 → **추가**.
3. Android: Chrome ⋮ 메뉴 → **설치 및 바로가기 만들기** / **홈 화면에 추가** → **설치** 또는 **추가**. 메뉴명은 버전에 따라 다릅니다.
4. 설치된 트윈디자인 아이콘을 누르면 기존 직원 로그인 화면으로 연결됩니다. 자동 연결이 안 되면 **근무 기록 열기**를 누릅니다.

주소가 다른 Apps Script로 연결될 때는 브라우저 주소 표시줄이나 별도 브라우저 화면이 나타날 수 있습니다. 이 진입 화면을 설치해도 앱 본체의 로그인 유지 기간, Google 안내 표시, 데이터 저장 방식은 바뀌지 않습니다. 근무 기록 조회와 제출에는 인터넷이 필요합니다.

## GitHub Pages 배포

권장: 기존 ‘균형 일지’와 별도로 `twin-attendance` 저장소를 만들고 이 폴더의 파일 전부를 저장소 루트에 업로드합니다.

1. GitHub → 새 저장소 → `twin-attendance` (무료 계정은 Public 저장소 사용).
2. 이 폴더의 HTML, CSS, JS, SVG, PNG, manifest 파일을 함께 업로드하고 커밋합니다. 파일명은 그대로 유지합니다.
3. Settings → Pages → Source **Deploy from a branch** → Branch **main**, 폴더 **/(root)** → Save.
4. Pages 배포가 성공하면 표시된 주소를 엽니다. `mx252525-pixel` 계정에서 위 저장소명을 썼다면 보통 `https://mx252525-pixel.github.io/twin-attendance/`입니다. 실제 완료 여부는 Pages 설정 화면에서 확인하세요.
5. 처음에는 휴대폰 브라우저에서 설치 페이지를 열어 홈 화면에 추가합니다. 기존 근태관리 QR과 `/exec` 주소는 계속 사용할 수 있습니다.

기존 `balance-journal` 저장소를 사용한다면 기존 파일을 덮어쓰지 말고 **attendance/** 하위 폴더에 이 폴더 전체의 파일을 넣습니다. Pages 주소 뒤에 `attendance/`를 붙여 사용합니다. 기존 저장소의 Pages 배포 기준 폴더와 기존 서비스 워커의 경로 처리도 확인해야 합니다.

## 업데이트

- 근태관리 본체 업데이트: 기존 Apps Script 배포의 새 버전을 배포합니다. 기존 `/exec` 주소가 유지되면 이 저장소와 아이콘을 바꿀 필요가 없습니다.
- 이 진입 화면 업데이트: 같은 GitHub 저장소의 같은 경로에 파일을 업데이트합니다. 정적 파일은 온라인에서 다시 확인합니다. 서비스 워커의 설치 자산 목록을 바꾸면 `sw.js`의 캐시 버전 `v1`도 올립니다.
- 연결 주소 변경이 필요한 경우: `index.html`의 `#openApp` 링크만 새 공개 웹앱 주소로 변경합니다. OAuth 콜백의 `code`, `state`, `token` 등 임시 값을 붙이지 않습니다.
- 변경 후 휴대폰에서 진입 화면 재실행과 로그인 연결을 확인합니다.

## 공개하는 파일과 저장 범위

이 폴더는 정적 화면, 로고, 설치 정보, 공개 웹앱 링크만 포함합니다. Apps Script 설치코드, 관리자 비밀번호, OAuth 비밀값, 직원·계좌·급여 자료는 올리지 않습니다.

서비스 워커는 현재 폴더의 지정된 정적 파일만 저장합니다. 다른 사이트 요청, 쿼리가 포함된 요청, 로그인 응답과 근무기록을 캐시하지 않습니다. Google·카카오 로그인은 기존 Apps Script 화면에서 최상위 페이지 이동으로 진행되며 iframe으로 감싸지 않습니다.

## 공식 안내

- [GitHub Pages 배포 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [iPhone 홈 화면 웹 앱 안내](https://support.apple.com/guide/iphone/turn-a-website-into-an-app-iphea86e5236/ios)
- [Android Chrome 웹 앱 설치](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=en)
- [웹 앱 경로와 외부 화면 이동](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest/Reference/scope)
