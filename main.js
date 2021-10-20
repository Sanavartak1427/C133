function setup(){
    canvas = createCanvas(640, 420);
    canvas.position(350, 150);
    
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Object";
}
img = "";
status ="";
objects = [];

function preload(){
    img = loadImage("bedroom.jpg");
}

function modelLoaded(){
    console.log("ModelLoaded!");
    status = true;
    objectDetector.detect(img, gotresults);
}

function gotresults(error, results){
    if (error){
    console.log("error");
    }
    else{
        console.log(results);
        objects = results;
        }
    

}

function draw() {
    image(img, 0, 0, 640, 420);
    if(status != ""){
        document.getElementById("status").innerHTML = "Status:Object Detected";
        for(i = 0; i < objects.length; i++){
        percentage = floor(objects[i].confidence * 100);
            fill('#e01507');
            text(objects[i].label + "" + percentage + "%" , objects[i].x , objects[i].y );
            noFill();
            stroke("#e01507");
            rect(objects[i].x - 35 , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}
