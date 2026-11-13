import styled from 'styled-components';

export const CardContainer = styled.div`
  position: relative;
  min-width: 200px;
  width: 200px;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #0a0a0a;
  border: 1px solid rgba(139, 92, 246, 0.1);

  &:hover {
    box-shadow: 0 10px 30px rgba(139, 92, 246, 0.25);
    border-color: rgba(139, 92, 246, 0.3);
  }

  @media (max-width: 768px) {
    min-width: 150px;
    width: 150px;
    height: 225px;
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;

  ${CardContainer}:hover & { transform: scale(1.08); }
`;

export const CardOverlay = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.6) 60%,
    rgba(0, 0, 0, 0.95) 100%
  );
  display: flex;
  align-items: flex-end;
  padding: 1rem;
`;

export const CardContent = styled.div`
  width: 100%;
`;

export const CardTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 600;
  color: white;
  margin-bottom: 0.5rem;
  line-height: 1.2;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) { font-size: 0.8rem; }
`;

export const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.75);
`;

export const CardRating = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: #fbbf24;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const PlayButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.6);
    transform: scale(1.1);
  }
`;

export const ActionButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${props => props.active ? 'linear-gradient(135deg, #8b5cf6, #06b6d4)' : 'rgba(255, 255, 255, 0.15)'};
  border: 1px solid ${props => props.active ? 'transparent' : 'rgba(255, 255, 255, 0.25)'};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${props => props.active ? 'linear-gradient(135deg, #a78bfa, #22d3ee)' : 'rgba(139, 92, 246, 0.3)'};
    border-color: rgba(139, 92, 246, 0.5);
  }
`;

export const TrailerFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  object-fit: cover;
`;
