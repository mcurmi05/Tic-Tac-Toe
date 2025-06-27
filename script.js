const container = document.querySelector('#main-container');
const squares = document.querySelectorAll('.square');
const clear = document.querySelector('#clear-button');
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
                img.src = 'assets/cross.jpeg'; 
                tile.symbol = 'X';
                xTurn = false;
                console.log(`${this.crossesPlayer.name} played on tile ${tile.index + 1}`);
            } else {
                img.src = 'assets/naught.jpeg';
                tile.symbol = 'O';
                xTurn = true;   
                console.log(`${this.naughtsPlayer.name} played on tile ${tile.index + 1}`);
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
        console.log('Board enabled');
    }

    //Function to disable the board tiles after a win or draw
    this.disableBoard = function() {
        this.board.boardArray.forEach(tile => {
            if (tile.handler) {
                tile.div.removeEventListener('click', tile.handler);
                tile.handler = null;
            }
        });
        console.log('Board disabled');
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
                if (this.board.boardArray[a].symbol === 'X') {
                    this.crossesPlayer.score++;
                    console.log(`${this.crossesPlayer.name} wins! Their new score is ${this.crossesPlayer.score}`);
                } else {
                    this.naughtsPlayer.score++;
                    console.log(`${this.naughtsPlayer.name} wins!`);
                }
                this.disableBoard();
            }
        }

        if (this.board.boardArray.every(tile => tile.symbol)) {
            console.log('It\'s a draw!');
        }
    }

    //Function to reset the game
    this.resetGame = function() {
        this.board.clearGameBoard();
        this.enableBoard();
        console.log('Game reset');
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
        });
        xTurn = true; 
        console.log('Game board cleared');
    }
}


// Initializing the game
let game = new NaughtsAndCrossesGame();




