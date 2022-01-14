if (process.env.NODE_ENV === 'development') require('dotenv').config();
const cors = require('micro-cors')({
    allowHeaders: [
        'X-Requested-With', 'Access-Control-Allow-Origin',
        'X-HTTP-Method-Override', 'Content-Type',
        'Authorization', 'Accept',
        'Content-Range', 'range'
    ],
    exposeHeaders: ['Content-Range', 'range', 'X-Total-Count'],
    allowMethods: ['PUT', 'POST', 'GET', 'DELETE', 'OPTIONS']
});
const { send } = require('micro');
const { router, get, post, withNamespace, options, put, del } = require('microrouter');

const { misc, reviews, products, providers } = require('./actions');

const api = withNamespace('/api');
const provider = withNamespace('/provider');

module.exports = cors(
    router(
        api(
            get('/ping', misc.pong),

            get('/reviews', reviews.get),
            get('/reviews/:id', reviews.find),
            post('/reviews', reviews.create),
            put('/reviews/:id', reviews.update),
            del('/reviews/:id', reviews.del),
            del('/reviews', reviews.purge),

            get('/products', products.products.get),
            get('/products/:id', products.products.find),

            get('/ngproducts', products.nonGamesProducts.get),
            get('/ngproducts/:id', products.nonGamesProducts.find),
            put('/ngproducts/:id', products.nonGamesProducts.update),
            post('/ngproducts', products.nonGamesProducts.create),
            del('/ngproducts/:id', products.nonGamesProducts.del),

            get('/games', products.games.get),
            get('/games/:id', products.games.find),
            put('/games/:id', products.games.update),
            post('/games', products.games.create),
            del('/games/:id', products.games.del),
        ),
        provider(
            get('/meta', misc.meta),
            get('/reviews', providers.getPublished),
            get('/reviews/:slug', providers.getReview),
            get('/products', providers.getProducts),
        ),

        post('/stop', () => process.exit(0)),
        get('/', misc.fallback),

        get('/*', (req, res) => send(res, 404)),
        post('/*', (req, res) => send(res, 404)),
        options('/*', (req, res) => send(res, 200))
    )
);
