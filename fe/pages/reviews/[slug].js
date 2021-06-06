import React from "react";

import axios from 'axios';

export default function Review({ review, product }) {

    console.log({ review, product });
    return (
        <div>
            <h1>{product.name}</h1>
            <h1>{review.title}</h1>
            <h2>{review.subtitle}</h2>
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