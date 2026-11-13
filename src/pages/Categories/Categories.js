import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGrid } from 'react-icons/fi';
import { getGenres, discoverMovies, discoverTV } from '../../services/tmdbApi';
import ContentCard from '../../components/ContentCard/ContentCard';
import {
  CategoriesContainer, CategoriesHeader, GenreGrid, GenreCard,
  ContentSection, ContentGrid, LoadingState
} from './CategoriesStyles';

const Categories = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const [movieGenres, tvGenres] = await Promise.all([
          getGenres('movie'),
          getGenres('tv')
        ]);
        
        const allGenres = [...movieGenres.data.genres, ...tvGenres.data.genres];
        const uniqueGenres = allGenres.filter((genre, index, self) => 
          index === self.findIndex(g => g.id === genre.id)
        );
        
        setGenres(uniqueGenres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreSelect = async (genre) => {
    setSelectedGenre(genre);
    setContentLoading(true);
    
    try {
      const [moviesRes, tvRes] = await Promise.all([
        discoverMovies({ with_genres: genre.id }),
        discoverTV({ with_genres: genre.id })
      ]);
      
      const combinedContent = [
        ...moviesRes.data.results.map(item => ({ ...item, type: 'movie' })),
        ...tvRes.data.results.map(item => ({ ...item, type: 'tv' }))
      ].sort((a, b) => b.popularity - a.popularity);
      
      setContent(combinedContent);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setContentLoading(false);
    }
  };

  if (loading) {
    return (
      <CategoriesContainer>
        <LoadingState>Loading categories...</LoadingState>
      </CategoriesContainer>
    );
  }

  return (
    <CategoriesContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <CategoriesHeader>
        <h1>
          <FiGrid /> Categories
        </h1>
        <p>Browse content by genre</p>
      </CategoriesHeader>

      <GenreGrid>
        {genres.map((genre, index) => (
          <GenreCard
            key={genre.id}
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            active={selectedGenre?.id === genre.id}
            onClick={() => handleGenreSelect(genre)}
          >
            {genre.name}
          </GenreCard>
        ))}
      </GenreGrid>

      {selectedGenre && (
        <ContentSection>
          <h2>{selectedGenre.name}</h2>
          {contentLoading ? (
            <LoadingState>Loading {selectedGenre.name.toLowerCase()} content...</LoadingState>
          ) : (
            <ContentGrid>
              {content.map((item, index) => (
                <ContentCard
                  key={`${item.id}-${item.type}`}
                  item={item}
                  type={item.type}
                  index={index}
                />
              ))}
            </ContentGrid>
          )}
        </ContentSection>
      )}
    </CategoriesContainer>
  );
};

export default Categories;