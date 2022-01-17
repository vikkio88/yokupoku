require('dotenv').config();
const imgbbUploader = require("imgbb-uploader");

const { IMG_API_KEY } = process.env;
const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('need image path');
    process.exit(1);
}
const path = args[1];

const main = async path => {
    try {
        const resp = await imgbbUploader(IMG_API_KEY, path);
        console.log('Image uploaded:', { url: resp.url, display: resp.display_url });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    process.exit(0);
};

main(path);