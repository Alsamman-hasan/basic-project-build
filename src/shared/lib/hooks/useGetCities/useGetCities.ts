// import { useEffect, useState } from 'react';
// import { RussianCites } from '../../../types/cities';

// export const useGetCities = () => {
//   const [city, setCity] = useState<RussianCites[]>([]);

//   useEffect(() => {
//     import('../../../consts/russianCities').then(cities => {
//       setCity(() => cities.cities);
//     });
//   }, []);
//   if (city) {
//     const data = city.map(item => ({
//       label: item.name,
//       value: `${item.name}${item.name}`,
//     }));
//     return data;
//   }
//   return [];
// };
