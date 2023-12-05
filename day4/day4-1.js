import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

let result = 0;

readLine.on('line', (line) => {
    let compteur = 0;
    const lineSplitted = line.split(':')[1];
    const [winningNumbers, setNumbers] = lineSplitted.split('|').map((set) => set.match(/[0-9]+/g));
    for (const number of setNumbers) {
        if (winningNumbers.includes(number)) {
            compteur += 1;
        }
    }
    if (compteur > 0) {
        result += Math.pow(2, compteur - 1);
    }
});

readLine.on('close', () => {
    console.log(`La solution est : ${result}`);
});
