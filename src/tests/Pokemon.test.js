import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const pokemonMock = pokemons[0];

describe('Testa se é renderizado um card com as informações do pokémon.', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonMock }
        isFavorite={ false }
      />,
    );

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent(pokemonMock.name);
  });

  test('O tipo correto do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonMock }
        isFavorite={ false }
      />,
    );

    const pokemon = screen.getByTestId('pokemon-type');
    expect(pokemon).toHaveTextContent(pokemonMock.type);
  });

  test(
    'O peso médio do Pokémon deve ser exibido com um texto no formato correto.', () => {
      renderWithRouter(
        <Pokemon
          pokemon={ pokemonMock }
          isFavorite={ false }
        />,
      );

      const { averageWeight: { value, measurementUnit } } = pokemonMock;

      const pokemon = screen.getByTestId('pokemon-weight');
      expect(pokemon).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    },
  );

  test('O imagem do Pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonMock }
        isFavorite={ false }
      />,
    );

    const pokemonImg = screen.getByRole('img');
    expect(pokemonImg).toHaveAttribute('src', pokemonMock.image);
    expect(pokemonImg).toHaveAttribute('alt', `${pokemonMock.name} sprite`);
  });

  test('Card do Pokémon contém um link para exibir detalhes deste Pokémon.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonMock }
        isFavorite={ false }
      />,
    );

    const linkBtn = screen.getByRole('link', { name: /More details/i });
    expect(linkBtn).toHaveAttribute('href', `/pokemons/${pokemonMock.id}`);
  });

  test('Ao clicar no link é feito redirecionamento para a página de detalhes.',
    () => {
      const { history } = renderWithRouter(
        <Pokemon
          pokemon={ pokemonMock }
          isFavorite={ false }
        />,
      );

      const linkBtn = screen.getByRole('link', { name: /More details/i });
      expect(linkBtn).toBeDefined();
      userEvent.click(linkBtn);

      const { pathname } = history.location;
      expect(pathname).toBe(`/pokemons/${pokemonMock.id}`);
    });

  test('Existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemonMock }
        isFavorite
      />,
    );

    const icon = screen.getAllByRole('img');
    expect(icon[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(icon[1]).toHaveAttribute('alt', `${pokemonMock.name} is marked as favorite`);
  });
});
