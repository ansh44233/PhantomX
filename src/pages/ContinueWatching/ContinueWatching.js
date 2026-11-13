import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiTrash2, FiPlay } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getContinueWatching, removeFromContinueWatching } from '../../services/localStorage';
import { getImageUrl } from '../../services/tmdbApi';
import {
  ContinueContainer, ContinueHeader, ContinueGrid, ContinueCard,
  CardImage, CardOverlay, CardContent, CardTitle, CardMeta,
  ProgressBar, ProgressFill, PlayButton, RemoveButton,
  EmptyState, EmptyIcon, EmptyTitle, EmptyDescription
} from './ContinueWatchingStyles';

const ContinueWatching = () => {
  const [continueWatching, setContinueWatching] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setContinueWatching(getContinueWatching());
  }, []);

  const handlePlay = (item) => {
    if (item.type === 'movie') {
      navigate(`/player/movie/${item.id}`);
    } else {
      navigate(`/player/tv/${item.id}/${item.season || 1}/${item.episode || 1}`);
    }
  };

  const handleRemove = (item) => {
    const updated = removeFromContinueWatching(item.id, item.type);
    setContinueWatching(updated);
  };

  if (continueWatching.length === 0) {
    return (
      <ContinueContainer>
        <ContinueHeader>
          <h1>Continue Watching</h1>
          <p>Pick up where you left off</p>
        </ContinueHeader>

        <EmptyState>
          <EmptyIcon>
            <FiClock />
          </EmptyIcon>
          <EmptyTitle>No content to continue</EmptyTitle>
          <EmptyDescription>
            Start watching something to see it here. Your progress will be automatically saved.
          </EmptyDescription>
        </EmptyState>
      </ContinueContainer>
    );
  }

  return (
    <ContinueContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ContinueHeader>
        <h1>Continue Watching</h1>
        <p>Pick up where you left off</p>
      </ContinueHeader>

      <ContinueGrid>
        {continueWatching.map((item, index) => (
          <ContinueCard
            key={`${item.id}-${item.type}`}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <CardImage
              src={getImageUrl(item.backdrop_path || item.poster_path)}
              alt={item.title || item.name}
            />
            
            <CardOverlay>
              <PlayButton
                onClick={() => handlePlay(item)}
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiPlay />
              </PlayButton>
              
              <RemoveButton
                onClick={() => handleRemove(item)}
                as={motion.button}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiTrash2 />
              </RemoveButton>
            </CardOverlay>

            <CardContent>
              <CardTitle>{item.title || item.name}</CardTitle>
              <CardMeta>
                {item.type === 'tv' && item.season && item.episode && (
                  <span>S{item.season}E{item.episode}</span>
                )}
                <span>{Math.round(item.progress || 0)}% watched</span>
              </CardMeta>
              
              <ProgressBar>
                <ProgressFill progress={item.progress || 0} />
              </ProgressBar>
            </CardContent>
          </ContinueCard>
        ))}
      </ContinueGrid>
    </ContinueContainer>
  );
};

export default ContinueWatching;