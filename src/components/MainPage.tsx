import React from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DogIcon from "./common/DogIcon";
import FeatureCard from "./common/FeatureCard";

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: "100vh",
        background: "var(--primary-white)",
        color: "var(--text-primary)",
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
      {/* 미니멀 헤더 */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "var(--primary-white)",
          borderBottom: "var(--border-light)",
          color: "var(--text-primary)",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Toolbar sx={{ py: isMobile ? 1 : 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: "700",
              fontSize: isMobile ? "18px" : "20px",
              fontFamily: "'Pretendard', sans-serif",
              color: "var(--text-primary)",
              display: "flex",
              alignItems: "center",
              gap: 1,
              letterSpacing: "-0.02em",
            }}
          >
            <DogIcon
              variant="sit"
              size={isMobile ? 20 : 24}
              style={{ marginRight: "var(--space-sm)" }}
            />
            코몽이네 다락방
          </Typography>

          {!isMobile && (
            <>
              <Button
                onClick={handleLogin}
                sx={{
                  mr: 2,
                  fontWeight: "500",
                  fontFamily: "'Pretendard', sans-serif",
                  color: "var(--text-secondary)",
                  borderRadius: "var(--radius-md)",
                  px: 3,
                  py: 1,
                  transition: "var(--transition-normal)",
                  "&:hover": {
                    backgroundColor: "var(--hover-light)",
                    color: "var(--point-coral)",
                  },
                }}
              >
                로그인
              </Button>
              <Button
                variant="contained"
                onClick={handleRegister}
                sx={{
                  background: "var(--gradient-point)",
                  fontFamily: "'Pretendard', sans-serif",
                  fontWeight: "600",
                  borderRadius: "var(--radius-md)",
                  px: 3,
                  py: 1,
                  boxShadow: "var(--shadow-none)",
                  transition: "var(--transition-bounce)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "var(--shadow-point)",
                  },
                }}
              >
                회원가입
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* 메인 콘텐츠 */}
      <Container
        maxWidth="lg"
        sx={{
          mt: isMobile ? 3 : 6,
          mb: isMobile ? 3 : 6,
          px: isMobile ? 2 : 4,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* 미니멀 히어로 섹션 */}
        <Box
          sx={{
            textAlign: "center",
            py: isMobile ? 4 : 8,
            px: isMobile ? 2 : 4,
            mb: isMobile ? 4 : 8,
            position: "relative",
          }}
        >
          <Typography
            variant={isMobile ? "h3" : "h1"}
            component="h1"
            sx={{
              fontFamily: "'Pretendard', sans-serif",
              fontWeight: "800",
              fontSize: isMobile ? "32px" : "56px",
              mb: 3,
              color: "var(--text-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                background: "var(--gradient-point)",
                borderRadius: "var(--radius-full)",
              },
            }}
          >
            코몽이네 다락방
          </Typography>

          <Typography
            variant={isMobile ? "h6" : "h4"}
            component="h2"
            sx={{
              fontFamily: "'Pretendard', sans-serif",
              fontWeight: "400",
              fontSize: isMobile ? "18px" : "24px",
              mb: 4,
              color: "var(--text-secondary)",
              letterSpacing: "0.01em",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            소중한 추억을 담는 미니멀한 공간
          </Typography>

          <Button
            variant="contained"
            size={isMobile ? "large" : "large"}
            onClick={handleRegister}
            sx={{
              background: "var(--gradient-point)",
              fontFamily: "'Pretendard', sans-serif",
              fontWeight: "600",
              fontSize: isMobile ? "16px" : "18px",
              px: isMobile ? 4 : 6,
              py: isMobile ? 1.5 : 2,
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-none)",
              transition: "var(--transition-bounce)",
              "&:hover": {
                transform: "translateY(-4px) scale(1.05)",
                boxShadow: "var(--shadow-point)",
              },
            }}
          >
            시작하기
          </Button>
        </Box>

        {/* 미니멀 기능 소개 */}
        <Box sx={{ mb: isMobile ? 6 : 10 }}>
          <Typography
            variant={isMobile ? "h5" : "h3"}
            sx={{
              textAlign: "center",
              mb: isMobile ? 4 : 6,
              fontFamily: "'Pretendard', sans-serif",
              fontWeight: "700",
              color: "var(--text-primary)",
              fontSize: isMobile ? "24px" : "36px",
              letterSpacing: "-0.02em",
            }}
          >
            기능
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(250px, 1fr))",
              gap: isMobile ? 3 : 4,
            }}
          >
            <FeatureCard
              icon="📝"
              title="일기 작성"
              description="하루의 소중한 순간들을 기록해보세요"
              index={0}
            />

            <FeatureCard
              icon="📸"
              title="사진첩"
              description="추억의 사진들을 정리해보세요"
              index={1}
            />

            <FeatureCard
              icon="📅"
              title="날짜별 정리"
              description="시간순으로 정리된 추억들을 확인하세요"
              index={2}
            />

            <FeatureCard
              icon="💝"
              title="추억 공유"
              description="소중한 추억을 가족과 함께 나누세요"
              index={3}
            />
          </Box>
        </Box>

        {/* 미니멀 CTA 섹션 */}
        <Box
          sx={{
            mt: isMobile ? 6 : 10,
            p: isMobile ? 4 : 6,
            background: "var(--primary-gray)",
            borderRadius: "var(--radius-lg)",
            textAlign: "center",
            border: "var(--border-light)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "var(--gradient-point)",
            },
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              fontFamily: "'Pretendard', sans-serif",
              fontWeight: "700",
              color: "var(--text-primary)",
              mb: 3,
              fontSize: isMobile ? "24px" : "32px",
              letterSpacing: "-0.02em",
            }}
          >
            지금 시작하세요
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: "'Pretendard', sans-serif",
              color: "var(--text-secondary)",
              mb: 4,
              fontSize: isMobile ? "16px" : "18px",
              maxWidth: "500px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            무료로 가입하고 미니멀한 다락방에서 새로운 추억을 만들어보세요
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size={isMobile ? "large" : "large"}
              onClick={handleRegister}
              sx={{
                background: "var(--gradient-point)",
                fontFamily: "'Pretendard', sans-serif",
                fontWeight: "600",
                borderRadius: "var(--radius-md)",
                px: isMobile ? 4 : 6,
                py: isMobile ? 1.5 : 2,
                boxShadow: "var(--shadow-none)",
                transition: "var(--transition-bounce)",
                "&:hover": {
                  transform: "translateY(-3px) scale(1.05)",
                  boxShadow: "var(--shadow-point)",
                },
              }}
            >
              회원가입
            </Button>
            <Button
              variant="outlined"
              size={isMobile ? "large" : "large"}
              onClick={handleLogin}
              sx={{
                borderColor: "var(--point-coral)",
                color: "var(--point-coral)",
                fontFamily: "'Pretendard', sans-serif",
                fontWeight: "600",
                borderRadius: "var(--radius-md)",
                px: isMobile ? 4 : 6,
                py: isMobile ? 1.5 : 2,
                transition: "var(--transition-normal)",
                "&:hover": {
                  backgroundColor: "var(--hover-point)",
                  transform: "translateY(-2px)",
                  borderColor: "var(--point-orange)",
                  color: "var(--point-orange)",
                },
              }}
            >
              로그인
            </Button>
          </Box>
        </Box>

        {/* 모바일 플로팅 버튼 */}
        {isMobile && (
          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              left: 20,
              right: 20,
              zIndex: 1000,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              onClick={handleLogin}
              sx={{
                background: "var(--gradient-point)",
                fontFamily: "'Pretendard', sans-serif",
                fontWeight: "600",
                borderRadius: "var(--radius-md)",
                py: 1.5,
                boxShadow: "var(--shadow-lg)",
                transition: "var(--transition-bounce)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "var(--shadow-point)",
                },
              }}
            >
              시작하기
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MainPage;
