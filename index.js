/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let counter = 1;
let newValue = 1;
let xWinsCounter = 0;
let oWinsCounter = 0;
function resetGrid(){
     for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            grid[rowidx][colIdx] = 0
        }
     }
     renderMainGrid();
     addClickHandlers();
}
function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function whoWinsFunc(x){
    if((grid[0][0] == x && grid[0][1] == x && grid[0][2] == x) ||
    (grid[1][0] == x && grid[1][1] == x && grid[1][2] == x) ||
    (grid[2][0] == x && grid[2][1] == x && grid[2][2] == x) ||
    (grid[0][0] == x && grid[1][0] == x && grid[2][0] == x) ||
    (grid[0][1] == x && grid[1][1] == x && grid[2][1] == x) ||
    (grid[0][2] == x && grid[1][2] == x && grid[2][2] == x) ||
    (grid[0][0] == x && grid[1][1] == x && grid[2][2] == x) ||
    (grid[0][2] == x && grid[1][1] == x && grid[2][0] == x)
    ){
        return true
    }
    return false
}

function oWinsFunc(){
    return false
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");

    counter = counter + 1;
    if(counter % 2 == 1){
        newValue = 2
    }
    else{
        newValue = 1;
    }
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    addClickHandlers();
    let xWins = whoWinsFunc(1);
    if(xWins == true){
        xWinsCounter = xWinsCounter + 1;
        alert('X wins has won the game. Start a new game')
        document.getElementsByClassName('xWinsTime')[0].innerHTML = xWinsCounter
        return
    }
    let oWins = whoWinsFunc(2);
    if(oWins == true){
        oWinsCounter = oWinsCounter + 1;
        alert('0 wins has won the game. Start a new game')
        document.getElementsByClassName('oWinsTime')[0].innerHTML = oWinsCounter
        return
    }
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }

}
document.getElementsByClassName("button")[0].addEventListener('click', resetGrid, false);
initializeGrid();
renderMainGrid();
addClickHandlers();
