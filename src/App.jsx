import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './styles/App.scss'
import './styles/Theme.scss'
import './styles/MusicPlayBox.scss'
import './styles/SongList.scss'
import SideBar from './components/SideBar'
import MusicList from './components/MusicList'
import PlayBox from './components/PlayBox'
import songs from '/src/data.js'
import { getThemeClass } from './components/ThemeFunction'
import './styles/Shimmer.scss'
import './styles/PlayBoxShimmer.scss'


export default function App() {
  const [showSideBar,setShowSideBar]=useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState(0);


  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = localStorage.getItem('favourites')
    return storedFavourites ? JSON.parse(storedFavourites) : []
  })
  const [recentPlays, setRecentPlays] = useState(() => {
    const stored = sessionStorage.getItem('recentPlays')
    return stored ? JSON.parse(stored) : []
  })
  
   const themeClass = getThemeClass(currentSong.title);

  const formatDuration = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
  }, []);
  
 
  const toggleSong = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const nextSong = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % songs.length;
      const selectedSong = songs[newIndex];
      setRecentPlays((prev) => {
        const filtered = prev.filter(s => s.id !== selectedSong.id);
        return [...filtered, selectedSong].slice(-10);
      });
      return newIndex;
    });
  };
  const prevSong = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + songs.length) % songs.length;
      const selectedSong = songs[newIndex];
      setRecentPlays((prev) => {
        const filtered = prev.filter(s => s.id !== selectedSong.id);
        return [...filtered, selectedSong].slice(-10);
      });
      return newIndex;
    });
  };

  const handleSelectSong = (songId) => {
    setCurrentIndex(songId);
    setIsPlaying(true); 
    setSelectedSong(songId)
  
    const selectedSong = songs.find(song => song.id === songId); 
    if (selectedSong) {
      setRecentPlays(prev => {
        const filtered = prev.filter(s => s.id !== selectedSong.id); // Fixed here
        return [...filtered, selectedSong].slice(-10); 
      });
    }
  };
  const filteredSongs = useMemo(() => {
    return songs.filter((song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, songs]);
  
  useEffect(() => {
    sessionStorage.setItem('recentPlays', JSON.stringify(recentPlays))
  }, [recentPlays])

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])
  
  useEffect(() => {
    setCurrentSong(songs[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, [])
  
  return (
    <div className={`main-container ${themeClass}`}>
      <SideBar showSideBar={showSideBar}
      setShowSideBar={setShowSideBar}
      />
      <MusicList
        songs={filteredSongs}
        formatDuration={formatDuration}
        onSelectSong={handleSelectSong}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        favourites={favourites}
        recentPlays={recentPlays}
        setShowSideBar={setShowSideBar}
        loading={loading}
        selectedSong={selectedSong}
      />

      <PlayBox
        isPlaying={isPlaying}
        toggleSong={toggleSong}
        formatDuration={formatDuration}
        nextSong={nextSong}
        prevSong={prevSong}
        song={currentSong}
        favourites={favourites}
        setFavourites={setFavourites}
        loading={loading}
      />
    </div>
  );
}
