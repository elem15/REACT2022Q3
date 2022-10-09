import { routes } from 'helpers/constants/routes';
import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';
const Layout = () => {
  return (
    <div className="layout">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to={routes.BASE_URL}>Home</Link>
          </li>
          <li>
            <Link to={routes.FORM}>Form</Link>
          </li>
          <li>
            <Link to={routes.ABOUT}>About</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
