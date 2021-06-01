import { createContext, useContext, useState } from 'react';

export const TABS = Object.freeze({
  ALL: 0,
  FAVORITES: 1,
});

export const VIEWS = Object.freeze({
  LIST: 'list',
  GRID: 'grid',
});

const AppContext = createContext();

export function AppProvider({ children }) {
  const [activeTab, setActiveTab] = useState(TABS.ALL);
  const [view, setView] = useState(VIEWS.GRID);

  let sharedState = {
    activeTab,
    setActiveTab,
    view,
    setView,
  };

  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
