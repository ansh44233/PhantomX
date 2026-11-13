import styled from 'styled-components';

export const HeroContainer = styled.section`
  position: relative;
  height: 80vh;
  overflow: hidden;

  @media (max-width: 768px) { height: 60vh; }
`;

export const HeroSlide = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.85) 0%,
    rgba(10, 5, 20, 0.5) 50%,
    rgba(0, 0, 0, 0.75) 100%
  );
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  padding: 0 3rem;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
    max-width: 95%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: #ffffff;
  text-shadow: 0 2px 20px rgba(0,0,0,0.8);

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
`;

export const HeroMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  svg { color: #fbbf24; }

  @media (max-width: 768px) {
    gap: 0.75rem;
    font-size: 0.75rem;
    margin-bottom: 0.75rem;
  }
`;

export const HeroDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2.5rem;
  max-width: 500px;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    margin-bottom: 1rem;
    line-height: 1.5;
    max-width: 100%;
  }
`;

export const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.75rem;
    width: 100%;
  }
`;

export const PlayButton = styled.button`
  background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
  color: #ffffff;
  border: none;
  padding: 0.9rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
  box-shadow: 0 4px 20px rgba(139, 92, 246, 0.35);

  &:hover {
    box-shadow: 0 6px 30px rgba(139, 92, 246, 0.55);
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1.25rem;
    font-size: 0.85rem;
    width: 100%;
    justify-content: center;
  }
`;

export const AddButton = styled.button`
  background: ${props => props.active ? 'rgba(139, 92, 246, 0.3)' : 'transparent'};
  color: #ffffff;
  border: 1px solid ${props => props.active ? '#8b5cf6' : 'rgba(255,255,255,0.5)'};
  padding: 0.9rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(139, 92, 246, 0.25);
    border-color: #8b5cf6;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1.25rem;
    font-size: 0.85rem;
    width: 100%;
    justify-content: center;
  }
`;

export const InfoButton = styled.button`
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.9rem 2rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.25s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.65rem 1.25rem;
    font-size: 0.85rem;
    width: 100%;
    justify-content: center;
  }
`;

export const HeroIndicators = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 3rem;
  display: flex;
  gap: 0.5rem;
  z-index: 3;

  @media (max-width: 768px) { right: 1.5rem; bottom: 1rem; }
`;

export const Indicator = styled.button`
  width: ${props => props.active ? '24px' : '8px'};
  height: 8px;
  border-radius: 4px;
  border: none;
  background: ${props => props.active ? '#8b5cf6' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.active ? '#a78bfa' : 'rgba(255, 255, 255, 0.6)'};
  }
`;

export const TrailerFrame = styled.iframe`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border: none;
  z-index: 1;
  transform: scale(1.25);
  transform-origin: center;
  object-fit: cover;
`;

export const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 2rem;' : 'right: 2rem;'}
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  transition: all 0.25s ease;
  opacity: 0.75;
  backdrop-filter: blur(10px);

  &:hover {
    opacity: 1;
    background: rgba(139, 92, 246, 0.3);
    border-color: rgba(139, 92, 246, 0.6);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }

  @media (max-width: 768px) {
    width: 38px;
    height: 38px;
    font-size: 1.1rem;
    ${props => props.direction === 'left' ? 'left: 0.75rem;' : 'right: 0.75rem;'}
  }
`;

export const VolumeButton = styled.button`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #ffffff;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  transition: all 0.25s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(139, 92, 246, 0.3);
    border-color: rgba(139, 92, 246, 0.6);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
    bottom: 1rem;
  }
`;
