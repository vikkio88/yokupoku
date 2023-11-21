

// can also upload multiple images
// we can put also the cookie
//*
const { imgbox } = require('imgbox-js');
const imageUploader = async path => {
    const resp = await imgbox([path]);
    if (resp.data.success.length && resp.data.success[0].error === undefined) {
        return resp.data.success[0].original_url;
    }

    console.error(`Error while uploading image: ${resp.data.success[0].error}, code: ${resp.data.success[0].error_code}`);
    return null;
};
//*/

/*
const ftp = require("basic-ftp");
const imageUploader = async path => {
    const { IMG_FTP_USER, IMG_FTP_PASSWORD, IMG_FTP_HOST } = process.env;
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: IMG_FTP_HOST,
            user: IMG_FTP_USER,
            password: IMG_FTP_PASSWORD,
        });
        const filename = `${Math.floor(new Date().getTime() / 1000)}.jpg`;
        await client.uploadFrom(path, filename);
        return `https://vikkio.me/yokupoku_img/${filename}`;
    } catch (error) {
        console.error(error);
    }
};
*/
module.exports = imageUploader;