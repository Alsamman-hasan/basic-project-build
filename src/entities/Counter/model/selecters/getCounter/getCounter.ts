import { StateSchema } from 'app/providers/StorProvider';

export const getCounterValue = (state: StateSchema) => state.counter?.value;
