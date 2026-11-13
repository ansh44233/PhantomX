// YouTube trailer service
export const getTrailerUrl = (videos) => {
  if (!videos || !videos.results) return null;
  
  // Find trailer or teaser
  const trailer = videos.results.find(video => 
    video.site === 'YouTube' && 
    (video.type === 'Trailer' || video.type === 'Teaser')
  );
  
  if (trailer) {
    return `https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${trailer.key}`;
  }
  
  return null;
};

export const getTrailerThumbnail = (videos) => {
  if (!videos || !videos.results) return null;
  
  const trailer = videos.results.find(video => 
    video.site === 'YouTube' && 
    (video.type === 'Trailer' || video.type === 'Teaser')
  );
  
  if (trailer) {
    return `https://img.youtube.com/vi/${trailer.key}/maxresdefault.jpg`;
  }
  
  return null;
};

export const createTrailerIframe = (videoKey, autoplay = false) => {
  if (!videoKey) return null;
  
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
    mute: '1',
    controls: '0',
    showinfo: '0',
    rel: '0',
    modestbranding: '1',
    loop: '1',
    playlist: videoKey
  });
  
  return `https://www.youtube.com/embed/${videoKey}?${params.toString()}`;
};