import { useDispatch, useSelector } from 'react-redux';
import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/componnets/DynamicModuleLoader/DynamicModuleLoader';
import { getCounterValue } from '../model/selecters/getCounter/getCounter';
import { counterActions, counterReducer } from '../model/slice/counterSlice';

const Reducers: ReducersList = {
  counter: counterReducer,
};
export const Counter = () => {
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);
  const increment = () => {
    dispatch(counterActions.incremented(1));
  };
  const decrement = () => {
    dispatch(counterActions.decremented());
  };
  return (
    <DynamicModuleLoader reducers={Reducers}>
      <h1 data-testid="value-title">value = {counterValue}</h1>
      <button style={{ marginRight: '20px', marginTop: '20px' }} onClick={increment}>
        Increment
      </button>
      <button onClick={decrement}>Decrement</button>
    </DynamicModuleLoader>
  );
};
