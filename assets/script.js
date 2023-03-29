const card_list = [
    ["<div class=\"card\" id=\"A\">A</div>",0],
    ["<div class=\"card\" id=\"B\">B</div>",0],
    ["<div class=\"card\" id=\"C\">C</div>",0],
    ["<div class=\"card\" id=\"D\">D</div>",0],
    ["<div class=\"card\" id=\"E\">E</div>",0],
    ["<div class=\"card\" id=\"F\">F</div>",0],
    ["<div class=\"card\" id=\"G\">G</div>",0],
    ["<div class=\"card\" id=\"H\">H</div>",0],
]
flippedCards = []

function newGame() {
    let newHtml = "";
    while (true) {
        let theCard = card_list[Math.floor(Math.random() * card_list.length)];
        newHtml+=theCard[0];
        theCard[1]++;
        if (theCard[1] == 2) card_list.splice(card_list.indexOf(theCard),1);
        if (card_list.length == 0) break;
    }
    document.querySelector('.cards').innerHTML = newHtml;
    cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', flipCard));
}

function flipCard() {
    if (this.classList.contains('flip')) return;
    if (this.classList.contains('fliped')) return;
    if (flippedCards.length < 2) {
        this.classList.add('flip');
        flippedCards.push(this);
        if (flippedCards.length == 2) {
            if (flippedCards[0].id == flippedCards[1].id) {
                setTimeout(() => {
                    flippedCards.forEach(card => card.classList.add('fliped'));
                    flippedCards.forEach(card => card.classList.remove('flip'));
                    flippedCards = [];
                }, 1000);
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => card.classList.remove('flip'));
                    flippedCards.forEach(card => card.classList.add('fail'));
                }, 1000);
                setTimeout(() => {
                    flippedCards.forEach(card => card.classList.remove('fail'));
                    flippedCards = [];
                }, 1200);
            }
        }
    }
}

function resetGame() {
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.classList.remove('fliped'));
    flippedCards = [];
}
newGame();
