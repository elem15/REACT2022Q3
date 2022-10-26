import React, { useEffect, useReducer } from 'react';
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
import { mainState, reducer } from 'state/reducer';
import { FormContext, IFormContext, MainStateContext } from 'state/context';
import { schema } from 'components/Form/FormSchema';
import { ActionKind } from 'helpers/constants/actions';
import Detail from 'components/Characters/CharacterDetail';

const timers = {
  timeout: null as NodeJS.Timeout | null,
};

function App() {
  const [reducerMainState, dispatch] = useReducer(reducer, mainState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const { order, sort, gender, limit } = mainState.state;
    const handleDataLoad = async (page: number) => {
      const { docs, loading, pages, error, errorMessage, total } = await loadCharacters({
        page,
        order,
        sort,
        gender,
        limit,
      });
      dispatch({
        type: ActionKind.LOAD_CHARACTERS_STATE,
        payload: {
          ...mainState.state,
          total,
          loading,
          pages: pages || mainState.state.pages,
          error,
          searchValue: localStorage.getItem('searchValue') || '',
          errorMessage: errorMessage || undefined,
        },
      });
      dispatch({ type: ActionKind.ADD_CHARACTERS, payload: docs });
    };
    handleDataLoad(1);
  }, []);
  return (
    <MainStateContext.Provider value={{ mainState: reducerMainState, dispatch }}>
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
              <Route
                path={routes.NOT_DEFINED}
                element={<Navigate to={routes.NOT_FOUND} replace />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </FormContext.Provider>
    </MainStateContext.Provider>
  );
}

export default App;
