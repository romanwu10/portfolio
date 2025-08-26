# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Roman Wu's personal portfolio website built with React 19, TypeScript, and Vite. The site showcases professional experience, education, skills, projects, and provides a contact interface. It's optimized for deployment on Cloudflare Pages.

## Development Commands

- `npm start` - Start development server on port 3000
- `npm run build` - Build for production (TypeScript compilation + Vite build)  
- `npm run serve` - Preview production build locally
- `npm run build:cloudflare` - Build specifically for Cloudflare Pages deployment
- `npm run preview:cloudflare` - Preview Cloudflare Pages build locally

## Architecture

### Component Structure
- **App.tsx**: Root component with responsive mobile/desktop header detection
- **Context Provider**: Global state management for page navigation using React Context
- **Main Component**: Central content router that conditionally renders page components
- **Responsive Design**: Separate Header/HeaderM components for desktop/mobile layouts

### Page Navigation System
The application uses a custom context-based navigation system instead of React Router:
- `src/context/context.tsx` manages active page state
- Pages: Home, About, Education (includes Skills/Certifications), Work, Projects, Resume, Contact
- Navigation triggers `changeContent()` function to update active page state

### Data Management
- Static JSON files in `public/data/` contain content (jobs, skills, certifications, schooling, about)
- Models in `src/models/` define TypeScript interfaces for data structures
- No external APIs - all content is statically loaded

### Styling
- CSS Modules for component-specific styles (`.module.css`)
- Bootstrap 5.3.7 for base styling and responsive utilities  
- Custom CSS animations and transitions

## Key Technologies

- **Frontend**: React 19, TypeScript, React Bootstrap
- **Build Tool**: Vite with SWC for fast compilation
- **Deployment**: GitHub Pages via gh-pages package
- **State Management**: React Context (no external state library)

## File Organization

```
src/
├── components/
│   ├── header/           # Desktop/mobile headers
│   ├── main/            # Main content router
│   ├── pages/           # Individual page components
│   ├── footer/          # Footer component
│   └── others/          # Utility components (Loading, DarkMode)
├── context/             # React Context for navigation
├── models/              # TypeScript interfaces
└── utils/               # Utility functions
```

## Cloudflare Pages Deployment

### Build Configuration
- **Build Command**: `npm run build:cloudflare`
- **Build Output Directory**: `dist`
- **Root Directory**: `/` (repository root)
- **Node.js Version**: Use latest (18.x or higher recommended)

### Optimizations
- **Vite Config**: Optimized for Cloudflare's edge network with ES2020 target
- **Asset Chunking**: Separate vendor and bootstrap chunks for better caching
- **File Naming**: Consistent hash-based naming for optimal cache invalidation
- **Security Headers**: Configured via `_headers` file
- **SPA Routing**: Handled via `_redirects` file

### Performance Features
- Asset compression and caching optimization
- CDN-friendly file structure with immutable assets
- Security headers (HSTS, XSS protection, frame options)
- Aggressive caching for static assets (1 year) with proper cache invalidation

