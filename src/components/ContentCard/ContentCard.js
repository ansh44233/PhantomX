import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiPlus, FiStar, FiInfo, FiCheck, FiHeart } from 'react-icons/fi';
import { getImageUrl, getMovieDetails, getTVDetails } from '../../services/tmdbApi';
import { addToLibrary, removeFromLibrary, isInLibrary, addToWatchHistory, addToFavorites, removeFromFavorites, isInFavorites } from '../../services/localStorage';
import { getTrailerUrl } from '../../services/trailerService';
import {
  CardContainer, CardImage, CardOverlay, CardContent,
  CardTitle, CardMeta, CardRating, CardActions,
  ActionButton, PlayButton, TrailerFrame
} from './ContentCardStyles';

const ContentCard = ({ item, type, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [inLibrary, setInLibrary] = useState(false);
  const [inFavorites, setInFavorites] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setInLibrary(isInLibrary(item.id, type));
    setInFavorites(isInFavorites(item.id, type));
  }, [item.id, type]);

  useEffect(() => {
    let trailerTimer;
    
    if (isHovered) {
      trailerTimer = setTimeout(async () => {
        try {
          const response = type === 'movie' 
            ? await getMovieDetails(item.id)
            : await getTVDetails(item.id);
          
          const trailer = getTrailerUrl(response.data.videos);
          if (trailer) {
            setTrailerUrl(trailer);
            setShowTrailer(true);
          }
        } catch (error) {
          console.error('Error fetching trailer:', error);
        }
      }, 1000); // Show trailer after 1 second of hover
    } else {
      setShowTrailer(false);
      setTrailerUrl(null);
    }

    return () => {
      if (trailerTimer) clearTimeout(trailerTimer);
    };
  }, [isHovered, item.id, type]);

  const handlePlay = (e) => {
    e.stopPropagation();
    addToWatchHistory({ ...item, type });
    navigate(`/player/${type}/${item.id}`);
  };

  const handleLibraryToggle = (e) => {
    e.stopPropagation();
    if (inLibrary) {
      removeFromLibrary(item.id, type);
      setInLibrary(false);
    } else {
      addToLibrary({ ...item, type });
      setInLibrary(true);
    }
  };

  const handleFavoritesToggle = (e) => {
    e.stopPropagation();
    if (inFavorites) {
      removeFromFavorites(item.id, type);
      setInFavorites(false);
    } else {
      addToFavorites({ ...item, type });
      setInFavorites(true);
    }
  };

  const handleInfo = (e) => {
    e.stopPropagation();
    navigate(`/${type}/${item.id}`);
  };

  const handleCardClick = () => {
    console.log('ContentCard clicked:', {
      title: item.title || item.name,
      type: type,
      id: item.id,
      navigateTo: `/${type}/${item.id}`
    });
    navigate(`/${type}/${item.id}`);
  };

  return (
    <CardContainer
      as={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {showTrailer && trailerUrl ? (
        <TrailerFrame
          src={trailerUrl}
          title={`${item.title || item.name} Trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <CardImage
          src={getImageUrl(item.poster_path)}
          alt={item.title || item.name}
          loading="lazy"
        />
      )}
      
      <CardOverlay
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <CardContent>
          <CardTitle>{item.title || item.name}</CardTitle>
          
          <CardMeta>
            <CardRating>
              <FiStar /> {item.vote_average?.toFixed(1)}
            </CardRating>
            <span>{new Date(item.release_date || item.first_air_date).getFullYear()}</span>
          </CardMeta>
          
          <CardActions>
            <PlayButton
              onClick={handlePlay}
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiPlay />
            </PlayButton>
            
            <ActionButton
              onClick={handleLibraryToggle}
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              active={inLibrary}
            >
              {inLibrary ? <FiCheck /> : <FiPlus />}
            </ActionButton>
            
            <ActionButton
              onClick={handleFavoritesToggle}
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              active={inFavorites}
            >
              <FiHeart />
            </ActionButton>
            
            <ActionButton
              onClick={handleInfo}
              as={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiInfo />
            </ActionButton>
          </CardActions>
        </CardContent>
      </CardOverlay>
    </CardContainer>
  );
};

export default ContentCard;