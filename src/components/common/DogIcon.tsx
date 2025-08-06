import React from "react";
import sitIcon from "../../assets/ico/sit.ico";
import sleepIcon from "../../assets/ico/sleep.ico";

interface DogIconProps {
  variant?: "sit" | "sleep";
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DogIcon: React.FC<DogIconProps> = ({
  variant = "sit",
  size = 24,
  className,
  style,
}) => {
  const iconSrc = variant === "sit" ? sitIcon : sleepIcon;

  return (
    <img
      src={iconSrc}
      alt={`코몽이 ${variant === "sit" ? "앉기" : "자기"}`}
      className={className}
      style={{
        width: size,
        height: size,
        objectFit: "contain",
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
        transition: "var(--transition-smooth)",
        ...style,
      }}
    />
  );
};

export default DogIcon;
