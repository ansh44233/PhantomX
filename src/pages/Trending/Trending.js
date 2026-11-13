import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrendingUp } from 'react-icons/fi';
import { getTrendingMovies, getTrendingTV } from '../../services/tmdbApi';
import ContentCard from '../../components/ContentCard/ContentCard';
import {
  TrendingContainer, TrendingHeader, FilterTabs, FilterTab,
  ContentGrid, LoadingState
} from './TrendingStyles';

const Trending = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const [moviesRes, tvRes] = await Promise.all([
          getTrendingMovies(),
          getTrendingTV()
        ]);
        
        setTrendingMovies(moviesRes.data.results);
        setTrendingTV(tvRes.data.results);
      } catch (error) {
        console.error('Error fetching trending:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const getFilteredContent = () => {
    switch (activeTab) {
      case 'movies':
        return trendingMovies.map(item => ({ ...item, type: 'movie' }));
      case 'tv':
        return trendingTV.map(item => ({ ...item, type: 'tv' }));
      default:
        return [
          ...trendingMovies.map(item => ({ ...item, type: 'movie' })),
          ...trendingTV.map(item => ({ ...item, type: 'tv' }))
        ].sort((a, b) => b.popularity - a.popularity);
    }
  };

  if (loading) {
    return (
      <TrendingContainer>
        <LoadingState>Loading trending content...</LoadingState>
      </TrendingContainer>
    );
  }

  const content = getFilteredContent();

  return (
    <TrendingContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <TrendingHeader>
        <h1>
          <FiTrendingUp /> Trending Now
        </h1>
        <p>What's popular this week</p>
      </TrendingHeader>

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
    </TrendingContainer>
  );
};

export default Trending;