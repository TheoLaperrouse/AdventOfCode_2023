import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

const mappedObj = {};
let moveInstructions;

readLine.on('line', (line) => {
    if (line != '' && !line.includes('=')) {
        moveInstructions = line.match(/[A-Z]/g);
    } else if (line.includes('=')) {
        const [key, left, right] = line.match(/[A-Z]+/g);
        mappedObj[key] = [left, right];
    }
});

readLine.on('close', () => {
    let count = 0;
    let key = 'AAA';
    let instructIndex = 0;

    while (key !== 'ZZZ') {
        const instruct = moveInstructions[instructIndex];

        key = instruct === 'L' ? mappedObj[key][0] : mappedObj[key][1];

        count += 1;
        instructIndex = (instructIndex + 1) % moveInstructions.length;
    }

    console.log('Le nombre de "pas" à faire est :', count);
});
