import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Main from 'components/Main/Main';
import Layout from 'components/Layout/Layout';
import About from 'components/About/About';
import NotFoundPage from 'components/NotFound/NotFoundPage';
import FormContainer, { IForm } from 'components/Form/FormContainer';
import { routes } from 'helpers/constants/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormContext, IFormContext } from 'state/context';
import { schema } from 'components/Form/FormSchema';
import Detail from 'components/Characters/CharacterDetail';
import { useAppDispatch } from 'redux/hooks';
import { firstCharactersLoad } from 'redux/mainSlice';

function App() {
  const appDispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    appDispatch(firstCharactersLoad());
  }, [appDispatch]);
  return (
    <FormContext.Provider value={{ register, handleSubmit, errors } as IFormContext}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.BASE_URL} element={<Layout />}>
            <Route index element={<Main />} />
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
