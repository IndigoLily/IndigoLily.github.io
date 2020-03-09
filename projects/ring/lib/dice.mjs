function randInt(max) {
    if (max <= 1) return 1;
    return Math.floor(Math.random()*max) + 1;
}

function roll(dice, sides) {
    const rolls = [];
    for (let i = 0; i < dice; i++) {
        rolls.push(randInt(sides));
    }
    return rolls.sort((a,b) => a-b); // sorted least to greatest
}

function dropHigh(numArray, n = 1) {
    if (n < 1) return numArray;
    if (n >= numArray.length) return [];
    return numArray.slice(0, -n);
}

function dropLow(numArray, n = 1) {
    if (n < 1) return numArray;
    if (n >= numArray.length) return [];
    return numArray.slice(n);
}

function rollAdvantage() {
    return dropLow(roll(2, 20));
}

function rollDisadvantage() {
    return dropHigh(roll(2, 20));
}

function flatSum(rollsOrNumsArray) { // can be of form [1,2,3], [[1,2,3],4,5,6], or [[1,2,3],[1,2,3]]
    let sum = 0;
    for (let i = 0; i < rollsOrNumsArray.length; i++) {
        if (typeof rollsOrNumsArray[i] === 'number') {
            sum += rollsOrNumsArray[i];
        } else {
            sum += flatSum(rollsOrNumsArray[i]);
        }
    }
    return sum;
}

function rollStats() {
    let rolls = [];
    for (let i = 0; i < 6; i++) {
        rolls.push(flatSum(dropLow(roll(4, 6))));
    }
    return rolls.sort((a,b) => b-a);
}

export {
    roll,
    dropHigh,
    dropLow,
    rollAdvantage,
    rollDisadvantage,
    rollStats,
    flatSum
};
