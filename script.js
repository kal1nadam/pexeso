



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
}

var flipSecond = (e)=>{
    e.target.style.transform = "rotateY(180deg)"
    secondCard = parseInt(e.target.getElementsByClassName("box-back")[0].innerHTML)
    if(parseInt(firstCard.getElementsByClassName("box-back")[0].innerHTML) == secondCard){
        console.log("MATCH!")
    }
    else{
        console.log("notMatch!")
        setTimeout(() => {
            firstCard.style.transform = "rotateY(0deg)"
            e.target.style.transform = "rotateY(0deg)"
        }, 1000);
    }
    oneAlreadyFliped = false
    
}