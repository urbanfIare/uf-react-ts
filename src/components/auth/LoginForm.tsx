import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { authService } from "../../services/authService";
import type { AppDispatch } from "../../store";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DogIcon from "../common/DogIcon";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // 회원가입 완료 메시지 표시
  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("🔍 로그인 시도 - 보내는 데이터:", { email, password });
      console.log(
        "📧 이메일 길이:",
        email.length,
        "🔑 비밀번호 길이:",
        password.length
      );

      // Redux async thunk를 사용하여 로그인
      const result = await dispatch(login({ email, password }));
      console.log("✅ 로그인 성공 응답:", result);

      // Redux 상태 업데이트 완료 후 리다이렉트
      const userRole = (result.payload as any)?.user?.role;
      if (userRole === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err: unknown) {
      const error = err as {
        response?: {
          status?: number;
          data?: { error?: string; message?: string };
        };
        config?: {
          url?: string;
          data?: string;
        };
      };
      console.error("❌ 로그인 오류:", error);
      console.error("🔍 에러 상세 정보:");
      console.error("- Status:", error.response?.status);
      console.error("- Data:", error.response?.data);
      console.error("- Request URL:", error.config?.url);
      console.error("- Request Data:", error.config?.data);

      setError(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "로그인에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setEmail("admin");
    setPassword("admin");
    setError("");
    setIsLoading(true);

    try {
      console.log("🔍 관리자 로그인 시도...");

      // Redux async thunk를 사용하여 로그인
      const result = await dispatch(
        login({ email: "admin", password: "admin" })
      );
      console.log("✅ 관리자 로그인 성공:", result);

      // Redux 상태 업데이트 완료 후 리다이렉트
      if (result.payload?.user?.role === "ADMIN") {
        console.log("🔄 관리자 대시보드(/dashboard)로 리다이렉트...");
        navigate("/dashboard");
      } else {
        console.log("🔄 일반 사용자 대시보드(/user-dashboard)로 리다이렉트...");
        navigate("/user-dashboard");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      console.error("❌ 관리자 로그인 실패:", error);
      setError(
        error.response?.data?.message || "관리자 로그인에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserDemoLogin = async () => {
    setEmail("user");
    setPassword("user");
    setError("");
    setIsLoading(true);

    try {
      console.log("🔍 테스트 유저 로그인 시도...");

      // Redux async thunk를 사용하여 로그인
      const result = await dispatch(login({ email: "user", password: "user" }));
      console.log("✅ 테스트 유저 로그인 성공:", result);

      // Redux 상태 업데이트 완료 후 리다이렉트
      if (result.payload?.user?.role === "ADMIN") {
        console.log("🔄 관리자 대시보드(/dashboard)로 리다이렉트...");
        navigate("/dashboard");
      } else {
        console.log("🔄 일반 사용자 대시보드(/user-dashboard)로 리다이렉트...");
        navigate("/user-dashboard");
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      console.error("❌ 테스트 유저 로그인 실패:", error);
      setError(
        error.response?.data?.message || "테스트 유저 로그인에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gradient-minimal)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, var(--point-coral) 0%, transparent 70%)",
          opacity: 0.1,
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, var(--point-cyan) 0%, transparent 70%)",
          opacity: 0.1,
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          p: isMobile ? 3 : 4,
          background: "var(--card-bg-primary)",
          border: "var(--border-light)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* 성공 메시지 */}
        {successMessage && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              background: "var(--card-bg-accent)",
              border: "var(--border-light)",
            }}
          >
            {successMessage}
          </Alert>
        )}

        {/* 로고 */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto var(--space-md)",
              width: "64px",
              height: "64px",
              animation: "dogWiggle 3s ease-in-out infinite",
              "@keyframes dogWiggle": {
                "0%": {
                  transform: "rotate(0deg)",
                },
                "25%": {
                  transform: "rotate(-15deg)",
                },
                "50%": {
                  transform: "rotate(0deg)",
                },
                "75%": {
                  transform: "rotate(15deg)",
                },
                "100%": {
                  transform: "rotate(0deg)",
                },
              },
            }}
          >
            <DogIcon variant="sit" size={64} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Pretendard', sans-serif",
              fontWeight: "700",
              color: "var(--text-primary)",
              mb: 1,
              letterSpacing: "-0.02em",
            }}
          >
            로그인
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "var(--text-secondary)",
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            계정에 로그인하여 시작하세요
          </Typography>
        </Box>

        {/* 에러 메시지 */}
        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              background: "var(--card-bg-point)",
              border: "var(--border-point)",
            }}
          >
            {error}
          </Alert>
        )}

        {/* 로그인 폼 */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
          {/* 이메일 입력 */}
          <TextField
            fullWidth
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                borderRadius: "var(--radius-md)",
                fontFamily: "'Pretendard', sans-serif",
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-coral)",
                  },
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-coral)",
                  },
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span style={{ fontSize: "20px" }}>👤</span>
                </InputAdornment>
              ),
            }}
          />

          {/* 비밀번호 입력 */}
          <TextField
            fullWidth
            label="비밀번호"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            sx={{
              mb: 4,
              "& .MuiOutlinedInput-root": {
                borderRadius: "var(--radius-md)",
                fontFamily: "'Pretendard', sans-serif",
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-coral)",
                  },
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-coral)",
                  },
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span style={{ fontSize: "20px" }}>🔒</span>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <span style={{ fontSize: "20px" }}>
                      {showPassword ? "🙈" : "👁️"}
                    </span>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* 로그인 버튼 */}
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            sx={{
              background: "var(--gradient-point)",
              fontFamily: "'Pretendard', sans-serif",
              fontWeight: "600",
              fontSize: "16px",
              py: 1.5,
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-none)",
              transition: "var(--transition-bounce)",
              mb: 3,
              color: "white",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "var(--shadow-point)",
                color: "white",
              },
              "&:disabled": {
                background: "var(--text-muted)",
                color: "white",
              },
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
                로그인 중...
              </Box>
            ) : (
              "로그인"
            )}
          </Button>
        </Box>

        {/* 데모 로그인 버튼들 */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 4,
          }}
        >
          <Button
            onClick={handleDemoLogin}
            disabled={isLoading}
            variant="outlined"
            sx={{
              flex: 1,
              fontFamily: "'Pretendard', sans-serif",
              fontWeight: "500",
              py: 1.5,
              borderRadius: "var(--radius-md)",
              borderColor: "var(--point-coral)",
              color: "var(--point-coral)",
              transition: "var(--transition-normal)",
              "&:hover": {
                backgroundColor: "var(--hover-point)",
                transform: "translateY(-1px)",
              },
            }}
          >
            관리자 로그인
          </Button>
          <Button
            onClick={handleUserDemoLogin}
            disabled={isLoading}
            variant="outlined"
            sx={{
              flex: 1,
              fontFamily: "'Pretendard', sans-serif",
              fontWeight: "500",
              py: 1.5,
              borderRadius: "var(--radius-md)",
              borderColor: "var(--point-cyan)",
              color: "var(--point-cyan)",
              transition: "var(--transition-normal)",
              "&:hover": {
                backgroundColor: "var(--hover-accent)",
                transform: "translateY(-1px)",
              },
            }}
          >
            테스트 유저 로그인
          </Button>
        </Box>

        {/* 회원가입 링크 */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body2"
            sx={{
              color: "var(--text-secondary)",
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            계정이 없으신가요?{" "}
            <Button
              onClick={() => navigate("/register")}
              sx={{
                color: "var(--point-coral)",
                textDecoration: "none",
                fontWeight: "600",
                p: 0,
                minWidth: "auto",
                fontFamily: "'Pretendard', sans-serif",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              회원가입
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
