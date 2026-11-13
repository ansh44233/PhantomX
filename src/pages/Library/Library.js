import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBookmark, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { getLibrary, removeFromLibrary } from '../../services/localStorage';
import ContentCard from '../../components/ContentCard/ContentCard';
import {
  LibraryContainer, LibraryHeader, EmptyState, EmptyIcon,
  EmptyTitle, EmptyDescription, EmptyButton, ContentGrid,
  ClearButton
} from './LibraryStyles';

const Library = () => {
  const [library, setLibrary] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLibrary(getLibrary());
  }, []);

  const handleClearLibrary = () => {
    if (window.confirm('Are you sure you want to clear your entire library?')) {
      // Clear all items one by one
      library.forEach(item => {
        removeFromLibrary(item.id, item.type);
      });
      setLibrary([]);
    }
  };

  if (library.length === 0) {
    return (
      <LibraryContainer
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LibraryHeader>
          <div>
            <h1>Your Library</h1>
            <p>Your saved movies, TV shows, and anime</p>
          </div>
        </LibraryHeader>

        <EmptyState>
          <EmptyIcon>
            <FiBookmark />
          </EmptyIcon>
          <EmptyTitle>Your library is empty</EmptyTitle>
          <EmptyDescription>
            Start adding movies and TV shows to your library to see them here.
            You can add content by clicking the "+" button on any movie or show.
          </EmptyDescription>
          <EmptyButton
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
          >
            Browse Content
          </EmptyButton>
        </EmptyState>
      </LibraryContainer>
    );
  }

  return (
    <LibraryContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <LibraryHeader>
        <div>
          <h1>Your Library</h1>
          <p>{library.length} item{library.length !== 1 ? 's' : ''} in your library</p>
        </div>
        <ClearButton onClick={handleClearLibrary}>
          <FiTrash2 /> Clear Library
        </ClearButton>
      </LibraryHeader>

      <ContentGrid>
        {library.map((item, index) => (
          <ContentCard
            key={`${item.id}-${item.type}`}
            item={item}
            type={item.type}
            index={index}
          />
        ))}
      </ContentGrid>
    </LibraryContainer>
  );
};

export default Library;