import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

let seeds = [];
let mappingArray = [];
let index = -1;

const applyMapping = (seed, [destinationRangeStart, sourceRangeStart, rangeLength]) => {
    if (seed >= sourceRangeStart && seed < sourceRangeStart + rangeLength) {
        return seed + destinationRangeStart - sourceRangeStart;
    }
    return null;
};

readLine.on('line', (line) => {
    if (line.includes('seeds')) {
        const seedsInput = line.match(/[0-9]+/g).map((numberStr) => parseInt(numberStr));
        for (let i = 0; i < seedsInput.length; i += 2) {
            const [source, range] = seedsInput.slice(i, i + 2);
            for (let seedNumber = source; seedNumber < source + range; seedNumber++) {
                if (!seeds.includes(seedNumber)) {
                    seeds.push(seedNumber);
                }
            }
        }
    } else if (line.includes('map')) {
        index += 1;
    } else if (line.match(/[0-9]+/g)?.length > 0) {
        mappingArray[index] = [
            ...(mappingArray[index] ?? []),
            line.match(/[0-9]+/g).map((numberStr) => parseInt(numberStr)),
        ];
    }
});

readLine.on('close', () => {
    for (const mapping of mappingArray) {
        for (let [index, seed] of seeds.entries()) {
            let newSeed = null;
            for (const rangeDesc of mapping) {
                const mappedSeed = applyMapping(seed, rangeDesc);
                if (mappedSeed) {
                    newSeed = mappedSeed;
                }
            }
            if (newSeed) {
                seeds[index] = newSeed;
            }
            console.log(seeds[index]);
        }
    }
    console.log(`La solution est : ${Math.min(...seeds)}`);
});
