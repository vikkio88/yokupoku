
const { now } = require('../../libs/utils');
const { response } = require('../formatters');

const pong = (req, res) => {
    return response(res, { pong: true, env: process.env.LABEL });
};

const meta = (req, res) => {
    return response(res, {
        lastUpdated: now(), version: require('child_process')
            .execSync('git rev-parse --short HEAD')
            .toString().trim()
    });
};

const fallback = (req, res) => {
    return '<head><meta charset="UTF-8"></head><body style="display:flex;' +
        'flex-direction:column; align-items: center; justify-content: center;">' +
        '(╥﹏╥)<span style="margin-top:30px">Nope!</span></body>';
};

module.exports = {
    pong,
    meta,
    fallback
};
