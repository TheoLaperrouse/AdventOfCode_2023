import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

let sum = 0;

readLine.on('line', (line) => {
    const formattedLine = line
        .replace(/one/g, 'o1e')
        .replace(/two/g, 't2o')
        .replace(/three/g, 't3e')
        .replace(/four/g, 'f4r')
        .replace(/five/g, 'f5e')
        .replace(/six/g, 's6x')
        .replace(/seven/g, 's7n')
        .replace(/eight/g, 'e8t')
        .replace(/nine/g, 'n9e');

    const numbers = formattedLine.match(/[0-9]/g);
    sum += parseInt(numbers[0] + numbers[numbers.length - 1]);
});

readLine.on('close', () => {
    console.log(`La solution est : ${sum}`);
});
