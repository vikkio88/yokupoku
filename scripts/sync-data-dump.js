require('dotenv').config();
const { deploy } = require("@samkirkland/ftp-deploy");

const { STORAGE_FTP_USER, STORAGE_FTP_PASSWORD, STORAGE_FTP_HOST } = process.env;

async function syncStorage() {
    console.log("Sync Data started");
    await deploy({
        server: STORAGE_FTP_HOST,
        username: STORAGE_FTP_USER,
        password: STORAGE_FTP_PASSWORD,
        "local-dir": './be/db/data/',
        "server-dir": './'
    });
    console.log("🚀 Sync done!");
}

syncStorage();