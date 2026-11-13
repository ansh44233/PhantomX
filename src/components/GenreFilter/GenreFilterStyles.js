import styled from 'styled-components';

export const FilterContainer = styled.div`
  margin-bottom: 2rem;
  padding: 1rem 0;
`;

export const FilterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
`;

export const GenreList = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
`;

export const GenreButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #333333;
  background: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#000000' : '#ffffff'};
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.active ? '#f0f0f0' : '#1a1a1a'};
    border-color: #555555;
    transform: translateY(-1px);
  }
`;