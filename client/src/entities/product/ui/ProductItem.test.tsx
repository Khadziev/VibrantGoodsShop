import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ProductItem from './ProductItem';
import store from '@/app/providers/store';

const mockItem = {
  _id: 'abc123',
  name: 'Test Product',
  price: 1000,
  discount: 10,
  imageURL: ['/img.png'],
  category: 'TestCat',
};

test('ProductItem renders and links to product page', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProductItem item={mockItem as any} />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  const link = screen.getByRole('link') as HTMLAnchorElement;
  expect(link.href).toContain('/data/abc123');
});
