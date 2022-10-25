import * as yup from 'yup';

export const schema = yup
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
