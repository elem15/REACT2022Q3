import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ICard } from 'components/Cards/Cards';
import './Form.css';
import FormComponent from './FormComponent';
import { FieldValues } from 'react-hook-form';
import { MainStateContext } from 'state/context';
import { ActionKind } from 'helpers/constants/actions';

export interface IForm {
  address: string;
  date: Date;
  price: number;
  houseType: string;
  id: string;
  sold: boolean | null;
  isUrgent: boolean;
  files: FileList | null;
  about: string;
}

const FormPageContainer = () => {
  const { dispatch } = useContext(MainStateContext);

  const submitForm = (formData: FieldValues) => {
    const { address, date, price, houseType, sold, isUrgent, files } = formData as IForm;
    const picture = files != null && files[0] ? URL.createObjectURL(files[0]) : '';
    dispatch({
      type: ActionKind.ADD_CARD,
      payload: {
        id: uuidv4(),
        houseType,
        isUrgent,
        isActive: !sold,
        address,
        date: date.toLocaleDateString(),
        picture,
        price,
        about: '',
      } as ICard,
    });
  };

  return <FormComponent submitForm={submitForm} />;
};

export default FormPageContainer;