# Netlify Deployment Guide for LINGERS – Suites & Residence

This website is a modern React + Vite single page application with full client-side routing, localized languages (DE / EN / IT), suite booking engine, and local storage management.

If you previously experienced a **white blank page on Netlify**, it was typically caused by:
1. Uploading the **entire project root folder** (with uncompiled `.tsx` files) instead of the **`dist`** folder when using Netlify Drag-and-Drop.
2. Missing SPA redirect rules (`_redirects` or `netlify.toml`).
3. Browser caching previous failed requests.

We have resolved all of these issues, hardened the code against any browser storage restrictions, and added automated Netlify build configuration.

---

## Method 1: Netlify Drag-and-Drop (Instant 30-Second Deploy)

1. Open your project files on your computer.
2. Locate the **`dist`** folder (created by running `npm run build` or exported from AI Studio).
   > **CRITICAL**: Drag and drop the **`dist`** folder itself (or its contents), **NOT** the root project folder!
3. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
4. Drag and drop the **`dist`** folder into the upload area.
5. Netlify will publish your site immediately at a live URL like `https://your-hotel.netlify.app`.

---

## Method 2: Connect via GitHub / GitLab / Bitbucket

If you connected your repository to Netlify:
The repository now includes all automated build settings in `netlify.toml` and `.nvmrc`:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** `20` (specified in `.nvmrc` and `netlify.toml`)
- **SPA Redirects:** `/* /index.html 200` (automatically routed)

Simply trigger a deploy or push a new commit, and Netlify will build and serve the application with zero manual configuration.

---

## Troubleshooting Checklist

- **Hard Refresh:** If you still see an old cached blank page, press `Ctrl + F5` (Windows/Linux) or `Cmd + Shift + R` (Mac) to clear the browser cache.
- **Developer Console:** Open browser DevTools (`F12` -> `Console`). If any error is reported, it will now be caught by the built-in luxury error recovery screen with a "Reload & Reset" button.
- **Admin Access:** You can access the boutique hotel management dashboard anytime at `/admin` (password: `admin` or `lingers2025`).
