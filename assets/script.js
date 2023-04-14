var card_list = [
    ["<div class=\"card\" id=\"A\"><img class=\"back\" src=\"assets/images/box.gif\"><img class=\"front\" src=\"assets/images/pizza.gif\"></div>",0],
    ["<div class=\"card\" id=\"B\"><img class=\"back\" src=\"assets/images/box.gif\"><img class=\"front\" src=\"assets/images/chicken.gif\"></div>",0],
    ["<div class=\"card\" id=\"C\"><img class=\"back\" src=\"assets/images/box.gif\"><img class=\"front\" src=\"assets/images/bee.gif\"></div>",0],
    ["<div class=\"card\" id=\"D\"><img class=\"back\" src=\"assets/images/box.gif\"><img class=\"front\" src=\"assets/images/cat.gif\"></div>",0],
    ["<div class=\"card\" id=\"E\"><img class=\"back\" src=\"assets/images/box.gif\"><img class=\"front\" src=\"assets/images/duck.gif\"></div>",0],
    ["<div class=\"card\" id=\"F\"><img class=\"back\" src=\"assets/images/box.gif\"><img class=\"front\" src=\"assets/images/cow.gif\"></div>",0],
    ["<div class=\"card\" id=\"G\"><img class=\"back\" src=\"assets/images/box.gif\"><img class=\"front\" src=\"assets/images/dog.gif\"></div>",0],
    ["<div class=\"card\" id=\"H\"><img class=\"back\" src=\"assets/images/box.gif\"><img class=\"front\" src=\"assets/images/turtle.gif\"></div>",0],
]
flippedCards = []

function newGame() {
    let cardlist = Object.assign([[]],card_list);
    cardlist.forEach(card => card[1] = 0);    
    var newHtml = "<div class=\"cards\">";
    console.log(cardlist);
    while (true) {
        let theCard = cardlist[Math.floor(Math.random() * cardlist.length)];
        newHtml+=theCard[0];
        theCard[1]++;
        if (theCard[1] == 2) cardlist.splice(cardlist.indexOf(theCard), 1);
        console.log(newHtml);
        if (cardlist.length == 0) break;
    }
    console.log(newHtml);
    newHtml+="</div>";
    document.querySelector('.game').innerHTML = newHtml;
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
                setTimeout(() => {flippedCards.forEach(card => card.classList.add('fliped'));flippedCards.forEach(card => card.classList.remove('flip'));flippedCards = [];}, 1000);
            } else {
                setTimeout(() => {flippedCards.forEach(card => card.classList.remove('flip'));flippedCards.forEach(card => card.classList.add('fail'));}, 1000);
                setTimeout(() => {flippedCards.forEach(card => card.classList.remove('fail'));flippedCards = [];}, 1200);
            }
            setTimeout(() => {if (document.querySelectorAll('.card').length == document.querySelectorAll('.fliped').length) endGame();}, 1100);
        }
    }
}

function endGame() {
    document.querySelector('.game').innerHTML = "<button class=\"reset\">完成配對<br>點此重新開始</button>";
    document.querySelector('.reset').addEventListener('click', () => {newGame();});
}

function showcards() {
    let cards = document.querySelectorAll('.card');
    if (flippedCards.length > 0) return;
    document.getElementById('peek').style.pointerEvents = 'none';
    cards.forEach(card => card.classList.add('flip'));
    setTimeout(() => document.getElementById('peek').style.pointerEvents = 'auto', 1500);
    setTimeout(() => cards.forEach(card => card.classList.remove('flip')), 1000);
}
document.getElementById('peek').addEventListener('click', showcards);
newGame();
