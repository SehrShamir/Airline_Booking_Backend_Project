const path = require('path');
const fs = require('fs');
const root = path.resolve(__dirname);
console.log('cwd', process.cwd());
console.log('root', root);
const paths = [
    './src/sevices/index.js',
    './src/sevices/airplane-service.js'
];
for (const p of paths) {
    const full = path.resolve(root, p);
    console.log('path', p, 'exists', fs.existsSync(full));
    if (fs.existsSync(full)) {
        console.log('file size', fs.statSync(full).size);
        console.log('content repr', JSON.stringify(fs.readFileSync(full, 'utf8')));
    }
}
try {
    const s = require('./src/sevices');
    console.log('require ./src/sevices', s);
    console.log('keys', Object.keys(s));
    console.log('AirplaneService', s.AirplaneService);
    console.log('type', typeof s.AirplaneService);
} catch (err) {
    console.error('services require error', err);
}
try {
    const s2 = require('./src/sevices/index.js');
    console.log('require ./src/sevices/index.js', s2);
    console.log('keys', Object.keys(s2));
    console.log('AirplaneService2', s2.AirplaneService);
    console.log('type2', typeof s2.AirplaneService);
} catch (err) {
    console.error('services index require error', err);
}
try {
    const s3 = require('./src/sevices/airplane-service');
    console.log('require ./src/sevices/airplane-service', s3);
    console.log('keys', Object.keys(s3));
    console.log('createAirplane', typeof s3.createAirplane);
} catch (err) {
    console.error('airplane-service require error', err);
}
