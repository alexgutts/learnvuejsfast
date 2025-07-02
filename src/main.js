/**
 * MAIN ENTRY POINT FOR THE VUE 3 APPLICATION
 * ==========================================
 * 
 * This is the starting point of our Vue.js application - think of it as the "ignition key" 
 * that starts your car engine. When someone visits your website, this file runs first
 * and sets everything up.
 * 
 * What happens here (in simple terms):
 * 1. We import the CSS styles to make our app look pretty
 * 2. We import Vue 3's magic powers (createApp function)
 * 3. We import our main App component (the root of our component tree)
 * 4. We create a Vue application instance and mount it to the HTML
 */

// STEP 1: Import global CSS styles
// ================================
// This imports all the base styles for our application (colors, fonts, layout, etc.)
// Think of this as putting on makeup before going out - it makes everything look good!
import './assets/main.css'

// STEP 2: Import Vue 3's createApp function
// =========================================
// createApp is Vue 3's magic function that creates a new Vue application instance
// It's like getting a blank canvas ready for painting your masterpiece
import { createApp } from 'vue'

// STEP 3: Import our root App component
// ====================================
// App.vue is the root component - the parent of all other components in our app
// Think of it as the main container that holds all the other LEGO blocks (components)
import App from './App.vue'

// STEP 4: Create and mount the Vue application
// ============================================
// This is where the magic happens! We:
// 1. createApp(App) - Create a new Vue app instance using our App component as the root
// 2. .mount('#app') - Tell Vue to take control of the HTML element with id="app"
//
// The HTML element with id="app" is in index.html - Vue will replace its contents
// with our beautiful Vue components and make them interactive!
//
// It's like telling Vue: "Hey, see that empty box in the HTML? Fill it with our awesome app!"
createApp(App).mount('#app')

/**
 * WHAT HAPPENS AFTER THIS?
 * ========================
 * 1. Vue creates an instance of our App component
 * 2. Vue renders the App component and all its child components
 * 3. Vue makes everything reactive (data changes update the UI automatically)
 * 4. Vue attaches event listeners and makes the app interactive
 * 5. Users can now interact with our beautiful Vue learning application!
 * 
 * JUNIOR DEV TIPS:
 * ===============
 * - This file is kept simple on purpose - complex logic goes in components
 * - If you need global plugins (like Vue Router), you'd add them here
 * - The .mount('#app') connects to the <div id="app"> in index.html
 * - This pattern is called "mounting" - Vue takes control of that DOM element
 */
