import { createContext, useContext, useState } from 'react';

export const VIEWS = Object.freeze({
  LIST: 'list',
  GRID: 'grid',
});

const AppContext = createContext();

export function AppProvider({ children }) {
  const [view, setView] = useState(VIEWS.GRID);
  const [searchedValue, setSearchedValue] = useState('');
  const [type, setType] = useState('');
  const [hasFavoritesOnly, setHasFavoritesOnly] = useState(false);

  let sharedState = {
    view,
    setView,
    searchedValue,
    setSearchedValue,
    type,
    setType,
    hasFavoritesOnly,
    setHasFavoritesOnly,
  };

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
