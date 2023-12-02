import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const numbersRegex = /[0-9]+/g;

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

const updateMaxValue = (currentMax, newValue) => (currentMax !== null ? Math.max(currentMax, newValue) : newValue);

let result = 0;

readLine.on('line', (line) => {
    let [maxRed, maxGreen, maxBlue] = [null, null, null];

    const sets = line.split(':')[1].split(';');
    for (const set of sets) {
        let [sumRed, sumGreen, sumBlue] = [0, 0, 0];
        for (const color of set.split(',')) {
            let numberOfCubes = parseInt(color.match(numbersRegex)[0]);
            if (color.includes('red')) {
                sumRed += numberOfCubes;
            } else if (color.includes('green')) {
                sumGreen += numberOfCubes;
            } else {
                sumBlue += numberOfCubes;
            }
        }
        maxRed = updateMaxValue(sumRed, maxRed);
        maxGreen = updateMaxValue(sumGreen, maxGreen);
        maxBlue = updateMaxValue(sumBlue, maxBlue);
    }

    result += maxRed * maxGreen * maxBlue;
});

readLine.on('close', () => {
    console.log(`La solution est : ${result}`);
});
