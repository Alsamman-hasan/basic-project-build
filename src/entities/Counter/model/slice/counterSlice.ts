import { createSlice } from '@reduxjs/toolkit';
import { CounterSchema } from '../types/counterSchema';

const initialState: CounterSchema = {
  value: 0,
};

const counterSlice = createSlice({
  initialState,
  name: 'counter',
  reducers: {
    decremented: state => {
      console.log('>>>>>');
      state.value -= 1;
    },
    incremented: (state, { payload }) => {
      console.log('>>>>>');
      state.value += payload;
    },
  },
});

export const { actions: counterActions } = counterSlice;
export const { reducer: counterReducer } = counterSlice;
