import Link from 'next/link';
import { Footer, Header, Navbar, Title } from '../components/layout';

import styles from '../styles/Home.module.css';


export default function About() {

  return (
    <div className={styles.container}>
      <Header current="Coming Soon" />

      <main className={styles.main}>
        <Title />
        <Navbar current={'/coming-soon'} />

        <div className={styles.content}>
          <h2>Wait for it</h2>
          <p>
            This functionality will be coming soon.
          </p>

          <Link href="/">
            <h1 className={styles.homeLink}>
              🔙
            </h1>
          </Link>
        </div>
      </main>

      <Footer className={styles.footer} />
    </div>
  );
};