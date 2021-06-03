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

const { misc, reviews, products } = require('./actions');

const api = withNamespace('/api');

module.exports = cors(
    router(
        api(
            get('/ping', misc.pong),
            get('/reviews', reviews.get),
            get('/reviews/:id', reviews.find),

            get('/games', products.games.get),
            get('/games/:id', products.games.find),
            put('/games/:id', products.games.update),
            post('/games', products.games.create),
            del('/games/:id', products.games.delete),
        ),
        get('/', misc.fallback),

        get('/*', (req, res) => send(res, 404)),
        post('/*', (req, res) => send(res, 404)),
        options('/*', (req, res) => send(res, 200))
    )
);
