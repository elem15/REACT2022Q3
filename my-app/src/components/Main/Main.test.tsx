import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main';
import { searchCharacters, loadCharacters } from '../../mockData/mockCharactersLoad';
import userEvent from '@testing-library/user-event';
const timers = {
  timeout: null as NodeJS.Timeout | null,
};
test('renders main page with characters list', async () => {
  render(
    <Main searchCharacters={searchCharacters} loadCharacters={loadCharacters} timers={timers} />
  );
  screen.findByPlaceholderText(/preloader/i);
  await new Promise(function (res) {
    setTimeout(() => res('done'), 100);
  });
  screen.getAllByText(/elf/i);
  screen.getAllByText(/Amrothos/i);
});
test('pagination main page with characters list', async () => {
  render(
    <Main searchCharacters={searchCharacters} loadCharacters={loadCharacters} timers={timers} />
  );
  await new Promise(function (res) {
    setTimeout(() => res('done'), 1000);
  });
  screen.debug();
  const nextButton = screen.getByText('>');
  userEvent.click(nextButton);
  await new Promise(function (res) {
    setTimeout(() => res('done'), 100);
  });
  screen.getByText(/Aragorn/i);
});
test('render modal window', async () => {
  render(
    <Main searchCharacters={searchCharacters} loadCharacters={loadCharacters} timers={timers} />
  );
  await new Promise(function (res) {
    setTimeout(() => res('done'), 100);
  });
  const card = screen.getByText(/Aerin/i) as HTMLElement;
  userEvent.click(card);
  expect(screen.getByText(/Brodda/i)).toBeInTheDocument();
  const closeButton = screen.getByText('X');
  userEvent.click(closeButton);
  expect(screen.queryByText(/Brodda/i)).toBeNull();
});
test('search characters', async () => {
  render(
    <Main searchCharacters={searchCharacters} loadCharacters={loadCharacters} timers={timers} />
  );
  await new Promise(function (res) {
    setTimeout(() => res('done'), 100);
  });
  const inputEl = screen.getByPlaceholderText("character's name");
  userEvent.type(inputEl, 'Angbor');
  const button = screen.getByText('search by name');
  userEvent.click(button);
  await new Promise(function (res) {
    setTimeout(() => res('done'), 100);
  });
  const card = screen.getByText(/Late ,Third Age/i);
  expect(card).toBeInTheDocument();
  userEvent.click(card);
  expect(screen.getByText('http://lotr.wikia.com//wiki/Angbor')).toBeInTheDocument();
});
