import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiSettings, FiMaximize } from 'react-icons/fi';
import { getStreamingUrl, streamingSources } from '../../services/streamingApi';
import { getMovieDetails, getTVDetails } from '../../services/tmdbApi';
import discordRPC from '../../services/discordRPC';
import {
  PlayerContainer, PlayerHeader, BackButton, PlayerTitle,
  SourceSelector, SourceButton, PlayerFrame, PlayerWrapper,
  ControlsOverlay, SettingsButton, FullscreenButton, ServerSwitchMessage
} from './PlayerStyles';

// Hook to detect mobile view
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const Player = () => {
  const params = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [selectedSource, setSelectedSource] = useState('void');
  const [streamingUrl, setStreamingUrl] = useState('');
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Determine the type based on the route
  let type, id, season, episode;
  
  // Check if we're using the new /watch routes or old /player routes
  const pathname = window.location.hash.replace('#', '');
  
  if (pathname.startsWith('/watch/movie/')) {
    type = 'movie';
    id = params.id;
  } else if (pathname.startsWith('/watch/tv/')) {
    type = 'tv';
    id = params.id;
    season = params.season;
    episode = params.episode;
  } else if (pathname.startsWith('/watch/anime/')) {
    type = 'anime';
    id = params.id;
    season = params.season;
    episode = params.episode;
  } else if (pathname.startsWith('/player/movie/')) {
    type = 'movie';
    id = params.id;
  } else if (pathname.startsWith('/player/tv/')) {
    type = 'tv';
    id = params.id;
    season = params.season;
    episode = params.episode;
  } else if (pathname.startsWith('/player/anime/')) {
    type = 'anime';
    id = params.id;
    season = params.season;
    episode = params.episode;
  } else {
    // Legacy route format /player/:type/:id
    type = params.type;
    id = params.id;
    season = params.season;
    episode = params.episode;
  }

  // Clean the ID to remove any hash symbols
  const cleanId = id ? id.replace('#', '').trim() : '';

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = type === 'movie' 
          ? await getMovieDetails(cleanId)
          : await getTVDetails(cleanId);
        setDetails(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (cleanId) {
      fetchDetails();
    } else {
      setLoading(false);
    }
  }, [type, cleanId]);

  useEffect(() => {
    if (details) {
      const imdbId = details.external_ids?.imdb_id;
      const url = getStreamingUrl(
        selectedSource,
        type,
        cleanId,
        imdbId,
        season,
        episode
      );
      setStreamingUrl(url);

      // Update Discord RPC when playing content
      const title = details.title || details.name || 'Unknown';
      const episodeInfo = type === 'tv' && season && episode ? `S${season}E${episode}` : null;
      const party = { id: cleanId, size: [1, 1] };
      const joinSecret = `voidstream-${cleanId}`;

      discordRPC.setPlayerActivity(
        title,
        episodeInfo,
        type,
        cleanId,
        season,
        episode,
        party,
        joinSecret
      );
    }
  }, [selectedSource, details, type, cleanId, season, episode]);

  // VidFast progress tracking event listener
  useEffect(() => {
    const handleVidFastEvents = ({ origin, data }) => {
      if (origin !== 'https://vidfast.pro' || !data) {
        return;
      }

      // Handle player events (play, pause, seeked, ended, timeupdate)
      if (data.type === 'PLAYER_EVENT') {
        const { event, currentTime, duration } = data.data;
        console.log(`VidFast Player ${event} at ${currentTime}s of ${duration}s`);
        
        // You can add custom event handling logic here
        // For example, update watch progress, sync with backend, etc.
      }

      // Handle media data storage for progress tracking
      if (data.type === 'MEDIA_DATA') {
        try {
          localStorage.setItem('vidFastProgress', JSON.stringify(data.data));
          console.log('VidFast progress saved to localStorage');
        } catch (error) {
          console.error('Error saving VidFast progress:', error);
        }
      }
    };

    // Add event listener when component mounts
    window.addEventListener('message', handleVidFastEvents);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener('message', handleVidFastEvents);
    };
  }, []);

  const handleSourceChange = (sourceId) => {
    setSelectedSource(sourceId);
  };

  const handleFullscreen = () => {
    const iframe = document.querySelector('iframe');
    if (iframe && iframe.requestFullscreen) {
      iframe.requestFullscreen();
    }
  };

  if (loading) {
    return (
      <PlayerContainer>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.6)'
        }}>
          Loading player...
        </div>
      </PlayerContainer>
    );
  }

  const title = details?.title || details?.name || 'Unknown';
  const displayTitle = type === 'tv' && season && episode 
    ? `${title} - S${season}E${episode}`
    : title;

  return (
    <PlayerContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PlayerHeader>
        <BackButton
          onClick={() => navigate(-1)}
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowLeft />
        </BackButton>
        
        <PlayerTitle>{displayTitle}</PlayerTitle>
        
        <SourceSelector>
          {streamingSources
            .filter(source => !source.movieOnly || type === 'movie')
            .map((source) => (
            <SourceButton
              key={source.id}
              active={selectedSource === source.id}
              onClick={() => handleSourceChange(source.id)}
              as={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {source.name}
              <span>{source.quality}</span>
            </SourceButton>
          ))}
        </SourceSelector>
      </PlayerHeader>

      <PlayerWrapper>
        {streamingUrl ? (
          <PlayerFrame
            src={streamingUrl}
            allowFullScreen
            title={displayTitle}
          />
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '1.1rem',
            textAlign: 'center'
          }}>
            <div>No streaming source available</div>
            <div style={{ fontSize: '0.9rem', marginTop: '10px' }}>
              TMDB ID: {cleanId || 'Not provided'}<br/>
              Type: {type || 'Unknown'}
              {season && episode && <><br/>Season: {season}, Episode: {episode}</>}
            </div>
          </div>
        )}
        
        <ServerSwitchMessage>
          <strong>
            {isMobile
              ? "Content wrong or missing? Try switching servers"
              : "If the content is wrong or missing, try switching servers"
            }
          </strong>
        </ServerSwitchMessage>
        
        <ControlsOverlay>
          <SettingsButton
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiSettings />
          </SettingsButton>
          
          <FullscreenButton
            onClick={handleFullscreen}
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiMaximize />
          </FullscreenButton>
        </ControlsOverlay>
      </PlayerWrapper>
    </PlayerContainer>
  );
};

export default Player;
