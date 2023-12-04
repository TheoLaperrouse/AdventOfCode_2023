import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

let matrix = [];
let numbers = [];
let gears = [];

const isSpecial = (carac) => /^[^\d.]$/.test(carac);

const isAdjNum = ([gearCoordY, gearCoordX], [number, numberCoord]) => {
    const coordX = Math.max(0, parseInt(numberCoord[1]) - number.length + 1);
    const coordY = numberCoord[0];
    return (
        gearCoordY >= coordY - 1 &&
        gearCoordY <= coordY + 1 &&
        gearCoordX >= coordX - 1 &&
        gearCoordX <= numberCoord[1] + 1
    );
};

readLine.on('line', (line) => {
    matrix.push(line);
});

readLine.on('close', () => {
    for (const [indexLine, line] of matrix.entries()) {
        let number = '';
        let sign = false;

        for (const [indexChar, char] of line.split('').entries()) {
            if (char === '*') {
                gears.push([indexLine, indexChar]);
            }
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
                    numbers.push([number, [indexLine, indexChar - 1]]);
                }
                number = '';
                sign = false;
            }
        }
        if (sign && number != '') {
            numbers.push([number, [indexLine, line.length - 1]]);
        }
    }

    let sum = 0;
    for (const g of gears) {
        const adjNum = [];
        for (const num of numbers) {
            if (isAdjNum(g, num)) {
                adjNum.push(num[0]);
            }
        }
        if (adjNum.length === 2) {
            sum += adjNum[0] * adjNum[1];
        }
    }

    console.log(`La solution est : ${sum}`);
});
