import Spacer from '../ui/Spacer';
import TopNav from '../ui/TopNav';
import { createContext, useState } from 'react';

export const ViewContext = createContext(null);

function Layout(props) {
  return (
    <>
      <TopNav />
      <Spacer size="2rem" />
      <ViewContext.Provider value={useState(false)}>
        <main>{props.children}</main>
      </ViewContext.Provider>
      <Spacer size="2rem" />
    </>
  );
}

export default Layout;
