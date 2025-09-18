import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { getAllEcus } from './ecuService';
import { configureStore } from '@reduxjs/toolkit';
import ecuReducer from '../redux/ecuSlice';

const server = setupServer(
  rest.get('/api/v1/ecu/getAllEcu', (req, res, ctx) => {
    return res(ctx.json([{ ecuName: 'Mock ECU' }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('dispatches fulfilled action when getAllEcus succeeds', async () => {
  const store = configureStore({ reducer: { ecu: ecuReducer } });

  await store.dispatch(getAllEcus());

  const state = store.getState().ecu;
  expect(state.ecus[0].ecuName).toBe('Mock ECU');
  expect(state.loading).toBe(false);
});
