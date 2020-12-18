const colorGrades = {
    "a": 5,
    "b": 4,
    "c": 3,
    "d": 2,
    "f": 1
};

const grades = ["a", "b", "c", "d", "f"];

var hasChosen = false;
var tierColor = "a";
var data;
var userGrades = [];
var userNumber;
var isEmpty;

const randomButton = document.getElementById("random-button");
const rightSide = document.getElementById("right");

const button = document.getElementById("user-form");

function randomInteger(maximum) {
    return Math.round(Math.random() * (maximum));
}

function brightenTier(tierId) {
    // Brightens a tier when a user clicks on it.
    const tiers = document.getElementsByClassName("tier");
    for (var i = 0; i < tiers.length; i++) {
        if (tierId == tiers[i].id) {
          // If clicked, make the tier brighter.
            document.getElementById(tiers[i].id).style.filter = "grayscale(150%)";
        } else {
          // Bring it back to normal.
            document.getElementById(tiers[i].id).style.filter = "grayscale(0%)";
        }
    }
}

function initializeTiers() {
    // Creates the tiers.
    const rightDiv = document.getElementById("right");
    const alerts = document.getElementById("alert-messages");

    tierNames = ["a", "b", "c", "d", "f"];

    for (var i = 0; i < tierNames.length; i++) {
        const tier = document.createElement("DIV");

        tier.className = "tier";
        tier.id = tierNames[i];

        tier.textContent = tierNames[i].toUpperCase();

        rightDiv.appendChild(tier);
    }

    const tiers = document.querySelectorAll(".tier");

    tiers.forEach(tier => {
        tier.addEventListener("click", function() {
            tierColor = tier.id;
            brightenTier(tierColor);
        })
    })

    const bottomContainer = document.createElement("DIV");
    bottomContainer.className = "bottom-container";
    const average = document.createElement("DIV");
    const downloadButton = document.createElement("A");
    const downloadIcon = document.createElement("i");

    downloadIcon.className = "fas fa-download";
    downloadButton.className = "download";
    downloadButton.id = "download-button";
    average.className = "average";
    average.id = "averageAlert";

    downloadButton.appendChild(downloadIcon);
    bottomContainer.append(average);
    bottomContainer.append(downloadButton);
    rightDiv.append(bottomContainer);

    alterDownload(); // The download button cannot be clicked at this point.
}

function createEventListeners() {
    // When an album tab is clicked, it triggers an event.
    const songTabs = document.querySelectorAll(".nav-link");
    songTabs.forEach(song => {
        song.addEventListener("click", function() {
            if (song.parentElement.id == "left") {

                const div = document.getElementById(tierColor);
                const node = document.createElement("A");
                node.className = "nav-link active";
                node.style.cursor = "pointer";
                node.id = song.textContent;
                node.textContent = song.textContent;
                div.appendChild(node);

                song.remove();
                document.getElementById("averageAlert").textContent = toLetterGrade();
                alterDownload();
            } else {

                const div = document.getElementById("left");
                const node = document.createElement("A");

                node.className = "nav-link active";
                node.style.cursor = "pointer";
                node.id = song.textContent;
                node.textContent = song.textContent;
                div.appendChild(node);

                song.remove();
                document.getElementById("averageAlert").textContent = toLetterGrade();
                alterDownload();
            }
            createEventListeners(); // Adds the event listener to the newest track.
        })
    })
}

function createAlert(alertMessage) {
    removeAlerts();
    alertMessages = document.getElementsByClassName("alert alert-dismissible alert-primary");
    if (alertMessages.length == 0) {
        const div = document.getElementById("alert-messages");
        const node = document.createElement("DIV");
        node.className = "alert alert-dismissible alert-primary";
        node.style.transform = "translateX(28px)";

        node.textContent = alertMessage;

        div.appendChild(node);
    }
}

function computeGrade() {
    const songTabs = document.querySelectorAll(".nav-link");
    var grade = 0;
    var count = 0;

    for (var i = 0; i < songTabs.length; i++) {
        if (!(songTabs[i].parentElement.id == "left")) {
            grade += colorGrades[songTabs[i].parentElement.id];
            count += 1;
        }
    }

    if (count == 0) {
        return 0;
    }
    return grade / count;
}

function alterDownload() {
    /*
    Makes it so that nothing is downloaded if the tiers have no songs in them.
    */
    if (document.getElementById("right").querySelectorAll(".nav-link").length > 0) {
        document.getElementById("download-button").style.cursor = "pointer";
        document.getElementById("download-button").style.opacity = "0.8";
        isEmpty = false;
    } else {
        document.getElementById("download-button").style.cursor = "default";
        document.getElementById("download-button").style.opacity = "0.6";

        document.getElementById("download-button").removeAttribute("href");
        document.getElementById("download-button").removeAttribute("download");

        isEmpty = true;
    }
}

function toLetterGrade() {
    const userGrade = computeGrade();

    if (userGrade == 0) { // If there are no songs rated, the grade is empty.
        return "";
    }

    if (userGrade <= 5 && userGrade > (14 / 3)) {
        return "A+";
    } else if (userGrade <= (14 / 3) && userGrade > (13 / 3)) {
        return "A";
    } else if (userGrade <= (13 / 3) && userGrade > (4)) {
        return "A-";
    } else if (userGrade <= (4) && userGrade > (11 / 3)) {
        return "B+";
    } else if (userGrade <= (11 / 3) && userGrade > (10 / 3)) {
        return "B";
    } else if (userGrade <= (10 / 3) && userGrade > (3)) {
        return "B-";
    } else if (userGrade <= (3) && userGrade > (8 / 3)) {
        return "C+";
    } else if (userGrade <= (8 / 3) && userGrade > (7 / 3)) {
        return "C";
    } else if (userGrade <= (7 / 3) && userGrade > (2)) {
        return "C-";
    } else if (userGrade <= (2) && userGrade > (5 / 3)) {
        return "D+";
    } else if (userGrade <= (5 / 3) && userGrade > (4 / 3)) {
        return "D";
    } else if (userGrade <= (4 / 3) && userGrade > (1)) {
        return "D-";
    }
    return "F";
}


function removeAlerts() {
    const alertMessages = document.getElementsByClassName("alert alert-dismissible alert-primary");
    const albumTabs = document.querySelectorAll(".card");

    for (var i = 0; i < alertMessages.length; i++) {
        alertMessages[i].remove();
    }
    for (var i = 0; i < albumTabs.length; i++) {
        albumTabs[i].remove();
    }
}

userGrades.push([
    1054069,
    1549409,
    164713,
    1521232,
    447151,
    332127590
]);

function displayAlbum(array) {
    // Displays the tracks of an album and adds event listeners to the tracks.
    removeAlerts();
    hasChosen = true;
    for (var i = 0; i < array.length; i++) {
        const div = document.getElementById("left");
        const node = document.createElement("A");

        node.className = "nav-link active";
        node.style.cursor = "pointer";
        node.id = array[i];
        node.innerHTML = array[i];
        div.appendChild(node);
    }
    initializeTiers();
    createEventListeners();

    document.getElementById("download-button").addEventListener("click", function() {
        if (!isEmpty) {
            getGraphic(data.name, data.artists[0], data.year, getFeaturedTracks(['a', 'b', 'c', 'd', 'f']));
        }
    })
}


function firstNElements(array, maxLength) {
    if (array.length > maxLength) {
        return array.slice(0, maxLength);
    }
    return array;
}

function f() {
  userGrades[0] = userGrades[0].map(x => x-5);
  userGrades[1] = userGrades[1].map(x => x-5);
}
function getTracks() {
    // Returns rated tracks separated into their respective grades.
    const tracks = {
        "a": [],
        "b": [],
        "c": [],
        "d": [],
        "f": []
    };

    var empties = 0;
    for (var i = 0; i < grades.length; i++) {
        songs = document.getElementById(grades[i]).querySelectorAll(".nav-link");

        if (songs.length == 0) {
            empties += 1;
        }
        for (var j = 0; j < songs.length; j++) {
            tracks[grades[i]].push(songs[j].textContent);
        }
    }
    if (empties == 5) {
        return null;
    }
    return tracks;
}

function getFeaturedTracks(x) {
    // Computes featured tracks.

    const tabs = getTracks();
    if (tabs == null) {
        return null;
    }
    if (x.length == 1) {
        return {[x[0]]: firstNElements(tabs[x[0]], 3)};
    }

    if (tabs[x[0]].length == 0) { // If a grade contains no tracks, move on to the next grade.
        return getFeaturedTracks(x.slice(1, x.length));
    } else if (tabs[x[x.length - 1]].length == 0) {
        return getFeaturedTracks(x.slice(0, x.length - 1))
    }
    return {[x[0]]: firstNElements(tabs[x[0]], 3),[x[x.length - 1]]: firstNElements(tabs[x[x.length - 1]], 3)}
}

userGrades.push([
  67532730,
  139391,
  2953,
  3119782,
  150406,
  40913558,
  176488
]);

function clearAlbum() {
    // Removes all HTML elements in case the user searches for something new.
    removeAlerts();

    const songTabs = document.querySelectorAll(".nav-link");
    const tiers = document.querySelectorAll(".tier");
    const albumCover = document.getElementById("albumCover");

    const alert = document.getElementById("averageAlert");
    const download = document.getElementById("download-button");
    for (var i = 0; i < songTabs.length; i++) {
        songTabs[i].remove();
    }
    for (var i = 0; i < tiers.length; i++) {
        tiers[i].remove();
    }
    if (alert != null) {
        alert.remove();
    }
    if (download != null) {
        download.remove();
    }
    if (albumCover != null) {
        albumCover.remove();
    }
}
// Event Listeners

f();
function convertString(string) {
    var newString = "";
    for (var i = 0; i < string.length; i++) {
        if (string[i] != " ") {
            newString += string[i];
        } else {
            newString += "+";
        }
    }
    return newString;
}

const presearch = async () => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(userGrades[1].map(x => x.toString(23)).join('') + ':' + userGrades[0].map(x => x.toString(18)).join(''))
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}
const searchForItem = async (token, name) => {
    // Searches for items.
    const result = await fetch("https://api.spotify.com/v1/search?q=" + name + "&type=album&limit=5", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    var albums = []
    const data = await result.json();
    for (var i = 0; i < data.albums.items.length; i++) {
        if (data.albums.items[i].album_type != 'single') {
            albums.push({
                'name': data.albums.items[i].name,
                'id': data.albums.items[i].id,
                'artist': data.albums.items[i].artists[0].name,
                'year': data.albums.items[i]["release_date"].split("-")[0]
            });
        }
    }
    if (albums.length == 0) {
        return null;
    }
    return firstNElements(albums, 3);
}
const getAlbumTracks = async (token, id) => {
    // Returns the tracks of an album.
    const result = await fetch("https://api.spotify.com/v1/albums/" + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await result.json();
    var songs = [];
    var artists = [];
    for (var i = 0; i < data.tracks.items.length; i++) {
        songs.push(data.tracks.items[i].name);
    }
    for (var i = 0; i < data.artists.length; i++) {
        artists.push(data.artists[i].name);
    }
    return {
        "songs": songs,
        "artists": artists,
        "name": data.name,
        "image-source": data.images[0].url,
        "year": data.release_date.split("-")[0]
    };
}
const getRandomAlbum = async (token) => {
    // Returns a random album from Spotify's newest releases.
    const result = await fetch("https://api.spotify.com/v1/browse/new-releases?limit=40", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    const data = await result.json();
    albums = data.albums.items;
    filterAlbums = [];

    for (var i = 0; i < albums.length; i++) {
        if (albums[i].total_tracks > 1) {
            filterAlbums.push(albums[i]);
        }
    }
    if (filterAlbums.length > 0) {
        return filterAlbums[randomInteger(filterAlbums.length - 1)].id;
    }
    return albums[randomInteger(albums.length - 1)].id;
}

function createAlbumTab(album) {
    const div = document.getElementById("alert-messages");
    const element = document.createElement("DIV");

    element.className = "card text-white bg-secondary mb-3";
    element.style.cursor = "pointer";
    element.id = album.id;

    const tabBody = document.createElement("DIV");
    tabBody.className = "card-body";

    const title = document.createElement("H4");
    title.className = "card-title";
    title.textContent = album.name;

    const artist = document.createElement("P");
    artist.className = "card-text";

    artist.textContent = album.artist + ", " + album.year;

    tabBody.appendChild(title);
    tabBody.appendChild(artist);

    element.appendChild(tabBody)
    div.appendChild(element);
}

function addImage(imageSource) {
    const div = document.getElementById("right");
    const image = document.createElement("IMG");

    image.id = "albumCover";
    image.style.width = "250px";
    image.style.height = "250px";
    image.style.transform = "translate(30px,10px)";
    image.style.animation = "appear 1s";
    image.src = imageSource;
    div.appendChild(image);
}

function albumEvent(albumId) {
    // Handles everything to display the album given its id.
    presearch().then(function(token) {
        getAlbumTracks(token, albumId).then(function(albumData) {
            if (hasChosen) {
                clearAlbum();
            }
            data = albumData;
            displayAlbum(albumData.songs);
            if (albumData.artists.length > 1) {
                createAlert("You have chosen " + albumData.name + " by " + albumData.artists[0] + " and more.");
            } else {
                createAlert("You have chosen " + albumData.name + " by " + albumData.artists[0] + ".");
            }
            addImage(albumData["image-source"])
        })
    })
}

randomButton.addEventListener("click", function() {
    presearch().then(function(token) {
        getRandomAlbum(token).then(function(albumId) {
            clearAlbum();
            albumEvent(albumId);
        })
    })
})

document.getElementById("search-button").addEventListener("click", function() {
    // Handles user searches.
    const album_name = document.getElementById("user-form").value;
    if (album_name.length != 0) {
        presearch().then(function(token) {
            searchForItem(token, convertString(album_name)).then(function(albums) {
                if (albums.length == 0) {
                    createAlert("Album Not Found.");
                } else {
                    clearAlbum();
                    for (var i = 0; i < albums.length; i++) {
                        createAlbumTab(albums[i]);
                    }
                    var albums = document.querySelectorAll(".card");
                    albums.forEach(album => {
                        album.addEventListener("click", function() {
                            albumEvent(album.id);
                        })
                    })
                }
            });
        });
    }
})

