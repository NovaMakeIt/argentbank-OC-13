import { useDispatch, useSelector } from 'react-redux';

/**
 * Hook personnalisé pour dispatcher des actions Redux avec typage.
 * Utilisé partout dans l'application pour déclencher des actions Redux Toolkit.
 * @returns {function} La fonction dispatch typée de Redux
 */
export const useAppDispatch = () => useDispatch();

/**
 * Hook personnalisé pour sélectionner des valeurs dans le state Redux avec typage.
 * Utilisé partout dans l'application pour accéder à l'état global Redux.
 * @type {import('react-redux').TypedUseSelectorHook<any>}
 */
export const useAppSelector = useSelector;
