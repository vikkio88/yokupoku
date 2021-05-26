const { response } = require('../formatters');
const model = require('../../models/reviews');

const get = async (req, res) => {
    const reviews = await model.get();
    console.log('LOG', { reviews });
    return response(res, { reviews });
};


module.exports = {
    get
};