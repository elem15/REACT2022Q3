import { createContext } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form/dist/types';
import { IForm } from 'components/Form/FormContainer';
export interface IFormContext {
  handleSubmit?: UseFormHandleSubmit<FieldValues>;
  register?: UseFormRegister<FieldValues & IForm>;
  errors?: Partial<
    FieldErrorsImpl<{
      [x: string]: string;
    }>
  >;
}
export const FormContext = createContext<IFormContext>({});
