import React from "react";
import Link from "atoms/Link";
import { rootPath, categoryPath, aboutPath } from "lib/routes";

const menus = language => [
  { to: rootPath(language), text: "Top" },
  { to: aboutPath(language), text: "About" },
  { to: categoryPath("freelance", language), text: "Freelance" },
  { to: categoryPath("engineering", language), text: "Programming" },
  { to: categoryPath("column", language), text: "Column" }
];

const MenuList = ({ list }) => {
  return (
    <ul className="nav-link-list">
      {list.map((menu, idx) => (
        <li className="nav-link-item" key={idx}>
          <Link to={menu.to}>{menu.text}</Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = ({ language }) => {
  const list = menus(language);

  return (
    <div className="navigation-container">
      <div
        className="navigation"
        role="navigation"
        aria-label="main-navigation"
      >
        <div
          className="menu hide-on-large-only sidenav-trigger"
          data-target="side-out"
        >
          <a href="#!">
            <i className="material-icons menu-icon">menu</i>
          </a>
        </div>
        <div className="brand-logo">
          <Link to={rootPath(language)}>So Far, So Tech</Link>
        </div>
        <div className="nav-links hide-on-med-and-down">
          <MenuList list={list} />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Navbar);
