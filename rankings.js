const punycode = require("punycode");
const highCard = 0
const pair = 1
const twoPair = 2
const threeOfAKind = 3
const straight = 4
const flush = 5
const fullHouse = 6
const fourOfAKind = 7
const straightFlush = 8
const fiveOfAKind = 9

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
    let isTrips = false;
    let isQuads = false;
    let isPents = false
    let isFullHouse = false;
    let possibleHandsLength = possibleHands.length;
    let sortedHand = [];
    let pairValues = [];
    let pairIndexes = [];
    let tripValues = [];
    let tripIndexes = [];
    let quadValues = [];
    let quadIndexes = [];
    let pentValues = [];
    let pentIndexes = [];
    let boatValues = [];
    let boatIndexes = [];
    for (let i = 0; i < possibleHandsLength; i++) {
        sortedHand = [];
        sortedHand.push(possibleHands[i].firstHole.straightOrder, possibleHands[i].secondHole.straightOrder, possibleHands[i].firstBoard.straightOrder, possibleHands[i].secondBoard.straightOrder, possibleHands[i].thirdBoard.straightOrder);
        sortedHand = sortedHand.sort();
        for (let k = 0; k < 4; k++) {
            switch (sortedHand[k]) {
                case sortedHand[k + 4]:
                    isPents = true
                    pentIndexes.push(i)
                    pentValues.push(sortedHand[k])
                    break
                case sortedHand[k + 3]:
                    isQuads = true
                    quadIndexes.push(i)
                    quadValues.push(sortedHand[k])
                    break
                case sortedHand[k + 2]:
                    isTrips = true
                    tripIndexes.push(i)
                    tripValues.push(sortedHand[k])
                    break
                case sortedHand[k + 1]:
                    isPair = true;
                    pairIndexes.push(i);
                    pairValues.push(sortedHand[k])
                    break
                default:
            }
        }
    }
    let tripIndexesLength = tripIndexes.length
    for(let i=0; i<tripIndexesLength; i++){
        sortedHand = []
        sortedHand.push(possibleHands[tripIndexes[i]].firstHole.straightOrder, possibleHands[tripIndexes[i]].secondHole.straightOrder, possibleHands[tripIndexes[i]].firstBoard.straightOrder, possibleHands[tripIndexes[i]].secondBoard.straightOrder, possibleHands[tripIndexes[i]].thirdBoard.straightOrder);
        sortedHand = sortedHand.sort();
        if(sortedHand[0] === sortedHand[1] && sortedHand[3] === sortedHand[4]){
            boatValues.push(sortedHand[0])
            boatIndexes.push(i)
            isFullHouse = true
        }
    }
    switch (true){
        case isPents:
            pentValues.sort()
            pentValues.reverse()
            return {
                highest: 6,
                values: pentValues,
                indexes: pentIndexes
            }
        case isQuads:
            quadValues.sort()
            quadValues.reverse()
            return {
                highest: 5,
                values: quadValues,
                indexes: quadIndexes
            }
        case isFullHouse:
            boatValues.sort()
            boatValues.reverse()
            return {
                highest: 4,
                values: boatValues,
                indexes: boatIndexes
            }
        case isTrips:
            tripValues.sort()
            tripValues.reverse()
            return {
                highest: 3,
                values: tripValues,
                indexes: tripIndexes
            }
        case isPair:
            pairValues.sort()
            pairValues.reverse()
            return {
                highest: 2,
                indexes: pairIndexes,
                values: pairValues,
            }
        default:
            return {
                highest: 0,
                indexes: pairIndexes,
                values: pairValues,
            }
    }
}
function checkStraightFlush(flushIndexes, straightIndexes) {
    let isStraightFlush = false;
    let flushIndexesLength = flushIndexes.length
    let straightIndexesLength = straightIndexes.length
    for(let i=0; i<flushIndexesLength; i++){
        for (let j=0; j<straightIndexesLength; j++){
            if(flushIndexes[i] === straightIndexes[j]){
                isStraightFlush = true
            }
        }
    }
    return isStraightFlush === true;
}

function check2Pair(pairOutput){
    let isTwoPair = false
    let pairIndexesLength = pairOutput.indexes.length
    if(pairIndexesLength === 0) {
        return false
    }
    let index = 1
    let highestPair = 0
    for(let i=0; i<pairIndexesLength-1; i++){
        for(let j=index; j<pairIndexesLength; j++){
            if(pairOutput.indexes[i] === pairOutput.indexes[j]){
                isTwoPair = true
                if(highestPair<pairOutput.values[i]){
                    highestPair = pairOutput.values[i]
                }else if(highestPair<pairOutput.values[j]){
                    highestPair = pairOutput.values[j]
                }
            }
        }
        index++
    }
    if(isTwoPair === true){
        return highestPair
    }else {
        return false}
}

function evaluateHands(hand){
    let handStrength = 0
    let possibleFlushes = checkFlush(hand)
    let isFlush = false
    if(possibleFlushes[0] !== undefined){
        isFlush = true
    }
    let isStraight = false
    let possibleStraights = checkStraight(hand)
    if(possibleStraights[0] !== undefined){
        isStraight = true
    }
    let isStraightFlush = false
    let possibleStraightFlushes = checkStraightFlush(possibleFlushes, possibleStraights)
    if (possibleStraightFlushes === true){
        isStraightFlush = true
    }
    let possiblePairs = checkPair(hand)
    let isBoat = false
    let isTwoPair = false
    let possible2Pairs = check2Pair(possiblePairs)
    if(possible2Pairs > 0){
        isTwoPair = true
    }
    let isPents = false
    let isQuads = false
    let isTrips = false
    let isPair = false

    switch (possiblePairs.highest){
        case 6:
            isPents = true
            break
        case 5:
            isQuads = true
            break
        case 4:
            isBoat = true
            break
        case 3:
            isTrips = true
            break
        case 2:
            isPair = true
            break
        default:
            break
    }
    switch (true){
        case isPents:
            handStrength = fiveOfAKind
            break
        case isStraightFlush:
            handStrength = straightFlush
            break
        case isQuads:
            handStrength = fourOfAKind
            break
        case isBoat:
            handStrength = fullHouse
            break
        case isFlush:
            handStrength = flush
            break
        case isStraight:
            handStrength = straight
            break
        case isTrips:
            handStrength = threeOfAKind
            break
        case isTwoPair:
            handStrength = twoPair
            break
        case isPair:
            handStrength = pair
            break
        default:
            handStrength = highCard
            break
    }
 return handStrength
}

function determineWinner(...handScores){
    let index = 0
    for(let i=1; i<handScores.length; i++){
        if(handScores[i] > handScores[i-1]){
            index = i
        }else if(handScores[i] === handScores[i-1]){
            index = 2
        }
    }
    if (index === 0){
        console.log("PLAYER 1 WINS")
    }else if(index === 1){
        console.log("PLAYER 2 WINS")
    }else{
        console.log("IT'S A DRAW")
    }
}

module.exports.setOmaha = setOmaha;
module.exports.PossibleHand = PossibleHand;
module.exports.checkFlush = checkFlush;
module.exports.checkStraight = checkStraight;
module.exports.checkPair = checkPair;
module.exports.checkStraightFlush = checkStraightFlush;
module.exports.check2Pair = check2Pair;
module.exports.evaluateHands = evaluateHands;
module.exports.determineWinner = determineWinner