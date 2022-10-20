import React, { FormEvent, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ICard } from 'components/Cards/Cards';
import './Form.css';
import FormComponent from './FormComponent';

const addressValidate = (address: string | undefined): boolean => {
  if (address) return address.length > 7 ? true : false;
  return false;
};
const dateValidate = (date: string | undefined): boolean => {
  if (date) {
    const year = new Date(date).getFullYear();
    const currentYear = new Date().getFullYear();
    if (year < 1950 || year > currentYear) return false;
    return true;
  }
  return false;
};
interface IValidateState {
  formIsActive: boolean;
  validate: {
    id: boolean;
    index: boolean;
    isActive: boolean;
    price: boolean;
    picture: boolean;
    houseType: boolean;
    email: boolean;
    phone: boolean;
    about: boolean;
    address: boolean;
    date: boolean;
  };
}
type IState = ICard & IValidateState;
const initialState: IState = {
  id: '',
  isActive: true,
  isUrgent: true,
  price: 0,
  picture: '',
  houseType: '',
  about: '',
  address: '',
  date: '',
  formIsActive: false,
  validate: {
    id: true,
    index: true,
    isActive: true,
    price: true,
    picture: true,
    houseType: true,
    email: true,
    phone: true,
    about: true,
    address: true,
    date: true,
  },
};
type IData = ICard[] | [];
const initialData: IData = [];
const FormPageContainer = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState(initialData);
  const fileRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const houseTypeRef = useRef<HTMLSelectElement>(null);
  const isActiveRef = useRef<HTMLInputElement>(null);
  const isUrgentRef = useRef<HTMLInputElement>(null);

  const handleOnChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target as HTMLInputElement;
    setState((prevState: IState) => {
      const { validate } = prevState;
      return {
        ...prevState,
        formIsActive: true,
        validate: { ...validate, [name]: true },
      };
    });
  };
  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault();
    const address = addressRef.current?.value;
    const date = dateRef.current?.value;
    const price = Number(priceRef.current?.value);
    const houseType = houseTypeRef.current?.value;
    const isActive = !isActiveRef.current?.checked;
    const isUrgent = isUrgentRef.current?.checked;
    const current = fileRef.current as HTMLInputElement;
    const { files } = current;
    const picture = files != null && files[0] ? URL.createObjectURL(files[0]) : '';
    if (!addressValidate(address) || !dateValidate(date) || !addressValidate(houseType)) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          validate: {
            ...prevState.validate,
            address: addressValidate(address),
            date: dateValidate(date),
            houseType: addressValidate(houseType),
          },
          formIsActive: false,
        };
      });
    } else {
      setData([
        ...data,
        {
          id: uuidv4(),
          houseType,
          isUrgent,
          isActive,
          address,
          date,
          picture,
          price,
          about: '',
        } as ICard,
      ]);
    }
  };

  return (
    <FormComponent
      data={data}
      handleOnSubmit={handleOnSubmit}
      handleOnChange={handleOnChange}
      addressValidate={state.validate.address}
      dateValidate={state.validate.date}
      houseTypeValidate={state.validate.houseType}
      formIsActive={state.formIsActive}
      address={addressRef}
      houseType={houseTypeRef}
      isActive={isActiveRef}
      isUrgent={isUrgentRef}
      date={dateRef}
      file={fileRef}
      price={priceRef}
    />
  );
};

export default FormPageContainer;
