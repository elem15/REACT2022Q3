import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ICard } from 'components/Cards/Cards';
import './Form.css';
import FormComponent from './FormComponentReactForm';
import { FieldValues } from 'react-hook-form';
import { CardActionKind, FormContext, MainStateContext } from 'App';

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
  const { mainState, dispatch } = useContext(MainStateContext);

  const { register, handleSubmit, errors } = useContext(FormContext);

  const submitForm = (formData: FieldValues) => {
    const { address, date, price, houseType, sold, isUrgent, files } = formData as IForm;
    const picture = files != null && files[0] ? URL.createObjectURL(files[0]) : '';
    dispatch({
      type: CardActionKind.ADD_CARD,
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      register={register}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      handleSubmit={handleSubmit}
      errors={errors}
      submitForm={submitForm}
      data={mainState.cards}
    />
  );
};

export default FormPageContainer;
