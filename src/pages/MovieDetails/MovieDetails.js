import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiPlus, FiStar, FiCalendar, FiClock, FiArrowLeft, FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { getMovieDetails, getTVDetails, getTVSeasonDetails, getImageUrl } from '../../services/tmdbApi';
import { addToLibrary, removeFromLibrary, isInLibrary, addToWatchHistory, addToContinueWatching } from '../../services/localStorage';
import { getTrailerUrl } from '../../services/trailerService';
import ContentRow from '../../components/ContentRow/ContentRow';
import discordRPC from '../../services/discordRPC';
import {
  DetailsContainer, BackButton, HeroSection, HeroImage, HeroContent,
  HeroTextContent, HeroOverlay, Title, Meta, MetaItem, Description, ButtonGroup,
  PlayButton, AddButton, InfoSection, InfoGrid, InfoItem,
  InfoLabel, InfoValue, CastSection, CastGrid, CastCard,
  CastImage, CastName, CastRole, SeasonsSection, SeasonCard,
  SeasonImage, SeasonInfo, SeasonTitle, SeasonMeta, TrailerFrame,
  EpisodesSection, EpisodeGrid, EpisodeCard, EpisodeImage,
  EpisodeInfo, EpisodeTitle, EpisodeMeta, EpisodeDescription,
  EpisodeNavigation, EpisodeControls, EpisodeNavButton
} from './MovieDetailsStyles';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mediaType, setMediaType] = useState('movie');
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [inLibrary, setInLibrary] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [isMuted, setIsMuted] = useState(true);

  // Helper function to determine media type from URL
  const getMediaTypeFromPath = (pathname) => {
    console.log('Determining media type from pathname:', pathname);
    
    // Check for hash-based routing first (development)
    if (pathname.includes('#')) {
      const hashPath = pathname.split('#')[1] || pathname;
      console.log('Hash-based path detected:', hashPath);
      if (hashPath.includes('/tv/') || hashPath.includes('/anime/')) {
        return 'tv';
      }
      return 'movie';
    }
    
    // Regular path checking (production)
    if (pathname.includes('/tv/') || pathname.includes('/anime/')) {
      return 'tv';
    }
    
    return 'movie';
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // More robust media type detection
        const currentPath = location.pathname;
        const hashPath = location.hash;
        const fullPath = hashPath || currentPath;
        
        console.log('MovieDetails - Full location:', { 
          pathname: currentPath, 
          hash: hashPath, 
          fullPath,
          search: location.search 
        });
        console.log('MovieDetails - ID from params:', id);
        
        const type = getMediaTypeFromPath(fullPath);
        console.log('MovieDetails - Detected media type:', type);
        setMediaType(type);

        // Validate ID
        if (!id || id === 'undefined' || id === 'null') {
          throw new Error('Invalid content ID');
        }

        // Make API call with better error handling
        console.log('MovieDetails - Making API call for type:', type, 'id:', id);
        let response;
        
        try {
          if (type === 'movie') {
            response = await getMovieDetails(id);
          } else {
            response = await getTVDetails(id);
          }
        } catch (apiError) {
          console.error('API call failed:', apiError);
          
          // If TV call fails, try movie as fallback
          if (type === 'tv') {
            console.log('TV API failed, trying movie API as fallback...');
            try {
              response = await getMovieDetails(id);
              setMediaType('movie');
              console.log('Fallback to movie successful');
            } catch (fallbackError) {
              throw new Error(`Failed to fetch both TV and Movie data: ${apiError.message}`);
            }
          } else {
            throw apiError;
          }
        }
        
        console.log('MovieDetails - API response received:', response?.data?.title || response?.data?.name);
        
        if (!response || !response.data) {
          throw new Error('No data received from API');
        }
        
        setDetails(response.data);
        setInLibrary(isInLibrary(id, mediaType));
        
        // Update Discord RPC safely
        try {
          const title = response.data.title || response.data.name;
          if (title) {
            discordRPC.setMovieDetailsActivity(title);
          }
        } catch (discordError) {
          console.warn('Discord RPC error:', discordError);
        }
        
        // For TV shows, try to fetch first season
        if (mediaType === 'tv' && response.data.seasons && response.data.seasons.length > 0) {
          try {
            const firstSeason = response.data.seasons.find(s => s.season_number > 0);
            if (firstSeason) {
              setSelectedSeason(firstSeason);
              console.log('Fetching season details for season:', firstSeason.season_number);
              const seasonDetails = await getTVSeasonDetails(id, firstSeason.season_number);
              if (seasonDetails && seasonDetails.data && seasonDetails.data.episodes) {
                setEpisodes(seasonDetails.data.episodes);
                console.log('Episodes loaded:', seasonDetails.data.episodes.length);
              }
            }
          } catch (seasonError) {
            console.warn('Error fetching season details:', seasonError);
            // Don't fail the whole component for season errors
          }
        }
        
      } catch (error) {
        console.error('Error fetching details:', error);
        setError(error.message || 'Failed to load details');
      } finally {
        setLoading(false);
      }
    };

    if (id && id !== 'undefined' && id !== 'null') {
      fetchDetails();
    } else {
      setError('Invalid content ID provided');
      setLoading(false);
    }
  }, [id, location.pathname, location.hash]); // Added location.hash to dependencies

  const fetchSeasonEpisodes = async (seasonNumber) => {
    try {
      console.log('Fetching episodes for season:', seasonNumber);
      const seasonDetails = await getTVSeasonDetails(id, seasonNumber);
      setEpisodes(seasonDetails.data.episodes || []);
      console.log('Season episodes loaded:', seasonDetails.data.episodes?.length || 0);
    } catch (error) {
      console.error('Error fetching season episodes:', error);
    }
  };

  const handlePlay = (seasonNum = null, episodeNum = null) => {
    if (!details) return;
    
    addToWatchHistory({ ...details, type: mediaType });
    
    if (mediaType === 'movie') {
      addToContinueWatching({ ...details, type: mediaType }, 0);
      navigate(`/watch/movie/${id}`);
    } else {
      const season = seasonNum || selectedSeason?.season_number || 1;
      const episode = episodeNum || 1;
      addToContinueWatching({ ...details, type: mediaType }, 0, season, episode);
      navigate(`/watch/tv/${id}/${season}/${episode}`);
    }
  };
  
  const getYouTubeEmbedUrl = (key) => {
    return `https://www.youtube.com/embed/${key}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=${key}&iv_load_policy=3&origin=${window.location.origin}`;
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (trailerUrl) {
      // Update trailer URL with new mute state
      const key = trailerUrl.split('/').pop().split('?')[0];
      const newUrl = `https://www.youtube.com/embed/${key}?autoplay=1&mute=${!isMuted ? 1 : 0}&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${key}`;
      setTrailerUrl(newUrl);
    }
  };

  const handleLibraryToggle = () => {
    if (!details) return;
    
    if (inLibrary) {
      removeFromLibrary(id, mediaType);
      setInLibrary(false);
    } else {
      addToLibrary({ ...details, type: mediaType });
      setInLibrary(true);
    }
  };

  const handleSeasonSelect = async (season) => {
    setSelectedSeason(season);
    await fetchSeasonEpisodes(season.season_number);
  };

  const handleEpisodePlay = (episode) => {
    if (!details || !selectedSeason) return;
    
    addToWatchHistory({ ...details, type: mediaType });
    addToContinueWatching({ ...details, type: mediaType }, 0, selectedSeason.season_number, episode.episode_number);
    navigate(`/watch/tv/${id}/${selectedSeason.season_number}/${episode.episode_number}`);
  };

  if (loading) {
    return (
      <DetailsContainer>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>🎬</div>
          <div>Loading {mediaType === 'tv' ? 'TV Show' : 'Movie'} Details...</div>
          <div style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: 0.7 }}>
            ID: {id} | Type: {mediaType}
          </div>
          <div style={{ fontSize: '0.8rem', marginTop: '0.5rem', opacity: 0.5 }}>
            Path: {location.pathname} | Hash: {location.hash}
          </div>
        </div>
      </DetailsContainer>
    );
  }

  if (error) {
    return (
      <DetailsContainer>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.8)',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <div style={{ marginBottom: '1rem', color: '#ff6b6b' }}>Failed to Load Details</div>
          <div style={{ fontSize: '1rem', marginBottom: '2rem', opacity: 0.8 }}>
            {error}
          </div>
          <div style={{ fontSize: '0.9rem', marginBottom: '2rem', opacity: 0.6 }}>
            Type: {mediaType} | ID: {id}
          </div>
          <div style={{ fontSize: '0.8rem', marginBottom: '2rem', opacity: 0.4 }}>
            Path: {location.pathname} | Hash: {location.hash}
          </div>
          <button 
            onClick={() => navigate(-1)}
            style={{
              padding: '0.8rem 1.5rem',
              background: '#6c5ce7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginRight: '1rem'
            }}
          >
            Go Back
          </button>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '0.8rem 1.5rem',
              background: '#333',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Retry
          </button>
        </div>
      </DetailsContainer>
    );
  }

  if (!details) {
    return (
      <DetailsContainer>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
          <div>No Details Available</div>
          <button 
            onClick={() => navigate(-1)}
            style={{
              padding: '0.8rem 1.5rem',
              background: '#6c5ce7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '2rem'
            }}
          >
            Go Back
          </button>
        </div>
      </DetailsContainer>
    );
  }

  // Safely extract data with fallbacks
  const cast = (details && details.credits && details.credits.cast) ? details.credits.cast.slice(0, 12) : [];
  const similar = (details && details.similar && details.similar.results) ? details.similar.results.slice(0, 20) : [];
  const seasons = (details && details.seasons) ? details.seasons.filter(season => season.season_number > 0) : [];
  
  // Basic info with safe access
  const title = details.title || details.name || 'Unknown Title';
  const overview = details.overview || 'No description available.';
  const rating = details.vote_average ? details.vote_average.toFixed(1) : 'N/A';
  const year = details.release_date || details.first_air_date ? 
    new Date(details.release_date || details.first_air_date).getFullYear() : 'N/A';

  return (
    <DetailsContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <BackButton
        onClick={() => navigate(-1)}
        as={motion.button}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiArrowLeft />
      </BackButton>

      <HeroSection bgImage={!showTrailer ? getImageUrl(details.backdrop_path, 'original') : null}>
        {showTrailer && trailerUrl && (
          <>
            <TrailerFrame
              src={trailerUrl}
              title={`${details.title || details.name} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <motion.button
              onClick={toggleMute}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                zIndex: 10,
                background: 'rgba(0, 0, 0, 0.6)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
              }}
            >
              {isMuted ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 9L17 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17 9L23 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.07 5.93C20.9447 7.80528 21.9979 10.3447 21.9979 13C21.9979 15.6553 20.9447 18.1947 19.07 20.07" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </motion.button>
          </>
        )}
        <HeroOverlay />
        <HeroContent>
          <HeroImage
            src={getImageUrl(details.poster_path)}
            alt={details.title || details.name}
          />

          <HeroTextContent>
            <Title>
              {title}
            </Title>

            <Meta>
              <MetaItem>
                <FiStar /> {rating}
              </MetaItem>
              <MetaItem>
                <FiCalendar /> {year}
              </MetaItem>
              {details.runtime && (
                <MetaItem>
                  <FiClock /> {Math.floor(details.runtime / 60)}h {details.runtime % 60}m
                </MetaItem>
              )}
              {details.number_of_seasons && (
                <MetaItem>
                  {details.number_of_seasons} Season{details.number_of_seasons > 1 ? 's' : ''}
                </MetaItem>
              )}
            </Meta>

            <Description>{overview}</Description>

            <ButtonGroup>
              <PlayButton
                onClick={() => handlePlay()}
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiPlay /> Watch Now
              </PlayButton>

              <AddButton
                as={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLibraryToggle}
                active={inLibrary}
              >
                {inLibrary ? <FiCheck /> : <FiPlus />} {inLibrary ? 'In Library' : 'Add to Library'}
              </AddButton>
            </ButtonGroup>
          </HeroTextContent>
        </HeroContent>
      </HeroSection>

      <InfoSection>
        <InfoGrid>
          <InfoItem>
            <InfoLabel>Genres</InfoLabel>
            <InfoValue>
              {details.genres?.map(genre => genre.name).join(', ') || 'N/A'}
            </InfoValue>
          </InfoItem>
          
          <InfoItem>
            <InfoLabel>Status</InfoLabel>
            <InfoValue>{details.status}</InfoValue>
          </InfoItem>
          
          {details.production_companies?.length > 0 && (
            <InfoItem>
              <InfoLabel>Production</InfoLabel>
              <InfoValue>
                {details.production_companies[0].name}
              </InfoValue>
            </InfoItem>
          )}
          
          {details.spoken_languages?.length > 0 && (
            <InfoItem>
              <InfoLabel>Language</InfoLabel>
              <InfoValue>
                {details.spoken_languages[0].english_name}
              </InfoValue>
            </InfoItem>
          )}
        </InfoGrid>
      </InfoSection>

      {seasons.length > 0 && (
        <SeasonsSection>
          <h2>Seasons</h2>
          <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '1rem 0' }}>
            {seasons.map((season) => (
              <SeasonCard
                key={season.id}
                onClick={() => handleSeasonSelect(season)}
                as={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                active={selectedSeason?.id === season.id}
              >
                <SeasonImage
                  src={getImageUrl(season.poster_path)}
                  alt={season.name}
                />
                <SeasonInfo>
                  <SeasonTitle>{season.name}</SeasonTitle>
                  <SeasonMeta>
                    {season.episode_count} episodes • {season.air_date ? new Date(season.air_date).getFullYear() : 'TBA'}
                  </SeasonMeta>
                </SeasonInfo>
              </SeasonCard>
            ))}
          </div>
        </SeasonsSection>
      )}

      {episodes.length > 0 && selectedSeason && (
        <EpisodesSection>
          <EpisodeNavigation>
            <h2>{selectedSeason.name} Episodes</h2>
            <EpisodeControls>
              <EpisodeNavButton
                onClick={() => {
                  const prevSeason = details.seasons?.find(s => s.season_number === selectedSeason.season_number - 1);
                  if (prevSeason) handleSeasonSelect(prevSeason);
                }}
                disabled={selectedSeason.season_number <= 1}
                as={motion.button}
                whileHover={{ scale: selectedSeason.season_number > 1 ? 1.05 : 1 }}
                whileTap={{ scale: selectedSeason.season_number > 1 ? 0.95 : 1 }}
              >
                <FiChevronLeft /> Previous Season
              </EpisodeNavButton>
              <EpisodeNavButton
                onClick={() => {
                  const nextSeason = details.seasons?.find(s => s.season_number === selectedSeason.season_number + 1);
                  if (nextSeason) handleSeasonSelect(nextSeason);
                }}
                disabled={selectedSeason.season_number >= details.number_of_seasons}
                as={motion.button}
                whileHover={{ scale: selectedSeason.season_number < details.number_of_seasons ? 1.05 : 1 }}
                whileTap={{ scale: selectedSeason.season_number < details.number_of_seasons ? 0.95 : 1 }}
              >
                Next Season <FiChevronRight />
              </EpisodeNavButton>
            </EpisodeControls>
          </EpisodeNavigation>
          <EpisodeGrid className="episode-grid">
            {/* Episode Navigation Buttons */}
            {episodes.length > 3 && (
              <>
                <motion.button 
                  className="episode-nav-left"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: 'absolute',
                    left: '0px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    background: 'var(--background-alt)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border-hover)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const container = document.querySelector('.episode-grid');
                    if (container) {
                      container.scrollBy({ left: -300, behavior: 'smooth' });
                    }
                  }}
                >
                  <FiChevronLeft />
                </motion.button>
                <motion.button 
                  className="episode-nav-right"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    position: 'absolute',
                    right: '0px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    background: 'var(--background-alt)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border-hover)',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const container = document.querySelector('.episode-grid');
                    if (container) {
                      container.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                  }}
                >
                  <FiChevronRight />
                </motion.button>
              </>
            )}
            {episodes.map((episode, index) => (
              <EpisodeCard
                key={episode.id}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleEpisodePlay(episode)}
              >
                <EpisodeImage
                  src={getImageUrl(episode.still_path)}
                  alt={episode.name}
                />
                <EpisodeInfo>
                  <EpisodeTitle>
                    {episode.episode_number}. {episode.name}
                  </EpisodeTitle>
                  <EpisodeMeta>
                    {episode.runtime && `${episode.runtime}m`} • 
                    {episode.vote_average > 0 && ` ⭐ ${episode.vote_average.toFixed(1)}`}
                    {episode.air_date && ` • ${new Date(episode.air_date).toLocaleDateString()}`}
                  </EpisodeMeta>
                  <EpisodeDescription>
                    {episode.overview || 'No description available.'}
                  </EpisodeDescription>
                </EpisodeInfo>
              </EpisodeCard>
            ))}
          </EpisodeGrid>
        </EpisodesSection>
      )}

      {cast.length > 0 && (
        <CastSection>
          <h2>Cast</h2>
          <CastGrid>
            {cast.map((person) => (
              <CastCard
                key={person.id}
                as={motion.div}
                whileHover={{ scale: 1.05 }}
              >
                <CastImage
                  src={getImageUrl(person.profile_path)}
                  alt={person.name}
                />
                <CastName>{person.name}</CastName>
                <CastRole>{person.character}</CastRole>
              </CastCard>
            ))}
          </CastGrid>
        </CastSection>
      )}

      {similar.length > 0 && (
        <ContentRow 
          title="More Like This"
          items={similar}
          type={mediaType}
        />
      )}
    </DetailsContainer>
  );
};

export default MovieDetails;
