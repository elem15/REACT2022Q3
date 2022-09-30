import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './Layout.css';
const Layout = () => {
  return (
    <div className="layout">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
