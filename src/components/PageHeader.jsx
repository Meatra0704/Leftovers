import React from "react";
import "./PageHeader.css";

export default function PageHeader({
  title,
  subtitle,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
}) {
  return (
    <header className={`page-header ${className}`.trim()}>
      <h1 className={`page-header__title ${titleClassName}`.trim()}>{title}</h1>
      <p className={`page-header__subtitle ${subtitleClassName}`.trim()}>
        {subtitle}
      </p>
    </header>
  );
}
