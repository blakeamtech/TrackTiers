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
  "tracks": ["Stripes Like Burberry","Marni On Me","Sleeping On The Floor","Real Baby Pluto","Drankin N Smokin","Million Dollar Play","Plastic","That's It","Bought A Bad Bitch","Rockstar Chainz","Lullaby","She Never Been To Pluto","Off Dat","I Don't Wanna Break Up","Bank Roll","Moment Of Clarity"]
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
  },
  {"name": "Appetite for Destruction",
  "artist": "Guns N' Roses",
  "release": 1987,
  "tracks": ["Welcome to the Jungle","It's So Easy","Nightrain","Out Ta Get Me","Mr. Brownstone","Paradise City","My Michelle","Think About You","Sweet Child O' Mine","You're Crazy","Anything Goes","Rocket Queen"]
  },
  {"name": "Rodeo",
  "artist": "Travis Scott",
  "release": 2015,
  "tracks": ["Pornography","Oh My Dis Side","3500","Wasted","90210","Pray 4 Love","Nightcrawler","Piss on Your Grave","Antidote","Impossible","Maria I'm Drunk","Flying High","I Can Tell","Apple Pie","OK Alright","Never Catch Me"]
  },
  {"name": "Astroworld",
  "artist": "Travis Scott",
  "release": 2018,
  "tracks": ["Stargazing","Carousel","Sicko Mode","R.I.P Screw","Stop Trying to be God","No Bystanders","Skeletons","Wake Up","5% Tint","NC-17","Astrothunder","Yosemite","Can't Say","Who?What?","Butterfly Effect","Houstonfornication","Coffee Bean"]
  },
  {"name": "Birds in the Trap Sing McKnight",
  "artist": "Travis Scott",
  "release": 2016,
  "tracks": ["the ends","way back","coordinate","through the late night","beibs in the trap","sdp interlude","sweet sweet","outside","goosebumps","first take","pick up the phone","lose","guidance","wonderful"]
  },
  {"name": "Days Before Rodeo",
  "artist": "Travis Scott",
  "release": 2014,
  "tracks": ["Days Before Rodeo: The Prayer","Mamacita","Quintana, Part 2","Drugs You Should Try It","Don't Play","Skyfall","Zombies","Sloppy Toppy","Basement Freestyle","Backyard","Grey","BACC"]
  },
  {"name": "Graduation",
  "artist": "Kanye West",
  "release": 2007,
  "tracks": ["Good Morning","Champion","Stronger","I Wonder","Good Life","Can't Tell Me Nothing","Barry Bonds","Drunk and Hot Girls","Flashing Lights","Everything I Am","The Glory","Homecoming","Big Brother","Good Night","Bittersweet Poetry"]
  },
  {"name": "Electra Heart",
  "artist": "Marina and the Diamonds",
  "release": 2012,
  "tracks": ["Bubblegum Bitch","Primadonna","Lies","Homewrecker","Starring Role","The State of Dreaming","Power & Control","Living Dead","Teen Idle","Valley of the Dolls","Hypocrates","Fear and Loathing","Radioactive","Sex Yeah","Lonely Hearts Club","Buy the Stars"]
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

        song.remove();
        document.getElementById("averageAlert").innerHTML = toLetterGrade();
        

      } else {

        var div = document.getElementById("left");
        var node = document.createElement("A");

        node.className = "nav-link active";
        node.style.cursor = "pointer";
        node.id = song.innerHTML;
        node.innerHTML = song.innerHTML
        div.appendChild(node);
        
        song.remove();
        document.getElementById("averageAlert").innerHTML = toLetterGrade();
      
  
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
  var songTabs = document.querySelectorAll(".nav-link");
  var grade = 0;
  var count = 0;

  for (var i = 0; i < songTabs.length; i++){
    if (!(songTabs[i].parentElement.id == "left")){
      grade += colorGrades[songTabs[i].parentElement.id];
      count += 1;
    }
  }

  if (count == 0){
    return 0;
  }
  return grade / count;
}

function toLetterGrade(){
  const userGrade = computeGrade();

  if (userGrade == 0){
    return "";
  }

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
