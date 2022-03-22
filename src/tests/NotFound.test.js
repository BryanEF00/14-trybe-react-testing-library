import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe(
  'Testa se é exibido na tela a mensagem e imagem corretamente.', () => {
    test('Contém um heading "h2" com o texto: "Page requested not found".', () => {
      render(<NotFound />);

      const heading = screen.getByRole('heading',
        { name: /Page requested not found/i, level: 2 });
      expect(heading).toBeInTheDocument();
    });
    test('Página mostra a imagem.', () => {
      render(<NotFound />);

      const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
      const altText = 'Pikachu crying because the page requested was not found';

      const img = screen.getAllByRole('img');
      expect(img[1]).toHaveAttribute('src', url);
      expect(img[1]).toHaveAttribute('alt', altText);
    });
  },
);
