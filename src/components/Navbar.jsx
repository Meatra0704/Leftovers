import React from "react";
import { Link } from "react-router-dom";

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
            <Link className="nav__link" to="/recipes">
              Catalog
            </Link>
          </li>

          <li className="nav__item">
            <Link className="nav__link" to="/favorites">
              Favorites
            </Link>
          </li>

          <li className="nav__item">
            <Link className="nav__link" to="/add">
              Add Recipe
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
