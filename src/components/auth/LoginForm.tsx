import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { loginUser } from "../../services/api";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!username.trim() || !password.trim()) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser(username, password);
      dispatch(login({ user: response.user, token: response.token }));
    } catch (err: any) {
      setError(err.response?.data?.message || "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setUsername("admin");
    setPassword("admin");
    setError("");
    setIsLoading(true);

    try {
      const response = await loginUser("admin", "admin");
      dispatch(login({ user: response.user, token: response.token }));
    } catch (err: any) {
      setError(err.response?.data?.message || "데모 로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="figma-container"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--figma-bg-secondary)",
      }}
    >
      <div
        className="figma-card"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "var(--figma-space-8)",
          background: "var(--figma-bg-primary)",
          border: "1px solid var(--figma-border-light)",
          borderRadius: "var(--figma-radius-xl)",
          boxShadow: "var(--figma-shadow-lg)",
        }}
      >
        {/* 로고 */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "var(--figma-space-8)",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "var(--figma-radius-xl)",
              background: "var(--figma-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto var(--figma-space-4)",
              fontSize: "var(--figma-font-size-2xl)",
              fontWeight: "700",
              color: "white",
            }}
          >
            F
          </div>
          <h1
            style={{
              fontSize: "var(--figma-font-size-2xl)",
              fontWeight: "700",
              color: "var(--figma-text-primary)",
              margin: "0 0 var(--figma-space-2)",
            }}
          >
            로그인
          </h1>
          <p
            style={{
              fontSize: "var(--figma-font-size-sm)",
              color: "var(--figma-text-secondary)",
              margin: "0",
            }}
          >
            계정에 로그인하여 시작하세요
          </p>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div
            className="figma-alert figma-alert-error"
            style={{
              marginBottom: "var(--figma-space-4)",
              padding: "var(--figma-space-3)",
              borderRadius: "var(--figma-radius-md)",
              fontSize: "var(--figma-font-size-sm)",
            }}
          >
            {error}
          </div>
        )}

        {/* 로그인 폼 */}
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: "var(--figma-space-6)" }}
        >
          {/* 아이디 입력 */}
          <div style={{ marginBottom: "var(--figma-space-4)" }}>
            <label
              style={{
                display: "block",
                fontSize: "var(--figma-font-size-sm)",
                fontWeight: "500",
                color: "var(--figma-text-primary)",
                marginBottom: "var(--figma-space-2)",
              }}
            >
              아이디
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "var(--figma-space-3)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "var(--figma-font-size-lg)",
                  color: "var(--figma-text-tertiary)",
                }}
              >
                👤
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="figma-input"
                style={{
                  width: "100%",
                  paddingLeft: "var(--figma-space-10)",
                  fontSize: "var(--figma-font-size-sm)",
                }}
                placeholder="아이디를 입력하세요"
              />
            </div>
          </div>

          {/* 비밀번호 입력 */}
          <div style={{ marginBottom: "var(--figma-space-6)" }}>
            <label
              style={{
                display: "block",
                fontSize: "var(--figma-font-size-sm)",
                fontWeight: "500",
                color: "var(--figma-text-primary)",
                marginBottom: "var(--figma-space-2)",
              }}
            >
              비밀번호
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "var(--figma-space-3)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "var(--figma-font-size-lg)",
                  color: "var(--figma-text-tertiary)",
                }}
              >
                🔒
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="figma-input"
                style={{
                  width: "100%",
                  paddingLeft: "var(--figma-space-10)",
                  paddingRight: "var(--figma-space-10)",
                  fontSize: "var(--figma-font-size-sm)",
                }}
                placeholder="비밀번호를 입력하세요"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "var(--figma-space-3)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  fontSize: "var(--figma-font-size-lg)",
                  color: "var(--figma-text-tertiary)",
                  cursor: "pointer",
                  padding: "var(--figma-space-1)",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            disabled={isLoading}
            className="figma-button"
            style={{
              width: "100%",
              fontSize: "var(--figma-font-size-sm)",
              fontWeight: "600",
              padding: "var(--figma-space-3) var(--figma-space-4)",
              marginBottom: "var(--figma-space-4)",
            }}
          >
            {isLoading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  className="figma-loading"
                  style={{ marginRight: "var(--figma-space-2)" }}
                ></div>
                로그인 중...
              </span>
            ) : (
              "로그인"
            )}
          </button>
        </form>

        {/* 데모 로그인 버튼 */}
        <button
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="figma-button figma-button-secondary"
          style={{
            width: "100%",
            fontSize: "var(--figma-font-size-sm)",
            fontWeight: "500",
            padding: "var(--figma-space-3) var(--figma-space-4)",
            marginBottom: "var(--figma-space-6)",
          }}
        >
          데모 로그인 (admin/admin)
        </button>

        {/* 회원가입 링크 */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "var(--figma-font-size-sm)",
              color: "var(--figma-text-secondary)",
              margin: "0",
            }}
          >
            계정이 없으신가요?{" "}
            <a
              href="#"
              style={{
                color: "var(--figma-blue)",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
