import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import ContentCard from '../ContentCard/ContentCard';
import {
  RowContainer, RowHeader, RowTitle, RowContent,
  ScrollButton, CardsContainer
} from './ContentRowStyles';

const ContentRow = ({ title, items, type }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  if (!items || items.length === 0) return null;

  return (
    <RowContainer
      as={motion.section}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <RowHeader>
        <RowTitle>{title}</RowTitle>
      </RowHeader>

      <RowContent>
        <ScrollButton
          direction="left"
          onClick={() => scroll('left')}
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronLeft />
        </ScrollButton>

        <CardsContainer ref={scrollRef}>
          {items.map((item, index) => (
            <ContentCard
              key={`${item.id}-${index}`}
              item={item}
              type={item.type || (type === 'mixed' ? (item.title ? 'movie' : 'tv') : type)}
              index={index}
            />
          ))}
        </CardsContainer>

        <ScrollButton
          direction="right"
          onClick={() => scroll('right')}
          as={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiChevronRight />
        </ScrollButton>
      </RowContent>
    </RowContainer>
  );
};

export default ContentRow;