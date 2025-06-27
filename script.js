const container = document.querySelector('#main-container');
const squares = document.querySelectorAll('.square');
const clear = document.querySelector('#clear-button');

let xTurn = true;

squares.forEach(square => {
    square.addEventListener('click', () => {
        
        if (square.querySelector('img')) {
            return;
        } else if(xTurn) {
            const cross = document.createElement('img')
            cross.src = 'assets/cross.jpeg';
            square.appendChild(cross);
            xTurn = false;
        } else {
            const naught = document.createElement('img');
            naught.src = 'assets/naught.jpeg';
            square.appendChild(naught);
            xTurn = true;
        }
    
    });
});

clear.addEventListener('click', () => {
    squares.forEach(square => {
        if (square.querySelector('img')) {
            square.removeChild(square.querySelector('img'));
        }
    });
    xTurn = true;
});