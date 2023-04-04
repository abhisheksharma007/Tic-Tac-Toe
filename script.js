const boxes = Array.from(document.getElementsByClassName('box'))
const head = document.getElementById('playText')
const warn = document.getElementById('warn')

const O_player = "0"
const X_player = "X"
var spaces = new Array(9).fill(null)
var currentPlayer = O_player
var won = false;

const restart = () => {
    boxes.forEach((box) => { box.innerText = '' });
    spaces.fill(null)
    currentPlayer = O_player
    won = false;
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    head.innerText = "Let's Play";
    warn.innerText = "";
}

document.getElementById('restartBtn').onclick = function (){restart()}

const drawBoard = () => {
    boxes.forEach((box,index) => {
        let styleString = '';
        if (index < 3){
            styleString += `border-bottom: 3px solid var(--purple);`;
        }
        if (index % 3 === 0 ){
            styleString += `border-right: 3px solid var(--purple);`;
        }
        if (index % 3 === 2){
            styleString += `border-left: 3px solid var(--purple);`;
        }
        if (index > 5){
            styleString += `border-top: 3px solid var(--purple);`;
        }
        box.style = styleString
        box.addEventListener('click',boxClicked);
    })
}

const boxClicked = (e) => {
    if(won){
        e.stopPropagation();
        e.preventDefault();
        warn.innerText = "Please restart the game to play again.";
        return false;
    }
    const id = e.target.id
    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer
        data = checkWon(currentPlayer)
        if(data){
            head.innerText = data
            won = true;
        }
        currentPlayer = currentPlayer === O_player ? X_player : O_player;
    }
}

const checkWon = (currPlayer) => {
    player0 = document.getElementById('player1').value; 
    playerX = document.getElementById('player2').value;
    player0 = player0.length == 0 ? '0' : player0;
    playerX = playerX.length == 0 ? 'X' : playerX;
    currPlayer = currPlayer == '0' ? player0 : playerX;
    if (spaces[0] === spaces[1] && spaces[0] === spaces[2] && spaces[0] != null) return `${currPlayer} has won the game.`
    if (spaces[0] === spaces[4] && spaces[0] === spaces[8] && spaces[0] != null) return `${currPlayer} has won the game.`
    if (spaces[0] === spaces[3] && spaces[0] === spaces[6] && spaces[0] != null) return `${currPlayer} has won the game.`
    if (spaces[8] === spaces[5] && spaces[8] === spaces[2] && spaces[8] != null) return `${currPlayer} has won the game.`
    if (spaces[8] === spaces[7] && spaces[8] === spaces[6] && spaces[8] != null) return `${currPlayer} has won the game.`
    if (spaces[4] === spaces[7] && spaces[4] === spaces[1] && spaces[4] != null) return `${currPlayer} has won the game.`
    if (spaces[4] === spaces[3] && spaces[4] === spaces[5] && spaces[4] != null) return `${currPlayer} has won the game.`
    if (spaces[2] === spaces[4] && spaces[2] === spaces[6] && spaces[2] != null) return `${currPlayer} has won the game.`
    return false
}

restart();
drawBoard();
    