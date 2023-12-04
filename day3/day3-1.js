import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

let matrix = [];
let numbers = [];

const isSpecial = (carac) => /^[^\d.]$/.test(carac);

readLine.on('line', (line) => {
    matrix.push(line);
});

readLine.on('close', () => {
    for (const [indexLine, line] of matrix.entries()) {
        let number = '';
        let sign = false;

        for (const [indexChar, char] of line.split('').entries()) {
            if (!isNaN(char)) {
                const adjacentChars = [
                    matrix?.[indexLine - 1]?.[indexChar - 1],
                    matrix?.[indexLine - 1]?.[indexChar],
                    matrix?.[indexLine - 1]?.[indexChar + 1],
                    matrix?.[indexLine]?.[indexChar - 1],
                    matrix?.[indexLine]?.[indexChar + 1],
                    matrix?.[indexLine + 1]?.[indexChar - 1],
                    matrix?.[indexLine + 1]?.[indexChar],
                    matrix?.[indexLine + 1]?.[indexChar + 1],
                ];
                if (adjacentChars.some((char) => isSpecial(char))) {
                    sign = true;
                }
                number += char;
            } else {
                if (sign && number != '') {
                    numbers.push(number);
                }
                sign = false;
                number = '';
            }
        }
        if (sign && number != '') {
            numbers.push(number);
        }
    }

    console.log(`La solution est : ${numbers.reduce((acc, valeur) => acc + parseInt(valeur), 0)}`);
});
