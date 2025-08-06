import React, { useState } from "react";
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
  Tabs,
  Tab,
  Chip,
  IconButton,
} from "@mui/material";
import type { RootState } from "../store";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [tabValue, setTabValue] = useState(0);

  const handleLogout = () => {
    console.log("🚪 로그아웃 시작...");
    dispatch(logout());
    console.log("✅ 로그아웃 완료, 메인 페이지로 이동...");
    navigate("/", { replace: true });
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
              {user?.name?.charAt(0) || "U"}
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
                {user?.name || "사용자"}님의 다락방
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "var(--text-secondary)" }}
              >
                {user?.email}
              </Typography>
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
        {/* 환영 메시지 */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "var(--text-primary)",
              mb: 2,
            }}
          >
            🏠 코몽이네 다락방에 오신 것을 환영합니다!
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "var(--text-secondary)", mb: 3 }}
          >
            소중한 순간들을 기록하고 보관하는 나만의 공간입니다
          </Typography>
        </Box>

        {/* 탭 네비게이션 */}
        <Box
          sx={{ borderBottom: 1, borderColor: "var(--border-light)", mb: 3 }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              "& .MuiTab-root": {
                color: "var(--text-secondary)",
                fontWeight: "bold",
                fontSize: "1.1rem",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "var(--point-coral)",
                  color: "white",
                },
                "&.Mui-selected": {
                  color: "var(--point-coral)",
                  "&:hover": {
                    backgroundColor: "var(--point-coral)",
                    color: "white",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "var(--point-coral)",
              },
            }}
          >
            <Tab label="📝 일기장" />
            <Tab label="📸 사진첩" />
            <Tab label="📊 통계" />
            <Tab label="⚙️ 설정" />
          </Tabs>
        </Box>

        {/* 일기장 탭 */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {/* 새 일기 작성 */}
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
                      ✍️
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
                        새 일기 작성
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--text-secondary)" }}
                      >
                        오늘의 소중한 순간을 기록해보세요
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/diary-write")}
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
                    일기 작성하기
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* 최근 일기 */}
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
                      📖
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
                        최근 일기
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--text-secondary)" }}
                      >
                        최근에 작성한 일기들을 확인하세요
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => navigate("/diary-list")}
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
                    일기 목록 보기
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* 사진첩 탭 */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {/* 사진 업로드 */}
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
                      📷
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
                        사진 업로드
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--text-secondary)" }}
                      >
                        특별한 순간을 사진으로 담아보세요
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
                    사진 업로드
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* 사진 갤러리 */}
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
                      🖼️
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
                        사진 갤러리
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--text-secondary)" }}
                      >
                        업로드한 사진들을 갤러리에서 확인하세요
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
                    갤러리 보기
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* 통계 탭 */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {/* 일기 통계 */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  background: "var(--card-bg-primary)",
                  border: "var(--border-light)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-lg)",
                  transition: "var(--transition-bounce)",
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
                        일기 통계
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--text-secondary)" }}
                      >
                        작성한 일기 수와 활동 기록을 확인하세요
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: "center", py: 2 }}>
                    <Typography
                      variant="h3"
                      sx={{ color: "var(--point-coral)", fontWeight: "bold" }}
                    >
                      0
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      작성한 일기 수
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* 사진 통계 */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  background: "var(--card-bg-primary)",
                  border: "var(--border-light)",
                  borderRadius: "var(--radius-lg)",
                  boxShadow: "var(--shadow-lg)",
                  transition: "var(--transition-bounce)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "var(--shadow-xl)",
                    borderColor: "var(--point-yellow)",
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
                      📈
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
                        사진 통계
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--text-secondary)" }}
                      >
                        업로드한 사진 수와 저장 공간을 확인하세요
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: "center", py: 2 }}>
                    <Typography
                      variant="h3"
                      sx={{ color: "var(--point-cyan)", fontWeight: "bold" }}
                    >
                      0
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "var(--text-secondary)" }}
                    >
                      업로드한 사진 수
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* 설정 탭 */}
        <TabPanel value={tabValue} index={3}>
          <Grid container spacing={3}>
            {/* 프로필 설정 */}
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
                      👤
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
                        프로필 설정
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--text-secondary)" }}
                      >
                        개인정보와 계정 설정을 관리하세요
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
                    프로필 관리
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* 앱 설정 */}
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
                        앱 설정
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "var(--text-secondary)" }}
                      >
                        알림, 테마, 보안 등 앱 설정을 관리하세요
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
        </TabPanel>
      </Box>
    </Box>
  );
};

export default UserDashboard;
