/*

Consegna
Generare una griglia di gioco quadrata , in cui ogni cella contiene un numero incrementale tra quelli compresi tra 1 e 100
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.
Bonus
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.


*/

const output = document.getElementById('game');
const playButton = document.getElementById('play-button');
const difficolta = document.getElementById('difficolta');

function addBackgroundOnClick (element) {
    element.addEventListener('click', function() {
        this.classList.add('clicked');
    })
}

function genrateBombsList (nBombs, maxIndex){
    let bombList = [];
    while (bombList.length < nBombs){
        let randomNumber = Math.floor(Math.random() * maxIndex);

        if (bombList.indexOf(randomNumber) === -1) {
            bombList.push(randomNumber)
            
        } 
    }

    return bombList;
    
}

function calculateBombs (numCells, bombList, gridX) {
    let gameArray = [];
    let gridArray = [];


    for (let i = 0; i < numCells; i++){
        
        
        if (bombList.indexOf(i) !== -1){
            gameArray.push('bomb');
        } else {
            gameArray.push('');
        }

        
    }
    
    for (let i = 0; i < gameArray.length; i ++){
        let index1 = i - gridX - 1;
        let index2 = i - gridX;
        let index3 = i - gridX + 1;
        let index4 = i + 1;
        let index5 = i + gridX + 1;
        let index6 = i + gridX;
        let index7 = i + gridX - 1;
        let index8 = i -1;

        let bombSum = 0;

        if (gameArray[i] === 'bomb') {
            gridArray.push(gameArray[i])
        }
        
        else 
        // calcolo per angolo alto a sinistra
        {
            let bombSum = 0;

            if (i % gridX === 0){
                if (gameArray[index2] === 'bomb'){
                    bombSum++;
                }
    
                if (gameArray[index3] === 'bomb'){
                    bombSum++;
                }
    
                if (gameArray[index4] === 'bomb'){
                    bombSum++;
                }
    
                if (gameArray[index5] === 'bomb'){
                    bombSum++;
                }
    
                if (gameArray[index6] === 'bomb'){
                    bombSum++;
                }


            } else if ((i+1) % gridX === 0) {
                if (gameArray[index1] === 'bomb'){
                    bombSum++;
                }
    
                if (gameArray[index2] === 'bomb'){
                    bombSum++;
                }

                if (gameArray[index6] === 'bomb'){
                    bombSum++;
                }
    
                if (gameArray[index7] === 'bomb'){
                    bombSum++;
                }
    
                if (gameArray[index8] === 'bomb'){
                    bombSum++;
                }
            }
            
            else {

            if (gameArray[index1] === 'bomb'){
                bombSum++;
            }

            if (gameArray[index2] === 'bomb'){
                bombSum++;
            }

            if (gameArray[index3] === 'bomb'){
                bombSum++;
            }

            if (gameArray[index4] === 'bomb'){
                bombSum++;
            }

            if (gameArray[index5] === 'bomb'){
                bombSum++;
            }

            if (gameArray[index6] === 'bomb'){
                bombSum++;
            }

            if (gameArray[index7] === 'bomb'){
                bombSum++;
            }

            if (gameArray[index8] === 'bomb'){
                bombSum++;
            }

        }

        gridArray.push(bombSum)
    }
    }

    return gridArray;

}


function generateSquare (difficolta) {
    
    let gridX;
    let nBombs;

    if (difficolta === '1') {
        gridX = 10;
        nBombs = 15
    } else if (difficolta === '2'){
        gridX = 9;
        nBombs = 12;
    } else if (difficolta === '3'){
        gridX = 7;
        nBombs = 10;
    }

    let numCells = gridX * gridX;

    let bombsArray = genrateBombsList(nBombs, numCells);
    let gridArray;
    let gameArray = calculateBombs(numCells, bombsArray, gridX);

    output.style.width = `calc(var(--square) * ${gridX})`;

    for (let i = 0; i < numCells; i++){
        const square = document.createElement('div');
        const spanForNumber = document.createElement('span');
        square.append(spanForNumber);
        square.classList.add('square');
        square.classList.add('animate__animated');
        square.classList.add('animate__backInRight');
        square.style.animationDelay = `${20 * i}ms`
        addBackgroundOnClick(square);
        output.append(square);

        spanForNumber.innerText = gameArray[i];
    }

    console.log(gameArray)



}

playButton.addEventListener('click', function(){
    output.innerHTML = '';
    generateSquare(difficolta.value);
})

