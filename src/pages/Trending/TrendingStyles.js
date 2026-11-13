import styled from 'styled-components';

export const TrendingContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: #000000;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const TrendingHeader = styled.header`
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  
  p {
    font-size: 1.1rem;
    color: #666666;
  }
`;

export const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid #1a1a1a;
  padding-bottom: 1rem;
`;

export const FilterTab = styled.button`
  background: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#000000' : '#ffffff'};
  border: 1px solid ${props => props.active ? '#ffffff' : '#333333'};
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#ffffff' : '#1a1a1a'};
    border-color: ${props => props.active ? '#ffffff' : '#555555'};
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

export const LoadingState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  color: #666666;
`;