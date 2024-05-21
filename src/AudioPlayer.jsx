// src/AudioPlayer.js

import React, { useRef } from "react";
import "./AudioPlayer.css";
const AudioPlayer = ({ src, title }) => {
  const audioRef = useRef(null);
  setTimeout(() => {
    document.body.addEventListener("mousemove", function () {
      audioRef.current.play();
    });
  }, 100);

  const playPauseAudio = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="audio-player">
      <h3>{title}</h3>
      <audio ref={audioRef} src={src}></audio>
      <button onClick={playPauseAudio} className="play-pause-button">
        Play/Pause
      </button>
    </div>
  );
};

export default AudioPlayer;
