import { SWRConfig } from 'swr';
import Spacer from '../ui/Spacer';
import TopNav from '../ui/TopNav';
import { createContext, useState } from 'react';

export const ViewContext = createContext(null);

function Layout(props) {
  return (
    <>
      <TopNav />
      <Spacer size="2rem" />
      <SWRConfig>
        <ViewContext.Provider value={useState(false)}>
          <main>{props.children}</main>
        </ViewContext.Provider>
      </SWRConfig>
      <Spacer size="2rem" />
    </>
  );
}

export default Layout;
