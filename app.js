const express = require("express")
const bodyParser = require("body-parser")
const path = require("path");
const decks = require(__dirname+"/decks.js");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


var deck1Index = 0;
var deck2Index = 0;

const deck1 = [];
const deck2 = [];

var p1Hand = [];
var p2Hand = [];

function gameStart() {
    decks.makeDeck(deck1);
    decks.makeDeck(deck2);

    p1Hand = [deck1[0], deck1[1]];
    p2Hand = [deck2[0], deck2[1]];

    console.log(p1Hand);
    console.log(p2Hand);
}

gameStart()
app.listen(3000)