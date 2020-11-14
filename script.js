// Variables
var albums = [
  {"name": "Eternal Atake",
  "artist": "Lil Uzi Vert",
  "release": 2020,
  "tracks": ["Baby Pluto","Lo Mein","Silly Watch","POP","You Better Move","Homecoming","I'm Sorry","Celebration Station","Bigger Than Life","Chrome Heart Tags","Bust Me","Prices","Urgency (feat. Syd)","Venetia","Secure The Bag","P2","Futsal Shuffle 2020 - Bonus Track", "That Way - Bonus Track"]
  },
  {"name": "Pluto x Baby Pluto",
  "artist": "Future, Lil Uzi Vert",
  "release": 2020,
  "tracks": ["Stripes Like Burberry","Marni On Me","Sleeping On The Floor","Real Baby Pluto","Drankin N' Smokin","Million Dollar Play","Plastic","That's It","Bought A Bad Bitch","Rockstar Chainz","Lullaby","She Never Been To Pluto","Off Dat","I Don't Wanna Break Up","Bank Roll","Moment Of Clarity"]
  },
  {"name": "The Goat",
  "artist": "Polo G",
  "release": 2020,
  "tracks": ["Don't Believe The Hype","Heartless (feat. Mustard)","Martin & Gina","Flex (feat. Juice WRLD)","Go Stupid","21","33","I Know","Beautiful Pain (Losin My Mind)","No Matter What","Be Something (feat. Lil Baby)","Relentless","DND","Chinatown","Trials and Tribulations","Wishing For a Hero (feat. BJ The Chicago Kid)"]
  },
  {"name": "My Turn",
  "artist": "Lil Baby",
  "release": 2020,
  "tracks": ["Get Ugly", "Heatin Up (feat. Gunna)", "How", "Grace (feat. 42 Dugg)", "Woah", "Live Off My Closet (feat. Future)", "Same Thing", "Emotionally Scarred", "Commercial (feat. Lil Uzi Vert)", "Forever (feat. Lil Wayne)", "Can't Explain", "No Sucker (feat. Moneybagg Yo)", "Sum 2 Prove", "We Should (feat. Young Thug)", "Catch The Sun - From \"Queen & Slim: The Soundtrack\"", "Consistent","Gang Signs","Hurtin","Forget That (feat. Rylo Rodriguez", "Solid"]
  },
  {"name": "Lil Uzi Vert vs. The World",
  "artist": "Lil Uzi Vert",
  "release": 2016,
  "tracks": ["Canadian Goose","Hi Roller","Money Longer","Grab the Wheel","You Was Right","Baby Are You Home","Ps & Qs","Team Rocket","Scott and Ramona"]
  }
];

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

function displayAlbum(){
  userInput = document.getElementById("user-form").value;
  userAlbum = matchAlbum(userInput);

  if (userAlbum != undefined){
    var mainTitle = document.getElementsByClassName("jumbotron");

    if (mainTitle.length != 0){
      mainTitle[0].remove();
    }
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
}

function clearAlbum(){
  removeAlerts();

  var songTabs = document.querySelectorAll(".nav-link");
  var tiers = document.querySelectorAll(".tier");

  for (var i = 0; i < songTabs.length; i++){
    songTabs[i].remove();
  }
  for (var i = 0; i < tiers.length; i++){
    tiers[i].remove();
  }
  document.getElementById("averageAlert").remove();
}
// Event Listeners

window.addEventListener("keypress", function(){
  if(event.keyCode == 13 && !hasChosen) { //Enter keycode
    displayAlbum();
  }else if (event.keyCode == 13 && hasChosen){
    userInput = document.getElementById("user-form").value;
    userAlbum = matchAlbum(userInput);

    if (userAlbum != undefined){
      clearAlbum();
      displayAlbum();
    }else{
      createAlert("Album Not Found. Try again.");
    }
  }
})
