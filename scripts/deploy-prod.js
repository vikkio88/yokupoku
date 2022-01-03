require('dotenv').config();
const { deploy } = require("@samkirkland/ftp-deploy");

const { FTP_USER, FTP_PASSWORD, FTP_HOST } = process.env;

async function deployFE() {
    console.log("Deploy started");
    await deploy({
        server: FTP_HOST,
        username: FTP_USER,
        password: FTP_PASSWORD,
        "local-dir": './fe/out/',
        "server-dir": './',
        "dangerous-clean-slate": true
    });
    console.log("🚀 Deploy done!");
}

deployFE();