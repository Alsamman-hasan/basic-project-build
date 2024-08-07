import { useDispatch, useSelector } from 'react-redux';
import { getCounterValue } from '../model/selecters/getCounter/getCounter';
import { counterActions, counterReducer } from '../model/slice/counterSlice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components';
import { Button } from '@/shared/ui/Buttons/ButtonUi';

const Reducers: ReducersList = {
  counter: counterReducer,
};
export const Counter = () => {
  const dispatch = useDispatch();
  const counterValue = useSelector(getCounterValue);
  const increment = () => {
    dispatch(counterActions.incremented(1));
    console.log('>>>>');
  };
  const decrement = () => {
    dispatch(counterActions.decremented());
  };
  return (
    <DynamicModuleLoader reducers={Reducers}>
      <h1 data-testid='value-title'>value = {counterValue}</h1>
      <Button
        layOut='TextOnly'
        name='test'
        type='button'
        style={{ marginRight: '20px', marginTop: '20px' }}
        onClick={increment}
      >
        Increment
      </Button>
      <Button layOut='TextOnly' name='test' type='button' onClick={decrement}>
        Decrement
      </Button>
    </DynamicModuleLoader>
  );
};
