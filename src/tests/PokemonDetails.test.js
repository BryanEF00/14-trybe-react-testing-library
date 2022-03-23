import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa se as informações detalhadas são mostradas na tela.', () => {
  const pokemonMock = pokemons[0];
  const { name, summary, foundAt } = pokemonMock;

  test('A página deve conter texto "heading" correto.', () => {
    renderWithRouter(<App />);

    const linkBtn = screen.getByRole('link', { name: /More details/i });

    userEvent.click(linkBtn);

    const heading = screen.getByRole('heading', { name: `${name} Details`, level: 2 });
    expect(heading).toBeInTheDocument();
    expect(linkBtn).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', { name: /Summary/i, level: 2 });
    expect(summaryTitle).toBeInTheDocument();

    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });

  test('Existe na página uma seção com os mapas contendo as localizações.', () => {
    renderWithRouter(<App />);

    const linkBtn = screen.getByRole('link', { name: /More details/i });

    userEvent.click(linkBtn);

    const heading = screen.getByRole('heading',
      { name: `Game Locations of ${name}`, level: 2 });
    expect(heading).toBeInTheDocument();

    const locations = screen.getAllByRole('img', { name: `${name} location` });
    expect(locations.length).toBe(foundAt.length);

    foundAt.forEach((place, index) => {
      expect(screen.getByText(place.location));
      expect(locations[index]).toHaveAttribute('src', place.map);
    });
  });

  test('Usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const linkBtn = screen.getByRole('link', { name: /More details/i });

    userEvent.click(linkBtn);

    const checkbox = screen.getByLabelText(/Pokémon favoritado?/i);

    userEvent.click(checkbox);

    const favIcon = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(favIcon).toBeInTheDocument();

    userEvent.click(checkbox);

    expect(favIcon).not.toBeInTheDocument();
  });
});
