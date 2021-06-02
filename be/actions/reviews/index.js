const { response } = require('../formatters');
const model = require('../../models/reviews');

const params = {
    published: true
};

const queries = {
    get(req) {
        const { p } = req.query;
        return {
            ...params,
            published: p !== undefined ? Boolean(parseInt(p)) : params.published
        };
    }
};

const get = async (req, res) => {

    let { range, sort } = req.query;
    range = range ? JSON.parse(range) : undefined;
    sort = sort ? JSON.parse(sort) : undefined;

    const total = await model.total();
    const reviews = await model.get({ range, sort });
    res.setHeader('Content-Range', `reviews ${range[0]}-${range[1]} / ${total}`);
    return response(res, reviews);
};


module.exports = {
    get
};