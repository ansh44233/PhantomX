import styled from 'styled-components';

export const CategoriesContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: #000000;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const CategoriesHeader = styled.header`
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

export const GenreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

export const GenreCard = styled.div`
  background: ${props => props.active ? '#ffffff' : '#0a0a0a'};
  color: ${props => props.active ? '#000000' : '#ffffff'};
  border: 1px solid ${props => props.active ? '#ffffff' : '#1a1a1a'};
  padding: 1.5rem 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#ffffff' : '#1a1a1a'};
    border-color: ${props => props.active ? '#ffffff' : '#333333'};
    transform: translateY(-2px);
  }
`;

export const ContentSection = styled.section`
  h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1.5rem;
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