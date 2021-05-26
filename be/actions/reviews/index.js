const { response } = require('../formatters');
const model = require('../../models/reviews');

const get = async (req, res) => {
    const reviews = await model.get();
    return response(res, { reviews });
};


module.exports = {
    get
};