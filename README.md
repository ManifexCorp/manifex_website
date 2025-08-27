# Manifex Website (Modern SaaS)

## Setup
1. Add your logo: `public/manifex-logo.png`
2. Edit `src/App.tsx` and set `N8N_BASE` to your n8n cloud domain.
3. Netlify env vars:
   - `VITE_AUTH0_DOMAIN` (e.g. dev-xxxx.eu.auth0.com)
   - `VITE_AUTH0_CLIENT_ID`
   - (Optional) `VITE_PAYPAL_CLIENT_ID`
4. Netlify build: `npm run build`, publish `dist`.
