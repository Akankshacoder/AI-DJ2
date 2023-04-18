song="";
LeftWristX= 0;
LeftWristY= 0;
RightWristX= 0;
RightWristY= 0;
scoreLeftwrist= "";
scoreRightwrist= "";

function preload(){
song = loadSound("music.mp3")
}

function setup(){
    canvas = createCanvas(600, 500);
   canvas.center();

   video = createCapture(VIDEO);
   video.hide()

   poseNet = ml5.poseNet(video,modelLoaded);
   poseNet.on('pose', gotposes)


}
function modelLoaded(){
console.log("Model has loaded succesfully")

}


function gotposes(results){
    if(results.length>0){
        console.log(results);
LeftWristX= results[0].pose.leftWrist.x;
LeftWristY= results[0].pose.leftWrist.y;
RightWristX= results[0].pose.rightWrist.x;
RightWristY= results[0].pose.rightWrist.y;
scoreLeftwrist = results[0].pose.keypoints[9].score;
scoreRightwrist = results[0].pose.keypoints[10].score;

    }


}


function draw(){
image(video, 0, 0, 600, 500)
fill("red");
stroke("red");
if(scoreLeftwrist > 0.2){
    circle(LeftWristX,LeftWristY, 20);
    new_posi = Number(LeftWristY);
    rounded_value = floor(new_posi);
    divided = rounded_value / 500
    document.getElementById("vl").innerHTML = "Volume: "+ divided;
    song.setVolume(divided);
}

if(scoreRightwrist > 0.2){
    if(RightWristY > 0 && RightWristY <= 100 ){
        document.getElementById("sp").innerHTML = "Speed: 0.5x "
        song.rate(0.5);
    }
    else if(RightWristY > 100 && RightWristY <=200){
        document.getElementById("sp").innerHTML = "Speed: 1x"
        song.rate(1);
    }
    else if (RightWristY > 200 && RightWristY <= 300){
        document.getElementById("sp").innerHTML = "Speed: 1.5x"
        song.rate(1.5);
    }
    else if (RightWristY > 300 && RightWristY <= 400){
        document.getElementById("sp").innerHTML = "Speed: 2x"
        song.rate(2);
    }
    else if (RightWristY > 400 && RightWristY <= 500){
        document.getElementById("sp").innerHTML = "Speed: 2.5x"
        song.rate(2.5);
    }
}
}

function play1(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}