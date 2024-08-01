import { memo } from 'react';

export interface RatingProps {
  rating: number;
}
export const Rating = memo((props: RatingProps) => {
  const { rating } = props;
  return (
    <div>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className='start'
          style={{
            color: rating >= star ? 'gold' : 'gray',
            cursor: 'pointer',
            fontSize: '20px',
          }}
        >
          {' '}
          ★{' '}
        </span>
      ))}
    </div>
  );
});
