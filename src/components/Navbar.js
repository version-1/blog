import React from 'react';
import {Link} from 'gatsby';

const menus = [
  {to: '/', text: 'Top'},
  {to: '/about', text: 'About'},
  {to: '/programming', text: 'Programming'},
  {to: '/column', text: 'Column'},
  {to: '/contact', text: 'Contact'},
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
          <div className="nav-links">
            <MenuList menus={menus} />
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
