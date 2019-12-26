const fs = require('fs');
const path = require('path');

const ROOT_PATH = `${__dirname}/`;
const SOURCE_FOLDER = './src/i18n';

const inputFiles = ['README-zh.md'];
const outputFiles = ['README.md'];

// const inputFiles = fs.readdirSync(SOURCE_FOLDER);
// const outputFiles = inputFiles.map(mapToOutputPath);

const results = inputFiles
    .map(mapToSourcePath)
    .map(filePath => fs.readFileSync(filePath, 'utf8'))
    .map(injectCodeBlocks)
    .map(injectExpanders);

outputFiles.forEach((path, index) => makeOutput(path, results[index]));

// * ---------------- output function

function makeOutput(outputFile, result) {
    fs.writeFileSync(outputFile, result, 'utf8');
}

// * ---------------- path resolver

function mapToSourcePath(subPath) {
    return mapToFullPath(path.resolve(SOURCE_FOLDER, subPath));
}

function mapToOutputPath(subPath) {
    return mapToFullPath(subPath);
}

function mapToFullPath(subPath) {
    return path.resolve(ROOT_PATH, subPath);
}

// * ---------------- inject process

function injectCodeBlocks(text) {
    const regex = /::codeblock='(.+?)'::/g;
    return text.replace(regex, createMatchReplacer(withSourceWrapper));
}

function injectExpanders(text) {
    const regex = /::expander='(.+?)'::/g;
    return text.replace(regex, createMatchReplacer(withDetailsWrapper));
}

function createMatchReplacer(wrapper) {
    return (match, filePath) => {
        console.log(ROOT_PATH + filePath);
        const text = fs.readFileSync(ROOT_PATH + filePath, 'utf8');
        return wrapper(text);
    };
}

function withSourceWrapper(text) {
    return `
${'```tsx'}
${text}
${'```'}
  `.trim();
}

function withDetailsWrapper(text) {
    return `
<details><summary><i>Click to expand</i></summary><p>

${'```tsx'}
${text}
${'```'}
</p></details>
  `.trim();
}
