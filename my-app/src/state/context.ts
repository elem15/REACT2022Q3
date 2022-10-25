import { createContext } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form/dist/types/form';
import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form/dist/types';
import { IAction, mainState } from 'state/reducer';
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
const dispatch: React.Dispatch<IAction> = ({ type }) => {
  console.log(type);
};
export const MainStateContext = createContext({ mainState, dispatch });
export const FormContext = createContext<IFormContext>({});
