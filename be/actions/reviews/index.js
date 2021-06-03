const { response } = require('../formatters');
const model = require('../../models/reviews');

const get = async (req, res) => {

    let { range, sort } = req.query;
    range = range ? JSON.parse(range) : [0, 10];
    sort = sort ? JSON.parse(sort) : ['products.id', 'asc'];

    const total = await model.total();
    const reviews = await model.get({ range, sort });

    res.setHeader('Content-Range', `reviews ${range[0]}-${range[1]} / ${total}`);
    return response(res, reviews);
};

const find = async (req, res) => {
    const { id } = req.params;
    const result = await model.find(id);
    let review = null;
    if (Array.isArray(result) && result.length) {
        review = result.pop();
    }

    if (!review) return notFound(res);

    return response(res, review);
};


module.exports = {
    get, find
};