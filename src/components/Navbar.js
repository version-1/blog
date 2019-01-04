import React from 'react';
import {Link} from 'gatsby';
import M from 'materialize-css';
import {rootPath, categoryPath, aboutPath} from '../lib/routes';
import sidenavImage from '../assets/images/sidenav-image.jpg';
import Img from '../components/atoms/Image';

const menus = [
  {to: rootPath(), text: 'Top'},
  {to: aboutPath(), text: 'About'},
  {to: categoryPath('freelance'), text: 'Freelance'},
  {to: categoryPath('engineering'), text: 'Programming'},
  {to: categoryPath('column'), text: 'Column'},
];

const SideNav = ({amp}) => {
  return (
    <ul id="side-out" className="sidenav">
      <li>
        <div className="user-view">
          <div className="background">
            <Img amp={amp} src={sidenavImage} />
          </div>
          <div className="sidenav-title">Menu</div>
        </div>
      </li>
      {menus.map((menu, idx) => (
        <li className="nav-link-item" key={idx}>
          <Link to={menu.to}>{menu.text}</Link>
        </li>
      ))}
    </ul>
  );
};

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

const Navbar = class extends React.PureComponent {
  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }

  render() {
    const { amp } = this.props;
    return (
      <div>
        <div
          className="navigation"
          role="navigation"
          aria-label="main-navigation">
          <div
            className="menu hide-on-large-only sidenav-trigger"
            data-target="side-out">
            <a href="#!">
              <i className="material-icons menu-icon">menu</i>
            </a>
          </div>
          <div className="brand-logo">
            <Link to="/">So Far, So Good</Link>
          </div>
          <div className="nav-links hide-on-med-and-down">
            <MenuList menus={menus} />
          </div>
        </div>
        <SideNav amp={amp} />
      </div>
    );
  }
};

export default Navbar;
