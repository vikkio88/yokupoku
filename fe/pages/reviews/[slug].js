import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Review.module.css';

import axios from 'axios';
import { Footer } from '../../components/layout';
import { Product, Review } from '../../components/review';

export default function ReviewPage({ review, product }) {
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
                <Review review={review} />
                <Product product={product} />
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