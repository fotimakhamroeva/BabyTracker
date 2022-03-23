import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Test', () => {
  render(<App />);
  const linkElement = screen.getByText(/Test/i);
  expect(linkElement).toBeInTheDocument();
});
