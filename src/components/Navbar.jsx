import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link className="nav__link" to="/">
            Home
          </Link>
        </li>

        <li className="nav__item">
          <Link className="nav__link" to="/recipes">
            Catalog
          </Link>
        </li>

        <li className="nav__item">
          <Link className="nav__link" to="/add">
            Add Recipe
          </Link>
        </li>

        <li className="nav__item">
          <Link className="nav__link" to="/favorites">
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
}
