import { useEffect, useState } from 'react';
import axios from 'axios';
import * as timeago from 'timeago.js';
import { T } from '../components/common';
import { Footer, Header, Navbar, Title } from '../components/layout';

import styles from '../styles/Products.module.css';
import { Games } from '../components/products';



export default function Products({ lastUpdated }) {

    const [games, setGames] = useState([]);
    const [updatedAtString, setUpdatedAtString] = useState(lastUpdated);

    useEffect(async () => {
        setUpdatedAtString(timeago.format(lastUpdated));
        const source = await fetch('/data-providers/games.json');
        const data = await source.json();
        setGames(data);
    }, []);
    return (
        <div className="container">
            <Header current="Products"
                url='/products'
                description={`A List of of the Video Games that will be reviewed on Yokupoku`}
            />
            <main className="main">
                <Title />
                <Navbar current='/products' />

                <div className={styles.content}>
                    <T title={lastUpdated} position="left">
                        <div className={styles.updated}>last update: {updatedAtString}</div>
                    </T>

                    <Games games={games} />

                </div>
            </main>


            <Footer className={styles.footer} />
        </div>
    );
};


export async function getStaticProps() {
    const response = await axios.get(`http://localhost:3001/provider/meta`);
    const { lastUpdated } = response.data;

    return {
        props: { lastUpdated }
    };
}