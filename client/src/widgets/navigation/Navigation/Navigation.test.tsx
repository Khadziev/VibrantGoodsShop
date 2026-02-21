import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';

jest.mock('@/app/providers/store', () => ({
  useAppSelector: jest.fn((selector: any) => selector({ auth: { userId: '123' } })),
}));

jest.mock('@/shared/api/apiCart', () => ({
  useGetCartByUserIdQuery: jest.fn(() => ({ data: { items: [1, 2] } })),
}));

jest.mock('@/shared/api/apiMessage', () => ({
  useGetMessagesQuery: jest.fn(() => ({ data: [{ id: 1 }, { id: 2 }, { id: 3 }] })),
}));

import { MemoryRouter } from 'react-router-dom';

test('Navigation renders links and badges', () => {
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  );

  expect(screen.getByText(/Главная/i)).toBeInTheDocument();
  expect(screen.getByText(/Все товары/i)).toBeInTheDocument();
  expect(screen.getByText(/Корзина/i)).toBeInTheDocument();
  expect(screen.getByText(/Профиль/i)).toBeInTheDocument();
  // badges
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
});
