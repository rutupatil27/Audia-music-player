let audio= document.querySelector('.audio');
let playBtn= document.querySelector('.play');
let pauseBtn= document.querySelector('.pause');
let musicBar= document.querySelector('.musicbar');
let prevBtn= document.querySelector('.prev');
let nextBtn= document.querySelector('.next');
let slider= document.querySelector('.musicbar');
let title= document.querySelector('.trackinfo h1');
let artist= document.querySelector('.trackinfo h3');
let img= document.querySelector('.song-cover img');
let currTime= document.querySelector('.curr');
let durTime= document.querySelector('.duration');
let songItems = document.querySelectorAll('.songitem');

let songs = [
  { title: "Song 1", artist: "Artist 1", src: "./Music/audio1.mp3", cover: "./Imgs/Track1.jpg" },
  { title: "Song 2", artist: "Artist 2", src: "./Music/audio2.mp3", cover: "./Imgs/Track2.jpg" },
  { title: "Song 3", artist: "Artist 3", src: "./Music/audio3.mp3", cover: "./Imgs/Track3.jpg" },
  { title: "Song 4", artist: "Artist 4", src: "./Music/audio4.mp3", cover: "./Imgs/Track4.jpg" },
  { title: "Song 5", artist: "Artist 5", src: "./Music/audio5.mp3", cover: "./Imgs/Track5.jpg" }
];

let currentSongIndex = 0;

function play(){
    audio.play();
    playBtn.style.display="none";
    pauseBtn.style.display="inline-block";    
}

function pause(){
    audio.pause();
    pauseBtn.style.display="none";
    playBtn.style.display="inline-block";
}

playBtn.addEventListener('click',play);
pauseBtn.addEventListener('click',pause);

audio.addEventListener('timeupdate',()=>{
    let currentTime= audio.currentTime;
    let duration= audio.duration||1;
    let progress= (currentTime/duration)*100;
    durTime.textContent = duration ? Math.floor(duration / 60) + ":" + ("0" + Math.floor(duration % 60)).slice(-2) : "0:00";
    currTime.textContent = Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2);
    musicBar.value = progress;
    slider.style.background = `linear-gradient(to right, #000000e7 ${progress}%, #444 ${progress}%)`;
    if(progress === 100){
        nextBtn.click();
    }
});

slider.addEventListener('input',function(){
    let value= this.value;
    musicBar.value = value;
    audio.currentTime = (value / 100) * audio.duration;
    this.style.background = `linear-gradient(to right, #000000e7 ${value}%, #444 ${value}%)`;
});

function loadSong(index){
    let song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    img.src = song.cover;
}

nextBtn.addEventListener('click',()=>{
    currentSongIndex++;
    if(currentSongIndex >= songs.length){
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    play();
    activeSong();
});

prevBtn.addEventListener('click',()=>{
    currentSongIndex--;
    if(currentSongIndex < 0){
        currentSongIndex = songs.length - 1;
    }
    loadSong(currentSongIndex);
    play();
    activeSong();
});

songItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        play();   
        activeSong();          
    });
});

function activeSong(){
    songItems.forEach((item, index) => {
        item.classList.remove('selected');
        if(index === currentSongIndex){
            item.classList.add('selected');
        }
    });
}