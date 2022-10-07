import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Home from 'components/Main/Main';
import Layout from 'components/Layout/Layout';
import About from 'components/About/About';
import NotFoundPage from 'components/NotFound/NotFoundPage';
import FormContainer from 'components/Form/FormPageContainer';

export const FORM = '/form';
export const ABOUT = '/about';
export const NOT_FOUND = '/404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={FORM} element={<FormContainer />} />
          <Route path={ABOUT} element={<About />} />
          <Route path={NOT_FOUND} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
