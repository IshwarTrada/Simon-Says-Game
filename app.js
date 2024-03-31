let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h3 = document.querySelector('h3');

document.addEventListener('keypress', function () {
    if (started == false) {
        started = true;

        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;


    let randInx = Math.floor(Math.random() * 4);
    let randCol = btns[randInx];
    let randBtn = document.querySelector(`.${randCol}`);
    gameSeq.push(randCol);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function btnFlash(btn) {
    btn.classList.add('flash');

    setTimeout(function () {
        btn.classList.remove('flash');
    }, 250);
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    userCol = btn.getAttribute('id');
    userSeq.push(userCol);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll('.btn');
for (btn of allBtns) {
    btn.addEventListener('click', btnPress);
}

function checkAns(idx) {
    if (userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    }
    else {
        if(level == 0) {
            return;
        }
        h3.innerHTML = `Game Over! Your score was ${level}<br>Press any key from Keyboard to Restart`;
        
        document.querySelector('body').style.backgroundImage = 'linear-gradient(to right,rgb(199, 38, 38), rgba(255,0,0,0), rgb(199, 38, 38))';
        document.addEventListener('keypress', function () {
            document.querySelector('body').style.backgroundImage = 'linear-gradient(to right,rgb(38, 100, 199), rgba(255,0,0,0), rgb(38, 100, 199))';

        });

        reset();
    }
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}