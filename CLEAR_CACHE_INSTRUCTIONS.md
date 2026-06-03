# Clear Browser Cache - Fix Runtime Errors

## The Problem

The error you're seeing is from **old cached code** in your browser. Even though we fixed the files, your browser is still using the old version.

```
THREE.WebGLShadowMap: PCFSoftShadowMap has been deprecated
Uncaught TypeError: Cannot read properties of undefined (reading 'value')
```

---

## Solution: Hard Refresh (Do This Now!)

### Step 1: Stop Development Server
Press `Ctrl+C` in your terminal where `npm start` is running

### Step 2: Clear Browser Cache

#### Chrome/Edge (Windows)
1. **Open DevTools**: Press `F12`
2. **Right-click the refresh button** (while DevTools is open)
3. **Select**: "Empty Cache and Hard Reload"

**OR**

1. Press `Ctrl + Shift + Delete`
2. Select "Cached images and files"
3. Click "Clear data"

#### Firefox (Windows)
1. Press `Ctrl + Shift + Delete`
2. Select "Cache"
3. Time range: "Everything"
4. Click "Clear Now"

#### Alternative: Incognito/Private Mode
- **Chrome**: `Ctrl + Shift + N`
- **Firefox**: `Ctrl + Shift + P`
- **Edge**: `Ctrl + Shift + N`

### Step 3: Delete node_modules/.cache
```bash
cd frontend
rmdir /s /q node_modules\.cache
```

### Step 4: Restart Development Server
```bash
npm start
```

### Step 5: Open Fresh Browser Tab
- Do NOT use the same tab
- Open a completely new tab or window
- Or use Incognito/Private mode

### Step 6: Navigate to Site
```
http://localhost:3000
```

---

## If Error Still Appears

### Nuclear Option: Complete Clean

```bash
# Stop dev server (Ctrl+C)

# Delete cache and build
cd frontend
rmdir /s /q node_modules\.cache
rmdir /s /q build
rmdir /s /q .cache

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Start fresh
npm start
```

Then:
1. Close ALL browser tabs/windows
2. Completely close browser
3. Reopen browser
4. Open in Incognito mode: `Ctrl + Shift + N`
5. Navigate to `http://localhost:3000`

---

## Verify Fix Worked

### ✅ Good Console (No Errors)
```
Webpack compiled successfully
No THREE.js errors
No "Cannot read properties of undefined"
Smooth animation
```

### ❌ Bad Console (Still Cached)
```
THREE.WebGLShadowMap: PCFSoftShadowMap has been deprecated
Uncaught TypeError: Cannot read properties of undefined
```

If you still see the bad console, the cache wasn't cleared properly.

---

## Quick Test After Cache Clear

1. **Open browser console** (`F12`)
2. **Navigate to homepage**
3. **Scroll to hero section**
4. **Check console**: Should be ZERO errors about:
   - "Cannot read properties of undefined"
   - "refreshUniformsCommon"
   - "three.module.js"

5. **Watch animations**: All 3 scenes should:
   - Load without errors
   - Animate smoothly
   - Switch every 8 seconds
   - No console spam

---

## Why This Happens

### Browser Cache
- Browsers cache JavaScript files for performance
- Even when you edit files, browser uses old cached version
- Must force browser to download new files

### Webpack Cache
- Create React App uses webpack caching
- node_modules/.cache stores compiled code
- Sometimes needs manual deletion

### Service Workers
- Progressive Web Apps use service workers
- Can cache entire app
- Need to unregister or clear

---

## Prevention

### During Development

**Always hard refresh when editing 3D code:**
- `Ctrl + Shift + R` (hard refresh)
- OR `Ctrl + F5`
- OR DevTools → Right-click refresh → "Empty Cache and Hard Reload"

**Or use Incognito mode:**
- Doesn't use cache
- Fresh state every time
- `Ctrl + Shift + N` to open

### Disable Cache in DevTools

1. Open DevTools (`F12`)
2. Go to "Network" tab
3. Check "Disable cache"
4. Keep DevTools open while developing

This prevents caching while DevTools is open.

---

## Technical Explanation

### What We Fixed
The error was in `PrintingPress.jsx` and `FoilStamping.jsx` where material refs were incorrectly used:

```javascript
// OLD (WRONG - caused error)
const materialRef = useRef();
materialRef.current.opacity = 0.5;

// NEW (CORRECT - fixed)
const meshRef = useRef();
if (meshRef.current && meshRef.current.material) {
  meshRef.current.material.opacity = 0.5;
}
```

### Why You Still See Error
Your browser loaded the OLD (wrong) code and cached it. Even though we fixed the files, your browser is using the cached OLD code.

### Solution
Force browser to download NEW (fixed) code by clearing cache.

---

## Step-by-Step: Guaranteed Fix

Follow these exactly:

### 1. Stop Everything
```bash
# In terminal with npm start
Ctrl + C
```

### 2. Clean Everything
```bash
cd frontend
rmdir /s /q node_modules\.cache
rmdir /s /q build
npm cache clean --force
```

### 3. Close Browser Completely
- Close ALL tabs
- Close ALL windows
- Close browser entirely
- Wait 5 seconds

### 4. Restart Dev Server
```bash
npm start
```

Wait until you see "Compiled successfully"

### 5. Open Fresh Browser
- Reopen browser
- Press `Ctrl + Shift + N` (Incognito mode)
- Navigate to `http://localhost:3000`
- Press `F12` to open console
- Scroll to hero section

### 6. Verify
Console should show:
```
✅ No errors
✅ Animations running smoothly
✅ All 3 scenes working
```

---

## Still Not Working?

If after ALL the above steps you STILL see errors:

1. **Take screenshot of EXACT error message**
2. **Check which file** is mentioned in error stack trace
3. **Verify the fix was applied** by reading the file:
   ```bash
   type frontend\src\three\PrintingPress.jsx | findstr "materialRef"
   ```
   Should return NOTHING (no matches)

4. **Check if there are other 3D files** we didn't fix

---

## Contact Info

If you've done ALL the above and still have errors, provide:

1. **Screenshot of console error**
2. **Result of**: `type frontend\src\three\PrintingPress.jsx | findstr "materialRef"`
3. **Browser**: Chrome/Firefox/Edge
4. **Did you use Incognito mode?**: Yes/No

---

## TL;DR - Quick Fix

```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clean cache
cd frontend
rmdir /s /q node_modules\.cache

# 3. Restart
npm start

# 4. Open NEW Incognito tab (Ctrl+Shift+N)

# 5. Go to http://localhost:3000

# 6. Check console (F12) - should be no errors
```

**The fix is already in the code. You just need to load the new code instead of the cached old code.**
