const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const cardSuits = ["♣️", "♦️", "♥️", "♠️"];
const cardValueValues = [1,2,3,4,5,6,7,8,9,10,10,10,10]
const straightOrder = [2,3,4,5,6,7,8,9,10,11,12,13,14]
class Card{
    constructor(value, suit, valueValues, straightOrder) {
    this.value = value;
    this.suit = suit;
    this.valueValues = valueValues;
    this.straightOrder = straightOrder;
    }
}

exports.makeDeck = function (deckName) {
    //creates the deck
    for(let i=0; i<13; i++){
        for(let j=0; j<4; j++){
            let newCard = new Card(cardValues[i],cardSuits[j], cardValueValues[i], straightOrder[i])
            deckName.push(newCard);
        }
    }
    //Shuffles the deck
    let currentIndex = deckName.length,  randomIndex;
    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [deckName[currentIndex], deckName[randomIndex]] = [
            deckName[randomIndex], deckName[currentIndex]];
    }

    //Adds Jokers
    deckName.push(new Card("JOKER","JOKER","0", "0"))
    deckName.push(new Card("JOKER","JOKER", "0", "0"))
}
