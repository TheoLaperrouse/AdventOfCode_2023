import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

const mappedObj = {};
let moveInstructions;

function pgcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function ppcm(a, b) {
    if (a === 0 || b === 0) {
        return 0;
    }
    return (a * b) / pgcd(a, b);
}

readLine.on('line', (line) => {
    if (line != '' && !line.includes('=')) {
        moveInstructions = line.match(/[A-Z]/g);
    } else if (line.includes('=')) {
        const [key, left, right] = line.match(/[A-Z]+/g);
        mappedObj[key] = [left, right];
    }
});

readLine.on('close', () => {
    let keys = Object.keys(mappedObj).filter((key) => key[2] === 'A');
    let steps = [];

    for (let key of keys) {
        let count = 0;
        let instructIndex = 0;
        while (key[2] !== 'Z') {
            const instruct = moveInstructions[instructIndex];

            key = instruct === 'L' ? mappedObj[key][0] : mappedObj[key][1];

            count += 1;
            instructIndex = (instructIndex + 1) % moveInstructions.length;
        }
        steps.push(count);
    }

    console.log(
        'Le nombre de "pas" à faire est :',
        steps.reduce((acc, current) => {
            return ppcm(acc, current);
        }, 1),
    );
});
