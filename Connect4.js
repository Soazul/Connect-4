const Player = {
    PLAYER_RED: "red",
    PLAYER_YELLOW: "yellow"
};
let currentPlayer = Player.PLAYER_RED;
let gameOver = false;
const board = [];
let columnArray = [5, 5, 5, 5, 5, 5, 5];

window.onload = function(){
    startGame();
}

function startGame() {
    for (let x = 0; x < 6; x++) {
        let row = [];
        for (let y = 0; y < 7; y++) {
            // for each column in the row push empty space
            row.push(' ');
            // access the HTML page and create a div named circle
            let circle = document.createElement("div");
            circle.id = x.toString() + "," + y.toString();
            // add a circle class
            circle.classList.add("circle");
            circle.addEventListener("click", placePiece);
            // add class circle to the board id
            document.getElementById("board").append(circle);
        }
        // push the rows inside the board
        board.push(row);
    }
}

function placePiece () {
    let player = document.getElementById("player");
    if(gameOver){
        return;
    }
    // this is referring to circle
    let coordinates = this.id.split(",");
    // let x = parseInt(coordinates[0]);
    // set the 1st index element as y
    let y = parseInt(coordinates[1]);
    // update the row of the specific column
    let x = columnArray[y];
    board[x][y] = currentPlayer;
    let circle = document.getElementById(x.toString() + "," + y.toString());
    if(currentPlayer === Player.PLAYER_RED){
        //timer(20);
        circle.classList.add("redPiece");
        player.textContent = "Yellow's Turn";
        currentPlayer = Player.PLAYER_YELLOW;
    } else {
        //timer(20);
        circle.classList.add("yellowPiece");
        player.textContent = "Red's Turn";
        currentPlayer = Player.PLAYER_RED;
    }
    x--;
    // update the row/height of the column with the new decremented value
    columnArray[y] = x;
    winningConditions();
    boardFull();
    return;
}

function winningConditions() {
    // horizontal
    for (let x = 0; x < 6; x++) {
        for (let y = 0; y < 4; y++) {
            if (board[x][y] != ' ') {
                if ((board[x][y] === Player.PLAYER_RED && board[x][y + 1] === Player.PLAYER_RED &&
                        board[x][y + 2] === Player.PLAYER_RED && board[x][y + 3] === Player.PLAYER_RED) ||
                    (board[x][y] === Player.PLAYER_YELLOW && board[x][y + 1] === Player.PLAYER_YELLOW &&
                        board[x][y + 2] === Player.PLAYER_YELLOW && board[x][y + 3] === Player.PLAYER_YELLOW)) {
                    win(x, y);
                    return false;
                }
            }
        }
    }
    // vertical
    for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 3; x++) {
            if (board[x][y] != ' ') {
                if ((board[x][y] === Player.PLAYER_RED && board[x + 1][y] === Player.PLAYER_RED &&
                        board[x + 2][y] === Player.PLAYER_RED && board[x + 3][y] === Player.PLAYER_RED) ||
                    (board[x][y] === Player.PLAYER_YELLOW && board[x + 1][y] === Player.PLAYER_YELLOW &&
                        board[x + 2][y] === Player.PLAYER_YELLOW && board[x + 3][y] === Player.PLAYER_YELLOW)) {
                    win(x, y);
                    return false;
                }
            }
        }
    }
    // negative diagonal
    for (let x = 0; x < 3; x++) {
        for (let y = 0; y < 4; y++) {
            if (board[x][y] != ' ') {
                if ((board[x][y] === Player.PLAYER_RED && board[x + 1][y + 1] === Player.PLAYER_RED &&
                        board[x + 2][y + 2] === Player.PLAYER_RED && board[x + 3][y + 3] === Player.PLAYER_RED) ||
                    (board[x][y] === Player.PLAYER_YELLOW && board[x + 1][y + 1] === Player.PLAYER_YELLOW &&
                        board[x + 2][y + 2] === Player.PLAYER_YELLOW && board[x + 3][y + 3] === Player.PLAYER_YELLOW)) {
                    win(x, y);
                    return false;
                }
            }
        }
    }
    // positive diagonal
    for (let x = 3; x < 6; x++) {
        for (let y = 0; y < 4; y++) {
            if (board[x][y] != ' ') {
                if ((board[x][y] === Player.PLAYER_RED && board[x - 1][y + 1] === Player.PLAYER_RED &&
                        board[x - 2][y + 2] === Player.PLAYER_RED && board[x - 3][y + 3] === Player.PLAYER_RED) ||
                    (board[x][y] === Player.PLAYER_YELLOW && board[x - 1][y + 1] === Player.PLAYER_YELLOW &&
                        board[x - 2][y + 2] === Player.PLAYER_YELLOW && board[x - 3][y + 3] === Player.PLAYER_YELLOW)) {
                    win(x, y);
                    return false;
                }
            }
        }
    }
    return true;
}

function boardFull(){
    for(let x = 0; x < 6; x++){
        for(let y = 0; y < 7; y++){
            // the board is full and yellow won
            if(board[0][0] != ' ' && board[0][1] != ' ' && board[0][2] != ' ' && board[0][3] != ' ' && board[0][4] != ' ' && board[0][5] != ' ' && board[0][6] != ' '){
                // if winningConditions is not true then it is false
                if(!winningConditions()) {
                    win(x,y);
                } else {
                    // the board is full and no one won
                    gameOver = true;
                    let winner = document.getElementById("winner");
                    winner.style.visibility = 'visible';
                    let player = document.getElementById("player");
                    player.remove();
                    winner.textContent = "It's a Tie";
                    button();
                }
            }
        }
    }
}

function tryAgain() {
    location.reload();
}

function button(){
    let button = document.createElement("BUTTON");
    button.textContent = "Try Again";
    button.classList.add("button");
    document.getElementById("winner").append(button);
    button.addEventListener("click", tryAgain);
}

function win(x,y) {
    gameOver = true;
    let winner = document.getElementById("winner");
    winner.style.visibility = 'visible';
    let player = document.getElementById("player");
    player.remove();
    if (board[x][y] === Player.PLAYER_RED) {
        winner.textContent = "Red Won";
    } else {
        winner.textContent = "Yellow Won";
    }
    button();
}
/*
function timer(timeLeft) {
    timeLeft = 20;
    let time = setInterval(function() {
        document.getElementById("timer").textContent = '00:' + timeLeft;
        timeLeft--;
        if(timeLeft.toString().length == 1) {
            timeLeft = "0" + timeLeft;
        }
        // if no time is left
        if(timeLeft < 0) {
            clearInterval(time);
            endTimer();
        }

        // if there is a winner end timer
        if(!winningConditions()){
            clearInterval(time);
        }
        if(currentPlayer == Player.PLAYER_RED){
            timer(20);
            clearInterval(time);
        }
    }, 1000);
}

function endTimer(){
    gameOver = true;
    let winner = document.getElementById("winner");
    winner.style.visibility = 'visible';
    let player = document.getElementById("player");
    player.remove();
    if (currentPlayer === Player.PLAYER_RED) {
        winner.textContent = "Yellow Won";
    } else {
        winner.textContent = "Red Won";
    }
    button();
}
 */