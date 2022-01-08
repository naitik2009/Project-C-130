  

peter_pan_song = "";

harry_potter_theme_song = "";

leftWrist_x = 0;
leftWrist_y = 0;

rightWrist_x = 0;
rightWrist_y = 0;

scoreleftWrist = 0;
song_Peter_pan = "";

scorerightWrist = 0;
song_Harry_Potter_Theme = "";

function setup ()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
 
  function modelLoaded ()
  {
      console.log("PoseNet Is Initialized");
  }

function draw ()
{
    image(0, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song_Peter_pan = peter_pan_song.isPlaying();
    console.log("song_Peter_pan");

    song_Harry_Potter_Theme = harry_potter_theme_song.isPlaying();
    console.log("song_Harry_Potter_Theme");

    if(scoreleftWrist > 0.2)
    {
        circle(leftWrist_x, leftWrist_y, 20);
        harry_potter_theme_song.stop();
        if(song_Peter_pan == false){
            peter_pan_song.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name Peter Pan Song";
        }
    }

    if(scorerightWrist > 0.2)
    {
        circle(rightWrist_x, rightWrist_y, 20);
        peter_pan_song.stop();
        if(song_Harry_Potter_Theme == false){
            harry_potter_theme_song.play();
        }
        else{
            document.getElementById("song_id").innerHTML = "Song Name Harry Potter Theme Song";
        }
    }
}

function preload()
{
    peter_pan_song = loadSound("music2.mp3");
    harry_potter_theme_song = loadSound("music.mp3");
}

function gotPoses(results)
{
  if(results.length > 0)
  {
      console.log(results);
      leftWrist_x = results[0].pose.leftWrist.x;
      leftWrist_y = results[0].pose.leftWrist.y;
      console.log("leftWrist_x = " + leftWrist_x + "leftWrist_y = " + leftWrist_y);

      scoreleftWrist = results[0].pose.keypoints[9].score;
      console.log("leftWrist_Score = " + scoreleftWrist);

      scorerightWrist = results[0].pose.keypoints[10].score;
      console.log("rightWrist_Score = " + scorerightWrist);

      rightWrist_x = results[0].pose.rightWrist.x;
      rightWrist_y = results[0].pose.rightWrist.y;
      console.log("rightWrist_x = " + rightWrist_x + "rightWrist_y = " + rightWrist_y);
  }
}