import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { searchMulti } from '../../services/tmdbApi';
import ContentCard from '../../components/ContentCard/ContentCard';
import discordRPC from '../../services/discordRPC';
import {
  SearchContainer, SearchHeader, SearchInput, SearchResults,
  ResultsGrid, NoResults
} from './SearchStyles';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchContent = async () => {
      if (!query.trim()) {
        setResults([]);
        discordRPC.setSearchActivity();
        return;
      }

      setLoading(true);
      try {
        const response = await searchMulti(query);
        setResults(response.data.results.filter(item => 
          item.media_type !== 'person' && (item.poster_path || item.backdrop_path)
        ));
        
        // Update Discord RPC with search query
        discordRPC.setSearchActivity(query);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchContent, 500);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <SearchContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SearchHeader>
        <h1>Search</h1>
        <SearchInput>
          <FiSearch />
          <input
            type="text"
            placeholder="Search for movies, TV shows, anime..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </SearchInput>
      </SearchHeader>

      <SearchResults>
        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: 'rgba(255, 255, 255, 0.6)'
          }}>
            Searching...
          </div>
        ) : results.length > 0 ? (
          <ResultsGrid>
            {results.map((item, index) => (
              <ContentCard
                key={`${item.id}-${item.media_type}`}
                item={item}
                type={item.media_type}
                index={index}
              />
            ))}
          </ResultsGrid>
        ) : query.trim() ? (
          <NoResults>
            <h3>No results found</h3>
            <p>Try searching with different keywords</p>
          </NoResults>
        ) : (
          <NoResults>
            <h3>Start searching</h3>
            <p>Enter a movie, TV show, or anime title to get started</p>
          </NoResults>
        )}
      </SearchResults>
    </SearchContainer>
  );
};

export default Search;