import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';

describe(
  'Testa se é exibido na tela a mensagem corretamente.', () => {
    test('Se a pessoa não tiver pokémons favoritos.', () => {
      render(<FavoritePokemons />);

      const heading = screen.getByText(/No favorite pokemon found/i);
      expect(heading).toBeInTheDocument();
    });
  },
);
