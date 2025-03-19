import { SWRConfig } from 'swr';
import { TopNav, Spacer } from '../ui';
import { createContext, type ReactNode, useState } from 'react';

type View = 'grid' | 'list';
interface ViewContextType {
  view: View;
  setView: React.Dispatch<React.SetStateAction<View>>;
}

export const ViewContext = createContext<ViewContextType | undefined>(undefined);

function Layout({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('grid')
  return (
    <>
      <TopNav />
      <Spacer size="2rem" />
      <SWRConfig value={{ provider: () => new Map() }}>
        <ViewContext.Provider value={{ view, setView }}>
          <main>{children}</main>
        </ViewContext.Provider>
      </SWRConfig>
      <Spacer size="2rem" />
    </>
  );
}

export default Layout;
