import { useContext } from 'react';
import { ViewContext } from '../components/layout/Layout';

export function useViewContext() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useViewContext must be used within a ViewContextProvider');
  }
  return context;
}
