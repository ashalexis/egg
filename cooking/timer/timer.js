//variables
let countdown;
const timerDisplay = document.querySelector('.display-time-left');
const buttons = document.querySelectorAll('[data-time]');
const input = document.querySelector('#custom');
const clear = document.querySelector('.clear');
const instructions = document.querySelector('.instructions');

//objects
const methods = {
    onsen: `Boil 1L of water. Once boiling, remove from heat. Add 200ml cold water and submerge refrigerated eggs in the water. Set the timer for <strong>17 minutes</strong>.`,
    poached: `Crack egg into bowl. Bring a pan of water to a simmer. Tip egg into pan. Cook for <strong>2 minutes</strong> then turn off heat and leave pan for <strong>8-10 minutes</strong>.`
}

//functions
function timer(seconds){
    //clear running timer
    clearInterval(countdown);

    //start new timer
    const now = Date.now(); //in milliseconds
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    //timer function
    countdown = setInterval(()=>{
        const secondsLeft = Math.round((then-Date.now()) / 1000);

        //prevents countdown from running into negative times
        if (secondsLeft < 0){
            clearInterval(countdown);
            return
        };

        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds){
    let remainder = seconds;
    const hrs = Math.floor(seconds / 3600);
    remainder = remainder % 3600;
    const mins = Math.floor(remainder / 60);
    remainder = remainder % 60;

    const display = `${hrs < 10 ? (hrs === 0? '' : '0') : ''}${hrs === 0 ? '' : hrs + ':'}${mins < 10 ? '0' : ''}${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function startTimer(){
    const time = this.dataset.time;
    timer(time);
}

function handleInstructions(){
    const val = this.value;
    instructions.innerHTML = methods[val];
}

//event listeners
buttons.forEach(button => button.addEventListener('click', startTimer));

input.addEventListener('submit', function(e){
    e.preventDefault();
    let mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});

clear.addEventListener('click', ()=>{
    timer(0);
})

document.querySelector('#eggs').addEventListener('change', handleInstructions)