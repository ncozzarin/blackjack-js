let blackjackGame = {
    'you' : {'scoreSpan': '#your-result', 'div' : '#your-box', 'score' : 0},
    'dealer' : {'scoreSpan': '#dealer-result', 'div' : '#dealer-box', 'score' : 0},
    'card': ['2','3','4','5','6','7','8','9','10','K','J','Q','A']
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('sounds/swish.m4a');


document.querySelector('#hit-button').addEventListener('click', blackjackHit);
document.querySelector('#deal-button').addEventListener('click', blackjackDeal);



function blackjackHit(){
    let card = randomCard();
    
    showCard(YOU,card);
}

function showCard(activePlayer, card){
    let cardImage = document.createElement('img');
    cardImage.src = `images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    hitSound.play();
}

function blackjackDeal(){
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for(i = 0; i < yourImages.length; i++){
        yourImages[i].remove();
    }
    for(i = 0; i < dealerImages.length; i++){
        dealerImages[i].remove();
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['card'][randomIndex];
}