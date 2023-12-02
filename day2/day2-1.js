import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const numbersRegex = /[0-9]+/g;

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

let result = 0;

readLine.on('line', (line) => {
    const sets = line.split(':')[1].split(';');
    for (const set of sets) {
        let [sumRed, sumGreen, sumBlue] = [0, 0, 0];
        for (const color of set.split(',')) {
            if (color.includes('red')) {
                sumRed += color.match(numbersRegex)[0];
            } else if (color.includes('green')) {
                sumGreen += color.match(numbersRegex)[0];
            } else {
                sumBlue += color.match(numbersRegex)[0];
            }
            if (sumRed > 12 || sumGreen > 13 || sumBlue > 14) {
                return;
            }
        }
    }
    result += parseInt(line.match(numbersRegex)[0]);
});

readLine.on('close', () => {
    console.log(`La solution est : ${result}`);
});
