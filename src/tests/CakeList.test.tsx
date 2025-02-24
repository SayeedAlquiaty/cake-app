import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CakeList from '../components/CakeList';
import { BrowserRouter } from 'react-router-dom';
import * as api from '../api/cakeApi';
import { Cake } from '../types/Cake';

jest.mock('../api/cakeApi');
const mockedGetCakes = api.getCakes as jest.MockedFunction<typeof api.getCakes>;

describe('CakeList', () => {
  test('renders cakes fetched from API', async () => {
    const cakes: Cake[] = [
      { id: 1, name: 'Test Cake', comment: 'Delicious', imageUrl: 'http://example.com/test.jpg', yumFactor: 5 }
    ];
    mockedGetCakes.mockResolvedValueOnce(cakes);
    
    render(
      <BrowserRouter>
        <CakeList />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    
    await waitFor(() => expect(screen.getByText('Test Cake')).toBeInTheDocument());
  });
});
export {};