import React from "react";

import PageHeader from "./PageHeader";
import SearchBar from "./SearchBar";

import "./PageBanner.css";

export default function PageBanner({
  title,
  subtitle,
  searchValue,
  onSearchChange,
}) {
  return (
    <div className="page-banner">
      <PageHeader
        className="page-banner__header"
        subtitle={subtitle}
        subtitleClassName="page-banner__subtitle"
        title={title}
        titleClassName="page-banner__title"
      />
      <SearchBar
        className="page-banner__search"
        onChange={onSearchChange}
        value={searchValue}
      />
    </div>
  );
}
