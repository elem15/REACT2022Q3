import React, { useReducer, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ICard } from 'components/Cards/Cards';
import './Form.css';
import FormComponent from './FormComponentReactForm';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
type IData = ICard[] | [];
enum CharacterActionKind {
  ADD = 'ADD',
}
interface IAction {
  type: CharacterActionKind;
  payload: ICard;
}
const schema = yup
  .object()
  .shape({
    address: yup.string().required().min(8, 'address must be more than 8 characters'),
    price: yup.number().required().min(10000, 'min cost 10000 $'),
    date: yup
      .date()
      .required()
      .min(new Date('1950-01-01'), 'please start from 1950')
      .max(new Date(), 'future dates are deprecated'),
    houseType: yup.string().required().min(8, 'house type is required'),
  })
  .required();

const initialState: IData = [];
const reducer = (state: IData, action: IAction) => {
  const { type, payload } = action;
  switch (type) {
    case CharacterActionKind.ADD:
      return [...state, payload];
    default:
      return state;
  }
};

const FormPageContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
  });

  const submitForm = (formData: FieldValues) => {
    const { address, date, price, houseType, sold, isUrgent, files } = formData as IForm;
    const picture = files != null && files[0] ? URL.createObjectURL(files[0]) : '';
    dispatch({
      type: CharacterActionKind.ADD,
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

  return (
    <FormComponent
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      submitForm={submitForm}
      data={state}
    />
  );
};

export default FormPageContainer;
