import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMonitor, FiPlay, FiGlobe, FiEye, FiBell, FiShield, 
  FiZap, FiCode, FiRefreshCw, FiDownload, FiVolume2,
  FiType, FiLayout, FiSettings as FiSettingsIcon, FiPlus, FiTrash2
} from 'react-icons/fi';
import { getSettings, updateSettings, resetSettings } from '../../services/localStorage';
import {
  SettingsContainer, SettingsHeader, SettingsContent, SettingsSection,
  SectionTitle, SectionIcon, SettingItem, SettingLabel, SettingDescription,
  ToggleSwitch, SelectInput, SliderInput, ColorInput, ResetButton,
  SettingsGrid, SettingGroup
} from './SettingsStyles';

const Settings = () => {
  const [settings, setSettings] = useState(getSettings());
  const [activeSection, setActiveSection] = useState('appearance');

  useEffect(() => {
    updateSettings(settings);
    
    // Apply theme changes immediately
    if (settings.theme === 'light') {
      document.body.className = 'light-theme';
    } else {
      document.body.className = '';
    }
    
    // Apply font size
    document.documentElement.style.setProperty('--font-size', getFontSizeValue(settings.fontSize));
    
    // Apply font family
    document.documentElement.style.setProperty('--font-family', settings.fontFamily);
    
    // Apply border radius
    document.documentElement.style.setProperty('--border-radius', getBorderRadiusValue(settings.borderRadius));
    
    // Apply accent color
    document.documentElement.style.setProperty('--accent-color', settings.accentColor);
    
    // Apply animations
    document.documentElement.style.setProperty('--transition-speed', settings.animations ? '0.3s' : '0s');
    
    // Apply transparency
    document.documentElement.style.setProperty('--transparency', settings.transparency ? '0.8' : '1');
    
    // Apply compact mode
    document.documentElement.style.setProperty('--spacing', settings.compactMode ? '0.5rem' : '1rem');
  }, [settings]);
  
  // Helper functions for CSS values
  const getFontSizeValue = (size) => {
    switch(size) {
      case 'small': return '0.9rem';
      case 'medium': return '1rem';
      case 'large': return '1.1rem';
      case 'extra-large': return '1.2rem';
      default: return '1rem';
    }
  };
  
  const getBorderRadiusValue = (size) => {
    switch(size) {
      case 'none': return '0';
      case 'small': return '4px';
      case 'medium': return '8px';
      case 'large': return '12px';
      default: return '8px';
    }
  };

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      const defaultSettings = resetSettings();
      setSettings(defaultSettings);
    }
  };

  const sections = [
    { id: 'appearance', title: 'Appearance', icon: FiMonitor },
    { id: 'player', title: 'Player', icon: FiPlay },
    { id: 'content', title: 'Content', icon: FiGlobe },
    { id: 'interface', title: 'Interface', icon: FiLayout },
    { id: 'adblocking', title: 'Ad Blocking', icon: FiShield },
    { id: 'notifications', title: 'Notifications', icon: FiBell },
    { id: 'privacy', title: 'Privacy', icon: FiEye },
    { id: 'advanced', title: 'Advanced', icon: FiZap },
    { id: 'experimental', title: 'Experimental', icon: FiCode }
  ];

  const renderAppearanceSettings = () => (
    <SettingsGrid>
      <SettingItem>
        <SettingLabel>Theme</SettingLabel>
        <SettingDescription>Choose your preferred theme</SettingDescription>
        <SelectInput
          value={settings.theme}
          onChange={(e) => {
            const newTheme = e.target.value;
            handleSettingChange('theme', newTheme);
            localStorage.setItem('theme', newTheme);
          }}
        >
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </SelectInput>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Accent Color</SettingLabel>
        <SettingDescription>Customize the accent color</SettingDescription>
        <ColorInput
          type="color"
          value={settings.accentColor}
          onChange={(e) => handleSettingChange('accentColor', e.target.value)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Font Size</SettingLabel>
        <SettingDescription>Adjust text size throughout the app</SettingDescription>
        <SelectInput
          value={settings.fontSize}
          onChange={(e) => handleSettingChange('fontSize', e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="extra-large">Extra Large</option>
        </SelectInput>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Font Family</SettingLabel>
        <SettingDescription>Choose your preferred font</SettingDescription>
        <SelectInput
          value={settings.fontFamily}
          onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
        >
          <option value="Inter">Inter</option>
          <option value="Roboto">Roboto</option>
          <option value="Open Sans">Open Sans</option>
          <option value="Poppins">Poppins</option>
          <option value="Montserrat">Montserrat</option>
        </SelectInput>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Border Radius</SettingLabel>
        <SettingDescription>Adjust corner roundness</SettingDescription>
        <SelectInput
          value={settings.borderRadius}
          onChange={(e) => handleSettingChange('borderRadius', e.target.value)}
        >
          <option value="none">None</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </SelectInput>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Animations</SettingLabel>
        <SettingDescription>Enable smooth animations and transitions</SettingDescription>
        <ToggleSwitch
          checked={settings.animations}
          onChange={(e) => handleSettingChange('animations', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Transparency Effects</SettingLabel>
        <SettingDescription>Enable glass morphism and blur effects</SettingDescription>
        <ToggleSwitch
          checked={settings.transparency}
          onChange={(e) => handleSettingChange('transparency', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Compact Mode</SettingLabel>
        <SettingDescription>Reduce spacing for more content</SettingDescription>
        <ToggleSwitch
          checked={settings.compactMode}
          onChange={(e) => handleSettingChange('compactMode', e.target.checked)}
        />
      </SettingItem>
    </SettingsGrid>
  );

  const renderPlayerSettings = () => (
    <SettingsGrid>
      <SettingItem>
        <SettingLabel>Autoplay</SettingLabel>
        <SettingDescription>Automatically start playing content</SettingDescription>
        <ToggleSwitch
          checked={settings.autoplay}
          onChange={(e) => handleSettingChange('autoplay', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Default Quality</SettingLabel>
        <SettingDescription>Preferred video quality</SettingDescription>
        <SelectInput
          value={settings.defaultQuality}
          onChange={(e) => handleSettingChange('defaultQuality', e.target.value)}
        >
          <option value="auto">Auto</option>
          <option value="1080p">1080p</option>
          <option value="720p">720p</option>
          <option value="480p">480p</option>
        </SelectInput>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Subtitles</SettingLabel>
        <SettingDescription>Enable subtitles by default</SettingDescription>
        <ToggleSwitch
          checked={settings.subtitles}
          onChange={(e) => handleSettingChange('subtitles', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Subtitle Size</SettingLabel>
        <SettingDescription>Adjust subtitle text size</SettingDescription>
        <SelectInput
          value={settings.subtitleSize}
          onChange={(e) => handleSettingChange('subtitleSize', e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </SelectInput>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Subtitle Color</SettingLabel>
        <SettingDescription>Choose subtitle color</SettingDescription>
        <ColorInput
          type="color"
          value={settings.subtitleColor}
          onChange={(e) => handleSettingChange('subtitleColor', e.target.value)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Volume</SettingLabel>
        <SettingDescription>Default volume level (0-100)</SettingDescription>
        <SliderInput
          type="range"
          min="0"
          max="100"
          value={settings.volume}
          onChange={(e) => handleSettingChange('volume', parseInt(e.target.value))}
        />
        <span>{settings.volume}%</span>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Playback Speed</SettingLabel>
        <SettingDescription>Default playback speed</SettingDescription>
        <SelectInput
          value={settings.playbackSpeed}
          onChange={(e) => handleSettingChange('playbackSpeed', parseFloat(e.target.value))}
        >
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </SelectInput>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Skip Intro</SettingLabel>
        <SettingDescription>Automatically skip intro sequences</SettingDescription>
        <ToggleSwitch
          checked={settings.skipIntro}
          onChange={(e) => handleSettingChange('skipIntro', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Skip Credits</SettingLabel>
        <SettingDescription>Automatically skip end credits</SettingDescription>
        <ToggleSwitch
          checked={settings.skipCredits}
          onChange={(e) => handleSettingChange('skipCredits', e.target.checked)}
        />
      </SettingItem>
    </SettingsGrid>
  );

  const renderContentSettings = () => (
    <SettingsGrid>
      <SettingItem>
        <SettingLabel>Adult Content</SettingLabel>
        <SettingDescription>Show mature/adult content</SettingDescription>
        <ToggleSwitch
          checked={settings.adultContent}
          onChange={(e) => handleSettingChange('adultContent', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Language</SettingLabel>
        <SettingDescription>Preferred content language</SettingDescription>
        <SelectInput
          value={settings.language}
          onChange={(e) => handleSettingChange('language', e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
        </SelectInput>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Region</SettingLabel>
        <SettingDescription>Content region preference</SettingDescription>
        <SelectInput
          value={settings.region}
          onChange={(e) => handleSettingChange('region', e.target.value)}
        >
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="CA">Canada</option>
          <option value="AU">Australia</option>
          <option value="JP">Japan</option>
          <option value="KR">South Korea</option>
        </SelectInput>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Auto Next Episode</SettingLabel>
        <SettingDescription>Automatically play next episode</SettingDescription>
        <ToggleSwitch
          checked={settings.autoNext}
          onChange={(e) => handleSettingChange('autoNext', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Show Spoilers</SettingLabel>
        <SettingDescription>Display plot spoilers in descriptions</SettingDescription>
        <ToggleSwitch
          checked={settings.showSpoilers}
          onChange={(e) => handleSettingChange('showSpoilers', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Content Rating</SettingLabel>
        <SettingDescription>Maximum content rating to show</SettingDescription>
        <SelectInput
          value={settings.contentRating}
          onChange={(e) => handleSettingChange('contentRating', e.target.value)}
        >
          <option value="all">All Ratings</option>
          <option value="g">G - General</option>
          <option value="pg">PG - Parental Guidance</option>
          <option value="pg13">PG-13</option>
          <option value="r">R - Restricted</option>
        </SelectInput>
      </SettingItem>
    </SettingsGrid>
  );

  const renderInterfaceSettings = () => (
    <SettingsGrid>
      <SettingItem>
        <SettingLabel>Sidebar Collapsed</SettingLabel>
        <SettingDescription>Keep sidebar collapsed by default</SettingDescription>
        <ToggleSwitch
          checked={settings.sidebarCollapsed}
          onChange={(e) => handleSettingChange('sidebarCollapsed', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Show Thumbnails</SettingLabel>
        <SettingDescription>Display thumbnail previews</SettingDescription>
        <ToggleSwitch
          checked={settings.showThumbnails}
          onChange={(e) => handleSettingChange('showThumbnails', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Grid Size</SettingLabel>
        <SettingDescription>Content grid size</SettingDescription>
        <SelectInput
          value={settings.gridSize}
          onChange={(e) => handleSettingChange('gridSize', e.target.value)}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </SelectInput>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Show Ratings</SettingLabel>
        <SettingDescription>Display content ratings</SettingDescription>
        <ToggleSwitch
          checked={settings.showRatings}
          onChange={(e) => handleSettingChange('showRatings', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Show Year</SettingLabel>
        <SettingDescription>Display release year</SettingDescription>
        <ToggleSwitch
          checked={settings.showYear}
          onChange={(e) => handleSettingChange('showYear', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Show Genres</SettingLabel>
        <SettingDescription>Display genre information</SettingDescription>
        <ToggleSwitch
          checked={settings.showGenres}
          onChange={(e) => handleSettingChange('showGenres', e.target.checked)}
        />
      </SettingItem>
    </SettingsGrid>
  );

  const renderNotificationSettings = () => (
    <SettingsGrid>
      <SettingItem>
        <SettingLabel>Enable Notifications</SettingLabel>
        <SettingDescription>Receive app notifications</SettingDescription>
        <ToggleSwitch
          checked={settings.notifications}
          onChange={(e) => handleSettingChange('notifications', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>New Episodes</SettingLabel>
        <SettingDescription>Notify when new episodes are available</SettingDescription>
        <ToggleSwitch
          checked={settings.newEpisodes}
          onChange={(e) => handleSettingChange('newEpisodes', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Recommendations</SettingLabel>
        <SettingDescription>Receive content recommendations</SettingDescription>
        <ToggleSwitch
          checked={settings.recommendations}
          onChange={(e) => handleSettingChange('recommendations', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>App Updates</SettingLabel>
        <SettingDescription>Notify about app updates</SettingDescription>
        <ToggleSwitch
          checked={settings.updates}
          onChange={(e) => handleSettingChange('updates', e.target.checked)}
        />
      </SettingItem>
    </SettingsGrid>
  );

  const renderPrivacySettings = () => (
    <SettingsGrid>
      <SettingItem>
        <SettingLabel>Track Watching</SettingLabel>
        <SettingDescription>Save watch history and progress</SettingDescription>
        <ToggleSwitch
          checked={settings.trackWatching}
          onChange={(e) => handleSettingChange('trackWatching', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Share Data</SettingLabel>
        <SettingDescription>Share usage data for improvements</SettingDescription>
        <ToggleSwitch
          checked={settings.shareData}
          onChange={(e) => handleSettingChange('shareData', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Analytics</SettingLabel>
        <SettingDescription>Enable analytics tracking</SettingDescription>
        <ToggleSwitch
          checked={settings.analytics}
          onChange={(e) => handleSettingChange('analytics', e.target.checked)}
        />
      </SettingItem>
    </SettingsGrid>
  );

  const renderAdvancedSettings = () => (
    <SettingsGrid>
      <SettingItem>
        <SettingLabel>Hardware Acceleration</SettingLabel>
        <SettingDescription>Use GPU for video decoding</SettingDescription>
        <ToggleSwitch
          checked={settings.hardwareAcceleration}
          onChange={(e) => handleSettingChange('hardwareAcceleration', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Preload Content</SettingLabel>
        <SettingDescription>Preload content for faster playback</SettingDescription>
        <ToggleSwitch
          checked={settings.preloadContent}
          onChange={(e) => handleSettingChange('preloadContent', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Cache Size</SettingLabel>
        <SettingDescription>Maximum cache storage</SettingDescription>
        <SelectInput
          value={settings.cacheSize}
          onChange={(e) => handleSettingChange('cacheSize', e.target.value)}
        >
          <option value="500MB">500MB</option>
          <option value="1GB">1GB</option>
          <option value="2GB">2GB</option>
          <option value="5GB">5GB</option>
        </SelectInput>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Max Concurrent Streams</SettingLabel>
        <SettingDescription>Maximum simultaneous streams</SettingDescription>
        <SliderInput
          type="range"
          min="1"
          max="5"
          value={settings.maxConcurrentStreams}
          onChange={(e) => handleSettingChange('maxConcurrentStreams', parseInt(e.target.value))}
        />
        <span>{settings.maxConcurrentStreams}</span>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Network Timeout (seconds)</SettingLabel>
        <SettingDescription>Request timeout duration</SettingDescription>
        <SliderInput
          type="range"
          min="10"
          max="60"
          value={settings.networkTimeout}
          onChange={(e) => handleSettingChange('networkTimeout', parseInt(e.target.value))}
        />
        <span>{settings.networkTimeout}s</span>
      </SettingItem>

      <SettingItem>
        <SettingLabel>Retry Attempts</SettingLabel>
        <SettingDescription>Number of retry attempts for failed requests</SettingDescription>
        <SliderInput
          type="range"
          min="1"
          max="10"
          value={settings.retryAttempts}
          onChange={(e) => handleSettingChange('retryAttempts', parseInt(e.target.value))}
        />
        <span>{settings.retryAttempts}</span>
      </SettingItem>
    </SettingsGrid>
  );

  const renderExperimentalSettings = () => (
    <SettingsGrid>
      <SettingItem>
        <SettingLabel>Beta Features</SettingLabel>
        <SettingDescription>Enable experimental features</SettingDescription>
        <ToggleSwitch
          checked={settings.betaFeatures}
          onChange={(e) => handleSettingChange('betaFeatures', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Debug Mode</SettingLabel>
        <SettingDescription>Show debug information</SettingDescription>
        <ToggleSwitch
          checked={settings.debugMode}
          onChange={(e) => handleSettingChange('debugMode', e.target.checked)}
        />
      </SettingItem>

      <SettingItem>
        <SettingLabel>Developer Mode</SettingLabel>
        <SettingDescription>Enable developer tools</SettingDescription>
        <ToggleSwitch
          checked={settings.developerMode}
          onChange={(e) => handleSettingChange('developerMode', e.target.checked)}
        />
      </SettingItem>
    </SettingsGrid>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'appearance': return renderAppearanceSettings();
      case 'player': return renderPlayerSettings();
      case 'content': return renderContentSettings();
      case 'interface': return renderInterfaceSettings();
      case 'notifications': return renderNotificationSettings();
      case 'privacy': return renderPrivacySettings();
      case 'advanced': return renderAdvancedSettings();
      case 'experimental': return renderExperimentalSettings();
      default: return renderAppearanceSettings();
    }
  };

  return (
    <SettingsContainer
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <SettingsHeader>
        <h1>Settings</h1>
        <p>Customize your VoidStream experience</p>
        <ResetButton onClick={handleReset}>
          <FiRefreshCw /> Reset All Settings
        </ResetButton>
      </SettingsHeader>

      <SettingsContent>
        <nav style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  background: activeSection === section.id ? '#ffffff' : 'transparent',
                  color: activeSection === section.id ? '#000000' : '#ffffff',
                  border: '1px solid #333333',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <section.icon size={16} />
                {section.title}
              </button>
            ))}
          </div>
        </nav>

        <SettingsSection>
          <SectionTitle>
            <SectionIcon as={sections.find(s => s.id === activeSection)?.icon} />
            {sections.find(s => s.id === activeSection)?.title}
          </SectionTitle>
          {renderSection()}
        </SettingsSection>
      </SettingsContent>
    </SettingsContainer>
  );
};

export default Settings;