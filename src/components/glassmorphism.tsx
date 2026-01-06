import React from "react";

export const Glassmorphism: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="glass">{children}</div>;
};
