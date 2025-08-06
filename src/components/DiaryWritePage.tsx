import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { apiCall } from "../utils/apiUtils";

const DiaryWritePage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [weather, setWeather] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const moodOptions = [
    { emoji: "😊", label: "매우 좋음", value: "VERY_HAPPY" },
    { emoji: "😌", label: "좋음", value: "HAPPY" },
    { emoji: "😐", label: "보통", value: "NORMAL" },
    { emoji: "😢", label: "슬픔", value: "SAD" },
    { emoji: "😭", label: "매우 슬픔", value: "VERY_SAD" },
    { emoji: "😡", label: "화남", value: "ANGRY" },
    { emoji: "😍", label: "신남", value: "EXCITED" },
  ];

  const weatherOptions = [
    { emoji: "☀️", label: "맑음", value: "SUNNY" },
    { emoji: "☁️", label: "흐림", value: "CLOUDY" },
    { emoji: "🌧️", label: "비", value: "RAINY" },
    { emoji: "❄️", label: "눈", value: "SNOWY" },
    { emoji: "💨", label: "바람", value: "WINDY" },
  ];

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    if (!mood || !weather) {
      alert("기분과 날씨를 선택해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await apiCall(
        `http://localhost:8080/api/diaries?authorId=${user?.id}`,
        {
          method: "POST",
          body: JSON.stringify({
            title: title.trim(),
            content: content.trim(),
            weather: weather,
            mood: mood,
            isPrivate: false, // 기본값은 공개
            tags: [], // 태그는 추후 구현
          }),
        }
      );

      await response.json();
      alert("일기가 성공적으로 저장되었습니다!");
      navigate("/user-dashboard");
    } catch (error) {
      console.error("일기 저장 실패:", error);
      alert(
        error instanceof Error ? error.message : "일기 저장에 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (title.trim() || content.trim()) {
      if (confirm("작성 중인 내용이 있습니다. 정말 나가시겠습니까?")) {
        navigate("/user-dashboard");
      }
    } else {
      navigate("/user-dashboard");
    }
  };

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
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              onClick={handleCancel}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                color: "var(--text-primary)",
                cursor: "pointer",
                padding: "8px",
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--point-coral)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              ←
            </button>
            <h1
              style={{
                fontWeight: "bold",
                color: "var(--text-primary)",
                margin: 0,
                fontSize: "1.5rem",
              }}
            >
              ✍️ 새 일기 작성
            </h1>
          </div>

          <button
            onClick={handleSave}
            disabled={isLoading || !title.trim() || !content.trim()}
            style={{
              background: "var(--gradient-point)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor:
                isLoading || !title.trim() || !content.trim()
                  ? "not-allowed"
                  : "pointer",
              opacity: isLoading || !title.trim() || !content.trim() ? 0.6 : 1,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!isLoading && title.trim() && content.trim()) {
                e.currentTarget.style.background =
                  "var(--gradient-point-hover)";
                e.currentTarget.style.color = "var(--point-coral)";
                e.currentTarget.style.border = "1px solid var(--point-coral)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && title.trim() && content.trim()) {
                e.currentTarget.style.background = "var(--gradient-point)";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.border = "none";
              }
            }}
          >
            {isLoading ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "32px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* 날짜 표시 */}
        <div
          style={{
            background: "var(--card-bg-primary)",
            border: "var(--border-light)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
            marginBottom: "24px",
            transition: "var(--transition-bounce)",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "var(--shadow-xl)";
            e.currentTarget.style.borderColor = "var(--point-coral)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-lg)";
            e.currentTarget.style.borderColor = "var(--border-light)";
          }}
        >
          <div style={{ padding: "24px" }}>
            <h2
              style={{
                fontWeight: "bold",
                color: "var(--text-primary)",
                marginBottom: "28px",
                margin: 0,
                fontSize: "1.25rem",
                lineHeight: 1.6,
              }}
            >
              📅{" "}
              {new Date().toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </h2>

            {/* 기분 선택 */}
            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontWeight: "bold",
                  color: "var(--text-primary)",
                  marginBottom: "28px",
                  margin: 0,
                  fontSize: "1rem",
                  lineHeight: 1.5,
                }}
              >
                오늘의 기분은 어땠나요? 😊
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setMood(option.value)}
                    style={{
                      background:
                        mood === option.value
                          ? "var(--gradient-point)"
                          : "var(--card-bg-secondary)",
                      color:
                        mood === option.value ? "white" : "var(--text-primary)",
                      border:
                        mood === option.value ? "none" : "var(--border-light)",
                      cursor: "pointer",
                      padding: "8px 16px",
                      borderRadius: "16px",
                      fontSize: "0.875rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (mood !== option.value) {
                        e.currentTarget.style.background =
                          "var(--card-bg-accent)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (mood !== option.value) {
                        e.currentTarget.style.background =
                          "var(--card-bg-secondary)";
                      }
                    }}
                  >
                    {option.emoji} {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 날씨 선택 */}
            <div>
              <h3
                style={{
                  fontWeight: "bold",
                  color: "var(--text-primary)",
                  marginBottom: "28px",
                  margin: 0,
                  fontSize: "1rem",
                  lineHeight: 1.5,
                }}
              >
                오늘의 날씨는 어땠나요? 🌤️
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {weatherOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setWeather(option.value)}
                    style={{
                      background:
                        weather === option.value
                          ? "var(--gradient-point)"
                          : "var(--card-bg-secondary)",
                      color:
                        weather === option.value
                          ? "white"
                          : "var(--text-primary)",
                      border:
                        weather === option.value
                          ? "none"
                          : "var(--border-light)",
                      cursor: "pointer",
                      padding: "8px 16px",
                      borderRadius: "16px",
                      fontSize: "0.875rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (weather !== option.value) {
                        e.currentTarget.style.background =
                          "var(--card-bg-accent)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (weather !== option.value) {
                        e.currentTarget.style.background =
                          "var(--card-bg-secondary)";
                      }
                    }}
                  >
                    {option.emoji} {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 일기 작성 폼 */}
        <div
          style={{
            background: "var(--card-bg-primary)",
            border: "var(--border-light)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          <div style={{ padding: "32px" }}>
            {/* 제목 입력 */}
            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontWeight: "bold",
                  color: "var(--text-primary)",
                  marginBottom: "28px",
                  margin: 0,
                  fontSize: "1rem",
                  lineHeight: 1.5,
                }}
              >
                📝 일기 제목
              </h3>
              <input
                type="text"
                placeholder="오늘의 제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--card-bg-secondary)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "var(--text-primary)",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--point-coral)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border-light)";
                }}
              />
            </div>

            <hr
              style={{ margin: "24px 0", borderColor: "var(--border-light)" }}
            />

            {/* 내용 입력 */}
            <div>
              <h3
                style={{
                  fontWeight: "bold",
                  color: "var(--text-primary)",
                  marginBottom: "28px",
                  margin: 0,
                  fontSize: "1rem",
                  lineHeight: 1.5,
                }}
              >
                📖 오늘의 이야기
              </h3>
              <textarea
                placeholder="오늘 있었던 일들을 자유롭게 적어보세요..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                style={{
                  width: "100%",
                  background: "var(--card-bg-secondary)",
                  border: "1px solid var(--border-light)",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  color: "var(--text-primary)",
                  fontSize: "1rem",
                  lineHeight: 1.6,
                  resize: "vertical",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--point-coral)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border-light)";
                }}
              />
            </div>
          </div>
        </div>

        {/* 하단 액션 버튼 */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "32px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={handleCancel}
            style={{
              border: "1px solid var(--border-light)",
              color: "var(--text-primary)",
              background: "transparent",
              padding: "12px 24px",
              borderRadius: "8px",
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
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading || !title.trim() || !content.trim()}
            style={{
              background: "var(--gradient-point)",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor:
                isLoading || !title.trim() || !content.trim()
                  ? "not-allowed"
                  : "pointer",
              opacity: isLoading || !title.trim() || !content.trim() ? 0.6 : 1,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (!isLoading && title.trim() && content.trim()) {
                e.currentTarget.style.background =
                  "var(--gradient-point-hover)";
                e.currentTarget.style.color = "var(--point-coral)";
                e.currentTarget.style.border = "1px solid var(--point-coral)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading && title.trim() && content.trim()) {
                e.currentTarget.style.background = "var(--gradient-point)";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.border = "none";
              }
            }}
          >
            {isLoading ? "저장 중..." : "일기 저장"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiaryWritePage;
