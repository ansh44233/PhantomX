import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TitleBar from './components/TitleBar/TitleBar';
import MobileHeader from './components/MobileHeader/MobileHeader';
import MobileNavigation from './components/MobileNavigation/MobileNavigation';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Player from './pages/Player/Player';
import Search from './pages/Search/Search';
import Library from './pages/Library/Library';
import Settings from './pages/Settings/Settings';
import ContinueWatching from './pages/ContinueWatching/ContinueWatching';
import Trending from './pages/Trending/Trending';
import TopRated from './pages/TopRated/TopRated';
import Categories from './pages/Categories/Categories';
import Music from './pages/Music/Music';
import History from './pages/History/History';
import Favorites from './pages/Favorites/Favorites';
import { AppContainer, MainContent } from './styles/AppStyles';
import { darkTheme } from './styles/theme';
import discordRPC from './services/discordRPC';

// Component to handle Discord RPC updates based on route changes
function DiscordRPCHandler() {
  const location = useLocation();

  useEffect(() => {
    // Safely handle Discord RPC updates
    try {
      // For HashRouter, we need to use location.pathname (not hash)
      const path = location.pathname;
      
      // Update Discord RPC based on current route
      if (path === '/') {
        discordRPC.setHomeActivity();
      } else if (path === '/search') {
        discordRPC.setSearchActivity();
      } else if (path === '/library') {
        discordRPC.setLibraryActivity();
      } else if (path === '/favorites') {
        discordRPC.setFavoritesActivity();
      } else if (path === '/history') {
        discordRPC.setHistoryActivity();
      } else if (path === '/categories') {
        discordRPC.setCategoriesActivity();
      } else if (path === '/trending') {
        discordRPC.setTrendingActivity();
      } else if (path === '/top-rated') {
        discordRPC.setTopRatedActivity();
      } else if (path === '/continue') {
        discordRPC.setContinueWatchingActivity();
      } else if (path === '/settings') {
        discordRPC.setSettingsActivity();
      } else if (path === '/music') {
        discordRPC.updateActivity('Listening to Music', 'Enjoying VoidStream Music');
      } else if (path.startsWith('/movie/') || path.startsWith('/tv/') || path.startsWith('/anime/')) {
        discordRPC.updateActivity('Viewing Details', 'Exploring content');
      } else if (path.startsWith('/player/')) {
        discordRPC.updateActivity('Watching Content', 'Enjoying VoidStream');
      }
    } catch (error) {
      // Silently handle Discord RPC errors to prevent app crashes
      console.warn('Discord RPC update failed:', error);
    }
  }, [location]);

  return null;
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Initialize Discord RPC on app start (safely)
    try {
      discordRPC.setHomeActivity();
    } catch (error) {
      console.warn('Discord RPC initialization failed:', error);
    }

    // Add global error handler for unhandled promise rejections
    const handleUnhandledRejection = (event) => {
      console.warn('Unhandled promise rejection:', event.reason);
      // Prevent the default browser behavior of logging to console
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
  
  return (
    <ErrorBoundary>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <GlobalStyle />
          <TitleBar />
          <MobileHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <DiscordRPCHandler />
          <AppContainer>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <MainContent>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* Movie routes */}
                  <Route path="/movie/:id" element={<MovieDetails key="movie" />} />
                  {/* TV/Series routes */}
                  <Route path="/tv/:id" element={<MovieDetails key="tv" />} />
                  <Route path="/anime/:id" element={<MovieDetails key="anime" />} />
                  {/* Watch routes (new) */}
                  <Route path="/watch/movie/:id" element={<Player />} />
                  <Route path="/watch/tv/:id/:season/:episode" element={<Player />} />
                  <Route path="/watch/anime/:id/:season/:episode" element={<Player />} />
                  {/* Player routes (legacy) */}
                  <Route path="/player/movie/:id" element={<Player />} />
                  <Route path="/player/tv/:id/:season/:episode" element={<Player />} />
                  <Route path="/player/anime/:id/:season/:episode" element={<Player />} />
                  {/* Legacy player route for backwards compatibility */}
                  <Route path="/player/:type/:id" element={<Player />} />
                  <Route path="/player/:type/:id/:season/:episode" element={<Player />} />
                  {/* Other routes */}
                  <Route path="/search" element={<Search />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/continue" element={<ContinueWatching />} />
                  <Route path="/trending" element={<Trending />} />
                  <Route path="/top-rated" element={<TopRated />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/music" element={<Music />} />
                  {/* Catch-all route for 404s */}
                  <Route path="*" element={
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100vh',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <h1>Page Not Found</h1>
                      <p>The page you're looking for doesn't exist.</p>
                    </div>
                  } />
                </Routes>
              </ErrorBoundary>
            </MainContent>
          </AppContainer>
          <MobileNavigation />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
