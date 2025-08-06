import React from "react";
import { Box, Typography } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  pointColor?: string;
  index?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  pointColor = "var(--accent-blue)",
  index = 0,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const pointColors = [
    "var(--point-coral)",
    "var(--point-yellow)",
    "var(--point-green)",
    "var(--point-orange)",
    "var(--point-pink)",
    "var(--point-cyan)",
  ];

  const currentPointColor =
    pointColor === "var(--accent-blue)"
      ? pointColors[index % pointColors.length]
      : pointColor;

  return (
    <Box
      sx={{
        background: "var(--card-bg-primary)",
        border: "var(--border-light)",
        borderRadius: "var(--radius-lg)",
        p: isMobile ? 3 : 4,
        textAlign: "center",
        transition: "var(--transition-bounce)",
        cursor: "pointer",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: currentPointColor,
          transform: "scaleX(0)",
          transition: "var(--transition-normal)",
          transformOrigin: "left",
        },
        "&:hover": {
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: "var(--shadow-point)",
          borderColor: currentPointColor,
          "&::before": {
            transform: "scaleX(1)",
          },
          "& .icon-container": {
            transform: "scale(1.1) rotate(5deg)",
            background: `linear-gradient(135deg, ${currentPointColor} 0%, ${currentPointColor}80 100%)`,
            color: "white",
          },
          "& .card-title": {
            color: currentPointColor,
          },
        },
      }}
    >
      <Box
        className="icon-container"
        sx={{
          width: isMobile ? "48px" : "56px",
          height: isMobile ? "48px" : "56px",
          borderRadius: "var(--radius-md)",
          background: "var(--primary-gray)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto var(--space-lg)",
          fontSize: isMobile ? "20px" : "24px",
          transition: "var(--transition-bounce)",
          color: "var(--text-secondary)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {icon}
      </Box>

      <Typography
        className="card-title"
        variant="h6"
        sx={{
          fontFamily: "'Pretendard', sans-serif",
          fontWeight: "600",
          mb: 2,
          color: "var(--text-primary)",
          fontSize: isMobile ? "16px" : "18px",
          letterSpacing: "-0.02em",
          transition: "var(--transition-normal)",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: "'Pretendard', sans-serif",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          fontSize: isMobile ? "14px" : "15px",
          letterSpacing: "0.01em",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default FeatureCard;
