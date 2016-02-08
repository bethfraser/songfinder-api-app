window.onload = function(){

  var buttonLyrics = document.getElementById('add-button-lyrics');
  var button = document.getElementById('add-button');
  var display = document.getElementById('display');
  var allAudio = document.getElementsByTagName('audio');
  var inputLyrics = document.getElementById('input-lyrics');
  var displayLyrics = document.getElementById('lyrics');
  var alternate = document.getElementById('alternate');
  var chosen = document.getElementById('chosen');

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
      chosen.innerHTML = "";
      var p = document.createElement('p');
      p.innerText = track.artists[0].name + ": " + track.name;
      p.className = 'cover-p';
      chosen.appendChild(p);
    }
    display.appendChild(div);
  }

  var tracksLoad = function(tracks){
    var tracksList = tracks.message.body.track_list;

    var populateList = function(){
      var list = [];

      for(track of tracksList){
        if(track.track.track_spotify_id){
          list.push(track.track.track_spotify_id)
        }
        else{
          var p = document.createElement('p');
          p.innerHTML = track.track.artist_name + ": " + track.track.track_name + " " + "<a href='https://www.youtube.com/results?search_query=" + track.track.artist_name + " "+ track.track.track_name +"''>Find on YouTube</a>";
          displayLyrics.appendChild(p);
          alternate.style.display = "block";
        }
      }

      var url = "https://api.spotify.com/v1/tracks/?ids=" + list.join(',');
      var request = new XMLHttpRequest();
      request.open("GET", url);
      request.send(null);

      request.onload = function(){
       var data = JSON.parse(request.responseText);

       for(track of data.tracks){
        makeCover(track);
      }
    }
  }
  populateList();
}

var lyricsLoad = function(){

  var lyricsquery = inputLyrics.value;
  var lyricsurl =   "http://api.musixmatch.com/ws/1.1/track.search?q_lyrics=" + lyricsquery + "&apikey=e292fdea17eaa5d3e573aa95e90acade&f_has_lyrics&s_track_rating=desc";
  var lyricsrequest = new XMLHttpRequest();
  lyricsrequest.open("GET", lyricsurl);
  lyricsrequest.send(null);

  var response = {};
  lyricsrequest.onload = function(){
    if(lyricsrequest.status === 200){
      console.log('got the data');
    }
    response = JSON.parse(lyricsrequest.responseText);
    tracksLoad(response);
  }
}

var resetBoxes = function(){
  display.innerHTML = "";
  displayLyrics.innerHTML = "";
  chosen.innerHTML = "";
  alternate.style.display = "none";
}

button.onclick = function(){
  resetBoxes();

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
    var tracks = data.tracks.items;
    tracks.sort(function (a, b) {
      return b.popularity - a.popularity;
    })

    for(track of tracks){
      makeCover(track);
    }
  }
}

buttonLyrics.onclick = function(){
  resetBoxes();
  lyricsLoad();
}

};

