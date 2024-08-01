// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useEffect } from 'react';

// export const useMap = () => {
//   const [MapY, setMapY] = useState<any | null>(null);

//   useEffect(() => {
//     import('@pbe/react-yandex-maps').then(module => {
//       setMapY(() => module);
//     });
//   }, []);
//   if (!MapY) return null;
//   return MapY;
// };
