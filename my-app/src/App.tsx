import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Main from 'components/Main/Main';
import Layout from 'components/Layout/Layout';
import About from 'components/About/About';
import NotFoundPage from 'components/NotFound/NotFoundPage';
import FormContainer, { IForm } from 'components/Form/FormContainer';
import { routes } from 'helpers/constants/routes';
import { searchCharacters, loadCharacters } from 'helpers/controllers/getCharacters';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormContext, IFormContext } from 'state/context';
import { schema } from 'components/Form/FormSchema';
import Detail from 'components/Characters/CharacterDetail';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { addCharacters, loadCharactersState } from 'redux/mainSlice';

const timers = {
  timeout: null as NodeJS.Timeout | null,
};

function App() {
  const state = useAppSelector((state) => state.main.state);
  const appDispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const { order, sort, gender, limit } = state;
    const handleDataLoad = async () => {
      const { docs, loading, pages, error, errorMessage, total } = await loadCharacters({
        page: 1,
        order,
        sort,
        gender,
        limit,
      });
      appDispatch(
        loadCharactersState({
          ...state,
          total,
          loading,
          pages: pages || state.pages,
          error,
          searchValue: localStorage.getItem('searchValue') || '',
          errorMessage: errorMessage || undefined,
        })
      );
      appDispatch(addCharacters(docs));
    };
    handleDataLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <FormContext.Provider value={{ register, handleSubmit, errors } as IFormContext}>
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
            <Route path={routes.DETAIL} element={<Detail />} />
            <Route path={routes.FORM} element={<FormContainer />} />
            <Route path={routes.ABOUT} element={<About />} />
            <Route path={routes.NOT_FOUND} element={<NotFoundPage />} />
            <Route path={routes.NOT_DEFINED} element={<Navigate to={routes.NOT_FOUND} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FormContext.Provider>
  );
}

export default App;
