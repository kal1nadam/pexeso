
var overScreen = document.getElementById("overScreen")
var player1Score = document.getElementById("player1Score")
var player2Score = document.getElementById("player2Score")
var turn = document.getElementById("turn")
var collectedCount = 0


var restartGameState = () => {
    var availableBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
    for(var i = 0; i < 18;i++){
        //first from the pair
        var random = Math.floor((Math.random() * availableBoxes.length))
        document.getElementById("box" + availableBoxes[random]).getElementsByClassName("box-back")[0].innerHTML = i
        availableBoxes.splice(random, 1)

        //second from the pair
        var random = Math.floor((Math.random() * availableBoxes.length))
        document.getElementById("box" + availableBoxes[random]).getElementsByClassName("box-back")[0].innerHTML = i
        availableBoxes.splice(random, 1)

    }

    


    var boxes = document.getElementsByClassName("box")
    for(var b = 0; b < boxes.length; b++){
        boxes[b].addEventListener("click", (e)=>{
            flipCard(e)
        })
    }
    return
}




restartGameState()

var player = 1
var oneAlreadyFliped = false;
var firstCard = -1;
var secondCard = -2;

var flipCard = (e)=>{
    if(oneAlreadyFliped == false){
        flipFirst(e)
    }
    else{
        flipSecond(e)
    }
}

var flipFirst = (e)=>{
    e.target.style.transform = "rotateY(180deg)"
    firstCard = e.target
    oneAlreadyFliped = true
    //overScreen - fast clicking prevention
    overScreen.style.zIndex = 100
    setTimeout(() => {
        overScreen.style.zIndex = -1
    }, 400);

}

var flipSecond = (e)=>{
    e.target.style.transform = "rotateY(180deg)"
    //overScreen - fast clicking prevention
    overScreen.style.zIndex = 100
    secondCard = parseInt(e.target.getElementsByClassName("box-back")[0].innerHTML)
    //MATCH
    if(parseInt(firstCard.getElementsByClassName("box-back")[0].innerHTML) == secondCard){
        collectedCount++
        if(player == 1){
            firstCard.style.animationName = "player1CardMatch"
            e.target.style.animationName = "player1CardMatch"
        }
        else{
            firstCard.style.animationName = "player2CardMatch"
            e.target.style.animationName = "player2CardMatch"
        }
        
        setTimeout(() => {
            firstCard.style.animationName = "none"
            firstCard.style.display = "none"
            e.target.style.animationName = "none"
            e.target.style.display = "none"
            if(player == 1){
                player1Score.innerHTML = parseInt(player1Score.innerHTML) + 1
            }
            else{
                player2Score.innerHTML = parseInt(player2Score.innerHTML) + 1
            }
            overScreen.style.zIndex = -1
            if(collectedCount == 18){end()}
        }, 3000);
    }
    //NOT MATCH
    else{
        setTimeout(()=>{
            overScreen.style.zIndex = -1
        }, 1600)
        setTimeout(() => {
            firstCard.style.transform = "rotateY(0deg)"
            e.target.style.transform = "rotateY(0deg)"
            //player switch
            if(player == 1){
                player = 2
                turn.style.color = "rgb(35, 73, 199)"
            }
            else{
                player = 1
                turn.style.color = "rgb(19, 102, 51)"
            }
        }, 1000);
    }
    oneAlreadyFliped = false
    
}

var end = ()=>{
    score1 = parseInt(player1Score.innerHTML)
    score2 = parseInt(player2Score.innerHTML)
    if(score1 == score2){draw()}
    else if(score1 > score2){win(1)}
    else{win(2)}
}


var draw = ()=>{
    console.log("DRAW")
}

var win = (player)=>{
    console.log("WIN"+player)
}