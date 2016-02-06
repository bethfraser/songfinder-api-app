

window.onload = function(){

  var button = document.getElementById('add-button');
  var display = document.getElementById('display');
  var allAudio = document.getElementsByTagName('audio');


  var playAudio = function(audioObject){
    if(audioObject.paused === true || audioObject.ended === true){
      for(item in allAudio){
        var audio = allAudio[item];
        if(audio.paused === false){
          audio.pause();
        }
      }
      audioObject.play(); 
    }
    else {
      audioObject.pause();
    }
  }

  var makeCover = function(track){
    var div = document.createElement('div');
    var url = track.album.images[0].url;

    div.style.backgroundImage = "url('" + url + "')";
    div.style.backgroundSize = "cover";
    div.className = "cover";

    var audioObject = new Audio(track.preview_url);

    div.appendChild(audioObject);
    div.onclick = function(){
      playAudio(audioObject);
    }
    display.appendChild(div);

  }
  button.onclick = function(){

    display.innerHTML = "";
    var box = document.getElementById('track');
    var query = box.value;
    var url = "https://api.spotify.com/v1/search?q=" + query + "&type=track";
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send(null);

    request.onload = function(){
      if(request.status === 200){
        console.log('got the data');
      }
      var data = JSON.parse(request.responseText);
      console.log(data)

      var tracks = data.tracks.items
      tracks.sort(function (a, b) {
        return b.popularity - a.popularity;
      })

      for(track of tracks){
        makeCover(track);
      }
    }

  }

};

