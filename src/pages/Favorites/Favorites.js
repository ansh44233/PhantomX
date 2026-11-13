import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { getFavorites, removeFromFavorites } from '../../services/localStorage';
import ContentCard from '../../components/ContentCard/ContentCard';
import {
  FavoritesContainer, FavoritesHeader, ContentGrid,
  EmptyState, EmptyIcon, EmptyTitle, EmptyDescription,
  ClearButton
} from './FavoritesStyles';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      favorites.forEach(item => {
        removeFromFavorites(item.id, item.type);
      });
      setFavorites([]);
    }
  };

  if (favorites.length === 0) {
    return (
      <FavoritesContainer
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FavoritesHeader>
          <div>
            <h1>
              <FiHeart /> Favorites
            </h1>
            <p>Your favorite movies and TV shows</p>
          </div>
        </FavoritesHeader>

        <EmptyState>
          <EmptyIcon>
            <FiHeart />
          </EmptyIcon>
          <EmptyTitle>No favorites yet</EmptyTitle>
          <EmptyDescription>
            Add movies and TV shows to your favorites by clicking the heart icon.
          </EmptyDescription>
        </EmptyState>
      </FavoritesContainer>
    );
  }

  return (
    <FavoritesContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FavoritesHeader>
        <div>
          <h1>
            <FiHeart /> Favorites
          </h1>
          <p>{favorites.length} favorite{favorites.length !== 1 ? 's' : ''}</p>
        </div>
        <ClearButton onClick={handleClearFavorites}>
          <FiTrash2 /> Clear Favorites
        </ClearButton>
      </FavoritesHeader>

      <ContentGrid>
        {favorites.map((item, index) => (
          <ContentCard
            key={`${item.id}-${item.type}`}
            item={item}
            type={item.type}
            index={index}
          />
        ))}
      </ContentGrid>
    </FavoritesContainer>
  );
};

export default Favorites;