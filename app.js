const express = require("express")
const bodyParser = require("body-parser")
const path = require("path");
const decks = require(__dirname+"/decks.js");
const rankings = require(__dirname+"/rankings.js")
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//Game variables
var deck1Index = 4;
var deck2Index = 4;

var deck1NumberOfCards = 48;
var deck2NumberOfCards = 48;

const deck1 = [];
const deck2 = [];
const deckBoard = [];

var p1Hand = [];
var p2Hand = [];
var board = [];

var p1FirstCard = ""
var p1SecondCard = ""
var p1ThirdCard = ""
var p1FourthCard = ""

var p2FirstCard = ""
var p2SecondCard = ""
var p2ThirdCard = ""
var p2FourthCard = ""

var boardCard1= ""
var boardCard2= ""
var boardCard3= ""
var boardCard4= ""
var boardCard5= ""

//game logic
function gameStart() {
    decks.makeDeck(deck1);
    decks.makeDeck(deck2);
    decks.makeDeck(deckBoard);

    p1Hand = [deck1[0], deck1[1], deck1[2], deck1[3]];
    p2Hand = [deck2[0], deck2[1], deck2[2], deck2[3]];
    p1FirstCard = p1Hand[0];
    p1SecondCard = p1Hand[1];
    p1ThirdCard = p1Hand[2];
    p1FourthCard = p1Hand[3];
    p2FirstCard = p2Hand[0];
    p2SecondCard = p2Hand[1];
    p2ThirdCard = p2Hand[2];
    p2FourthCard = p2Hand[3];
    boardCard1 = deckBoard[1]
    boardCard2 = deckBoard[2]
    boardCard3 = deckBoard[3]
    boardCard4 = deckBoard[5]
    boardCard5 = deckBoard[7]
    /* p1FirstCard = new decks.Card("A","♣️","","14")
    p1SecondCard = new decks.Card("K","♣️","","13")
    p1ThirdCard = new decks.Card("Q","♣️","","12")
    p1FourthCard = new decks.Card("10","♣️","","10")
    p2FirstCard = new decks.Card("7","♣️","","7")
    p2SecondCard = new decks.Card("6","♣️","","6")
    p2ThirdCard = new decks.Card("5","♣️","","5")
    p2FourthCard = new decks.Card("4","♣️","","4")
    boardCard1 = new decks.Card("J","♣️","","11")
    boardCard2 = new decks.Card("K","♣️","","13")
    boardCard3 = new decks.Card("10","♣️","","10")
    boardCard4 = new decks.Card("4","♣️","","4")
    boardCard5 = new decks.Card("3","♣️","","3")
    p1Hand = [p1FirstCard, p1SecondCard, p1ThirdCard, p1FourthCard] */
    board = [boardCard1, boardCard2, boardCard3, boardCard4, boardCard5]
}


gameStart();
const omahaHandsP1 = rankings.setOmaha(p1Hand, board)

const checkedFlushesP1 = rankings.checkFlush(omahaHandsP1)
const checkedStraightsP1 = rankings.checkStraight(omahaHandsP1)
const checkedPairsP1 = rankings.checkPair(omahaHandsP1)
const checked2PairsP1 = rankings.check2Pair(checkedPairsP1)

const omahaHandsP2 = rankings.setOmaha(p2Hand, board)

const checkedFlushesP2 = rankings.checkFlush(omahaHandsP2)
const checkedStraightsP2 = rankings.checkStraight(omahaHandsP2)
const checkedPairsP2 = rankings.checkPair(omahaHandsP2)
const checked2PairsP2 = rankings.check2Pair(checkedPairsP2)

const p1HandStrength = rankings.evaluateHands(omahaHandsP1)
const p2HandStrength = rankings.evaluateHands(omahaHandsP2)



console.log("P1: ")
console.log("F: "+checkedFlushesP1);
console.log("S: "+checkedStraightsP1);
console.log("Is SF?: "+rankings.checkStraightFlush(checkedFlushesP1,checkedStraightsP1))
console.log("P: "+checkedPairsP1.values[0]);
console.log("2P?: "+checked2PairsP1)
console.log("3, 4, 5?: "+checkedPairsP1.highest)
console.log("Strength: "+p1HandStrength)
console.log("")
console.log("P2: ")
console.log("F: "+checkedFlushesP2);
console.log("S: "+checkedStraightsP2);
console.log("Is SF?: "+rankings.checkStraightFlush(checkedFlushesP2,checkedStraightsP2))
console.log("P: "+checkedPairsP2.values[0]);
console.log("2P? "+checked2PairsP2)
console.log("3 ,4 ,5?: "+checkedPairsP2.highest)
console.log("Strength: "+p2HandStrength)
console.log("")
rankings.determineWinner(p1HandStrength, p2HandStrength)

//Gets
app.get("/", function (req, res) {
    res.render("index",{
        p1FirstCard:p1FirstCard.value+p1FirstCard.suit,
        p1SecondCard:p1SecondCard.value+p1SecondCard.suit,
        p1ThirdCard:p1ThirdCard.value+p1ThirdCard.suit,
        p1FourthCard:p1FourthCard.value+p1FourthCard.suit,
        p2FirstCard:p2FirstCard.value+p2FirstCard.suit,
        p2SecondCard:p2SecondCard.value+p2SecondCard.suit,
        p2ThirdCard:p2ThirdCard.value+p2ThirdCard.suit,
        p2FourthCard:p2FourthCard.value+p2FourthCard.suit,
        deck1NumberOfCards:deck1NumberOfCards,
        deck2NumberOfCards:deck2NumberOfCards,
        boardCard1: boardCard1.value+boardCard1.suit,
        boardCard2: boardCard2.value+boardCard2.suit,
        boardCard3: boardCard3.value+boardCard3.suit,
        boardCard4: boardCard4.value+boardCard4.suit,
        boardCard5: boardCard5.value+boardCard5.suit,
        });
});

//Posts
app.post("/", function (req, res) {
    if(req.body.hasOwnProperty("p1FirstCard-button")){
        let playValue = p1FirstCard.valueValues
        p1FirstCard = deck1[deck1Index];
        deck1Index+=playValue
        deck1NumberOfCards-=playValue
    }
    else if(req.body.hasOwnProperty("p1SecondCard-button")){
        let playValue = p1SecondCard.valueValues
        p1SecondCard = deck1[deck1Index];
        deck1Index+=playValue
        deck1NumberOfCards-=playValue
    }
    else if(req.body.hasOwnProperty("p1ThirdCard-button")){
        let playValue = p1ThirdCard.valueValues
        p1ThirdCard = deck1[deck1Index];
        deck1Index+=playValue
        deck1NumberOfCards-=playValue
    }
    else if(req.body.hasOwnProperty("p1FourthCard-button")){
        let playValue = p1FourthCard.valueValues
        p1FourthCard = deck1[deck1Index];
        deck1Index+=playValue
        deck1NumberOfCards-=playValue
    }
    else if(req.body.hasOwnProperty("p2FirstCard-button")){
        let playValue = p2FirstCard.valueValues
        p2FirstCard = deck2[deck2Index];
        deck2Index+=playValue
        deck2NumberOfCards-=playValue
    }
    else if(req.body.hasOwnProperty("p2SecondCard-button")){
        let playValue = p2SecondCard.valueValues
        p2SecondCard = deck2[deck2Index];
        deck2Index+=playValue
        deck2NumberOfCards-=playValue
    }
    else if(req.body.hasOwnProperty("p2ThirdCard-button")){
        let playValue = p2ThirdCard.valueValues
        p2ThirdCard = deck2[deck2Index];
        deck2Index+=playValue
        deck2NumberOfCards-=playValue
    }
    else if(req.body.hasOwnProperty("p2FourthCard-button")){
        let playValue = p2FourthCard.valueValues
        p2FourthCard = deck2[deck2Index];
        deck2Index+=playValue
        deck2NumberOfCards-=playValue
    }
    res.redirect("/")
});

app.listen(3000)