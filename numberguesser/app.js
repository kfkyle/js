// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// ui Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assing ui min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    else if(guess === winningNum){
        // Game over - win
        gameOver(true, `${winningNum} is correct`, 'green');
    } else {
        // Wrong number
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game over - lost
            gameOver(false, `Game over the correct number was ${winningNum}`, 'red');
           
            setMessage

        } else {
            // Game continues - answer wrong

            guessInput.style.borderColor = 'red';
            // Clear the input
            guessInput.value = '';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');

        }
    }

});


// Game over
function gameOver(won, msg){
    let color;
    // if won === true then color = green, else color = red
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;
    // Change border color
    guessInput.style.borderColor = color;
    // Change text color
    message.style.color = color;  
    // Set message
    setMessage(msg)

    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again'

}

// Get Winning Number
function getRandomNum(min, max){
    return(Math.floor(Math.random()*(max-min+1)+min));
}


// Define Set Message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}
