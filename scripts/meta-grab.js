require('dotenv').config();
const imgUploader = require('./imgUploader');
const sharp = require('sharp');
const axios = require('axios');
const cheerio = require('cheerio');

const { IMG_API_KEY } = process.env;
const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('need website url');
    process.exit(1);
}
const url = args[1];
const resize = args[2];
const resizePercentage = 50;
//const resize = args[2] || '50%';

const main = async url => {
    try {
        const { image } = await getImage(url);
        console.log(`image url ${image}`);
        const filename = (new URL(image)).pathname.split('/').pop().trim();
        await $`wget -O downloaded.jpg ${image}`;
        let fileToUpload = 'downloaded.jpg';
        if (['r', 'resize'].includes(resize)) { // no resize by default
            await sharp(filename).metadata()
                .then(info => {
                    const width = Math.round(info.width * resizePercentage / 100);
                    const height = Math.round(info.height * resizePercentage / 100);
                    return sharp(fileToUpload).resize(width, height).toFile('image.jpg');
                });
            await $`rm ${fileToUpload}`;
            fileToUpload = 'image.jpg';
        }

        const result = await imgUploader(fileToUpload);
        await $`rm ${fileToUpload}`;

        console.log('Image uploaded:', result);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    process.exit(0);
};

const getImage = async url => {
    const page = await axios.get(url, { headers: { 'User-Agent': 'Twitterbot/1.0' } });
    const ch = cheerio.load(page.data);

    const title = ch('meta[property="og:title"]').attr('content') || ch('title').text() || ch('meta[name="title"]').attr('content');
    const description = ch('meta[property="og:description"]').attr('content') || ch('meta[name="description"]').attr('content');
    const site_name = ch('meta[property="og:site_name"]').attr('content');
    const image = ch('meta[property="og:image"]').attr('content') || ch('meta[property="og:image:url"]').attr('content');
    const result = { title: title, description: description, site_name: site_name, image: image };


    return result;
};

main(url);