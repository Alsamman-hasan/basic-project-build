import { memo } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import './loader.scss';

export interface LoaderProps {
  className?: string;
}
export const Loader = memo(({ className }: LoaderProps) => (
  <div className={classNames('Loader', {}, [className])}>
    <div className='lds-ellipsis'>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
));
