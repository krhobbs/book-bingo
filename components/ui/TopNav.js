import Link from "next/link";
import styles from "./top-nav.module.scss";
import { Text } from 'theme-ui';

function TopNav(props) {

  return (
    <div className={styles.container}>
        <div className={styles.logoContainer}>
            <Text variant={'heading1'}>Book Bingo</Text>

        </div>
        <div className={styles.links}>
          <Link href='/'>Profile</Link>
          <Link href='/'>Friends</Link>
        </div>

    </div>
  );
}

export default TopNav;
