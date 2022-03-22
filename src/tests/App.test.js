import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe(
  'Testa se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    test('O primeiro link deve possuir o texto Home', () => {
      renderWithRouter(<App />);

      const linkText = screen.getByRole('link', { name: /Home/i });
      expect(linkText).toBeInTheDocument();
    });

    test('O segundo link deve possuir o texto About', () => {
      renderWithRouter(<App />);

      const linkText = screen.getByRole('link', { name: /About/i });
      expect(linkText).toBeInTheDocument();
    });

    test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
      renderWithRouter(<App />);

      const linkText = screen.getByRole('link', { name: /Favorite Pokémons/i });
      expect(linkText).toBeInTheDocument();
    });
  },
);

describe(
  'Testa se a aplicação é redirecionada para a página correta.', () => {
    test('Página na URL "/" ao clicar no link Home.', () => {
      const { history } = renderWithRouter(<App />);

      const pageLink = screen.getByRole('link', { name: /Home/i });
      userEvent.click(pageLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });

    test('Página na URL "/about", ao clicar no link About.', () => {
      const { history } = renderWithRouter(<App />);

      const pageLink = screen.getByRole('link', { name: /About/i });
      userEvent.click(pageLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/about');
    });

    test('Página na URL "/favorites" ao clicar no link Favorite Pokémons.', () => {
      const { history } = renderWithRouter(<App />);

      const pageLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
      userEvent.click(pageLink);

      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

    test('Redireciona para a página "Not Found" ao entrar em URL desconhecida.', () => {
      const { history } = renderWithRouter(<App />);

      history.push('/pagina/que-nao-existe/');

      const notFoundTitle = screen.getByRole('heading',
        { name: /Page requested not found/i, level: 2 });
      expect(notFoundTitle).toBeInTheDocument();
    });
  },
);
