import styled from 'styled-components';

export const PlayerContainer = styled.div`
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
`;

export const PlayerHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 10;

  @media (max-width: 768px) {
    padding: 0.75rem;
    flex-direction: column;
    gap: 0.75rem;
    align-items: stretch;
  }

  @media (max-width: 480px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }
`;

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #000000;
  border: 1px solid #333333;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #1a1a1a;
    border-color: #555555;
  }

  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    border-radius: 10px;
  }

  @media (max-width: 480px) {
    width: 48px;
    height: 48px;
    font-size: 1.4rem;
  }
`;

export const PlayerTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  color: #ffffff;
  flex: 1;
  text-align: center;
  margin: 0 2rem;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    margin: 0;
    font-size: 1rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin: 0 0.5rem;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
  }
`;

export const SourceSelector = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const SourceButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #333333;
  background: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#000000' : '#ffffff'};
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  min-width: 60px;

  span {
    font-size: 0.7rem;
    opacity: 0.8;
  }

  &:hover {
    background: ${props => props.active ? '#f0f0f0' : '#1a1a1a'};
    border-color: #555555;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.85rem;
    min-width: 70px;
    min-height: 48px;
    justify-content: center;

    span {
      font-size: 0.75rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    min-width: 65px;
    min-height: 44px;
  }
`;

export const PlayerWrapper = styled.div`
  flex: 1;
  position: relative;
  background: #000;
`;

export const PlayerFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  background: #000;
`;

export const ControlsOverlay = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${PlayerWrapper}:hover & {
    opacity: 1;
  }

  @media (max-width: 768px) {
    opacity: 0.8;
    top: 0.75rem;
    right: 0.75rem;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    opacity: 1;
    top: 0.5rem;
    right: 0.5rem;
    gap: 1rem;
  }
`;

export const SettingsButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    border-color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    width: 52px;
    height: 52px;
    font-size: 1.2rem;
  }
`;

export const FullscreenButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    border-color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    width: 52px;
    height: 52px;
    font-size: 1.2rem;
  }
`;

export const ServerSwitchMessage = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  font-size: 0.9rem;
  text-align: center;
  z-index: 5;
  
  strong {
    color: #ffd700;
    font-weight: 600;
  }
  
  @media (max-width: 768px) {
    bottom: 3.5rem;
    left: 1rem;
    right: 1rem;
    transform: none;
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    bottom: 4rem;
    padding: 0.6rem 1.2rem;
  }
`;