// import { Tabs as TabsUi, Tab } from '@mui/material';
// import {
//   CSSProperties,
//   memo,
//   SyntheticEvent,
//   useEffect,
//   useState,
// } from 'react';
// import './tabs.scss';
// import { classNames } from '@/shared/lib/classNames/classNames';

// export interface ITabContent {
//   tab?: string;
//   element?: JSX.Element;
//   id?: string | number;
// }

// export interface ITabsProps {
//   tabs?: ITabContent[];
//   defaultTab?: number;
//   style?: CSSProperties;
//   className?: string;
//   classTabs?: string;
//   variant?: 'fullWidth' | 'scrollable' | 'standard';
//   orientation?: 'vertical' | 'horizontal';
//   classTabsItem?: string;
//   onChooseTab?: (id?: string | number) => void;
// }

// export const Tabs = memo(
//   ({
//     tabs,
//     defaultTab = 0,
//     className,
//     variant = 'fullWidth',
//     classTabs,
//     orientation = 'horizontal',
//     classTabsItem,
//     onChooseTab,
//     style,
//   }: ITabsProps) => {
//     const [activateTab, setActivateTab] = useState(false);
//     const [valueTab, setValueTab] = useState(defaultTab);

//     useEffect(() => {
//       const timer = setTimeout(() => {
//         setActivateTab(true);
//       }, 100);
//       return () => {
//         clearTimeout(timer);
//       };
//     }, []);

//     const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
//       setValueTab(newValue);
//     };

//     const onChangeTab = (id?: string | number) => {
//       onChooseTab?.(id);
//     };
//     return (
//       <div className={classNames('tabs', {}, [className])}>
//         <TabsUi
//           allowScrollButtonsMobile
//           style={style}
//           scrollButtons={false}
//           orientation={orientation}
//           value={valueTab}
//           variant={variant}
//           className={classTabs}
//           onChange={handleChangeTab}
//         >
//           {!!activateTab &&
//             tabs?.map(({ tab, id }) => (
//               <Tab
//                 key={tab}
//                 className={classTabsItem}
//                 label={tab}
//                 onClick={() => onChangeTab(id)}
//               />
//             ))}
//         </TabsUi>
//         {tabs?.map(({ element, tab }, index) => (
//           <div
//             key={tab}
//             role='tabpanel'
//             hidden={valueTab !== index}
//             id={`simple-tabpanel-${tab?.replace(' ', '')}`}
//             className='content'
//           >
//             {element}
//           </div>
//         ))}
//       </div>
//     );
//   },
// );
