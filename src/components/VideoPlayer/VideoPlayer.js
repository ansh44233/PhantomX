import React, { useState, useRef, useEffect } from "react";
import { FiServer, FiPlay, FiAlertCircle } from "react-icons/fi";
import styled from "styled-components";
import { getStreamingUrl } from "../../services/streamingApi";

const VideoPlayerContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const PlayerCard = styled.div`
  background: ${props => props.theme.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const VideoWrapper = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: #000;
  width: 100%;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10;
`;

const ErrorOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10;
  text-align: center;
  padding: 20px;
`;

const VideoFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  display: ${props => props.$hidden ? 'none' : 'block'};
`;

const ServerSection = styled.div`
  background: ${props => props.theme.cardBackground};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ServerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
    color: ${props => props.theme.text};
  }
  
  svg {
    color: ${props => props.theme.primary};
  }
`;

const WarningMessage = styled.div`
  background: rgba(255, 193, 7, 0.1);
  border: 1px solid rgba(255, 193, 7, 0.5);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  text-align: center;
  color: #ffc107;
  font-weight: 500;
`;

const ServerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 8px;
  }
`;

const ServerButton = styled.button`
  background: ${props => props.$active ? props.theme.primary : props.theme.cardHover};
  color: ${props => props.$active ? '#fff' : props.theme.text};
  border: 2px solid ${props => props.$active ? props.theme.primary : 'transparent'};
  border-radius: 8px;
  padding: 12px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-height: 60px;

  &:hover {
    background: ${props => props.$active ? props.theme.primary : props.theme.cardHover};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    min-height: 50px;
    padding: 10px 12px;

    span {
      font-size: 0.8rem;
    }

    small {
      font-size: 0.7rem;
    }
  }

  span {
    font-weight: 600;
    font-size: 0.9rem;
  }

  small {
    font-size: 0.75rem;
    opacity: 0.8;
  }
`;

const Spinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 3px solid ${props => props.theme.primary};
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const VideoPlayer = ({ tmdbId, imdbId, type, season, episode, title, posterPath = '', overview = '' }) => {
  const [currentSource, setCurrentSource] = useState('void');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef(null);

  // Clean the tmdbId to ensure no hash or extra characters
  const cleanTmdbId = tmdbId ? tmdbId.replace('#', '').trim() : '';
  const cleanImdbId = imdbId ? imdbId.replace('#', '').trim() : '';

  const getStreamURL = () => {
    // Use the streamingApi service to get the URL
    return getStreamingUrl(currentSource, type, cleanTmdbId, cleanImdbId, season, episode);
  };

  const handleSourceChange = (source) => {
    setCurrentSource(source);
    setIsLoading(true);
    setHasError(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const getSourceDisplayName = (source) => {
    const names = {
      'void': 'Void/Ads Free',
      'vidfast': 'VidFast',
      'embedapi': 'Gojo',
      'eren': 'Eren',
      'superembed': 'Aizen',
      'sukuna': 'Sukuna',
      'banki': 'Banki Hindi'
    };
    return names[source] || source;
  };

  const getSourceQuality = (source) => {
    const qualities = {
      'void': '1080p',
      'vidfast': 'FHD',
      'embedapi': 'HD',
      'eren': '1080p',
      'superembed': '720p',
      'sukuna': '1080p',
      'banki': 'HD'
    };
    return qualities[source] || 'HD';
  };

  const availableSources = type === 'movie' 
    ? ['void', 'vidfast', 'embedapi', 'eren', 'superembed', 'sukuna', 'banki']
    : ['void', 'vidfast', 'embedapi', 'eren', 'superembed', 'sukuna'];

  const streamUrl = getStreamURL();

  return (
    <VideoPlayerContainer>
      {/* Player */}
      <PlayerCard>
        <VideoWrapper>
          {isLoading && (
            <LoadingOverlay>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <Spinner />
                <span style={{ color: '#fff' }}>Loading {getSourceDisplayName(currentSource)}...</span>
              </div>
            </LoadingOverlay>
          )}

          {hasError && (
            <ErrorOverlay>
              <FiAlertCircle size={48} color="#ff4444" />
              <h3 style={{ color: '#fff', marginTop: '16px' }}>Failed to load {getSourceDisplayName(currentSource)}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '8px' }}>Try switching to another server</p>
            </ErrorOverlay>
          )}

          {streamUrl ? (
            <VideoFrame
              ref={iframeRef}
              src={streamUrl}
              title={`${title} - ${getSourceDisplayName(currentSource)}`}
              allowFullScreen
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              $hidden={isLoading || hasError}
            />
          ) : (
            <ErrorOverlay>
              <FiAlertCircle size={48} color="#ff4444" />
              <h3 style={{ color: '#fff', marginTop: '16px' }}>No streaming source available</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginTop: '8px' }}>
                TMDB ID: {cleanTmdbId || 'Not provided'}<br/>
                IMDB ID: {cleanImdbId || 'Not provided'}
              </p>
            </ErrorOverlay>
          )}
        </VideoWrapper>
      </PlayerCard>

      {/* Server Selection */}
      <ServerSection>
        <ServerHeader>
          <FiServer size={20} />
          <h3>Select Server</h3>
        </ServerHeader>

        <WarningMessage>
          If the content is wrong or missing, try switching servers (Sukuna Recommended for hindi dub)
        </WarningMessage>

        <ServerGrid>
          {availableSources.map((source) => (
            <ServerButton
              key={source}
              $active={source === currentSource}
              onClick={() => handleSourceChange(source)}
            >
              <FiPlay size={16} />
              <span>{getSourceDisplayName(source)}</span>
              <small>{getSourceQuality(source)}</small>
            </ServerButton>
          ))}
        </ServerGrid>
      </ServerSection>
    </VideoPlayerContainer>
  );
};

export default VideoPlayer;
