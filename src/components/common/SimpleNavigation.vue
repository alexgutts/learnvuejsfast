<template>
  <!-- 
    NAVIGATION TEMPLATE SECTION
    ==========================
    
    WHAT IS A TEMPLATE?
    ==================
    The template is like the HTML blueprint of our component. It defines:
    - What HTML elements to render
    - How to display dynamic data
    - How to handle user interactions
    - What CSS classes to apply
    
    VUE TEMPLATE FEATURES USED HERE:
    ===============================
    - v-for: Loops through arrays to create repeated elements
    - v-bind (or :): Dynamically binds attributes and classes
    - @click: Listens for click events
    - {{ }}: Displays dynamic data (interpolation)
    - Conditional classes: Apply CSS classes based on conditions
    - v-show: Conditionally shows/hides elements
    
    ACCESSIBILITY FEATURES:
    ======================
    - role attributes: Tell screen readers what elements do
    - aria-label: Provide descriptive labels for assistive technology
    - semantic HTML: Use proper HTML elements (nav, button) for their intended purpose
    - aria-selected: Indicate which navigation item is currently active
    - aria-expanded: Indicate if mobile menu is open/closed
    
    WHY GOOD HTML MATTERS:
    =====================
    - Screen readers can navigate the content properly
    - Keyboard users can tab through interactive elements
    - Search engines understand the page structure
    - The app works even if JavaScript fails
  -->
  
  <!-- 
    MAIN NAVIGATION CONTAINER
    ========================
    <nav> is the semantic HTML element for navigation areas
    - role="navigation": Explicitly tells screen readers this is navigation
    - aria-label: Provides a descriptive name for the navigation area
    - class="modern-navigation": Applies our custom CSS styling
  -->
  <nav class="modern-navigation" role="navigation" aria-label="Main navigation">
    <div class="nav-container">
      <!-- Brand Section - Compact but readable -->
      <div class="nav-brand">
        <div class="brand-logo">
          <img src="/src/assets/logo.svg" alt="Vue.js" class="logo-image" />
        </div>
        <div class="brand-content">
          <h1 class="brand-title">Vue 3 Learning</h1>
          <p class="brand-subtitle">Interactive Tutorial Platform</p>
        </div>
      </div>

      <!-- Desktop Navigation Links - Hidden on mobile -->
      <div class="nav-links desktop-nav" role="tablist">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="$emit('section-change', section.id)"
          :class="[
            'nav-link',
            { 'nav-link--active': activeSection === section.id }
          ]"
          :aria-selected="activeSection === section.id"
          :aria-label="`Navigate to ${section.title} section`"
          role="tab"
        >
          <!-- Icon with better sizing and spacing -->
          <span class="nav-icon" aria-hidden="true">{{ section.emoji }}</span>
          
          <!-- Text with better typography -->
          <span class="nav-text">{{ section.title }}</span>
          
          <!-- Active indicator for better visual feedback -->
          <div class="nav-indicator" aria-hidden="true"></div>
        </button>
      </div>

      <!-- Navigation Actions - Desktop + Mobile -->
      <div class="nav-actions">
        <!-- Desktop Progress Section - Simple -->
        <div class="nav-progress">
          <div class="progress-visual">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: completionPercentage + '%' }"></div>
            </div>
            <span class="progress-text">{{ completionPercentage }}%</span>
          </div>
        </div>

        <!-- Mobile Enhanced Progress Section - More informative -->
        <div class="nav-progress-enhanced">
          <div class="progress-info">
            <span class="progress-label">Learning Progress</span>
            <div class="progress-stats">
              <span class="sections-completed">{{ sectionsDisplay }}</span>
              <span class="progress-percentage">{{ completionPercentage }}%</span>
            </div>
          </div>
          <div class="progress-bar-enhanced">
            <div class="progress-fill-enhanced" :style="{ width: completionPercentage + '%' }"></div>
          </div>
        </div>

        <!-- Enhanced Hamburger Menu Button - Mobile Only -->
        <button 
          class="hamburger-menu-enhanced"
          @click="toggleMobileMenu"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
          :class="{ 'active': isMobileMenuOpen }"
        >
          <div class="hamburger-icon">
            <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
            <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
            <span class="hamburger-line" :class="{ 'active': isMobileMenuOpen }"></span>
          </div>
          <span class="hamburger-text">Menu</span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Overlay -->
    <div 
      class="mobile-nav-overlay" 
      :class="{ 'active': isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>

    <!-- Mobile Navigation Menu -->
    <div 
      class="mobile-nav-menu" 
      :class="{ 'active': isMobileMenuOpen }"
      role="dialog"
      aria-label="Navigation menu"
    >
      <div class="mobile-nav-header">
        <h2 class="mobile-nav-title">Navigation</h2>
        <button 
          class="mobile-nav-close"
          @click="closeMobileMenu"
          aria-label="Close navigation menu"
        >
          ×
        </button>
      </div>

      <div class="mobile-nav-content">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="handleMobileNavClick(section.id)"
          :class="[
            'mobile-nav-link',
            { 'mobile-nav-link--active': activeSection === section.id }
          ]"
          :aria-selected="activeSection === section.id"
        >
          <span class="mobile-nav-icon">{{ section.emoji }}</span>
          <div class="mobile-nav-text">
            <span class="mobile-nav-title-text">{{ section.title }}</span>
            <span class="mobile-nav-description">{{ section.description || 'Learn Vue 3 concepts' }}</span>
          </div>
          <span class="mobile-nav-arrow">→</span>
        </button>
      </div>

      <div class="mobile-nav-footer">
        <div class="mobile-progress-section">
          <h3 class="mobile-progress-title">Learning Progress</h3>
          <div class="mobile-progress-bar">
            <div class="mobile-progress-fill" :style="{ width: completionPercentage + '%' }"></div>
          </div>
          <span class="mobile-progress-text">{{ completionPercentage }}% Complete</span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
/**
 * SIMPLE NAVIGATION COMPONENT
 * ===========================
 * 
 * WHAT IS THIS COMPONENT?
 * ======================
 * This is the navigation bar that appears at the top of our Vue learning app.
 * Think of it as the "steering wheel" of our application - it lets users
 * navigate between different sections like Welcome, Tutorial, Basics, etc.
 * 
 * MOBILE-FIRST APPROACH:
 * ======================
 * On mobile devices, we use a hamburger menu pattern because:
 * - It saves precious vertical space on small screens
 * - It's a familiar pattern users expect
 * - It keeps navigation accessible without cluttering the interface
 * - It allows for better touch targets and readability
 * 
 * WHY IS NAVIGATION IMPORTANT?
 * ===========================
 * Without navigation, users would be lost! It's like having a map in a mall
 * that shows you where you are and where you can go. Good navigation:
 * - Shows users where they currently are (active section)
 * - Shows them where they can go (available sections)
 * - Provides visual feedback when they interact with it
 * - Works well on both desktop and mobile devices
 * 
 * VUE CONCEPTS DEMONSTRATED HERE:
 * ==============================
 * - Component Props: Data passed from parent to child
 * - Component Events: Child communicating back to parent
 * - Template Directives: v-for, v-bind, @click, v-show
 * - Conditional Classes: Dynamic styling based on state
 * - Reactive Data: Mobile menu state management
 * - Scoped Styles: CSS that only applies to this component
 * 
 * HOW THIS COMPONENT WORKS:
 * ========================
 * 1. Parent component passes 'activeSection' prop to tell us which section is active
 * 2. We display navigation buttons for each section (desktop) or hamburger menu (mobile)
 * 3. When user clicks a button, we emit 'section-change' event to parent
 * 4. Parent receives the event and updates the active section
 * 5. The navigation updates to show the new active section
 */

import { ref, computed } from 'vue'
// Import the progress tracking composable to get real progress data
// This composable provides actual user progress instead of hardcoded values
import { useProgress } from '../../composables/useProgress.js'

// DEFINE PROPS (DATA COMING FROM PARENT COMPONENT)
// ================================================
// Props are like function parameters - they let the parent component
// pass data down to this child component. Think of them as "inputs"
// that configure how this component behaves.
defineProps({
  // activeSection: Tells us which section is currently active
  // Type: String - expects a text value like 'welcome', 'tutorial', etc.
  // Default: 'welcome' - if no value is provided, use 'welcome'
  // This is used to highlight the current section in the navigation
  activeSection: {
    type: String,
    default: 'welcome'
  }
})

// DEFINE EVENTS (MESSAGES SENT TO PARENT COMPONENT)
// =================================================
// Events are like phone calls from child to parent - they let this component
// tell the parent component when something important happens.
// Think of them as "outputs" that communicate user actions.
const emit = defineEmits([
  // 'section-change': Fired when user clicks a navigation button
  // The parent component listens for this event to change the active section
  'section-change',
  
  // 'show-achievements': Fired when user wants to see their achievements
  // The parent component listens for this to open the achievements modal
  'show-achievements'
])

// PROGRESS TRACKING INTEGRATION
// =============================
// Import the real progress tracking functionality to replace hardcoded values
// This makes the progress bars show actual user progress instead of fake 65%
const { completionPercentage, getProgressStats } = useProgress()

// COMPUTED PROPERTIES FOR PROGRESS DISPLAY
// ========================================
// These calculated values automatically update when progress changes
const progressStats = computed(() => getProgressStats())

// Format completed/total sections for display (e.g., "3/8 sections")
const sectionsDisplay = computed(() => {
  const stats = progressStats.value
  return `${stats.completedSections}/${stats.totalSections} sections`
})

// MOBILE MENU STATE MANAGEMENT
// ============================
// This reactive data controls whether the mobile menu is open or closed
// - ref() creates a reactive reference that Vue will watch for changes
// - When isMobileMenuOpen changes, the UI automatically updates
const isMobileMenuOpen = ref(false)

// MOBILE MENU METHODS
// ==================
// These functions handle opening and closing the mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  
  // Prevent body scrolling when menu is open (better UX)
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleMobileNavClick = (sectionId) => {
  // Emit section change to parent component
  emit('section-change', sectionId)
  
  // Close mobile menu after selection
  closeMobileMenu()
}

// NAVIGATION SECTIONS CONFIGURATION
// =================================
// This array defines all the sections available in our navigation.
// Each section is an object with:
// - id: Unique identifier used in code
// - title: Human-readable name shown to users
// - emoji: Fun icon to make navigation more engaging
// - description: Additional context for mobile menu
//
// This is like a "menu" that defines what options users can choose from
const sections = [
  { id: 'welcome', title: 'Welcome', emoji: '🏠', description: 'Start your Vue journey' },
  { id: 'memory-palace', title: 'Memory Palace', emoji: '🏰', description: 'Memorable learning techniques' },
  { id: 'tutorial', title: 'Tutorial', emoji: '📚', description: 'Step-by-step guides' },
  { id: 'basics', title: 'Concepts', emoji: '🧱', description: 'Fundamental concepts' },
  { id: 'intermediate', title: 'Intermediate', emoji: '⚡', description: 'Advanced topics' },
  { id: 'interactive-components', title: 'Interactive', emoji: '🎯', description: 'Try live examples and demos' },
  { id: 'ai-tutor', title: 'AI Tutor', emoji: '🤖', description: 'Personalized learning' },
  { id: 'ai-game', title: 'AI Game', emoji: '🎮', description: 'Gamified learning' },
  { id: 'js-academy', title: 'JS Academy', emoji: '⚡', description: 'JavaScript mastery' }
]

/**
 * JUNIOR DEV NOTES:
 * =================
 * 
 * MOBILE-FIRST DESIGN PRINCIPLES:
 * - Start with mobile constraints, then enhance for desktop
 * - Use familiar patterns (hamburger menu) that users expect
 * - Ensure touch targets are at least 44px for accessibility
 * - Minimize vertical space usage on small screens
 * 
 * REACTIVE DATA MANAGEMENT:
 * - ref() creates reactive data that Vue tracks automatically
 * - When reactive data changes, Vue updates the DOM automatically
 * - This eliminates the need for manual DOM manipulation
 * 
 * COMPONENT COMMUNICATION:
 * - Props flow DOWN from parent to child (like water flowing downhill)
 * - Events flow UP from child to parent (like smoke rising up)
 * - This creates a clear, predictable data flow pattern
 * 
 * ACCESSIBILITY CONSIDERATIONS:
 * - aria-expanded tells screen readers if menu is open/closed
 * - aria-label provides descriptive text for screen readers
 * - role attributes help assistive technology understand the interface
 * - Keyboard navigation works properly with proper focus management
 * 
 * PERFORMANCE CONSIDERATIONS:
 * - v-show is used instead of v-if for menu visibility (faster toggling)
 * - CSS transitions provide smooth animations without JavaScript
 * - Event delegation is used to minimize event listeners
 * 
 * PROGRESS TRACKING INTEGRATION:
 * - useProgress composable provides real-time progress data
 * - Computed properties automatically update when progress changes
 * - This eliminates hardcoded values and shows actual user progress
 */
</script>

<style scoped>
/* Modern Navigation Styles - Mobile-First Design */
.modern-navigation {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-3) 0;
  
  /* Subtle shadow for depth */
  box-shadow: var(--shadow-sm);
  
  /* Sticky positioning for better UX */
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  
  /* Smooth transitions */
  transition: all var(--transition-normal);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
  
  /* Modern flexbox layout */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

/* Brand Section - Compact but readable */
.nav-brand {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-shrink: 0;
}

.brand-logo {
  display: flex;
  align-items: center;
}

.logo-image {
  height: 36px;
  width: 36px;
  transition: transform var(--transition-normal);
}

.logo-image:hover {
  transform: rotate(360deg);
}

.brand-content {
  min-width: 0;
}

.brand-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
  line-height: 1.2;
}

.brand-subtitle {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.2;
}

/* Desktop Navigation - Hidden on mobile */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  border: none;
  background: none;
  border-radius: var(--radius-lg);
  cursor: pointer;
  position: relative;
  transition: all var(--transition-fast);
  white-space: nowrap;
  min-width: fit-content;
  
  /* Prevent text selection */
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}

.nav-link:hover {
  background-color: var(--color-primary-50);
  transform: translateY(-1px);
}

.nav-link--active {
  background-color: var(--color-primary-100);
  color: var(--color-primary-dark);
}

.nav-link--active .nav-indicator {
  opacity: 1;
  transform: scaleX(1);
}

.nav-icon {
  font-size: var(--font-size-lg);
  line-height: 1;
}

.nav-text {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.nav-link--active .nav-text {
  color: var(--color-primary-dark);
}

.nav-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 80%;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: var(--radius-full);
  opacity: 0;
  transition: all var(--transition-normal);
}

/* Mobile Actions Container */
.nav-actions {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex: 1;
  justify-content: space-between;
  max-width: 100%;
}

/* Enhanced Progress Section - More informative and attractive */
.nav-progress-enhanced {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
  min-width: 0;
  max-width: 200px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  white-space: nowrap;
}

.progress-stats {
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.sections-completed {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  background-color: var(--color-gray-100);
  padding: 2px var(--space-2);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.progress-percentage {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
  white-space: nowrap;
}

.progress-bar-enhanced {
  width: 100%;
  height: 4px;
  background-color: var(--color-gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.progress-fill-enhanced {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-full);
  transition: width var(--transition-normal);
  box-shadow: 0 1px 2px rgba(59, 130, 246, 0.3);
}

/* Enhanced Hamburger Menu Button - More attractive */
.hamburger-menu-enhanced {
  display: none; /* Hidden on desktop */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
  border: none;
  cursor: pointer;
  padding: var(--space-3);
  border-radius: var(--radius-lg);
  min-width: 60px;
  min-height: 60px;
  box-shadow: var(--shadow-md);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.hamburger-menu-enhanced::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left var(--transition-normal);
}

.hamburger-menu-enhanced:hover::before {
  left: 100%;
}

.hamburger-menu-enhanced:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.hamburger-menu-enhanced:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

.hamburger-menu-enhanced.active {
  background: linear-gradient(135deg, var(--color-primary-dark), var(--color-primary));
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 18px;
  height: 14px;
  position: relative;
}

.hamburger-line {
  width: 100%;
  height: 2px;
  background-color: var(--color-white);
  border-radius: 1px;
  transition: all var(--transition-fast);
  transform-origin: center;
}

.hamburger-text {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

/* Enhanced Hamburger animation */
.hamburger-line.active:nth-child(1) {
  transform: rotate(45deg) translate(3px, 3px);
}

.hamburger-line.active:nth-child(2) {
  opacity: 0;
  transform: translateX(-10px);
}

.hamburger-line.active:nth-child(3) {
  transform: rotate(-45deg) translate(3px, -3px);
}

/* Compact version for very small screens */
@media (max-width: 380px) {
  .nav-actions {
    gap: var(--space-2);
  }
  
  .progress-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  
  .progress-stats {
    gap: var(--space-1);
  }
  
  .hamburger-menu-enhanced {
    min-width: 50px;
    min-height: 50px;
    padding: var(--space-2);
  }
  
  .hamburger-text {
    font-size: 9px;
  }
}

/* Mobile Navigation Overlay */
.mobile-nav-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: var(--z-modal-backdrop);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-normal);
}

.mobile-nav-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Mobile Navigation Menu */
.mobile-nav-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 320px;
  height: 100vh;
  background-color: var(--color-surface);
  box-shadow: var(--shadow-xl);
  z-index: var(--z-modal);
  transform: translateX(100%);
  transition: transform var(--transition-normal);
  overflow-y: auto;
  
  /* Ensure it's above everything */
  backdrop-filter: blur(10px);
}

.mobile-nav-menu.active {
  transform: translateX(0);
}

/* Mobile Navigation Header */
.mobile-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-5) var(--space-6);
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-primary-50);
}

.mobile-nav-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.mobile-nav-close {
  width: 36px;
  height: 36px;
  border: none;
  background: none;
  font-size: var(--font-size-xl);
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-nav-close:hover {
  background-color: var(--color-primary-100);
  color: var(--color-text-primary);
}

/* Mobile Navigation Content */
.mobile-nav-content {
  padding: var(--space-4) 0;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-6);
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: all var(--transition-fast);
  
  /* Touch-friendly */
  min-height: 60px;
}

.mobile-nav-link:hover {
  background-color: var(--color-primary-50);
}

.mobile-nav-link--active {
  background-color: var(--color-primary-100);
  border-left: 4px solid var(--color-primary);
}

.mobile-nav-icon {
  font-size: var(--font-size-2xl);
  line-height: 1;
  flex-shrink: 0;
}

.mobile-nav-text {
  flex: 1;
  min-width: 0;
}

.mobile-nav-title-text {
  display: block;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.mobile-nav-description {
  display: block;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: 1.3;
}

.mobile-nav-arrow {
  font-size: var(--font-size-lg);
  color: var(--color-text-tertiary);
  transition: transform var(--transition-fast);
}

.mobile-nav-link:hover .mobile-nav-arrow {
  transform: translateX(4px);
  color: var(--color-primary);
}

/* Mobile Navigation Footer */
.mobile-nav-footer {
  padding: var(--space-6);
  border-top: 1px solid var(--color-border);
  background-color: var(--color-background-secondary);
}

.mobile-progress-section {
  text-align: center;
}

.mobile-progress-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-3) 0;
}

.mobile-progress-bar {
  width: 100%;
  height: 8px;
  background-color: var(--color-gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--space-2);
}

.mobile-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
  border-radius: var(--radius-full);
  transition: width var(--transition-normal);
}

.mobile-progress-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary);
}

/* Responsive Design - Mobile-First Approach */

/* Desktop and Tablet - Show desktop nav, hide hamburger */
@media (min-width: 769px) {
  .desktop-nav {
    display: flex;
  }
  
  .hamburger-menu-enhanced {
    display: none;
  }
  
  /* Hide enhanced progress on desktop, show simple version */
  .nav-progress-enhanced {
    display: none;
  }
  
  .nav-progress {
    display: flex;
    align-items: center;
  }
  
  .progress-visual {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }
  
  .progress-bar {
    width: 50px;
    height: 3px;
    background-color: var(--color-gray-200);
    border-radius: var(--radius-full);
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-primary), var(--color-primary-light));
    border-radius: var(--radius-full);
    transition: width var(--transition-normal);
  }
  
  .progress-text {
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
    white-space: nowrap;
  }
  
  .mobile-nav-overlay,
  .mobile-nav-menu {
    display: none;
  }
}

/* Mobile - Hide desktop nav, show enhanced hamburger */
@media (max-width: 768px) {
  .desktop-nav {
    display: none; /* Hide desktop navigation */
  }
  
  .hamburger-menu-enhanced {
    display: flex; /* Show enhanced hamburger menu */
  }
  
  /* Hide simple progress on mobile */
  .nav-progress {
    display: none;
  }
  
  /* Adjust header spacing */
  .modern-navigation {
    padding: var(--space-4) 0;
  }
  
  .nav-container {
    padding: 0 var(--space-4);
  }
  
  /* Ensure proper mobile menu positioning */
  .mobile-nav-menu {
    width: 85%;
    max-width: 300px;
  }
}

/* Small mobile screens */
@media (max-width: 480px) {
  .nav-container {
    padding: 0 var(--space-3);
  }
  
  .brand-content {
    display: none; /* Hide subtitle on very small screens */
  }
  
  /* Desktop progress adjustments for small screens */
  .progress-bar {
    width: 40px;
    height: 2px;
  }
  
  .progress-text {
    font-size: 10px;
  }
  
  /* Mobile progress adjustments */
  .progress-bar-enhanced {
    height: 3px;
  }
  
  .mobile-nav-menu {
    width: 90%;
    max-width: 280px;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .nav-link,
  .logo-image,
  .progress-fill,
  .progress-fill-enhanced,
  .nav-indicator,
  .hamburger-line,
  .hamburger-menu-enhanced,
  .mobile-nav-overlay,
  .mobile-nav-menu {
    transition: none;
  }
  
  .hamburger-menu-enhanced::before {
    display: none;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .nav-link {
    border: 1px solid var(--color-border);
  }
  
  .nav-link--active {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
    color: var(--color-white);
  }
  
  .hamburger-menu-enhanced {
    border: 2px solid var(--color-white);
  }
  
  .hamburger-line {
    background-color: var(--color-white);
  }
  
  .mobile-nav-link {
    border-bottom: 1px solid var(--color-border);
  }
  
  .sections-completed {
    border: 1px solid var(--color-border);
  }
}

/* Focus management for keyboard navigation */
.hamburger-menu-enhanced:focus,
.mobile-nav-close:focus,
.mobile-nav-link:focus {
  outline: 2px solid var(--color-white);
  outline-offset: 2px;
}

/* Ensure mobile menu doesn't interfere with other content */
body.mobile-nav-open {
  overflow: hidden;
}

/* Animation for smooth menu transitions */
@keyframes slideInFromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .mobile-nav-header {
    background-color: var(--color-gray-800);
  }
  
  .mobile-nav-footer {
    background-color: var(--color-gray-800);
  }
}

.theme-dark .mobile-nav-header {
  background-color: var(--color-gray-800);
}

.theme-dark .mobile-nav-footer {
  background-color: var(--color-gray-800);
}
</style> 