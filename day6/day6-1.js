import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

let times = [];
let records = [];
let all_records_count = [];

readLine.on('line', (line) => {
    if (line.includes('Time')) {
        times = line.match(/[0-9]+/g).map((numberStr) => parseInt(numberStr));
    }
    if (line.includes('Distance')) {
        records = line.match(/[0-9]+/g).map((numberStr) => parseInt(numberStr));
    }
});

readLine.on('close', () => {
    for (const [index, time] of times.entries()) {
        let records_count = 0;
        for (let pushTime = 1; pushTime < time; pushTime++) {
            const remainingTime = time - pushTime;
            const distance = remainingTime * pushTime;
            if (distance > records[index]) {
                records_count += 1;
            }
        }
        all_records_count[index] = records_count;
    }
    console.log(`La solution est : ${all_records_count.reduce((product, current) => product * current, 1)}`);
});
