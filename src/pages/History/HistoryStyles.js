import styled from 'styled-components';

export const HistoryContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: #000000;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const HistoryHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.5rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: #666666;
  }
`;

export const ClearButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 1px solid #333333;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1a1a1a;
    border-color: #555555;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 2rem;
  min-height: 50vh;
`;

export const EmptyIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #666666;
  margin-bottom: 2rem;
`;

export const EmptyTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
`;

export const EmptyDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666666;
  max-width: 500px;
`;