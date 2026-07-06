import React from "react";
import Button from "./Button";
import "./EmptyState.css";

export default function EmptyState({
  icon: Icon,
  title,
  message,
  linkTo,
  linkText,
}) {
  return (
    <div className="empty-state">
      {Icon && <Icon className="empty-state__icon" size={64}></Icon>}
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__text">{message}</p>

      {linkTo && linkText && (
        <Button to={linkTo} variant="primary">
          {linkText}
        </Button>
      )}
    </div>
  );
}
