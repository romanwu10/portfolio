import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    // Cloudflare Pages optimizations
    target: 'es2020', // Better support for modern browsers
    minify: 'esbuild',
    cssMinify: true,
    sourcemap: false, // Disable sourcemaps for production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          bootstrap: ['bootstrap', 'react-bootstrap'],
        },
        // Optimize for Cloudflare's edge caching
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    // Optimize chunk size for Cloudflare's edge network
    chunkSizeWarningLimit: 1000,
  },
  // Optimize CSS for production
  css: {
    devSourcemap: true,
  },
  // Preload critical assets with compression hints
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg'],
})