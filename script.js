const container = document.querySelector('#main-container');
const squares = document.querySelectorAll('.square');
const clear = document.querySelector('#clear-button');

const naughtsScore = document.querySelector('#naughts-score');
const crossesScore = document.querySelector('#crosses-score');

const title = document.querySelector('#title');


let xTurn = true;

const NaughtsAndCrossesGame = function(board) {

    //Setting the board object
    this.board = new NaughtsAndCrossesBoard();

    //Player object (initialised at the bottom of this)
    let Player = function(name) {
        this.name = name;
        this.score = 0;
    }

    //Function to handle the tile clicks
    let handleTileClick = function(tile) {
        if (!tile.symbol) {
            const img = document.createElement('img');
            if(xTurn){
                img.src = 'assets/cross.png'; 
                tile.symbol = 'X';
                xTurn = false;
            } else {
                img.src = 'assets/naught.png';
                tile.symbol = 'O';
                xTurn = true;   
            }
            tile.div.appendChild(img);
            this.checkForWinner();
        }
    }
    
    //Function that makes the board tiles clickable
    this.enableBoard = function(){
        this.board.boardArray.forEach(tile => {
            tile.handler = handleTileClick.bind(this, tile);
            tile.div.addEventListener('click', tile.handler);
        });
    }

    //Function to disable the board tiles after a win or draw
    this.disableBoard = function() {
        this.board.boardArray.forEach(tile => {
            if (tile.handler) {
                tile.div.removeEventListener('click', tile.handler);
                tile.handler = null;
            }
        });
    }
       
    
    //Function to check if someone has won the game
    this.checkForWinner = function(){
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6] 
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;
            if (this.board.boardArray[a].symbol && 
                this.board.boardArray[a].symbol === this.board.boardArray[b].symbol && 
                this.board.boardArray[a].symbol === this.board.boardArray[c].symbol) {
                
                this.board.boardArray[a].div.style.backgroundColor = "rgb(56, 232, 56)";
                this.board.boardArray[b].div.style.backgroundColor = "rgb(56, 232, 56)";
                this.board.boardArray[c].div.style.backgroundColor = "rgb(56, 232, 56)";


                if (this.board.boardArray[a].symbol === 'X') {
                    this.crossesPlayer.score++;
                    crossesScore.textContent = this.crossesPlayer.score;
                    title.textContent = `${this.crossesPlayer.name} wins!`;
                    title.style.color = 'red';
                } else {
                    this.naughtsPlayer.score++;
                    naughtsScore.textContent = this.naughtsPlayer.score;
                    title.textContent = `${this.naughtsPlayer.name} wins!`;
                    title.style.color = "rgb(84, 132, 227)";
                }
                this.disableBoard();
            }
        }

        if (this.board.boardArray.every(tile => tile.symbol)) {
            title.textContent = `It's a draw!`;
            title.style.color = 'black';
            this.disableBoard();
        }
    }

    //Function to reset the game
    this.resetGame = function() {
        this.disableBoard();
        this.board.clearGameBoard();
        this.enableBoard();
        title.textContent = `Welcome to Tic Tac Toe!`;
        title.style.color = 'black';
    }

    //Making the clear button functional
    clear.addEventListener('click', () => this.resetGame());

    //Initialisation
    this.crossesPlayer = new Player('Crosses');
    this.naughtsPlayer = new Player('Naughts');
    this.enableBoard();

    
}


const NaughtsAndCrossesBoard = function() {

    //The board array
    this.boardArray = [];

    //The tile object (9 of these are stored in this.board)
    let Tile = function(index) {
        this.index = index;
        this.div = squares[index];
        this.symbol = null;

        this.clearTile = function() {
            if (this.div.querySelector('img')) {
                this.div.removeChild(this.div.querySelector('img'));
            }
            this.symbol = null;
        }
    }
    //Storing all 9 tiles in the board array 
    for (let i =0; i<9; i++){
        this.boardArray.push(new Tile(i));
        console.log(`Tile ${i+1} initialized`);
    }

    //Function for clearing the game board
    this.clearGameBoard = function() {
        this.boardArray.forEach(tile => {
            tile.clearTile();
            tile.div.style.backgroundColor = "white";
            tile.div.classList.remove('highlight-win');
        });
        xTurn = true; 
        console.log('Game board cleared');
    }
}


// Initializing the game
let game = new NaughtsAndCrossesGame();




