let cash: number = 10;
let bet: number;
let winCount: number = 0;
let lossCount: number = 0;

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

const low: number [] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const mid: number [] = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
const high: number [] = [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];

const betIncrease = async (cash: number, startingBet: number) => {
    if (cash < 13) {
        bet = startingBet;
    }
    if (cash > 13 && cash < 20) {
        bet = 2;
    }
    if ( cash > 200 ) {
        bet = 5;
    }
    return bet;
}

const picks = async () => {
    let pick: number [];
    let rand: number = getRandomInt(3);
    switch(rand) {
        case 0: {
            return pick = low;
        }
        case 1: {
            return pick = mid;
        }
        case 2: {
            return pick = high;
        }
        default: {
            return pick = low;
        }
    }
}

const roll = async () => {
    let result: number = getRandomInt(38);
    let pickOne = await picks();
    let pickTwo = await picks();
    while (pickOne === pickTwo) {
        pickOne = await picks();
        pickTwo = await picks();
    }
    if (pickOne.includes(result)) {
        return 'win';
    } else if (pickTwo.includes(result)) {
        return 'win';
    }
    return 'loss';
}

const play = async (bet: number, rounds: number) => {
    for (let i: number = 0; i < rounds; i++) {
        bet = await betIncrease(cash, bet);
        //await new Promise(r => setTimeout(r, 2000));
        let result: string = await roll();
        if (result === 'win') {
            cash += bet * 3;
            cash -= bet;
            winCount++;
            console.log(result + ' current cash: ' + cash + ' current bet: ' + bet);
        } else {
            cash -= bet * 2;
            lossCount++;
            console.log(result + ' current cash: ' + cash  + ' current bet: ' + bet);
        }
        if (cash < 0) {
            console.log('You broke');
            break;
        }
    }
    console.log('Wins: ' + winCount + ' Losses: ' + lossCount + ' Ending cash: ' + cash);
}

play(1, 20);
