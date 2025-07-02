<!--
  Vue Process Visualization Component
  
  This component creates an interactive, animated visualization of how Vue.js works internally.
  Users can step through the process to understand:
  - Template compilation
  - Virtual DOM creation
  - Reactivity system
  - Diff algorithm
  - DOM updates
  
  The visualization uses animations and interactive elements to make learning engaging.
-->

<template>
  <div class="vue-process-container">
    <!-- Header Section -->
    <div class="process-header">
      <h2 class="process-title">🔄 How Vue.js Works Internally</h2>
      <p class="process-description">
        Interactive visualization of Vue's internal process - from your code to the DOM
      </p>
    </div>

    <!-- Process Steps Navigation -->
    <div class="process-navigation">
      <button
        v-for="(step, index) in processSteps"
        :key="step.id"
        @click="setCurrentStep(index)"
        :class="[
          'step-button',
          { 'active': currentStepIndex === index },
          { 'completed': index < currentStepIndex }
        ]"
        :disabled="!canAccessStep(index)"
      >
        <div class="step-number">{{ index + 1 }}</div>
        <div class="step-info">
          <div class="step-title">{{ step.title }}</div>
          <div class="step-subtitle">{{ step.subtitle }}</div>
        </div>
        <div class="step-icon">{{ step.icon }}</div>
      </button>
    </div>

    <!-- Main Visualization Area -->
    <div class="visualization-container">
      <div class="process-stage" :class="`stage-${currentStep.id}`">
        <!-- Step Content -->
        <div class="stage-content">
          <div class="stage-header">
            <h3 class="stage-title">
              {{ currentStep.icon }} {{ currentStep.title }}
            </h3>
            <p class="stage-description">{{ currentStep.description }}</p>
          </div>

          <!-- Interactive Visualization -->
          <div class="interactive-demo">
            <TemplateCompilationDemo 
              v-if="currentStep.id === 'template-compilation'"
              :step-data="currentStep"
              :is-active="isStepActive"
              @step-completed="handleStepCompleted"
              @trigger-animation="triggerStepAnimation"
            />
            <VirtualDOMDemo 
              v-else-if="currentStep.id === 'virtual-dom'"
              :step-data="currentStep"
              :is-active="isStepActive"
              @step-completed="handleStepCompleted"
              @trigger-animation="triggerStepAnimation"
            />
            <ReactivitySystemDemo 
              v-else-if="currentStep.id === 'reactivity-system'"
              :step-data="currentStep"
              :is-active="isStepActive"
              @step-completed="handleStepCompleted"
              @trigger-animation="triggerStepAnimation"
            />
            <DiffAlgorithmDemo 
              v-else-if="currentStep.id === 'diff-algorithm'"
              :step-data="currentStep"
              :is-active="isStepActive"
              @step-completed="handleStepCompleted"
              @trigger-animation="triggerStepAnimation"
            />
            <DOMUpdatesDemo 
              v-else-if="currentStep.id === 'dom-updates'"
              :step-data="currentStep"
              :is-active="isStepActive"
              @step-completed="handleStepCompleted"
              @trigger-animation="triggerStepAnimation"
            />
            <ComponentLifecycleDemo 
              v-else-if="currentStep.id === 'component-lifecycle'"
              :step-data="currentStep"
              :is-active="isStepActive"
              @step-completed="handleStepCompleted"
              @trigger-animation="triggerStepAnimation"
            />
          </div>

          <!-- Explanation Panel -->
          <div class="explanation-panel">
            <h4 class="explanation-title">🧠 What's Happening Here?</h4>
            <div class="explanation-content">
              <p class="explanation-text">{{ currentStep.explanation }}</p>
              <div class="key-concepts">
                <h5>Key Concepts:</h5>
                <ul class="concept-list">
                  <li 
                    v-for="concept in currentStep.keyConcepts"
                    :key="concept"
                    class="concept-item"
                  >
                    {{ concept }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Process Controls -->
    <div class="process-controls">
      <button
        @click="previousStep"
        :disabled="currentStepIndex === 0"
        class="control-button control-button--secondary"
      >
        <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        Previous
      </button>

      <button
        @click="resetAnimation"
        class="control-button control-button--reset"
      >
        <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 4v6h6"/>
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
        </svg>
        Reset
      </button>

      <button
        @click="nextStep"
        :disabled="currentStepIndex === processSteps.length - 1"
        class="control-button control-button--primary"
      >
        Next
        <svg class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>

    <!-- Auto-play Controls -->
    <div class="autoplay-controls">
      <button
        @click="toggleAutoplay"
        :class="[
          'autoplay-button',
          { 'playing': isAutoPlaying }
        ]"
      >
        <svg v-if="!isAutoPlaying" class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polygon points="5,3 19,12 5,21"/>
        </svg>
        <svg v-else class="control-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="6" y="4" width="4" height="16"/>
          <rect x="14" y="4" width="4" height="16"/>
        </svg>
        {{ isAutoPlaying ? 'Pause' : 'Auto Play' }}
      </button>
      
      <div class="speed-control">
        <label for="speed-slider">Speed:</label>
        <input
          id="speed-slider"
          v-model="autoplaySpeed"
          type="range"
          min="1"
          max="5"
          step="1"
          class="speed-slider"
        >
        <span class="speed-label">{{ autoplaySpeed }}x</span>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Vue Process Visualization Component
 * 
 * This component creates an interactive learning experience that shows
 * how Vue.js works internally. It breaks down the complex process into
 * digestible, animated steps that help users understand:
 * 
 * 1. Template Compilation - How Vue transforms templates into render functions
 * 2. Virtual DOM Creation - How Vue creates a virtual representation
 * 3. Reactivity System - How Vue tracks changes and dependencies
 * 4. Diff Algorithm - How Vue efficiently compares virtual DOM trees
 * 5. DOM Updates - How Vue applies minimal changes to the real DOM
 * 6. Component Lifecycle - How components are born, live, and die
 */

// IMPORT VUE 3 COMPOSITION API
// ===========================
// These are the reactive superpowers that make our visualization interactive:
// - ref: Creates reactive variables that trigger UI updates
// - computed: Creates calculated values that update automatically
// - onMounted: Runs code when component is first displayed
// - onUnmounted: Cleanup code when component is removed
// - watch: Watches for changes and runs side effects
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// IMPORT VISUALIZATION COMPONENTS
// ==============================
// These are the individual step visualizations:
import TemplateCompilationDemo from './process-steps/TemplateCompilationDemo.vue'
import VirtualDOMDemo from './process-steps/VirtualDOMDemo.vue'
import ReactivitySystemDemo from './process-steps/ReactivitySystemDemo.vue'
import DiffAlgorithmDemo from './process-steps/DiffAlgorithmDemo.vue'
import DOMUpdatesDemo from './process-steps/DOMUpdatesDemo.vue'
import ComponentLifecycleDemo from './process-steps/ComponentLifecycleDemo.vue'

// REACTIVE STATE MANAGEMENT
// =========================
// These variables control the visualization flow and user interaction:

// currentStepIndex: Tracks which step of the process we're currently viewing
// This determines which visualization component is shown and which step is highlighted
const currentStepIndex = ref(0)

// isAutoPlaying: Controls whether the visualization automatically advances through steps
// When true, the visualization will automatically move to the next step after a delay
const isAutoPlaying = ref(false)

// autoplaySpeed: Controls how fast the auto-play moves through steps (1x to 5x speed)
// Higher numbers mean faster transitions between steps
const autoplaySpeed = ref(2)

// isStepActive: Tracks whether the current step's animation should be running
// This helps control when animations start and stop
const isStepActive = ref(true)

// completedSteps: Array tracking which steps the user has completed
// This helps show progress and determine which steps can be accessed
const completedSteps = ref([])

// autoplayTimer: Stores the timer ID for auto-play functionality
// Used to start/stop the automatic progression through steps
let autoplayTimer = null

// PROCESS STEPS CONFIGURATION
// ===========================
// This array defines all the steps in the Vue.js internal process
// Each step has its own component, explanation, and learning objectives
const processSteps = [
  {
    id: 'template-compilation',
    title: 'Template Compilation',
    subtitle: 'Code → Render Function',
    icon: '📝',
    component: 'TemplateCompilationDemo',
    description: 'Vue transforms your template into a JavaScript render function that creates virtual DOM nodes.',
    explanation: `
      When you write a Vue template with HTML-like syntax, Vue doesn't directly use that HTML. 
      Instead, it compiles your template into a JavaScript render function. This function is much 
      faster to execute and gives Vue more control over how your UI is created and updated.
      
      Think of it like translating a recipe written in English into a series of precise cooking 
      instructions that a robot chef can follow perfectly every time!
    `,
    keyConcepts: [
      'Templates are compiled into render functions at build time',
      'Render functions create virtual DOM nodes',
      'Compilation happens once, execution happens many times',
      'Compiled functions are much faster than parsing HTML'
    ]
  },
  {
    id: 'virtual-dom',
    title: 'Virtual DOM Creation',
    subtitle: 'Render Function → Virtual Nodes',
    icon: '🌳',
    component: 'VirtualDOMDemo',
    description: 'The render function creates a lightweight JavaScript representation of your DOM structure.',
    explanation: `
      The Virtual DOM is like a blueprint or a digital twin of your real DOM. It's a JavaScript 
      object that describes what your UI should look like, but it's much lighter and faster to 
      work with than the real DOM.
      
      Imagine you're an architect: instead of building a real house every time you want to try 
      a new design, you create detailed blueprints (Virtual DOM) that you can modify and compare 
      quickly before building the actual house (real DOM).
    `,
    keyConcepts: [
      'Virtual DOM is a JavaScript representation of the real DOM',
      'Virtual nodes are lightweight objects describing elements',
      'Creating virtual nodes is much faster than creating real DOM elements',
      'Virtual DOM enables efficient diffing and updates'
    ]
  },
  {
    id: 'reactivity-system',
    title: 'Reactivity System',
    subtitle: 'Data Changes → Dependency Tracking',
    icon: '⚡',
    component: 'ReactivitySystemDemo',
    description: 'Vue tracks which parts of your template depend on which data, creating a dependency graph.',
    explanation: `
      Vue's reactivity system is like having a super-smart assistant who remembers exactly which 
      parts of your website depend on which pieces of data. When data changes, this assistant 
      immediately knows which components need to be updated.
      
      It's like having a magical address book that automatically updates everyone's contact info 
      whenever someone moves - no manual work required!
    `,
    keyConcepts: [
      'Reactive data is wrapped in Proxy objects that track access',
      'Dependencies are collected when components render',
      'When data changes, only dependent components re-render',
      'This creates an efficient update system with minimal work'
    ]
  },
  {
    id: 'diff-algorithm',
    title: 'Diff Algorithm',
    subtitle: 'Old Virtual DOM ↔ New Virtual DOM',
    icon: '🔍',
    component: 'DiffAlgorithmDemo',
    description: 'Vue compares the old and new virtual DOM trees to find the minimal set of changes needed.',
    explanation: `
      The diff algorithm is like having a super-efficient editor who can spot exactly what changed 
      between two versions of a document. Instead of rewriting the entire document, the editor 
      creates a list of specific changes: "Change word 5 on line 3, add a paragraph after line 7."
      
      This means Vue only updates the parts of your webpage that actually changed, making 
      everything lightning fast!
    `,
    keyConcepts: [
      'Diffing compares old and new virtual DOM trees',
      'The algorithm finds the minimum set of changes needed',
      'Keys help Vue identify which elements moved vs. changed',
      'Efficient diffing is what makes Vue so fast'
    ]
  },
  {
    id: 'dom-updates',
    title: 'DOM Updates',
    subtitle: 'Virtual Changes → Real DOM',
    icon: '🎯',
    component: 'DOMUpdatesDemo',
    description: 'Vue applies the calculated changes to the real DOM with surgical precision.',
    explanation: `
      Finally, Vue takes the list of changes from the diff algorithm and applies them to the real DOM. 
      This is like a surgeon making precise, minimal incisions rather than performing major surgery.
      
      Vue batches these updates and applies them in the most efficient order possible, ensuring 
      your user interface updates smoothly without unnecessary work.
    `,
    keyConcepts: [
      'Only the necessary DOM operations are performed',
      'Updates are batched for optimal performance',
      'Vue applies changes in the correct order to avoid conflicts',
      'The real DOM is touched as little as possible'
    ]
  },
  {
    id: 'component-lifecycle',
    title: 'Component Lifecycle',
    subtitle: 'Birth → Life → Death',
    icon: '🔄',
    component: 'ComponentLifecycleDemo',
    description: 'Components go through predictable lifecycle phases, giving you hooks to run code at the right time.',
    explanation: `
      Every Vue component has a lifecycle - like a person being born, growing up, and eventually 
      passing away. Vue gives you "lifecycle hooks" that let you run code at specific moments 
      in this process.
      
      It's like having a calendar that automatically reminds you when to do certain tasks: 
      "When the component is born (mounted), set up the data. When it's about to leave (unmounted), 
      clean up the mess."
    `,
    keyConcepts: [
      'Components have predictable lifecycle phases',
      'Lifecycle hooks let you run code at specific moments',
      'Common hooks: onMounted, onUpdated, onUnmounted',
      'Proper lifecycle management prevents memory leaks'
    ]
  }
]

// COMPUTED PROPERTIES
// ==================
// These are automatically calculated values that update when their dependencies change

// currentStep: Gets the current step object based on the current index
// This automatically updates when currentStepIndex changes
const currentStep = computed(() => processSteps[currentStepIndex.value])

// canAccessStep: Function that determines if a user can access a specific step
// For now, all steps are accessible, but this could be extended for guided learning
const canAccessStep = (stepIndex) => {
  // For now, allow access to all steps
  // In the future, this could require completing previous steps
  return true
}

// progressPercentage: Calculates how much of the process has been completed
// Used for progress bars and completion tracking
const progressPercentage = computed(() => {
  return Math.round((currentStepIndex.value / (processSteps.length - 1)) * 100)
})

// METHODS
// =======
// These functions handle user interactions and visualization control

/**
 * Navigate to a specific step in the process
 * @param {number} stepIndex - The index of the step to navigate to
 */
const setCurrentStep = (stepIndex) => {
  if (canAccessStep(stepIndex)) {
    currentStepIndex.value = stepIndex
    isStepActive.value = true
    
    // Mark previous steps as completed
    for (let i = 0; i < stepIndex; i++) {
      if (!completedSteps.value.includes(i)) {
        completedSteps.value.push(i)
      }
    }
    
    console.log(`Navigated to step ${stepIndex + 1}: ${currentStep.value.title}`)
  }
}

/**
 * Move to the next step in the process
 */
const nextStep = () => {
  if (currentStepIndex.value < processSteps.length - 1) {
    setCurrentStep(currentStepIndex.value + 1)
  }
}

/**
 * Move to the previous step in the process
 */
const previousStep = () => {
  if (currentStepIndex.value > 0) {
    setCurrentStep(currentStepIndex.value - 1)
  }
}

/**
 * Reset the current step's animation
 */
const resetAnimation = () => {
  isStepActive.value = false
  
  // Restart animation after a brief delay
  setTimeout(() => {
    isStepActive.value = true
  }, 100)
  
  console.log(`Reset animation for step: ${currentStep.value.title}`)
}

/**
 * Toggle auto-play functionality
 */
const toggleAutoplay = () => {
  isAutoPlaying.value = !isAutoPlaying.value
  
  if (isAutoPlaying.value) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
}

/**
 * Start auto-play progression through steps
 */
const startAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
  }
  
  // Calculate delay based on speed (slower speed = longer delay)
  const delay = 4000 / autoplaySpeed.value // 4 seconds at 1x speed
  
  autoplayTimer = setInterval(() => {
    if (currentStepIndex.value < processSteps.length - 1) {
      nextStep()
    } else {
      // Reached the end, stop auto-play
      stopAutoplay()
    }
  }, delay)
  
  console.log(`Started auto-play at ${autoplaySpeed.value}x speed`)
}

/**
 * Stop auto-play progression
 */
const stopAutoplay = () => {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
  isAutoPlaying.value = false
  
  console.log('Stopped auto-play')
}

/**
 * Handle step completion events from child components
 * @param {Object} completionData - Data about the completed step
 */
const handleStepCompleted = (completionData) => {
  const stepIndex = currentStepIndex.value
  
  if (!completedSteps.value.includes(stepIndex)) {
    completedSteps.value.push(stepIndex)
  }
  
  console.log(`Step ${stepIndex + 1} completed:`, completionData)
  
  // Emit event to parent component for progress tracking
  emit('step-completed', {
    stepIndex,
    stepId: currentStep.value.id,
    completionData
  })
}

/**
 * Handle animation trigger events from child components
 * @param {Object} animationData - Data about the triggered animation
 */
const triggerStepAnimation = (animationData) => {
  console.log(`Animation triggered for step ${currentStepIndex.value + 1}:`, animationData)
  
  // Could be used to sync animations across components or trigger effects
  emit('animation-triggered', {
    stepIndex: currentStepIndex.value,
    stepId: currentStep.value.id,
    animationData
  })
}

// WATCHERS
// ========
// These watch for changes and perform side effects

// Watch autoplay speed changes and restart autoplay if it's running
watch(autoplaySpeed, (newSpeed) => {
  if (isAutoPlaying.value) {
    stopAutoplay()
    startAutoplay()
  }
  console.log(`Auto-play speed changed to ${newSpeed}x`)
})

// COMPONENT EVENTS
// ===============
// Define events that this component can emit to its parent
const emit = defineEmits([
  'step-completed',
  'animation-triggered',
  'process-completed'
])

// LIFECYCLE HOOKS
// ==============
// Code that runs at specific points in the component's lifecycle

// onMounted: Runs when the component is first displayed
onMounted(() => {
  console.log('Vue Process Visualization component mounted')
  
  // Start with the first step active
  isStepActive.value = true
  
  // Could add keyboard navigation here
  // document.addEventListener('keydown', handleKeyNavigation)
})

// onUnmounted: Cleanup when the component is removed
onUnmounted(() => {
  // Clean up any running timers
  stopAutoplay()
  
  console.log('Vue Process Visualization component unmounted')
})
</script>

<style scoped>
/* Vue Process Visualization Styles */
.vue-process-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-6);
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.05) 0%, 
    rgba(168, 85, 247, 0.05) 50%,
    rgba(236, 72, 153, 0.05) 100%);
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
}

.vue-process-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

/* Header Styles */
.process-header {
  text-align: center;
  margin-bottom: var(--space-8);
  position: relative;
  z-index: 1;
}

.process-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.process-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Process Navigation */
.process-navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.step-button {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
  position: relative;
  overflow: hidden;
}

.step-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.step-button.active {
  border-color: var(--color-primary);
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.1), 
    rgba(168, 85, 247, 0.1));
  box-shadow: var(--shadow-md);
}

.step-button.completed {
  border-color: var(--color-success);
  background: linear-gradient(135deg, 
    rgba(34, 197, 94, 0.1), 
    rgba(22, 163, 74, 0.1));
}

.step-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.step-number {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-sm);
  flex-shrink: 0;
}

.step-button.completed .step-number {
  background: var(--color-success);
}

.step-info {
  flex: 1;
}

.step-title {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.step-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.step-icon {
  font-size: var(--font-size-xl);
  flex-shrink: 0;
}

/* Visualization Container */
.visualization-container {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-6);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}

.process-stage {
  min-height: 600px;
  position: relative;
}

.stage-content {
  padding: var(--space-8);
}

.stage-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.stage-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.stage-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 800px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

.interactive-demo {
  margin-bottom: var(--space-8);
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Explanation Panel */
.explanation-panel {
  background: var(--color-background-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  border: 1px solid var(--color-border);
}

.explanation-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.explanation-content {
  display: grid;
  gap: var(--space-4);
}

.explanation-text {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.key-concepts h5 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.concept-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.concept-item {
  padding: var(--space-2) 0;
  color: var(--color-text-secondary);
  position: relative;
  padding-left: var(--space-4);
}

.concept-item::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-success);
  font-weight: bold;
}

/* Process Controls */
.process-controls {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.control-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: none;
}

.control-button--primary {
  background: var(--color-primary);
  color: var(--color-white);
}

.control-button--primary:hover:not(:disabled) {
  background: var(--color-primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.control-button--secondary {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

.control-button--secondary:hover:not(:disabled) {
  background: var(--color-background-secondary);
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.control-button--reset {
  background: var(--color-background-secondary);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}

.control-button--reset:hover:not(:disabled) {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border-color: var(--color-secondary);
}

.control-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-icon {
  width: 20px;
  height: 20px;
}

/* Auto-play Controls */
.autoplay-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-6);
  padding: var(--space-4);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
}

.autoplay-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--color-secondary);
  color: var(--color-white);
  border: none;
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.autoplay-button:hover {
  background: var(--color-secondary-dark);
  transform: translateY(-1px);
}

.autoplay-button.playing {
  background: var(--color-warning);
}

.autoplay-button.playing:hover {
  background: var(--color-warning-dark);
}

.speed-control {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.speed-control label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.speed-slider {
  width: 100px;
  height: 4px;
  background: var(--color-border);
  border-radius: var(--radius-full);
  outline: none;
  cursor: pointer;
}

.speed-slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  cursor: pointer;
}

.speed-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  cursor: pointer;
  border: none;
}

.speed-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  min-width: 24px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .vue-process-container {
    padding: var(--space-4);
  }
  
  .process-navigation {
    grid-template-columns: 1fr;
  }
  
  .step-button {
    padding: var(--space-3);
  }
  
  .stage-content {
    padding: var(--space-6);
  }
  
  .process-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .autoplay-controls {
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .speed-control {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .process-title {
    font-size: var(--font-size-2xl);
  }
  
  .step-info {
    display: none;
  }
  
  .step-button {
    justify-content: center;
    min-width: 60px;
  }
  
  .control-button {
    padding: var(--space-2) var(--space-4);
    font-size: var(--font-size-sm);
  }
}

/* Animation and transition effects */
.process-stage {
  transition: all var(--transition-normal);
}

.stage-template-compilation {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(99, 102, 241, 0.02));
}

.stage-virtual-dom {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.02));
}

.stage-reactivity-system {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(168, 85, 247, 0.02));
}

.stage-diff-algorithm {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(245, 158, 11, 0.02));
}

.stage-dom-updates {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.02));
}

.stage-component-lifecycle {
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.05), rgba(20, 184, 166, 0.02));
}
</style> 