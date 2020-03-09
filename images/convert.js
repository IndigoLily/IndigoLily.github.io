#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');

const list = fs.readdirSync('.').filter(file => /\.png$/.test(file));
for (const png of list) {
    const webp = png.match(/^(.+)\.png$/)[1] + '.webp';
    if (!fs.existsSync(webp)) {
        execSync(`cwebp -lossless -m 6 -q 100 ${png} -o ${webp}`);
    } else {
        console.log(webp, 'already exists');
    }
}
