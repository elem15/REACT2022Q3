import React from 'react';
import { getByRole, getByText, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
// import App from '../../App';
// import data from '../../mockData/data';
import FormPageContainer from './FormContainer-1';

describe('render form test', () => {
  it('form submit', () => {
    render(<FormPageContainer />);
    const inputEl = screen.getByPlaceholderText('address');
    expect(inputEl).toBeInTheDocument();
    userEvent.type(inputEl, 'test text');
    expect(screen.getByDisplayValue(/test text/i)).toBeInTheDocument();
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(screen.getByText(/test text/i)).toBeInTheDocument();
    screen.debug();
  });
  it('form submit incorrect input', () => {
    render(<FormPageContainer />);
    const inputEl = screen.getByPlaceholderText('address');
    expect(inputEl).toBeInTheDocument();
    userEvent.type(inputEl, 'qwe');
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(screen.queryByText('qwe')).toBeNull();
    expect(screen.getByText(/address is incorrect/i)).toBeInTheDocument();
    expect(screen.getByText(/address is incorrect/i)).toHaveClass('alert');
    userEvent.type(inputEl, 'test text');
    userEvent.click(button);
    expect(screen.getByText(/test text/i)).toBeInTheDocument();
    screen.debug();
  });
});
  //   it('renders form page with navigation link', () => {
  //     render(<FormPageContainer />);
  //     const linkElement = screen.getByText(/Address/i);
  //     expect(linkElement).toBeInTheDocument();
  //   });
  //   it('renders form page address field input', () => {
  //     render(<FormPageContainer />);
  //     const { container } = render(<FormPageContainer />);
  //     const inputEl = container.querySelector(`input[name="address"]`) as HTMLInputElement;
  //     expect(inputEl).toBeInTheDocument();
  //   });
  //   it('renders form submit button', () => {
  //     render(<FormPageContainer />);
  //     const submitButton = screen.getByRole('button');
  //     expect(submitButton).toBeInTheDocument();
  //     expect(submitButton).toHaveTextContent('send');
  //   });
  // });
  // describe('form validation', () => {
  //   it('address field', async () => {
  //     // render(<FormPageContainer />);
  //     const { container } = render(<FormPageContainer />);
  //     const inputEl = container.querySelector(`input[name="address"]`) as HTMLInputElement;
  //     const selectEl = container.querySelector(`select[name="houseType"]`) as HTMLSelectElement;
  //     const buttonEl = container.querySelector('button') as HTMLButtonElement;
  //     act(() => {
  //       userEvent.type(inputEl, 'qweryqwery');
  //     });
  //     expect(inputEl.value).toBe('qweryqwery');
  //     userEvent.selectOptions(selectEl, 'townhouse');
  //     expect(selectEl.value).toBe('townhouse');
  //     const submitButton = screen.getByRole('button');
  //     expect(submitButton).toBeInTheDocument();
  //     expect(submitButton).toHaveTextContent('send');
  //     // act(() => {
  //     userEvent.click(buttonEl);
  //     expect(await screen.findByText(/qweryqwery/i)).toBeInTheDocument();
  // });
  // await expect(await container.querySelector('.card')).toBeInTheDocument();
  //   act(() => {
  //     userEvent.type(inputEl, 'qweryqwery');
  //   });
  //   setTimeout(() => {
  //     expect(screen.getByText(/incorrect/i)).toBeInTheDocument();
  //     expect(container.querySelector('.alert')).toBeInTheDocument();
  //   }, 1000);
// });
// });
// describe('cards test', () => {
//   it('page has no cards by start', () => {
//     const { container } = render(<FormPageContainer />);
//     expect(container.querySelector('.card')).toBeNull();
//   });
// });
// test('renders main page with one cards', () => {
//   render(<App />);
//   const address = screen.getByText(/823 Kay Court, Blanco, Ohio, 6067/i);
//   expect(address).toBeInTheDocument();
// });
// test('renders main page with cards list', () => {
//   render(<App />);
//   data.map((item) => {
//     const address = screen.getByText(new RegExp(item.address, 'i'));
//     expect(address).toBeInTheDocument();
//   });
// });
// test('renders about page', () => {
//   render(<App />);
//   userEvent.click(screen.getByText('About'));
//   const linkElement = screen.getByText(/We are the best real estate agency in New Jersey/i);
//   expect(linkElement).toBeInTheDocument();
// });
// test('input onChange working', () => {
//   render(<App />);
//   userEvent.click(screen.getByText('Home'));
//   const { container } = render(<App />);
//   const inputEl = container.querySelector(`input[name="search"]`) as HTMLInputElement;
//   userEvent.type(inputEl, 'test text');
//   expect(inputEl.value).toBe('test text');
// });
// test('save input value in local storage', () => {
//   render(<App />);
//   userEvent.click(screen.getByText('About'));
//   userEvent.click(screen.getByText('Home'));
//   const { container } = render(<App />);
//   const inputEl = container.querySelector(`input[name="search"]`) as HTMLInputElement;
//   expect(inputEl.value).toBe('test text');
// });