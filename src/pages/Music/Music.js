import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MusicContainer, Header, SearchBar, MainContent, Section, Hero, SectionHeader, ContentGrid, Player, LoadingSpinner, Modal } from './MusicStyles';
import { FaHome, FaSearch, FaMusic, FaPlus, FaFire, FaClock, FaStar, FaChevronRight, FaHeart, FaStepBackward, FaPlay, FaPause, FaStepForward, FaVolumeUp, FaDownload, FaList } from 'react-icons/fa';

const API_BASE = 'https://jiosavs.vercel.app/api';

const Music = () => {
  // State and refs
  const [section, setSection] = useState('home');
  const [search, setSearch] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [results, setResults] = useState({
    trending: [],
    recent: [],
    recommendations: [],
    songs: [],
    playlists: []
  });
  const [loading, setLoading] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playQueue, setPlayQueue] = useState([]);
  const audioRef = useRef(new window.Audio());

  // Utility: get best image
  const getBestImageQuality = (images) => {
    if (!images || images.length === 0) return null;
    const qualityHierarchy = ['50x50', '150x150', '300x300', '500x500', 'large', 'high', 'medium', 'low'];
    const sorted = images.sort((a, b) => {
      const aIndex = qualityHierarchy.indexOf(a.quality || 'low');
      const bIndex = qualityHierarchy.indexOf(b.quality || 'low');
      if (aIndex !== -1 && bIndex !== -1) return bIndex - aIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return 0;
    });
    return sorted[0].url;
  };

  // Fetch featured content
  useEffect(() => {
    if (section === 'home') {
      setLoading(true);
      Promise.all([
        fetch(`${API_BASE}/search/songs?query=trending&page=0&limit=6`).then(r => r.json()),
        fetch(`${API_BASE}/search/songs?query=popular&page=0&limit=6`).then(r => r.json()),
        fetch(`${API_BASE}/search/songs?query=top+20&page=0&limit=6`).then(r => r.json()),
      ]).then(([trending, recent, recommendations]) => {
        setResults({
          trending: trending.data?.results || [],
          recent: recent.data?.results || [],
          recommendations: recommendations.data?.results || [],
        });
        console.log('Results:', {
          trending: trending.data?.results || [],
          recent: recent.data?.results || [],
          recommendations: recommendations.data?.results || [],
        });
      }).catch(error => {
        console.error('Error fetching data:', error);
        setResults({});
      }).finally(() => setLoading(false));
    }
  }, [section]);

  // Search
  const handleSearch = async () => {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/search/songs?query=${encodeURIComponent(search)}`);
      const data = await res.json();
      setResults({
        ...results,
        songs: data.data?.results || []
      });
      setSection('search');
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Play song
  const playSong = async (song) => {
    setLoading(true);
    let track = song;
    if (!song.downloadUrl) {
      const res = await fetch(`${API_BASE}/songs/${song.id}`);
      const data = await res.json();
      if (data.success && data.data.length > 0) track = data.data[0];
    }
    setCurrentTrack(track);
    setPlayerOpen(true);
    if (track.downloadUrl && track.downloadUrl.length > 0) {
      audioRef.current.src = track.downloadUrl[track.downloadUrl.length - 1].url;
      audioRef.current.play();
      setIsPlaying(true);
    }
    setLoading(false);
  };


  // Format time utility
  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Download song
  const downloadSong = async (song) => {
    try {
      let track = song;
      if (!song.downloadUrl) {
        const res = await fetch(`${API_BASE}/songs/${song.id}`);
        const data = await res.json();
        if (data.success && data.data.length > 0) track = data.data[0];
      }

      if (track.downloadUrl && track.downloadUrl.length > 0) {
        const downloadUrl = track.downloadUrl[track.downloadUrl.length - 1].url;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${track.name} - ${track.primaryArtists || track.singers}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('Download URL not available for this song');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download song');
    }
  };


  // Add to play next queue
  const addToPlayNext = (song) => {
    setPlayQueue(prev => [...prev, song]);
  };

  // Play next song from queue
  const playNextFromQueue = async () => {
    if (playQueue.length > 0) {
      const nextSong = playQueue[0];
      setPlayQueue(prev => prev.slice(1));
      await playSong(nextSong);
    }
  };

  // Event handlers with useCallback for proper dependency management
  const onPlay = useCallback(() => setIsPlaying(true), []);
  const onPause = useCallback(() => setIsPlaying(false), []);
  const onTimeUpdate = useCallback(() => setCurrentTime(audioRef.current.currentTime), []);
  const onLoadedMetadata = useCallback(() => setDuration(audioRef.current.duration), []);
  const onEnded = useCallback(() => {
    if (playQueue.length > 0) {
      playNextFromQueue();
    } else if (trackIndex < playlist.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setIsPlaying(false);
    }
  }, [playQueue.length, trackIndex, playlist.length]);

  // Player controls and time update
  useEffect(() => {
    const audio = audioRef.current;

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, [onPlay, onPause, onTimeUpdate, onLoadedMetadata, onEnded]);

  // UI
  return (
    <MusicContainer>
      {/* Header removed as it's already in the main App */}
      <SearchBar>
        <FaSearch className="search-icon" />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for songs, artists, albums..." />
        <button onClick={handleSearch}><FaChevronRight /></button>
      </SearchBar>
      <MainContent>
        {section === 'home' && (
          <Section>
            <Hero>
              <h2 className="hero-title">Discover Music</h2>
              <p className="hero-subtitle">Explore millions of songs from around the world</p>
            </Hero>
            <SectionHeader><FaFire /> Trending Now</SectionHeader>
            <ContentGrid>
              {results.trending?.map(song => (
                <div key={song.id} className="card">
                  <img src={getBestImageQuality(song.image) || '/placeholder.png'} alt={song.name} className="card-image" />
                  <div className="card-title">{song.name}</div>
                  <div className="card-subtitle">{song.primaryArtists || song.singers}</div>
                  <div className="card-actions">
                    <button className="action-btn play-btn" onClick={() => playSong(song)} title="Play">
                      <FaPlay />
                    </button>
                    <button className="action-btn download-btn" onClick={() => downloadSong(song)} title="Download">
                      <FaDownload />
                    </button>
                    <button className="action-btn next-btn" onClick={() => addToPlayNext(song)} title="Play Next">
                      <FaList />
                    </button>
                  </div>
                </div>
              ))}
            </ContentGrid>
            <SectionHeader><FaClock /> Recently Played</SectionHeader>
            <ContentGrid>
              {results.recent?.map(song => (
                <div key={song.id} className="card">
                  <img src={getBestImageQuality(song.image) || '/placeholder.png'} alt={song.name} className="card-image" />
                  <div className="card-title">{song.name}</div>
                  <div className="card-subtitle">{song.primaryArtists || song.singers}</div>
                  <div className="card-actions">
                    <button className="action-btn play-btn" onClick={() => playSong(song)} title="Play">
                      <FaPlay />
                    </button>
                    <button className="action-btn download-btn" onClick={() => downloadSong(song)} title="Download">
                      <FaDownload />
                    </button>
                    <button className="action-btn next-btn" onClick={() => addToPlayNext(song)} title="Play Next">
                      <FaList />
                    </button>
                  </div>
                </div>
              ))}
            </ContentGrid>
            <SectionHeader><FaHeart /> Made for You</SectionHeader>
            <ContentGrid>
              {results.recommendations?.map(song => (
                <div key={song.id} className="card">
                  <img src={getBestImageQuality(song.image) || '/placeholder.png'} alt={song.name} className="card-image" />
                  <div className="card-title">{song.name}</div>
                  <div className="card-subtitle">{song.primaryArtists || song.singers}</div>
                  <div className="card-actions">
                    <button className="action-btn play-btn" onClick={() => playSong(song)} title="Play">
                      <FaPlay />
                    </button>
                    <button className="action-btn download-btn" onClick={() => downloadSong(song)} title="Download">
                      <FaDownload />
                    </button>
                    <button className="action-btn next-btn" onClick={() => addToPlayNext(song)} title="Play Next">
                      <FaList />
                    </button>
                  </div>
                </div>
              ))}
            </ContentGrid>
          </Section>
        )}
        {section === 'search' && (
          <Section>
            <ContentGrid>
              {results.songs?.map(song => (
                <div key={song.id} className="card">
                  <img src={getBestImageQuality(song.image) || '/placeholder.png'} alt={song.name} className="card-image" />
                  <div className="card-title">{song.name}</div>
                  <div className="card-subtitle">{song.primaryArtists || song.singers}</div>
                  <div className="card-actions">
                    <button className="action-btn play-btn" onClick={() => playSong(song)} title="Play">
                      <FaPlay />
                    </button>
                    <button className="action-btn download-btn" onClick={() => downloadSong(song)} title="Download">
                      <FaDownload />
                    </button>
                    <button className="action-btn next-btn" onClick={() => addToPlayNext(song)} title="Play Next">
                      <FaList />
                    </button>
                  </div>
                </div>
              ))}
            </ContentGrid>
          </Section>
        )}
        {/* ...Library section and modals can be added similarly... */}
      </MainContent>
      {playerOpen && currentTrack && (
        <Player>
          <div className="track-info">
            <img src={getBestImageQuality(currentTrack.image) || '/placeholder.png'} alt="Track" />
            <div className="track-details">
              <h4>{currentTrack.name}</h4>
              <p>{currentTrack.primaryArtists || currentTrack.singers}</p>
            </div>
          </div>
          <div className="progress-section">
            <span className="time-current">{formatTime(audioRef.current.currentTime)}</span>
            <div
              className="progress-bar"
              onClick={e => {
                const bounds = e.currentTarget.getBoundingClientRect();
                const percent = Math.max(0, Math.min(1, (e.clientX - bounds.left) / bounds.width));
                const duration = audioRef.current.duration;
                if (duration && isFinite(duration) && duration > 0) {
                  audioRef.current.currentTime = percent * duration;
                }
              }}
            >
              <div
                className="progress-fill"
                style={{
                  width: `${(audioRef.current.currentTime / (audioRef.current.duration || 1) * 100) || 0}%`
                }}
              />
            </div>
            <span className="time-total">{formatTime(audioRef.current.duration)}</span>
          </div>
          <div className="player-controls">
            <button className="control-btn" onClick={() => downloadSong(currentTrack)} title="Download">
              <FaDownload />
            </button>
            <button className="control-btn" onClick={() => setTrackIndex(trackIndex - 1)}><FaStepBackward /></button>
            <button className="control-btn play-btn" onClick={() => { isPlaying ? audioRef.current.pause() : audioRef.current.play(); }}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className="control-btn" onClick={() => setTrackIndex(trackIndex + 1)}><FaStepForward /></button>
          </div>
          <div className="volume-control">
            <FaVolumeUp />
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="70"
              onChange={e => { audioRef.current.volume = e.target.value / 100; }}
            />
          </div>
          {playQueue.length > 0 && (
            <div className="queue-display">
              <div className="queue-header">
                <FaList />
                <span>Up Next ({playQueue.length})</span>
                <button className="clear-queue-btn" onClick={() => setPlayQueue([])} title="Clear Queue">
                  Clear
                </button>
              </div>
              <div className="queue-list">
                {playQueue.slice(0, 3).map((song, index) => (
                  <div key={`${song.id}-${index}`} className="queue-item">
                    <img src={getBestImageQuality(song.image) || '/placeholder.png'} alt={song.name} />
                    <div className="queue-item-info">
                      <div className="queue-item-title">{song.name}</div>
                      <div className="queue-item-artist">{song.primaryArtists || song.singers}</div>
                    </div>
                    <button
                      className="remove-queue-btn"
                      onClick={() => setPlayQueue(prev => prev.filter((_, i) => i !== index))}
                      title="Remove from queue"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {playQueue.length > 3 && (
                  <div className="queue-more">
                    +{playQueue.length - 3} more songs
                  </div>
                )}
              </div>
            </div>
          )}
        </Player>
      )}
      {loading && <LoadingSpinner><div className="spinner"></div></LoadingSpinner>}
      {/* Modals for playlist creation/add can be added here */}
    </MusicContainer>
  );
};

export default Music;
