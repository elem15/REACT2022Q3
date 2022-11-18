import { routes } from 'helpers/constants/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hooks';
import { createDetailPage } from 'redux/slices/charactersSlice';
import './Characters.css';

interface IProps {
  id: string;
  name: string;
  race: string;
  birth: string;
}
const Character = (props: IProps) => {
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleCreateModal = (id: string) => {
    appDispatch(createDetailPage(id));
    navigate(routes.DETAIL, { replace: false });
  };
  return (
    <div className="card" onClick={() => handleCreateModal(props.id)}>
      <div>
        race: <strong>{props.race}</strong>
      </div>
      <hr />
      <div>
        name: <strong>{props.name}</strong>
      </div>
      <hr />
      <div>
        birth: <strong>{props.birth}</strong>
      </div>
    </div>
  );
};
export default Character;
