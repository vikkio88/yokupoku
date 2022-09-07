require('dotenv').config();
const imgup = require('./imgUploader');

const args = process.argv.slice(2);
if (args.length < 1) {
    console.error('need image path');
    process.exit(1);
}
const path = args[0];
console.log(`uploading: ${path}`);

const main = async path => {
    try {
        const result = await imgup(path);
        console.log(result);
        console.log(`Uploaded Successful!`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }

    process.exit(0);
};
main(path);