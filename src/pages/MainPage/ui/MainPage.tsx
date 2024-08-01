import { memo } from 'react';
import { Counter } from '@/entities/Counter';
import { Wrapper } from '@/shared/ui/Wrapper/Wrapper';

const MainPage = memo(() => (
  <Wrapper>
    <Counter />
  </Wrapper>
));

export default MainPage;
