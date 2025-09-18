import reducer, { } from './ecuSlice';
import { getAllEcus, addNewEcu } from '../services/ecuService';

describe('ecu reducer', () => {
  const initialState = {
    ecus: null,
    loading: false,
    error: null,
    ecusByModelId: [],
    message: ''
  };

  it('should handle initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should set loading true on getAllEcus.pending', () => {
    const state = reducer(initialState, getAllEcus.pending());
    expect(state.loading).toBe(true);
  });

  it('should update ecus on getAllEcus.fulfilled', () => {
    const data = [{ ecuName: 'ECU1' }];
    const state = reducer(initialState, getAllEcus.fulfilled(data));
    expect(state.ecus).toEqual(data);
    expect(state.loading).toBe(false);
  });

  it('should add new ecu on addNewEcu.fulfilled', () => {
    const stateWithData = { ...initialState, ecus: [] };
    const ecu = { ecuName: 'ECU2' };
    const state = reducer(stateWithData, addNewEcu.fulfilled(ecu));
    expect(state.ecus).toContainEqual(ecu);
  });
});
