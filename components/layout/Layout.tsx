import { SWRConfig } from 'swr';
import Spacer from '../ui/Spacer';
import TopNav from '../ui/TopNav';
import { createContext, type ReactNode, useState } from 'react';

export const ViewContext = createContext(null);

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav />
      <Spacer size="2rem" />
      <SWRConfig>
        <ViewContext.Provider value={useState(false)}>
          <main>{children}</main>
        </ViewContext.Provider>
      </SWRConfig>
      <Spacer size="2rem" />
    </>
  );
}

export default Layout;
