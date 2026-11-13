import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getGenres } from '../../services/tmdbApi';
import {
  FilterContainer, FilterTitle, GenreList, GenreButton
} from './GenreFilterStyles';

const GenreFilter = ({ selectedGenre, onGenreChange }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieGenres, tvGenres] = await Promise.all([
          getGenres('movie'),
          getGenres('tv')
        ]);
        
        // Combine and deduplicate genres
        const allGenres = [...movieGenres.data.genres, ...tvGenres.data.genres];
        const uniqueGenres = allGenres.filter((genre, index, self) => 
          index === self.findIndex(g => g.id === genre.id)
        );
        
        setGenres([{ id: 'all', name: 'All' }, ...uniqueGenres]);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <FilterContainer
      as={motion.div}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FilterTitle>Browse by Genre</FilterTitle>
      <GenreList>
        {genres.map((genre, index) => (
          <GenreButton
            key={genre.id}
            active={selectedGenre === genre.id}
            onClick={() => onGenreChange(genre.id)}
            as={motion.button}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {genre.name}
          </GenreButton>
        ))}
      </GenreList>
    </FilterContainer>
  );
};

export default GenreFilter;