import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Review.module.css';

import axios from 'axios';
import { Footer } from '../../components/layout';

export default function Review({ review, product }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{`Review: ${product.name} - ${review.title}`} Yokupoku - Reviews for people with short attention span</title>
                <meta lang="en" />
                <meta charSet="utf-8" />
                <meta name="description" content={`${1} - Yokupoku - reviews for people with short attention span`} />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Head>
            <nav className={styles.nav}>
                <h1><Link href="/">Yokupoku</Link> / Reviews /</h1> <h3>{`${product.name}`} - </h3> <h4>{`${review.title}`}</h4>
            </nav>
            <main className={styles.main}>
                <h1>{review.title}</h1>
                <h2>{review.subtitle}</h2>
                <p className={styles.description}>
                    {review.content}
                </p>
                <p>
                    <h3>Pros</h3>
                    {review.pros}
                </p>
                <p>
                    <h3>Cons</h3>
                    {review.cons}
                </p>

                <p>
                    <h3>Tags</h3>
                    {review.tags}
                </p>
                <p>Suggested: {review.suggested ? 'YES' : 'NO'}</p>
                <p>
                    <h3>Boredom Speed Index</h3>
                    <h2>{review.bsi}</h2>
                </p>
                <p>
                    <h3>Rate</h3>
                    <h2>{review.rating} / 100</h2>
                </p>
                {/* Maybe can add Updated/Created */}
            </main>
            <Footer className={styles.footer} />
        </div>
    );
}

export async function getStaticProps({ params }) {
    const { slug } = params;

    if (!slug) return { props: { review: null, product: null } };

    const response = await axios.get(`http://localhost:3001/provider/reviews/${slug}`);
    const { review, product } = response.data;

    return {
        props: { review, product }
    };

}



export async function getStaticPaths() {
    const response = await axios.get('http://localhost:3001/provider/reviews');
    const reviews = response.data;
    return {
        paths: reviews.map(({ slug }) => {
            return {
                params: { slug },
            };
        }),
        fallback: false,
    };
}