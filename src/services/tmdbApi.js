import axios from 'axios';

const API_KEY = '8265bd1679663a7ea12ac168da84d2e8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// TMDB API Service initialized

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
  timeout: 15000, // 15 second timeout
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'User-Agent': 'VoidStream/1.0.0'
  }
});

// Add response interceptor for error handling
tmdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('TMDB API Error:', error.message);
    return Promise.reject(error);
  }
);

// Test API connection
export const testApiConnection = async () => {
  try {
    const response = await tmdbApi.get('/configuration');
    return true;
  } catch (error) {
    console.error('TMDB API connection failed:', error.message);
    return false;
  }
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/placeholder-image.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getTrendingMovies = () => tmdbApi.get('/trending/movie/week');
export const getTrendingTV = () => tmdbApi.get('/trending/tv/week');
export const getPopularMovies = () => tmdbApi.get('/movie/popular');
export const getPopularTV = () => tmdbApi.get('/tv/popular');
export const getTopRatedMovies = () => tmdbApi.get('/movie/top_rated');
export const getTopRatedTV = () => tmdbApi.get('/tv/top_rated');

export const getMovieDetails = (id) => tmdbApi.get(`/movie/${id}`, {
  params: {
    append_to_response: 'credits,videos,similar,external_ids'
  }
});

export const getTVDetails = (id) => tmdbApi.get(`/tv/${id}`, {
  params: {
    append_to_response: 'credits,videos,similar,external_ids'
  }
});

export const getTVSeasonDetails = (id, season) => tmdbApi.get(`/tv/${id}/season/${season}`);

export const searchMulti = (query) => tmdbApi.get('/search/multi', {
  params: { query }
});

export const getGenres = (type = 'movie') => tmdbApi.get(`/genre/${type}/list`);

export const discoverMovies = (params = {}) => tmdbApi.get('/discover/movie', { params });
export const discoverTV = (params = {}) => tmdbApi.get('/discover/tv', { params });

export default tmdbApi;