window.fruitList = [
    {word: 'apple', hint: 'A common round fruit, often red or green, known for its crisp texture'},
    {word: 'banana', hint: 'A long, yellow fruit that is soft inside and often eaten as a snack'},
    {word: 'cherry', hint: 'A small, round, red fruit with a pit in the center, often sweet or tart'},
    {word: 'grape', hint: 'A small, juicy fruit, commonly purple or green, used in wines and jellies'},
    {word: 'lemon', hint: 'A bright yellow citrus fruit known for its sour taste'},
    {word: 'lime', hint: 'A green citrus fruit, similar to a lemon but smaller and often used in drinks'},
    {word: 'mango', hint: 'A tropical fruit with a sweet, juicy interior and a large seed inside'},
    {word: 'orange', hint: 'A round, citrus fruit known for its bright color and sweet, juicy segments'},
    {word: 'peach', hint: 'A soft, round fruit with fuzzy skin, often pink or orange in color'},
    {word: 'pear', hint: 'A sweet fruit with a rounded bottom and narrow top, often green or yellow'},
    {word: 'plum', hint: 'A small fruit with a smooth skin, it can be red, purple, or yellow and has a single pit'}
];

window.animalList = [
    {word: 'alligator', hint: 'A large reptile with a powerful tail, often found in water'},
    {word: 'bear', hint: 'A large, heavy mammal with thick fur and a short tail'},
    {word: 'bird', hint: 'A feathered creature known for its ability to fly'},
    {word: 'cat', hint: 'A small, domesticated mammal known for its agility and independence'},
    {word: 'chicken', hint: 'A common farm bird, often raised for its meat and eggs'},
    {word: 'cow', hint: 'A large farm animal known for producing milk'},
    {word: 'dog', hint: 'A loyal and domesticated mammal, often kept as a pet'},
    {word: 'donkey', hint: 'A sturdy animal with long ears, often used for carrying loads'},
    {word: 'duck', hint: 'A waterbird with webbed feet, known for its quacking sound'},
    {word: 'fish', hint: 'An aquatic animal that lives in water and breathes through gills'},
    {word: 'fox', hint: 'A small, wild animal known for its cunning nature and bushy tail'},
    {word: 'frog', hint: 'An amphibian known for its jumping abilities, croaking sounds, and smooth skin'},
    {word: 'goat', hint: 'A farm animal with horns and a beard, known for its climbing ability'},
    {word: 'horse', hint: 'A large, strong animal commonly used for riding and racing'},
    {word: 'lion', hint: 'A large, powerful cat, often referred to as the king of the jungle'},
    {word: 'monkey', hint: 'A playful, primate animal known for its agility and often seen in trees'},
    {word: 'mouse', hint: 'A small rodent with a pointed nose, furry round body, and a long, thin tail'},
    {word: 'owl', hint: 'A nocturnal bird known for its large eyes and hooting sound'},
    {word: 'pig', hint: 'A farm animal with a snout for a nose, known for its love of mud'},
    {word: 'rabbit', hint: 'A small, furry animal with long ears and a penchant for hopping'},
    {word: 'sheep', hint: 'A farm animal with thick wool, often raised for its fleece, meat, and milk'},
    {word: 'snake', hint: 'A long, legless reptile that slithers on the ground'},
    {word: 'tiger', hint: 'A large, striped cat known for its powerful physique and orange fur'},
    {word: 'turtle', hint: 'A reptile with a hard shell that can live both in water and on land'},
    {word: 'zebra', hint: 'An African wild animal known for its black and white striped coat'}
];

function checkIfWordIsGuessed() {
    const allLetterGuessed = window.wordToGuess.every(function (letter) {
        return !letter.isHidden;
    });
    const hangmanImage = document.querySelector('#hangman');
    if (window.hangmanImage === 8) {
        hangmanImage.src = 'images/lost.png';
        document.querySelector('.main').classList.add('word-lost');
        document.querySelector('.tip').classList.add('hidden');
        document.querySelector('.restart').classList.remove('hidden');
        const word = window.wordToGuess.map( (letter) => letter.letter).join('');
        document.querySelector('.hint').innerHTML = `The word was <b>${word}</b>`;
    }
    if (allLetterGuessed) {
        hangmanImage.src = 'images/won.png';
        document.querySelector('.main').classList.add('word-won');
        document.querySelector('.tip').classList.add('hidden');
        document.querySelector('.restart').classList.remove('hidden');
    }
}

function resetClasses() {
    document.querySelector('.main').classList.remove('word-won');
    document.querySelector('.main').classList.remove('word-lost');
    document.querySelector('.tip').classList.remove('hidden');
    document.querySelector('.restart').classList.add('hidden');
}

function replaceLetter(letter) {
    let isLetterInWord = false;

    window.wordToGuess.forEach(function (letterToGuess) {
        if (letterToGuess.letter === letter) {
            window.pressedKeys.push(letter);
            letterToGuess.isHidden = false;
            isLetterInWord = true;
        }
    });

    if (!isLetterInWord && window.hangmanImage < 8) {
        window.hangmanImage++;
        document.querySelector('.trys').innerHTML = 8 - window.hangmanImage;
    }
    printLetters(window.wordToGuess);
    checkIfWordIsGuessed();
}

function addI() {
    const hangmanImage = document.querySelector(
        '#hangman'
    );
    hangmanImage.src = `images/${window.imageParts}.png`;
}

document.addEventListener('keydown', function (event) {
    getUserInput(event.key);
});
document.querySelectorAll('.key').forEach(function (key) {
    key.addEventListener('click', function (event) {
        getUserInput(event.target.getAttribute('data-key'));
    });
});

function getUserInput(key) {
    if (window.pressedKeys.includes(key)) {
        return;
    }
    window.pressedKeys.push(key);
    const button = document.querySelector(`span[data-key="${key}"]`);
    if (button) {
        replaceLetter(key);
        button.classList.add('active');
    }
}

document.addEventListener('keyup', resetActiveState);
document.addEventListener('click', resetActiveState);

function resetActiveState(event) {
    document.querySelectorAll('.key').forEach(function (keyElement ) {
        const key = keyElement.getAttribute('data-key');
        if (!window.pressedKeys.includes(key)) {
            keyElement.classList.remove('active');
        }
    });
}

function getRandomWord() {
    let word;
    if (wordsType === 'fruit') {
        word = fruitList[Math.floor(Math.random() * fruitList.length)];
    } else {
        word = animalList[Math.floor(Math.random() * animalList.length)];
    }
    window.wordHint = word.hint;
    return word.word.split('').reduce(function (word, letter, index) {
        return [
            ...word,
            {
                index,
                letter,
                isHidden: true
            }
        ];
    }, []);
}

function printLetters(wordToGuess) {
    const word = document.querySelector('.word');
    word.innerHTML = '';
    wordToGuess.forEach(function (letter) {
        const span = document.createElement('span');
        span.classList.add('letter');
        span.textContent = letter.isHidden ? '-' : letter.enteredLetter || letter.letter;
        word.appendChild(span);
    });
    updateHangmanImage();
}

function initializeWordGame() {
    resetClasses();
    if (window.wordsType === undefined || window.wordsType === null || window.wordsType === '') {
        window.wordsType = 'animal';
    }
    window.pressedKeys = [];
    window.tipLetterShown = false;
    window.hangmanImage = 1;
    window.wordToGuess = getRandomWord();
    document.querySelector('.hint').innerHTML = '';
    document.querySelector('.trys').innerHTML = '7';
    printLetters(window.wordToGuess);
}

function getHint() {
    document.querySelector('.hint').textContent = window.wordHint;
}

function changeWordType(type) {
    window.wordsType = type;
    const wordsType = document.querySelectorAll('.words-type-buttons button');
    wordsType.forEach(function (button) {
        if (button.getAttribute('datasrc') === type) {
            button.classList.add('button-active');
        } else {
            button.classList.remove('button-active');
        }
    });
    initializeWordGame();
}


function showRandomHiddenLetter() {
    if (window.tipLetterShown) {
        const hint = document.querySelector('.hint');
        hint.innerHTML = 'You already used this tip';
        return;
    }
    const hiddenLetters = window.wordToGuess.filter(function (letter) {
        return letter.isHidden;
    });
    const randomLetter = hiddenLetters[Math.floor(Math.random() * hiddenLetters.length)];
    if (randomLetter) {
        randomLetter.isHidden = false;
        printLetters(window.wordToGuess);
        window.tipLetterShown = true;
    }
    checkIfWordIsGuessed();
}

function updateHangmanImage() {
    document.querySelector('#hangman').src = `images/${window.hangmanImage}.png`;
}

document.addEventListener('DOMContentLoaded', initializeWordGame);

