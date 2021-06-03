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


module.exports = {
    get
};