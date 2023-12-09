import readline from 'readline';
import fs from 'fs';

const filePath = 'input.txt';

const readLine = readline.createInterface({
    input: fs.createReadStream(filePath),
});

const cardOrder = 'AKQJT98765432';

let hands = [];
let bids = [];

const compareTwoHands = (hand1, hand2) => {
    for (let i = 0; i < 5; i++) {
        const result = cardOrder.indexOf(hand1[i]) - cardOrder.indexOf(hand2[i]);
        if (result !== 0) {
            return result;
        }
    }
};

const compareHands = (hand1, hand2) => {
    const cards1 = hand1.split('');
    const cards2 = hand2.split('');
    const type1 = getType(cards1);
    const type2 = getType(cards2);

    if (type1 !== type2) {
        return compareTypes(type1, type2);
    } else {
        return compareTwoHands(cards1, cards2);
    }
};

const calculateWinnings = (hands, bids) => {
    const handsAndBids = hands.map((hand, index) => [hand, bids[index]]);
    handsAndBids.sort((hand1, hand2) => compareHands(hand1[0], hand2[0]));

    return handsAndBids.reduce((acc, handAndBid, index) => acc + handAndBid[1] * (index + 1), 0);
};

const getType = (cards) => {
    const counts = {};

    for (const card of cards) {
        counts[card] = (counts[card] || 0) + 1;
    }

    const uniqueCounts = Object.values(counts);

    if (uniqueCounts.includes(5)) {
        return 'Five';
    } else if (uniqueCounts.includes(4)) {
        return 'Four';
    } else if (uniqueCounts.includes(3) && uniqueCounts.includes(2)) {
        return 'Full';
    } else if (uniqueCounts.includes(3)) {
        return 'Three';
    } else if (uniqueCounts.includes(2) && uniqueCounts.length === 3) {
        return 'Two pair';
    } else if (uniqueCounts.includes(2)) {
        return 'One pair';
    } else {
        return 'High card';
    }
};

function compareTypes(typeA, typeB) {
    const typesOrder = ['Five', 'Four', 'Full', 'Three', 'Two pair', 'One pair', 'High card'];

    const indexA = typesOrder.indexOf(typeA);
    const indexB = typesOrder.indexOf(typeB);

    return indexA - indexB;
}

readLine.on('line', (line) => {
    hands.push(line.split(' ')[0]);
    bids.push(parseInt(line.split(' ')[1]));
});

readLine.on('close', () => {
    const result = calculateWinnings(hands, bids);

    console.log('Total winnings:', result);
});
