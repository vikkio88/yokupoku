const open = require('open');

const openBrowser = url => {
    try {
        var options = { wait: false, url: true };
        open(url, options).catch(() => { });
        return true;
    } catch (err) {
        return false;
    }
};

openBrowser("http://localhost:3002")
