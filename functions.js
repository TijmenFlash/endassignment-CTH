//global variables
var images = new Array(24);
var angle = 360;
var imageNumber = 0;
var done = "http://images.vectorhq.com/images/previews/5f3/green-checkmark-and-red-minus-147478.png";

var myRequest = new XMLHttpRequest();
var method = "GET";
var url = "http://www.europeana.eu/api/v2/search.json?wskey=DHtYfQfP5&query=abstract+paintings&qf=image&start=100&rows=24&profile=standard";

window.onload = function(){
    document.getElementById("prev").style.visibility = "hidden"; 
    document.getElementById("rotate").style.visibility = "hidden"; 
    document.getElementById("guess").style.visibility = "hidden"; 
};

guessed = function(){
    //hide game buttons when already guessed right
    if(images[imageNumber] == done){
        document.getElementById("rotate").style.visibility = "hidden"; 
        document.getElementById("guess").style.visibility = "hidden"; 
    }
}

//turn function
turn = function(){
    
    //creating local variables
    var img = document.getElementById('image');
    
    //make sure the agle is max 360 degrees
    if (angle>300){
        angle = 0;
    }
    
    //adding 90degrees to the able every click
    angle+=90;
    img.style.transform = 'rotate('+angle+'deg)'; 
    console.log("click received: " + angle + " deg");
}


//guess function
guess = function(){
    if(angle==360){
        alert("thats right!");
        angle = "360";
        images[imageNumber] = done;
        next();
    }else{
        alert("Wrong, try again!");
    }
    console.log("guess received: " + angle + " deg");
}


//next function
next = function(){
    imageNumber+=1;
    if (imageNumber == images.length){
        imageNumber=0;
    }
    turn();  //"randomize" the angle
    document.getElementById('image').src = images[imageNumber];
    document.getElementById('next').innerHTML = "Next Image";
    document.getElementById('prev').style.visibility = 'visible';
    document.getElementById("rotate").style.visibility = "visible"; 
    document.getElementById("guess").style.visibility = "visible"; 
    guessed();
    console.log("next received");
}



//previous function
prev = function(){
    imageNumber-=1;
    if (imageNumber == -1){
        imageNumber = images.length-1;
    }
    turn();  //"randomize" the angle
    document.getElementById('image').src = images[imageNumber];
    document.getElementById('prev').innerHTML = "Previous Image";
    document.getElementById("rotate").style.visibility = "visible"; 
    document.getElementById("guess").style.visibility = "visible"; 
    guessed();
    console.log("prev received");
}


myRequest.open(method, url);
myRequest.send();

myRequest.onreadystatechange = function(){
    if (myRequest.readyState === 4) {
        var data = myRequest.response;
        var dataParsed = JSON.parse(data);
        console.log(dataParsed);
        var i;
        for (i = 0; i < dataParsed.items.length; i++) {
            images[i] = dataParsed.items[i].edmPreview[0];
        }
    } else {
        console.log(myRequest.readyState);
    }
}
