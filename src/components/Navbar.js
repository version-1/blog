import React from 'react';
import {Link} from 'gatsby';
// import background from '../assets/images/first-view-backimage.svg'

const Navbar = class extends React.Component {
  componentDidMount() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0,
    );
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        });
      });
    }
  }

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
            <ul className="nav-link-list">
              <li className="nav-link-item">
                <Link to="/">Top</Link>
              </li>
              <li className="nav-link-item">
                <Link to="/about">About</Link>
              </li>
              <li className="nav-link-item">
                <Link to="/category/freelance">Freelance</Link>
              </li>
              <li className="nav-link-item">
                <Link to="/category/programming">Programming</Link>
              </li>
              <li className="nav-link-item">
                <Link to="/category/column">Column</Link>
              </li>
              <li className="nav-link-item">
                <Link to="/contanct">Contanct</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
};

export default Navbar;
