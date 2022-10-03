import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div>404</div>
      <hr />
      <div>Ooops ;&nbsp;(</div>
      <div>page not found</div>
      <Link to="/">home</Link>
      <br />
    </div>
  );
};

export default NotFoundPage;
