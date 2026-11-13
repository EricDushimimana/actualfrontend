# ACTUAL HOLDINGS — Vanilla Frontend Preview

This edition uses **HTML, CSS and plain JavaScript only**. It does not require Node.js, npm, React or Vite. The original green/yellow/charcoal branding, logo, page layouts, styles and shared header/footer components are retained from the supplied ACTUAL HOLDINGS project.

## Run with XAMPP (recommended)

1. Extract this folder into `C:\xampp\htdocs\`.
2. Rename the extracted folder to `ACTUAL_HOLDINGS_VANILLA_FRONTEND` if needed.
3. Open the XAMPP Control Panel and start **Apache**. MySQL is not required for this frontend preview.
4. Visit `http://localhost/ACTUAL_HOLDINGS_VANILLA_FRONTEND/` in your browser.

You can also open `index.html` directly, but shared header/footer loading and some browser features work more reliably through Apache.

## Structure

- `index.html` — homepage
- `src/pages/` — About, Services, Trading, ACTUAL Family, support, authentication and dashboard pages
- `src/components/header.html` and `footer.html` — reusable shared page components loaded by the shared script
- `src/styles/style.css` — existing shared design system and page styles
- `src/scripts/script.js` — shared vanilla JavaScript interactions and safe page-specific initialization
- `src/scripts/frontend-demo.js` — explains that login/signup are preview-only until a backend is connected
- `images/` — logo and favicon

## Important preview limitations

This package intentionally excludes PHP APIs, database files, server configuration, and authentication guards. Therefore login, signup, protected account access, database saving, live marketplace orders, and server-backed dashboard operations are **not active** in this frontend-only edition. Existing dashboard screens are for visual/interface preview only. Do not enter real passwords or sensitive information into this preview.

When the frontend is approved, a backend can be connected separately without requiring React or npm.
