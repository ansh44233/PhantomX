import styled from 'styled-components';

export const RowContainer = styled.section`
  margin-bottom: 3rem;
  position: relative;
`;

export const RowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
`;

export const RowTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 50px;
    height: 3px;
    background: #ffffff;
    border-radius: 2px;
  }
`;

export const RowContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: -20px;' : 'right: -20px;'}
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: #000000;
  border: 1px solid #333333;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
  
  &:hover {
    background: #1a1a1a;
    border-color: #555555;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem;
  width: 100%;
  
  &::-webkit-scrollbar {
    display: none;
  }
  
  -ms-overflow-style: none;
  scrollbar-width: none;
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
`;