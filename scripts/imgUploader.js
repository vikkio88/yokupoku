const { imgbox } = require('imgbox-js');

// can also upload multiple images
// we can put also the cookie
const imageUploader = async path => {
    const resp = await imgbox([path]);
    return resp.data;
};

module.exports = imageUploader;