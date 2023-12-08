const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

const winningCondition = [                          //the number of winning conditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""]; //options for players
let currentPlayer = "X";
let running = false;    

initializeGame();

function initializeGame(){                          //function to start the game                 

    cells.forEach(cell => cell.addEventListener("click", cellsClicked));  //whats gonna happen when one of the cells is clicked
    restartBtn.addEventListener("click", restartGame);                   //invoking the restartGame callback function when the restart button is clicked
    statusText.textContent = `${currentPlayer}'s turn`;                 //updating the status to show which player's turn it is
    running = true;                       
}

function cellsClicked(){

    const cellIndex = this.getAttribute("cellIndex");                  // "this" refers to the cell and we are getting the attribute that is associated with "cellIndex" in the DOM.
    if(options[cellIndex] != "" || !running){                          // will return nothing if game is not running or options[cellIndex] is not an empty string
        return;
    }
    updateCells(this, cellIndex);
    checkWin();
}

function updateCells(cell, index){

    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

}

function changePlayer(){

    currentPlayer = (currentPlayer == "X") ? "O" : "X";               // ternary operator show that the currentplayer changes whenever the user switches
    statusText.textContent = `${currentPlayer}'s turn`;               //updating the status to show which player's turn it is

}

function checkWin(){
    roundWon = false;

    for(let i = 0; i < winningCondition.length; i++){
        const condition = winningCondition[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }

        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }

    }

    if(roundWon){
        statusText.textContent = `${currentPlayer} wins`; 
        running = false;
    }

    else if(!options.includes("")){
        statusText.textContent = `Draw!`; 
        running = false;

    }
    
    else{
        changePlayer();
    }

}

function restartGame(){
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    statusText.textContent = `${currentPlayer}'s turn`; 
    running = true;

}
