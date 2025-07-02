<!--
  InteractiveTutorial Component - Main hands-on learning experience for Vue 3 concepts
  
  This component demonstrates:
  - Complex component composition and state management
  - Dynamic content rendering with v-for and v-if
  - Progress tracking and completion states
  - Tab interface with smooth transitions
  - Interactive code examples and live previews
  - Integration with progress tracking composables
-->

<template>
  <div class="interactive-tutorial">
    <!-- Tutorial header with progress overview -->
    <div class="tutorial-header">
      <div class="header-content">
        <h2 class="tutorial-title">🚀 Interactive Vue 3 Tutorial</h2>
        <p class="tutorial-subtitle">
          Learn Vue 3 concepts through hands-on examples and interactive exercises.
          Complete each section to unlock achievements and track your progress!
        </p>
      </div>
      
      <!-- Progress overview bar -->
      <div class="progress-overview">
        <div class="progress-info">
          <span class="progress-text">
            Progress: {{ completedSections.length }}/{{ tutorialSections.length }} sections
          </span>
          <span class="progress-percentage">{{ completionPercentage }}%</span>
        </div>
        <div class="progress-bar">
          <div 
            class="progress-fill" 
            :style="{ width: completionPercentage + '%' }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Tab navigation for tutorial sections -->
    <div class="tutorial-tabs">
      <div class="tab-list" role="tablist">
        <button
          v-for="(section, index) in tutorialSections"
          :key="section.id"
          @click="setActiveSection(section.id)"
          @keydown="handleTabKeydown($event, section.id)"
          :class="[
            'tab-button',
            { 
              'tab-button--active': activeSection === section.id,
              'tab-button--completed': isSectionComplete(section.id)
            }
          ]"
          :aria-selected="activeSection === section.id"
          :aria-controls="`panel-${section.id}`"
          :tabindex="activeSection === section.id ? 0 : -1"
          role="tab"
          :title="`${section.title} - ${section.estimatedTime} - ${section.difficulty} - Progress: ${getSectionProgressPercentage(section.id)}%`"
        >
          <!-- Section icon with completion indicator -->
          <div class="tab-icon-container">
            <svg class="tab-icon" viewBox="0 0 24 24">
              <path :d="getIconPath(section.icon)" />
            </svg>
            <div 
              v-if="isSectionComplete(section.id)" 
              class="completion-check"
              title="Section completed!"
            >
              ✓
            </div>
          </div>
          
          <!-- Tab content -->
          <div class="tab-content">
            <span class="tab-title">{{ section.title }}</span>
            <span class="tab-meta">
              {{ section.estimatedTime }} • {{ section.difficulty }}
            </span>
          </div>
          
          <!-- Progress indicator dot -->
          <div class="tab-indicator"></div>
        </button>
      </div>
    </div>

    <!-- Tutorial content area -->
    <div class="tutorial-content">
      <!-- Active section panel -->
      <div
        v-for="section in tutorialSections"
        v-show="activeSection === section.id"
        :key="section.id"
        :id="`panel-${section.id}`"
        class="tutorial-panel"
        role="tabpanel"
        :aria-labelledby="`tab-${section.id}`"
      >
        <!-- Section header -->
        <div class="section-header">
          <div class="section-info">
            <h3 class="section-title">{{ section.title }}</h3>
            <p class="section-description">{{ section.description }}</p>
            <div class="section-meta">
              <span class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/>
                </svg>
                {{ section.estimatedTime }}
              </span>
              <span class="meta-item">
                <svg class="meta-icon" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"/>
                </svg>
                {{ section.difficulty }}
              </span>
            </div>
          </div>
          
          <!-- Section actions -->
          <div class="section-actions">
            <button 
              v-if="!isSectionComplete(section.id)"
              @click="markSectionComplete(section.id)"
              class="complete-button"
              title="Mark section as complete"
            >
              Mark Complete
            </button>
            <div 
              v-else 
              class="completed-badge"
              title="Section completed!"
            >
              <svg class="check-icon" viewBox="0 0 24 24">
                <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
              </svg>
              Completed
            </div>
          </div>
        </div>

        <!-- Section content -->
        <div class="section-content">
          <!-- Mnemonic Story Section - Enhanced for better learning -->
          <div class="content-block story-block">
            <h4 class="block-title">🎭 Memory Palace Story</h4>
            <div class="story-content">
              <div class="story-visual-container">
                <div class="story-animation" :class="`animation-${section.mnemonic?.animation}`">
                  <div class="mnemonic-visual">{{ section.icon }}</div>
                </div>
                <div class="story-text">
                  <h5 class="story-title">{{ section.mnemonic?.storyTitle }}</h5>
                  <p class="story-description">{{ section.mnemonic?.mainStory }}</p>
                  
                  <!-- Memory Trigger -->
                  <div class="memory-trigger">
                    <strong>🧠 Memory Trigger:</strong> {{ section.mnemonic?.memoryTrigger }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Theory section -->
          <div class="content-block theory-block">
            <h4 class="block-title">📚 Theory & Concepts</h4>
            <div class="theory-content">
              <p class="theory-text">{{ section.content.theory }}</p>
              
              <!-- Key points list with interactive checkboxes -->
              <div class="key-points">
                <h5 class="key-points-title">Key Points:</h5>
                <ul class="key-points-list">
                  <li 
                    v-for="(point, index) in section.content.keyPoints"
                    :key="point"
                    class="key-point"
                    :class="{ 'understood': understoodPoints[section.id]?.[index] }"
                  >
                    <input 
                      type="checkbox"
                      :id="`point-${section.id}-${index}`"
                      :checked="understoodPoints[section.id]?.[index] || false"
                      @change="updatePointUnderstanding(section.id, index, $event.target.checked)"
                      class="point-checkbox"
                    />
                    <label :for="`point-${section.id}-${index}`" class="point-label">
                      {{ point }}
                    </label>
                  </li>
                </ul>
                
                <!-- Progress indicator for understanding -->
                <div class="understanding-progress">
                  <div class="progress-text">
                    Understanding: {{ getUnderstandingProgress(section.id) }}%
                  </div>
                  <div class="progress-bar-small">
                    <div 
                      class="progress-fill-small" 
                      :style="{ width: getUnderstandingProgress(section.id) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Code example section -->
          <div class="content-block code-block">
            <h4 class="block-title">💻 Code Example</h4>
            <div class="code-container">
              <div class="code-header">
                <span class="code-label">Vue 3 Example</span>
                <button 
                  @click="copyCode(section.content.codeExample)"
                  class="copy-button"
                  title="Copy code to clipboard"
                >
                  <svg class="copy-icon" viewBox="0 0 24 24">
                    <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
                  </svg>
                </button>
              </div>
              <pre class="code-content"><code class="vue-code">{{ section.content.codeExample }}</code></pre>
            </div>
          </div>

          <!-- Interactive playground section -->
          <div class="content-block playground-block">
            <h4 class="block-title">🎮 Interactive Playground</h4>
            <div class="playground-container">
              <!-- Component-specific interactive examples -->
              <component 
                :is="getInteractiveComponent(section.id)"
                :section-data="section"
                @interaction="handleInteraction"
              />
            </div>
          </div>

          <!-- Interactive Quiz Section -->
          <div class="content-block quiz-block">
            <h4 class="block-title">🧠 Quick Knowledge Check</h4>
            <div class="quiz-content">
              <div v-if="!quizCompleted[section.id]" class="quiz-question">
                <p class="question-text">{{ getCurrentQuizQuestion(section.id)?.question }}</p>
                <div class="quiz-options">
                  <button
                    v-for="(option, index) in getCurrentQuizQuestion(section.id)?.options"
                    :key="index"
                    @click="selectQuizAnswer(section.id, index)"
                    class="quiz-option"
                    :class="{ 
                      'selected': selectedAnswers[section.id] === index,
                      'correct': quizAnswered[section.id] && index === getCurrentQuizQuestion(section.id)?.correct,
                      'incorrect': quizAnswered[section.id] && selectedAnswers[section.id] === index && index !== getCurrentQuizQuestion(section.id)?.correct
                    }"
                    :disabled="quizAnswered[section.id]"
                  >
                    {{ option }}
                  </button>
                </div>
                
                <!-- Quiz feedback -->
                <div v-if="quizAnswered[section.id]" class="quiz-feedback">
                  <div class="feedback-message" :class="{ 'correct': isQuizCorrect(section.id), 'incorrect': !isQuizCorrect(section.id) }">
                    <div class="feedback-icon">
                      {{ isQuizCorrect(section.id) ? '🎉' : '💡' }}
                    </div>
                    <div class="feedback-text">
                      {{ isQuizCorrect(section.id) ? 'Excellent! You got it right!' : 'Not quite, but that\'s how we learn!' }}
                    </div>
                  </div>
                  <p class="quiz-explanation">{{ getCurrentQuizQuestion(section.id)?.explanation }}</p>
                  <button @click="completeQuiz(section.id)" class="continue-button">
                    Continue Learning 🚀
                  </button>
                </div>
              </div>
              
              <div v-else class="quiz-completed">
                <div class="completion-message">
                  <div class="completion-icon">✅</div>
                  <div class="completion-text">Quiz completed! Great job understanding the concepts.</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Practice task section -->
          <div class="content-block practice-block">
            <h4 class="block-title">🎯 Hands-On Practice</h4>
            <div class="practice-content">
              <p class="practice-task">{{ section.content.practiceTask }}</p>
              
              <!-- Practice steps with checkboxes -->
              <div class="practice-steps">
                <h6 class="steps-title">Practice Steps:</h6>
                <div class="steps-list">
                  <div
                    v-for="(step, index) in getPracticeSteps(section.id)"
                    :key="index"
                    class="practice-step"
                    :class="{ 'completed': practiceSteps[section.id]?.[index] }"
                  >
                    <input
                      type="checkbox"
                      :id="`step-${section.id}-${index}`"
                      :checked="practiceSteps[section.id]?.[index] || false"
                      @change="updatePracticeStep(section.id, index, $event.target.checked)"
                      class="step-checkbox"
                    />
                    <label :for="`step-${section.id}-${index}`" class="step-label">
                      {{ step }}
                    </label>
                  </div>
                </div>
                
                <!-- Practice progress -->
                <div class="practice-progress">
                  <div class="progress-text">
                    Practice Progress: {{ getPracticeProgress(section.id) }}%
                  </div>
                  <div class="progress-bar-small">
                    <div 
                      class="progress-fill-small" 
                      :style="{ width: getPracticeProgress(section.id) + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
              
              <div class="practice-actions">
                <button 
                  @click="startPractice(section.id)"
                  class="practice-button"
                  :disabled="practiceMode && currentPracticeSection === section.id"
                >
                  {{ practiceMode && currentPracticeSection === section.id ? 'In Progress...' : 'Start Practice' }}
                </button>
                <button 
                  v-if="getPracticeProgress(section.id) === 100"
                  @click="completePractice(section.id)"
                  class="complete-practice-button"
                >
                  Complete Practice ✨
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Section navigation -->
        <div class="section-navigation">
          <button 
            v-if="getPreviousSection()"
            @click="setActiveSection(getPreviousSection().id)"
            class="nav-button nav-button--prev"
          >
            <svg class="nav-icon" viewBox="0 0 24 24">
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"/>
            </svg>
            Previous: {{ getPreviousSection().title }}
          </button>
          
          <button 
            v-if="getNextSection()"
            @click="setActiveSection(getNextSection().id)"
            class="nav-button nav-button--next"
          >
            Next: {{ getNextSection().title }}
            <svg class="nav-icon" viewBox="0 0 24 24">
              <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Achievement notifications area -->
    <div v-if="recentAchievements.length > 0" class="achievements-area">
      <h4 class="achievements-title">🏆 Recent Achievements</h4>
      <div class="achievements-list">
        <div
          v-for="achievement in recentAchievements"
          :key="achievement.id"
          class="achievement-card"
        >
          <div class="achievement-icon">{{ achievement.icon }}</div>
          <div class="achievement-content">
            <h5 class="achievement-title">{{ achievement.title }}</h5>
            <p class="achievement-description">{{ achievement.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tutorial introduction with enhanced features explanation -->
    <div class="tutorial-intro" v-if="showIntroduction">
      <div class="intro-content">
        <h3 class="intro-title">🚀 Welcome to the Enhanced Vue 3 Tutorial!</h3>
        <p class="intro-description">
          Get ready for an amazing learning journey with our enhanced tab-based tutorial system!
        </p>
        
        <div class="intro-features">
          <div class="feature-grid">
            <div class="feature-item">
              <div class="feature-icon">⌨️</div>
              <h4>Keyboard Navigation</h4>
              <p>Use arrow keys, Home/End to navigate between tabs</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📊</div>
              <h4>Progress Tracking</h4>
              <p>Visual progress indicators show your learning journey</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🎉</div>
              <h4>Celebrations</h4>
              <p>Enjoy animations and feedback when you complete sections</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">🧠</div>
              <h4>Interactive Learning</h4>
              <p>Quizzes, practice exercises, and hands-on examples</p>
            </div>
          </div>
        </div>
        
        <div class="intro-actions">
          <button @click="startTutorial" class="start-button">
            Start Learning! 🚀
          </button>
          <button @click="showIntroduction = false" class="skip-button">
            Skip Introduction
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * InteractiveTutorial Component Script
 * 
 * This is the main learning component that demonstrates:
 * - Complex state management with multiple reactive properties
 * - Integration with composables for progress tracking
 * - Dynamic component rendering based on section content
 * - Event handling and user interaction patterns
 * - Achievement and progress tracking systems
 */

import { ref, computed, onMounted, watch } from 'vue'
import { TUTORIAL_SECTIONS } from '../../data/vueData.js'
import { useProgress } from '../../composables/useProgress.js'
import { useNotifications } from '../../composables/useNotifications.js'

// Import interactive playground components (created separately)
import ComponentsPlayground from './playgrounds/ComponentsPlayground.vue'
import ReactivityPlayground from './playgrounds/ReactivityPlayground.vue'
import CompositionPlayground from './playgrounds/CompositionPlayground.vue'
import EventsPlayground from './playgrounds/EventsPlayground.vue'
import DirectivesPlayground from './playgrounds/DirectivesPlayground.vue'
import AdvancedPlayground from './playgrounds/AdvancedPlayground.vue'

// Composables for state management
const { 
  completionPercentage,
  completedSections,
  isSectionComplete,
  markSectionComplete: markComplete,
  getUnlockedAchievements
} = useProgress()

const { 
  showSectionComplete,
  showAchievementUnlocked,
  showTip,
  showInteractiveFeedback
} = useNotifications()

// Component reactive state
const activeSection = ref('components-templates') // Currently active tutorial section
const practiceMode = ref(false) // Whether practice mode is active
const currentPracticeSection = ref(null) // Current section in practice mode
const showIntroduction = ref(true) // Whether to show the tutorial introduction

// Practice steps data - must be defined before initialization
const practiceStepsData = {
  'components-templates': [
    'Create a new Vue component file (.vue)',
    'Add a template with HTML structure',
    'Define props for component communication',
    'Add some basic styling',
    'Test your component in the parent'
  ],
  'reactivity-data': [
    'Create reactive data with ref() or reactive()',
    'Display the data in your template',
    'Add a button to modify the data',
    'Watch the automatic UI updates',
    'Try creating a computed property'
  ],
  'composition-api-deep': [
    'Set up the setup() function',
    'Create a custom composable',
    'Use the composable in your component',
    'Add TypeScript types for better safety',
    'Test the reusable logic'
  ],
  'event-handling': [
    'Add click event handlers with @click',
    'Handle keyboard events with @keyup/@keydown',
    'Create form submission handlers with @submit',
    'Use event modifiers (.prevent, .stop)',
    'Test different event types and interactions'
  ],
  'directives-lifecycle': [
    'Use v-if to conditionally render elements',
    'Create lists with v-for directive',
    'Implement two-way binding with v-model',
    'Add onMounted lifecycle hook',
    'Add onUpdated and onUnmounted hooks'
  ],
  'advanced-patterns': [
    'Set up provide/inject for data sharing',
    'Create components with named slots',
    'Use Teleport for portal functionality',
    'Build a custom directive',
    'Test dynamic component switching'
  ]
}

// Helper function to get practice steps - must be defined before initialization
const getPracticeSteps = (sectionId) => {
  return practiceStepsData[sectionId] || ['Complete the practice exercise', 'Test your implementation', 'Review the concepts']
}

// Initialize reactive objects for all sections immediately
const initializeSectionData = () => {
  const sections = TUTORIAL_SECTIONS || []
  const initialUnderstoodPoints = {}
  const initialPracticeSteps = {}
  const initialQuizCompleted = {}
  const initialQuizAnswered = {}
  const initialSelectedAnswers = {}
  
  sections.forEach(section => {
    // Initialize understood points array for each section
    initialUnderstoodPoints[section.id] = new Array(section.content.keyPoints.length).fill(false)
    
    // Initialize practice steps array for each section
    const practiceStepsForSection = getPracticeSteps(section.id)
    initialPracticeSteps[section.id] = new Array(practiceStepsForSection.length).fill(false)
    
    // Initialize quiz states
    initialQuizCompleted[section.id] = false
    initialQuizAnswered[section.id] = false
    initialSelectedAnswers[section.id] = null
  })
  
  return {
    initialUnderstoodPoints,
    initialPracticeSteps,
    initialQuizCompleted,
    initialQuizAnswered,
    initialSelectedAnswers
  }
}

// Get initial data before creating reactive refs
const {
  initialUnderstoodPoints,
  initialPracticeSteps,
  initialQuizCompleted,
  initialQuizAnswered,
  initialSelectedAnswers
} = initializeSectionData()

// Interactive learning state - initialized with proper data
const understoodPoints = ref(initialUnderstoodPoints) // Track which key points user understands
const quizCompleted = ref(initialQuizCompleted) // Track completed quizzes
const quizAnswered = ref(initialQuizAnswered) // Track if quiz has been answered
const selectedAnswers = ref(initialSelectedAnswers) // Track selected quiz answers
const practiceSteps = ref(initialPracticeSteps) // Track completed practice steps

// Computed properties
const tutorialSections = computed(() => TUTORIAL_SECTIONS)

const recentAchievements = computed(() => {
  // Get recently unlocked achievements (last 3)
  return getUnlockedAchievements().slice(-3)
})

// Component mapping for interactive playgrounds
const playgroundComponents = {
  'components-templates': ComponentsPlayground,
  'reactivity-data': ReactivityPlayground,
  'composition-api-deep': CompositionPlayground,
  'event-handling': EventsPlayground,
  'directives-lifecycle': DirectivesPlayground,
  'advanced-patterns': AdvancedPlayground
}

// Methods

/**
 * Set the active tutorial section with enhanced functionality
 * This demonstrates reactive state updates and side effects
 */
const setActiveSection = (sectionId) => {
  const previousSection = activeSection.value
  activeSection.value = sectionId
  
  // Track user interaction
  showInteractiveFeedback(
    'Section Changed',
    `Now viewing: ${getSectionById(sectionId)?.title}`
  )
  
  // Smooth scroll to top of content area with animation
  const contentArea = document.querySelector('.tutorial-content')
  if (contentArea) {
    contentArea.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  // Add visual feedback for section transition
  const tabButton = document.querySelector(`[aria-controls="panel-${sectionId}"]`)
  if (tabButton) {
    tabButton.style.transform = 'scale(0.95)'
    setTimeout(() => {
      tabButton.style.transform = ''
    }, 150)
  }
  
  console.log(`Active section changed from ${previousSection} to: ${sectionId}`)
}

/**
 * Handle keyboard navigation for tabs
 */
const handleTabKeydown = (event, sectionId) => {
  const tabButtons = document.querySelectorAll('.tab-button')
  const currentIndex = tutorialSections.value.findIndex(s => s.id === sectionId)
  
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault()
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : tutorialSections.value.length - 1
      setActiveSection(tutorialSections.value[prevIndex].id)
      tabButtons[prevIndex]?.focus()
      break
      
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault()
      const nextIndex = currentIndex < tutorialSections.value.length - 1 ? currentIndex + 1 : 0
      setActiveSection(tutorialSections.value[nextIndex].id)
      tabButtons[nextIndex]?.focus()
      break
      
    case 'Home':
      event.preventDefault()
      setActiveSection(tutorialSections.value[0].id)
      tabButtons[0]?.focus()
      break
      
    case 'End':
      event.preventDefault()
      const lastIndex = tutorialSections.value.length - 1
      setActiveSection(tutorialSections.value[lastIndex].id)
      tabButtons[lastIndex]?.focus()
      break
      
    case 'Enter':
    case ' ':
      event.preventDefault()
      setActiveSection(sectionId)
      break
  }
}

/**
 * Get section progress percentage for visual indicators
 */
const getSectionProgressPercentage = (sectionId) => {
  const understanding = getUnderstandingProgress(sectionId)
  const practice = getPracticeProgress(sectionId)
  const quizComplete = quizCompleted.value[sectionId] ? 100 : 0
  
  // Weight the different progress types
  return Math.round((understanding * 0.4) + (practice * 0.4) + (quizComplete * 0.2))
}

/**
 * Auto-advance to next section when current is completed
 */
const autoAdvanceSection = (completedSectionId) => {
  const currentIndex = tutorialSections.value.findIndex(s => s.id === completedSectionId)
  const nextSection = tutorialSections.value[currentIndex + 1]
  
  if (nextSection && getSectionProgressPercentage(completedSectionId) === 100) {
    setTimeout(() => {
      showTip(
        `Great job completing "${getSectionById(completedSectionId)?.title}"! Ready for the next challenge?`,
        'Auto-Advance Available'
      )
      
      // Optional auto-advance after user confirmation
      setTimeout(() => {
        if (confirm('Would you like to move to the next section?')) {
          setActiveSection(nextSection.id)
        }
      }, 2000)
    }, 1000)
  }
}

/**
 * Enhanced section completion with auto-advance
 */
const markSectionComplete = (sectionId) => {
  const wasNewlyCompleted = markComplete(sectionId)
  const section = getSectionById(sectionId)
  
  if (wasNewlyCompleted && section) {
    // Show completion notification with celebration
    showSectionComplete(section.title, true)
    
    // Add visual celebration effect
    const tabButton = document.querySelector(`[aria-controls="panel-${sectionId}"]`)
    if (tabButton) {
      tabButton.classList.add('celebrating')
      setTimeout(() => {
        tabButton.classList.remove('celebrating')
      }, 2000)
    }
    
    // Show tip about what they learned
    setTimeout(() => {
      showTip(
        `Amazing! You've mastered "${section.title}"! ${section.content.keyPoints[0]}`,
        'Learning Achievement'
      )
    }, 1500)
    
    // Check for auto-advance
    autoAdvanceSection(sectionId)
  }
}

/**
 * Get section data by ID
 */
const getSectionById = (sectionId) => {
  return tutorialSections.value.find(section => section.id === sectionId)
}

/**
 * Get the appropriate interactive component for a section
 */
const getInteractiveComponent = (sectionId) => {
  return playgroundComponents[sectionId] || 'div'
}

/**
 * Interactive Learning Methods
 */

// Understanding progress tracking
const updatePointUnderstanding = (sectionId, pointIndex, checked) => {
  // Ensure the array exists before updating
  if (!understoodPoints.value[sectionId]) {
    understoodPoints.value[sectionId] = new Array(TUTORIAL_SECTIONS.find(s => s.id === sectionId)?.content.keyPoints.length || 0).fill(false)
  }
  
  // Update the specific point understanding
  understoodPoints.value[sectionId][pointIndex] = checked
  
  // Check if section should be auto-completed
  const progress = getUnderstandingProgress(sectionId)
  if (progress === 100) {
    showTip(`Great! You understand all key concepts in this section!`, 'Learning Progress')
  }
}

const getUnderstandingProgress = (sectionId) => {
  if (!understoodPoints.value[sectionId]) return 0
  const understood = understoodPoints.value[sectionId].filter(Boolean).length
  const total = understoodPoints.value[sectionId].length
  return total > 0 ? Math.round((understood / total) * 100) : 0
}

// Quiz functionality with educational questions
const quizQuestions = {
  'components-templates': {
    question: 'What makes Vue components like "dancing LEGO blocks"?',
    options: [
      'They are colorful and fun to look at',
      'They are reusable, composable, and work together harmoniously',
      'They make music when you click them',
      'They only work in disco environments'
    ],
    correct: 1,
    explanation: 'Just like LEGO blocks, Vue components are reusable building blocks that can be combined to create complex applications. They work together harmoniously to build amazing user interfaces!'
  },
  'reactivity-data': {
    question: 'Why is Vue\'s reactivity system like a "psychic mirror"?',
    options: [
      'It can predict the future',
      'It reflects your appearance back to you',
      'It instantly detects and reflects data changes automatically',
      'It requires magical powers to use'
    ],
    correct: 2,
    explanation: 'Vue\'s reactivity system is like a psychic mirror because it automatically detects when your data changes and instantly updates the UI to reflect those changes, just like a mind-reading assistant!'
  },
  'composition-api-deep': {
    question: 'What makes the Composition API like a "mad scientist laboratory"?',
    options: [
      'It creates dangerous experiments',
      'It allows you to mix and organize logic like combining potions',
      'It requires a white lab coat to use',
      'It only works at night during thunderstorms'
    ],
    correct: 1,
    explanation: 'The Composition API is like a mad scientist laboratory because it lets you mix different pieces of logic (like composables) together to create powerful, reusable functionality - just like mixing potions to create amazing effects!'
  },
  'event-handling': {
    question: 'Why are Vue event handlers like "cosmic telephone operators"?',
    options: [
      'They work in space stations',
      'They wear special headsets',
      'They instantly transport user interaction messages to the right components',
      'They only work during cosmic events'
    ],
    correct: 2,
    explanation: 'Vue event handlers are like cosmic telephone operators because they instantly receive user interaction messages (clicks, keystrokes, etc.) and deliver them to the right component methods faster than light speed!'
  },
  'directives-lifecycle': {
    question: 'What makes Vue directives like "magic wands"?',
    options: [
      'They are made of wood and have cores',
      'They give you superpowers to control your templates dynamically',
      'They only work for wizards',
      'They require magical incantations'
    ],
    correct: 1,
    explanation: 'Vue directives are like magic wands because they give you superpowers to control your templates - v-if makes elements appear/disappear, v-for duplicates elements, v-model creates telepathic links, just like casting spells!'
  },
  'advanced-patterns': {
    question: 'Why are advanced Vue patterns like "superhero abilities"?',
    options: [
      'They require special costumes',
      'They give you incredible power to solve complex problems elegantly',
      'They only work for comic book characters',
      'They make you fly'
    ],
    correct: 1,
    explanation: 'Advanced Vue patterns are like superhero abilities because they give you incredible power to solve complex problems elegantly - Provide/Inject is telepathy, Slots are modular armor, Teleport is portal magic!'
  }
}

const getCurrentQuizQuestion = (sectionId) => {
  return quizQuestions[sectionId] || null
}

const selectQuizAnswer = (sectionId, answerIndex) => {
  selectedAnswers.value[sectionId] = answerIndex
  quizAnswered.value[sectionId] = true
  
  // Provide immediate feedback
  const isCorrect = isQuizCorrect(sectionId)
  if (isCorrect) {
    showInteractiveFeedback('Correct!', 'You nailed it! 🎉')
  } else {
    showInteractiveFeedback('Learning Moment', 'That\'s how we learn! 💡')
  }
}

const isQuizCorrect = (sectionId) => {
  const question = getCurrentQuizQuestion(sectionId)
  return question && selectedAnswers.value[sectionId] === question.correct
}

const completeQuiz = (sectionId) => {
  quizCompleted.value[sectionId] = true
  showTip('Quiz completed! You\'re making great progress.', 'Achievement')
}

// Practice steps functionality (moved to top of file for initialization)

const updatePracticeStep = (sectionId, stepIndex, checked) => {
  // Ensure the array exists before updating
  if (!practiceSteps.value[sectionId]) {
    practiceSteps.value[sectionId] = new Array(getPracticeSteps(sectionId).length).fill(false)
  }
  
  // Update the specific step
  practiceSteps.value[sectionId][stepIndex] = checked
  
  // Update overall progress
  updatePracticeProgress(sectionId)
}

const updatePracticeProgress = (sectionId) => {
  const progress = getPracticeProgress(sectionId)
  if (progress === 100) {
    showTip(`Excellent! You've completed all practice steps for this section!`, 'Practice Complete')
  }
}

const getPracticeProgress = (sectionId) => {
  if (!practiceSteps.value[sectionId]) return 0
  const completed = practiceSteps.value[sectionId].filter(Boolean).length
  const total = practiceSteps.value[sectionId].length
  return total > 0 ? Math.round((completed / total) * 100) : 0
}

/**
 * Get icon path for section tabs (simplified version)
 */
const getIconPath = (iconName) => {
  const icons = {
    'mdi-view-grid': 'M3,11H11V3H3M3,21H11V13H3M13,21H21V13H13M13,3V11H21V3',
    'mdi-flash': 'M7,2V13H10V22L17,10H13L17,2H7Z',
    'mdi-puzzle': 'M20.5,11H19V7C19,5.89 18.1,5 17,5H13V3.5A2.5,2.5 0 0,0 10.5,1A2.5,2.5 0 0,0 8,3.5V5H4C2.89,5 2,5.89 2,7V10.8H3.5C5,10.8 6.2,12 6.2,13.5C6.2,15 5,16.2 3.5,16.2H2V20C2,21.11 2.89,22 4,22H7.8V20.5C7.8,19 9,17.8 10.5,17.8C12,17.8 13.2,19 13.2,20.5V22H17C18.11,22 19,21.11 19,20V16H20.5A2.5,2.5 0 0,0 23,13.5A2.5,2.5 0 0,0 20.5,11Z',
    'mdi-cursor-default-click': 'M10.07,14.27C10.57,14.03 11.16,14.25 11.4,14.75L13.7,19.74L15.5,18.89L13.19,13.91C12.95,13.41 13.17,12.81 13.67,12.58L13.95,12.5L16.25,12.05L8.5,11.96L9.82,14.43L10.07,14.27M13.64,21.97C13.14,22.21 12.54,22 12.31,21.5L10.13,16.76L7.62,18.78C7.45,18.92 7.24,19 7,19A1,1 0 0,1 6,18V3A1,1 0 0,1 7,2C7.24,2 7.47,2.09 7.64,2.22L7.65,2.23L19.14,11.86C19.57,12.22 19.62,12.85 19.27,13.27C19.12,13.45 18.91,13.57 18.7,13.61L15.54,14.23L17.74,18.96C18,19.46 17.76,20.05 17.26,20.28L13.64,21.97Z',
    'mdi-cog-outline': 'M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z',
    'mdi-rocket-launch': 'M13.13,22.19L11.5,18.36C13.07,17.78 14.54,17 15.9,16.09L13.13,22.19M5.64,12.5L1.81,10.87L7.91,8.1C7,9.46 6.22,10.93 5.64,12.5M21.61,2.39C21.61,2.39 16.66,3.85 12.98,7.53C10.93,9.58 10.31,11.66 10.97,13.4C11.63,15.14 12.39,16.38 14.68,18.67C17.66,21.65 22.61,22.39 22.61,22.39C22.61,22.39 23.35,17.44 20.37,14.46C18.08,12.17 16.84,11.41 15.1,10.75C13.36,10.09 11.28,10.71 9.23,12.76C5.55,16.44 4.09,21.39 4.09,21.39L2.39,22.61L7.53,13.98C8.5,12.5 9.64,11.2 10.97,10.07C11.53,9.51 12.1,8.97 12.7,8.46L15.54,5.62C16.38,4.78 17.68,4.78 18.52,5.62C19.36,6.46 19.36,7.76 18.52,8.6L15.68,11.44C15.17,12.04 14.63,12.61 14.07,13.17C12.94,14.5 11.64,15.64 10.16,16.61L21.61,2.39Z'
  }
  return icons[iconName] || icons['mdi-view-grid']
}

/**
 * Get previous section for navigation
 */
const getPreviousSection = () => {
  const currentIndex = tutorialSections.value.findIndex(s => s.id === activeSection.value)
  return currentIndex > 0 ? tutorialSections.value[currentIndex - 1] : null
}

/**
 * Get next section for navigation
 */
const getNextSection = () => {
  const currentIndex = tutorialSections.value.findIndex(s => s.id === activeSection.value)
  return currentIndex < tutorialSections.value.length - 1 ? tutorialSections.value[currentIndex + 1] : null
}

/**
 * Start practice mode for a section
 */
const startPractice = (sectionId) => {
  practiceMode.value = true
  currentPracticeSection.value = sectionId
  
  showTip(
    'Practice mode activated! Try implementing the concepts you just learned.',
    'Practice Mode'
  )
}

/**
 * Complete practice for a section
 */
const completePractice = (sectionId) => {
  practiceMode.value = false
  currentPracticeSection.value = null
  
  showInteractiveFeedback(
    'Practice Completed',
    'Great job practicing! You\'re getting hands-on experience with Vue 3.'
  )
}

/**
 * Copy code to clipboard
 */
const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code)
    showInteractiveFeedback('Code Copied', 'Code example copied to clipboard!')
  } catch (error) {
    console.warn('Could not copy code:', error)
  }
}

/**
 * Handle interactions from playground components
 */
const handleInteraction = (event) => {
  console.log('Playground interaction:', event)
  showInteractiveFeedback(
    'Interactive Example',
    `You interacted with the ${event.component || 'playground'}!`
  )
}

// Watchers

// Watch for section changes and provide helpful tips
watch(activeSection, (newSection, oldSection) => {
  if (oldSection) {
    const section = getSectionById(newSection)
    if (section) {
      setTimeout(() => {
        showTip(
          `Welcome to "${section.title}"! This section covers ${section.content.keyPoints[0].toLowerCase()}.`,
          'Section Guide'
        )
      }, 1000)
    }
  }
})

// Lifecycle hooks

onMounted(() => {
  console.log('InteractiveTutorial component mounted')
  // Data is now initialized immediately when component is created
  
  // Show welcome tip after component loads
  setTimeout(() => {
    showTip(
      'Start with any section that interests you, or follow the tutorial in order. Your progress will be saved automatically!',
      'Getting Started'
    )
  }, 2000)
})

/**
 * Start the tutorial with a welcoming experience
 */
const startTutorial = () => {
  showIntroduction.value = false
  
  // Show welcome message
  showTip(
    'Welcome to your Vue 3 learning adventure! Each tab represents a different concept. Click on any tab to start learning!',
    'Tutorial Started'
  )
  
  // Focus on the first tab for accessibility
  setTimeout(() => {
    const firstTab = document.querySelector('.tab-button')
    if (firstTab) {
      firstTab.focus()
    }
  }, 500)
  
  console.log('🚀 Tutorial started! User is ready to learn Vue 3.')
}
</script>

<style scoped>
/**
 * InteractiveTutorial Component Styles
 * 
 * Comprehensive styling for:
 * - Tutorial layout and navigation
 * - Tab interface with smooth transitions
 * - Content blocks with proper hierarchy
 * - Progress indicators and completion states
 * - Interactive elements and accessibility
 * - Responsive design for all screen sizes
 */

.interactive-tutorial {
  /* Main container with full height layout */
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
}

/* Tutorial Header */
.tutorial-header {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.header-content {
  text-align: center;
  margin-bottom: 2rem;
}

.tutorial-title {
  font-size: 2rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tutorial-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Progress Overview */
.progress-overview {
  max-width: 500px;
  margin: 0 auto;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
}

.progress-percentage {
  font-size: 1.125rem;
  font-weight: 700;
  color: #3b82f6;
}

.progress-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
  transition: width 0.5s ease;
}

/* Tab Navigation */
.tutorial-tabs {
  background: white;
  border-radius: 16px;
  padding: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.tab-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  text-align: left;
}

.tab-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tab-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #cbd5e1;
}

.tab-button:hover::before {
  opacity: 1;
}

.tab-button--active {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  border-color: #3b82f6;
  color: white;
  transform: translateY(-1px);
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
}

.tab-button--active::before {
  display: none;
}

.tab-button--active .tab-content {
  color: white;
}

.tab-button--active .tab-meta {
  color: rgba(255, 255, 255, 0.8);
}

.tab-button--completed {
  background: linear-gradient(135deg, #10b981, #059669);
  border-color: #10b981;
  color: white;
}

.tab-button--completed:not(.tab-button--active) {
  background: #f0fdf4;
  border-color: #10b981;
  color: #065f46;
}

.tab-button--completed:not(.tab-button--active) .tab-meta {
  color: #059669;
}

.tab-icon-container {
  position: relative;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  transition: all 0.3s ease;
}

.tab-button--active .tab-icon-container {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.tab-icon {
  width: 24px;
  height: 24px;
  fill: currentColor;
  transition: all 0.3s ease;
}

.tab-button--active .tab-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.completion-check {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  background: #10b981;
  border: 2px solid white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: white;
  animation: completionPulse 2s infinite;
}

@keyframes completionPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.tab-content {
  flex: 1;
  min-width: 0;
}

.tab-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 0.25rem;
  color: inherit;
}

.tab-meta {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  transition: color 0.3s ease;
}

.tab-indicator {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #cbd5e1;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.tab-button--active .tab-indicator {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.tab-button--completed .tab-indicator {
  background: #10b981;
}

/* Enhanced tab animations */
.tab-button {
  animation: tabSlideIn 0.5s ease-out;
}

@keyframes tabSlideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tab focus states for accessibility */
.tab-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

/* Progress indicator for tab completion */
.tab-button::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #10b981, #059669);
  transition: width 0.5s ease;
  border-radius: 0 0 10px 10px;
}

.tab-button--completed::after {
  width: 100%;
}

.tab-button:not(.tab-button--completed)::after {
  width: 0%;
}

/* Tutorial Content */
.tutorial-content {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.tutorial-panel {
  padding: 2rem;
}

/* Section Header */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f1f5f9;
}

.section-info {
  flex: 1;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
}

.section-description {
  font-size: 1rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.section-meta {
  display: flex;
  gap: 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #475569;
}

.meta-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

/* Section Actions */
.section-actions {
  flex-shrink: 0;
}

.complete-button {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.complete-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.completed-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f0fdf4;
  color: #166534;
  border: 2px solid #22c55e;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.check-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

/* Content Blocks */
.section-content {
  display: grid;
  gap: 2rem;
}

.content-block {
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
}

.block-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Theory Block */
.theory-block {
  background: linear-gradient(135deg, #fef7ff, #f3e8ff);
  border-color: #e879f9;
}

.theory-text {
  font-size: 1rem;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 1.5rem;
}

.key-points-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
}

.key-points-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.key-point {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  color: #4b5563;
}

.key-point::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: 600;
}

/* Code Block */
.code-block {
  background: linear-gradient(135deg, #fefce8, #fef3c7);
  border-color: #fbbf24;
}

.code-container {
  background: #1e293b;
  border-radius: 8px;
  overflow: hidden;
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #334155;
  border-bottom: 1px solid #475569;
}

.code-label {
  font-size: 0.875rem;
  color: #94a3b8;
  font-weight: 500;
}

.copy-button {
  background: transparent;
  border: 1px solid #475569;
  color: #94a3b8;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-button:hover {
  background: #475569;
  color: white;
}

.copy-icon {
  width: 14px;
  height: 14px;
  fill: currentColor;
}

.code-content {
  padding: 1rem;
  margin: 0;
  overflow-x: auto;
}

.vue-code {
  color: #e2e8f0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  white-space: pre-wrap;
}

/* Playground Block */
.playground-block {
  background: linear-gradient(135deg, #eff6ff, #dbeafe);
  border-color: #3b82f6;
}

.playground-container {
  min-height: 200px;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  border: 2px solid #e5e7eb;
}

/* Practice Block */
.practice-block {
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  border-color: #ef4444;
}

.practice-task {
  font-size: 1rem;
  line-height: 1.6;
  color: #374151;
  margin-bottom: 1rem;
}

.practice-actions {
  display: flex;
  gap: 1rem;
}

.practice-button,
.complete-practice-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.practice-button {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.practice-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.practice-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.complete-practice-button {
  background: #22c55e;
  color: white;
}

.complete-practice-button:hover {
  background: #16a34a;
  transform: translateY(-1px);
}

/* Enhanced Interactive Elements */

/* Story Block Enhancements */
.story-block {
  background: linear-gradient(135deg, #fef3c7, #fef9e7);
  border: 2px solid #fbbf24;
}

.story-visual-container {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.5rem;
  align-items: start;
}

.story-animation {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  animation: float 3s ease-in-out infinite;
}

.story-animation.animation-bouncing-lego-blocks {
  animation: bounce 2s ease-in-out infinite;
}

.story-animation.animation-psychic-mirror-magic {
  animation: glow 2.5s ease-in-out infinite;
}

.story-animation.animation-mad-scientist-laboratory {
  animation: wobble 3s ease-in-out infinite;
}

.story-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #92400e;
  margin: 0 0 0.5rem 0;
}

.story-description {
  color: #78350f;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.memory-trigger {
  background: rgba(251, 191, 36, 0.2);
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #78350f;
  border-left: 4px solid #fbbf24;
}

/* Interactive Key Points */
.key-point {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 0.75rem;
}

.key-point.understood {
  background: #f0fdf4;
  border-color: #10b981;
  color: #065f46;
}

.key-point::before {
  display: none; /* Hide the default checkmark */
}

.point-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #10b981;
  cursor: pointer;
}

.point-label {
  flex: 1;
  cursor: pointer;
  line-height: 1.5;
}

.understanding-progress {
  margin-top: 1rem;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 8px;
}

.progress-bar-small {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress-fill-small {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  border-radius: 3px;
  transition: width 0.5s ease;
}

/* Quiz Block Styling */
.quiz-block {
  background: linear-gradient(135deg, #dbeafe, #eff6ff);
  border: 2px solid #3b82f6;
}

.quiz-question {
  text-align: center;
}

.question-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e40af;
  margin: 0 0 1.5rem 0;
}

.quiz-options {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.quiz-option {
  padding: 1rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  font-weight: 500;
}

.quiz-option:hover:not(:disabled) {
  background: #f8fafc;
  border-color: #3b82f6;
  transform: translateY(-1px);
}

.quiz-option.selected {
  background: #dbeafe;
  border-color: #3b82f6;
}

.quiz-option.correct {
  background: #f0fdf4;
  border-color: #10b981;
  color: #065f46;
}

.quiz-option.incorrect {
  background: #fef2f2;
  border-color: #ef4444;
  color: #991b1b;
}

.quiz-feedback {
  text-align: center;
  margin-top: 1rem;
}

.feedback-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.feedback-message.correct {
  background: #f0fdf4;
  color: #065f46;
  border: 1px solid #10b981;
}

.feedback-message.incorrect {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #ef4444;
}

.feedback-icon {
  font-size: 1.5rem;
}

.quiz-explanation {
  color: #64748b;
  font-style: italic;
  margin: 0 0 1rem 0;
}

.continue-button {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.continue-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
}

.quiz-completed {
  text-align: center;
  padding: 2rem;
}

.completion-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #065f46;
}

.completion-icon {
  font-size: 2rem;
}

/* Practice Steps Styling */
.practice-steps {
  margin: 1.5rem 0;
}

.steps-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
}

.steps-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.practice-step {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.practice-step.completed {
  background: #f0fdf4;
  border-color: #10b981;
}

.step-checkbox {
  width: 18px;
  height: 18px;
  accent-color: #10b981;
  cursor: pointer;
  margin-top: 2px;
}

.step-label {
  flex: 1;
  cursor: pointer;
  line-height: 1.5;
  color: #374151;
}

.practice-step.completed .step-label {
  color: #065f46;
  text-decoration: line-through;
  opacity: 0.8;
}

.practice-progress {
  margin-top: 1rem;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 8px;
}

/* Enhanced Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-15px) scale(1.05); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.6); }
}

@keyframes wobble {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
}

@keyframes celebrate {
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(-5deg); }
  50% { transform: scale(1.2) rotate(5deg); }
  75% { transform: scale(1.1) rotate(-2deg); }
  100% { transform: scale(1) rotate(0deg); }
}

@keyframes confetti {
  0% { 
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% { 
    transform: translateY(-100px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}

/* Celebration effects */
.tab-button.celebrating {
  animation: celebrate 1s ease-in-out;
  position: relative;
  overflow: visible;
}

.tab-button.celebrating::before {
  content: '🎉';
  position: absolute;
  top: -10px;
  right: -10px;
  font-size: 1.5rem;
  animation: confetti 2s ease-out;
  z-index: 10;
}

.tab-button.celebrating::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 1.5s ease-in-out;
}

/* Progress ring animation for tabs */
.tab-icon-container::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border: 2px solid transparent;
  border-radius: 12px;
  background: conic-gradient(
    from 0deg,
    #10b981 0deg,
    #10b981 calc(var(--progress, 0) * 3.6deg),
    #e2e8f0 calc(var(--progress, 0) * 3.6deg),
    #e2e8f0 360deg
  );
  mask: linear-gradient(white 0 0) content-box, linear-gradient(white 0 0);
  mask-composite: exclude;
  transition: all 0.5s ease;
}

.tab-button--completed .tab-icon-container::before {
  --progress: 100;
  border-color: #10b981;
  animation: glow 2s infinite;
}

/* Hover effects for better interactivity */
.tab-button:not(.tab-button--active):hover {
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
}

.tab-button:not(.tab-button--active):hover .tab-icon-container {
  transform: scale(1.05);
  background: rgba(59, 130, 246, 0.1);
}

/* Loading state for tabs */
.tab-button.loading {
  pointer-events: none;
  opacity: 0.7;
}

.tab-button.loading .tab-icon {
  animation: wobble 1s infinite;
}

/* Enhanced focus states */
.tab-button:focus-visible {
  outline: none;
  box-shadow: 
    0 0 0 3px rgba(59, 130, 246, 0.5),
    0 8px 25px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

/* Pulse animation for active tab */
.tab-button--active {
  animation: glow 3s infinite;
}

/* Smooth transitions for all interactive elements */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Section Navigation */
.section-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #f1f5f9;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  color: #475569;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-button:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

.nav-button--next {
  margin-left: auto;
}

.nav-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

/* Achievements Area */
.achievements-area {
  background: linear-gradient(135deg, #fefce8, #fef3c7);
  border: 2px solid #fbbf24;
  border-radius: 16px;
  padding: 2rem;
  margin-top: 2rem;
}

.achievements-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #92400e;
  margin: 0 0 1rem 0;
}

.achievements-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.achievement-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  border: 2px solid #fbbf24;
  border-radius: 12px;
  padding: 1rem;
}

.achievement-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.achievement-content {
  flex: 1;
}

.achievement-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #92400e;
  margin: 0 0 0.25rem 0;
}

.achievement-description {
  font-size: 0.75rem;
  color: #a16207;
  margin: 0;
  line-height: 1.4;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .interactive-tutorial {
    padding: 1rem;
  }
  
  .tutorial-header,
  .tutorial-panel {
    padding: 1.5rem;
  }
  
  .tab-list {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .tutorial-title {
    font-size: 1.5rem;
  }
  
  .tutorial-subtitle {
    font-size: 1rem;
  }
  
  .tab-list {
    grid-template-columns: 1fr;
  }
  
  .tab-button {
    padding: 0.75rem;
  }
  
  .section-navigation {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-button--next {
    margin-left: 0;
  }
  
  .achievements-list {
    grid-template-columns: 1fr;
  }
}

/* Enhanced Mobile Design for Small Phones */
@media (max-width: 480px) {
  .interactive-tutorial {
    padding: 0.5rem;
  }
  
  .tutorial-header {
    padding: 1rem;
    margin-bottom: 1rem;
  }
  
  .tutorial-title {
    font-size: 1.25rem;
    line-height: 1.2;
  }
  
  .tutorial-subtitle {
    font-size: 0.875rem;
    line-height: 1.4;
  }
  
  .tutorial-tabs {
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .tab-button {
    padding: 0.5rem;
    gap: 0.5rem;
    flex-direction: column;
    text-align: center;
    min-height: 80px;
  }
  
  .tab-icon-container {
    width: 36px;
    height: 36px;
    margin-bottom: 0.25rem;
  }
  
  .tab-icon {
    width: 18px;
    height: 18px;
  }
  
  .tab-title {
    font-size: 0.75rem;
    line-height: 1.2;
  }
  
  .tab-meta {
    font-size: 0.625rem;
  }
  
  .tutorial-panel {
    padding: 1rem;
  }
  
  .section-header {
    gap: 0.5rem;
  }
  
  .section-title {
    font-size: 1.125rem;
  }
  
  .section-description {
    font-size: 0.875rem;
  }
  
  .content-block {
    padding: 1rem;
  }
  
  .block-title {
    font-size: 1rem;
  }
  
  .quiz-question .question-text {
    font-size: 1rem;
  }
  
  .quiz-options {
    gap: 0.5rem;
  }
  
  .quiz-option {
    padding: 0.75rem;
    font-size: 0.875rem;
  }
  
  .practice-steps {
    margin: 1rem 0;
  }
  
  .key-points-list {
    gap: 0.5rem;
  }
  
  .key-point {
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .progress-overview {
    max-width: 100%;
  }
  
  .progress-info {
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
  }
  
  .progress-text {
    font-size: 0.75rem;
  }
  
  .progress-percentage {
    font-size: 1rem;
  }
}

/* Extra Small Phones (< 380px) */
@media (max-width: 380px) {
  .interactive-tutorial {
    padding: 0.25rem;
  }
  
  .tutorial-header {
    padding: 0.75rem;
  }
  
  .tutorial-title {
    font-size: 1.125rem;
  }
  
  .tutorial-subtitle {
    font-size: 0.8125rem;
  }
  
  .tab-button {
    min-height: 70px;
    padding: 0.375rem;
  }
  
  .tab-icon-container {
    width: 30px;
    height: 30px;
  }
  
  .tab-icon {
    width: 16px;
    height: 16px;
  }
  
  .tab-title {
    font-size: 0.6875rem;
  }
  
  .tab-meta {
    font-size: 0.5625rem;
  }
  
  .tutorial-panel {
    padding: 0.75rem;
  }
  
  .content-block {
    padding: 0.75rem;
  }
  
  .quiz-option {
    padding: 0.5rem;
    font-size: 0.8125rem;
  }
  
  .intro-title {
    font-size: 1.75rem;
  }
  
  .intro-description {
    font-size: 1rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .feature-item {
    padding: 1rem;
  }
  
  .intro-actions {
    flex-direction: column;
    width: 100%;
  }
  
  .start-button,
  .skip-button {
    width: 100%;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
  }
}

/* Accessibility */
.tab-button:focus,
.complete-button:focus,
.practice-button:focus,
.nav-button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .tab-button,
  .complete-button,
  .practice-button,
  .nav-button,
  .progress-fill,
  .tab-icon {
    transition: none;
  }
  
  .tab-button:hover,
  .complete-button:hover,
  .practice-button:hover,
  .nav-button:hover {
    transform: none;
  }
}

/* Tutorial Introduction */
.tutorial-intro {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
}

.tutorial-intro::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
  opacity: 0.3;
  pointer-events: none;
}

.intro-content {
  position: relative;
  z-index: 1;
  text-align: center;
}

.intro-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.intro-description {
  font-size: 1.25rem;
  margin: 0 0 3rem 0;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.intro-features {
  margin-bottom: 3rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.feature-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-item h4 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: white;
}

.feature-item p {
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.8;
  line-height: 1.5;
}

.intro-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.start-button {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.6);
  background: linear-gradient(135deg, #059669, #047857);
}

.skip-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.skip-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}
</style> 