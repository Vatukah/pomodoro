import React from "react";
import * as LucideIcons from "lucide-react"; // lightweight modern icon set

interface IconProps {
  name: keyof typeof LucideIcons; // ensures only valid icon names
  label?: string;
  size?: number;
  strokeWidth?:number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  label,
  size = 24,
  color = "currentColor",
  className = "",
  strokeWidth=1.75
}) => {
  const LucideIcon =   LucideIcons[name] as React.FC<{
    size?: number;
    color?: string;
    className?: string;
    strokeWidth?:number
  }>;


  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return <span style={{ color: "red" }}>⚠️</span>;
  }

  return (
    <span
      className={`center-icon ${className}`}
      aria-label={label}
      title={label}
    >
      <LucideIcon size={size} color={color} strokeWidth={strokeWidth}/>
    </span>
  );
};
