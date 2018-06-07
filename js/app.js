// General Variables
let missed = 0;
const qwerty = document.querySelector('#qwerty');
const overlay = document.querySelector('#overlay');
const qwertyLetters = document.querySelectorAll('#qwerty button');
const startGame = document.querySelector('.btn__reset');
const phrase = document.querySelector('#phrase ul');
const ul = document.querySelectorAll('ul');
const showLetter = document.getElementsByClassName('show');
const rightLetter = document.getElementsByClassName('letter');
const tries = document.querySelectorAll('.tries');
const title = document.querySelector('h2');



// Phrases Variable
const phrases = [
    'MAY THE FORCE BE WITH YOU',
    'WHY SO SERIOUS',
    'I SEE DEAD PEOPLE',
    'YOU COMPLETE ME',
    'YOU HAD ME AT HELLO',
    'SHOW ME THE MONEY',
    'IT WAS BEAUTY KILLED THE BEAST',
    'THIS IS THE BEGINNING OF A BEAUTIFUL FRIENDSHIP',
    'TO INFINITY AND BEYOND',
    'SAY HELLO TO MY LITTLE FRIEND',
    'JUST KEEP SWIMMING',
    'THE DUDE ABIDES',
    "MY PRECIOUS"
  ];

// Start Game, Remove Overlay Screen
startGame.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// Random Phrase
function getRandomPhraseArray(arr){
    const splitArray = arr[Math.floor(Math.random() * arr.length)].split('');
    return splitArray;
} 

// Set Game Display
const phraseArray = getRandomPhraseArray(phrases);

function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++) {
        const listItem = document.createElement('li');
        const phraseLetters = document.createTextNode(arr[i]);
        listItem.appendChild(phraseLetters);

        if (listItem.innerText.indexOf(' ') >= 0) {
            listItem.className = 'space';
            ul[0].appendChild(listItem);
      
        } else {
            listItem.className = 'letter';
            ul[0].appendChild(listItem);
        }
    }
}
// Call New Phrase Function
addPhraseToDisplay(phraseArray); 

// Check Letter Function
function checkLetter(button) {
    let chosenLetter = false;
    for (let i = 0; i < rightLetter.length; i++) {
        if (button.textContent.toUpperCase() === rightLetter[i].textContent.toUpperCase()) {
            rightLetter[i].classList.add('show');
            chosenLetter = true;
            console.log(chosenLetter);
        }
    }
    if (chosenLetter == true) {
        return button.textContent.toUpperCase();
        
    } else {
        return null;
    }
  };
  
// Add Event Listener

window.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;

        const letterFound = checkLetter(e.target);
        console.log(letterFound);

        if (letterFound === null) {
            missed += 1;
            tries[tries.length-missed].querySelectorAll('img')[0].src = "images/lostHeart.png";
            console.log(missed);
        }
    checkWin()      
    }
});

// Check Win function

function checkWin() {

    if (missed === 5) {
        overlay.className = 'lose';
        overlay.style.display = '';
        title.textContent = 'You Lose!';
        startGame.textContent = 'Try Again';
      }
    
    if (rightLetter.length === showLetter.length){
        overlay.className = 'win';
        overlay.style.display = '';
        title.textContent = 'You Win!';
        startGame.textContent = 'Play Again';
    } 
}

// Reset Game

startGame.addEventListener('click', (e) => {
    if (e.target.textContent === "Try Again" || e.target.textContent === "Play Again") {

        // Remove Overlay
        overlay.style.display = 'none';

        // Remove List Item Letters
        while (phrase.firstChild) {
            phrase.removeChild(phrase.firstChild);
        }

        //Reset Keyboard Letters
        for (let i = 0; i < qwertyLetters.length; i++) {
            qwertyLetters[i].disabled = false;
            qwertyLetters[i].classList.remove('chosen');
        }

        // Reset Heart Count
        missed = 0;
        for (let i = 0; i < tries.length; i++) {
            tries[i].querySelectorAll('img')[0].src = 'images/liveHeart.png';
        }

        // Pick New Phrase
        const newPhrase = getRandomPhraseArray(phrases);
        addPhraseToDisplay(newPhrase);
        
    }
});