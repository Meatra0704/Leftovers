import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  to,
  type = "button",
  className = "",
  ...props
}) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  );
}
