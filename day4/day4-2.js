import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

let cards = [];

readLine.on('line', (line) => {
    cards.push(line);
});

readLine.on('close', () => {
    let numberOfCards = Array.from({ length: cards.length }, () => 1);

    for (const [index, card] of cards.entries()) {
        let compteur = 0;
        const lineSplitted = card.split(':')[1];
        const [winningNumbers, setNumbers] = lineSplitted.split('|').map((set) => set.match(/[0-9]+/g));

        for (const number of setNumbers) {
            if (winningNumbers.includes(number)) {
                compteur += 1;
            }
        }

        for (let i = index; i < index + compteur; i++) {
            if (i + 1 < numberOfCards.length) {
                numberOfCards[i + 1] += numberOfCards[index];
            }
        }
    }

    console.log(`La solution est : ${numberOfCards.reduce((sum, current) => sum + current, 0)}`);
});
