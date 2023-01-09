import { useEffect } from 'react';

export function useInitialEffect(callBack: () => void) {
  useEffect(() => {
    callBack();
    // eslint-disable-next-line
	}, [])
}
