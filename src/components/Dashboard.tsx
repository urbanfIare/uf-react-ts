import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import type { RootState } from "../store";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* 사이드바 */}
      <div
        className="figma-sidebar"
        style={{
          width: "240px",
          background: "var(--figma-bg-primary)",
          borderRight: "1px solid var(--figma-border-light)",
          padding: "var(--figma-space-6)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 로고 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "var(--figma-space-8)",
            paddingBottom: "var(--figma-space-4)",
            borderBottom: "1px solid var(--figma-border-light)",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "var(--figma-radius-lg)",
              background: "var(--figma-blue)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "var(--figma-font-size-lg)",
              fontWeight: "700",
              color: "white",
              marginRight: "var(--figma-space-3)",
            }}
          >
            F
          </div>
          <span
            style={{
              fontSize: "var(--figma-font-size-lg)",
              fontWeight: "700",
              color: "var(--figma-text-primary)",
            }}
          >
            Figma Style
          </span>
        </div>

        {/* 네비게이션 */}
        <nav style={{ flex: 1 }}>
          <a
            href="#"
            className="figma-sidebar-item active"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "var(--figma-space-3) var(--figma-space-4)",
              color: "var(--figma-blue)",
              textDecoration: "none",
              borderRadius: "var(--figma-radius-md)",
              marginBottom: "var(--figma-space-1)",
              background: "var(--figma-blue-light)",
              fontWeight: "500",
            }}
          >
            <span
              style={{
                marginRight: "var(--figma-space-3)",
                fontSize: "var(--figma-font-size-lg)",
              }}
            >
              📊
            </span>
            대시보드
          </a>
          <a
            href="#"
            className="figma-sidebar-item"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "var(--figma-space-3) var(--figma-space-4)",
              color: "var(--figma-text-secondary)",
              textDecoration: "none",
              borderRadius: "var(--figma-radius-md)",
              marginBottom: "var(--figma-space-1)",
              transition: "all 0.2s ease",
            }}
          >
            <span
              style={{
                marginRight: "var(--figma-space-3)",
                fontSize: "var(--figma-font-size-lg)",
              }}
            >
              👥
            </span>
            사용자 관리
          </a>
          <a
            href="#"
            className="figma-sidebar-item"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "var(--figma-space-3) var(--figma-space-4)",
              color: "var(--figma-text-secondary)",
              textDecoration: "none",
              borderRadius: "var(--figma-radius-md)",
              marginBottom: "var(--figma-space-1)",
              transition: "all 0.2s ease",
            }}
          >
            <span
              style={{
                marginRight: "var(--figma-space-3)",
                fontSize: "var(--figma-font-size-lg)",
              }}
            >
              📝
            </span>
            게시판
          </a>
          <a
            href="#"
            className="figma-sidebar-item"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "var(--figma-space-3) var(--figma-space-4)",
              color: "var(--figma-text-secondary)",
              textDecoration: "none",
              borderRadius: "var(--figma-radius-md)",
              marginBottom: "var(--figma-space-1)",
              transition: "all 0.2s ease",
            }}
          >
            <span
              style={{
                marginRight: "var(--figma-space-3)",
                fontSize: "var(--figma-font-size-lg)",
              }}
            >
              ⚙️
            </span>
            설정
          </a>
        </nav>

        {/* 사용자 정보 */}
        <div
          style={{
            paddingTop: "var(--figma-space-4)",
            borderTop: "1px solid var(--figma-border-light)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "var(--figma-space-3)",
            }}
          >
            <div
              className="figma-avatar"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "var(--figma-blue)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
                fontSize: "var(--figma-font-size-sm)",
                marginRight: "var(--figma-space-3)",
              }}
            >
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <div
                style={{
                  fontSize: "var(--figma-font-size-sm)",
                  fontWeight: "600",
                  color: "var(--figma-text-primary)",
                }}
              >
                {user?.name || "사용자"}
              </div>
              <div
                style={{
                  fontSize: "var(--figma-font-size-xs)",
                  color: "var(--figma-text-tertiary)",
                }}
              >
                {user?.email || "user@example.com"}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="figma-button figma-button-secondary"
            style={{
              width: "100%",
              fontSize: "var(--figma-font-size-sm)",
              fontWeight: "500",
              padding: "var(--figma-space-2) var(--figma-space-3)",
            }}
          >
            로그아웃
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={{ flex: 1, background: "var(--figma-bg-secondary)" }}>
        {/* 헤더 */}
        <header
          className="figma-header"
          style={{
            background: "var(--figma-bg-primary)",
            borderBottom: "1px solid var(--figma-border-light)",
            padding: "var(--figma-space-4) var(--figma-space-6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1
            style={{
              fontSize: "var(--figma-font-size-xl)",
              fontWeight: "700",
              color: "var(--figma-text-primary)",
              margin: "0",
            }}
          >
            대시보드
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--figma-space-3)",
            }}
          >
            <div
              className="figma-badge figma-badge-primary"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "var(--figma-space-1) var(--figma-space-2)",
                background: "var(--figma-blue-light)",
                color: "var(--figma-blue)",
                borderRadius: "var(--figma-radius-sm)",
                fontSize: "var(--figma-font-size-xs)",
                fontWeight: "500",
              }}
            >
              온라인
            </div>
          </div>
        </header>

        {/* 메인 콘텐츠 */}
        <main
          className="figma-main-content"
          style={{
            padding: "var(--figma-space-6)",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* 환영 메시지 */}
          <div style={{ marginBottom: "var(--figma-space-8)" }}>
            <h2
              style={{
                fontSize: "var(--figma-font-size-2xl)",
                fontWeight: "700",
                color: "var(--figma-text-primary)",
                margin: "0 0 var(--figma-space-2)",
              }}
            >
              안녕하세요, {user?.name || "사용자"}님! 👋
            </h2>
            <p
              style={{
                fontSize: "var(--figma-font-size-base)",
                color: "var(--figma-text-secondary)",
                margin: "0",
              }}
            >
              오늘도 좋은 하루 되세요. 시스템 현황을 확인해보세요.
            </p>
          </div>

          {/* 통계 카드 */}
          <div
            className="figma-grid figma-grid-4"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "var(--figma-space-6)",
              marginBottom: "var(--figma-space-8)",
            }}
          >
            <div
              className="figma-card"
              style={{
                padding: "var(--figma-space-6)",
                background: "var(--figma-bg-primary)",
                border: "1px solid var(--figma-border-light)",
                borderRadius: "var(--figma-radius-lg)",
                boxShadow: "var(--figma-shadow-sm)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "var(--figma-space-4)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--figma-radius-lg)",
                    background: "var(--figma-blue-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--figma-font-size-xl)",
                  }}
                >
                  👥
                </div>
                <div
                  className="figma-badge figma-badge-success"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "var(--figma-space-1) var(--figma-space-2)",
                    background: "#dcfce7",
                    color: "#166534",
                    borderRadius: "var(--figma-radius-sm)",
                    fontSize: "var(--figma-font-size-xs)",
                    fontWeight: "500",
                  }}
                >
                  +12%
                </div>
              </div>
              <h3
                style={{
                  fontSize: "var(--figma-font-size-2xl)",
                  fontWeight: "700",
                  color: "var(--figma-text-primary)",
                  margin: "0 0 var(--figma-space-1)",
                }}
              >
                1,234
              </h3>
              <p
                style={{
                  fontSize: "var(--figma-font-size-sm)",
                  color: "var(--figma-text-secondary)",
                  margin: "0",
                }}
              >
                총 사용자 수
              </p>
            </div>

            <div
              className="figma-card"
              style={{
                padding: "var(--figma-space-6)",
                background: "var(--figma-bg-primary)",
                border: "1px solid var(--figma-border-light)",
                borderRadius: "var(--figma-radius-lg)",
                boxShadow: "var(--figma-shadow-sm)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "var(--figma-space-4)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--figma-radius-lg)",
                    background: "#fef3c7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--figma-font-size-xl)",
                  }}
                >
                  📝
                </div>
                <div
                  className="figma-badge figma-badge-warning"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "var(--figma-space-1) var(--figma-space-2)",
                    background: "#fef3c7",
                    color: "#d97706",
                    borderRadius: "var(--figma-radius-sm)",
                    fontSize: "var(--figma-font-size-xs)",
                    fontWeight: "500",
                  }}
                >
                  +8%
                </div>
              </div>
              <h3
                style={{
                  fontSize: "var(--figma-font-size-2xl)",
                  fontWeight: "700",
                  color: "var(--figma-text-primary)",
                  margin: "0 0 var(--figma-space-1)",
                }}
              >
                567
              </h3>
              <p
                style={{
                  fontSize: "var(--figma-font-size-sm)",
                  color: "var(--figma-text-secondary)",
                  margin: "0",
                }}
              >
                총 게시글 수
              </p>
            </div>

            <div
              className="figma-card"
              style={{
                padding: "var(--figma-space-6)",
                background: "var(--figma-bg-primary)",
                border: "1px solid var(--figma-border-light)",
                borderRadius: "var(--figma-radius-lg)",
                boxShadow: "var(--figma-shadow-sm)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "var(--figma-space-4)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--figma-radius-lg)",
                    background: "#dbeafe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--figma-font-size-xl)",
                  }}
                >
                  💬
                </div>
                <div
                  className="figma-badge figma-badge-info"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "var(--figma-space-1) var(--figma-space-2)",
                    background: "#dbeafe",
                    color: "#1e40af",
                    borderRadius: "var(--figma-radius-sm)",
                    fontSize: "var(--figma-font-size-xs)",
                    fontWeight: "500",
                  }}
                >
                  +15%
                </div>
              </div>
              <h3
                style={{
                  fontSize: "var(--figma-font-size-2xl)",
                  fontWeight: "700",
                  color: "var(--figma-text-primary)",
                  margin: "0 0 var(--figma-space-1)",
                }}
              >
                89
              </h3>
              <p
                style={{
                  fontSize: "var(--figma-font-size-sm)",
                  color: "var(--figma-text-secondary)",
                  margin: "0",
                }}
              >
                오늘 댓글 수
              </p>
            </div>

            <div
              className="figma-card"
              style={{
                padding: "var(--figma-space-6)",
                background: "var(--figma-bg-primary)",
                border: "1px solid var(--figma-border-light)",
                borderRadius: "var(--figma-radius-lg)",
                boxShadow: "var(--figma-shadow-sm)",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "var(--figma-space-4)",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "var(--figma-radius-lg)",
                    background: "#dcfce7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "var(--figma-font-size-xl)",
                  }}
                >
                  ⚡
                </div>
                <div
                  className="figma-badge figma-badge-success"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "var(--figma-space-1) var(--figma-space-2)",
                    background: "#dcfce7",
                    color: "#166534",
                    borderRadius: "var(--figma-radius-sm)",
                    fontSize: "var(--figma-font-size-xs)",
                    fontWeight: "500",
                  }}
                >
                  정상
                </div>
              </div>
              <h3
                style={{
                  fontSize: "var(--figma-font-size-2xl)",
                  fontWeight: "700",
                  color: "var(--figma-text-primary)",
                  margin: "0 0 var(--figma-space-1)",
                }}
              >
                99.9%
              </h3>
              <p
                style={{
                  fontSize: "var(--figma-font-size-sm)",
                  color: "var(--figma-text-secondary)",
                  margin: "0",
                }}
              >
                시스템 가동률
              </p>
            </div>
          </div>

          {/* 최근 활동 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "var(--figma-space-6)",
            }}
          >
            <div
              className="figma-card"
              style={{
                padding: "var(--figma-space-6)",
                background: "var(--figma-bg-primary)",
                border: "1px solid var(--figma-border-light)",
                borderRadius: "var(--figma-radius-lg)",
                boxShadow: "var(--figma-shadow-sm)",
              }}
            >
              <h3
                style={{
                  fontSize: "var(--figma-font-size-lg)",
                  fontWeight: "600",
                  color: "var(--figma-text-primary)",
                  margin: "0 0 var(--figma-space-4)",
                }}
              >
                최근 활동
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--figma-space-4)",
                }}
              >
                {[
                  {
                    user: "김철수",
                    action: "새 게시글을 작성했습니다",
                    time: "5분 전",
                    avatar: "김",
                  },
                  {
                    user: "이영희",
                    action: "댓글을 남겼습니다",
                    time: "10분 전",
                    avatar: "이",
                  },
                  {
                    user: "박민수",
                    action: "회원가입을 완료했습니다",
                    time: "15분 전",
                    avatar: "박",
                  },
                  {
                    user: "정수진",
                    action: "프로필을 업데이트했습니다",
                    time: "20분 전",
                    avatar: "정",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "var(--figma-space-3)",
                      borderRadius: "var(--figma-radius-md)",
                      background: "var(--figma-bg-secondary)",
                    }}
                  >
                    <div
                      className="figma-avatar figma-avatar-sm"
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "var(--figma-blue)",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: "600",
                        fontSize: "var(--figma-font-size-xs)",
                        marginRight: "var(--figma-space-3)",
                      }}
                    >
                      {activity.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: "var(--figma-font-size-sm)",
                          fontWeight: "500",
                          color: "var(--figma-text-primary)",
                          marginBottom: "var(--figma-space-1)",
                        }}
                      >
                        {activity.user}
                      </div>
                      <div
                        style={{
                          fontSize: "var(--figma-font-size-xs)",
                          color: "var(--figma-text-secondary)",
                        }}
                      >
                        {activity.action}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: "var(--figma-font-size-xs)",
                        color: "var(--figma-text-tertiary)",
                      }}
                    >
                      {activity.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--figma-space-6)",
              }}
            >
              {/* 사용자 정보 */}
              <div
                className="figma-card"
                style={{
                  padding: "var(--figma-space-6)",
                  background: "var(--figma-bg-primary)",
                  border: "1px solid var(--figma-border-light)",
                  borderRadius: "var(--figma-radius-lg)",
                  boxShadow: "var(--figma-shadow-sm)",
                }}
              >
                <h3
                  style={{
                    fontSize: "var(--figma-font-size-lg)",
                    fontWeight: "600",
                    color: "var(--figma-text-primary)",
                    margin: "0 0 var(--figma-space-4)",
                  }}
                >
                  사용자 정보
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "var(--figma-space-4)",
                  }}
                >
                  <div
                    className="figma-avatar figma-avatar-lg"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "var(--figma-blue)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600",
                      fontSize: "var(--figma-font-size-lg)",
                      marginRight: "var(--figma-space-4)",
                    }}
                  >
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "var(--figma-font-size-base)",
                        fontWeight: "600",
                        color: "var(--figma-text-primary)",
                        marginBottom: "var(--figma-space-1)",
                      }}
                    >
                      {user?.name || "사용자"}
                    </div>
                    <div
                      style={{
                        fontSize: "var(--figma-font-size-sm)",
                        color: "var(--figma-text-secondary)",
                      }}
                    >
                      {user?.email || "user@example.com"}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "var(--figma-space-3) 0",
                    borderTop: "1px solid var(--figma-border-light)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "var(--figma-font-size-sm)",
                        fontWeight: "600",
                        color: "var(--figma-text-primary)",
                      }}
                    >
                      가입일
                    </div>
                    <div
                      style={{
                        fontSize: "var(--figma-font-size-xs)",
                        color: "var(--figma-text-secondary)",
                      }}
                    >
                      2024.01.15
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "var(--figma-font-size-sm)",
                        fontWeight: "600",
                        color: "var(--figma-text-primary)",
                      }}
                    >
                      마지막 로그인
                    </div>
                    <div
                      style={{
                        fontSize: "var(--figma-font-size-xs)",
                        color: "var(--figma-text-secondary)",
                      }}
                    >
                      방금 전
                    </div>
                  </div>
                </div>
              </div>

              {/* 시스템 상태 */}
              <div
                className="figma-card"
                style={{
                  padding: "var(--figma-space-6)",
                  background: "var(--figma-bg-primary)",
                  border: "1px solid var(--figma-border-light)",
                  borderRadius: "var(--figma-radius-lg)",
                  boxShadow: "var(--figma-shadow-sm)",
                }}
              >
                <h3
                  style={{
                    fontSize: "var(--figma-font-size-lg)",
                    fontWeight: "600",
                    color: "var(--figma-text-primary)",
                    margin: "0 0 var(--figma-space-4)",
                  }}
                >
                  시스템 상태
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "var(--figma-space-3)",
                  }}
                >
                  {[
                    { name: "서버", status: "정상", color: "#10b981" },
                    { name: "데이터베이스", status: "정상", color: "#10b981" },
                    { name: "API", status: "정상", color: "#10b981" },
                    { name: "캐시", status: "정상", color: "#10b981" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "var(--figma-space-2) 0",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "var(--figma-font-size-sm)",
                          color: "var(--figma-text-primary)",
                        }}
                      >
                        {item.name}
                      </span>
                      <span
                        style={{
                          fontSize: "var(--figma-font-size-xs)",
                          color: item.color,
                          fontWeight: "500",
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
