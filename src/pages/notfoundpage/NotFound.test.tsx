import { render, screen } from '@testing-library/react';

import { NotFound } from './NotFound'

test('<NotFound /> should render Page Not Found message', () => {
  render(<NotFound />);
  const linkElement = screen.getByText('Page Not Found');
  expect(linkElement).toBeInTheDocument();
})