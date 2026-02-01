# Frontend Deployment (SPA)

This app is a **single-page application (SPA)**. For refresh and direct URLs to work after deployment, the server must serve `index.html` for all routes.

## Already configured

- **Vercel:** `vercel.json` rewrites all requests to `/index.html`.
- **Netlify:** `netlify.toml` and `public/_redirects` redirect all routes to `/index.html` with status 200.

## Other hosts

Configure your host so that:

1. **Build output** is the `dist` folder (`npm run build`).
2. **Fallback:** Any path (e.g. `/menu`, `/cart`, `/orders/123`) should serve `index.html`, not 404. React Router then handles the route on the client.

Examples:

- **Firebase Hosting:** Add to `firebase.json`: `"rewrites": [{ "source": "**", "destination": "/index.html" }]`
- **Apache:** Use `FallbackResource /index.html` or equivalent.
- **Nginx:** `try_files $uri $uri/ /index.html;`

## Auth and cart after deployment

- **Auth:** Stored in `sessionStorage`. Refreshing the page in the same tab keeps the user logged in.
- **Cart:** Stored in `localStorage` (per user when logged in, guest when not). Cart survives refresh and is restored when the user logs in again.
