import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import type { RootState } from "../store";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    console.log("🚪 로그아웃 시작...");
    dispatch(logout());
    console.log("✅ 로그아웃 완료, 메인 페이지로 이동...");
    navigate("/", { replace: true });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
      {/* 헤더 */}
      <Box
        sx={{
          background: "var(--card-bg-primary)",
          borderBottom: "var(--border-light)",
          p: 3,
          position: "relative",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                background: "var(--gradient-point)",
                width: 48,
                height: 48,
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
            >
              {user?.name?.charAt(0) || "A"}
            </Avatar>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  color: "var(--text-primary)",
                  mb: 0.5,
                }}
              >
                관리자 대시보드
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "var(--text-secondary)" }}
                >
                  {user?.email}
                </Typography>
                <Chip
                  label="관리자"
                  size="small"
                  sx={{
                    background: "var(--gradient-point)",
                    color: "white",
                    fontWeight: "bold",
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              onClick={handleGoHome}
              sx={{
                borderColor: "var(--border-light)",
                color: "var(--text-primary)",
                "&:hover": {
                  borderColor: "var(--point-coral)",
                  color: "var(--point-coral)",
                },
              }}
            >
              🏠 홈으로
            </Button>
            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{
                borderColor: "var(--border-light)",
                color: "var(--text-primary)",
                "&:hover": {
                  borderColor: "var(--point-coral)",
                  color: "var(--point-coral)",
                },
              }}
            >
              🚪 로그아웃
            </Button>
          </Box>
        </Box>
      </Box>

      {/* 메인 콘텐츠 */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          p: 4,
          position: "relative",
          zIndex: 10,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "var(--text-primary)",
            mb: 4,
            textAlign: "center",
          }}
        >
          🛠️ 관리자 대시보드
        </Typography>

        <Grid container spacing={3}>
          {/* 사용자 관리 카드 */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: "var(--card-bg-primary)",
                border: "var(--border-light)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                transition: "var(--transition-bounce)",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "var(--shadow-xl)",
                  borderColor: "var(--point-coral)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "var(--radius-lg)",
                      background: "var(--gradient-point)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 3,
                      fontSize: "32px",
                      color: "white",
                    }}
                  >
                    👥
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "var(--text-primary)",
                        mb: 1,
                      }}
                    >
                      사용자 관리
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      등록된 사용자들을 관리하고 모니터링하세요
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "var(--gradient-point)",
                    color: "white",
                    "&:hover": {
                      background: "var(--gradient-point-hover)",
                      color: "var(--point-coral)",
                      border: "1px solid var(--point-coral)",
                    },
                  }}
                >
                  사용자 목록 보기
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* 콘텐츠 관리 카드 */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: "var(--card-bg-primary)",
                border: "var(--border-light)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                transition: "var(--transition-bounce)",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "var(--shadow-xl)",
                  borderColor: "var(--point-coral)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "var(--radius-lg)",
                      background: "var(--gradient-point)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 3,
                      fontSize: "32px",
                      color: "white",
                    }}
                  >
                    📝
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "var(--text-primary)",
                        mb: 1,
                      }}
                    >
                      콘텐츠 관리
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      사용자들이 작성한 일기와 사진을 관리하세요
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "var(--gradient-point)",
                    color: "white",
                    "&:hover": {
                      background: "var(--gradient-point-hover)",
                      color: "var(--point-coral)",
                      border: "1px solid var(--point-coral)",
                    },
                  }}
                >
                  콘텐츠 관리
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* 통계 카드 */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: "var(--card-bg-primary)",
                border: "var(--border-light)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                transition: "var(--transition-bounce)",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "var(--shadow-xl)",
                  borderColor: "var(--point-coral)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "var(--radius-lg)",
                      background: "var(--gradient-point)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 3,
                      fontSize: "32px",
                      color: "white",
                    }}
                  >
                    📊
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "var(--text-primary)",
                        mb: 1,
                      }}
                    >
                      통계 및 분석
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      플랫폼 사용 통계와 분석 데이터를 확인하세요
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "var(--gradient-point)",
                    color: "white",
                    "&:hover": {
                      background: "var(--gradient-point-hover)",
                      color: "var(--point-coral)",
                      border: "1px solid var(--point-coral)",
                    },
                  }}
                >
                  통계 보기
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* 시스템 설정 카드 */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                background: "var(--card-bg-primary)",
                border: "var(--border-light)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-lg)",
                transition: "var(--transition-bounce)",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "var(--shadow-xl)",
                  borderColor: "var(--point-coral)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "var(--radius-lg)",
                      background: "var(--gradient-point)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mr: 3,
                      fontSize: "32px",
                      color: "white",
                    }}
                  >
                    ⚙️
                  </Box>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "var(--text-primary)",
                        mb: 1,
                      }}
                    >
                      시스템 설정
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      플랫폼 설정과 보안 옵션을 관리하세요
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    background: "var(--gradient-point)",
                    color: "white",
                    "&:hover": {
                      background: "var(--gradient-point-hover)",
                      color: "var(--point-coral)",
                      border: "1px solid var(--point-coral)",
                    },
                  }}
                >
                  설정 관리
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
