const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ROOT_PATH = `${__dirname}/`;
const SOURCE_FOLDER = './src/i18n';

const inputFiles = fs.readdirSync(SOURCE_FOLDER);

inputFiles
    .map(mapToSourcePath)
    .forEach(runDoctocSingle);

function mapToSourcePath(subPath) {
    return path.resolve(SOURCE_FOLDER, subPath);
}

function runDoctocSingle(file) {
    exec(`npx doctoc --maxlevel=3 ${file}`, (error, stdout, stderr) => {
        console.log(stdout);

        // * https://nodejs.org/api/child_process.html
        // if (error) {
        //     console.error(`exec error: ${error}`);
        //     return;
        // }
        // console.log(`stdout: ${stdout}`);
        // console.error(`stderr: ${stderr}`);
    });
}
