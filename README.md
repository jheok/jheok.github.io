# GitHub Pages 이력서 템플릿

GitHub Pages를 이용해 호스팅할 수 있는 이력서 템플릿입니다. 두 가지 방식(정적/동적)으로 사용할 수 있습니다.

## 사용 방법

### 1. 준비

이 저장소를 포크(Fork)하거나 다운로드합니다.

### 2. 이력서 정보 수정하기

`config.json` 파일에서 다음 정보를 수정할 수 있습니다:

- 기본 정보 (이름, 소개)
- 연락처 정보 (전화번호, 이메일, 웹사이트)
- 스킬 정보 (카테고리별 기술 스택)
- 경력 정보 (회사, 직책, 담당 업무)
- 프로젝트 정보 (프로젝트명, 기간, 상세 내용, 성과, 사용 기술)
- 자격증 정보 (자격증명, 취득일)
- 학력 정보 (학교, 기간)

### 3. 사용 방식 선택

#### 방식 1: 정적 HTML 생성

1. Node.js가 설치되어 있어야 합니다.
2. 터미널에서 다음 명령어를 실행합니다:
   ```
   node build.js
   ```
3. `resume.html` 파일이 생성됩니다.
4. 이 파일을 `index.html`로 이름을 변경하고 GitHub Pages에 업로드합니다.

#### 방식 2: 동적 로딩 방식

1. `index.html`, `js/main.js`, `css/style.css`, `config.json` 파일을 GitHub Pages에 업로드합니다.
2. 브라우저에서 JavaScript가 실행되면 config.json에서 데이터를 동적으로 불러옵니다.

## GitHub Pages로 배포하기

1. 저장소를 GitHub에 푸시합니다.
2. GitHub 저장소 설정으로 이동합니다.
3. "Pages" 항목으로 이동합니다.
4. "Source" 항목에서 "main" 브랜치를 선택합니다.
5. "Save" 버튼을 클릭합니다.
6. 배포가 완료되면 `https://[사용자명].github.io/[저장소명]` 주소로 접속할 수 있습니다.

## 저장소 구조

```
/
├── index.html         # 동적 템플릿 HTML 파일
├── resume.html        # build.js로 생성된 정적 HTML 파일
├── config.json        # 이력서 정보 설정 파일
├── build.js           # 정적 HTML 생성 스크립트
├── css/
│   └── style.css      # 스타일 파일
└── js/
    └── main.js        # JavaScript 파일
```

## config.json 구조

config.json 파일은 다음과 같은 구조로 되어 있습니다:

```json
{
    "name": "이름",
    "intro": "자기소개",
    "contact": {
        "phone": "전화번호",
        "email": "이메일",
        "website": "웹사이트"
    },
    "skills": [
        {
            "name": "카테고리명",
            "value": "기술 스택"
        }
    ],
    "experience": [
        {
            "company": "회사명",
            "position": "직책",
            "period": "근무 기간",
            "responsibilities": ["담당 업무 1", "담당 업무 2"]
        }
    ],
    "projects": [
        {
            "name": "회사명",
            "period": "프로젝트 기간",
            "title": "프로젝트명",
            "details": ["상세 내용 1", "상세 내용 2"],
            "achievements": ["성과 1", "성과 2"],
            "skills": "사용 기술"
        }
    ],
    "certifications": [
        { "name": "자격증명", "date": "취득일" }
    ],
    "education": [
        { "school": "학교명", "period": "재학 기간" }
    ]
}
```

## 커스터마이징

- `css/style.css` 파일을 수정하여 스타일을 변경할 수 있습니다.
- `build.js` 파일을 수정하여 정적 HTML 생성 방식을 변경할 수 있습니다.
- `js/main.js` 파일을 수정하여 동적 로딩 방식을 변경할 수 있습니다. 