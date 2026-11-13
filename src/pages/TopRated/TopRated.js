import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { getTopRatedMovies, getTopRatedTV } from '../../services/tmdbApi';
import ContentCard from '../../components/ContentCard/ContentCard';
import {
  TopRatedContainer, TopRatedHeader, FilterTabs, FilterTab,
  ContentGrid, LoadingState
} from './TopRatedStyles';

const TopRated = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        setLoading(true);
        const [moviesRes, tvRes] = await Promise.all([
          getTopRatedMovies(),
          getTopRatedTV()
        ]);
        
        setTopRatedMovies(moviesRes.data.results);
        setTopRatedTV(tvRes.data.results);
      } catch (error) {
        console.error('Error fetching top rated:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRated();
  }, []);

  const getFilteredContent = () => {
    switch (activeTab) {
      case 'movies':
        return topRatedMovies.map(item => ({ ...item, type: 'movie' }));
      case 'tv':
        return topRatedTV.map(item => ({ ...item, type: 'tv' }));
      default:
        return [
          ...topRatedMovies.map(item => ({ ...item, type: 'movie' })),
          ...topRatedTV.map(item => ({ ...item, type: 'tv' }))
        ].sort((a, b) => b.vote_average - a.vote_average);
    }
  };

  if (loading) {
    return (
      <TopRatedContainer>
        <LoadingState>Loading top rated content...</LoadingState>
      </TopRatedContainer>
    );
  }

  const content = getFilteredContent();

  return (
    <TopRatedContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TopRatedHeader>
        <h1>
          <FiStar /> Top Rated
        </h1>
        <p>Highest rated movies and TV shows</p>
      </TopRatedHeader>

      <FilterTabs>
        <FilterTab
          active={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
        >
          All
        </FilterTab>
        <FilterTab
          active={activeTab === 'movies'}
          onClick={() => setActiveTab('movies')}
        >
          Movies
        </FilterTab>
        <FilterTab
          active={activeTab === 'tv'}
          onClick={() => setActiveTab('tv')}
        >
          TV Shows
        </FilterTab>
      </FilterTabs>

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
    </TopRatedContainer>
  );
};

export default TopRated;