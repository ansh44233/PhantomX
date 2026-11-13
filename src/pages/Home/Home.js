import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../../components/HeroSection/HeroSection';
import ContentRow from '../../components/ContentRow/ContentRow';
import GenreFilter from '../../components/GenreFilter/GenreFilter';
import { 
  getTrendingMovies, 
  getTrendingTV, 
  getPopularMovies, 
  getPopularTV,
  getTopRatedMovies,
  getTopRatedTV,
  discoverMovies,
  discoverTV,
  testApiConnection
} from '../../services/tmdbApi';
import { HomeContainer, ContentSection } from './HomeStyles';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [filteredContent, setFilteredContent] = useState({
    trending: [],
    popularMovies: [],
    popularTV: [],
    topRatedMovies: [],
    topRatedTV: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        
        // Test API connection first
        const isConnected = await testApiConnection();
        if (!isConnected) {
          throw new Error('Cannot connect to TMDB API. Please check your internet connection.');
        }
        
        const [
          trendingMoviesRes,
          trendingTVRes,
          popularMoviesRes,
          popularTVRes,
          topRatedMoviesRes,
          topRatedTVRes
        ] = await Promise.all([
          getTrendingMovies(),
          getTrendingTV(),
          getPopularMovies(),
          getPopularTV(),
          getTopRatedMovies(),
          getTopRatedTV()
        ]);

        const trendingMoviesData = trendingMoviesRes.data.results.map(item => ({ ...item, type: 'movie' }));
        const trendingTVData = trendingTVRes.data.results.map(item => ({ ...item, type: 'tv' }));
        const popularMoviesData = popularMoviesRes.data.results.map(item => ({ ...item, type: 'movie' }));
        const popularTVData = popularTVRes.data.results.map(item => ({ ...item, type: 'tv' }));
        const topRatedMoviesData = topRatedMoviesRes.data.results.map(item => ({ ...item, type: 'movie' }));
        const topRatedTVData = topRatedTVRes.data.results.map(item => ({ ...item, type: 'tv' }));

        console.log('Home - TV shows sample:', popularTVData.slice(0, 2));
        console.log('Home - Movies sample:', popularMoviesData.slice(0, 2));

        setTrendingMovies(trendingMoviesData);
        setTrendingTV(trendingTVData);
        setPopularMovies(popularMoviesData);
        setPopularTV(popularTVData);
        setTopRatedMovies(topRatedMoviesData);
        setTopRatedTV(topRatedTVData);

        setFilteredContent({
          trending: [...trendingMoviesData, ...trendingTVData],
          popularMovies: popularMoviesData,
          popularTV: popularTVData,
          topRatedMovies: topRatedMoviesData,
          topRatedTV: topRatedTVData
        });
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Failed to load content');
        
        // Set empty arrays as fallback
        setTrendingMovies([]);
        setTrendingTV([]);
        setPopularMovies([]);
        setPopularTV([]);
        setTopRatedMovies([]);
        setTopRatedTV([]);
        setFilteredContent({
          trending: [],
          popularMovies: [],
          popularTV: [],
          topRatedMovies: [],
          topRatedTV: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter content by genre when selectedGenre changes
  useEffect(() => {
    const filterContentByGenre = async () => {
      if (selectedGenre === 'all') {
        // If 'all' is selected, use the original data
        setFilteredContent({
          trending: [...trendingMovies, ...trendingTV],
          popularMovies: popularMovies,
          popularTV: popularTV,
          topRatedMovies: topRatedMovies,
          topRatedTV: topRatedTV
        });
        return;
      }

      try {
        // Fetch content filtered by the selected genre
        const [
          filteredMoviesRes,
          filteredTVRes
        ] = await Promise.all([
          discoverMovies({ with_genres: selectedGenre }),
          discoverTV({ with_genres: selectedGenre })
        ]);

        const filteredMovies = filteredMoviesRes.data.results.map(item => ({ ...item, type: 'movie' }));
        const filteredTV = filteredTVRes.data.results.map(item => ({ ...item, type: 'tv' }));

        // Filter the existing content by genre
        const filterByGenre = (items) => {
          return items.filter(item => 
            item.genre_ids && item.genre_ids.includes(parseInt(selectedGenre))
          );
        };

        setFilteredContent({
          trending: [...filterByGenre(trendingMovies), ...filterByGenre(trendingTV)],
          popularMovies: filterByGenre(popularMovies),
          popularTV: filterByGenre(popularTV),
          topRatedMovies: filterByGenre(topRatedMovies),
          topRatedTV: filterByGenre(topRatedTV)
        });
      } catch (error) {
        console.error('Error filtering by genre:', error);
      }
    };

    filterContentByGenre();
  }, [selectedGenre, trendingMovies, trendingTV, popularMovies, popularTV, topRatedMovies, topRatedTV]);

  if (loading) {
    return (
      <HomeContainer>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{ marginBottom: '1rem', fontSize: '2rem' }}>⚡</div>
          <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 700 }}>Loading PhantomX...</div>
          <div style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.6 }}>
            Fetching content from the matrix...
          </div>
        </div>
      </HomeContainer>
    );
  }

  if (error) {
    return (
      <HomeContainer>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.8)',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <div style={{ marginBottom: '1rem', color: '#ff6b6b' }}>Connection Error</div>
          <div style={{ fontSize: '1rem', marginBottom: '2rem', opacity: 0.8 }}>
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '0.8rem 1.5rem',
              background: '#6c5ce7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Retry
          </button>
          <div style={{ fontSize: '0.8rem', marginTop: '2rem', opacity: 0.6 }}>
            Check your internet connection and try again.<br/>
            Open Developer Tools (F12) for more details.
          </div>
        </div>
      </HomeContainer>
    );
  }

  const heroContent = filteredContent.trending.slice(0, 5);

  return (
    <HomeContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection content={heroContent} />
      
      <ContentSection>
        <GenreFilter 
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
        
        <ContentRow 
          title="Trending this season"
          items={filteredContent.trending}
          type="mixed"
        />
        
        <ContentRow 
          title="Popular Movies"
          items={filteredContent.popularMovies}
          type="movie"
        />
        
        <ContentRow 
          title="Popular TV Shows"
          items={filteredContent.popularTV}
          type="tv"
        />
        
        <ContentRow 
          title="Top Rated Movies"
          items={filteredContent.topRatedMovies}
          type="movie"
        />
        
        <ContentRow 
          title="Top Rated TV Shows"
          items={filteredContent.topRatedTV}
          type="tv"
        />
      </ContentSection>
    </HomeContainer>
  );
};

export default Home;