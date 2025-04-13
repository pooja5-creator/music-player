import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShimmerEffect from "./ShimmerEffect";
import { motion } from "framer-motion";

const MusicList = ({
  songs,
  formatDuration,
  onSelectSong,
  searchTerm,
  setSearchTerm,
  favourites,
  recentPlays,
  setShowSideBar,
  loading,
  selectedSong,
}) => {
  const location = useLocation();
  const [mainSong, setMainSong] = useState([]);
  const [MainTitle, setMainTitle] = useState("");
  const [ShowSearch, setShowSearch] = useState(false);

  const currentRoute = location.pathname.split("/")[1];

  useEffect(() => {
    let title = "";
    let songList = [];
    let showSearchBox = false;

    switch (currentRoute) {
      case "":
        title = "For You";
        songList = songs;
        showSearchBox = true;
        break;
      case "favourites":
        title = "Favourites";
        songList = favourites;
        break;
      case "recently-played":
        title = "Recently Played";
        songList = recentPlays;
        break;
      case "top-tracks":
        title = "Top Tracks";
        songList = songs;
        break;
      default:
        title = "For You";
        songList = songs;
        showSearchBox = true;
        break;
    }

    setMainTitle(title);
    setMainSong(songList);
    setShowSearch(showSearchBox);
  }, [currentRoute, songs, favourites, recentPlays]);

  return (
    <div className="music-list-container">
      <div className="topBar">
        <span
          onClick={() => {
            setShowSideBar(true);
          }}
          className="menuIcon"
        >
          <i className="fa-solid fa-bars"></i>
        </span>
        <h1>{MainTitle}</h1>
      </div>
      {ShowSearch && (
        <div className="Search-Box">
          <input
            type="text"
            placeholder="Search Song, Artist"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span>
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>
      )}
      {loading ? (
        <ShimmerEffect />
      ) : mainSong.length === 0 ? (
        <div className="no-songs-message">
          <p
            style={{
              fontSize: "23px",
              fontWeight: "500",
              color: "white",
              margin: "0",
            }}
          >
            No song here !
          </p>
        </div>
      ) : (
        <div
          className={`listContainer`}
          style={{ paddingBlock: ShowSearch ? "10px" : "0px" }}
        >
          {mainSong.map((item, index) => {
            const isSelected = selectedSong === item.id - 1;
            return (
              <motion.div
                className={`MusicListBox ${isSelected ? "selected" : ""}`}
                key={index}
                onClick={() => onSelectSong(item.id - 1)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="box">
                  <div className="ImgContainer">
                    <img className="img" src={item.thumbnail} alt="" />
                  </div>
                  <div className="SongNames">
                    <h1>{item.title}</h1>
                    <p className="artistName">{item.artistName}</p>
                  </div>
                </div>
                <h1 className="timer">{formatDuration(item.duration)}</h1>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(MusicList);
