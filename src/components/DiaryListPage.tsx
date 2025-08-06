import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { apiCall } from "../utils/apiUtils";

interface Diary {
  id: number;
  title: string;
  content: string;
  authorName: string;
  authorId: number;
  weather: string;
  mood: string;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrls: string[];
  tags: string[];
}

const DiaryListPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [weatherFilter, setWeatherFilter] = useState("");
  const [moodFilter, setMoodFilter] = useState("");

  const weatherOptions = [
    { label: "전체", value: "" },
    { label: "맑음", value: "SUNNY" },
    { label: "흐림", value: "CLOUDY" },
    { label: "비", value: "RAINY" },
    { label: "눈", value: "SNOWY" },
    { label: "바람", value: "WINDY" },
  ];

  const moodOptions = [
    { label: "전체", value: "" },
    { label: "매우 좋음", value: "VERY_HAPPY" },
    { label: "좋음", value: "HAPPY" },
    { label: "보통", value: "NORMAL" },
    { label: "슬픔", value: "SAD" },
    { label: "매우 슬픔", value: "VERY_SAD" },
    { label: "화남", value: "ANGRY" },
    { label: "신남", value: "EXCITED" },
  ];

  useEffect(() => {
    fetchDiaries();
  }, []);

  const fetchDiaries = async () => {
    if (!user?.id) {
      console.log("사용자 정보가 없습니다:", user);
      return;
    }

    try {
      console.log("API 호출 시작 - 사용자 ID:", user.id);
      console.log("저장된 토큰:", localStorage.getItem("token"));

      const response = await apiCall(
        `http://localhost:8080/api/diaries/author/${user.id}`
      );
      const data = await response.json();
      setDiaries(data);
    } catch (error) {
      console.error("일기 목록 조회 오류:", error);
      alert(
        "일기 목록을 불러오는데 실패했습니다: " +
          (error instanceof Error ? error.message : "알 수 없는 오류")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleViewDiary = (diary: Diary) => {
    setSelectedDiary(diary);
    setDialogOpen(true);
  };

  const handleEditDiary = (diaryId: number) => {
    navigate(`/diary-edit/${diaryId}`);
  };

  const handleDeleteDiary = async (diaryId: number) => {
    if (!confirm("정말로 이 일기를 삭제하시겠습니까?")) return;

    try {
      await apiCall(`http://localhost:8080/api/diaries/${diaryId}`, {
        method: "DELETE",
      });
      alert("일기가 삭제되었습니다.");
      fetchDiaries();
    } catch (error) {
      console.error("일기 삭제 오류:", error);
      alert("일기 삭제에 실패했습니다.");
    }
  };

  const handleSearch = async () => {
    if (!user?.id) return;

    try {
      const params = new URLSearchParams({
        authorId: user.id.toString(),
        ...(searchKeyword && { keyword: searchKeyword }),
        ...(weatherFilter && { weather: weatherFilter }),
        ...(moodFilter && { mood: moodFilter }),
      });

      const response = await apiCall(
        `http://localhost:8080/api/diaries/search?${params}`
      );
      const data = await response.json();
      setDiaries(data);
    } catch (error) {
      console.error("일기 검색 오류:", error);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);

      // 유효한 날짜인지 확인
      if (isNaN(date.getTime())) {
        console.error("Invalid date string:", dateString);
        return "날짜 정보 없음";
      }

      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error(
        "Date formatting error:",
        error,
        "for dateString:",
        dateString
      );
      return "날짜 정보 없음";
    }
  };

  const getWeatherEmoji = (weather: string) => {
    const weatherMap: { [key: string]: string } = {
      SUNNY: "☀️",
      CLOUDY: "☁️",
      RAINY: "🌧️",
      SNOWY: "❄️",
      WINDY: "💨",
    };
    return weatherMap[weather] || "🌤️";
  };

  const getMoodEmoji = (mood: string) => {
    const moodMap: { [key: string]: string } = {
      VERY_HAPPY: "😊",
      HAPPY: "😌",
      NORMAL: "😐",
      SAD: "😢",
      VERY_SAD: "😭",
      ANGRY: "😡",
      EXCITED: "😍",
    };
    return moodMap[mood] || "😐";
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <p>일기 목록을 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--gradient-minimal)",
        position: "relative",
      }}
    >
      {/* 배경 장식 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, var(--point-coral) 0%, transparent 70%)",
          opacity: 0.1,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, var(--point-cyan) 0%, transparent 70%)",
          opacity: 0.1,
          zIndex: 0,
        }}
      />

      {/* 헤더 */}
      <div
        style={{
          background: "var(--card-bg-primary)",
          borderBottom: "var(--border-light)",
          padding: "24px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
              color: "var(--text-primary)",
              margin: 0,
              fontSize: "2rem",
            }}
          >
            📖 내 일기장
          </h1>
          <button
            onClick={() => navigate("/diary-write")}
            style={{
              background: "var(--gradient-point)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gradient-point-hover)";
              e.currentTarget.style.color = "var(--point-coral)";
              e.currentTarget.style.border = "1px solid var(--point-coral)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--gradient-point)";
              e.currentTarget.style.color = "white";
              e.currentTarget.style.border = "none";
            }}
          >
            ➕ 새 일기 작성
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* 검색 필터 */}
        <div
          style={{
            marginBottom: "32px",
            background: "var(--card-bg-primary)",
            border: "var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
          }}
        >
          <h2
            style={{
              marginBottom: "16px",
              fontWeight: "bold",
              color: "var(--text-primary)",
              margin: 0,
              fontSize: "1.25rem",
            }}
          >
            🔍 일기 검색
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              placeholder="제목이나 내용으로 검색"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid var(--border-light)",
                borderRadius: "8px",
                background: "var(--card-bg-secondary)",
                color: "var(--text-primary)",
              }}
            />
            <select
              value={weatherFilter}
              onChange={(e) => setWeatherFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid var(--border-light)",
                borderRadius: "8px",
                background: "var(--card-bg-secondary)",
                color: "var(--text-primary)",
              }}
            >
              {weatherOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              value={moodFilter}
              onChange={(e) => setMoodFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "1px solid var(--border-light)",
                borderRadius: "8px",
                background: "var(--card-bg-secondary)",
                color: "var(--text-primary)",
              }}
            >
              {moodOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={handleSearch}
              style={{
                width: "100%",
                background: "var(--gradient-point)",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "var(--gradient-point-hover)";
                e.currentTarget.style.color = "var(--point-coral)";
                e.currentTarget.style.border = "1px solid var(--point-coral)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--gradient-point)";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.border = "none";
              }}
            >
              검색하기
            </button>
          </div>
        </div>

        {/* 일기 목록 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "24px",
          }}
        >
          {diaries.map((diary) => (
            <div
              key={diary.id}
              style={{
                background: "var(--card-bg-primary)",
                border: "var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "var(--shadow-xl)";
                e.currentTarget.style.borderColor = "var(--point-coral)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                e.currentTarget.style.borderColor = "var(--border-light)";
              }}
              onClick={() => handleViewDiary(diary)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1.25rem",
                    fontWeight: "bold",
                    color: "var(--text-primary)",
                    flex: 1,
                  }}
                >
                  {diary.title}
                </h3>
                {diary.isPrivate && (
                  <span
                    style={{
                      background: "var(--point-coral)",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      marginLeft: "8px",
                    }}
                  >
                    비공개
                  </span>
                )}
              </div>

              <p
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "16px",
                  lineHeight: 1.5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {diary.content}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span style={{ fontSize: "1.25rem" }}>
                    {getWeatherEmoji(diary.weather)}
                  </span>
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {diary.weather}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span style={{ fontSize: "1.25rem" }}>
                    {getMoodEmoji(diary.mood)}
                  </span>
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {diary.mood}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    color: "var(--text-tertiary)",
                    fontSize: "0.875rem",
                  }}
                >
                  {formatDate(diary.createdAt)}
                </span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditDiary(diary.id);
                    }}
                    style={{
                      background: "var(--card-bg-secondary)",
                      border: "1px solid var(--border-light)",
                      color: "var(--text-primary)",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--point-coral)";
                      e.currentTarget.style.color = "var(--point-coral)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-light)";
                      e.currentTarget.style.color = "var(--text-primary)";
                    }}
                  >
                    수정
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteDiary(diary.id);
                    }}
                    style={{
                      background: "var(--card-bg-secondary)",
                      border: "1px solid var(--border-light)",
                      color: "var(--text-danger)",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--text-danger)";
                      e.currentTarget.style.background = "var(--text-danger)";
                      e.currentTarget.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border-light)";
                      e.currentTarget.style.background =
                        "var(--card-bg-secondary)";
                      e.currentTarget.style.color = "var(--text-danger)";
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {diaries.length === 0 && !loading && (
          <div
            style={{
              textAlign: "center",
              padding: "64px 24px",
              color: "var(--text-secondary)",
            }}
          >
            <p style={{ fontSize: "1.25rem", marginBottom: "16px" }}>
              아직 작성된 일기가 없습니다.
            </p>
            <button
              onClick={() => navigate("/diary-write")}
              style={{
                background: "var(--gradient-point)",
                color: "white",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "var(--gradient-point-hover)";
                e.currentTarget.style.color = "var(--point-coral)";
                e.currentTarget.style.border = "1px solid var(--point-coral)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--gradient-point)";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.border = "none";
              }}
            >
              첫 번째 일기 작성하기
            </button>
          </div>
        )}
      </div>

      {/* 일기 상세 보기 모달 */}
      {dialogOpen && selectedDiary && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setDialogOpen(false)}
        >
          <div
            style={{
              background: "var(--card-bg-primary)",
              borderRadius: "var(--radius-lg)",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: "24px",
                borderBottom: "var(--border-light)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  color: "var(--text-primary)",
                  fontSize: "1.5rem",
                }}
              >
                {selectedDiary.title}
              </h2>
              {selectedDiary.isPrivate && (
                <span
                  style={{
                    background: "var(--point-coral)",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "0.75rem",
                  }}
                >
                  비공개
                </span>
              )}
            </div>

            <div style={{ padding: "24px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span style={{ fontSize: "1.5rem" }}>
                    {getWeatherEmoji(selectedDiary.weather)}
                  </span>
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {selectedDiary.weather}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <span style={{ fontSize: "1.5rem" }}>
                    {getMoodEmoji(selectedDiary.mood)}
                  </span>
                  <span
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                    }}
                  >
                    {selectedDiary.mood}
                  </span>
                </div>
              </div>

              <p
                style={{
                  marginBottom: "16px",
                  lineHeight: 1.6,
                  color: "var(--text-primary)",
                }}
              >
                {selectedDiary.content}
              </p>

              {selectedDiary.tags && selectedDiary.tags.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: "4px",
                    marginBottom: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  {selectedDiary.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        background: "var(--card-bg-secondary)",
                        color: "var(--text-primary)",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  margin: 0,
                }}
              >
                작성일: {formatDate(selectedDiary.createdAt)}
              </p>
            </div>

            <div
              style={{
                padding: "24px",
                borderTop: "var(--border-light)",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                onClick={() => setDialogOpen(false)}
                style={{
                  border: "1px solid var(--border-light)",
                  color: "var(--text-primary)",
                  background: "transparent",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--point-coral)";
                  e.currentTarget.style.color = "var(--point-coral)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-light)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
              >
                닫기
              </button>
              <button
                onClick={() => {
                  setDialogOpen(false);
                  handleEditDiary(selectedDiary.id);
                }}
                style={{
                  background: "var(--gradient-point)",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "var(--gradient-point-hover)";
                  e.currentTarget.style.color = "var(--point-coral)";
                  e.currentTarget.style.border = "1px solid var(--point-coral)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--gradient-point)";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.border = "none";
                }}
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiaryListPage;
