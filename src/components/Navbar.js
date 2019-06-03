import React from 'react';
import {Link} from 'gatsby';
import M from 'lib/materialize';
import {rootPath, categoryPath, aboutPath} from 'lib/routes';
import sidenavImage from 'assets/images/sidenav-image.jpg';
import Img from 'components/atoms/Image';

const menus = language => [
  {to: rootPath(language), text: 'Top'},
  {to: aboutPath(language), text: 'About'},
  {to: categoryPath('freelance', language), text: 'Freelance'},
  {to: categoryPath('engineering', language), text: 'Programming'},
  {to: categoryPath('column', language), text: 'Column'},
];

const SideNav = ({amp, list, onClick}) => {
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
      {list.map((menu, idx) => (
        <li className="nav-link-item" key={idx} onClick={onClick}>
          <Link to={menu.to}>{menu.text}</Link>
        </li>
      ))}
    </ul>
  );
};

const MenuList = ({list}) => {
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

const Navbar = class extends React.PureComponent {
  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav');
    this.sidenav = M.Sidenav.init(elems, {})[0];
  }

  onClick = () => {
    this.sidenav.close();
  };

  render() {
    const {amp, language} = this.props;
    const list = menus(language);
    return (
      <div>
        <div
          className="navigation"
          role="navigation"
          aria-label="main-navigation">
          {!amp && (
            <div
              className="menu hide-on-large-only sidenav-trigger"
              data-target="side-out">
              <a href="#!">
                <i className="material-icons menu-icon">menu</i>
              </a>
            </div>
          )}
          <div className="brand-logo">
            <Link to={rootPath(language)}>So Far, So Good</Link>
          </div>
          <div className="nav-links hide-on-med-and-down">
            <MenuList list={list} />
          </div>
        </div>
        <SideNav list={list} amp={amp} onClick={this.onClick} />
      </div>
    );
  }
};

export default Navbar;
