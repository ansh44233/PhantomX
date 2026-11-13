const formatImdbId = (imdbId) => {
  if (!imdbId) return '';
  return imdbId.startsWith('tt') ? imdbId : `tt${imdbId}`;
};

export const getStreamingUrl = (source, type, tmdbId, imdbId, season, episode) => {
  switch (source) {
    case 'embedapi':
      if (type === 'movie') {
        return `https://player.embed-api.stream/?id=${tmdbId}&type=movie`;
      } else {
        return `https://player.embed-api.stream/?id=${tmdbId}&s=${season}&e=${episode}`;
      }

    case 'eren':
      if (type === 'movie') {
        return `https://letsembed.cc/embed/movie/?id=${tmdbId}`;
      } else if (type === 'tv') {
        return `https://letsembed.cc/embed/tv/?id=${tmdbId}/${season}/${episode}`;
      } else if (type === 'anime') {
        return `https://letsembed.cc/embed/anime/?id=${tmdbId}/${season}/${episode}`;
      }

    case 'superembed':
      if (type === 'movie') {
        return imdbId
          ? `https://multiembed.mov/directstream.php?video_id=${formatImdbId(imdbId)}`
          : `https://multiembed.mov/directstream.php?video_id=${tmdbId}&tmdb=1`;
      } else {
        return imdbId
          ? `https://multiembed.mov/directstream.php?video_id=${formatImdbId(imdbId)}&s=${season}&e=${episode}`
          : `https://multiembed.mov/directstream.php?video_id=${tmdbId}&tmdb=1&s=${season}&e=${episode}`;
      }

    case 'sukuna':
      if (type === 'movie') {
        return imdbId
          ? `https://vidapi.xyz/embed/movie/${formatImdbId(imdbId)}`
          : `https://vidapi.xyz/embed/movie/${tmdbId}`;
      } else if (type === 'tv') {
        return imdbId
          ? `https://vidapi.xyz/embed/tv/${formatImdbId(imdbId)}&s=${season}&e=${episode}`
          : `https://vidapi.xyz/embed/tv/${tmdbId}&s=${season}&e=${episode}`;
      } else if (type === 'anime') {
        // Example format from user input: https://vidapi.xyz/embed/anime/one-piece-episode-1
        // Since we don't have the anime name in the required format, we'll use the tmdbId
        return `https://vidapi.xyz/embed/anime/${tmdbId}-episode-${episode}`;
      }

    case 'banki':
      if (type === 'movie') {
        return imdbId
          ? `https://vembed.stream/play/${formatImdbId(imdbId)}`
          : `https://vembed.stream/play/${tmdbId}`;
      } else {
        // This source is only for movies, return empty for TV shows
        return '';
      }

    case 'void':
      if (type === 'movie') {
        return imdbId
          ? `https://vidfast.to/embed/movie/${formatImdbId(imdbId)}`
          : `https://vidfast.to/embed/movie/${tmdbId}`;
      } else if (type === 'tv' || type === 'anime') {
        return imdbId
          ? `https://vidfast.to/embed/tv/${formatImdbId(imdbId)}/${season}/${episode}`
          : `https://vidfast.to/embed/tv/${tmdbId}/${season}/${episode}`;
      }

    default:
      return '';
  }
};

export const streamingSources = [
  { id: 'void', name: 'Void', quality: 'FHD' },
  { id: 'vidfast', name: 'VidFast', quality: 'FHD' },
  { id: 'embedapi', name: 'EmbedAPI', quality: 'HD' },
  { id: 'eren', name: 'Eren', quality: 'HD' },
  { id: 'superembed', name: 'SuperEmbed', quality: 'FHD' },
  { id: 'sukuna', name: 'Sukuna', quality: 'HD' },
  { id: 'banki', name: 'Banki', quality: 'HD', movieOnly: true }
];