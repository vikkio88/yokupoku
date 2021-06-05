const { json } = require('micro');
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

const create = async (req, res) => {
    const body = await json(req);
    if (!body) return unprocessable(res);

    const result = await model.create(body);

    if (!result) return unprocessable(res);
    return response(res, result);
};


const update = async (req, res) => {
    const { id } = req.params;
    const body = await json(req);
    if (!id || !body) return unprocessable(res);

    const result = await model.update(id, body);

    if (!result) return unprocessable(res);
    return response(res, { id, ...body });
};

const del = async (req, res) => {
    const { id } = req.params;
    if (!id) return notFound(res);

    const result = await model.delete(id);

    if (!result) return unprocessable(res);

    return response(res, { id });
};


module.exports = {
    get, find, create, update, del
};