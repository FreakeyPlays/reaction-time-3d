const storageKey = "3D_Reactiontime_Highscore";

let startTime = null;
let HUD_active = document.getElementById("activeTimeHUD");
let HUD_highscore = document.getElementById("highscoreTimeHUD");

export function checkHighscore(newScore){
    if(newScore < getHighscore()){
        setHighscore(newScore);
    }
}

function getHighscore(){
    let highscore = localStorage.getItem(storageKey);

    if(highscore === null){
        highscore = 1 * 1000 * 60 * 60;
        setHighscore(highscore);
    }

    return parseFloat(highscore);
}

function setHighscore(newHighscore){
    localStorage.setItem(storageKey, newHighscore.toString());
}

export function startCount(){
    startTime = performance.now();
}

export function endCount(){
    let diff = performance.now() - startTime;
    startTime = null;
    checkHighscore(diff);
}

export function updateHighscore(){
    let times = parseTime(getHighscore());
    let mm = times.minutes < 10 ? "0" + times.minutes : times.minutes;
    let ss = times.seconds < 10 ? "0" + times.seconds : times.seconds;
    let ms = times.msec < 100 ? times.msec < 10 ? "00" + times.msec : "0" + times.msec : times.msec;

    HUD_highscore.innerText = `${mm}m ${ss}s ${ms}ms`;
}

export function updateScore(){
    if(startTime !== null){
        let now = performance.now();
        let msec = now - startTime;
        
        let times = parseTime(msec);

        let mm = times.minutes < 10 ? "0" + times.minutes : times.minutes;
        let ss = times.seconds < 10 ? "0" + times.seconds : times.seconds;
        let ms = times.msec < 100 ? times.msec < 10 ? "00" + times.msec : "0" + times.msec : times.msec;
        HUD_active.innerText = `${mm}m ${ss}s ${ms}ms`;
    }
}

export function resetTime(){
    HUD_active.innerText = "00m 00s 000ms";
}

function parseTime(msec){
    if(msec == 1 * 1000 * 60 * 60){
        return {
            minutes: 0, seconds: 0, msec: 0
        }
    }

    let minutes = Math.floor(msec / 1000 / 60);
    msec -= minutes * 1000 * 60;
    let seconds = Math.floor(msec / 1000);
    msec -= seconds * 1000;
    msec = Math.ceil(msec);

    return {
        minutes, seconds, msec
    }
}