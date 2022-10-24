import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Main from 'components/Main/MainAppState';
import Layout from 'components/Layout/Layout';
import About from 'components/About/About';
import NotFoundPage from 'components/NotFound/NotFoundPage';
import FormContainer from 'components/Form/FormContainerAppState';
import { routes } from 'helpers/constants/routes';
import { searchCharacters, loadCharacters } from 'helpers/controllers/getCharacters';

function App() {
  const timers = {
    timeout: null as NodeJS.Timeout | null,
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.BASE_URL} element={<Layout />}>
          <Route
            index
            element={
              <Main
                searchCharacters={searchCharacters}
                loadCharacters={loadCharacters}
                timers={timers}
              />
            }
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
