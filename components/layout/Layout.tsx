import Spacer from '../ui/Spacer';
import TopNav from '../ui/TopNav';

function Layout(props) {
  return (
    <>
      <TopNav />
      <Spacer size="1rem" />
      <main>{props.children}</main>
      <Spacer size="2rem" />
    </>
  );
}

export default Layout;
