var endPopUp = document.getElementById("endPopUp")
var restartButton = document.getElementById("restartButton")
var overScreen = document.getElementById("overScreen")
var player1Score = document.getElementById("player1Score")
var player2Score = document.getElementById("player2Score")
var turn = document.getElementById("turn")
collectedCount = 0
player = 1
oneAlreadyFliped = false;
firstCard = -1;
secondCard = -2;

var restartGameState = () => {    

    var availableBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
    for(var i = 0; i < 18;i++){
        //first from the pair
        var random = Math.floor((Math.random() * availableBoxes.length))
        var box = document.getElementById("box" + availableBoxes[random]).getElementsByClassName("box-back")[0]
        box.innerHTML = i
        box.style.backgroundImage = "url(./images/" + i +".jpg)"
        availableBoxes.splice(random, 1)

        //second from the pair
        var random = Math.floor((Math.random() * availableBoxes.length))
        var box = document.getElementById("box" + availableBoxes[random]).getElementsByClassName("box-back")[0]
        box.innerHTML = i
        box.style.backgroundImage = "url(./images/" + i +".jpg)"
        availableBoxes.splice(random, 1)

    }

    


    var boxes = document.getElementsByClassName("box-inner")
    for(var b = 0; b < boxes.length; b++){
        boxes[b].style.display = "flex"
        boxes[b].addEventListener("click", (e)=>{
            flipCard(e)
        })
    }
    return
}



var flipCard = (e)=>{
    if(oneAlreadyFliped == false){
        flipFirst(e)
    }
    else{
        flipSecond(e)
    }
}

var flipFirst = (e)=>{
    console.log("first" + e.target.getElementsByClassName("box-back")[0].innerHTML)
    e.target.style.transform = "rotateY(180deg)"
    firstCard = e.target
    oneAlreadyFliped = true
    //overScreen - fast clicking prevention
    overScreen.style.zIndex = 900
    setTimeout(() => {
        overScreen.style.zIndex = -1
    }, 400);

}

var flipSecond = (e)=>{
    console.log("SECOND" +e.target.getElementsByClassName("box-back")[0].innerHTML)
    e.target.style.transform = "rotateY(180deg)"
    //overScreen - fast clicking prevention
    overScreen.style.zIndex = 900
    secondCard = parseInt(e.target.getElementsByClassName("box-back")[0].innerHTML)
    //MATCH
    if(parseInt(firstCard.getElementsByClassName("box-back")[0].innerHTML) == secondCard){
        collectedCount++
        firstCard.parentElement.style.zIndex = 1000
        e.target.parentElement.style.zIndex = 1000
        firstCard.style.zIndex = 1000
        e.target.style.zIndex = 1000
        if(player == 1){
            firstCard.style.animationName = "player1CardMatch"
            e.target.style.animationName = "player1CardMatch"
            setTimeout(()=>{
                player1Score.style.animationName = "playerGainScore"
                setTimeout(() => {
                    player1Score.style.animationName = "none"
                }, 2000);
            }, 2500)
        }
        else{
            firstCard.style.animationName = "player2CardMatch"
            e.target.style.animationName = "player2CardMatch"
            setTimeout(()=>{
                player2Score.style.animationName = "playerGainScore"
                setTimeout(() => {
                    player2Score.style.animationName = "none"
                }, 2000);
            }, 2500)
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
        }, 2950);
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

var prepareRestartButton = ()=>{
    restartButton.addEventListener("click", ()=>{
        location.reload()
    })
}

var draw = ()=>{
    endPopUp.style.display = "block"
    endPopUp.style.width = "400px"
    restartButton.style.display = "block"
    overScreen.style.zIndex = 900
    overScreen.style.backgroundColor = "rgba(0,0,0,0.8)"
    endPopUp.innerHTML = "DRAW"
    //restart button
    prepareRestartButton()
}

var win = (player)=>{
    endPopUp.style.width = "850px"
    endPopUp.style.display = "block"
    restartButton.style.display = "block"
    overScreen.style.zIndex = 900
    overScreen.style.backgroundColor = "rgba(0,0,0,0.8)"
    if(player == 1){
        endPopUp.innerHTML = "GREEN HAS WON!"
        endPopUp.style.color = "rgb(19, 102, 51)"
    }
    else{
        endPopUp.innerHTML = "BLUE HAS WON!"
        endPopUp.style.color = "rgb(35, 73, 199)"
    }
    //restart button
    prepareRestartButton()
}



restartGameState()



