import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormPageContainer from './FormContainerReactForm';

describe('render form', () => {
  it('form submit', async () => {
    render(<FormPageContainer />);
    const inputEl = screen.getByPlaceholderText('address');
    expect(inputEl).toBeInTheDocument();
    userEvent.type(inputEl, 'test text');
    const dateEl = screen.getByPlaceholderText('date');
    expect(dateEl).toBeInTheDocument();
    userEvent.type(dateEl, '1999-01-01');
    expect(screen.getByDisplayValue(/test text/i)).toBeInTheDocument();
    const selectEl = screen.getByPlaceholderText('select') as HTMLSelectElement;
    userEvent.selectOptions(selectEl, 'townhouse');
    expect(selectEl.value).toBe('townhouse');
    const priceEl = screen.getByPlaceholderText('price') as HTMLSelectElement;
    userEvent.type(priceEl, '100000');
    expect(screen.getByDisplayValue(/100000/i)).toBeInTheDocument();
    const soldEl = screen.getByLabelText('House is already sold');
    userEvent.click(soldEl);
    const urgentEl = screen.getByLabelText(/emergency sale/i);
    userEvent.click(urgentEl);
    const button = screen.getByText(/send/i);
    userEvent.click(button);
    await new Promise(function (res) {
      setTimeout(() => res('done'), 1000);
    });
    expect(screen.getByText(/test text/i)).toBeInTheDocument();
    expect(screen.getByText(/100 000,00 /i)).toBeInTheDocument();
    expect(screen.getByText(/01.01.1999/i)).toBeInTheDocument();
    screen.getAllByText(/townhouse/i);
    screen.getAllByText(/sold/i);
    screen.getAllByText(/emergency/i);
  });
  it('multi cards render', async () => {
    render(<FormPageContainer />);
    const inputEl = screen.getByPlaceholderText('address');
    expect(inputEl).toBeInTheDocument();
    userEvent.type(inputEl, 'test text');
    const dateEl = screen.getByPlaceholderText('date');
    expect(dateEl).toBeInTheDocument();
    userEvent.type(dateEl, '1999-01-01');
    expect(screen.getByDisplayValue(/test text/i)).toBeInTheDocument();
    const selectEl = screen.getByPlaceholderText('select') as HTMLSelectElement;
    userEvent.selectOptions(selectEl, 'townhouse');
    expect(selectEl.value).toBe('townhouse');
    const priceEl = screen.getByPlaceholderText('price') as HTMLSelectElement;
    userEvent.type(priceEl, '100000');
    expect(screen.getByDisplayValue(/100000/i)).toBeInTheDocument();
    const button = screen.getByRole('button');
    userEvent.click(button);
    await new Promise(function (res) {
      setTimeout(() => res('done'), 1000);
    });
    expect(screen.getByText(/test text/i)).toBeInTheDocument();
    expect(screen.getByText(/01.01.1999/i)).toBeInTheDocument();
    screen.getAllByText(/townhouse/i);
    userEvent.type(inputEl, 'test text 2');
    userEvent.type(dateEl, '2022-01-01');
    userEvent.selectOptions(selectEl, 'apartment');
    userEvent.click(button);
    await new Promise(function (res) {
      setTimeout(() => res('done'), 1000);
    });
    expect(screen.getByText(/test text 2/i)).toBeInTheDocument();
    expect(screen.getByText(/01.01.2022/i)).toBeInTheDocument();
    screen.getAllByText(/apartment/i);
    screen.getAllByText(/test text/i);
    expect(screen.getByText(/01.01.1999/i)).toBeInTheDocument();
    screen.getAllByText(/townhouse/i);
  });
  it('form submit incorrect input', async () => {
    render(<FormPageContainer />);
    const inputEl = screen.getByPlaceholderText('address');
    expect(inputEl).toBeInTheDocument();
    userEvent.type(inputEl, 'qwe');
    const dateEl = screen.getByPlaceholderText('date');
    expect(dateEl).toBeInTheDocument();
    userEvent.type(dateEl, '1009-01-01');
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(screen.queryByText('qwe')).toBeNull();
    await new Promise(function (res) {
      setTimeout(() => res('done'), 1000);
    });
    const addressWarning = screen.getByText(/address must be at least 8 characters/i);
    expect(addressWarning).toBeInTheDocument();
    expect(addressWarning).toHaveClass('alert');
    expect(screen.getByText(/date field must be later than/i)).toBeInTheDocument();
    expect(screen.getByText(/house type is required/i)).toBeInTheDocument();
  });
});
