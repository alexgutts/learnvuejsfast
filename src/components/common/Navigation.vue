<!--
  Navigation Component - Main navigation bar for the Vue 3 Learning Application
  
  This component provides horizontal navigation with:
  - Icons and labels for each section
  - Active state styling with smooth transitions
  - Tooltips for accessibility
  - Progress indicators showing completion status
  - Responsive design for mobile and desktop
-->

<template>
  <nav class="learning-navigation" role="navigation" aria-label="Learning sections">
    <!-- Navigation container with flex layout -->
    <div class="nav-container">
      <!-- Left side: App title and logo -->
      <div class="nav-brand">
        <div class="logo-container">
          <!-- Vue logo with animated spin on hover -->
          <img 
            src="/src/assets/logo.svg" 
            alt="Vue.js Logo" 
            class="vue-logo"
          />
        </div>
        <div class="brand-text">
          <h1 class="app-title">Vue 3 Learning</h1>
          <p class="app-subtitle">Interactive Tutorial</p>
        </div>
      </div>

      <!-- Center: Main navigation links -->
      <div class="nav-links">
        <button
          v-for="section in navigationSections"
          :key="section.id"
          @click="handleSectionClick(section.id)"
          :class="[
            'nav-link',
            { 'nav-link--active': activeSection === section.id }
          ]"
          :aria-current="activeSection === section.id ? 'page' : null"
          :title="section.description"
        >
          <!-- Icon container with progress indicator overlay -->
          <div class="nav-icon-container">
            <!-- MDI Icon using string format for dynamic icons -->
            <svg class="nav-icon" viewBox="0 0 24 24">
              <path :d="getIconPath(section.icon)" />
            </svg>
            
            <!-- Progress indicator ring for completed sections -->
            <div 
              v-if="getSectionProgress(section.id) > 0"
              class="progress-ring"
              :style="{ '--progress': getSectionProgress(section.id) }"
            >
              <svg class="progress-circle" viewBox="0 0 36 36">
                <path
                  class="progress-bg"
                  d="m18,2.0845
                    a 15.9155,15.9155 0 0,1 0,31.831
                    a 15.9155,15.9155 0 0,1 0,-31.831"
                />
                <path
                  class="progress-fill"
                  :stroke-dasharray="`${getSectionProgress(section.id)}, 100`"
                  d="m18,2.0845
                    a 15.9155,15.9155 0 0,1 0,31.831
                    a 15.9155,15.9155 0 0,1 0,-31.831"
                />
              </svg>
            </div>
          </div>
          
          <!-- Section title and completion status -->
          <div class="nav-text">
            <span class="nav-title">{{ section.title }}</span>
            <span class="nav-description">{{ section.description }}</span>
            
            <!-- Completion badge for fully completed sections -->
            <div 
              v-if="getSectionProgress(section.id) === 100"
              class="completion-badge"
              title="Section completed!"
            >
              ✓
            </div>
          </div>

          <!-- Active indicator line -->
          <div class="active-indicator"></div>
        </button>
      </div>

      <!-- Right side: Progress overview and settings -->
      <div class="nav-actions">
        <!-- Overall progress display -->
        <div class="progress-overview" :title="`${completionPercentage}% Complete`">
          <div class="progress-circle-small">
            <svg viewBox="0 0 36 36" class="circular-chart">
              <path
                class="circle-bg"
                d="m18,2.0845
                  a 15.9155,15.9155 0 0,1 0,31.831
                  a 15.9155,15.9155 0 0,1 0,-31.831"
              />
              <path
                class="circle"
                :stroke-dasharray="`${completionPercentage}, 100`"
                d="m18,2.0845
                  a 15.9155,15.9155 0 0,1 0,31.831
                  a 15.9155,15.9155 0 0,1 0,-31.831"
              />
            </svg>
            <div class="percentage">{{ completionPercentage }}%</div>
          </div>
        </div>

        <!-- Achievement notification bell -->
        <button 
          class="achievement-bell"
          @click="showAchievements"
          :class="{ 'has-new': hasNewAchievements }"
          title="View achievements"
        >
          <svg class="bell-icon" viewBox="0 0 24 24">
            <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7A7,7 0 0,1 20,14V16A1,1 0 0,1 19,17H5A1,1 0 0,1 4,16V14A7,7 0 0,1 11,7V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M19,19A1,1 0 0,1 18,20H6A1,1 0 0,1 5,19V18H19V19Z" />
          </svg>
          <div v-if="hasNewAchievements" class="notification-dot"></div>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
/**
 * Navigation Component Script
 * 
 * This component manages:
 * - Navigation between different learning sections
 * - Progress tracking and display
 * - Achievement notifications
 * - Responsive layout and accessibility
 */

import { computed, onMounted } from 'vue'
import { NAVIGATION_SECTIONS } from '../../data/vueData.js'
import { useProgress } from '../../composables/useProgress.js'
import { useNotifications } from '../../composables/useNotifications.js'

// Props - receive active section from parent component
const props = defineProps({
  activeSection: {
    type: String,
    default: 'tutorial'
  }
})

// Emits - communicate section changes back to parent
const emit = defineEmits(['section-change', 'show-achievements'])

// Composables for state management
const { 
  completionPercentage, 
  isSectionComplete,
  getUnlockedAchievements 
} = useProgress()

const { showWelcomeMessage } = useNotifications()

// Computed properties
const navigationSections = computed(() => NAVIGATION_SECTIONS)

// Check if there are new achievements (simplified logic)
const hasNewAchievements = computed(() => {
  return getUnlockedAchievements().length > 0
})

// Methods
const handleSectionClick = (sectionId) => {
  // Emit section change to parent component
  emit('section-change', sectionId)
  
  // Add some visual feedback with a subtle animation
  // This could trigger a small scale animation on the clicked item
  console.log(`Navigating to section: ${sectionId}`)
}

const getSectionProgress = (sectionId) => {
  // For now, return 100% if section is complete, 0% otherwise
  // In a more complex app, this could track partial completion
  return isSectionComplete(sectionId) ? 100 : 0
}

const getIconPath = (iconName) => {
  // Icon paths for MDI icons - these correspond to the icon names in our data
  const iconPaths = {
    'mdi-school': 'M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z',
    'mdi-book-open-variant': 'M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.5 6.5,20.5C8.45,20.5 10.55,20.9 12,22C13.35,21.15 15.8,20.5 17.5,20.5C19.15,20.5 20.85,20.81 22.25,21.56C22.35,21.61 22.4,21.66 22.5,21.66C22.75,21.66 23,21.41 23,21.16V6.5C22.4,6.05 21.75,5.75 21,5.5V7.5L21,13V19C20.38,18.78 19.8,18.61 19,18.61C17.85,18.61 16.25,18.78 15,19.06V8.5C14.75,8.25 14.5,8 14.25,7.75C13.75,7.25 13.25,6.75 12.75,6.25C12.25,5.75 11.75,5.25 11.25,4.75C10.75,4.25 10.25,3.75 9.75,3.25C9.25,2.75 8.75,2.25 8.25,1.75C7.75,1.25 7.25,0.75 6.75,0.25C6.5,0 6.25,0 6,0C5.75,0 5.5,0 5.25,0.25C4.75,0.75 4.25,1.25 3.75,1.75C3.25,2.25 2.75,2.75 2.25,3.25C1.75,3.75 1.25,4.25 0.75,4.75C0.25,5.25 0,5.75 0,6.25V21.16C0,21.41 0.25,21.66 0.5,21.66C0.6,21.66 0.65,21.59 0.75,21.59C2.1,20.94 4.05,20.5 5.5,20.5C6.95,20.5 8.4,20.94 9.75,21.59C9.85,21.64 9.9,21.66 10,21.66C10.25,21.66 10.5,21.41 10.5,21.16V6.5C9.9,6.05 9.25,5.75 8.5,5.5V7.5L8.5,13V19C7.88,18.78 7.3,18.61 6.5,18.61C5.35,18.61 3.75,18.78 2.5,19.06V8.5C2.25,8.25 2,8 1.75,7.75C1.25,7.25 0.75,6.75 0.25,6.25C0,6 0,5.75 0,5.5V1.75C0,1.5 0.25,1.25 0.5,1.25C0.75,1.25 1,1.5 1,1.75V5.5C1,5.75 1.25,6 1.5,6C1.75,6 2,5.75 2,5.5V1.75C2,1.5 2.25,1.25 2.5,1.25C2.75,1.25 3,1.5 3,1.75V5.5C3,5.75 3.25,6 3.5,6C3.75,6 4,5.75 4,5.5V1.75',
    'mdi-code-braces': 'M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3',
    'mdi-rocket-launch': 'M13.13,22.19L11.5,18.36C13.07,17.78 14.54,17 15.9,16.09L13.13,22.19M5.64,12.5L1.81,10.87L7.91,8.1C7,9.46 6.22,10.93 5.64,12.5M21.61,2.39C21.61,2.39 16.66,3.85 12.98,7.53C10.93,9.58 10.31,11.66 10.97,13.4C11.63,15.14 12.39,16.38 14.68,18.67C17.66,21.65 22.61,22.39 22.61,22.39C22.61,22.39 23.35,17.44 20.37,14.46C18.08,12.17 16.84,11.41 15.1,10.75C13.36,10.09 11.28,10.71 9.23,12.76C5.55,16.44 4.09,21.39 4.09,21.39L2.39,22.61L7.53,13.98C8.5,12.5 9.64,11.2 10.97,10.07C11.53,9.51 12.1,8.97 12.7,8.46L15.54,5.62C16.38,4.78 17.68,4.78 18.52,5.62C19.36,6.46 19.36,7.76 18.52,8.6L15.68,11.44C15.17,12.04 14.63,12.61 14.07,13.17C12.94,14.5 11.64,15.64 10.16,16.61L21.61,2.39Z'
  }
  
  return iconPaths[iconName] || iconPaths['mdi-school']
}

const showAchievements = () => {
  // Emit event to parent to show achievements modal/panel
  emit('show-achievements')
}

// Lifecycle hooks
onMounted(() => {
  // Show welcome message for new users (only on first visit)
  if (completionPercentage.value === 0) {
    setTimeout(() => {
      showWelcomeMessage()
    }, 1000) // Delay to let the UI load first
  }
})
</script>

<style scoped>
/**
 * Navigation Component Styles
 * 
 * Features modern, professional styling with:
 * - Smooth transitions and hover effects
 * - Progress indicators and completion badges
 * - Responsive design for mobile and desktop
 * - Accessible focus states and ARIA support
 * - Consistent color scheme and typography
 */

.learning-navigation {
  /* Main container styling */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.nav-container {
  /* Flexbox layout for the navigation content */
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  gap: 2rem;
}

/* Brand section (left side) */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
}

.logo-container {
  /* Vue logo with hover animation */
  width: 40px;
  height: 40px;
  transition: transform 0.3s ease;
}

.logo-container:hover {
  transform: rotate(360deg);
}

.vue-logo {
  width: 100%;
  height: 100%;
  filter: brightness(1.2);
}

.brand-text {
  /* App title and subtitle */
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.app-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #ffffff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.app-subtitle {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.8;
  font-weight: 400;
}

/* Navigation links (center) */
.nav-links {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
  align-items: center;
}

.nav-link {
  /* Individual navigation button styling */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-width: 120px;
  backdrop-filter: blur(5px);
}

.nav-link:hover {
  /* Hover state with subtle glow effect */
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.nav-link--active {
  /* Active state with stronger visual emphasis */
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.nav-link--active .active-indicator {
  /* Active indicator line at the bottom */
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3B82F6, #8B5CF6);
  border-radius: 3px 3px 0 0;
}

/* Icon and progress container */
.nav-icon-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
  transition: transform 0.3s ease;
}

.nav-link:hover .nav-icon {
  transform: scale(1.1);
}

/* Progress ring around icons */
.progress-ring {
  position: absolute;
  top:-4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  pointer-events: none;
}

.progress-circle {
  width: 32px;
  height: 32px;
  transform: rotate(-90deg);
}

.progress-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 2;
}

.progress-fill {
  fill: none;
  stroke: #10B981;
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke-dasharray 0.5s ease;
}

/* Text content */
.nav-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  position: relative;
}

.nav-title {
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
}

.nav-description {
  font-size: 0.75rem;
  opacity: 0.8;
  text-align: center;
  line-height: 1.2;
}

/* Completion badge */
.completion-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #10B981;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

/* Right side actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Overall progress display */
.progress-overview {
  color: white;
  cursor: pointer;
}

.progress-circle-small {
  position: relative;
  width: 50px;
  height: 50px;
}

.circular-chart {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circle-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 3;
}

.circle {
  fill: none;
  stroke: #10B981;
  stroke-width: 3;
  stroke-linecap: round;
  transition: stroke-dasharray 0.5s ease;
}

.percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
}

/* Achievement bell */
.achievement-bell {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.75rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.achievement-bell:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.achievement-bell.has-new {
  animation: pulse 2s infinite;
}

.bell-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.notification-dot {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: #EF4444;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3);
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-brand {
    order: 1;
  }
  
  .nav-links {
    order: 3;
    gap: 0.25rem;
    overflow-x: auto;
    padding: 0.5rem 0;
  }
  
  .nav-actions {
    order: 2;
  }
  
  .nav-link {
    min-width: 100px;
    padding: 0.75rem;
    gap: 0.25rem;
  }
  
  .nav-title {
    font-size: 0.75rem;
  }
  
  .nav-description {
    display: none;
  }
  
  .app-title {
    font-size: 1.25rem;
  }
}

/* Focus states for accessibility */
.nav-link:focus,
.achievement-bell:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .nav-link,
  .nav-icon,
  .progress-fill,
  .circle,
  .logo-container {
    transition: none;
  }
  
  .achievement-bell.has-new {
    animation: none;
  }
}
</style> 