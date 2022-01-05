import { useEffect, useState } from 'react';
import { Footer, Header, Navbar, Title } from '../components/layout';

import styles from '../styles/Home.module.css';
import stylesAbout from '../styles/About.module.css';
import { Games } from '../components/products';



export default function Products() {
    const [games, setGames] = useState([]);
    useEffect(async () => {
        const source = await fetch('/data-providers/games.json');
        const data = await source.json();
        setGames(data);
    }, []);
    return (
        <div className="container">
            <Header current="Products" />
            <main className="main">
                <Title />
                <Navbar current='/products' />

                <div className={stylesAbout.content}>
                    <Games games={games} />
                </div>
            </main>


            <Footer className={styles.footer} />
        </div>
    );
};