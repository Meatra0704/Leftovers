import React from "react";
import "./SearchBar.css";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className,
}) {
  return (
    <input
      className={`search-bar ${className}`}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type="search"
      value={value}
    />
  );
}
