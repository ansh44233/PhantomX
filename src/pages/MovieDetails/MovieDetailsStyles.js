import styled from 'styled-components';

export const DetailsContainer = styled.div`
  min-height: 100vh;
  background: var(--background);
  position: relative;
  transition: background-color 0.3s ease;
`;

export const BackButton = styled.button`
  position: fixed;
  top: 2rem;
  left: 130px;
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: var(--background);
  border: 1px solid var(--border-hover);
  color: var(--foreground);
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  transition: all 0.3s ease;

  &:hover {
    background: var(--background-light);
    border-color: var(--border-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(var(--foreground), 0.1);
  }

  @media (max-width: 768px) {
    left: 1rem;
    top: 1rem;
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }

  @media (max-width: 480px) {
    left: 0.75rem;
    top: 0.75rem;
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
`;

export const HeroSection = styled.section`
  height: 70vh;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 3rem;

  @media (max-width: 1024px) {
    padding: 0 2.5rem;
  }

  @media (max-width: 768px) {
    height: auto;
    min-height: 65vh;
    padding: 0 1.5rem;
    align-items: flex-start;
    padding-top: 4rem;
    padding-bottom: 2rem;
  }

  @media (max-width: 480px) {
    height: auto;
    min-height: 60vh;
    padding: 0 1rem;
    padding-top: 3rem;
    padding-bottom: 1.5rem;
  }
`;

export const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.9) 100%
  );
  transition: background 0.3s ease;
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 1.5rem;
    width: 100%;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0;
  }
`;

export const HeroImage = styled.img`
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;

  @media (max-width: 1024px) {
    width: 250px;
    height: 375px;
  }

  @media (max-width: 768px) {
    width: 180px;
    height: 270px;
    border-radius: 8px;
    order: -1;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 225px;
  }
`;

export const HeroTextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    text-align: center;
    align-items: center;
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  line-height: 1.1;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 0.75rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
`;

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);

  @media (max-width: 480px) {
    font-size: 0.8rem;
    gap: 0.25rem;
  }
`;

export const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  max-width: 600px;

  @media (max-width: 1024px) {
    font-size: 1rem;
    max-width: 500px;
  }

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-bottom: 1.25rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const PlayButton = styled.button`
  background: #ffffff;
  color: #000000;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
  min-height: 48px;

  &:hover {
    background: #f0f0f0;
    box-shadow: 0 6px 30px rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    justify-content: center;
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
`;

export const AddButton = styled.button`
  background: ${props => props.active ? '#ffffff' : 'transparent'};
  color: ${props => props.active ? '#000000' : '#ffffff'};
  border: 1px solid #ffffff;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  min-height: 48px;

  &:hover {
    background: ${props => props.active ? '#f0f0f0' : '#ffffff'};
    color: #000000;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.75rem;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 280px;
    justify-content: center;
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }
`;

export const InfoSection = styled.section`
  padding: 3rem;

  @media (max-width: 1024px) {
    padding: 2.5rem;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 800px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const InfoItem = styled.div`
  @media (max-width: 480px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const InfoLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
  font-weight: 500;

  @media (max-width: 480px) {
    margin-bottom: 0;
    font-size: 0.85rem;
  }
`;

export const InfoValue = styled.div`
  font-size: 1rem;
  color: #ffffff;
  font-weight: 600;
  word-wrap: break-word;

  @media (max-width: 480px) {
    font-size: 0.9rem;
    text-align: right;
    flex: 1;
  }
`;

export const CastSection = styled.section`
  padding: 0 3rem 3rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1.5rem;
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
  }

  @media (max-width: 1024px) {
    padding: 0 2.5rem 2.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 1.5rem 2rem;
  }

  @media (max-width: 480px) {
    padding: 0 1rem 1.5rem;

    h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
  }
`;

export const CastGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
  }
`;

export const CastCard = styled.div`
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  min-height: 48px;
`;

export const CastImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    height: 150px;
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    height: 120px;
    border-radius: 4px;
  }
`;

export const CastName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.25rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export const CastRole = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const SeasonsSection = styled.section`
  padding: 0 3rem 3rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1.5rem;
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
  }

  @media (max-width: 1024px) {
    padding: 0 2.5rem 2.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 1.5rem 2rem;

    h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0 1rem 1.5rem;

    h2 {
      font-size: 1.1rem;
      margin-bottom: 0.75rem;
    }
  }
`;

export const SeasonCard = styled.div`
  min-width: 200px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.active ? '#ffffff' : 'transparent'};
  border-radius: 8px;
  padding: ${props => props.active ? '4px' : '0'};
  min-height: 48px;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    min-width: 160px;
  }

  @media (max-width: 480px) {
    min-width: 140px;
  }
`;

export const SeasonImage = styled.img`
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
  background: rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    width: 160px;
    height: 240px;
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    width: 140px;
    height: 210px;
    border-radius: 4px;
  }
`;

export const SeasonInfo = styled.div`
  padding: 0 0.25rem;
`;

export const SeasonTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.25rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const SeasonMeta = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export const TrailerFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 133%;
  height: 100%;
  border: none;
  z-index: 1;
  object-fit: cover;
  aspect-ratio: 16/9;
`;

export const EpisodesSection = styled.section`
  padding: 0 3rem 3rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 1.5rem;
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
  }

  @media (max-width: 1024px) {
    padding: 0 2.5rem 2.5rem;
  }

  @media (max-width: 768px) {
    padding: 0 1.5rem 2rem;

    h2 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0 1rem 1.5rem;

    h2 {
      font-size: 1.1rem;
      margin-bottom: 0.75rem;
    }
  }
`;

export const EpisodeGrid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5rem;
  position: relative;
  overflow-x: auto;
  padding: 1rem 0.5rem;
  scroll-behavior: smooth;
  scrollbar-width: thin;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.75rem 0.25rem;
  }

  @media (max-width: 480px) {
    gap: 0.75rem;
    padding: 0.5rem 0.125rem;
  }
`;

export const EpisodeCard = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 350px;
  max-width: 350px;
  flex-shrink: 0;
  min-height: 48px;

  &:hover {
    border-color: var(--border-hover);
    transform: translateY(-2px);
    background: var(--background-light);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    min-width: 280px;
    max-width: 280px;
    border-radius: 6px;
  }

  @media (max-width: 480px) {
    min-width: 240px;
    max-width: 240px;
    border-radius: 4px;
  }
`;

export const EpisodeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background: #1a1a1a;

  @media (max-width: 768px) {
    height: 160px;
  }

  @media (max-width: 480px) {
    height: 140px;
  }
`;

export const EpisodeInfo = styled.div`
  padding: 1rem;

  @media (max-width: 480px) {
    padding: 0.75rem;
  }
`;

export const EpisodeTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 0.5rem;
  line-height: 1.3;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const EpisodeMeta = styled.div`
  font-size: 0.8rem;
  color: #666666;
  margin-bottom: 0.75rem;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
`;

export const EpisodeDescription = styled.p`
  font-size: 0.85rem;
  line-height: 1.4;
  color: #cccccc;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 1.3;
    -webkit-line-clamp: 2;
  }
`;

export const EpisodeNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;

  h2 {
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
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
`;

export const EpisodeControls = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

export const EpisodeNavButton = styled.button`
  background: ${props => props.disabled ? '#333333' : '#ffffff'};
  color: ${props => props.disabled ? '#666666' : '#000000'};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  min-height: 44px;

  &:hover {
    background: ${props => props.disabled ? '#333333' : '#f0f0f0'};
  }

  @media (max-width: 768px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.85rem;
    min-height: 40px;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    min-height: 36px;
    border-radius: 4px;
  }
`;