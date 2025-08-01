# UF React TypeScript Project

## 🚀 프로젝트 소개

Figma 스타일을 적용한 현대적인 React TypeScript 웹 애플리케이션입니다.

## ✨ 주요 기능

- **Figma 디자인 시스템**: Figma 홈페이지에서 분석한 정확한 디자인 시스템 적용
- **반응형 디자인**: 모바일, 태블릿, PC 완벽 대응
- **Spring Boot 연동**: RESTful API를 통한 백엔드 통신
- **Redux Toolkit**: 상태 관리
- **TypeScript**: 타입 안전성 보장
- **JWT 인증**: 보안 로그인 시스템

## 🎨 디자인 특징

- **Figma 색상 팔레트**: `#18a0fb` (Figma Blue)
- **일관된 간격 시스템**: 4px 단위
- **세련된 그림자 효과**: Figma의 실제 그림자 값
- **접근성 고려**: 포커스, 호버 상태 완벽 구현

## 🛠️ 기술 스택

### Frontend
- **React 18** - 사용자 인터페이스
- **TypeScript** - 타입 안전성
- **Redux Toolkit** - 상태 관리
- **React Router DOM** - 라우팅
- **Vite** - 빌드 도구

### Backend
- **Spring Boot** - RESTful API
- **JWT** - 인증 토큰
- **H2 Database** - 개발용 데이터베이스

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone [your-repository-url]
cd uf-react-ts
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드
```bash
npm run build
```

## 🔧 환경 설정

### 환경 변수
```env
VITE_API_BASE_URL=http://localhost:8080
```

### 백엔드 서버 실행
```bash
# Spring Boot 서버 실행 (별도 터미널)
cd ../uf-spring
./gradlew bootRun
```

## 📱 반응형 브레이크포인트

- **모바일**: `max-width: 767px`
- **태블릿**: `768px - 1023px`
- **PC**: `min-width: 1024px`

## 🎯 주요 컴포넌트

### LoginForm
- Figma 스타일 로그인 폼
- 실시간 유효성 검사
- 데모 로그인 기능 (admin/admin)

### Dashboard
- 사이드바 네비게이션
- 통계 카드
- 최근 활동 목록
- 사용자 정보 패널

## 🎨 Figma 스타일 시스템

### 색상
```css
--figma-blue: #18a0fb
--figma-gray-50: #fafafa
--figma-gray-900: #171717
```

### 간격
```css
--figma-space-1: 4px
--figma-space-4: 16px
--figma-space-8: 32px
```

### 타이포그래피
```css
--figma-font-size-sm: 14px
--figma-font-size-base: 16px
--figma-font-size-lg: 18px
```

## 📁 프로젝트 구조

```
uf-react-ts/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   └── LoginForm.tsx
│   │   ├── Dashboard.tsx
│   │   └── PrivateRoute.tsx
│   ├── store/
│   │   ├── authSlice.ts
│   │   └── index.ts
│   ├── services/
│   │   └── api.ts
│   ├── styles/
│   │   └── figma-inspiration.css
│   ├── types/
│   │   └── auth.ts
│   ├── App.tsx
│   └── index.css
├── public/
├── package.json
└── README.md
```

## 🔐 인증 시스템

### 기본 계정
- **아이디**: `admin`
- **비밀번호**: `admin`

### JWT 토큰
- 로컬 스토리지에 자동 저장
- API 요청 시 자동 헤더 추가
- 토큰 만료 시 자동 로그아웃

## 🚀 배포

### Vercel 배포
```bash
npm run build
# Vercel CLI 또는 GitHub 연동으로 배포
```

### Netlify 배포
```bash
npm run build
# dist 폴더를 Netlify에 업로드
```

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 👨‍💻 개발자

**노경환** - [GitHub](https://github.com/your-username)

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
