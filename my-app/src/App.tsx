import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Main from 'components/Main/Main';
import Layout from 'components/Layout/Layout';
import About from 'components/About/About';
import NotFoundPage from 'components/NotFound/NotFoundPage';
import FormContainer from 'components/Form/FormContainer';
import { routes } from 'helpers/constants/routes';
// import { searchCharacters, loadCharacters } from 'helpers/controllers/getCharacters';
import { searchCharacters, loadCharacters } from './mockData/mockCharactersLoad';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.BASE_URL} element={<Layout />}>
          <Route
            index
            element={<Main searchCharacters={searchCharacters} loadCharacters={loadCharacters} />}
          />
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
