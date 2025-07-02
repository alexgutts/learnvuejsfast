/**
 * VITE CONFIGURATION FILE
 * =======================
 * 
 * Vite is our build tool - think of it as a super-powered assistant that:
 * 1. Transforms your Vue files into regular HTML/CSS/JS that browsers understand
 * 2. Provides a lightning-fast development server with hot reload
 * 3. Bundles and optimizes your code for production
 * 4. Handles all the complex build processes so you can focus on coding
 * 
 * This file tells Vite exactly how to handle our Vue 3 learning application.
 */

// Import Node.js utilities for working with file paths
// ====================================================
// fileURLToPath: Converts file:// URLs to regular file paths
// URL: Creates URL objects for path manipulation
// These are needed because we're using ES modules (import/export) in our config
import { fileURLToPath, URL } from 'node:url'

// Import Vite's main configuration function
// =========================================
// defineConfig provides TypeScript support and better IntelliSense
// It's like having a smart assistant that helps you write the config correctly
import { defineConfig } from 'vite'

// Import the Vue plugin for Vite
// ===============================
// This plugin teaches Vite how to understand and process .vue files
// Without this, Vite wouldn't know what to do with our Vue components!
import vue from '@vitejs/plugin-vue'

// Import Vue DevTools plugin
// ==========================
// This adds the amazing Vue DevTools to our development environment
// It's like having X-ray vision to see inside your Vue components while developing
import vueDevTools from 'vite-plugin-vue-devtools'

// Official Vite configuration documentation: https://vite.dev/config/
export default defineConfig({
  // PLUGINS CONFIGURATION
  // ====================
  // Plugins extend Vite's capabilities - they're like superpowers for your build tool
  plugins: [
    // Vue Plugin: Makes Vite understand .vue files
    // ============================================
    // This plugin:
    // - Compiles Vue Single File Components (.vue files)
    // - Handles <template>, <script>, and <style> blocks
    // - Enables Vue 3's Composition API and reactivity system
    // - Provides hot module replacement for instant updates during development
    vue(),
    
    // Vue DevTools Plugin: Debugging superpowers for development
    // =========================================================
    // This plugin:
    // - Adds the Vue DevTools panel to your browser's developer tools
    // - Lets you inspect component data, props, and events in real-time
    // - Shows the component tree structure
    // - Helps debug reactive data and computed properties
    // - Only works in development mode (automatically disabled in production)
    vueDevTools(),
  ],
  
  // PATH RESOLUTION CONFIGURATION
  // =============================
  // This section tells Vite how to resolve file paths and imports
  resolve: {
    // Path Aliases: Create shortcuts for common paths
    // ==============================================
    // Instead of writing: import Component from '../../../components/Component.vue'
    // You can write: import Component from '@/components/Component.vue'
    // The '@' symbol is a shortcut that points to the 'src' directory
    alias: {
      // '@' alias points to the src directory
      // ===================================
      // fileURLToPath(new URL('./src', import.meta.url)) creates an absolute path to the src folder
      // This works regardless of where your project is located on the computer
      // 
      // Example usage in your components:
      // import MyComponent from '@/components/MyComponent.vue'
      // import { useProgress } from '@/composables/useProgress.js'
      // import vueData from '@/data/vueData.js'
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

/**
 * WHAT DOES THIS CONFIGURATION DO?
 * ================================
 * 
 * DURING DEVELOPMENT:
 * - Starts a local development server (usually at http://localhost:5173)
 * - Provides instant hot reload when you save files
 * - Shows helpful error messages in the browser
 * - Enables Vue DevTools for debugging
 * - Resolves '@' imports to the src directory
 * 
 * DURING BUILD (npm run build):
 * - Compiles all Vue components into optimized JavaScript
 * - Bundles and minifies CSS and JavaScript files
 * - Optimizes images and other assets
 * - Creates a production-ready dist folder
 * - Removes development-only code (like DevTools)
 * 
 * JUNIOR DEV TIPS:
 * ===============
 * - You rarely need to modify this file unless adding new plugins
 * - The '@' alias is super useful - use it instead of relative paths like '../../../'
 * - Vite is much faster than older build tools like Webpack
 * - The vueDevTools plugin only works in development - it won't slow down production
 * - If you add new file types (like .scss), you might need additional plugins
 */
