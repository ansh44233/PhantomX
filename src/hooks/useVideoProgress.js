import { useState, useCallback, useRef } from 'react';

const useVideoProgress = ({
  tmdbId,
  title,
  posterPath,
  type,
  season,
  episode,
  overview
}) => {
  const [progress, setProgress] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const intervalRef = useRef(null);
  const videoElementRef = useRef(null);

  const updateProgress = useCallback((newProgress) => {
    setProgress(Math.min(Math.max(newProgress, 0), 100));

    // Save progress to localStorage
    const progressKey = `${type}-${tmdbId}${season && episode ? `-s${season}e${episode}` : ''}`;
    const progressData = {
      tmdbId,
      title,
      posterPath,
      type,
      season,
      episode,
      overview,
      progress: newProgress,
      timestamp: Date.now()
    };

    try {
      localStorage.setItem(`videoProgress-${progressKey}`, JSON.stringify(progressData));
    } catch (error) {
      console.error('Error saving video progress:', error);
    }
  }, [tmdbId, title, posterPath, type, season, episode, overview]);

  const startTracking = useCallback((videoElement) => {
    if (!videoElement) return;

    videoElementRef.current = videoElement;
    setIsTracking(true);

    const updateProgressFromVideo = () => {
      if (videoElement && videoElement.duration && videoElement.currentTime) {
        const currentProgress = (videoElement.currentTime / videoElement.duration) * 100;
        updateProgress(currentProgress);
      }
    };

    // Update progress every second
    intervalRef.current = setInterval(updateProgressFromVideo, 1000);

    // Also listen for video events
    videoElement.addEventListener('timeupdate', updateProgressFromVideo);
    videoElement.addEventListener('ended', () => {
      updateProgress(100);
      stopTracking();
    });

    return () => {
      videoElement.removeEventListener('timeupdate', updateProgressFromVideo);
      videoElement.removeEventListener('ended', () => {});
    };
  }, [updateProgress]);

  const stopTracking = useCallback(() => {
    setIsTracking(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    videoElementRef.current = null;
  }, []);

  // Load existing progress on mount
  React.useEffect(() => {
    const progressKey = `${type}-${tmdbId}${season && episode ? `-s${season}e${episode}` : ''}`;
    try {
      const savedProgress = localStorage.getItem(`videoProgress-${progressKey}`);
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        setProgress(progressData.progress || 0);
      }
    } catch (error) {
      console.error('Error loading video progress:', error);
    }

    return () => {
      stopTracking();
    };
  }, [tmdbId, type, season, episode, stopTracking]);

  return {
    progress,
    isTracking,
    updateProgress,
    startTracking,
    stopTracking
  };
};

export default useVideoProgress;