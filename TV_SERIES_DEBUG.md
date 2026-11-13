# VoidStream - TV Series Debugging Guide 🔍

## 🎯 **Current Issue**

TV series details pages are not working/showing while movie details work perfectly.

## 🔧 **Debugging Added**

### 1. **ContentCard Debugging**
```javascript
console.log('ContentCard clicked:', {
  title: item.title || item.name,
  type: type,
  id: item.id,
  navigateTo: `/${type}/${item.id}`
});
```

### 2. **MovieDetails Debugging**
```javascript
console.log('MovieDetails - Current path:', currentPath);
console.log('MovieDetails - ID from params:', id);
console.log('MovieDetails - Detected media type:', type);
console.log('MovieDetails - Making API call for type:', type, 'id:', id);
console.log('MovieDetails - API response received:', response.data);
```

### 3. **Home Component Debugging**
```javascript
console.log('Home - TV shows sample:', popularTVData.slice(0, 2));
console.log('Home - Movies sample:', popularMoviesData.slice(0, 2));
```

## 🧪 **Testing Process**

### Step 1: Open Developer Tools
1. Run `test-exe.bat`
2. Open Developer Tools (F12)
3. Go to Console tab

### Step 2: Test TV Show Click
1. Find "Popular TV Shows" section on Home page
2. Click on any TV show poster
3. Watch console for debug messages

### Step 3: Compare with Movie Click
1. Find "Popular Movies" section
2. Click on any movie poster
3. Compare console messages

## 🔍 **Expected Debug Output**

### For TV Shows (Should See):
```
Home - TV shows sample: [
  { id: 123, name: "Show Name", type: "tv", ... },
  { id: 456, name: "Another Show", type: "tv", ... }
]

ContentCard clicked: {
  title: "Show Name",
  type: "tv",
  id: 123,
  navigateTo: "/tv/123"
}

MovieDetails - Current path: /tv/123
MovieDetails - ID from params: 123
MovieDetails - Detected media type: tv
MovieDetails - Making API call for type: tv id: 123
MovieDetails - API response received: { name: "Show Name", ... }
```

### For Movies (Working Reference):
```
Home - Movies sample: [
  { id: 789, title: "Movie Title", type: "movie", ... },
  { id: 101, title: "Another Movie", type: "movie", ... }
]

ContentCard clicked: {
  title: "Movie Title",
  type: "movie", 
  id: 789,
  navigateTo: "/movie/789"
}

MovieDetails - Current path: /movie/789
MovieDetails - ID from params: 789
MovieDetails - Detected media type: movie
MovieDetails - Making API call for type: movie id: 789
MovieDetails - API response received: { title: "Movie Title", ... }
```

## 🚨 **Potential Issues to Look For**

### Issue 1: Type Detection Problem
**Symptoms**: ContentCard shows wrong type
**Look for**: `type: "movie"` when clicking TV show
**Cause**: ContentRow not passing correct type

### Issue 2: Routing Problem
**Symptoms**: Wrong path in MovieDetails
**Look for**: `/movie/123` instead of `/tv/123`
**Cause**: Navigation or routing issue

### Issue 3: API Call Problem
**Symptoms**: API call fails or returns error
**Look for**: Error messages after "Making API call"
**Cause**: TMDB API issue or network problem

### Issue 4: Component Not Loading
**Symptoms**: No MovieDetails debug messages at all
**Look for**: Only ContentCard messages, no MovieDetails
**Cause**: Route not matching or component not mounting

## 📋 **Troubleshooting Steps**

### If ContentCard shows wrong type:
1. Check ContentRow type prop
2. Verify Home component data mapping
3. Check ContentRow type detection logic

### If routing is wrong:
1. Verify HashRouter configuration
2. Check App.js route definitions
3. Verify ContentCard navigation logic

### If API fails:
1. Test TMDB API directly in browser
2. Check network connectivity
3. Verify API key and endpoints

### If component doesn't load:
1. Check React Router route matching
2. Verify component imports
3. Check for JavaScript errors

## 🎯 **Next Steps Based on Findings**

### Scenario A: Type is wrong in ContentCard
→ Fix ContentRow type detection

### Scenario B: Routing path is wrong
→ Fix navigation or route configuration

### Scenario C: API call fails
→ Fix TMDB API service or network issues

### Scenario D: Component doesn't mount
→ Fix React Router configuration

## 🔧 **Quick Fixes to Try**

### Fix 1: Force TV type in ContentRow
```javascript
// In ContentRow.js
type={type === 'tv' ? 'tv' : (item.type || (type === 'mixed' ? (item.title ? 'movie' : 'tv') : type))}
```

### Fix 2: Add route debugging
```javascript
// In App.js Routes
<Route path="/tv/:id" element={<div>TV Route Hit: {window.location.hash}</div>} />
```

### Fix 3: Test API directly
```javascript
// In browser console
fetch('https://api.themoviedb.org/3/tv/1399?api_key=8265bd1679663a7ea12ac168da84d2e8')
```

## 📊 **Success Criteria**

When working properly, you should see:
1. ✅ TV shows have `type: "tv"` in ContentCard
2. ✅ Navigation goes to `/tv/123` paths
3. ✅ MovieDetails detects `type: "tv"`
4. ✅ API call succeeds for TV shows
5. ✅ TV show details page loads with seasons/episodes

**Run the debugging version and report what you see in the console!**