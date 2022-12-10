const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let previousHole;
let score = 0 ;
let timeUp = false;


function randomTime (min, max){
    return Math.round(Math.random()*(max-min)+min);

}

function randomMole (holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index]
    if (hole == previousHole){
        console.log("Wrong hole!! 0w0");
        return randomMole(holes);
    }
    previousHole = hole;
    return hole;
}

function pepPop(min, max){
    const time = randomTime(min, max);
    const hole = randomMole(holes);
    // console.log (time,hole)
    hole.classList.add("up");
    setTimeout(()=>{
        hole.classList.remove("up")
        if(!timeUp) pepPop(min, max);
    },time)
}

function startGame(min, max){
    scoreBoard.textContent = 0;
    timeUp= false;
    score = 0;
    pepPop(min, max)
    setTimeout(()=>{
        timeUp=true
    }, 10000)
}

function bonk(e){
    if(!e.isTrusted) return;
    score++ 
    this.classList.remove("up");
    scoreBoard.textContent = score;
}

moles.forEach(element => element.addEventListener("click",bonk))