import { Footer, Header, Navbar, Title } from '../components/layout';

import styles from '../styles/Home.module.css';
import stylesAbout from '../styles/About.module.css';



export default function Products() {

    return (
        <div className={styles.container}>
            <Header current="Products" />

            <main className={styles.main}>
                <Title />
                <Navbar current='/products' />

                <div className={stylesAbout.content}>
                    <h2>Here there will be a list of products I am planning to review...</h2>
                </div>
            </main>


            <Footer className={styles.footer} />
        </div>
    );
};