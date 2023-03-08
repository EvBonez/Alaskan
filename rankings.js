const highCard = 0
const pair = 1
const twoPair = 2
const threeOfAKind = 3
const straight = 4
const flush = 5
const fullHouse = 6
const straightFlush = 7

class PossibleHand {
    constructor(firstHole, secondHole, firstBoard, secondBoard, thirdBoard) {
        this.firstHole = firstHole
        this.secondHole = secondHole
        this.firstBoard = firstBoard
        this.secondBoard = secondBoard
        this.thirdBoard = thirdBoard

    }
}

function setOmaha (hand, board){
    let possibleHoles = []
    possibleHoles[0] = [hand[0], hand[1]];
    possibleHoles[1] = [hand[0], hand[2]];
    possibleHoles[2] = [hand[0], hand[3]];
    possibleHoles[3] = [hand[1], hand[2]];
    possibleHoles[4] = [hand[1], hand[3]];
    possibleHoles[5] = [hand[2], hand[3]];

    let possibleBoards = []
    possibleBoards[0] = [board[0], board[1], board[2]];
    possibleBoards[1] = [board[0], board[1], board[3]];
    possibleBoards[2] = [board[0], board[1], board[4]];
    possibleBoards[3] = [board[0], board[2], board[3]];
    possibleBoards[4] = [board[0], board[2], board[4]];
    possibleBoards[5] = [board[0], board[3], board[4]];
    possibleBoards[6] = [board[1], board[2], board[3]];
    possibleBoards[7] = [board[1], board[2], board[4]];
    possibleBoards[8] = [board[1], board[3], board[4]];
    possibleBoards[9] = [board[2], board[3], board[4]];

    let possibleHands = []
    let  index = 0
    for(let i=0; i<6; i++){
        for(let j=0; j<10; j++){
            possibleHands[index]= new PossibleHand(possibleHoles[i][0], possibleHoles[i][1], possibleBoards[j][0], possibleBoards[j][1], possibleBoards[j][2])
            index++
        }
    }
    return possibleHands
}
function checkFlush(possibleHands) {
    let isFlush = false
    let possibleHandsLength = possibleHands.length
    let flushIndexes = []
    for(let i=0; i<possibleHandsLength; i++){
        let sortedHand = []
        sortedHand.push(possibleHands[i].firstHole.suit, possibleHands[i].secondHole.suit, possibleHands[i].firstBoard.suit, possibleHands[i].secondBoard.suit, possibleHands[i].thirdBoard.suit)
        sortedHand = sortedHand.sort()
        if(sortedHand[0] === sortedHand[4]){
            isFlush = true
            flushIndexes.push(i)
        }
    }if (isFlush === true){
        return flushIndexes
    }else return false
}

function checkStraight(possibleHands){
    let isStraight = false;
    let possibleHandsLength = possibleHands.length
    let straightIndexes = []
    for(let i=0; i<possibleHandsLength; i++){
        let sortedHand = []
        sortedHand.push(possibleHands[i].firstHole.straightOrder, possibleHands[i].secondHole.straightOrder, possibleHands[i].firstBoard.straightOrder, possibleHands[i].secondBoard.straightOrder, possibleHands[i].thirdBoard.straightOrder)
        sortedHand = sortedHand.sort()
        if (sortedHand[0] === (sortedHand[4]-4) && sortedHand[0] === (sortedHand[3]-3) && sortedHand[0] === (sortedHand[2]-2) && sortedHand[0] === (sortedHand[1]-1)){
            isStraight = true;
            straightIndexes.push(i)
        }
    }if (isStraight === true){
        return straightIndexes
    }else return false
}

function checkPair(possibleHands) {
    let isPair = false;
    let possibleHandsLength = possibleHands.length;
    let sortedHand = [];
    let pairs = [];
    for (let i = 0; i < possibleHandsLength; i++) {
        sortedHand = [];
        sortedHand.push(possibleHands[i].firstHole.straightOrder, possibleHands[i].secondHole.straightOrder, possibleHands[i].firstBoard.straightOrder, possibleHands[i].secondBoard.straightOrder, possibleHands[i].thirdBoard.straightOrder);
        sortedHand = sortedHand.sort();
        for (let k = 0; k < 4; k++) {
            if (sortedHand[k] === sortedHand[k+1]) {
                isPair = true;
                if (pairs.includes(sortedHand[k]) === false) {
                    pairs.push(sortedHand[k]);
                }
            }
        }
    }
    if(isPair === true){
        return pairs;
    }else return false
}
function checkStraightFlush(flushIndexes, straightIndexes) {
    let isStraightFlush = false;
    let flushIndexesLength = flushIndexes.length
    let straightIndexesLength = straightIndexes.length
    for(let i=0; i<flushIndexesLength; i++){
        for (let j=0; j<straightIndexesLength; j++){
            if(flushIndexes[i] === flushIndexes[j]){
                isStraightFlush = true
            }
        }
    }
    return isStraightFlush === true;
}
module.exports.setOmaha = setOmaha;
module.exports.PossibleHand = PossibleHand;
module.exports.checkFlush = checkFlush;
module.exports.checkStraight = checkStraight;
module.exports.checkPair = checkPair;
module.exports.checkStraightFlush = checkStraightFlush;