import React from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="container nav__inner">
        <Link className="nav__logo" to="/">
          Home
        </Link>

        <ul className="nav__list">
          <li className="nav__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav__link nav__link--active" : "nav__link"
              }
              to="/recipes"
            >
              Catalog
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav__link nav__link--active" : "nav__link"
              }
              to="/favorites"
            >
              Favorites
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav__link nav__link--active" : "nav__link"
              }
              to="/add"
            >
              Add Recipe
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
