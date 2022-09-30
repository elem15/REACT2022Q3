import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div>Ooops ; (</div>
      <div>page not found</div>
      <Link to="/">home</Link>
      <br />
    </div>
  );
};

export default NotFound;
