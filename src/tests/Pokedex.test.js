import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokedex } from '../components';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const pokemonMock = [pokemons[0], pokemons[1], pokemons[2]];
const isFavoriteMock = {
  [pokemons[0].id]: false, [pokemons[1].id]: false, [pokemons[2].id]: false,
};

const nameID = 'pokemon-name';

describe(
  'Testa o componente Pokedex', () => {
    test('Contém um heading "h2" com o texto correto.', () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemonMock }
        isPokemonFavoriteById={ isFavoriteMock }
      />);

      const heading = screen.getByRole('heading',
        { name: /Encountered pokémons/i, level: 2 });
      expect(heading).toBeInTheDocument();
    });

    test('Exibide o próximo Pokémon quando o botão é clicado.', () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemonMock }
        isPokemonFavoriteById={ isFavoriteMock }
      />);

      const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(nextBtn).toBeInTheDocument();

      const pokemon0 = screen.getByTestId(nameID);
      expect(pokemon0).toHaveTextContent('Pikachu');

      userEvent.click(nextBtn);

      const pokemon1 = screen.getByTestId(nameID);
      expect(pokemon1).toHaveTextContent('Charmander');
    });

    test('É mostrado apenas um Pokémon por vez.', () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemonMock }
        isPokemonFavoriteById={ isFavoriteMock }
      />);

      const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(nextBtn).toBeInTheDocument();

      const pokemon0 = screen.getByTestId(nameID);
      expect(pokemon0).toHaveTextContent('Pikachu');
      expect(pokemon0).not.toHaveTextContent('Charmander');
    });

    test('Pokédex tem os botões de filtro.', () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemonMock }
        isPokemonFavoriteById={ isFavoriteMock }
      />);

      const getTypes = pokemons.map((pokemon) => pokemon.type);
      const types = [...new Set(getTypes)];

      const typeBtn = screen.getAllByTestId('pokemon-type-button');
      typeBtn.forEach((btn, index) => expect(btn).toHaveTextContent(types[index]));
    });

    test(
      'Após selecionar, Pokédex deve circular somente pelos pokémons do mesmo tipo.',
      () => {
        renderWithRouter(<Pokedex
          pokemons={ pokemonMock }
          isPokemonFavoriteById={ isFavoriteMock }
        />);

        const fireTypeBtn = screen.getByRole('button', { name: /Fire/i });
        const allBtn = screen.getByRole('button', { name: /All/i });
        expect(allBtn).toBeVisible();

        userEvent.click(fireTypeBtn);

        const firePokemon = screen.getByTestId(nameID);
        expect(firePokemon).toHaveTextContent('Charmander');
        expect(allBtn).toBeVisible();
      },
    );

    test('Pokédex contém um botão para resetar o filtro.', () => {
      renderWithRouter(<Pokedex
        pokemons={ pokemonMock }
        isPokemonFavoriteById={ isFavoriteMock }
      />);

      const allBtn = screen.getByRole('button', { name: /All/i });
      expect(allBtn).toHaveTextContent('All');

      const bugTypeBtn = screen.getByRole('button', { name: /Bug/i });

      userEvent.click(bugTypeBtn);

      const bugPokemon = screen.getByTestId(nameID);
      expect(bugPokemon).toHaveTextContent('Caterpie');

      userEvent.click(allBtn);

      const pokemon0 = screen.getByTestId(nameID);
      expect(pokemon0).toHaveTextContent('Pikachu');
    });
  },
);
