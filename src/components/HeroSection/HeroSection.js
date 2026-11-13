import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPlus, FiInfo, FiStar, FiCheck, FiChevronLeft, FiChevronRight, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { getImageUrl, getMovieDetails, getTVDetails } from '../../services/tmdbApi';
import { addToLibrary, removeFromLibrary, isInLibrary, addToWatchHistory } from '../../services/localStorage';
import { getTrailerUrl } from '../../services/trailerService';
import {
  HeroContainer, HeroSlide, HeroContent, HeroTitle, HeroDescription,
  HeroMeta, HeroButtons, PlayButton, AddButton, InfoButton,
  HeroIndicators, Indicator, HeroOverlay, TrailerFrame, NavigationButton,
  VolumeButton
} from './HeroStyles';

const HeroSection = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerKey, setTrailerKey] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [inLibrary, setInLibrary] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (content.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
    }, 300000); // Changed from 10000 (10 seconds) to 300000 (5 minutes)

    return () => clearInterval(interval);
  }, [content.length]);

  useEffect(() => {
    if (!content[currentIndex]) return;
    
    const currentItem = content[currentIndex];
    const mediaType = currentItem.title ? 'movie' : 'tv';
    
    setInLibrary(isInLibrary(currentItem.id, mediaType));
    
    // Reset trailer state
    setShowTrailer(false);
    setTrailerKey(null);
    
    let trailerTimer;
    
    // Fetch trailer for current item
    const fetchTrailer = async () => {
      try {
        setIsLoading(true);
        const response = mediaType === 'movie' 
          ? await getMovieDetails(currentItem.id)
          : await getTVDetails(currentItem.id);
        
        if (response.data.videos && response.data.videos.results) {
          const videos = response.data.videos.results;
          
          // Find the best trailer with priority order
          let trailer = videos.find(video => 
            video.site === 'YouTube' && 
            video.type === 'Trailer' && 
            (video.name.toLowerCase().includes('official') || video.name.toLowerCase().includes('main'))
          );
          
          if (!trailer) {
            trailer = videos.find(video => 
              video.site === 'YouTube' && video.type === 'Trailer'
            );
          }
          
          if (!trailer) {
            trailer = videos.find(video => 
              video.site === 'YouTube' && video.type === 'Teaser'
            );
          }
          
          // If still no trailer, try to get any YouTube video
          if (!trailer) {
            trailer = videos.find(video => 
              video.site === 'YouTube'
            );
          }
          
          if (trailer) {
            setTrailerKey(trailer.key);
            console.log(`Found trailer: ${trailer.name} (${trailer.key})`);
            // Auto-play trailer after 2 seconds instead of 4
            trailerTimer = setTimeout(() => {
              setShowTrailer(true);
            }, 2000);
          } else {
            console.log(`No trailer found for ${mediaType} ${currentItem.id}`);
            setTrailerKey(null);
          }
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
        setTrailerKey(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrailer();
    
    return () => {
      if (trailerTimer) {
        clearTimeout(trailerTimer);
      }
      setShowTrailer(false);
      setTrailerKey(null);
    };
  }, [currentIndex, content]);

  if (!content || content.length === 0) return null;

  const currentItem = content[currentIndex];
  const mediaType = currentItem.title ? 'movie' : 'tv';

  const handlePlay = () => {
    addToWatchHistory({ ...currentItem, type: mediaType });
    if (mediaType === 'movie') {
      navigate(`/player/movie/${currentItem.id}`);
    } else {
      navigate(`/player/tv/${currentItem.id}/1/1`);
    }
  };

  const handleLibraryToggle = () => {
    if (inLibrary) {
      removeFromLibrary(currentItem.id, mediaType);
      setInLibrary(false);
    } else {
      addToLibrary({ ...currentItem, type: mediaType });
      setInLibrary(true);
    }
  };

  const handleInfo = () => {
    navigate(`/${mediaType}/${currentItem.id}`);
  };

  const handlePrevious = () => {
    if (content.length > 0) {
      const newIndex = (currentIndex - 1 + content.length) % content.length;
      setCurrentIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (content.length > 0) {
      const newIndex = (currentIndex + 1) % content.length;
      setCurrentIndex(newIndex);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getYouTubeEmbedUrl = (videoKey, autoplay = true, muted = true) => {
    if (!videoKey) return null;
    
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      mute: muted ? '1' : '0',
      controls: '0',
      showinfo: '0',
      rel: '0',
      modestbranding: '1',
      loop: '1',
      playlist: videoKey,
      enablejsapi: '1',
      origin: window.location.origin,
      iv_load_policy: '3' // Hide video annotations
    });
    
    return `https://www.youtube.com/embed/${videoKey}?${params.toString()}`;
  };

  return (
    <HeroContainer>
      <AnimatePresence mode="wait">
        <HeroSlide
          key={currentIndex}
          as={motion.div}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          bgImage={!showTrailer ? getImageUrl(currentItem.backdrop_path, 'original') : null}
        >
          {showTrailer && trailerKey ? (
            <TrailerFrame
              src={getYouTubeEmbedUrl(trailerKey, true, isMuted)}
              title={`${currentItem.title || currentItem.name} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              frameBorder="0"
              loading="lazy"
            />
          ) : (
            <img
              src={getImageUrl(currentItem.backdrop_path, 'original')}
              alt={currentItem.title || currentItem.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              loading="eager"
            />
          )}
          <HeroOverlay />
          
          {/* Navigation Buttons */}
          <NavigationButton
            direction="left"
            onClick={handlePrevious}
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronLeft />
          </NavigationButton>
          
          <NavigationButton
            direction="right"
            onClick={handleNext}
            as={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiChevronRight />
          </NavigationButton>

          {/* Volume Control */}
          {showTrailer && trailerKey && (
            <VolumeButton
              onClick={toggleMute}
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMuted ? <FiVolumeX /> : <FiVolume2 />}
            </VolumeButton>
          )}
          
          <HeroContent
            as={motion.div}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <HeroTitle>
              {currentItem.title || currentItem.name}
            </HeroTitle>
            
            <HeroMeta>
              <span>
                <FiStar /> {currentItem.vote_average?.toFixed(1)}
              </span>
              <span>{new Date(currentItem.release_date || currentItem.first_air_date).getFullYear()}</span>
              <span>{mediaType === 'movie' ? 'Movie' : 'TV Series'}</span>
            </HeroMeta>
            
            <HeroDescription>
              {currentItem.overview}
            </HeroDescription>
            
            <HeroButtons>
              <PlayButton
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePlay}
              >
                <FiPlay /> Watch Now
              </PlayButton>
              
              <AddButton
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLibraryToggle}
                active={inLibrary}
              >
                {inLibrary ? <FiCheck /> : <FiPlus />} {inLibrary ? 'In Library' : 'My List'}
              </AddButton>
              
              <InfoButton
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleInfo}
              >
                <FiInfo /> More Info
              </InfoButton>
            </HeroButtons>
          </HeroContent>
        </HeroSlide>
      </AnimatePresence>
      
      <HeroIndicators>
        {content.map((_, index) => (
          <Indicator
            key={index}
            active={index === currentIndex}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </HeroIndicators>
    </HeroContainer>
  );
};

export default HeroSection;