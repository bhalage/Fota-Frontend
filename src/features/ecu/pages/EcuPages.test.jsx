import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ecuReducer from '../redux/ecuSlice';
import EcuPages from './EcuPages';

test('renders ECUs table and +New ECU button', () => {
  const preloadedState = {
    ecu: {
      ecus: [{ ecuName: 'Test ECU', componentId: 'C1', abbreviation: 'T1' }],
      loading: false,
      error: null,
      ecusByModelId: [],
      message: ''
    }
  };
  const store = configureStore({
    reducer: { ecu: ecuReducer },
    preloadedState
  });

  render(
    <Provider store={store}>
      <EcuPages />
    </Provider>
  );

  // Check table header text
  expect(screen.getByText('All ECUs')).toBeInTheDocument();

  // Check row data
  expect(screen.getByText('Test ECU')).toBeInTheDocument();

  // Click + New ECU
  fireEvent.click(screen.getByText('+ New ECU'));
  // Drawer should appear
  expect(screen.getByText('Create New ECU')).toBeInTheDocument();
});
