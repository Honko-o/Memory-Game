const startGameButton = document.querySelector('.control-buttons span');
const startGameContainer = startGameButton.parentElement;
const gameImagesContainer = document.querySelector('.memory-game-images');
const playerNameField = document.querySelector('.name span');
const tries = document.querySelector('.tries span');
const duration = 1000;
const gameImages = Array.from(document.querySelectorAll('.game-image'));
const gameImagesIndexes = [...gameImages.keys()];

const startGame = () => {
    startGameContainer.classList.add('hidden');

    const playerName = window.prompt('Please Enter Your Name');
    if (playerName === '' || playerName === null) {
        playerNameField.innerText = 'MotherFucker';
    } else {
        playerNameField.innerText = playerName;
    }
    setTimeout(() => {
        document.body.style.removeProperty('overflow-y');
        startGameContainer.remove();
    }, duration);
};
const stopClicking = () => {
    gameImagesContainer.classList.add('stop-clicking');

    setTimeout(() => {
        gameImagesContainer.classList.remove('stop-clicking');
    }, duration);
};
const checkMatchedImages = (imageOne, imageTwo) => {
    if (imageOne.dataset.language == imageTwo.dataset.language) {
        imageOne.classList.remove('is-flipped');
        imageTwo.classList.remove('is-flipped');

        imageOne.classList.add('is-matched');
        imageTwo.classList.add('is-matched');
    } else {
        setTimeout(() => {
            imageOne.classList.remove('is-flipped');
            imageTwo.classList.remove('is-flipped');
        }, duration);
    }
};
const flipImage = (element) => {
    element.classList.add('is-flipped');

    const flippedImages = document.querySelectorAll('.is-flipped');

    if (flippedImages.length === 2) {
        // Stop Clicking
        stopClicking();

        // Check Matched Images
        checkMatchedImages(flippedImages[0], flippedImages[1]);
    }
};

document.body.style.overflowY = 'hidden';
startGameButton.addEventListener('click', startGame);

const shuffleArray = (array) => {
    let current = array.length;
    let temp = 0;
    let random = 0;

    while (current > 0) {
        random = Math.floor(Math.random() * current);

        current--;

        // [1] => Store Current Element in temporary variable
        temp = array[current];

        // [2] => current Element = random Element
        array[current] = random;

        // [3] => Random Element = Current Element
        array[random] = temp;
    }

    return array;
};

shuffleArray(gameImagesIndexes);
gameImages.forEach((gameImage, index) => {
    gameImage.style.order = gameImagesIndexes[index];

    gameImage.addEventListener('click', function () {
        flipImage(this);
    });
});
