import Spacer from '../ui/Spacer';
import TopNav from '../ui/TopNav';

function Layout(props) {
  return (
    <>
      <TopNav />
      <main>{props.children}</main>
      <Spacer size="2rem" />
    </>
  );
}

export default Layout;
