const prompt = require('prompt-sync')({sigint: true});

const moves = ['rock', 'Spock', 'paper', 'lizard', 'scissors'];

const winningMoves = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'Spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['Spock', 'paper'],
    Spock: ['scissors', 'rock']
};

function getComputerMove() {
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}

function getWinner(userMove, computerMove) {
    if (userMove === computerMove) {
        return 'It\'s a tie!';
    } else if (winningMoves[userMove].includes(computerMove)) {
        return 'You win!';
    } else {
        return 'Computer wins!';
    }
}

function printMoves() {
    console.log('Available moves:');
    moves.forEach((move, index) => {
        console.log(`${index + 1} - ${move}`);
    });
    console.log('0 - exit');
    console.log('? - help');
}

function playGame() {
    let playing = true;

    while (playing) {
        printMoves();
        const userInput = prompt('Enter your move: ');
        
        if (userInput === '0') {
            console.log('Exiting the game.');
            playing = false;
        } else if (userInput === '?') {
            printMoves();
        } else {
            const userMoveIndex = parseInt(userInput) - 1;

            if (userMoveIndex >= 0 && userMoveIndex < moves.length) {
                const userMove = moves[userMoveIndex];
                const computerMove = getComputerMove();

                console.log(`Your move: ${userMove}`);
                console.log(`Computer move: ${computerMove}`);
                console.log(getWinner(userMove, computerMove));
            } else {
                console.log('Invalid move. Please enter a number between 0 and 5, or ? for help.');
            }
        }
    }
}

playGame();
