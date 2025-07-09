import { useDispatch, useSelector } from 'react-redux';

// Hook typé pour dispatcher des actions Redux
export const useAppDispatch = () => useDispatch();

// Hook typé pour sélectionner des valeurs dans le state Redux
export const useAppSelector = useSelector;
