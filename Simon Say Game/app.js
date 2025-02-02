let gameTrack = [];
let userSeq = [];

let gameSeq = ['one','two','three','four'];

let level = 0;
let start  = false;
let highest = 0;

let h2 = document.querySelector("h2")
let buttons = document.querySelectorAll(".btn")
let h3 = document.querySelector("h3")

document.addEventListener("keypress",function(){
    if(start == false)
    {
        console.log("Game is started");
        start = true;
    }

    game();


})

function fleshColor(ranColor){
    ranColor.classList.add("general");
    setTimeout(function(){
        ranColor.classList.remove("general")
    }, 50);
}


function game()
{
    userSeq = []
    level++;
    h2.innerText = `Level ${level}`;
    let rand = Math.floor(Math.random() *3)
    let randColor = gameSeq[rand];
    let randDiv = document.querySelector(`.${randColor}`)
    gameTrack.push(randColor);
    
    console.log(gameTrack)

    fleshColor(randDiv);

}

function check(idx)
{
    if(gameTrack[idx] == userSeq[idx])
    {
        if(gameTrack.length == userSeq.length)
        {
            setTimeout(game,500)
        }
    }
    else
    {
        if(level > highest)
        {
            highest = level;
        }
        
        h2.innerHTML = `Highest Score was <b>${highest}</b><br>Wrong move! Your score is <b>${level}</b> <br>Press any key to start again`;
        reset();  
        
    }
}

function btnpress(){
    
    currentColor = this;
    fleshColor(this);

    getidColor = currentColor.getAttribute("id")
    userSeq.push(getidColor)
    console.log(userSeq)
    check(userSeq.length - 1);
}

for(listBtn of buttons){
    listBtn.addEventListener("click",btnpress)
}

function reset()
{
    start = false;
    userSeq = [];
    gameTrack = [];
    level = 0;

}



