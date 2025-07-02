<!--
  Modern Interactive Emoji Component - Redesigned for better UX
  
  Key improvements:
  - Clean, card-based design following modern patterns
  - Better visual hierarchy and spacing
  - Improved accessibility with proper ARIA labels
  - Consistent with our design system
  - Better performance with optimized animations
  - Clear visual feedback and micro-interactions
-->

<template>
  <div class="emoji-playground-modern">
    <!-- Header section with clear hierarchy -->
    <div class="playground-header">
      <div class="header-content">
        <h3 class="playground-title">Interactive Emoji Playground</h3>
        <p class="playground-description">
          Experience Vue's reactivity system in action. Click buttons to create animated emojis 
          that demonstrate real-time DOM updates and event handling.
        </p>
      </div>
      
      <!-- Live statistics with modern styling -->
      <div class="playground-stats">
        <div class="stat-card">
          <span class="stat-number">{{ activeEmojis.length }}</span>
          <span class="stat-label">Active</span>
        </div>
        <div class="stat-card">
          <span class="stat-number">{{ totalEmojiCount }}</span>
          <span class="stat-label">Total Created</span>
        </div>
      </div>
    </div>

    <!-- Action buttons with modern card design -->
    <div class="emoji-controls">
      <div class="control-buttons">
        <button
          v-for="emojiData in availableEmojis"
          :key="emojiData.name"
          @click="createEmoji(emojiData)"
          :class="[
            'emoji-action-button',
            `emoji-action-button--${emojiData.name}`
          ]"
          :style="{
            '--button-accent': emojiData.color
          }"
          :title="`Create ${emojiData.name} emoji`"
          :aria-label="`Add ${emojiData.name} emoji to playground`"
        >
          <!-- Emoji icon with better sizing -->
          <span class="button-emoji" aria-hidden="true">{{ emojiData.emoji }}</span>
          
          <!-- Button text with proper typography -->
          <span class="button-text">{{ emojiData.name }}</span>
          
          <!-- Visual accent indicator -->
          <div class="button-accent" aria-hidden="true"></div>
        </button>
      </div>
      
      <!-- Clear action with modern styling -->
      <button 
        v-if="activeEmojis.length > 0"
        @click="clearAllEmojis"
        class="clear-all-button"
        title="Clear all active emojis"
        aria-label="Remove all emojis from playground"
      >
        <svg class="clear-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 6h18"/>
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
          <path d="M8 6V4c0-1 1-2 2-2h4c0 1 1 2 2 2v2"/>
        </svg>
        Clear All
      </button>
    </div>

    <!-- Interactive canvas with modern styling -->
    <div class="emoji-canvas-container">
      <div class="canvas-header">
        <h4 class="canvas-title">Live Emoji Canvas</h4>
        <p class="canvas-description">Watch emojis appear and animate in real-time</p>
      </div>
      
      <!-- The main interactive area -->
      <div class="emoji-canvas-modern" ref="emojiCanvas">
        <!-- Empty state with helpful guidance -->
        <div v-if="activeEmojis.length === 0" class="canvas-empty-state">
          <div class="empty-state-icon">🎭</div>
          <p class="empty-state-text">Click the buttons above to create animated emojis!</p>
        </div>
        
        <!-- Dynamic emoji elements with modern styling -->
        <div
          v-for="emoji in activeEmojis"
          :key="emoji.id"
          :class="[
            'floating-emoji-modern',
            `floating-emoji--${emoji.type}`,
            { 'floating-emoji--removing': emoji.isRemoving }
          ]"
          :style="{
            left: emoji.x + 'px',
            top: emoji.y + 'px',
            '--emoji-accent': emoji.color,
            '--animation-delay': emoji.animationDelay + 's',
            '--rotation': emoji.rotation + 'deg'
          }"
          :title="`${emoji.emoji} ${emoji.type} emoji`"
        >
          {{ emoji.emoji }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Modern Interactive Emoji Component
 * 
 * This redesigned component demonstrates:
 * - Clean, modern UI with card-based design
 * - Better accessibility and user experience
 * - Optimized performance and animations
 * - Consistent with our design system
 * - Clear visual hierarchy and feedback
 */

import { ref, computed, onMounted, nextTick } from 'vue'
import { EMOJI_DATA } from '../../data/vueData.js'
import { useNotifications } from '../../composables/useNotifications.js'

// Composables for user feedback
const { showInteractiveFeedback } = useNotifications()

// Reactive state management
const activeEmojis = ref([]) // Currently visible emojis
const totalEmojiCount = ref(0) // Total emojis created in session
const emojiCanvas = ref(null) // Template ref for canvas DOM element

// Available emoji options from data
const availableEmojis = computed(() => EMOJI_DATA)

// Unique ID generator for proper Vue key tracking
let emojiIdCounter = 0

/**
 * Create a new emoji with modern positioning and animations
 * Demonstrates Vue's reactivity and modern UX patterns
 */
const createEmoji = async (emojiData) => {
  // Ensure DOM is ready for calculations
  await nextTick()
  
  // Get canvas boundaries for proper positioning
  const canvas = emojiCanvas.value
  if (!canvas) return
  
  const canvasRect = canvas.getBoundingClientRect()
  const emojiSize = 60 // Account for emoji size
  const padding = 20 // Padding from edges
  
  const maxX = Math.max(canvasRect.width - emojiSize - padding, 50)
  const maxY = Math.max(canvasRect.height - emojiSize - padding, 50)
  
  // Create new emoji with randomized properties
  const newEmoji = {
    id: ++emojiIdCounter, // Unique ID for Vue tracking
    emoji: emojiData.emoji,
    type: emojiData.name,
    color: emojiData.color,
    // Smart positioning within canvas bounds
    x: padding + Math.random() * maxX,
    y: padding + Math.random() * maxY,
    // Varied animation properties for visual interest
    animationDelay: Math.random() * 0.3,
    rotation: Math.random() * 360,
    isRemoving: false // Flag for removal animation
  }
  
  // Add to reactive array - Vue automatically updates DOM
  activeEmojis.value.push(newEmoji)
  totalEmojiCount.value++
  
  // Provide user feedback with modern notification
  showInteractiveFeedback(
    'Emoji Added',
    `${emojiData.emoji} ${emojiData.name} emoji created successfully!`
  )
  
  // Auto-cleanup after 4 seconds with smooth animation
  setTimeout(() => {
    removeEmoji(newEmoji.id, true)
  }, 4000)
  
  console.log(`Created ${emojiData.name} emoji at (${Math.round(newEmoji.x)}, ${Math.round(newEmoji.y)})`)
}

/**
 * Remove emoji with optional animation
 * Demonstrates proper cleanup and smooth UX transitions
 */
const removeEmoji = (emojiId, useAnimation = false) => {
  const emojiIndex = activeEmojis.value.findIndex(emoji => emoji.id === emojiId)
  
  if (emojiIndex === -1) return // Emoji not found
  
  if (useAnimation) {
    // Start removal animation
    activeEmojis.value[emojiIndex].isRemoving = true
    
    // Complete removal after animation
    setTimeout(() => {
      const currentIndex = activeEmojis.value.findIndex(emoji => emoji.id === emojiId)
      if (currentIndex !== -1) {
        activeEmojis.value.splice(currentIndex, 1)
      }
    }, 600) // Match CSS animation duration
  } else {
    // Immediate removal
    activeEmojis.value.splice(emojiIndex, 1)
  }
}

/**
 * Clear all emojis with user confirmation and feedback
 * Demonstrates batch operations and user-friendly interactions
 */
const clearAllEmojis = () => {
  const count = activeEmojis.value.length
  
  if (count === 0) return
  
  // Animate all emojis out
  activeEmojis.value.forEach(emoji => {
    emoji.isRemoving = true
  })
  
  // Clear array after animation completes
  setTimeout(() => {
    activeEmojis.value = []
  }, 600)
  
  // Show feedback to user
  showInteractiveFeedback(
    'Canvas Cleared',
    `Removed ${count} emoji${count > 1 ? 's' : ''} from the playground`
  )
  
  console.log(`Cleared ${count} emojis from canvas`)
}

// Initialize component
onMounted(() => {
  console.log('Modern Emoji Playground initialized')
})
</script>

<style scoped>
/* Modern Emoji Playground Styles */
.emoji-playground-modern {
  /* Clean container with proper spacing */
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-6);
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

/* Header section with modern typography */
.playground-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-6);
}

.header-content {
  flex: 1;
}

.playground-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.playground-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
  max-width: 500px;
}

/* Statistics cards with modern design */
.playground-stats {
  display: flex;
  gap: var(--space-3);
  flex-shrink: 0;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-background-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  min-width: 70px;
}

.stat-number {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary);
  line-height: var(--line-height-tight);
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Control section with modern button design */
.emoji-controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.control-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
}

/* Modern action buttons */
.emoji-action-button {
  /* Reset button styles */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  /* Modern button styling */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4);
  
  /* Clean background and borders */
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  
  /* Typography */
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  
  /* Smooth transitions */
  transition: all var(--transition-fast);
  
  /* Layout */
  min-width: 90px;
  position: relative;
  overflow: hidden;
  
  /* Subtle shadow */
  box-shadow: var(--shadow-sm);
}

/* Hover states for better interaction */
.emoji-action-button:hover {
  background-color: var(--color-background-secondary);
  border-color: var(--color-border-focus);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Focus styles for accessibility */
.emoji-action-button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Active state feedback */
.emoji-action-button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Button emoji styling */
.button-emoji {
  font-size: var(--font-size-2xl);
  line-height: 1;
  display: block;
}

/* Button text styling */
.button-text {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: capitalize;
  line-height: var(--line-height-tight);
}

/* Accent indicator */
.button-accent {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--button-accent);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.emoji-action-button:hover .button-accent {
  opacity: 1;
}

/* Clear all button with distinct styling */
.clear-all-button {
  /* Reset and base styles */
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  
  /* Modern styling */
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  
  /* Distinct styling for destructive action */
  background-color: var(--color-error);
  color: var(--color-white);
  border: 1px solid var(--color-error);
  border-radius: var(--radius-md);
  
  /* Typography */
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  
  /* Transitions */
  transition: all var(--transition-fast);
  
  /* Self-align */
  align-self: flex-start;
}

.clear-all-button:hover {
  background-color: #dc2626;
  border-color: #dc2626;
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.clear-icon {
  width: 16px;
  height: 16px;
}

/* Canvas container with modern card design */
.emoji-canvas-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.canvas-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.canvas-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.canvas-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Modern canvas styling */
.emoji-canvas-modern {
  position: relative;
  width: 100%;
  height: 300px;
  background-color: var(--color-background-secondary);
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  
  /* Subtle pattern for visual interest */
  background-image: radial-gradient(circle at 1px 1px, var(--color-border-light) 1px, transparent 0);
  background-size: 20px 20px;
}

/* Empty state with helpful guidance */
.canvas-empty-state {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: var(--color-text-tertiary);
}

.empty-state-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-2);
  opacity: 0.5;
}

.empty-state-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin: 0;
}

/* Modern floating emoji styling */
.floating-emoji-modern {
  position: absolute;
  font-size: 2.5rem;
  line-height: 1;
  cursor: default;
  user-select: none;
  z-index: 1;
  
  /* Modern animation */
  animation: floatIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Smooth transitions */
  transition: all var(--transition-normal);
  
  /* Subtle glow effect */
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
}

/* Removal animation */
.floating-emoji--removing {
  animation: floatOut 0.6s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards;
}

/* Modern animations */
@keyframes floatIn {
  0% {
    opacity: 0;
    transform: scale(0) rotate(var(--rotation));
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(calc(var(--rotation) + 180deg));
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(var(--rotation));
  }
}

@keyframes floatOut {
  0% {
    opacity: 1;
    transform: scale(1) rotate(var(--rotation));
  }
  100% {
    opacity: 0;
    transform: scale(0) rotate(calc(var(--rotation) + 180deg));
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .emoji-playground-modern {
    padding: var(--space-4);
    gap: var(--space-4);
  }
  
  .playground-header {
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .playground-stats {
    align-self: center;
  }
  
  .control-buttons {
    justify-content: center;
  }
  
  .emoji-action-button {
    min-width: 80px;
    padding: var(--space-3);
  }
  
  .emoji-canvas-modern {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .playground-title {
    font-size: var(--font-size-lg);
  }
  
  .emoji-action-button {
    min-width: 70px;
    padding: var(--space-2);
  }
  
  .button-emoji {
    font-size: var(--font-size-xl);
  }
  
  .floating-emoji-modern {
    font-size: 2rem;
  }
  
  .emoji-canvas-modern {
    height: 200px;
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  .floating-emoji-modern {
    animation: none;
  }
  
  .emoji-action-button,
  .clear-all-button {
    transition: none;
  }
  
  .emoji-action-button:hover,
  .clear-all-button:hover {
    transform: none;
  }
}
</style> 