"use strict";

const playNpauseBtn = document.querySelector("#play-pause");
const video = document.querySelector("video");

function playNpauseFn() {
  video.paused ? video.play() : video.pause();
}

function updatePlayNPauseIcon() {
  
}