import React from 'react';
import {Link} from 'gatsby';
import { rootPath, categoryPath, aboutPath } from '../lib/routes'

const menus = [
  {to: rootPath(), text: 'Top'},
  {to: aboutPath(), text: 'About'},
  {to: categoryPath('freelance'), text: 'Freelance'},
  {to: categoryPath('engineering'), text: 'Programming'},
  {to: categoryPath('column'), text: 'Column'}
];

const MenuList = ({menus}) => {
  return (
    <ul className="nav-link-list">
      {menus.map((menu, idx) => (
        <li className="nav-link-item" key={idx}>
          <Link to={menu.to}>{menu.text}</Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = class extends React.Component {
  render() {
    return (
      <div>
        <div
          className="navigation"
          role="navigation"
          aria-label="main-navigation">
          <div className="brand-logo">
            <Link to="/">So Far, So Good</Link>
          </div>
          <div className="nav-links hide-on-med-and-down">
            <MenuList menus={menus} />
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
