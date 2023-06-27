let card_list = [
    ["<div class=\"card\" id=\"A\"><img class=\"back\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480930266361927/box.gif\"><img class=\"front\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480932590010469/pizza.gif\"></div>",0],
    ["<div class=\"card\" id=\"B\"><img class=\"back\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480930266361927/box.gif\"><img class=\"front\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480930945835038/chicken.gif\"></div>",0],
    ["<div class=\"card\" id=\"C\"><img class=\"back\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480930266361927/box.gif\"><img class=\"front\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480929909842011/bee.gif\"></div>",0],
    ["<div class=\"card\" id=\"D\"><img class=\"back\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480930266361927/box.gif\"><img class=\"front\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480930606104637/cat.gif\"></div>",0],
    ["<div class=\"card\" id=\"E\"><img class=\"back\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480930266361927/box.gif\"><img class=\"front\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480932183154828/duck.gif\"></div>",0],
    ["<div class=\"card\" id=\"F\"><img class=\"back\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480930266361927/box.gif\"><img class=\"front\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480931293966396/cow.gif\"></div>",0],
    ["<div class=\"card\" id=\"G\"><img class=\"back\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480930266361927/box.gif\"><img class=\"front\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480931780509756/dog.gif\"></div>",0],
    ["<div class=\"card\" id=\"H\"><img class=\"back\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480930266361927/box.gif\"><img class=\"front\" src=\"https://cdn.discordapp.com/attachments/292499303673626625/1096480929540747387/turtle.gif\"></div>",0],
]
let flippedCards = [];
let gameStatus = 0;
let difficulty = 'easy';

function newGame(diff) {
    difficulty = diff;
    document.getElementById('level').innerHTML = difficulty.toUpperCase();
    let cardlist = Object.assign([[]],card_list);
    cardlist.forEach(card => card[1] = 0);
    let newHtml = "<div class=\"cards\">";
    if (difficulty == 'easy') cardcount = 4;
    if (difficulty == 'normal') cardcount = 6;
    if (difficulty == 'hard') cardcount = 8;
    cardlist = cardlist.slice(0,cardcount);
    while (true) {
        let theCard = cardlist[Math.floor(Math.random() * cardlist.length)];
        newHtml+=theCard[0];
        theCard[1]++;
        if (theCard[1] == 2) cardlist.splice(cardlist.indexOf(theCard), 1);
        if (cardlist.length == 0) break;
    }
    newHtml+="</div>";
    document.querySelector('.game').innerHTML = newHtml;
    cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', flipCard));
    document.getElementById('peek').addEventListener('click', showcards);
    document.getElementById('difficulty').addEventListener('click', setDifficulty);
}

function setDifficulty() {
    document.querySelector('.game').innerHTML = "<div class=\"difficulty-container\"><button class=\"difficulty\" id=\"easy\">EASY</button><button class=\"difficulty\" id=\"normal\">NORMAL</button></div><div class=\"difficulty-container\"><button class=\"difficulty\" id=\"hard\">HARD</button></div>";
    document.querySelectorAll('.difficulty').forEach(difficulty => difficulty.addEventListener('click',() => newGame(difficulty.id)));
}

function flipCard() {
    if (gameStatus == 0) startGame();
    if (this.classList.contains('flip')) return;
    if (this.classList.contains('fliped')) return;
    if (flippedCards.length < 2) {
        this.classList.add('flip');
        flippedCards.push(this);
        if (flippedCards.length == 2) {
            if (flippedCards[0].id == flippedCards[1].id) {
                setTimeout(() => {flippedCards.forEach(card => card.classList.add('fliped'));flippedCards.forEach(card => card.classList.remove('flip'));flippedCards = [];}, 600);
            } else {
                setTimeout(() => {flippedCards.forEach(card => card.classList.remove('flip'));flippedCards.forEach(card => card.classList.add('fail'));}, 600);
                setTimeout(() => {flippedCards.forEach(card => card.classList.remove('fail'));flippedCards = [];}, 800);
            }
            setTimeout(() => {if (document.querySelectorAll('.card').length == document.querySelectorAll('.fliped').length) endGame();}, 805);
        }
    }
}

function startGame() {
    gameStatus = 1;
    document.getElementById('difficulty').style.pointerEvents = 'none';
}

function endGame() {
    document.querySelector('.game').innerHTML = "<button class=\"reset\">完成配對<br>點此重新開始</button>";
    document.getElementById('difficulty').style.pointerEvents = 'auto';
    document.querySelector('.reset').addEventListener('click', () => {newGame(difficulty);});
    gameStatus = 0;
}

function showcards() {
    let cards = document.querySelectorAll('.card');
    if (flippedCards.length > 0) return;
    document.getElementById('peek').style.pointerEvents = 'none';
    cards.forEach(card => card.classList.add('flip'));
    setTimeout(() => cards.forEach(card => card.classList.remove('flip')), 600);
    setTimeout(() => document.getElementById('peek').style.pointerEvents = 'auto', 700);
}

newGame(difficulty);
