console.log("Welcome to Spotify");

// Initialize the values
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Bad Habbits - Ed Sheeran", filepath: "songs/1.mp3", coverPath: "covers/1.png" },
    { songName: "Shivers - Ed Sheeran", filepath: "songs/2.mp3", coverPath: "covers/2.png" },
    { songName: "You For Me - Rita Ora", filepath: "songs/3.mp3", coverPath: "covers/3.png" },
    { songName: "You Are In Love - Taylor Swift", filepath: "songs/4.mp3", coverPath: "covers/4.png" },
    { songName: "Wont Let You Go - Martin Garrix", filepath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Lush Life - Zara Larsson", filepath: "songs/6.mp3", coverPath: "covers/6.jpeg" },
    { songName: "Night Changes - One Direction", filepath: "songs/7.mp3", coverPath: "covers/7.jpeg" },
    { songName: "Attention - Charlie Puth", filepath: "songs/8.mp3", coverPath: "covers/8.png" },
    { songName: "Dance Monkey - Tones and I", filepath: "songs/9.mp3", coverPath: "covers/9.jpeg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Handle play/pause click
masterPlay.addEventListener('click', function () {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }

    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', function () {
    console.log('timeupdate');

    // Update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', function () {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('previous').addEventListener('click', function () {
    if (songIndex <= 0)
    songIndex = 0;
    else 
    songIndex--;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('next').addEventListener('click', function () {
    if (songIndex >= 8) 
    songIndex = 0;
    else 
    songIndex++;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})
