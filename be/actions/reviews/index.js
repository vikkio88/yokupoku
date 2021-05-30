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
    const params = queries.get(req);
    const reviews = await model.get(params);
    return response(res, { reviews });
};


module.exports = {
    get
};