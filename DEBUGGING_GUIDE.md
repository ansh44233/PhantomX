# VoidStream - Debugging Guide 🔍

## Current Issue: Blank Screen with Only Sidebar

The app loads but shows a blank screen with just the sidebar visible. This indicates API connection issues.

## 🛠️ Latest Fixes Applied

### 1. Enhanced Debugging
- **Developer Tools Auto-Open**: Console opens automatically for debugging
- **Detailed Logging**: Every API call is logged with emojis for easy identification
- **Connection Testing**: App tests TMDB API before fetching data
- **Error Display**: User-friendly error messages with retry button

### 2. Network Configuration
- **CORS Handling**: Disabled web security for external API calls
- **Certificate Handling**: Bypassed certificate verification for APIs
- **User Agent**: Set proper user agent for API requests
- **Timeout**: Increased timeout to 15 seconds

### 3. Error Handling
- **Graceful Fallbacks**: Empty arrays when API fails
- **User Feedback**: Clear error messages explaining issues
- **Retry Mechanism**: Button to reload and retry connection

## 🔍 How to Debug

### Step 1: Run the App
```bash
test-exe.bat
```

### Step 2: Check Developer Console
The app automatically opens Developer Tools. Look for these messages:

#### ✅ Success Messages:
- `🎬 TMDB API Service initializing...` - Service starting
- `🧪 Testing TMDB API connection...` - Testing connection
- `✅ TMDB API connection successful!` - API is working
- `📡 Making TMDB API request: /trending/movie/week` - Making calls
- `✅ TMDB API success: /trending/movie/week - Status: 200` - Success!

#### ❌ Error Messages:
- `❌ TMDB API Error: Network Error` - Internet/firewall issue
- `❌ TMDB API connection failed` - Cannot reach TMDB
- `❌ Response status: 401` - API key issue
- `❌ Response status: 429` - Rate limit exceeded

### Step 3: Common Issues & Solutions

#### Issue: Network Error
**Symptoms**: `❌ TMDB API Error: Network Error`
**Solutions**:
1. Check internet connection
2. Disable firewall/antivirus temporarily
3. Run app as administrator
4. Check if TMDB is blocked by your network

#### Issue: API Key Error
**Symptoms**: `❌ Response status: 401`
**Solutions**:
1. API key might be invalid or expired
2. Check if TMDB API key is working in browser:
   ```
   https://api.themoviedb.org/3/movie/popular?api_key=8265bd1679663a7ea12ac168da84d2e8
   ```

#### Issue: Rate Limiting
**Symptoms**: `❌ Response status: 429`
**Solutions**:
1. Wait a few minutes and retry
2. TMDB has rate limits for API calls

#### Issue: CORS/Security
**Symptoms**: `Access to fetch blocked by CORS policy`
**Solutions**:
1. App should handle this automatically
2. Try running as administrator
3. Check if corporate firewall is blocking

## 🧪 Manual API Test

Test the API directly in your browser:
```
https://api.themoviedb.org/3/movie/popular?api_key=8265bd1679663a7ea12ac168da84d2e8
```

If this works in browser but not in app, it's a network configuration issue.

## 📋 Console Log Examples

### Successful Load:
```
🎬 TMDB API Service initializing...
🔑 API Key: Present
🌐 Base URL: https://api.themoviedb.org/3
🏠 Home component: Starting data fetch...
🧪 Testing TMDB API connection...
📡 Making TMDB API request: /configuration
✅ TMDB API success: /configuration - Status: 200
✅ TMDB API connection successful!
🏠 Home component: API connection verified, fetching content...
📡 Making TMDB API request: /trending/movie/week
📡 Making TMDB API request: /trending/tv/week
✅ TMDB API success: /trending/movie/week - Status: 200
✅ TMDB API success: /trending/tv/week - Status: 200
✅ Home component: All data loaded successfully!
```

### Failed Load:
```
🎬 TMDB API Service initializing...
🔑 API Key: Present
🏠 Home component: Starting data fetch...
🧪 Testing TMDB API connection...
📡 Making TMDB API request: /configuration
❌ TMDB API Error: Network Error
❌ Request failed - no response received
❌ TMDB API connection failed: Network Error
❌ Home component: Error fetching data: Cannot connect to TMDB API
```

## 🚀 Next Steps

1. **Run the updated app**: `test-exe.bat`
2. **Check console logs**: Look for the patterns above
3. **Share console output**: If still having issues, share the console logs
4. **Try manual API test**: Test the API URL in your browser

The app now has comprehensive debugging to identify exactly what's going wrong!

## 📞 Troubleshooting Checklist

- [ ] Internet connection working?
- [ ] Firewall/antivirus disabled temporarily?
- [ ] Running as administrator?
- [ ] TMDB API accessible in browser?
- [ ] Console shows detailed error messages?
- [ ] Corporate network blocking external APIs?

With these debugging tools, we can identify and fix the exact issue preventing content from loading!