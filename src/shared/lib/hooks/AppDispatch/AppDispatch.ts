import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/StorProvider';

export const useAppDispatch = () => useDispatch<AppDispatch>();
