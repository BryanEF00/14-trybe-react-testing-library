import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe(
  'Testa se a página contém as informações sobre a Pokédex.', () => {
    test('Página contém um heading "h2" com o texto: "About Pokédex".', () => {
      render(<About />);

      const heading = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
      expect(heading).toBeInTheDocument();
    });

    test('Página contém a imagem de uma Pokédex.', () => {
      render(<About />);
      /* Referência: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f */

      const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', url);
      expect(img).toHaveAttribute('alt', 'Pokédex');
    });
  },
);
