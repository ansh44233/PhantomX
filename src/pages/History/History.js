import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiTrash2 } from 'react-icons/fi';
import { getWatchHistory, clearWatchHistory } from '../../services/localStorage';
import ContentCard from '../../components/ContentCard/ContentCard';
import {
  HistoryContainer, HistoryHeader, ClearButton, ContentGrid,
  EmptyState, EmptyIcon, EmptyTitle, EmptyDescription
} from './HistoryStyles';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getWatchHistory());
  }, []);

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your watch history?')) {
      clearWatchHistory();
      setHistory([]);
    }
  };

  if (history.length === 0) {
    return (
      <HistoryContainer>
        <HistoryHeader>
          <div>
            <h1>Watch History</h1>
            <p>Your recently watched content</p>
          </div>
        </HistoryHeader>

        <EmptyState>
          <EmptyIcon>
            <FiPlay />
          </EmptyIcon>
          <EmptyTitle>No watch history</EmptyTitle>
          <EmptyDescription>
            Your watch history will appear here as you watch content.
          </EmptyDescription>
        </EmptyState>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HistoryHeader>
        <div>
          <h1>Watch History</h1>
          <p>Your recently watched content</p>
        </div>
        <ClearButton onClick={handleClearHistory}>
          <FiTrash2 /> Clear History
        </ClearButton>
      </HistoryHeader>

      <ContentGrid>
        {history.map((item, index) => (
          <ContentCard
            key={`${item.id}-${item.type}-${item.watchedAt}`}
            item={item}
            type={item.type}
            index={index}
          />
        ))}
      </ContentGrid>
    </HistoryContainer>
  );
};

export default History;