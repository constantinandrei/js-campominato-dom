/*

Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
Il computer deve generare 16 numeri casuali compresi nel range della griglia: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella:
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
al click con il tasto destro su una cella, inseriamo il flag per indicare che la cella potrebbe avere una bomba
Il computer deve generare 16 numeri casuali - cioè le bombe - compresi nello stesso range della difficoltà prescelta.
Consigli del giorno: :party_wizard:
Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi.
Ad esempio: Di cosa ho bisogno per generare i numeri?
Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti.
Le validazioni e i controlli possiamo farli anche in un secondo momento.


*/

// dati gioco
let gameOver = false;
let bombsAndNotBombsArray = [];
let userPoints = 0;

const output = document.getElementById('game');
const playButton = document.getElementById('play-button');
const difficolta = document.getElementById('difficolta');
const gameControl = document.getElementById('game-control');
const points = document.getElementById('punteggio');
const gameStatus = document.getElementById('game-status');
const cancelButton = document.getElementById ('cancel-button');

points.innerHTML = 0;

function addFlag(element){
    element.addEventListener('contextmenu', function(){
        this.classList.add('flag')
    })
}

function revealBombs(){
    const cells = document.getElementsByClassName('square');
    for (let i = 0; i < bombsAndNotBombsArray.length; i++){
        cells[i].classList.remove('animate__animated');
        if (bombsAndNotBombsArray[i] === 'bomb'){
            cells[i].classList.add('bomb');
        }
    }
}

function addBomb (element) {
    element.addEventListener('click', function() {
        if (gameOver){
            return;
        }
        this.classList.add('bomb');
        gameOver = true;
        revealBombs();
            return;
    })

    element.addEventListener('mouseup', function(e) {
        
        if (typeof e === 'object'){
            if (e.button === 2){
    
                if (!this.classList.contains('clicked'))
                {this.classList.toggle('flag');}
                e.preventDefault();
            }
        }
    }
        )

}

function addNormalCell (element, iterator) {
    element.addEventListener('mouseup', function(e) {
        
    if (typeof e === 'object'){
        if (e.button === 2){

            if (!this.classList.contains('clicked'))
            {this.classList.toggle('flag');}
            e.preventDefault();
        }
    }
}
    )


    element.addEventListener ('click', function(){ 
        if (gameOver){
            revealBombs();
            return;
        }
        this.classList.remove('flag');
        this.classList.add('clicked');
        this.innerText = bombsAndNotBombsArray[iterator];
        userPoints++;
        points.innerHTML = userPoints;}
    )

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
// funzione che prende un array con gli indici delle bombe e restitiusce un array con posizione delle bombe
// e con il dettaglio del numero delle bombe nei dintorni 
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
    bombsAndNotBombsArray = calculateBombs(numCells, bombsArray, gridX);

    output.style.width = `calc(var(--square) * ${gridX})`;

    for (let i = 0; i < numCells; i++){
        const square = document.createElement('div');
        const spanForNumber = document.createElement('span');
        square.append(spanForNumber);
        square.classList.add('square');
        square.classList.add('animate__animated');
        square.classList.add('animate__backInRight');
        square.style.animationDelay = `${20 * i}ms`
        square.setAttribute('oncontextmenu', 'event.preventDefault()')
        if (bombsAndNotBombsArray[i] === 'bomb'){
            addBomb(square);
        } else {
            addNormalCell(square, i);
            
        }
        output.append(square);
    }
}

playButton.addEventListener('click', function(){
    bombsAndNotBombsArray = [];
    output.innerHTML = '';
    generateSquare(difficolta.value);
    gameControl.classList.add('d-none');
    gameStatus.classList.remove('d-none');
})

cancelButton.addEventListener('click', function(){
    gameOver = false;
    bombsAndNotBombsArray = [];
    userPoints = 0;
    points.innerHTML = 0;
    output.innerHTML = 'Selezionare un livello di difficoltà e premere gioca';
    gameStatus.classList.add('d-none');
    gameControl.classList.remove('d-none');
})