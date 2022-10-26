import { routes } from 'helpers/constants/routes';
import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainStateContext } from 'state/context';

const Detail = () => {
  const { mainState } = useContext(MainStateContext);
  const { modalDoc, page } = mainState.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!modalDoc) {
      navigate(routes.BASE_URL, { replace: false });
    }
  }, [navigate, modalDoc]);

  return (
    <div className="modal">
      <div className="modal-window">
        <div className="modal-header">
          <span>page №{page}</span>
          <Link to={routes.BASE_URL}>back to Main page</Link>
        </div>
        <h1>Character&apos;s detail</h1>
        {modalDoc && (
          <>
            <div>
              race: <strong>{modalDoc.race}</strong>
            </div>
            <hr />
            <div>
              name: <strong>{modalDoc.name}</strong>
            </div>
            <hr />
            <div>
              gender: <strong>{modalDoc.gender}</strong>
            </div>
            <hr />
            <div>
              birth: <strong>{modalDoc.birth}</strong>
            </div>
            <hr />
            <div>
              race: <strong>{modalDoc.race}</strong>
            </div>
            <hr />
            <div>
              spouse: <strong>{modalDoc.spouse}</strong>
            </div>
            <hr />
            <div>
              wikiUrl: <a href={modalDoc.wikiUrl}>{modalDoc.wikiUrl}</a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Detail;
