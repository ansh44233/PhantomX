import styled from 'styled-components';

export const LibraryContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: #000000;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const LibraryHeader = styled.header`
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
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: rgba(102, 126, 234, 0.8);
  margin-bottom: 2rem;
`;

export const EmptyTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
`;

export const EmptyDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.6);
  max-width: 500px;
  margin-bottom: 2rem;
`;

export const EmptyButton = styled.button`
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: #f0f0f0;
    box-shadow: 0 6px 30px rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;
export
 const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
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