# 🚀 UF React TypeScript Frontend 개발 가이드

## 📋 프로젝트 개요
**프로젝트명**: UF React TypeScript Frontend  
**기술 스택**: React + TypeScript + Vite + Material-UI + Redux Toolkit  
**백엔드**: Spring Boot API (http://localhost:8080)

---

## 🛠️ 개발 환경 설정

### 1. 의존성 설치
```bash
cd uf-react-ts
npm install
```

### 2. 개발 서버 실행
```bash
npm run dev
```
- 서버가 http://localhost:5173 에서 실행됩니다.

### 3. 빌드
```bash
npm run build
```

---

## 📁 프로젝트 구조

```
src/
├── components/          # 재사용 가능한 컴포넌트
│   ├── auth/           # 인증 관련 컴포넌트
│   ├── posts/          # 게시글 관련 컴포넌트
│   ├── comments/       # 댓글 관련 컴포넌트
│   ├── users/          # 사용자 관련 컴포넌트
│   └── common/         # 공통 컴포넌트
├── pages/              # 페이지 컴포넌트
├── services/           # API 서비스
├── store/              # Redux 상태 관리
├── types/              # TypeScript 타입 정의
└── utils/              # 유틸리티 함수
```

---

## 🔧 주요 기능 구현 계획

### 1. ✅ 완료된 기능
- [x] 프로젝트 초기 설정
- [x] Redux Toolkit 설정
- [x] Material-UI 테마 설정
- [x] React Router 설정
- [x] API 서비스 구조
- [x] 인증 관련 타입 정의
- [x] 로그인 폼 컴포넌트

### 2. 🔄 진행 중인 기능
- [ ] 회원가입 폼
- [ ] 게시글 목록 페이지
- [ ] 게시글 상세 페이지
- [ ] 게시글 작성/수정 폼

### 3. 📋 예정된 기능
- [ ] 댓글 시스템
- [ ] 사용자 프로필
- [ ] 관리자 페이지
- [ ] 파일 업로드
- [ ] 실시간 알림

---

## 🎨 UI/UX 설계

### 색상 팔레트
```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',    // 메인 블루
    },
    secondary: {
      main: '#dc004e',    // 액센트 레드
    },
    background: {
      default: '#f5f5f5', // 배경색
    },
  },
});
```

### 컴포넌트 디자인 원칙
1. **일관성**: Material-UI 컴포넌트 사용
2. **반응형**: 모바일 우선 디자인
3. **접근성**: ARIA 라벨 및 키보드 네비게이션
4. **성능**: React.memo 및 useMemo 최적화

---

## 🔐 인증 시스템

### JWT 토큰 관리
```typescript
// 토큰 자동 저장
localStorage.setItem('token', token);

// API 요청시 자동 포함
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 보호된 라우트
```typescript
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
```

---

## 📊 상태 관리 (Redux)

### Auth Slice
```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

### 주요 액션
- `login`: 로그인 처리
- `register`: 회원가입 처리
- `logout`: 로그아웃 처리
- `clearError`: 에러 초기화

---

## 🌐 API 통신

### Axios 설정
```typescript
const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 에러 처리
```typescript
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 🧪 테스트 전략

### 단위 테스트
```bash
npm run test
```

### 테스트 커버리지
- 컴포넌트 테스트: React Testing Library
- API 테스트: MSW (Mock Service Worker)
- 상태 관리 테스트: Redux Toolkit 테스트

---

## 🚀 배포 전략

### 개발 환경
```bash
npm run dev          # 개발 서버
npm run build        # 프로덕션 빌드
npm run preview      # 빌드 결과 미리보기
```

### 프로덕션 환경
1. **정적 파일 서빙**: Nginx
2. **CDN**: CloudFlare
3. **호스팅**: Vercel/Netlify

---

## 📝 개발 가이드라인

### 1. 코드 스타일
- **TypeScript**: 엄격한 타입 체크
- **ESLint**: 코드 품질 관리
- **Prettier**: 코드 포맷팅

### 2. 컴포넌트 작성 규칙
```typescript
// 1. Props 인터페이스 정의
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

// 2. React.FC 사용
const Component: React.FC<ComponentProps> = ({ title, onAction }) => {
  // 3. 커스텀 훅으로 로직 분리
  const { data, loading } = useCustomHook();
  
  // 4. 조건부 렌더링
  if (loading) return <Loading />;
  
  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};
```

### 3. 폼 처리
```typescript
// React Hook Form + Yup 사용
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: yupResolver(schema),
});
```

---

## 🔗 백엔드 연동

### API 엔드포인트
- **인증**: `/api/auth/*`
- **사용자**: `/api/users/*`
- **게시글**: `/api/posts/*`
- **댓글**: `/api/comments/*`

### CORS 설정
백엔드에서 프론트엔드 도메인 허용 필요:
```java
@CrossOrigin(origins = "http://localhost:5173")
```

---

## 🎯 다음 단계

### 1. 즉시 구현할 기능
- [ ] 회원가입 페이지
- [ ] 게시글 목록 페이지
- [ ] 네비게이션 헤더
- [ ] 사용자 프로필 페이지

### 2. 중기 목표
- [ ] 댓글 시스템
- [ ] 파일 업로드
- [ ] 검색 기능
- [ ] 페이지네이션

### 3. 장기 목표
- [ ] 실시간 채팅
- [ ] 푸시 알림
- [ ] PWA 지원
- [ ] 다국어 지원

---

*작성일: 2025-07-31*  
*프로젝트: UF React TypeScript Frontend* 