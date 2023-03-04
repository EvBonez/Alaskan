const express = require("express")
const bodyParser = require("body-parser")
const path = require("path");
const decks = require(__dirname+"/decks.js");
const {playCard} = require("./decks");
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

var p1Hand = [];
var p2Hand = [];

var p1FirstCard = ""
var p1SecondCard = ""
var p1ThirdCard = ""
var p1FourthCard = ""

var p2FirstCard = ""
var p2SecondCard = ""
var p2ThirdCard = ""
var p2FourthCard = ""

//game logic
function gameStart() {
    decks.makeDeck(deck1);
    decks.makeDeck(deck2);

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
}


gameStart();


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
    if(req.body.hasOwnProperty("p1SecondCard-button")){
        let playValue = p1SecondCard.valueValues
        p1SecondCard = deck1[deck1Index];
        deck1Index+=playValue
        deck1NumberOfCards-=playValue
    }
    if(req.body.hasOwnProperty("p1ThirdCard-button")){
        let playValue = p1ThirdCard.valueValues
        p1ThirdCard = deck1[deck1Index];
        deck1Index+=playValue
        deck1NumberOfCards-=playValue
    }
    if(req.body.hasOwnProperty("p1FourthCard-button")){
        let playValue = p1FourthCard.valueValues
        p1FourthCard = deck1[deck1Index];
        deck1Index+=playValue
        deck1NumberOfCards-=playValue
    }
    if(req.body.hasOwnProperty("p2FirstCard-button")){
        let playValue = p2FirstCard.valueValues
        p2FirstCard = deck2[deck2Index];
        deck2Index+=playValue
        deck2NumberOfCards-=playValue
    }
    if(req.body.hasOwnProperty("p2SecondCard-button")){
        let playValue = p2SecondCard.valueValues
        p2SecondCard = deck2[deck2Index];
        deck2Index+=playValue
        deck2NumberOfCards-=playValue
    }
    if(req.body.hasOwnProperty("p2ThirdCard-button")){
        let playValue = p2ThirdCard.valueValues
        p1ThirdCard = deck2[deck2Index];
        deck2Index+=playValue
        deck2NumberOfCards-=playValue
    }
    if(req.body.hasOwnProperty("p2FourthCard-button")){
        let playValue = p2FourthCard.valueValues
        p2FourthCard = deck2[deck2Index];
        deck2Index+=playValue
        deck2NumberOfCards-=playValue
    }
    res.redirect("/")
});

app.listen(3000)