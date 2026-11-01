# THE REAPING — Capitol Edition (PWA)

A responsive, installable Progressive Web App for event name selection.

## Included
- Capitol-inspired black, antique-gold and red interface
- Five district groupings and the supplied district emblem artwork
- Exact supplied roster (35 names across Districts 1–5)
- District-specific or All Districts selection
- One-at-a-time random tribute draw; selected names are not drawn again until reset
- 5-second countdown and original generated reveal sound effect
- Presentation/full-screen mode
- Selection history and CSV export
- Web app manifest, install icons and offline service worker

## Run locally
PWAs require localhost or HTTPS (opening index.html directly with file:// will not enable installation/offline caching).

Option A — Python:
    python -m http.server 8000

Then open:
    http://localhost:8000

Option B — deploy the contents of this folder to any static HTTPS host (for example, GitHub Pages, Netlify, or Cloudflare Pages).

## Install
- Android/Chrome: open the HTTPS site, then use the browser's Install app / Add to Home screen option.
- iPhone/iPad: open in Safari, tap Share, then Add to Home Screen.
- Desktop Chrome/Edge: use the install icon in the address bar or the app's Install app button.

## Notes
- The app works offline after its first successful load on localhost/HTTPS.
- Participant edits and event history currently live in the active browser session; this starter package does not sync data between devices or persist it after the tab is closed.
- The dramatic reveal sound is an original synthesized effect included locally; no external audio service is required.
- Google Fonts are optional external typography; system fallbacks are provided.

## Project files
- index.html — app structure
- styles.css — responsive Capitol styling
- app.js — district roster, selection logic, history and UI
- manifest.webmanifest — PWA metadata
- sw.js — offline cache
- assets/districts/ — cropped district insignias from the supplied image
- assets/audio/reaping-reveal.wav — original dramatic reveal effect
- icons/ — PWA and Apple touch icons
