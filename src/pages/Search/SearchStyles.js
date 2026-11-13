import styled from 'styled-components';

export const SearchContainer = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: #000000;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SearchHeader = styled.header`
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

export const SearchInput = styled.div`
  position: relative;
  max-width: 600px;
  
  svg {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.5);
    font-size: 1.2rem;
  }
  
  input {
    width: 100%;
    padding: 1rem 1rem 1rem 3.5rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.05);
    color: white;
    font-size: 1rem;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
    
    &:focus {
      outline: none;
      border-color: rgba(102, 126, 234, 0.5);
      box-shadow: 0 0 20px rgba(102, 126, 234, 0.2);
      background: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const SearchResults = styled.section``;

export const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

export const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.6);
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: white;
  }
  
  p {
    font-size: 1rem;
    line-height: 1.5;
  }
`;