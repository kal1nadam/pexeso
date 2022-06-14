



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

    var oneAlreadyFliped = false;
    var firstCard = -1;
    var secondCard = -2;


    var boxes = document.getElementsByClassName("box")
    for(var b = 0; b < boxes.length; b++){
        boxes[b].addEventListener("click", (e)=>{
            if(!oneAlreadyFliped){
                flipFirst(e)
            }
            else{
                flipSecond(e)
            }
        })
    }
    return
}




restartGameState()




var flipFirst = (e)=>{
    e.target.style.transform = "rotateY(180deg)"
    // console.log(e.target.innerHTML)
    firstCard = parseInt(e.target.innerHTML)
    oneAlreadyFliped = true
}

var flipSecond = (e)=>{
    secondCard = parseInt(e.target.innerHTML)
    e.target.style.color = "black"

}