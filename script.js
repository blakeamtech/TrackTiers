// Variables



const colorGrades = {
  "a": 5,
  "b": 4,
  "c": 3,
  "d": 2,
  "f": 1
}

var hasChosen = false;
var songTabs;
var tierColor = "a";

// Helper Functions

function matchAlbum(string){

  for (var i = 0; i < albums.length; i++){
    if (albums[i].name.toLowerCase() == string.toLowerCase()){
      return albums[i];
    }
  }
}

function brightenTier(tierId){
  var tiers = document.getElementsByClassName("tier");
  for (var i = 0; i < tiers.length; i++){
    if (tierId == tiers[i].id){
      document.getElementById(tiers[i].id).style["filter"] = "grayscale(150%)";
    } else{
      document.getElementById(tiers[i].id).style["filter"] = "grayscale(0%)";
    }
  }
}

function initializeTiers(){
  var div = document.getElementById("right");
  
  tierNames = ["a","b","c","d","f"];
  for (var i = 0; i < tierNames.length; i++){
    var tier = document.createElement("DIV");

    tier.className = "tier";
    tier.id = tierNames[i];

    tier.innerHTML = tierNames[i].toUpperCase();

    div.appendChild(tier);
  }

  var tiers = document.querySelectorAll(".tier");

  tiers.forEach(tier => {
    tier.addEventListener("click",function(){
      tierColor = tier.id;
      brightenTier(tierColor);
    })
  })
  var average = document.createElement("DIV");

  average.className = "average";
  average.id = "averageAlert";
  div.append(average);

}


function createEventListeners(){
  const songTabs = document.querySelectorAll(".nav-link");
  songTabs.forEach(song =>{
    song.addEventListener("click",function(){
      if (song.parentElement.id == "left"){
        
        var div = document.getElementById(tierColor);
        var node = document.createElement("A");

        node.className = "nav-link active";
        node.style.cursor = "pointer";
        node.id = song.innerHTML;
        node.innerHTML = song.innerHTML
        div.appendChild(node);

        document.getElementById("averageAlert").innerHTML = toLetterGrade();
        song.remove();

      } else {

        var div = document.getElementById("left");
        var node = document.createElement("A");

        node.className = "nav-link active";
        node.style.cursor = "pointer";
        node.id = song.innerHTML;
        node.innerHTML = song.innerHTML
        div.appendChild(node);
        
        document.getElementById("averageAlert").innerHTML = toLetterGrade();
        song.remove();
  
      }
      createEventListeners();
    })
  })
}
function createAlert(alertMessage){
  removeAlerts();
  alertMessages = document.getElementsByClassName("alert alert-dismissible alert-primary");
  if (alertMessages.length == 0){
    var div = document.getElementById("alert-messages");
    var node = document.createElement("DIV");
    node.className = "alert alert-dismissible alert-primary";
    node.style.transform = "translateX(28px)";

    node.innerHTML = alertMessage;

    div.appendChild(node)
  }
}

function computeGrade(){
  var tiers = document.querySelectorAll(".nav-link");

  var grade = 0;
  var count = 0;

  for (var i = 0; i < tiers.length; i++){
    if (!(tiers[i].parentElement.id == "left")){
      grade += colorGrades[tiers[i].parentElement.id];
      count += 1;
    }
  }
  return grade / count;
}

function toLetterGrade(){
  const userGrade = computeGrade();

  if (userGrade <= 5 && userGrade > (14/3)){
    return "A+";
  } else if (userGrade <= (14/3) && userGrade > (13/3)){
    return "A";
  } else if (userGrade <= (13/3) && userGrade > (4)){
    return "A-";
  } else if (userGrade <= (4) && userGrade > (11/3)){
    return "B+";
  } else if (userGrade <= (11/3) && userGrade > (10/3)){
    return "B";
  } else if (userGrade <= (10/3) && userGrade > (3)){
    return "B-";
  } else if (userGrade <= (3) && userGrade > (8/3)){
    return "C+";
  } else if (userGrade <= (8/3) && userGrade > (7/3)){
    return "C";
  } else if (userGrade <= (7/3) && userGrade > (2)){
    return "C-";
  } else if (userGrade <= (2) && userGrade > (5/3)){
    return "D+";
  } else if (userGrade <= (5/3) && userGrade > (4/3)){
    return "D";
  } else if (userGrade <= (4/3) && userGrade > (1)){
    return "D-";
  }
  return "F";
}


function removeAlerts(){
  alertMessages = document.getElementsByClassName("alert alert-dismissible alert-primary");

  for (var i = 0; i < alertMessages.length; i++){
    alertMessages[i].remove();
  }
}

// Event Listeners

window.addEventListener("keypress", function(){
  if(event.keyCode == 13 && !hasChosen) { //Enter keycode
    userInput = document.getElementById("user-form").value;
    userAlbum = matchAlbum(userInput);

    if (userAlbum != undefined){
      removeAlerts();
      hasChosen = true;
      createAlert("You have chosen "+userAlbum.name+" by "+userAlbum.artist+".");
      for (var i = 0; i < userAlbum.tracks.length; i++){
        var div = document.getElementById("left");
        var node = document.createElement("A");

        node.className = "nav-link active";
        node.style.cursor = "pointer";
        node.id = userAlbum.tracks[i]
        node.innerHTML = userAlbum.tracks[i];
        div.appendChild(node);

      }
      createEventListeners();
      initializeTiers()
    }else{
      createAlert("Album Not Found. Try again.");
    }
  }else if (event.keyCode == 13 && hasChosen){
    createAlert("Refresh the page to rate another album.");
  }
})
