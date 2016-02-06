

window.onload = function(){

  var button = document.getElementById('add-button');
  var display = document.getElementById('display');

  var makeCover = function(track){
    var div = document.createElement('div');
    div.style.backgroundImage = "url('" + track.album.images[0].url + "')";
    div.style.backgroundSize = "cover";
    div.className = "cover";

    var audioObject = new Audio(track.preview_url);

    div.appendChild(audioObject);
    div.onclick = function(){
      if(audioObject.paused == true || audioObject.ended == true){
      audioObject.play(); 
        }
        else {
          audioObject.pause();
        }
    }
    display.appendChild(div);

  }

  button.onclick = function(){

  display.innerHTML = "";
  var box = document.getElementById('track');
  var query = box.value;

  console.log(query);
  var url = "https://api.spotify.com/v1/search?q=" + query + "&type=track";
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send(null);

  request.onload = function(){
    if(request.status === 200){
      console.log('got the data');
    }
    var data = JSON.parse(request.responseText);
    var names = [];

    console.log(data)

    for(track of data.tracks.items){
      makeCover(track);

    }

    
    }

  }

};

