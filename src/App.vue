<!--
  Modern Vue 3 Learning Application - Main App Component
  
  This is the root component of our Vue 3 application. It demonstrates several key Vue 3 concepts:
  1. Script Setup Syntax - The modern way to write Vue components
  2. Composition API - For better code organization and reuse
  3. Reactive State Management - Using refs and computed properties
  4. Component Communication - Props, events, and provide/inject
  5. Template Syntax - Vue's declarative rendering system
-->

<template>
  <div id="app" :class="['app-modern', themeClass]">
    <!-- Modern Navigation Header -->
    <SimpleNavigation
      :active-section="currentSection"
      @section-change="handleSectionChange"
    />

    <!-- Main Content Area with Better Layout -->
    <main class="main-content-modern">
      <!-- Welcome Section - Redesigned for better UX -->
      <section v-if="currentSection === 'welcome'" class="welcome-section-modern">
        <div class="welcome-container-modern">
          <!-- Hero Section with Clear Hierarchy -->
          <div class="hero-section">
            <div class="hero-content">
              <div class="hero-badge">
                <span class="badge-text">Your Brain's New Best Friend 🧠</span>
              </div>
              
              <h1 class="hero-title">
                Learn Vue 3 Through
                <span class="title-highlight">Far-Fetched Associations</span>
              </h1>
              
              <!-- Brain Science Explanation Section - Minimalistic & Horizontal -->
              <div class="brain-science-section">
                <div class="brain-content">
                  <div class="brain-visual">
                    <div class="brain-container">
                      <div class="brain-icon">🧠</div>
                      <div class="neural-connections">
                        <div class="connection-line connection-1"></div>
                        <div class="connection-line connection-2"></div>
                        <div class="connection-line connection-3"></div>
                      </div>
                      <div class="memory-nodes">
                        <div class="memory-node node-1">🧩</div>
                        <div class="memory-node node-2">🔮</div>
                        <div class="memory-node node-3">🧪</div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="brain-explanation">
                    <h3 class="brain-title">Science-Backed Memory Enhancement</h3>
                    <p class="brain-subtitle">
                      Your brain remembers <strong>bizarre, emotional associations</strong> 300% better than ordinary facts. 
                      That's why our dancing LEGO blocks and mad scientists stick in your memory forever! 🧬✨
                    </p>
                    
                    <div class="brain-stats">
                      <div class="brain-stat">
                        <div class="stat-number">300%</div>
                        <div class="stat-label">Better Retention</div>
                      </div>
                      <div class="brain-stat">
                        <div class="stat-number">🎯</div>
                        <div class="stat-label">Von Restorff Effect</div>
                      </div>
                      <div class="brain-stat">
                        <div class="stat-number">⚡</div>
                        <div class="stat-label">Neural Pathways</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              

              
              <!-- Primary Call-to-Action -->
              <div class="hero-actions">
                <button 
                  @click="setCurrentSection('tutorial')"
                  class="cta-button cta-button--primary"
                >
                  <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="5,3 19,12 5,21 5,3"/>
                  </svg>
                  Start Learning Now
                </button>
                
                <button 
                  @click="setCurrentSection('basics')"
                  class="cta-button cta-button--secondary"
                >
                  <svg class="cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                  Browse Concepts
                </button>
              </div>
            </div>
            
            <!-- Visual Element -->
            <div class="hero-visual">
              <div class="visual-card">
                <div class="card-header">
                  <div class="card-dots">
                    <span class="dot dot--red"></span>
                    <span class="dot dot--yellow"></span>
                    <span class="dot dot--green"></span>
                  </div>
                  <span class="card-title">Vue 3 Component</span>
                </div>
                <div class="card-content">
                  <div class="code-line">
                    <span class="code-tag">&lt;template&gt;</span>
                  </div>
                  <div class="code-line code-indent">
                    <span class="code-tag">&lt;div</span> 
                    <span class="code-attr">class</span>=<span class="code-string">"modern-app"</span>
                    <span class="code-tag">&gt;</span>
                  </div>
                  <div class="code-line code-indent-2">
                    <span class="code-text">{{ message }}</span>
                  </div>
                  <div class="code-line code-indent">
                    <span class="code-tag">&lt;/div&gt;</span>
                  </div>
                  <div class="code-line">
                    <span class="code-tag">&lt;/template&gt;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Learning Path Cards -->
          <div class="learning-paths">
            <div class="section-header">
              <h2 class="section-title">Choose Your Learning Path</h2>
              <p class="section-description">
                Each path is designed to build your Vue 3 skills progressively
              </p>
            </div>
            
            <div class="path-grid">
              <div
                v-for="feature in appFeatures"
                :key="feature.id"
                class="path-card"
                @click="setCurrentSection(feature.sectionId)"
                role="button"
                tabindex="0"
                @keydown.enter="setCurrentSection(feature.sectionId)"
                @keydown.space.prevent="setCurrentSection(feature.sectionId)"
              >
                <div class="path-icon">{{ feature.icon }}</div>
                <h3 class="path-title">{{ feature.title }}</h3>
                <p class="path-description">{{ feature.description }}</p>
                <div class="path-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14"/>
                    <path d="M12 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          

        </div>
      </section>

      <!-- Memory Palace Section - Mnemonic Learning System -->
      <section v-else-if="currentSection === 'memory-palace'" class="content-section memory-palace-section">
        <div class="content-container">
          <div class="content-header memory-palace-header">
            <div class="palace-icon">🏰</div>
            <div class="header-content">
              <h2 class="content-title">Vue Memory Palace</h2>
              <p class="content-description">
                Learn Vue 3 concepts through funny far-fetched associations and visual mnemonics. 
                Build your own memory palace where dancing LEGO blocks, psychic mirrors, and mad scientists 
                help you remember everything!
              </p>
            </div>
          </div>
          
          <div class="memory-palace-intro">
            <div class="intro-card">
              <h3 class="intro-title">🧠 Welcome to Your Memory Palace!</h3>
              <p class="intro-text">
                Research shows that absurd, visual, and emotional associations improve memory retention by up to 300%! 
                Each Vue concept has been transformed into a memorable character and story that will stick in your brain forever.
              </p>
              <div class="intro-features">
                <div class="feature">
                  <span class="feature-icon">🎭</span>
                  <span class="feature-text">Funny Characters & Stories</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">✨</span>
                  <span class="feature-text">Animated Visual Mnemonics</span>
                </div>
                <div class="feature">
                  <span class="feature-icon">🎯</span>
                  <span class="feature-text">Interactive Memory Tests</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="mnemonic-concepts-grid">
            <MnemonicCard 
              v-for="concept in mnemonicConcepts" 
              :key="concept.id"
              :concept="concept"
            />
          </div>
        </div>
      </section>

      <!-- Tutorial Section -->
      <section v-else-if="currentSection === 'tutorial'" class="content-section">
        <InteractiveTutorial />
      </section>

      <!-- Concepts Section -->
      <section v-else-if="currentSection === 'basics'" class="content-section">
        <div class="content-container">
          <div class="content-header">
            <h2 class="content-title">Vue 3 Core Concepts</h2>
            <p class="content-description">
              Comprehensive Vue concepts from basic to advanced - everything you need to master Vue.js
            </p>
          </div>

          <!-- Concept Filters -->
          <div class="concept-filters">
            <button
              v-for="filter in conceptFilters"
              :key="filter.id"
              @click="setConceptFilter(filter.id)"
              :class="[
                'filter-button',
                { 'active': activeConceptFilter === filter.id }
              ]"
            >
              {{ filter.icon }} {{ filter.label }}
            </button>
          </div>
          
          <div class="concepts-grid">
            <div
              v-for="concept in filteredConcepts"
              :key="concept.id"
              class="concept-card-modern"
              :class="{ 'expanded': expandedConcept === concept.id }"
              :style="{ '--concept-accent': concept.color }"
            >
              <div class="concept-header">
                <div class="concept-icon-wrapper">
                  <div class="concept-icon">{{ concept.icon || '📚' }}</div>
                </div>
                <div class="concept-info">
                  <h3 class="concept-title">{{ concept.title }}</h3>
                  <div class="concept-meta">
                    <span class="concept-category">{{ concept.category }}</span>
                    <span class="concept-difficulty" :class="`difficulty-${concept.difficulty?.toLowerCase()}`">
                      {{ concept.difficulty }}
                    </span>
                  </div>
                </div>
                
                <!-- Expand/Collapse Button -->
                <button 
                  @click="toggleConceptExpansion(concept.id)"
                  class="expand-toggle"
                  :class="{ 'expanded': expandedConcept === concept.id }"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              </div>
              
              <p class="concept-description">{{ concept.description }}</p>
              
              <!-- Basic Examples (Always Visible) -->
              <div class="concept-examples" v-if="concept.examples">
                <h4 class="examples-title">Key Topics:</h4>
                <ul class="examples-list">
                  <li 
                    v-for="example in concept.examples.slice(0, 3)"
                    :key="example"
                    class="example-item"
                  >
                    {{ example }}
                  </li>
                  <li v-if="concept.examples.length > 3 && expandedConcept !== concept.id" class="example-item more-examples">
                    +{{ concept.examples.length - 3 }} more topics...
                  </li>
                </ul>
              </div>

              <!-- Expanded Content - Only visible when expanded -->
              <transition name="expand-content" @enter="onExpandEnter" @leave="onExpandLeave">
                <div v-if="expandedConcept === concept.id" class="expanded-content">
                  
                  <!-- Complete Examples List -->
                  <div v-if="concept.examples && concept.examples.length > 3" class="expanded-examples">
                    <h4 class="expanded-section-title">
                      <span class="section-icon">📋</span>
                      Complete Topics List
                    </h4>
                    <ul class="expanded-examples-list">
                      <li 
                        v-for="(example, index) in concept.examples.slice(3)"
                        :key="example"
                        class="expanded-example-item"
                        :style="{ animationDelay: `${index * 0.1}s` }"
                      >
                        {{ example }}
                      </li>
                    </ul>
                  </div>

                  <!-- Detailed Information Section -->
                  <div class="detailed-info">
                    <h4 class="expanded-section-title">
                      <span class="section-icon">🔍</span>
                      Detailed Information
                    </h4>
                    <div class="info-cards">
                      
                      <!-- When to Use -->
                      <div class="info-card when-to-use">
                        <div class="info-card-header">
                          <span class="info-icon">🎯</span>
                          <h5 class="info-title">When to Use</h5>
                        </div>
                        <p class="info-content">{{ getConceptUsage(concept.id) }}</p>
                      </div>

                      <!-- Best Practices -->
                      <div class="info-card best-practices">
                        <div class="info-card-header">
                          <span class="info-icon">⭐</span>
                          <h5 class="info-title">Best Practices</h5>
                        </div>
                        <ul class="practices-list">
                          <li v-for="practice in getConceptBestPractices(concept.id)" :key="practice" class="practice-item">
                            {{ practice }}
                          </li>
                        </ul>
                      </div>

                      <!-- Common Pitfalls -->
                      <div class="info-card common-pitfalls">
                        <div class="info-card-header">
                          <span class="info-icon">⚠️</span>
                          <h5 class="info-title">Common Pitfalls</h5>
                        </div>
                        <ul class="pitfalls-list">
                          <li v-for="pitfall in getConceptPitfalls(concept.id)" :key="pitfall" class="pitfall-item">
                            {{ pitfall }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Code Examples Section -->
                  <div class="code-examples">
                    <h4 class="expanded-section-title">
                      <span class="section-icon">💻</span>
                      Code Examples
                    </h4>
                    <div class="code-examples-container">
                      <div 
                        v-for="(example, index) in getConceptCodeExamples(concept.id)" 
                        :key="index"
                        class="code-example-card"
                      >
                        <div class="code-example-header">
                          <span class="code-icon">{{ example.icon }}</span>
                          <h6 class="code-title">{{ example.title }}</h6>
                        </div>
                        <pre class="code-block"><code>{{ example.code }}</code></pre>
                        <p class="code-explanation">{{ example.explanation }}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Related Concepts -->
                  <div class="related-concepts">
                    <h4 class="expanded-section-title">
                      <span class="section-icon">🔗</span>
                      Related Concepts
                    </h4>
                    <div class="related-concepts-list">
                      <button 
                        v-for="relatedId in getRelatedConcepts(concept.id)" 
                        :key="relatedId"
                        @click="jumpToConcept(relatedId)"
                        class="related-concept-btn"
                      >
                        {{ getConceptTitle(relatedId) }}
                      </button>
                    </div>
                  </div>

                </div>
              </transition>

              <!-- Action Buttons -->
              <div class="concept-actions">
                <button 
                  @click="toggleConceptExpansion(concept.id)"
                  class="concept-action primary"
                >
                  <span class="action-icon">{{ expandedConcept === concept.id ? '📖' : '🔍' }}</span>
                  {{ expandedConcept === concept.id ? 'Show Less' : 'Learn More' }}
                </button>
                
                <button 
                  @click="practiceWithConcept(concept.id)"
                  class="concept-action secondary"
                >
                  <span class="action-icon">🎮</span>
                  Practice
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Intermediate Section -->
      <section v-else-if="currentSection === 'intermediate'" class="content-section">
        <div class="content-container">
          <div class="content-header">
            <h2 class="content-title">How Vue.js Works Internally</h2>
            <p class="content-description">
              Interactive visualization of Vue's internal process - from your code to the DOM
            </p>
          </div>
          
          <div class="content-body">
            <VueProcessVisualization />
          </div>
        </div>
      </section>

      <!-- Advanced Section -->
      <section v-else-if="currentSection === 'advanced'" class="content-section">
        <div class="content-container">
          <div class="content-header">
            <h2 class="content-title">Real-World Projects</h2>
            <p class="content-description">
              Build production-ready applications with Vue 3 best practices
            </p>
          </div>
          
          <div class="content-body">
            <div class="placeholder-card">
              <div class="placeholder-icon">🏗️</div>
              <h3 class="placeholder-title">Project-Based Learning</h3>
              <p class="placeholder-text">
                Build real applications while learning testing strategies, performance optimization, and scalable architecture.
              </p>
              <SmallButton />
            </div>
          </div>
        </div>
      </section>

      <!-- AI Tutor Section - AI-Powered Learning Features -->
      <section v-else-if="currentSection === 'ai-tutor'" class="content-section ai-tutor-section">
        <div class="content-container">
          <div class="content-header ai-header">
            <div class="ai-header-icon">🤖</div>
            <div class="ai-header-content">
              <h2 class="content-title">AI-Powered Learning Assistant</h2>
              <p class="content-description">
                Get personalized help, code reviews, and adaptive quizzes powered by advanced AI! 
                Your personal Vue.js mentor is here to accelerate your learning journey. ✨
              </p>
            </div>
          </div>

          <!-- AI Features Grid -->
          <div class="ai-features-grid">
            <!-- AI Tutor Chat -->
            <div class="ai-feature-card">
              <div class="feature-header">
                <div class="feature-icon">💬</div>
                <h3 class="feature-title">Personal AI Tutor</h3>
                <p class="feature-subtitle">Chat with your Vue.js learning assistant</p>
              </div>
              <div class="feature-content">
                <AITutorChat 
                  :current-section="currentSection"
                  :user-progress="progressStats"
                  @tutor-interaction="handleTutorInteraction"
                />
              </div>
            </div>

            <!-- AI Code Reviewer (temporarily disabled) -->
            <div class="ai-feature-card">
              <div class="feature-header">
                <div class="feature-icon">🔍</div>
                <h3 class="feature-title">Smart Code Review</h3>
                <p class="feature-subtitle">Get expert feedback on your Vue.js code</p>
              </div>
              <div class="feature-content">
                <div class="coming-soon">
                  <div class="coming-soon-icon">🚧</div>
                  <p>Code reviewer coming soon!</p>
                </div>
                <!-- <AICodeReviewer 
                  @code-reviewed="handleCodeReview"
                /> -->
              </div>
            </div>

            <!-- AI Quiz Generator -->
            <div class="ai-feature-card">
              <div class="feature-header">
                <div class="feature-icon">🧠</div>
                <h3 class="feature-title">Personalized AI Quiz</h3>
                <p class="feature-subtitle">Test your knowledge with adaptive questions</p>
              </div>
              <div class="feature-content">
                <AIQuizGenerator 
                  @quiz-completed="handleQuizCompleted"
                  @quiz-started="handleQuizStarted"
                  @answer-submitted="handleAnswerSubmitted"
                />
              </div>
            </div>
          </div>

          <!-- AI Learning Stats -->
          <div class="ai-stats-section">
            <div class="stats-header">
              <h3 class="stats-title">🧠 Your AI Learning Journey</h3>
              <p class="stats-subtitle">Track your progress with AI-powered insights</p>
            </div>
            <div class="ai-stats-grid">
              <div class="stat-card">
                <div class="stat-icon">💬</div>
                <div class="stat-content">
                  <div class="stat-number">{{ aiInteractionCount }}</div>
                  <div class="stat-label">AI Conversations</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🔍</div>
                <div class="stat-content">
                  <div class="stat-number">{{ codeReviewCount }}</div>
                  <div class="stat-label">Code Reviews</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🎯</div>
                <div class="stat-content">
                  <div class="stat-number">{{ Math.round(averageCodeScore * 10) / 10 }}</div>
                  <div class="stat-label">Avg Code Score</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🚀</div>
                <div class="stat-content">
                  <div class="stat-number">{{ aiLearningStreak }}</div>
                  <div class="stat-label">Learning Streak</div>
                </div>
              </div>
            </div>
          </div>

          <!-- AI Tips Section -->
          <div class="ai-tips-section">
            <div class="tips-header">
              <h3 class="tips-title">💡 AI Learning Tips</h3>
            </div>
            <div class="tips-grid">
              <div class="tip-card">
                <div class="tip-icon">🎯</div>
                <h4 class="tip-title">Ask Specific Questions</h4>
                <p class="tip-text">
                  Instead of "How does Vue work?", try "How do I pass data between components?"
                </p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">📝</div>
                <h4 class="tip-title">Share Your Code</h4>
                <p class="tip-text">
                  Paste your actual code for personalized reviews and specific improvement suggestions.
                </p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">🔄</div>
                <h4 class="tip-title">Iterate & Improve</h4>
                <p class="tip-text">
                  Use AI feedback to refine your code, then ask for another review to track progress.
                </p>
              </div>
              <div class="tip-card">
                <div class="tip-icon">🎪</div>
                <h4 class="tip-title">Use Memory Palace</h4>
                <p class="tip-text">
                  Ask the AI to explain concepts using our fun memory palace analogies!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- AI Game Section - Gamified Vue 3 Learning Experience -->
      <section v-else-if="currentSection === 'ai-game'" class="content-section ai-game-section">
        <div class="content-container">
          <AILearningGame />
        </div>
      </section>

      <!-- JavaScript Academy Section - AI-Powered JavaScript Learning -->
      <section v-else-if="currentSection === 'js-academy'" class="content-section js-academy-section">
        <div class="content-container">
          <AIJavaScriptAcademy />
        </div>
      </section>

      <!-- Interactive Components Section - Try Live Examples -->
      <section v-else-if="currentSection === 'interactive-components'" class="content-section interactive-components-section">
        <div class="content-container">
          <div class="content-header">
            <h2 class="content-title">Interactive Components</h2>
            <p class="content-description">
              Experience Vue's reactivity system with these live examples and interactive demos
            </p>
          </div>
          
          <div class="interactive-demos-grid">
            <!-- Concept Arena Demo -->
            <div class="demo-card">
              <div class="demo-header">
                <h3 class="demo-title">Concept Arena</h3>
                <p class="demo-subtitle">Vue knowledge testing & quiz game</p>
              </div>
              <div class="demo-content">
                <ConceptArena 
                  @redirect-to-learning="handleRedirectToLearning"
                  @toilet-mode-activated="handleToiletMode"
                />
              </div>
            </div>
            
            <!-- Theme Toggle Demo -->
            <div class="demo-card">
              <div class="demo-header">
                <h3 class="demo-title">Theme Toggle</h3>
                <p class="demo-subtitle">Reactivity & state management</p>
              </div>
              <div class="demo-content">
                <SmallButton 
                  :initial-mode="currentTheme"
                  @theme-changed="handleThemeChange"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Notification System -->
    <NotificationContainer 
      v-if="notifications.length > 0"
      :notifications="notifications"
      @close-notification="removeNotification"
    />

    <!-- Achievements Modal (if implemented) -->
    <AchievementsModal
      v-if="showAchievements"
      :achievements="unlockedAchievements"
      @close="closeAchievementsModal"
    />
  </div>
</template>

<script setup>
/**
 * SCRIPT SETUP SYNTAX
 * ==================
 * The <script setup> syntax is Vue 3's recommended way to use Composition API.
 * Benefits:
 * - Less boilerplate compared to Options API
 * - Better TypeScript support
 * - More efficient compilation
 * - Automatic name inference for components
 */

// IMPORT VUE 3'S COMPOSITION API FUNCTIONS
// =======================================
// These are Vue 3's superpowers that make our component reactive and intelligent:
// - ref: Creates reactive references (smart variables that update the UI automatically)
// - computed: Creates calculated values that update when their dependencies change
// - onMounted: Runs code when the component is first loaded (like an initialization script)
// - provide: Shares data with child components (like a parent giving tools to children)
import { ref, computed, onMounted, provide } from 'vue'

/**
 * REACTIVE STATE MANAGEMENT
 * =======================
 * Vue 3's reactivity system is like a smart observer that watches for changes.
 * When reactive data changes, Vue automatically updates the UI.
 * 
 * Key Concepts:
 * 1. ref() - For reactive primitive values (strings, numbers, booleans)
 * 2. reactive() - For reactive objects and arrays
 * 3. computed() - For derived values that depend on other reactive data
 */

// Reactive References (ref)
// ------------------------
// These are like "smart variables" that trigger UI updates when changed
const currentSection = ref('welcome')      // Tracks active section
const currentTheme = ref('light')          // Tracks visual theme
const showAchievements = ref(false)        // Controls achievement modal
const aiInteractionCount = ref(0)          // Tracks AI interactions
const codeReviewCount = ref(0)             // Tracks code reviews
const averageCodeScore = ref(7.5)          // Average review score
const aiLearningStreak = ref(3)            // Learning streak
const activeConceptFilter = ref('all')     // Active concept filter

/**
 * COMPUTED PROPERTIES
 * =================
 * Computed properties are like smart formulas that automatically recalculate
 * when their dependencies change. They're perfect for:
 * - Filtering lists
 * - Formatting data
 * - Combining multiple reactive values
 */

// Computed property example - converts theme into CSS class
const themeClass = computed(() => `theme-${currentTheme.value}`)

// Filtered concepts based on active filter
const filteredConcepts = computed(() => {
  if (activeConceptFilter.value === 'all') {
    return coreConcepts.value
  }
  
  return coreConcepts.value.filter(concept => {
    const category = concept.category?.toLowerCase()
    return category === activeConceptFilter.value
  })
})

/**
 * LIFECYCLE HOOKS
 * ==============
 * Lifecycle hooks let you run code at specific times during a component's life.
 * Common hooks:
 * - onMounted: When component is added to the DOM
 * - onUpdated: After component updates
 * - onUnmounted: Before component is removed
 */

onMounted(() => {
  console.log('Modern Vue 3 Learning App initialized')
  
  // Show welcome message after initial load
  setTimeout(() => {
    if (currentSection.value === 'welcome') {
      showWelcomeMessage()
    }
  }, 1500)
  
  // Apply initial theme
  document.documentElement.className = `theme-${currentTheme.value}`
})

/**
 * DEPENDENCY INJECTION
 * ==================
 * provide/inject lets you share data between components without props.
 * It's like a "wireless" connection between components.
 * Use it for:
 * - Theme data
 * - User preferences
 * - Authentication state
 */

// Provide global state for child components
provide('currentTheme', currentTheme)
provide('currentSection', currentSection)

// IMPORT CHILD COMPONENTS
// ======================
// These are our reusable UI building blocks (like LEGO pieces for our app):
// - SimpleNavigation: The navigation bar at the top
// - ConceptArena: The interactive quiz/game component
// - SmallButton: A reusable button component with theme switching
// - NotificationContainer: Shows toast notifications to users
// - AchievementsModal: Popup that shows unlocked achievements
// - MnemonicCard: Cards that display learning concepts with memory techniques
// - AITutorChat: AI-powered chat assistant for Vue.js learning
// - AICodeReviewer: AI-powered code analysis and feedback system
// - InteractiveTutorial: Enhanced tab-based tutorial system with comprehensive Vue 3 learning
// - VueProcessVisualization: Interactive animated visualization of how Vue.js works internally
import SimpleNavigation from './components/common/SimpleNavigation.vue'
import ConceptArena from './components/common/ConceptArena.vue'
import SmallButton from './components/common/SmallButton.vue'
import EmojiButtons from './components/common/EmojiButtons.vue'
import NotificationContainer from './components/common/NotificationContainer.vue'
import AchievementsModal from './components/common/AchievementsModal.vue'
import MnemonicCard from './components/common/MnemonicCard.vue'
import AITutorChat from './components/ai/AITutorChat.vue'
// import AICodeReviewer from './components/ai/AICodeReviewer.vue'
import AIQuizGenerator from './components/ai/AIQuizGenerator.vue'
import AILearningGame from './components/ai/AILearningGame.vue'
import AIJavaScriptAcademy from './components/ai/AIJavaScriptAcademy.vue'
import InteractiveTutorial from './components/learning/InteractiveTutorial.vue'
import VueProcessVisualization from './components/learning/VueProcessVisualization.vue'

// IMPORT LEARNING DATA
// ===================
// These contain all the educational content for our Vue learning app:
// - CORE_CONCEPTS: Basic Vue concepts (components, reactivity, etc.)
// - NAVIGATION_SECTIONS: Menu items and their configurations
// - MNEMONIC_CONCEPTS: Learning concepts with memory palace techniques
import { CORE_CONCEPTS, NAVIGATION_SECTIONS, MNEMONIC_CONCEPTS } from './data/vueData.js'

// IMPORT COMPOSABLES (REUSABLE LOGIC)
// ==================================
// Composables are like toolboxes that contain reusable functionality:
// - useProgress: Tracks learning progress, completions, and achievements
// - useNotifications: Manages toast notifications and user feedback
import { useProgress } from './composables/useProgress.js'
import { useNotifications } from './composables/useNotifications.js'

// APPLICATION STATE MANAGEMENT
// ============================
// These are the main reactive variables that control our app's behavior:

// currentSection: Tracks which section of the app is currently active
// Think of this as the "current page" - it could be 'welcome', 'tutorial', 'basics', etc.
// When this changes, Vue automatically updates the UI to show the right content

// currentTheme: Tracks the visual theme (light/dark mode)
// This controls the color scheme throughout the entire application
// When changed, it updates CSS classes and visual appearance

// showAchievements: Controls whether the achievements modal is visible
// This is a boolean that shows/hides the popup with user achievements

// AI LEARNING ANALYTICS STATE
// ===========================
// These variables track user interactions with AI features for learning insights:

// aiInteractionCount: Total number of AI tutor conversations

// codeReviewCount: Total number of code reviews performed

// averageCodeScore: Average score from AI code reviews (0-10 scale)

// aiLearningStreak: Current streak of consecutive days using AI features

// CONCEPT FILTERING STATE
// =======================
// These variables control the concept filtering in the basics section:

// activeConceptFilter: Currently selected filter for concepts (all, basic, intermediate, advanced)

// INITIALIZE COMPOSABLES (REUSABLE LOGIC TOOLBOXES)
// =================================================
// We're "unpacking" functionality from our composables into variables we can use:

// FROM useProgress composable - Learning progress tracking:
// - completionPercentage: How much of the course is completed (0-100%)
// - getProgressStats: Function that returns detailed progress statistics
// - getUnlockedAchievements: Function that returns list of earned achievements
const {
  completionPercentage,
  getProgressStats,
  getUnlockedAchievements
} = useProgress()

// FROM useNotifications composable - User feedback system:
// - notifications: Array of currently visible notification messages
// - removeNotification: Function to dismiss a specific notification
// - showWelcomeMessage: Function to show a welcome message to new users
// - showInteractiveFeedback: Function to show feedback when users interact with the app
const {
  notifications,
  removeNotification,
  showWelcomeMessage,
  showInteractiveFeedback
} = useNotifications()

// COMPUTED PROPERTIES (SMART CALCULATED VALUES)
// =============================================
// Computed properties are like Excel formulas - they automatically recalculate
// when their dependencies change. They're cached for performance and only
// update when necessary. Think of them as "smart variables" that stay in sync.

// coreConcepts: Makes the imported CORE_CONCEPTS data reactive
// This ensures that if the concepts data changes, the UI updates automatically
const coreConcepts = computed(() => CORE_CONCEPTS)

// mnemonicConcepts: Makes the imported MNEMONIC_CONCEPTS data reactive
// These are the memory palace learning concepts with funny associations
const mnemonicConcepts = computed(() => MNEMONIC_CONCEPTS)

// navigationSections: Makes the navigation menu data reactive
// This controls what appears in the navigation bar
const navigationSections = computed(() => NAVIGATION_SECTIONS)

// progressStats: Automatically calculates current progress statistics
// This updates whenever the user completes sections or unlocks achievements
// Returns an object with completion percentages, time spent, etc.
const progressStats = computed(() => getProgressStats())

// unlockedAchievements: Gets the list of achievements the user has earned
// Updates automatically when new achievements are unlocked
const unlockedAchievements = computed(() => getUnlockedAchievements())

// themeClass: Converts the current theme into a CSS class name
// When currentTheme is 'light', this returns 'theme-light'
// When currentTheme is 'dark', this returns 'theme-dark'
// This is used to apply theme-specific styles throughout the app

// Learning path features for welcome section
const appFeatures = computed(() => [
  {
    id: 'memory-palace',
    title: 'Memory Palace',
    description: 'Learn with funny far-fetched associations and visual mnemonics that stick!',
    icon: '🏰',
    sectionId: 'memory-palace'
  },
  {
    id: 'interactive',
    title: 'Interactive Tutorial',
    description: 'Step-by-step learning with hands-on examples and live code',
    icon: '🎮',
    sectionId: 'tutorial'
  },
  {
    id: 'concepts',
    title: 'Core Concepts',
    description: 'Master the fundamental building blocks of Vue 3',
    icon: '🧱',
    sectionId: 'basics'
  },
  {
    id: 'patterns',
    title: 'Advanced Patterns',
    description: 'Learn professional patterns and optimization techniques',
    icon: '⚡',
    sectionId: 'intermediate'
  }
])

// Concept filtering configuration
const conceptFilters = computed(() => [
  { id: 'all', label: 'All Concepts', icon: '🎯' },
  { id: 'basic', label: 'Basic', icon: '🌱' },
  { id: 'intermediate', label: 'Intermediate', icon: '🚀' },
  { id: 'advanced', label: 'Advanced', icon: '⚡' }
])

// Navigation and state management methods

/**
 * Handle section navigation with smooth transitions
 */
const handleSectionChange = (sectionId) => {
  setCurrentSection(sectionId)
}

/**
 * Set active section with user feedback
 */
const setCurrentSection = (sectionId) => {
  const oldSection = currentSection.value
  currentSection.value = sectionId
  
  // Provide user feedback
  showInteractiveFeedback(
    'Navigation',
    `Navigated to ${getSectionTitle(sectionId)}`
  )
  
  // Smooth scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  console.log(`Section changed: ${oldSection} → ${sectionId}`)
}

/**
 * Get readable section title
 */
const getSectionTitle = (sectionId) => {
  const section = navigationSections.value.find(s => s.id === sectionId)
  return section ? section.title : sectionId
}

/**
 * Handle theme changes from theme toggle
 */
const handleThemeChange = (themeData) => {
  currentTheme.value = themeData.theme
  
  // Apply theme globally
  document.documentElement.className = `theme-${themeData.theme}`
  
  showInteractiveFeedback(
    'Theme Updated',
    `Switched to ${themeData.theme} mode`
  )
}

/**
 * Handle concept learning navigation
 */
const learnMore = (conceptId) => {
  showInteractiveFeedback(
    'Learning Path',
    `Exploring ${conceptId} concept`
  )
  
  // Navigate to tutorial for hands-on learning
  setCurrentSection('tutorial')
}

/**
 * Set the active concept filter
 */
const setConceptFilter = (filterId) => {
  activeConceptFilter.value = filterId
  
  showInteractiveFeedback(
    'Filter Updated',
    `Showing ${filterId === 'all' ? 'all' : filterId} concepts`
  )
}

/**
 * Show achievements modal
 */
const showAchievementsModal = () => {
  showAchievements.value = true
}

/**
 * Close achievements modal
 */
const closeAchievementsModal = () => {
  showAchievements.value = false
}

/**
 * Handle redirect to learning from Concept Arena
 */
const handleRedirectToLearning = () => {
  showInteractiveFeedback(
    'Redirecting to Learning',
    'Smart choice! Let\'s learn Vue first! 📚'
  )
  
  // Navigate to tutorial section
  setCurrentSection('tutorial')
}

/**
 * Handle toilet mode activation - the ultimate punishment!
 */
const handleToiletMode = () => {
  showInteractiveFeedback(
    'TOILET MODE ACTIVATED! 🚽',
    'You have been flushed into the toilet dimension!'
  )
  
  // In a real app, you might want to do something more drastic here
  // For now, we'll just show a dramatic notification
  console.log('🚽 User has been flushed to toilet mode!')
}

// AI LEARNING METHODS
// ===================
// These methods handle AI-powered learning features and analytics:

/**
 * Handle AI tutor interactions and track analytics
 * @param {Object} interaction - The interaction data from AI tutor
 */
const handleTutorInteraction = (interaction) => {
  // Increment interaction counter
  aiInteractionCount.value++
  
  // Show feedback to user
  showInteractiveFeedback(
    'AI Tutor 🤖',
    'Great question! Learning with AI accelerates your progress!'
  )
  
  // Log interaction for analytics
  console.log('AI Tutor Interaction:', {
    question: interaction.userMessage,
    section: interaction.context.currentSection,
    totalInteractions: aiInteractionCount.value
  })
  
  // Update learning streak (simplified logic)
  if (aiInteractionCount.value % 5 === 0) {
    aiLearningStreak.value++
    showInteractiveFeedback(
      'Learning Streak! 🔥',
      `You're on a ${aiLearningStreak.value} day AI learning streak!`
    )
  }
}

/**
 * Handle AI code review completion and update analytics
 * @param {Object} reviewData - The code review data
 */
const handleCodeReview = (reviewData) => {
  // Increment review counter
  codeReviewCount.value++
  
  // Update average score (simple moving average)
  const currentAvg = averageCodeScore.value
  const newScore = reviewData.result.overallScore
  averageCodeScore.value = ((currentAvg * (codeReviewCount.value - 1)) + newScore) / codeReviewCount.value
  
  // Show feedback based on score
  let feedbackMessage = 'Code reviewed! Keep improving! 💪'
  if (newScore >= 8) {
    feedbackMessage = 'Excellent code! You\'re becoming a Vue expert! 🌟'
  } else if (newScore >= 6) {
    feedbackMessage = 'Good work! A few tweaks and you\'ll be golden! ✨'
  } else if (newScore >= 4) {
    feedbackMessage = 'Keep learning! Every review makes you better! 🚀'
  }
  
  showInteractiveFeedback(
    'Code Review Complete 🔍',
    feedbackMessage
  )
  
  // Log review for analytics
  console.log('AI Code Review:', {
    score: newScore,
    codeType: reviewData.codeType,
    averageScore: averageCodeScore.value,
    totalReviews: codeReviewCount.value
  })
}

/**
 * Handle AI quiz completion and update analytics
 * @param {Object} quizData - The quiz completion data
 */
const handleQuizCompleted = (quizData) => {
  // Update quiz statistics (these would be tracked in a separate state)
  console.log('AI Quiz Completed:', {
    score: quizData.score,
    topic: quizData.topic,
    difficulty: quizData.difficulty,
    results: quizData.results
  })
  
  // Show congratulatory feedback based on score
  let feedbackMessage = 'Quiz completed! Keep learning! 🧠'
  if (quizData.score >= 90) {
    feedbackMessage = 'Outstanding! You\'re a Vue master! 🏆'
  } else if (quizData.score >= 80) {
    feedbackMessage = 'Excellent work! You\'re really getting it! ⭐'
  } else if (quizData.score >= 70) {
    feedbackMessage = 'Great progress! Keep it up! 🚀'
  } else if (quizData.score >= 60) {
    feedbackMessage = 'Good effort! Practice makes perfect! 💪'
  }
  
  showInteractiveFeedback(
    'Quiz Complete! 🎉',
    feedbackMessage
  )
  
  // Update learning streak for quiz completion
  if (quizData.score >= 70) {
    aiLearningStreak.value++
  }
}

/**
 * Handle AI quiz start for analytics
 * @param {Object} quizConfig - The quiz configuration
 */
const handleQuizStarted = (quizConfig) => {
  console.log('AI Quiz Started:', {
    topic: quizConfig.topic,
    difficulty: quizConfig.difficulty,
    questionCount: quizConfig.questionCount
  })
  
  showInteractiveFeedback(
    'Quiz Started! 🧠',
    `Get ready to test your ${quizConfig.topic} knowledge!`
  )
}

/**
 * Handle individual quiz answer submission for learning analytics
 * @param {Object} answerData - The answer submission data
 */
const handleAnswerSubmitted = (answerData) => {
  console.log('Quiz Answer Submitted:', {
    questionIndex: answerData.questionIndex,
    isCorrect: answerData.isCorrect,
    topic: answerData.topic
  })
  
  // Could track detailed learning analytics here
  // For example: identify concepts that need more practice
}

// CONCEPT EXPANSION FUNCTIONALITY
// ===============================
// These methods handle the expandable concept cards with detailed information

// Track which concept is currently expanded (only one at a time)
const expandedConcept = ref(null)

/**
 * Toggle concept expansion - expand/collapse detailed information
 * @param {string} conceptId - The ID of the concept to toggle
 */
const toggleConceptExpansion = (conceptId) => {
  // If clicking the same concept, collapse it
  if (expandedConcept.value === conceptId) {
    expandedConcept.value = null
    showInteractiveFeedback(
      'Concept Collapsed',
      'Concept details hidden'
    )
  } else {
    // Expand the new concept
    expandedConcept.value = conceptId
    const concept = coreConcepts.value.find(c => c.id === conceptId)
    showInteractiveFeedback(
      'Concept Expanded',
      `Exploring detailed information about ${concept?.title || conceptId}`
    )
  }
}

/**
 * Get usage information for a concept
 * @param {string} conceptId - The concept ID
 * @returns {string} Usage description
 */
const getConceptUsage = (conceptId) => {
  const usageMap = {
    'components': 'Use components to build reusable UI pieces. Perfect for buttons, forms, cards, and any UI element you want to reuse across your application.',
    'templates': 'Use templates for dynamic HTML rendering. Essential when you need to display data, handle user input, or create conditional layouts.',
    'reactivity': 'Use Vue\'s reactivity system when you need data that automatically updates the UI. Core to any interactive Vue application.',
    'event-handling': 'Use event handling for user interactions like clicks, form submissions, keyboard input, and mouse events.',
    'data-binding': 'Use data binding to connect your JavaScript data to HTML elements. Essential for forms, dynamic content, and interactive UIs.',
    'composition-api': 'Use Composition API for complex components, code reuse, and better TypeScript support. Recommended for larger applications.',
    'component-communication': 'Use when components need to share data. Choose props/events for parent-child, provide/inject for deep nesting.',
    'slots-scoped-slots': 'Use slots for flexible component content. Perfect for layout components, modals, and reusable UI patterns.',
    'lifecycle-hooks': 'Use lifecycle hooks for side effects like API calls, DOM manipulation, timers, and cleanup operations.',
    'dynamic-components': 'Use for tab systems, conditional rendering of different component types, and runtime component switching.',
    'forms-validation': 'Use for any user input collection - contact forms, user registration, surveys, and data entry interfaces.',
    'custom-directives': 'Use when you need custom DOM manipulation that doesn\'t fit into Vue\'s standard patterns.',
    'render-functions': 'Use for programmatic component creation, complex conditional rendering, and when templates aren\'t flexible enough.',
    'teleport-suspense': 'Use Teleport for modals, tooltips, notifications. Use Suspense for async components and loading states.',
    'performance-optimization': 'Use when your app feels slow - implement lazy loading, virtual scrolling, and component memoization.',
    'state-management': 'Use Pinia/Vuex for complex state shared across multiple components, especially in larger applications.',
    'testing': 'Essential for production apps - write unit tests for components, integration tests for user flows.',
    'typescript-integration': 'Use TypeScript for better developer experience, fewer bugs, and improved code maintainability.',
    'routing': 'Use Vue Router for multi-page applications, navigation, and URL-based state management.',
    'ssr-ssg': 'Use for SEO-critical sites, better performance, and improved initial page load times.',
    'build-tools': 'Use Vite for fast development, optimized builds, and modern JavaScript features.',
    'plugins-ecosystem': 'Use community plugins to extend Vue\'s functionality without reinventing the wheel.',
    'micro-frontends': 'Use for large applications with multiple teams, independent deployments, and technology diversity.'
  }
  
  return usageMap[conceptId] || 'This concept is fundamental to Vue.js development and helps create better, more maintainable applications.'
}

/**
 * Get best practices for a concept
 * @param {string} conceptId - The concept ID
 * @returns {Array} Array of best practice strings
 */
const getConceptBestPractices = (conceptId) => {
  const practicesMap = {
    'components': [
      'Keep components small and focused on a single responsibility',
      'Use descriptive component names (PascalCase)',
      'Define props with proper types and validation',
      'Emit events instead of modifying props directly'
    ],
    'templates': [
      'Use v-key for list items to help Vue track changes',
      'Prefer v-show for frequently toggled elements',
      'Use v-if for conditional rendering that rarely changes',
      'Keep template expressions simple and readable'
    ],
    'reactivity': [
      'Use ref() for primitive values, reactive() for objects',
      'Avoid mutating reactive objects directly in templates',
      'Use computed() for derived state instead of methods',
      'Destructure reactive objects carefully to maintain reactivity'
    ],
    'event-handling': [
      'Use event modifiers (.prevent, .stop) to handle common patterns',
      'Prefer method references over inline expressions for complex logic',
      'Use key modifiers for keyboard events (.enter, .esc)',
      'Debounce expensive event handlers like search input'
    ],
    'data-binding': [
      'Use v-model for two-way binding on form inputs',
      'Bind dynamic classes and styles using objects or arrays',
      'Use computed properties for complex binding logic',
      'Validate form data before submission'
    ],
    'composition-api': [
      'Group related reactive state and logic together',
      'Extract reusable logic into composables',
      'Use TypeScript for better development experience',
      'Return only what components need from composables'
    ],
    'component-communication': [
      'Follow the "props down, events up" pattern',
      'Use provide/inject sparingly and document dependencies',
      'Prefer explicit props over global state when possible',
      'Use Pinia for complex state management needs'
    ],
    'slots-scoped-slots': [
      'Provide default content for slots when appropriate',
      'Use named slots for multiple content areas',
      'Document slot props clearly for other developers',
      'Keep slot content simple and focused'
    ],
    'lifecycle-hooks': [
      'Use onMounted for DOM-dependent operations',
      'Clean up resources in onUnmounted (timers, listeners)',
      'Use onUpdated sparingly - prefer watchers for specific changes',
      'Handle errors gracefully with onErrorCaptured'
    ]
  }
  
  return practicesMap[conceptId] || [
    'Follow Vue.js style guide recommendations',
    'Write clean, readable, and maintainable code',
    'Test your implementation thoroughly',
    'Document complex logic for future developers'
  ]
}

/**
 * Get common pitfalls for a concept
 * @param {string} conceptId - The concept ID
 * @returns {Array} Array of pitfall strings
 */
const getConceptPitfalls = (conceptId) => {
  const pitfallsMap = {
    'components': [
      'Modifying props directly instead of emitting events',
      'Creating components that are too large and complex',
      'Not defining prop types and validation',
      'Tight coupling between parent and child components'
    ],
    'templates': [
      'Using complex logic directly in templates',
      'Forgetting keys in v-for loops',
      'Overusing v-if when v-show would be better',
      'Not escaping user-generated content (XSS vulnerability)'
    ],
    'reactivity': [
      'Destructuring reactive objects and losing reactivity',
      'Mutating reactive arrays with non-reactive methods',
      'Creating reactive objects inside computed properties',
      'Not understanding the difference between ref and reactive'
    ],
    'event-handling': [
      'Not preventing default behavior when needed',
      'Creating memory leaks with unremoved event listeners',
      'Using arrow functions incorrectly in event handlers',
      'Not handling edge cases like rapid clicking'
    ],
    'data-binding': [
      'Binding to undefined or null values without checks',
      'Using string concatenation instead of template literals',
      'Not validating bound data before use',
      'Overcomplicating binding expressions'
    ],
    'composition-api': [
      'Not understanding reactive vs ref differences',
      'Creating too many small composables',
      'Mixing Options API and Composition API unnecessarily',
      'Not properly typing composables with TypeScript'
    ],
    'component-communication': [
      'Using global state when local state would suffice',
      'Creating circular dependencies between components',
      'Not validating emitted event data',
      'Overusing provide/inject for simple prop passing'
    ]
  }
  
  return pitfallsMap[conceptId] || [
    'Not following Vue.js conventions and best practices',
    'Creating overly complex solutions for simple problems',
    'Not considering performance implications',
    'Insufficient error handling and edge case coverage'
  ]
}

/**
 * Get code examples for a concept
 * @param {string} conceptId - The concept ID
 * @returns {Array} Array of code example objects
 */
const getConceptCodeExamples = (conceptId) => {
  return [
    {
      icon: '💻',
      title: 'Basic Example',
      code: '// Example code for ' + conceptId + '\n// This would contain relevant code examples\nconsole.log("Learning ' + conceptId + '!")',
      explanation: 'Basic implementation example for ' + conceptId + ' concept.'
    }
  ]
}

/**
 * Get related concepts for cross-referencing
 * @param {string} conceptId - The concept ID
 * @returns {Array} Array of related concept IDs
 */
const getRelatedConcepts = (conceptId) => {
  const relationsMap = {
    'components': ['templates', 'event-handling', 'component-communication', 'slots-scoped-slots'],
    'templates': ['components', 'data-binding', 'event-handling', 'reactivity'],
    'reactivity': ['templates', 'data-binding', 'composition-api', 'lifecycle-hooks'],
    'event-handling': ['components', 'templates', 'forms-validation', 'data-binding'],
    'data-binding': ['templates', 'reactivity', 'forms-validation', 'event-handling'],
    'composition-api': ['reactivity', 'lifecycle-hooks', 'component-communication', 'testing'],
    'component-communication': ['components', 'composition-api', 'state-management', 'slots-scoped-slots'],
    'slots-scoped-slots': ['components', 'component-communication', 'templates', 'dynamic-components'],
    'lifecycle-hooks': ['composition-api', 'reactivity', 'performance-optimization', 'testing'],
    'dynamic-components': ['components', 'slots-scoped-slots', 'routing', 'performance-optimization']
  }
  
  return relationsMap[conceptId] || []
}

/**
 * Get concept title by ID
 * @param {string} conceptId - The concept ID
 * @returns {string} The concept title
 */
const getConceptTitle = (conceptId) => {
  const concept = coreConcepts.value.find(c => c.id === conceptId)
  return concept ? concept.title : conceptId
}

/**
 * Jump to a related concept (scroll to it and expand)
 * @param {string} conceptId - The concept ID to jump to
 */
const jumpToConcept = (conceptId) => {
  // Close current expanded concept
  expandedConcept.value = null
  
  // Wait for UI to update, then expand the target concept
  setTimeout(() => {
    expandedConcept.value = conceptId
    
    // Scroll to the concept (basic implementation)
    const conceptElement = document.querySelector(`[data-concept-id="${conceptId}"]`)
    if (conceptElement) {
      conceptElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    
    showInteractiveFeedback(
      'Navigated to Related Concept',
      `Exploring ${getConceptTitle(conceptId)}`
    )
  }, 300)
}

/**
 * Handle practice with concept - redirect to appropriate learning section
 * @param {string} conceptId - The concept ID to practice
 */
const practiceWithConcept = (conceptId) => {
  showInteractiveFeedback(
    'Practice Mode',
    `Starting practice exercises for ${getConceptTitle(conceptId)}`
  )
  
  // Navigate to AI Learning Game for practice
  setCurrentSection('ai-game')
}

/**
 * Animation lifecycle hooks for expand/collapse
 */
const onExpandEnter = (element) => {
  element.style.height = '0px'
  element.style.overflow = 'hidden'
  element.style.opacity = '0'
  
  // Force reflow
  element.offsetHeight
  
  element.style.transition = 'height 0.5s ease-out, opacity 0.3s ease-out'
  element.style.height = element.scrollHeight + 'px'
  element.style.opacity = '1'
}

const onExpandLeave = (element) => {
  element.style.height = element.scrollHeight + 'px'
  element.style.transition = 'height 0.3s ease-in, opacity 0.2s ease-in'
  
  // Force reflow
  element.offsetHeight
  
  element.style.height = '0px'
  element.style.opacity = '0'
}
</script>

<style scoped>
/* Modern App Styles - Clean and Professional */
.app-modern {
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text-primary);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-normal);
}

/* Main Content Layout */
.main-content-modern {
  flex: 1;
  width: 100%;
}

/* Welcome Section - Modern Hero Design */
.welcome-section-modern {
  padding: var(--space-8) 0;
}

.welcome-container-modern {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

/* Hero Section */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
  margin-bottom: var(--space-24);
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.hero-badge {
  align-self: flex-start;
}

.badge-text {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  background-color: var(--color-primary-100);
  color: var(--color-primary-dark);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  margin: 0;
}

.title-highlight {
  color: var(--color-primary);
  display: block;
}

.hero-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
  max-width: 500px;
}

/* Call-to-Action Buttons */
.hero-actions {
  display: flex;
  gap: var(--space-4);
  margin-top: var(--space-4);
}

.cta-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
}

.cta-button--primary {
  background-color: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-lg);
}

.cta-button--primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}

.cta-button--secondary {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.cta-button--secondary:hover {
  background-color: var(--color-background-secondary);
  border-color: var(--color-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.cta-icon {
  width: 20px;
  height: 20px;
}

/* Hero Visual */
.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
  width: 100%;
  max-width: 400px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  background-color: var(--color-background-secondary);
  border-bottom: 1px solid var(--color-border);
}

.card-dots {
  display: flex;
  gap: var(--space-2);
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
}

.dot--red { background-color: #ef4444; }
.dot--yellow { background-color: #f59e0b; }
.dot--green { background-color: #10b981; }

.card-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.card-content {
  padding: var(--space-6);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
}

.code-line {
  margin-bottom: var(--space-1);
}

.code-indent { padding-left: var(--space-4); }
.code-indent-2 { padding-left: var(--space-8); }

.code-tag { color: var(--color-primary); }
.code-attr { color: var(--color-secondary); }
.code-string { color: var(--color-success); }
.code-text { color: var(--color-text-primary); }

/* Section Headers */
.section-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.section-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Learning Path Cards */
.learning-paths {
  margin-bottom: var(--space-24);
}

.path-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
}

.path-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  cursor: pointer;
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.path-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
}

.path-card:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.path-icon {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--space-4);
  display: block;
}

.path-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.path-description {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0 0 var(--space-4) 0;
}

.path-arrow {
  position: absolute;
  top: var(--space-6);
  right: var(--space-6);
  width: 24px;
  height: 24px;
  color: var(--color-text-tertiary);
  transition: all var(--transition-fast);
}

.path-card:hover .path-arrow {
  color: var(--color-primary);
  transform: translateX(4px);
}

/* Demo Section */
.demo-section {
  margin-bottom: var(--space-16);
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-8);
}

.demo-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.demo-header {
  padding: var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.demo-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.demo-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.demo-content {
  padding: var(--space-6);
}

.demo-spacer {
  height: var(--space-6);
}

/* Content Sections */
.content-section {
  padding: var(--space-8) 0;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-6);
}

.content-header {
  text-align: center;
  margin-bottom: var(--space-12);
}

.content-title {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.content-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

.content-body {
  display: flex;
  justify-content: center;
}

/* Placeholder Cards */
.placeholder-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-12);
  text-align: center;
  max-width: 600px;
  box-shadow: var(--shadow-sm);
}

.placeholder-icon {
  font-size: var(--font-size-5xl);
  margin-bottom: var(--space-6);
  display: block;
}

.placeholder-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.placeholder-text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0 0 var(--space-8) 0;
}

.placeholder-demos {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-6);
}

/* Concept Filters */
.concept-filters {
  display: flex;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
  flex-wrap: wrap;
}

.filter-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filter-button:hover {
  border-color: var(--color-primary);
  color: var(--color-text-primary);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.filter-button.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-md);
}

/* Concepts Grid */
.concepts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-6);
}

.concept-card-modern {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: all var(--transition-fast);
  position: relative;
  overflow: hidden;
}

.concept-card-modern::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: var(--concept-accent, var(--color-primary));
}

.concept-card-modern:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--concept-accent, var(--color-primary));
}

.concept-header {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.concept-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background-color: var(--color-background-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.concept-icon {
  font-size: var(--font-size-xl);
}

.concept-info {
  flex: 1;
}

.concept-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.concept-meta {
  display: flex;
  gap: var(--space-3);
  align-items: center;
}

.concept-category {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  background: var(--color-background-secondary);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.concept-difficulty {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.difficulty-beginner {
  background: rgba(34, 197, 94, 0.1);
  color: var(--color-success);
}

.difficulty-intermediate {
  background: rgba(245, 158, 11, 0.1);
  color: var(--color-warning);
}

.difficulty-advanced {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-danger);
}

.difficulty-expert {
  background: rgba(168, 85, 247, 0.1);
  color: var(--color-secondary);
}

.concept-description {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0 0 var(--space-4) 0;
}

.concept-examples {
  margin-bottom: var(--space-6);
}

.examples-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.examples-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.example-item {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  padding: var(--space-1) 0;
  position: relative;
  padding-left: var(--space-4);
}

.example-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--concept-accent, var(--color-primary));
  font-weight: bold;
}

.example-item.more-examples {
  font-style: italic;
  color: var(--color-text-tertiary);
}

.example-item.more-examples::before {
  content: '⋯';
  color: var(--color-text-tertiary);
}

/* Expand Toggle Button */
.expand-toggle {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
}

.expand-toggle:hover {
  background: var(--concept-accent, var(--color-primary));
  color: var(--color-white);
  transform: translateY(-1px);
}

.expand-toggle.expanded {
  background: var(--concept-accent, var(--color-primary));
  color: var(--color-white);
  transform: rotate(180deg);
}

.expand-toggle svg {
  width: 16px;
  height: 16px;
}

/* Expanded Content */
.concept-card-modern.expanded {
  transform: none;
  box-shadow: var(--shadow-xl);
  border-color: var(--concept-accent, var(--color-primary));
}

.expanded-content {
  margin-top: var(--space-6);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.expanded-section-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.section-icon {
  font-size: var(--font-size-lg);
}

/* Expanded Examples */
.expanded-examples {
  margin-bottom: var(--space-6);
}

.expanded-examples-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--space-2);
}

.expanded-example-item {
  background: var(--color-background-secondary);
  padding: var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  position: relative;
  padding-left: var(--space-8);
  opacity: 0;
  animation: slideInLeft 0.5s ease-out forwards;
}

.expanded-example-item::before {
  content: '▶';
  position: absolute;
  left: var(--space-3);
  color: var(--concept-accent, var(--color-primary));
  font-size: var(--font-size-xs);
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Detailed Information Cards */
.detailed-info {
  margin-bottom: var(--space-6);
}

.info-cards {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.info-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: all var(--transition-fast);
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.info-card-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.info-icon {
  font-size: var(--font-size-lg);
}

.info-title {
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.info-content {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.practices-list,
.pitfalls-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.practice-item,
.pitfall-item {
  padding: var(--space-2) 0;
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  position: relative;
  padding-left: var(--space-5);
}

.practice-item::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-success);
  font-weight: bold;
}

.pitfall-item::before {
  content: '⚠';
  position: absolute;
  left: 0;
  color: var(--color-warning);
}

/* Code Examples */
.code-examples {
  margin-bottom: var(--space-6);
}

.code-examples-container {
  display: grid;
  gap: var(--space-4);
}

.code-example-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.code-example-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: var(--color-background-secondary);
  border-bottom: 1px solid var(--color-border);
}

.code-icon {
  font-size: var(--font-size-md);
}

.code-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.code-block {
  background: var(--color-background);
  padding: var(--space-4);
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: var(--font-size-sm);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
  overflow-x: auto;
}

.code-explanation {
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  margin: 0;
  border-top: 1px solid var(--color-border);
  background: var(--color-background-secondary);
}

/* Related Concepts */
.related-concepts {
  margin-bottom: var(--space-6);
}

.related-concepts-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.related-concept-btn {
  background: var(--color-background-secondary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.related-concept-btn:hover {
  background: var(--concept-accent, var(--color-primary));
  color: var(--color-white);
  border-color: var(--concept-accent, var(--color-primary));
  transform: translateY(-1px);
}

/* Concept Actions */
.concept-actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-4);
  flex-wrap: wrap;
}

.concept-action {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.concept-action.primary {
  background: var(--concept-accent, var(--color-primary));
  color: var(--color-white);
  border-color: var(--concept-accent, var(--color-primary));
}

.concept-action.primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.concept-action.secondary {
  background: var(--color-background-secondary);
  color: var(--color-text-primary);
}

.concept-action.secondary:hover {
  background: var(--color-background);
  transform: translateY(-1px);
}

.action-icon {
  font-size: var(--font-size-sm);
}

/* Expand Content Transition */
.expand-content-enter-active,
.expand-content-leave-active {
  transition: all 0.5s ease;
  overflow: hidden;
}

.expand-content-enter-from,
.expand-content-leave-to {
  opacity: 0;
  height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: var(--space-12);
    text-align: center;
  }
  
  .hero-visual {
    order: -1;
  }
  
  .demo-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .welcome-container-modern,
  .content-container {
    padding: 0 var(--space-3);
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
    line-height: 1.1;
  }
  
  .hero-description {
    font-size: var(--font-size-sm);
    line-height: 1.4;
    margin-bottom: var(--space-6);
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
  }
  
  .cta-button {
    width: 100%;
    justify-content: center;
    max-width: 280px;
    padding: var(--space-4) var(--space-6);
  }
  
  .path-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
  
  .path-card {
    padding: var(--space-5);
  }
  
  .concepts-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
  
  .demo-grid {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
  
  .section-header {
    text-align: center;
    margin-bottom: var(--space-8);
  }
  
  .section-title {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--space-3);
  }
  
  .section-description {
    font-size: var(--font-size-sm);
  }
}

@media (max-width: 480px) {
  .welcome-container-modern,
  .content-container {
    padding: 0 var(--space-2);
  }
  
  .hero-title {
    font-size: var(--font-size-2xl);
    line-height: 1.1;
  }
  
  .hero-description {
    font-size: var(--font-size-xs);
    line-height: 1.4;
    margin-bottom: var(--space-4);
  }
  
  .hero-badge {
    padding: var(--space-2) var(--space-3);
  }
  
  .badge-text {
    font-size: var(--font-size-xs);
  }
  
  .hero-actions {
    gap: var(--space-2);
  }
  
  .cta-button {
    max-width: 260px;
    padding: var(--space-3) var(--space-5);
    font-size: var(--font-size-sm);
  }
  
  .section-title {
    font-size: var(--font-size-xl);
  }
  
  .content-title {
    font-size: var(--font-size-2xl);
  }
  
  .path-card {
    padding: var(--space-4);
  }
  
  .path-title {
    font-size: var(--font-size-lg);
  }
  
  .path-description {
    font-size: var(--font-size-xs);
  }
  
  .placeholder-card {
    padding: var(--space-6);
  }
  
  .visual-card {
    max-width: 100%;
    padding: var(--space-4);
  }
  
  .card-title {
    font-size: var(--font-size-sm);
  }
  
  .code-line {
    font-size: var(--font-size-xs);
  }
}

/* Touch improvements for mobile */
@media (hover: none) and (pointer: coarse) {
  .path-card,
  .cta-button {
    min-height: 48px; /* Minimum touch target size */
  }
  
  .path-card:hover {
    transform: none; /* Disable hover transforms on touch devices */
  }
  
  .cta-button:hover {
    transform: none;
  }
  
  /* Add active states for touch feedback */
  .path-card:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
  
  .cta-button:active {
    transform: scale(0.98);
  }
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
  
  .path-card:hover,
  .concept-card-modern:hover,
  .cta-button:hover {
    transform: none;
  }
}

/* Focus improvements for keyboard navigation */
.path-card:focus,
.concept-action:focus,
.cta-button:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Memory Palace Section Styles */
.memory-palace-section {
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.05) 0%, 
    rgba(59, 130, 246, 0.05) 50%,
    rgba(16, 185, 129, 0.05) 100%);
}

.memory-palace-header {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.palace-icon {
  font-size: 4rem;
  animation: palaceFloat 4s infinite ease-in-out;
}

.header-content {
  flex: 1;
}

.memory-palace-intro {
  margin-bottom: var(--space-12);
}

.intro-card {
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9), 
    rgba(248, 250, 252, 0.9));
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  text-align: center;
  box-shadow: 0 8px 32px rgba(139, 92, 246, 0.1);
}

.intro-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.intro-text {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0 0 var(--space-6) 0;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.intro-features {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  flex-wrap: wrap;
}

.feature {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  min-width: 150px;
}

.feature-icon {
  font-size: 2rem;
  animation: featureFloat 3s infinite ease-in-out;
}

.feature:nth-child(2) .feature-icon {
  animation-delay: 1s;
}

.feature:nth-child(3) .feature-icon {
  animation-delay: 2s;
}

.feature-text {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-align: center;
}

.mnemonic-concepts-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Memory Palace Animations */
@keyframes palaceFloat {
  0%, 100% { 
    transform: translateY(0) rotate(0deg); 
    filter: hue-rotate(0deg);
  }
  25% { 
    transform: translateY(-5px) rotate(1deg); 
    filter: hue-rotate(90deg);
  }
  50% { 
    transform: translateY(-8px) rotate(0deg); 
    filter: hue-rotate(180deg);
  }
  75% { 
    transform: translateY(-3px) rotate(-1deg); 
    filter: hue-rotate(270deg);
  }
}

@keyframes featureFloat {
  0%, 100% { 
    transform: translateY(0) scale(1); 
  }
  50% { 
    transform: translateY(-8px) scale(1.05); 
  }
}

/* Responsive design for Memory Palace */
@media (max-width: 768px) {
  .memory-palace-header {
    flex-direction: column;
    text-align: center;
    gap: var(--space-4);
  }
  
  .palace-icon {
    font-size: 3rem;
  }
  
  .intro-features {
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .intro-card {
    padding: var(--space-6);
  }
}

@media (max-width: 480px) {
  .intro-text {
    font-size: var(--font-size-base);
  }
  
  .intro-title {
    font-size: var(--font-size-xl);
  }
  
  .palace-icon {
    font-size: 2.5rem;
  }
}

/* AI TUTOR SECTION STYLES */
/* ======================= */
/* Modern, futuristic design for AI-powered learning features */

.ai-tutor-section {
  background: linear-gradient(135deg, 
    rgba(102, 126, 234, 0.05) 0%, 
    rgba(118, 75, 162, 0.05) 50%,
    rgba(67, 56, 202, 0.05) 100%);
  position: relative;
  overflow: hidden;
}

.ai-tutor-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(16, 185, 129, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

/* AI Header */
.ai-header {
  display: flex;
  align-items: center;
  gap: var(--space-6);
  margin-bottom: var(--space-12);
  position: relative;
  z-index: 1;
}

.ai-header-icon {
  font-size: 4rem;
  animation: aiPulse 3s infinite ease-in-out;
  filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.3));
}

.ai-header-content {
  flex: 1;
}

/* AI Features Grid */
.ai-features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  margin-bottom: var(--space-12);
}

.ai-feature-card {
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid rgba(102, 126, 234, 0.2);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.ai-feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ai-feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 48px rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
}

.ai-feature-card:hover::before {
  opacity: 1;
}

.feature-header {
  margin-bottom: var(--space-6);
  text-align: center;
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--space-3);
  animation: featureGlow 4s infinite ease-in-out;
}

.feature-title {
  margin: 0 0 var(--space-2) 0;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.feature-subtitle {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.feature-content {
  min-height: 400px;
}

/* AI Stats Section */
.ai-stats-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  margin-bottom: var(--space-12);
  border: 2px solid rgba(102, 126, 234, 0.1);
}

.stats-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.stats-title {
  margin: 0 0 var(--space-2) 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.stats-subtitle {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

.ai-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-6);
}

.stat-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transform: rotate(45deg);
  transition: transform 0.6s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-card:hover::before {
  transform: rotate(45deg) translate(100%, 100%);
}

.stat-icon {
  font-size: 2rem;
  margin-bottom: var(--space-3);
  opacity: 0.9;
}

.stat-content {
  position: relative;
  z-index: 1;
}

.stat-number {
  display: block;
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  font-weight: var(--font-weight-medium);
}

/* AI Tips Section */
.ai-tips-section {
  background: rgba(255, 255, 255, 0.9);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  border: 2px solid rgba(102, 126, 234, 0.1);
}

.tips-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.tips-title {
  margin: 0;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.tip-card {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all 0.3s ease;
}

.tip-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
}

.tip-icon {
  font-size: 2rem;
  margin-bottom: var(--space-3);
  animation: tipFloat 3s infinite ease-in-out;
}

.tip-card:nth-child(2) .tip-icon {
  animation-delay: 0.5s;
}

.tip-card:nth-child(3) .tip-icon {
  animation-delay: 1s;
}

.tip-card:nth-child(4) .tip-icon {
  animation-delay: 1.5s;
}

.tip-title {
  margin: 0 0 var(--space-3) 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.tip-text {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

/* AI Animations */
@keyframes aiPulse {
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.3));
  }
  25% { 
    transform: scale(1.05) rotate(2deg);
    filter: drop-shadow(0 0 30px rgba(102, 126, 234, 0.5));
  }
  50% { 
    transform: scale(1.1) rotate(0deg);
    filter: drop-shadow(0 0 40px rgba(102, 126, 234, 0.7));
  }
  75% { 
    transform: scale(1.05) rotate(-2deg);
    filter: drop-shadow(0 0 30px rgba(102, 126, 234, 0.5));
  }
}

@keyframes featureGlow {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.2));
  }
  50% { 
    transform: scale(1.05);
    filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.4));
  }
}

@keyframes tipFloat {
  0%, 100% { 
    transform: translateY(0) rotate(0deg);
  }
  33% { 
    transform: translateY(-3px) rotate(1deg);
  }
  66% { 
    transform: translateY(-6px) rotate(-1deg);
  }
}

/* AI Game Section Styles */
.ai-game-section {
  padding: 0; /* Remove default padding since the game component handles its own layout */
  background: transparent; /* Let the game component control its background */
}

.ai-game-section .content-container {
  max-width: none; /* Allow full width for game experience */
  padding: 0; /* Remove container padding */
}

/* JavaScript Academy Section Styles */
.js-academy-section {
  padding: 0; /* Remove default padding since the academy component handles its own layout */
  background: transparent; /* Let the academy component control its background */
}

.js-academy-section .content-container {
  max-width: none; /* Allow full width for academy experience */
  padding: 0; /* Remove container padding */
}

/* Interactive Components Section Styles */
.interactive-components-section {
  background: var(--color-background);
  min-height: 80vh;
}

.interactive-demos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: var(--space-8);
  margin-top: var(--space-8);
}

.demo-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-sm);
}

.demo-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: var(--color-primary);
}

.demo-header {
  margin-bottom: var(--space-6);
  text-align: center;
}

.demo-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.demo-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.demo-content {
  background: var(--color-background-secondary);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive design for interactive components */
@media (max-width: 768px) {
  .interactive-demos-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  .demo-card {
    padding: var(--space-4);
  }
  
  .demo-content {
    min-height: 250px;
  }
}

/* AI Section Responsive Design */
@media (max-width: 1024px) {
  .ai-features-grid {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
  
  .ai-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tips-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .ai-header {
    flex-direction: column;
    text-align: center;
    gap: var(--space-4);
  }
  
  .ai-header-icon {
    font-size: 3rem;
  }
  
  .ai-stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
  }
  
  .stat-card {
    padding: var(--space-4);
  }
  
  .stat-number {
    font-size: var(--font-size-2xl);
  }
  
  .feature-content {
    min-height: 350px;
  }
}

@media (max-width: 480px) {
  .ai-stats-grid {
    grid-template-columns: 1fr;
  }
  
  .ai-header-icon {
    font-size: 2.5rem;
  }
  
  .stats-title,
  .tips-title {
    font-size: var(--font-size-xl);
  }
  
  .feature-content {
    min-height: 300px;
  }
  
  .ai-stats-section,
  .ai-tips-section {
    padding: var(--space-6);
  }
}

/* ===================================================================
   BRAIN SCIENCE SECTION STYLES - Far-Fetched Associations Explanation
   =================================================================== */

/* Main brain science section container - Horizontal & Minimalistic */
.brain-science-section {
  background: linear-gradient(135deg, 
    rgba(59, 130, 246, 0.03) 0%, 
    rgba(139, 92, 246, 0.03) 100%);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  margin: var(--space-8) 0;
  position: relative;
  overflow: hidden;
}

/* Subtle animated background */
.brain-science-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(59, 130, 246, 0.02), 
    transparent);
  animation: subtleShimmer 8s infinite ease-in-out;
  pointer-events: none;
}

/* Horizontal content layout */
.brain-content {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  max-width: 1000px;
  margin: 0 auto;
}

/* Brain visual container - compact */
.brain-visual {
  flex-shrink: 0;
}

.brain-container {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Compact brain icon */
.brain-icon {
  font-size: 3rem;
  animation: brainPulse 4s infinite ease-in-out;
  filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.2));
  z-index: 2;
  position: relative;
}

/* Neural connection lines - simplified */
.neural-connections {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.connection-line {
  position: absolute;
  width: 50px;
  height: 1px;
  background: linear-gradient(90deg, 
    rgba(59, 130, 246, 0.6), 
    transparent);
  border-radius: 1px;
  transform-origin: left center;
  animation: neuralPulse 3s infinite ease-in-out;
}

/* Position connection lines - simplified */
.connection-1 {
  top: 30%;
  left: 50%;
  transform: rotate(-30deg);
  animation-delay: 0s;
}

.connection-2 {
  top: 50%;
  left: 50%;
  transform: rotate(0deg);
  animation-delay: 1s;
}

.connection-3 {
  top: 70%;
  left: 50%;
  transform: rotate(30deg);
  animation-delay: 2s;
}

/* Memory nodes - compact */
.memory-nodes {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.memory-node {
  position: absolute;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: nodeFloat 6s infinite ease-in-out;
  box-shadow: var(--shadow-sm);
}

/* Position memory nodes - compact */
.node-1 {
  top: 15%;
  right: 15%;
  animation-delay: 0s;
}

.node-2 {
  top: 50%;
  right: 5%;
  animation-delay: 2s;
}

.node-3 {
  bottom: 15%;
  right: 25%;
  animation-delay: 4s;
}

/* Brain explanation content - horizontal layout */
.brain-explanation {
  flex: 1;
  text-align: left;
}

.brain-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brain-subtitle {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-6);
}

/* Horizontal stats layout */
.brain-stats {
  display: flex;
  gap: var(--space-6);
}

.brain-stat {
  text-align: center;
  padding: var(--space-3);
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: var(--radius-md);
  min-width: 80px;
  transition: all var(--transition-fast);
}

.brain-stat:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: rgba(59, 130, 246, 0.2);
}

.stat-number {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  display: block;
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

/* Animations for brain science section */
@keyframes subtleShimmer {
  0%, 100% { left: -100%; }
  50% { left: 100%; }
}

@keyframes brainPulse {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.3));
  }
  50% { 
    transform: scale(1.1);
    filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.6));
  }
}

@keyframes neuralPulse {
  0%, 100% { 
    opacity: 0.4;
    transform: scaleX(1);
  }
  50% { 
    opacity: 1;
    transform: scaleX(1.2);
  }
}

@keyframes nodeFloat {
  0%, 100% { 
    transform: translateY(0) rotate(0deg) scale(1);
  }
  25% { 
    transform: translateY(-5px) rotate(2deg) scale(1.05);
  }
  50% { 
    transform: translateY(-10px) rotate(0deg) scale(1.1);
  }
  75% { 
    transform: translateY(-5px) rotate(-2deg) scale(1.05);
  }
}



/* Responsive design for brain science section */
@media (max-width: 1024px) {
  .brain-content {
    gap: var(--space-6);
  }
  
  .brain-container {
    width: 100px;
    height: 100px;
  }
  
  .brain-icon {
    font-size: 2.5rem;
  }
  
  .connection-line {
    width: 40px;
  }
  
  .memory-node {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
  }
  
  .brain-title {
    font-size: var(--font-size-xl);
  }
  
  .brain-stats {
    gap: var(--space-4);
  }
  
  .brain-stat {
    min-width: 70px;
    padding: var(--space-2);
  }
}

@media (max-width: 768px) {
  .brain-science-section {
    padding: var(--space-6);
    margin: var(--space-6) 0;
  }
  
  .brain-content {
    flex-direction: column;
    text-align: center;
    gap: var(--space-6);
  }
  
  .brain-explanation {
    text-align: center;
  }
  
  .brain-container {
    width: 80px;
    height: 80px;
  }
  
  .brain-icon {
    font-size: 2rem;
  }
  
  .connection-line {
    width: 30px;
  }
  
  .memory-node {
    width: 24px;
    height: 24px;
    font-size: 0.8rem;
  }
  
  .brain-title {
    font-size: var(--font-size-lg);
  }
  
  .brain-subtitle {
    font-size: var(--font-size-sm);
  }
  
  .brain-stats {
    justify-content: center;
    gap: var(--space-3);
  }
  
  .brain-stat {
    min-width: 60px;
    padding: var(--space-2);
  }
  
  .stat-number {
    font-size: var(--font-size-lg);
  }
  
  .stat-label {
    font-size: 0.7rem;
  }
}
</style>

