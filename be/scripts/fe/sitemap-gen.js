const fs = require('fs');
const { Readable } = require('stream');
const { SitemapStream, streamToPromise } = require('sitemap');
const DUMP_DIR = `${__dirname}/../../../fe/public/`;
const reviewModel = require('../../models/reviews');

const HOST = 'https://yokupoku.website/';
const SITEMAPS = {
    MAIN: 'sitemap.xml',
    REVIEWS: 'sitemap-reviews.xml',
};

const MAIN_LINKS = [
    { url: '/', changefreq: 'daily', priority: 0.9, img: `${HOST}backdrop.png` },
    { url: '/about', changefreq: 'monthly', priority: 0.3, img: `${HOST}backdrop.png` },
    { url: '/products', changefreq: 'daily', priority: 0.9, img: `${HOST}backdrop.png` },
    { url: '/reviews', changefreq: 'weekly', priority: 0.7, img: `${HOST}backdrop.png` },
    { url: '/coming-soon', changefreq: 'yearly', priority: 0.1, img: `${HOST}backdrop.png` }
];

const sitemapMainGen = async () => {
    try {
        const smStream = new SitemapStream({
            hostname: HOST
        });

        for (const link of MAIN_LINKS) {
            smStream.write(link);
        }
        smStream.end();

        const sitemapOutput = (await streamToPromise(smStream)).toString();
        return sitemapOutput;

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

const sitemapReviewsGen = async () => {
    try {
        const smStream = new SitemapStream({
            hostname: HOST
        });
        const reviews = await reviewModel.getPublished();

        reviews.forEach(review => {
            smStream.write({
                url: `/reviews/${review.slug}`,
                changefreq: 'weekly',
                img: `${review.image}`,
                priority: 0.9
            });
        });
        smStream.end();

        const sitemapOutput = (await streamToPromise(smStream)).toString();
        return sitemapOutput;

    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};


const generate = async () => {
    console.log('Generating FE static content:');
    console.log(`\t saving ${SITEMAPS.MAIN}`);
    let data = await sitemapMainGen();
    fs.writeFileSync(`${DUMP_DIR}/${SITEMAPS.MAIN}`, data);

    data = await sitemapReviewsGen();
    console.log(`\t saving ${SITEMAPS.REVIEWS}`);
    fs.writeFileSync(`${DUMP_DIR}/${SITEMAPS.REVIEWS}`, data);

    console.log('\t generating robots.txt');
    try {
        const robots = `Sitemap: ${HOST}${SITEMAPS.MAIN}
Sitemap: ${HOST}${SITEMAPS.REVIEWS}
User-agent: *
Allow: /*
Allow: /reviews/*
        
User-agent: Twitterbot
Allow: /
        
User-agent: facebookexternalhit
Allow: /`;

        fs.writeFileSync(`${DUMP_DIR}/robots.txt`, robots);
    } catch (error) {
        console.error(error);
    }

    process.exit(0);

};

generate();