let blackjackGame = {
    'you' : {'scoreSpan': '#your-result', 'div' : '#your-box', 'score' : 0},
    'dealer' : {'scoreSpan': '#dealer-result', 'div' : '#dealer-box', 'score' : 0},
    'card': ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    'cardMap': {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10,'A':[1,11]},
    'wins': 0,
    'losses': 0,
    'draws':0,
    'isStand': false,
    'turnsOver': false,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

// Sounds
const hitSound = new Audio('sounds/swish.m4a');
const winSound = new Audio('sounds/cash.mp3');
const lossSound = new Audio('sounds/aww.mp3');


document.querySelector('#hit-button').addEventListener('click', blackjackHit);
document.querySelector('#deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#stand-button').addEventListener('click', dealerLogic);

function blackjackHit(){
    if(blackjackGame['isStand'] === false)
    {
        let card = randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
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
    console.log(blackjackGame['turnsOver']);
    if(blackjackGame['turnsOver'] === true)
    {
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

        document.querySelector('#blackjack-results').textContent = "Let's Play!";
        document.querySelector('#blackjack-results').style.color = 'black';

        blackjackGame['turnsOver'] = false;
        blackjackGame['isStand'] = false;
    }
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
    blackjackGame['isStand'] = true;
    let card = randomCard();
    showCard(card,DEALER);
    updateScore(card,DEALER);
    showScore(DEALER);
    if(DEALER['score'] > 16)
    {
        blackjackGame['turnsOver'] = true;
        showResult(computeWinner());
    }else
    {
        // add logic to wait 1 second
        dealerLogic();
    }

}

// Compute scores and return winner

function computeWinner(){
    let winner;

    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || (DEALER['score'] > 21)){
            winner = YOU;
            blackjackGame['wins']++;
        }else if(YOU['score'] < DEALER['score'])
        {
            winner = DEALER;
            blackjackGame['losses']++;
        }else if(YOU['score'] === DEALER['score'])
        {
            blackjackGame['draws']++;
        }
    // You bust and dealer didnt
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        winner = DEALER;
        blackjackGame['losses']++;
    }else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
    }
    return winner;
}

function showResult(winner)
{
    let message, messageColor;
    if(blackjackGame['turnsOver'] === true)
    {
        switch (winner){
            case YOU:
                document.querySelector('#win').textContent = blackjackGame['wins'];
                message = 'You won!';
                messageColor = 'green';
                winSound.play();
                break;
            case DEALER:
                document.querySelector('#loss').textContent = blackjackGame['losses'];
                message = 'You lost!';
                messageColor = 'red';
                lossSound.play();
                break;
            default:
                ocument.querySelector('#draw').textContent = blackjackGame['draws'];
                message = 'You drew!';
                messageColor= 'Black';
                break;
    }
}

    document.querySelector('#blackjack-results').textContent = message;
    document.querySelector('#blackjack-results').style.color = messageColor;

}