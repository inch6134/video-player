"use strict";

// HTML references
const playNpauseBtn = document.querySelector("#play-pause");
const video = document.querySelector("video");
const rewindBtn = document.querySelector("#rewind");
const fastForwardBtn = document.querySelector("#fast-forward");
const volumeBtn = document.querySelector("#volume");
const progressIndicator = document.querySelector("#progress-indicator");
const progressBar = document.querySelector("#progress-bar");


// functions

function playNpauseFn() {
  video.paused ? video.play() : video.pause();
}

function updatePlayNPauseIcon() {
  const icon = playNpauseBtn.querySelector("i");
  icon.textContent = "";

  icon.textContent = video.paused ? "play_arrow" : "paused";
}

function rewindNforwardFn(type) {
  video.currentTime += type === "rewind" ? -10 : 10;
}

function muteUnmute() {
  video.muted = video.muted ? false : true;
}

function updateVolumeIcon() {
  const icon = volumeBtn.querySelector("i");
  icon.textContent = "";
  icon.textContent = video.muted ? "volume_off" : "volume_up";
}

function updateProgress() {
  const progressPercentage = (video.currentTime / video.duration) * 100;

  progressIndicator.style.width = `${progressPercentage}%`;
}

function seekingFn(e) {
  const updatedTime = (e.offsetX / progressBar.offsetWidth) * video.duration;

  video.currentTime = updatedTime;
}

// event listeners

video.addEventListener("play", updatePlayNPauseIcon);
video.addEventListener("click", playNpauseFn);
video.addEventListener("pause", updatePlayNPauseIcon);
playNpauseBtn.addEventListener("click", playNpauseFn);

rewindBtn.addEventListener("click", () => rewindNforwardFn("rewind"));
fastForwardBtn.addEventListener("click", () => rewindNforwardFn("forward"));

video.addEventListener("volumechange", updateVolumeIcon);
volumeBtn.addEventListener("click", muteUnmute);

video.addEventListener("timeupdate", updateProgress);

let mouseDown = false;

progressBar.addEventListener("mousedown", () => {mouseDown = true;});
progressBar.addEventListener("mouseup", () => {mouseDown = false});
progressBar.addEventListener("click", seekingFn);
progressBar.addEventListener("mousemove", (e) => mouseDown && seekingFn);

window.addEventListener("keyup", (e) => {
  if (e.code === "Space") {
    playNpauseFn();
  } else if (e.code === "ArrowLeft") {
    rewindNforwardFn("rewind");
  } else if (e.code === "ArrowRight") {
    rewindNforwardFn("forward");
  } else {
    return;
  }
});