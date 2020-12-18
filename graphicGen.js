var fontsize;
var x;
var y;

const colors = {
    'a': "#33a532",
    'b': "#00ff33",
    'c': "#e1ad01",
    'd': "#f96f6f",
    'f': "#ce1313"
};


function computeFontSize(string, maxSize, increment) { // Changes the font-size of a string based on length.
    stringLength = string.split(" ").length;
    return maxSize - increment * stringLength;
}

function shortenString(string) { // Shortens strings that are too long to fit on the graphic.
    if (string.length <= 25) {
        return string;
    }
    string = string.split("").slice(0, 23);
    string = string.join("") + "...";
    return string;
}

function getGraphic(title, artist, year, songs) { // Generates the graphic for the album.
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const albumCover = document.getElementById("logo");

    canvas.width = 500;
    canvas.height = 500;

    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, 500, 500);

    ctx.drawImage(albumCover, 10, 10, 480, 480);

    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(10, 10, 480, 480);

    fontsize = computeFontSize(title, 50, 4)
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.rect(214, 150, 60, 60);
    ctx.closePath();
    ctx.stroke();

    ctx.font = "bold 30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(document.getElementById("averageAlert").textContent, 244, 200);

    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Rating:", 244, 170);

    if (fontsize > 15 && title.length < 30) {
        ctx.font = "bold " + fontsize.toString() + "px Arial";

        ctx.fillText(title, 250, 90);
    } else {
        if (title.split(" ").length > 1) {
            title = title.split(" ").slice(0, 4)
            title = title.join(" ") + "...";
        }

        ctx.font = "bold 15px Arial";
        ctx.fillText(title, 250, 60);
    }


    fontsize = computeFontSize(artist, 30, 3)
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    if (fontsize > 10 && artist.length < 30) {
        ctx.font = "bold " + fontsize.toString() + "px Arial";
        ctx.fillText(artist + " (" + year.toString() + ")", 250, 140);
    } else {
        artist = artist.split(" ").slice(0, 3)
        artist = artist.join(" ") + "..."

        ctx.font = "bold 10px Arial";
        ctx.fillText(artist + " (" + year.toString() + ")", 250, 150);
    }

    ctx.font = "bolder 20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    if (Object.keys(songs).length == 1) {
        ctx.fillText("Featured Tracks", 250, 230);
    } else {
        ctx.fillText("Best Tracks", 135, 230);
        ctx.fillText("Worst Tracks", 360, 230);
    }

    ctx.font = "bold 40px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("tracktiers.com", 250, 460);
    for (var i = 0; i < Object.keys(songs).length; i++) {
        grade = Object.keys(songs)[i];
        for (var j = 0; j < songs[grade].length; j++) {
            if (i == 0) {
                x = 30;
                y = 250 + 60 * j;

                ctx.fillStyle = colors[grade];
                ctx.fillRect(x, y, 210, 50);

                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.font = "bold 15px Arial";
                ctx.fillText(shortenString(songs[grade][j]), 135, y + 30)
            } else {
                x = 255;
                y = 250 + 60 * j;

                ctx.fillStyle = colors[grade];
                ctx.fillRect(x, y, 210, 50);

                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.font = "bold 15px Arial";
                ctx.fillText(shortenString(songs[grade][j]), 360, y + 30)
            }
            ctx.font = "bold 12px Arial";
            ctx.fillText(grade.toUpperCase(), x + 8, y + 15);
        }
    }

    const dataURL = canvas.toDataURL();
    document.getElementById("download-button").href = dataURL;
    document.getElementById("download-button").download = "tracktiers.png";
}
