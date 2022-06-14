



var restartGameState = () => {
    var availableBoxes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    for(var i = 0; i < 10;i++){
        //first from the pair
        var random = Math.floor(Math.random() * availableBoxes.length + 1)
        var box = document.getElementById("box" + availableBoxes[random]).innerHTML = i
        availableBoxes.splice(random, 1)
        // console.log(availableBoxes)
        //second from the pair
        var random = Math.floor(Math.random() * availableBoxes.length + 1)
        var box = document.getElementById("box" + availableBoxes[random]).innerHTML = i
        availableBoxes.splice(random, 1)
        // console.log(availableBoxes)
    }
}

var oneAlreadyFliped = false;
var firstCard = -1;
var secondCard = -2;

var boxes = document.getElementsByClassName("box")
for(var b = 0; b < boxes.length; b++){
    boxes[b].addEventListener("click", (e)=>{
        if(!oneAlreadyFliped){
            flipSecond()
        }
        else{
            flipFirst()
        }
    })
}

var flipFirst = (e)=>{
    firstCard = e.target.innerHTML
    oneAlreadyFliped = true
}

var flipSecond = (e)=>{

}


restartGameState()
