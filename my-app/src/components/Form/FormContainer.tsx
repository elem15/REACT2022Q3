import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Form.css';
import FormComponent from './FormComponent';
import { FieldValues } from 'react-hook-form';
import { useAppDispatch } from 'redux/hooks';
import { addCard } from 'redux/cardsSlice';

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
  const appDispatch = useAppDispatch();
  const submitForm = (formData: FieldValues) => {
    const { address, date, price, houseType, sold, isUrgent, files } = formData as IForm;
    const picture = files != null && files[0] ? URL.createObjectURL(files[0]) : '';
    appDispatch(
      addCard({
        id: uuidv4(),
        houseType,
        isUrgent,
        isActive: !sold,
        address,
        date: date.toLocaleDateString(),
        picture,
        price,
        about: '',
      })
    );
  };

  return <FormComponent submitForm={submitForm} />;
};

export default FormPageContainer;
