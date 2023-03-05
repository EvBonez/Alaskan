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
    for(let i=0; i<possibleHands.length; i++){
        let clubCount = 0; let heartCount = 0; let spadeCount = 0; let diamondCount = 0

    }
}

module.exports.setOmaha = setOmaha;
module.exports.PossibleHand = PossibleHand;