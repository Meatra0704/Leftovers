import { BookOpen, Heart, HomeIcon, PlusCircle } from "lucide-react";
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
          <li className="nav__item nav__item--mobile">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav__link nav__link--active" : "nav__link"
              }
              to="/"
            >
              <HomeIcon className="nav__icon" size={22} />
              <span className="nav__text">Home</span>
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav__link nav__link--active" : "nav__link"
              }
              to="/recipes"
            >
              <BookOpen className="nav__icon" size={22} />
              <span className="nav__text">Catalog</span>
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav__link nav__link--active" : "nav__link"
              }
              to="/favorites"
            >
              <Heart className="nav__icon" size={22} />
              <span className="nav__text">Favorites</span>
            </NavLink>
          </li>

          <li className="nav__item">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav__link nav__link--active" : "nav__link"
              }
              to="/add"
            >
              <PlusCircle className="nav__icon" size={22} />
              <span className="nav__text">Add Recipe</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
