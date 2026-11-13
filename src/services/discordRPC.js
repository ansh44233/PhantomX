// discord rpc wrapper - gracefully no-ops in browser
class DiscordRPCService {
  constructor() {
    this.isElectron = window.discordRPC !== undefined;
  }

  async updateActivity(details, state, largeImageKey = 'logo', smallImageKey = null, buttons = null, party = null, joinSecret = null) {
    if (!this.isElectron) return;
    try {
      await window.discordRPC.updateActivity(details, state, largeImageKey, smallImageKey, buttons, party, joinSecret);
    } catch (error) {
      console.error('Discord RPC update failed:', error);
    }
  }

  async setWatchingActivity(title, episode = null, mediaType = null, id = null, season = null, episodeNum = null, party = null, joinSecret = null) {
    if (!this.isElectron) return;
    try {
      const buttons = [];
      if (mediaType && id) {
        buttons.push({ label: 'View on PhantomX', url: `phantomx://media/${mediaType}/${id}` });
        let watchUrl = `phantomx://player/${mediaType}/${id}`;
        if (mediaType === 'tv' && season && episodeNum) {
          watchUrl += `/${season}/${episodeNum}`;
        }
        buttons.push({ label: 'Watch Now', url: watchUrl });
      }
      await window.discordRPC.setWatchingActivity(title, episode, buttons, party, joinSecret);
    } catch (error) {
      console.error('Discord RPC watch activity failed:', error);
    }
  }

  async setBrowsingActivity(section) {
    if (!this.isElectron) return;
    try {
      await window.discordRPC.setBrowsingActivity(section);
    } catch (error) {
      console.error('Discord RPC browse activity failed:', error);
    }
  }

  async setHomeActivity() { await this.setBrowsingActivity('Browsing Home'); }
  async setSearchActivity(query = null) {
    const state = query ? `Searching for: ${query}` : 'Searching content';
    await this.updateActivity('PhantomX', state);
  }
  async setLibraryActivity() { await this.setBrowsingActivity('Browsing Library'); }
  async setFavoritesActivity() { await this.setBrowsingActivity('Viewing Favorites'); }
  async setHistoryActivity() { await this.setBrowsingActivity('Viewing History'); }
  async setCategoriesActivity() { await this.setBrowsingActivity('Browsing Categories'); }
  async setTrendingActivity() { await this.setBrowsingActivity('Viewing Trending'); }
  async setTopRatedActivity() { await this.setBrowsingActivity('Viewing Top Rated'); }
  async setContinueWatchingActivity() { await this.setBrowsingActivity('Continue Watching'); }
  async setMovieDetailsActivity(movieTitle) { await this.updateActivity('Viewing Details', movieTitle); }
  async setTVDetailsActivity(seriesTitle) { await this.updateActivity('Viewing Details', seriesTitle); }
  async setPlayerActivity(title, episode = null, mediaType = null, id = null, season = null, episodeNum = null, party = null, joinSecret = null) {
    await this.setWatchingActivity(title, episode, mediaType, id, season, episodeNum, party, joinSecret);
  }
  async setSettingsActivity() { await this.setBrowsingActivity('Tweaking Settings'); }
}

const discordRPC = new DiscordRPCService();
export default discordRPC;
