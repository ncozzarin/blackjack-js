let blackjackGame = {
    'you' : {'scoreSpan': '#your-result', 'div' : '#your-box', 'score' : 0},
    'dealer' : {'scoreSpan': '#dealer-result', 'div' : '#dealer-box', 'score' : 0},
    'card': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]}
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio('sounds/swish.m4a');


document.querySelector('#hit-button').addEventListener('click', blackjackHit);
document.querySelector('#deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#stand-button').addEventListener('click', dealerLogic);


function blackjackHit(){
    let card = randomCard();
    showCard(card,YOU);
    updateScore(card,YOU);
    showScore(YOU);
    
}

function showCard(card,activePlayer){
    if(activePlayer['score'] <= 21)
    {
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
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
    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector(YOU['scoreSpan']).style.color = 'white';
    document.querySelector(DEALER['scoreSpan']).style.color = 'white';
    document.querySelector(YOU['scoreSpan']).textContent = 0;
    document.querySelector(DEALER['scoreSpan']).textContent = 0;

}

function randomCard(){
    let randomIndex = Math.floor(Math.random()*13);
    return blackjackGame['card'][randomIndex];
}

function updateScore(card, activePlayer){
    if(card === 'A')
    {    
        if(activePlayer['score'] + blackjackGame['cardMap'][card][1] <= 21){
            activePlayer['score'] += blackjackGame['cardMap'][card][1];
        }
        else{
            activePlayer['score'] += blackjackGame['cardMap'][card][0];
        }
    }
    else
    {
        activePlayer['score'] += blackjackGame['cardMap'][card];
    }
    

}

function showScore(activePlayer){
    console.log(activePlayer['score']);
    if(activePlayer['score'] > 21)
    {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'Bust!'; 
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';   
    }else{
    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}
}

function dealerLogic()
{
    
       let card = randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
}

// Compute scores and return winner

function computeWinner(){
    let winner;

    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            winner = YOU;
        }else if(YOU['score'] < DEALER['score'])
        {
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score'])
        {
            // draw
        }
    // You bust and dealer didnt
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        winner = DEALER;
    }else if(YOU['score'] > 21 && DEALER['score'] > 21){
        // draw
    }
}