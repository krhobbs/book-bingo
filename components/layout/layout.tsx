import TopNav from '../ui/TopNav';

function Layout(props) {
  return (
    <>
      <TopNav />
      <main>{props.children}</main>
    </>
  );
}

export default Layout;
