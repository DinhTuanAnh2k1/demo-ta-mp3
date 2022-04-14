const song = document.getElementById("song");
const playBtn = document.querySelector(".player-inner");
const nextBtn = document.querySelector(".play-forward");
const prevBtn = document.querySelector(".play-back");
const durationTime = document.querySelector(".duration");
const remainingTime = document.querySelector(".remaining");
const rangeBar = document.querySelector(".range");
const musicName = document.querySelector(".music-name");
const musicThumbnail = document.querySelector(".music-thumb");
const musicImage = document.querySelector(".music-thumb img");
const playRepeat = document.querySelector(".play-repeat");

let isPlaying = true;
let indexSong = 0;
let isRepeat = false;
// const musics = ["holo.mp3", "summer.mp3", "spark.mp3", "home.mp3"];
const musics = [{
        id: 1,
        title: "Người Lạ Thoáng Qua",
        file: "Người Lạ Thoáng Qua.mp3",
        image: "./img/hinh1.jpg",
    },
    {
        id: 2,
        title: "Đoạn Tuyệt Nàng Đi",
        file: "Đoạn tuyệt nàng đi.mp3",
        image: "./img/hinh2.jpg",
    },
    {
        id: 3,
        title: "Tìm Được Nhau Khó Thế Nào",
        file: "Tìm Được Nhau Khó Thế Nào.mp3",
        image: "./img/hinh3.jpg",
    },
    {
        id: 4,
        title: "Sao Cũng Được",
        file: "Sao Cũng Được.mp3",
        image: "./img/hinh4.jpg",
    },
    {
        id: 5,
        title: "Vui Lắm Nha",
        file: "Vui Lắm Nha.mp3",
        image: "./img/hinh1.jpg",
    },
    {
        id: 6,
        title: "Từ Chối Nhẹ Nhàng Thôi",
        file: "Từ Chối Nhẹ Nhàng Thôi.mp3",
        image: "./img/hinh2.jpg",
    },
    {
        id: 7,
        title: "Người Lạ Từng Thương",
        file: "Người Lạ Từng Thương.mp3",
        image: "./img/hinh3.jpg",
    },
    {
        id: 8,
        title: "Mr.Siro Piano",
        file: "Mr Siro Piano.mp3",
        image: "./img/hinh4.jpg",
    },
    {
        id: 9,
        title: "Em Muốn Ta Là Gì",
        file: "Em Muốn Ta Là Gì.mp3",
        image: "./img/hinh1.jpg",
    },
    {
        id: 10,
        title: "Đường Tôi Chở Em Về",
        file: "Đường Tôi Chở Em Về.mp3",
        image: "./img/hinh2.jpg",
    },
    {
        id: 11,
        title: "Đau Ở Đây Này",
        file: "Đau Ở Đây Này.mp3",
        image: "./img/hinh3.jpg",
    },
    {
        id: 12,
        title: "Chiều Thu Họa Bóng Nàng",
        file: "Chiều Thu Họa Bóng Nàng.mp3",
        image: "./img/hinh4.jpg",
    },
    {
        id: 13,
        title: "Chỉ Là Muốn Nói",
        file: "Chỉ Là Muốn Nói.mp3",
        image: "./img/hinh1.jpg",
    },
    {
        id: 14,
        title: "Back To Hometown",
        file: "Back To Hometown.mp3",
        image: "./img/hinh2.jpg",
    }
];
/**
 * Music
 * id: 1
 * title: Holo
 * file: holo.mp3 
 * image: unsplash
 */
let timer;
let repeatCount = 0;
playRepeat.addEventListener("click", function() {
    if (isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute("style");
    } else {
        isRepeat = true;
        playRepeat.style.color = "#ffb86c";
    }
});
nextBtn.addEventListener("click", function() {
    changeSong(1);
});
prevBtn.addEventListener("click", function() {
    changeSong(-1);
});
song.addEventListener("ended", handleEndedSong);

function handleEndedSong() {
    repeatCount++;
    if (isRepeat && repeatCount === 1) {
        // handle repeat song
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }
}

function changeSong(dir) {
    if (dir === 1) {
        // next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    } else if (dir === -1) {
        // prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    init(indexSong);
    // song.setAttribute("src", `./music/${musics[indexSong].file}`);
    playPause();
}
playBtn.addEventListener("click", playPause);

function playPause() {
    if (isPlaying) {
        musicThumbnail.classList.add("is-playing");
        song.play();
        playBtn.innerHTML = `<ion-icon name="pause-circle"></ion-icon>`;
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    } else {
        musicThumbnail.classList.remove("is-playing");
        song.pause();
        playBtn.innerHTML = `<ion-icon name="play"></ion-icon>`;
        isPlaying = true;
        clearInterval(timer);
    }
}

function displayTimer() {
    const { duration, currentTime } = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = "00:00";
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}

function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
}
rangeBar.addEventListener("change", handleChangeBar);

function handleChangeBar() {
    song.currentTime = rangeBar.value;
}

function init(indexSong) {
    song.setAttribute("src", `./music/${musics[indexSong].file}`);
    musicImage.setAttribute("src", musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
}
displayTimer();
init(indexSong);