# Personal Website

A modern, multilingual personal website built with Next.js, React, and TypeScript. Showcases projects, contact options, and legal information and with a responsive design

[Visit the website](https://gasperpintar.com)

## Features
- Project portfolio with images and descriptions
- Contact buttons (email, GitHub, LinkedIn, Signal)
- Multilingual support (English, Slovenian)
- Cookie notice and privacy policy
- Responsive design using Bootstrap
- SEO-friendly (sitemap, robots.txt)

## Technologies Used
- [Next.js](https://nextjs.org/) (v16)
- [React](https://react.dev/) (v19)
- [TypeScript](https://www.typescriptlang.org/)
- [Bootstrap](https://getbootstrap.com/)
- [FontAwesome](https://fontawesome.com/)
- [next-intl](https://next-intl-docs.vercel.app/) (i18n)

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Start (Production)
```bash
npm start
```

## Folder Structure
```
app/                # Main app pages and components
  [locale]/         # Multilingual routing
  components/       # Reusable UI components
  card-generator/   # Card generator app and legal pages
    privacy-policy/ # Card generator privacy policy
    terms-of-service/ # Card generator terms of service
  lost-in-space/    # Custom 404 page
  smoking-tracker/  # Smoking Tracker app and legal pages
    privacy-policy/ # Smoking Tracker privacy policy
    terms-of-service/ # Smoking Tracker terms of service
  not-found.tsx     # Redirect for 404 errors
  ...
i18n/               # Internationalization config
messages/           # Translation files (en.json, sl.json)
public/             # Static assets (images, icons, logos, robots.txt, sitemap.xml)
styles/             # CSS files (components.css, globals.css, etc.)
utils/              # Utility functions (Assets.ts, Utils.ts)
```

## Contact
Created by Gašper Pintar. For inquiries, reach out via website.
