// General Variables
let missed = 0;
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const phraseUl = phrase.querySelector('ul');
const title = document.querySelector('.title');
const show = document.getElementsByClassName('show');
const startGame = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');
const letter = document.getElementsByClassName('letter');
const letterButtons = qwerty.querySelectorAll('button');
const scoreboard = document.querySelector('#scoreboard');
const scoreboardListItem = scoreboard.querySelectorAll('.tries');

// Phrases Variable
const phrases = [
    'The first rule of Fight Club is you do not talk about Fight Club',
    'May the Force be with you',
    'Why so serious',
    'I see dead people',
    'You complete me',
    'You had me at hello',
    'Show me the money',
    'I love the smell of napalm in the morning',
    'It was Beauty killed the Beast',
  ];

// Start Game, remove Overlay Screen
startGame.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Random choose phrase
function getRandomPhraseAsArray(array) {
    const randomPhrase = array[Math.floor(Math.random() * array.length)];
    return randomPhrase.toUpperCase().split('');
}

// Function that adds random phrase then creates list item for each letter
function addPhraseToDisplay(array) {   
    for (let i = 0; i < array.length; i++) {
        const listItem = document.createElement('li');
        phraseUl.appendChild(listItem);
        listItem.textContent = array[i];
    
        if (array[i] !== ' ') {
            listItem.className = 'letter';
        } else {
            listItem.className = 'space';
        }
    }
}

// Passes info to new variable
const phraseArray = getRandomPhraseAsArray(phrases);

// Call Random Phrase function
addPhraseToDisplay(phraseArray);

// Checks clicked letter to random phrase
function checkLetter(buttonClicked) {
    const letterChosen = buttonClicked.textContent.toUpperCase();
    let letterFound = false;

    for (let i = 0; i < letter.length; i++){
        if (letterChosen === letter[i].textContent) {
            letter[i].classList.add('show');
            letterFound = true;
        } 
    }
    
    return letterFound ? letterChosen : null;
}

// Check to see if player wins or loses
function checkWin() {
    if (letter.length === show.length) {
        overlay.classList.add('win');
        overlay.style.display = '';
        title.textContent = "You win!"
        startGame.textContent = "Play Again"
    }

    if (missed >= 5) {
        overlay.classList.add('lose');
        overlay.style.display = '';
        title.textContent = "Sorry, try again!"
        startGame.textContent = "Play Again"
    }
}

window.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;

        const letterFound = checkLetter(e.target);

        if (letterFound === null) {
            missed += 1;
        }

        if (missed >= 1 && missed <= 5){
            const heart = scoreboardListItem[scoreboardListItem.length-missed];
            heart.getElementsByTagName('img')[0].src = 'images/lostHeart.png';
        }
    }
    checkWin();
});

startGame.addEventListener('click', (e) => {
    if (e.target.textContent === 'Play Again') {
        // set missed to 0
        missed = 0;

        // reset heart counter
        for (let i = 0; i < scoreboardListItem.length; i++) {
            const img = scoreboardListItem[i].getElementsByTagName('img')[0];
            img.src = 'images/liveHeart.png';
        }

        // remove list items
        while (phraseUl.children.length > 0) {
            phraseUl.removeChild(phraseUl.children[0]);
        }

        // remove chosen buttons
        for (let i = 0; i < letterButtons.length; i++) {
            letterButtons[i].classList.remove('chosen');
            letterButtons[i].disabled = false;
        }

        // reset overlay
        overlay.classList.remove('win', 'lose');

        // generate new random phrase
        const newPhrase = getRandomPhraseAsArray(phrases);

        // add new list items
        addPhraseToDisplay(newPhrase);
    }
});
