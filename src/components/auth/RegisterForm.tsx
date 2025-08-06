import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DogIcon from "../common/DogIcon";

// 아이콘 컴포넌트들
const VisibilityIcon = () => <span style={{ fontSize: "20px" }}>👁️</span>;
const VisibilityOffIcon = () => <span style={{ fontSize: "20px" }}>👁️‍🗨️</span>;
const PersonIcon = () => <span style={{ fontSize: "20px" }}>👤</span>;
const EmailIcon = () => <span style={{ fontSize: "20px" }}>📧</span>;
const LockIcon = () => <span style={{ fontSize: "20px" }}>🔒</span>;
const CakeIcon = () => <span style={{ fontSize: "20px" }}>🎂</span>;
import { authService } from "../../services/authService";

// 유효성 검사 스키마
const schema = yup.object({
  name: yup
    .string()
    .required("이름을 입력해주세요")
    .min(2, "이름은 2자 이상이어야 합니다")
    .max(20, "이름은 20자 이하여야 합니다"),
  email: yup
    .string()
    .required("이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요")
    .min(8, "비밀번호는 8자 이상이어야 합니다")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "비밀번호는 영문 대소문자와 숫자를 포함해야 합니다"
    ),
  confirmPassword: yup
    .string()
    .required("비밀번호 확인을 입력해주세요")
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다"),
  age: yup
    .number()
    .required("나이를 입력해주세요")
    .min(13, "13세 이상이어야 합니다")
    .max(120, "올바른 나이를 입력해주세요"),
});

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const { name, email, password, age } = data;
      await authService.register({ name, email, password, age });

      // 회원가입 성공 시 로그인 페이지로 이동
      navigate("/login", {
        state: { message: "회원가입이 완료되었습니다! 로그인해주세요." },
      });
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } };
      setError(
        error.response?.data?.error || "회원가입 중 오류가 발생했습니다."
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
            "radial-gradient(circle, var(--point-pink) 0%, transparent 70%)",
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
            "radial-gradient(circle, var(--point-green) 0%, transparent 70%)",
          opacity: 0.1,
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          p: isMobile ? 3 : 4,
          background: "var(--card-bg-primary)",
          border: "var(--border-light)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
          position: "relative",
          zIndex: 10,
        }}
      >
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
            <DogIcon variant="sleep" size={64} />
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
            회원가입
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "var(--text-secondary)",
              fontFamily: "'Pretendard', sans-serif",
            }}
          >
            코몽이네 다락방에 가입하고 소중한 추억을 만들어보세요
          </Typography>
        </Box>

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

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            fullWidth
            label="이름"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "var(--radius-md)",
                fontFamily: "'Pretendard', sans-serif",
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-pink)",
                  },
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-pink)",
                  },
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            label="이메일"
            type="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "var(--radius-md)",
                fontFamily: "'Pretendard', sans-serif",
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-pink)",
                  },
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-pink)",
                  },
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            label="비밀번호"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "var(--radius-md)",
                fontFamily: "'Pretendard', sans-serif",
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-pink)",
                  },
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-pink)",
                  },
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            label="비밀번호 확인"
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "var(--radius-md)",
                fontFamily: "'Pretendard', sans-serif",
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-pink)",
                  },
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-pink)",
                  },
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            label="나이"
            type="number"
            {...register("age", { valueAsNumber: true })}
            error={!!errors.age}
            helperText={errors.age?.message}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "var(--radius-md)",
                fontFamily: "'Pretendard', sans-serif",
                "&:hover": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-pink)",
                  },
                },
                "&.Mui-focused": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--point-pink)",
                  },
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CakeIcon />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              background: "var(--gradient-point)",
              fontFamily: "'Pretendard', sans-serif",
              fontWeight: "600",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-none)",
              transition: "var(--transition-bounce)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "var(--shadow-point)",
              },
              "&:disabled": {
                background: "var(--text-muted)",
              },
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
                회원가입 중...
              </Box>
            ) : (
              "회원가입"
            )}
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="body2"
              sx={{
                color: "var(--text-secondary)",
                fontFamily: "'Pretendard', sans-serif",
              }}
            >
              이미 계정이 있으신가요?{" "}
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "var(--point-pink)",
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
                로그인하기
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
