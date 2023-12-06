import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

let time;
let record;
let result = 0;

readLine.on('line', (line) => {
    if (line.includes('Time')) {
        time = parseInt(line.match(/[0-9]+/g).join(''));
    }
    if (line.includes('Distance')) {
        record = parseInt(line.match(/[0-9]+/g).join(''));
    }
});

readLine.on('close', () => {
    for (let pushTime = 1; pushTime < time; pushTime++) {
        const remainingTime = time - pushTime;
        const distance = remainingTime * pushTime;
        if (distance > record) {
            result += 1;
        }
    }
    console.log(`La solution est : ${result}`);
});
