import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from 'components/Main/Main';
import Layout from 'components/Layout/Layout';
import About from 'components/About/About';
import NotFoundPage from 'components/NotFound/NotFoundPage';
import FormContainer from 'components/Form/FormContainer-1';
import { routes } from 'helpers/constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.BASE_URL} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={routes.FORM} element={<FormContainer />} />
          <Route path={routes.ABOUT} element={<About />} />
          <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
          <Route path={routes.NOT_DEFINED} element={<Navigate to={routes.NOT_FOUND} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
