import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders main page with navigation link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
test('renders main page search bar input', () => {
  render(<App />);
  const input = screen.getByText(/search/i);
  expect(input).toBeInTheDocument();
});
test('renders search bar submit button', () => {
  render(<App />);
  expect(screen.getByRole('button'));
});
test('renders main page with cards', () => {
  render(<App />);
  const address = screen.getByText(/823 Kay Court, Blanco, Ohio, 6067/i);
  expect(address).toBeInTheDocument();
});
test('renders about page', async () => {
  render(<App />);
  await userEvent.click(screen.getByText('About'));
  const linkElement = screen.getByText(/We are the best real estate agency in New Jersey/i);
  expect(linkElement).toBeInTheDocument();
});
