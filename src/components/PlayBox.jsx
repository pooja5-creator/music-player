import React, { useEffect, useRef, useState } from "react";
import PlayBoxShimmerEffect from "./PlayBoxShimmerEffect";
import { motion, AnimatePresence } from "framer-motion";
const PlayBox = ({
  song,
  formatDuration,
  isPlaying,
  toggleSong,
  nextSong,
  prevSong,
  favourites,
  setFavourites,
  loading,
}) => {
  const audioRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolumeBar, setShowVolumeBar] = useState(false);
  const [showFavorite, setShowFavorite] = useState(false);
  const [showPlayBox, setShowPlayBox] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", updateTime);

    const handlePlay = async () => {
      try {
        await audio.pause();
        audio.currentTime = 0;
        if (isPlaying) {
          await audio.play();
        }
      } catch (err) {
        console.warn("Audio play error:", err);
      }
    };

    handlePlay();

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [isPlaying, song]);

  const progressPercent = (currentTime / song.duration) * 100;

  const handleSeek = (e) => {
    const line = e.currentTarget;
    const rect = line.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    const newTime = percent * song.duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const line = e.currentTarget;
    const rect = line.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.min(Math.max(clickX / rect.width, 0), 1);
    setVolume(percent);
  };

  const volumePercent = volume * 100;
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const isFavourite = favourites.some((favSong) => favSong.id === song.id);

  const toggleFavourite = () => {
    if (isFavourite) {
      setFavourites(favourites.filter((favSong) => favSong.id !== song.id));
    } else {
      setFavourites([...favourites, song]);
    }
  };

  return (
    <div className="mainPlayContainer">
      <div className={`smallPlayBox ${loading ? "showLoadingEffect" : ""}`}>
        <div className={`MusicBanner `}>
          <div className="ImgContainer">
            <img src={song.thumbnail} alt="" />
          </div>
          <div className="MusicTitle">
            <h1>{song.title}</h1>
            <p>{song.artistName}</p>
          </div>
        </div>
        <div className="rightSideBtns">
          <span className="mainPlayBtn" onClick={toggleSong}>
            <i className={`fa-solid fa-${isPlaying ? "pause" : "play"}`}></i>
          </span>
          <span
            className="upperArrow"
            onClick={() => setShowPlayBox(!showPlayBox)}
          >
            <i
              className={`fa-solid fa-angle-${showPlayBox ? "down" : "up"}`}
            ></i>
          </span>
        </div>
      </div>
      {loading ? (
        <PlayBoxShimmerEffect />
      ) : (
        <motion.div
          className={`playBoxContainer ${showPlayBox ? "playActive" : ""}`}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4 }}
        >
          <div className="MusicName">
            <h1>{song.title}</h1>
            <p>{song.artistName}</p>
          </div>
          <div className="thumbnailBox">
            <img src={song.thumbnail} alt="" />
          </div>

          <audio ref={audioRef} src={song.musicUrl} />

          <div className="controls">
            <div className="musicLineRectangle" onClick={handleSeek}>
              <div
                className="innerBox"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="timerText">
              <span>{formatDuration(Math.floor(currentTime))}</span>
              <span>{formatDuration(song.duration)}</span>
            </div>
            {/* playBtns */}
            <div className="MusicPlayBtns">
              <div className="threeDotContainer">
                <div
                  className="menuBtn"
                  onClick={() => setShowFavorite(!showFavorite)}
                >
                  <span>
                    <i className="fa-solid fa-ellipsis"></i>
                  </span>
                </div>
                {showFavorite && (
                  <motion.div
                    className="favPopup"
                    onClick={toggleFavourite}
                    initial={{ opacity: 0, scale: 0.5, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <span className="fav">
                      <i
                        className={`fa-${
                          isFavourite ? "solid" : "regular"
                        } fa-heart`}
                      ></i>
                    </span>
                  </motion.div>
                )}
              </div>
              <div className="playBtn">
                <span onClick={prevSong}>
                  <i className="fa-solid fa-backward"></i>
                </span>
                <span className="mainPlayBtn" onClick={toggleSong}>
                  <i
                    className={`fa-solid fa-${isPlaying ? "pause" : "play"}`}
                  ></i>
                </span>
                <span onClick={nextSong}>
                  <i className="fa-solid fa-forward"></i>
                </span>
              </div>
              <div className="volumeControl">
                <div
                  className="volumeBtn"
                  onClick={() => setShowVolumeBar(!showVolumeBar)}
                >
                  <i className="fa-solid fa-volume-high"></i>
                </div>

                <AnimatePresence>
                  {showVolumeBar && (
                    <motion.div
                      className="volumePopup"
                      initial={{ opacity: 0, scale: 0.5, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.5, x: -10 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="volumeBar" onClick={handleVolumeChange}>
                        <div
                          className="innerVolume"
                          style={{ width: `${volumePercent}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default React.memo(PlayBox);
