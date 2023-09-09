class Card {
    constructor(rank, suit) {
        this.rank = rank; 
        this.suit = suit;
    }
}
//defining each card with a rank and a suit//

class Deck {
    constructor() { 
        this.cards = this.createDeck(); //want to create a deck of cards made with defined suit and rank//
        this.shuffle(); //want random order of cards
    }       
    
    createDeck() {
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
        let suits = ['spades', 'hearts', 'diamonds', 'clubs'];
        let cards = [];

        for(let suit of suits) {
            for(let rank of ranks) {
                cards.push(new Card(rank, suit));  //this gives every card a suit and a rank//
            }
        } return cards; //should have an array of cards//
        
    }

    shuffle() { //shuffles deck//
        for (let i = this.cards.length - 1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1)) /*a new random index before current card; Math.random() gives a random number and (i+1) ensures its not at the current index;
            Math.floor ensures number is an integer*/
            const tempDeck = this.cards[newIndex]; //taking new card//
            this.cards[newIndex] = this.cards[i]; //swaping current card with new card//
            this.cards[i] = tempDeck//new deck with swapped card; this will repeat throughout whole deck//
        }
    }

    deal() { //deals card//
        return this.cards.pop(); //removes last card of the card array and outputs array
    }
}

class Player {
    constructor(name) {
        this.name = name;
        this.hand = []; //the number of cards in hand//
        this.score = 0 //player's card will start at 0 points//
    } 

    takesCard (card) {
        this.hand.push(card); //takes a card and adds to player's hand aray//
    }

    placeCard() {
        return this.hand.pop(); //place the last card in array and remove from deck//
    }

    winsRound() {
        this.score++; //for every round they win, this function gives them a point//
    }

    toString() {
        return `${this.name} || Score: ${this.score}`;
    }
}

class War {
    constructor() {
        this.player1 = new Player('P1');
        this.player2 = new Player('P2');  
        this.deck = new Deck();
        this.tieCount = 0 //starts draws count at 0//
        this.cardValueMap = { //this gives value to each rank, including jacks, queens, kings, and aces//
            '2': 2,
            '3': 3,
            '4': 4,
            '5': 5,
            '6': 6,
            '7': 7,
            '8': 8,
            '9': 9,
            '10': 10,
            'Jack': 10,
            'Queen': 10,
            'King': 10,
            'Ace': 11   
        };    
    }

    startGame() {
        for (let i = 0; i < 26; i++) {
        this.player1.takesCard(this.deck.deal()); //removes card from deck and deals to player 26 cards//
        this.player2.takesCard(this.deck.deal());   
        }
    }    
   
    playRound() {
        let card1 = this.player1.placeCard(); //player plays a card//
        let card2 = this.player2.placeCard();
        let value1 = this.cardValueMap[card1.rank]; //gives value to the specific index of card as stated above//
        let value2 = this.cardValueMap[card2.rank];

        console.log(`${this.player1.name} plays ${card1.rank} of ${card1.suit}`);
        console.log(`${this.player2.name} plays ${card2.rank} of ${card2.suit}`);

        if (value1 === value2) {
            console.log(`**********TIE! Score is P1:${this.player1.score} || P2:${this.player2.score}**********`);
            this.tieCount++ //counts number of ties or draws to show game results in 26 rounds//
        } else if (value1 > value2) {
            this.player1.winsRound(); //gives player 1 point if value is higher//
            console.log(`*****${this.player1.name} scores 1 point! Score is P1:${this.player1.score} || P2:${this.player2.score}*****`);
        } else if (value1 < value2) {
            this.player2.winsRound(); //gives player 2 point if value is higher//
            console.log(`*****${this.player2.name} scores 1 point! Score is P1:${this.player1.score} || P2:${this.player2.score}*****`);
        }   
    }

    isWinner() {//function for end of game; all scores are totaled and compared//
        if (this.player1.score > this.player2.score) {
            console.log(`!!!!!${this.player1.name} wins the game. Final score: P1:${this.player1.score} || P2:${this.player2.score} || Draws:${this.tieCount}!!!!!`);
        } else if (this.player1.score < this.player2.score) {
            console.log(`!!!!!${this.player2.name} wins the game. Final score: P1:${this.player1.score} || P2:${this.player2.score} || Draws:${this.tieCount}!!!!!`);
        } else {
            console.log(`!!!!!Tie game! Final score: P1:${this.player1.score} || P2:${this.player2.score} || Draws:${this.tieCount}!!!!!`);
        }
    }

    playGame() { //function to play whole game//
        this.startGame();
        while (this.player1.hand.length > 0 && this.player2.hand.length > 0) { //players start with 0 cards and plays one card each round// 
            this.playRound(); //game ends when each player playes 26 cards//
        }
        this.isWinner();

    }
}

let war = new War(); //creating instance of War class//
war.playGame() //calling all functions within game of War//

