const crypto = require('crypto');
const prompt = require('prompt-sync')({sigint: true});

// Reading moves from command line arguments
const moves = process.argv.slice(2);

if (moves.length < 3) {
    console.log('Please provide at least three moves.');
    process.exit(1);
}

const winningMoves = {};
for (let i = 0; i < moves.length; i++) {
    winningMoves[moves[i]] = [];
    for (let j = 1; j <= Math.floor((moves.length - 1) / 2); j++) {
        winningMoves[moves[i]].push(moves[(i + j) % moves.length]);
    }
}

function generateHMAC(key, message) {
    return crypto.createHmac('sha256', key).update(message).digest('hex');
}

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
        const computerMove = getComputerMove();
        const key = crypto.randomBytes(32).toString('hex');
        const hmac = generateHMAC(key, computerMove);

        console.log(`HMAC: ${hmac}`);
        
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

                console.log(`Your move: ${userMove}`);
                console.log(`Computer move: ${computerMove}`);
                console.log(`Key: ${key}`);
                console.log(getWinner(userMove, computerMove));
            } else {
                console.log('Invalid move. Please enter a valid number or ? for help.');
            }
        }
    }
}

playGame();
