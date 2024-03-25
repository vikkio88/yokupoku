import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import styles from '../../styles/Review.module.css';

import axios from 'axios';
import { Footer } from '../../components/layout';

import { Product, Reviews } from '../../components/products';

export default function ReviewPage({ product }) {
    return (
        <>
            <NextSeo
                title={`${product.name} - product details `}
                description={`Product: ${product.name} - Yokupoku - Reviews for people with short attention spans. tags: ${product.tags}`}
                openGraph={{
                    url: `/products/${product.slug}`,
                    title: `Yokupoku - ${product.name}`,
                    description: `Details of ${product.name} - Yokupoku - Reviews for people with short attention spans. tags: ${product.tags}`,
                    images: [
                        {
                            url: `${product.image}`,
                            width: 640,
                            height: 480,
                            alt: `${product.name}`,
                            type: 'image/jpg',
                        }],
                }}
                twitter={{ image: `${product.image}` }}
            />
            <Head>
                <meta lang="en" />
                <meta charSet="utf-8" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Head>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <h1><Link href="/">Yokupoku</Link> / <Link href="/products">Products</Link> /</h1> <h3>{`${product.name}`} </h3>
                </nav>
                <main className={styles.main}>
                    <Product product={product} />
                    <Reviews reviews={product.reviews} />
                </main>

                <Footer className={styles.footer} />
            </div>
        </>
    );
}

export async function getStaticProps({ params }) {
    const { slug } = params;

    if (!slug) return { props: { review: null, product: null } };

    const response = await axios.get(`http://localhost:3001/provider/products/${slug}`);
    const product = response.data;

    return {
        props: { product }
    };
}

export async function getStaticPaths() {
    const response = await axios.get('http://localhost:3001/provider/reviewed-products');
    const products = response.data;
    return {
        paths: products.map(({ slug }) => {
            return {
                params: { slug },
            };
        }),
        fallback: false,
    };
}