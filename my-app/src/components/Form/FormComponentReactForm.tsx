import Cards from 'components/Cards/Cards';
import React, { useContext } from 'react';
import { FieldValues } from 'react-hook-form/dist/types';
import './Form.css';
import { FormContext, MainStateContext } from 'App';

interface IFormComponentProps {
  submitForm: (data: FieldValues) => void;
}
const FormComponent = (props: IFormComponentProps) => {
  const { register, handleSubmit, errors } = useContext(FormContext);
  const { mainState } = useContext(MainStateContext);

  if (handleSubmit && register && errors) {
    return (
      <div>
        <div className="section">
          <form action="" onSubmit={handleSubmit(props.submitForm)}>
            <label htmlFor="">
              Address:
              <br />
              <input {...register('address')} type="text" name="address" placeholder="address" />
              {errors.address && <span className="alert"> {errors.address.message}</span>}
            </label>
            <hr />
            <label htmlFor="">
              Date of first publication
              <br />
              <input {...register('date')} type="date" name="date" placeholder="date" />
              {errors.date && <span className="alert"> {errors.date.message}</span>}
              <br />
            </label>
            <hr />
            <label htmlFor="">
              Price:
              <br />
              <input {...register('price')} type="number" name="price" placeholder="price" />
              {errors.price && <span className="alert"> {errors.price.message}</span>}
            </label>
            <hr />
            <select placeholder="select" {...register('houseType')} defaultValue="default">
              <option value="default">select house type</option>
              <option value="detached house">detached house</option>
              <option value="townhouse">townhouse</option>
              <option value="apartment">apartment</option>
            </select>
            {errors.houseType && <span className="alert"> {errors.houseType.message}</span>}
            <hr />
            <label htmlFor="">
              Download houses image
              <br />
              <input
                type="file"
                accept="image/*"
                {...register('files')}
                placeholder="Download picture"
              />
            </label>
            <hr />
            <label htmlFor="sold">
              <input type="checkbox" {...register('sold')} id="sold" />
              House is already sold
            </label>
            <hr />
            <input type="checkbox" id="switch" {...register('isUrgent')} className="checkbox" />
            <label htmlFor="switch" className="toggle" />
            <label htmlFor="switch"> Emergency sale</label>
            <hr />
            <button disabled={Object.keys(errors).length ? true : false} type="submit">
              send
            </button>
          </form>
        </div>
        {mainState.cards.length ? <Cards data={mainState.cards} /> : ''}
      </div>
    );
  }
  return <div></div>;
};

export default FormComponent;
