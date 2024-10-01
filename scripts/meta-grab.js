require('dotenv').config();
const imgUploader = require('./imgUploader');
const sharp = require('sharp');
const axios = require('axios');
const cheerio = require('cheerio');

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('need website url');
    process.exit(1);
}
const url = args[1];

const resize = args[2];
const resizePercentage = 50;
// const resize = args[2] || '50%';

const main = async url => {
    const { image, tags, title } = await getInfoFromSteam(url);
    const imageUrl = await reupImage(image);
    console.log({ title, imageUrl, tagsStr: tags.join(', ') });

    process.exit(0);
};

const reupImage = async image => {
    try {
        console.log(`Getting Image from: ${image}`);
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
        return result;
    } catch (error) {
        console.error(error);
        return;
    }
};

const getInfoFromSteam = async url => {
    const page = await axios.get(url, { headers: { 'User-Agent': 'Twitterbot/1.0' } });
    const ch = cheerio.load(page.data);

    let title = ch('meta[property="og:title"]').attr('content') || ch('title').text() || ch('meta[name="title"]').attr('content');
    title = title.replace("on Steam", "").trim();
    const image = ch('meta[property="og:image"]').attr('content') || ch('meta[property="og:image:url"]').attr('content');
    const tagsItems = ch(".app_tag");
    const tags = [];
    tagsItems.each(function (i, el) {
        const a = ch(this).text().trim().toLocaleLowerCase();
        tags.push(a);
    });

    tags.pop();

    const result = { title, image, tags };


    return result;
};

main(url);

module.exports = {
    getInfoFromSteam, reupImage
};