//TODO: fixes
const http = require('http');
const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/stop',
    method: 'POST'
};

const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);
});

req.on('error', () => {
    console.log('sent kill switch to BE server');
});

req.end();