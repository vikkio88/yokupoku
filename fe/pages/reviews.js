import { Footer, Header, Navbar, Title } from '../components/layout';

import styles from '../styles/Home.module.css';
import stylesAbout from '../styles/About.module.css';



export default function Reviews() {

    return (
        <div className={styles.container}>
            <Header current="Reviews" />

            <main className={styles.main}>
                <Title />
                <Navbar current='/reviews' />

                <div className={stylesAbout.content}>
                    <h2>Here there will be a list reviews...</h2>
                </div>
            </main>


            <Footer className={styles.footer} />
        </div>
    );
};