import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import "./styles/theme.css";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Dashboard from "./components/Dashboard";
import UserDashboard from "./components/UserDashboard";
import DiaryWritePage from "./components/DiaryWritePage";
import DiaryListPage from "./components/DiaryListPage";
import DiaryEditPage from "./components/DiaryEditPage";
import MainPage from "./components/MainPage";
import PrivateRoute from "./components/PrivateRoute";
import { restoreAuth } from "./store/authSlice";

function AppContent() {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    // 앱 시작 시 로그인 상태 복원
    dispatch(restoreAuth());
    setIsInitialized(true);
  }, [dispatch]);

  // 초기화가 완료될 때까지 로딩 표시
  if (!isInitialized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "var(--gradient-minimal)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "16px" }}>🔄</div>
          <p>앱을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/diary-write"
          element={
            <PrivateRoute>
              <DiaryWritePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/diary-list"
          element={
            <PrivateRoute>
              <DiaryListPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/diary-edit/:id"
          element={
            <PrivateRoute>
              <DiaryEditPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
