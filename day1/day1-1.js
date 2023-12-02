import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

let result = 0;

readLine.on('line', (line) => {
    const numbers = line.match(/[0-9]/g);
    result += parseInt(numbers[0] + numbers[numbers.length - 1]);
});

readLine.on('close', () => {
    console.log(`La solution est : ${result}`);
});
