import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import data from './MockData/data';

test('renders main page with navigation link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders main page search bar input', () => {
  render(<App />);
  const { container } = render(<App />);
  const inputEl = container.querySelector(`input[name="search"]`) as HTMLInputElement;
  expect(inputEl).toBeInTheDocument();
});
test('renders search bar submit button', () => {
  render(<App />);
  expect(screen.getByRole('button'));
});
test('renders main page with one cards', () => {
  render(<App />);
  const address = screen.getByText(/823 Kay Court, Blanco, Ohio, 6067/i);
  expect(address).toBeInTheDocument();
});
test('renders main page with cards list', () => {
  render(<App />);
  data.map((item) => {
    const address = screen.getByText(item.address);
    expect(address).toBeInTheDocument();
  });
});
test('renders about page', () => {
  render(<App />);
  userEvent.click(screen.getByText('About'));
  const linkElement = screen.getByText(/We are the best real estate agency in New Jersey/i);
  expect(linkElement).toBeInTheDocument();
});
test('input onChange working', () => {
  render(<App />);
  userEvent.click(screen.getByText('Home'));
  const { container } = render(<App />);
  const inputEl = container.querySelector(`input[name="search"]`) as HTMLInputElement;
  userEvent.type(inputEl, 'test text');
  expect(inputEl.value).toBe('test text');
});
test('save input value in local storage', () => {
  render(<App />);
  userEvent.click(screen.getByText('About'));
  userEvent.click(screen.getByText('Home'));
  const { container } = render(<App />);
  const inputEl = container.querySelector(`input[name="search"]`) as HTMLInputElement;
  expect(inputEl.value).toBe('test text');
});
