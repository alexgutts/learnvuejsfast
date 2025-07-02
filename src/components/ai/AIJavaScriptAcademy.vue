<template>
  <!-- 
    AI JavaScript Academy - Comprehensive JavaScript Learning Platform
    
    This component implements research-backed learning methodologies:
    - Project-based learning: Build real applications
    - Problem-based learning: Solve authentic challenges  
    - Interactive coding: Hands-on practice with immediate feedback
    - Gamification: Progress tracking, achievements, and rewards
    - Scaffolded learning: Progressive difficulty with AI assistance
  -->
  <div class="js-academy">
    <!-- Header Section -->
    <div class="academy-header">
      <div class="header-content">
        <div class="header-icon">⚡</div>
        <div class="header-text">
          <h1 class="academy-title">JavaScript Academy</h1>
          <p class="academy-subtitle">
            Master JavaScript through AI-powered interactive projects and challenges
          </p>
        </div>
      </div>
      
      <!-- Progress Overview -->
      <div class="progress-overview">
        <div class="progress-stats">
          <div class="stat-item">
            <div class="stat-icon">🏆</div>
            <div class="stat-info">
              <span class="stat-value">{{ userStats.level }}</span>
              <span class="stat-label">Level</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">⭐</div>
            <div class="stat-info">
              <span class="stat-value">{{ userStats.points }}</span>
              <span class="stat-label">Points</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">🔥</div>
            <div class="stat-info">
              <span class="stat-value">{{ userStats.streak }}</span>
              <span class="stat-label">Streak</span>
            </div>
          </div>
        </div>
        
        <div class="overall-progress">
          <div class="progress-label">Overall Progress</div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: `${overallProgress}%` }"></div>
          </div>
          <div class="progress-text">{{ overallProgress }}%</div>
        </div>
      </div>
    </div>

    <!-- Learning Path Selection -->
    <div v-if="currentView === 'dashboard'" class="learning-dashboard">
      <h2 class="section-title">Choose Your Learning Path</h2>
      
      <div class="learning-paths">
        <div
          v-for="path in learningPaths"
          :key="path.id"
          :class="['path-card', { 'path-locked': !path.unlocked }]"
          @click="path.unlocked ? selectPath(path) : null"
        >
          <div class="path-icon">{{ path.icon }}</div>
          <h3 class="path-title">{{ path.title }}</h3>
          <p class="path-description">{{ path.description }}</p>
          <div class="path-progress">
            <div class="progress-bar small">
              <div class="progress-fill" :style="{ width: `${path.progress}%` }"></div>
            </div>
            <span class="progress-text">{{ path.progress }}%</span>
          </div>
          <div v-if="!path.unlocked" class="path-lock">🔒</div>
        </div>
      </div>

      <!-- Featured Challenge -->
      <div class="featured-section">
        <h2 class="section-title">🌟 Featured Challenge</h2>
        <div class="featured-challenge">
          <div class="challenge-content">
            <h3 class="challenge-title">{{ featuredChallenge.title }}</h3>
            <p class="challenge-description">{{ featuredChallenge.description }}</p>
            <div class="challenge-tags">
              <span v-for="tag in featuredChallenge.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
          <button @click="startFeaturedChallenge" class="challenge-btn">
            Start Challenge 🚀
          </button>
        </div>
      </div>
    </div>

    <!-- Interactive Learning Interface -->
    <div v-else-if="currentView === 'learning'" class="learning-interface">
      <!-- Challenge Header -->
      <div class="challenge-header">
        <button @click="backToDashboard" class="back-btn">
          ← Back to Dashboard
        </button>
        <div class="challenge-info">
          <h2 class="challenge-title">{{ currentChallenge.title }}</h2>
          <div class="challenge-meta">
            <span class="difficulty">{{ currentChallenge.difficulty }}</span>
            <span class="type">{{ currentChallenge.type }}</span>
            <span class="estimated-time">⏱️ {{ currentChallenge.estimatedTime }}</span>
          </div>
        </div>
        <div class="challenge-progress">
          <div class="progress-circle">
            <svg class="progress-ring" width="60" height="60">
              <circle
                class="progress-ring-circle"
                stroke="#e2e8f0"
                stroke-width="4"
                fill="transparent"
                r="26"
                cx="30"
                cy="30"
              />
              <circle
                class="progress-ring-circle progress-ring-fill"
                stroke="#3b82f6"
                stroke-width="4"
                fill="transparent"
                r="26"
                cx="30"
                cy="30"
                :stroke-dasharray="`${challengeProgress * 1.63} 163`"
              />
            </svg>
            <span class="progress-percentage">{{ Math.round(challengeProgress) }}%</span>
          </div>
        </div>
      </div>

      <!-- Main Learning Content -->
      <div class="learning-content">
        <!-- Instructions Panel -->
        <div class="instructions-panel">
          <div class="panel-header">
            <h3 class="panel-title">📋 Instructions</h3>
            <button @click="toggleAIHelp" class="ai-help-btn">
              🤖 AI Help
            </button>
          </div>
          
          <div class="instructions-content">
            <div v-html="currentChallenge.instructions"></div>
            
            <!-- Learning Objectives -->
            <div class="learning-objectives">
              <h4>🎯 What You'll Learn:</h4>
              <ul>
                <li v-for="objective in currentChallenge.objectives" :key="objective">
                  {{ objective }}
                </li>
              </ul>
            </div>

            <!-- Hints Section -->
            <div v-if="showHints" class="hints-section">
              <h4>💡 Hints:</h4>
              <div v-for="(hint, index) in availableHints" :key="index" class="hint-item">
                <button @click="revealHint(index)" class="hint-btn">
                  {{ hint.revealed ? '✅' : '🔒' }} Hint {{ index + 1 }}
                </button>
                <p v-if="hint.revealed" class="hint-text">{{ hint.text }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Code Editor Panel -->
        <div class="code-panel">
          <div class="panel-header">
            <h3 class="panel-title">💻 Code Editor</h3>
            <div class="editor-actions">
              <button @click="runCode" class="action-btn primary">
                ▶️ Run Code
              </button>
              <button @click="resetCode" class="action-btn secondary">
                🔄 Reset
              </button>
              <button @click="getAIFeedback" class="action-btn ai">
                🤖 Get AI Feedback
              </button>
            </div>
          </div>
          
          <div class="code-editor">
            <textarea
              v-model="userCode"
              @input="handleCodeChange"
              class="code-textarea"
              placeholder="// Write your JavaScript code here..."
              spellcheck="false"
            ></textarea>
          </div>

          <!-- Code Output -->
          <div class="code-output">
            <div class="output-header">
              <h4>📤 Output</h4>
              <button @click="clearOutput" class="clear-btn">Clear</button>
            </div>
            <div class="output-content">
              <div v-if="codeOutput.length === 0" class="output-placeholder">
                Run your code to see the output here...
              </div>
              <div v-else>
                <div
                  v-for="(output, index) in codeOutput"
                  :key="index"
                  :class="['output-line', output.type]"
                >
                  {{ output.message }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Assistant Panel -->
        <div v-if="showAIPanel" class="ai-panel">
          <div class="panel-header">
            <h3 class="panel-title">🤖 AI Assistant</h3>
            <button @click="closeAIPanel" class="close-btn">×</button>
          </div>
          
          <div class="ai-chat">
            <div class="ai-messages">
              <div
                v-for="message in aiMessages"
                :key="message.id"
                :class="['ai-message', message.type]"
              >
                <div class="message-content" v-html="message.content"></div>
                <div class="message-time">{{ formatTime(message.timestamp) }}</div>
              </div>
            </div>
            
            <div class="ai-input">
              <input
                v-model="aiQuestion"
                @keydown.enter="askAI"
                placeholder="Ask the AI for help..."
                class="ai-input-field"
              />
              <button @click="askAI" class="ask-btn">Send</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Challenge Completion -->
      <div v-if="challengeCompleted" class="completion-overlay">
        <div class="completion-modal">
          <div class="completion-header">
            <div class="completion-icon">🎉</div>
            <h2 class="completion-title">Challenge Completed!</h2>
          </div>
          
          <div class="completion-stats">
            <div class="stat">
              <span class="stat-label">Points Earned:</span>
              <span class="stat-value">+{{ earnedPoints }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Time Taken:</span>
              <span class="stat-value">{{ formatDuration(completionTime) }}</span>
            </div>
            <div class="stat">
              <span class="stat-label">Code Quality:</span>
              <span class="stat-value">{{ codeQualityScore }}/100</span>
            </div>
          </div>

          <div class="completion-actions">
            <button @click="nextChallenge" class="action-btn primary">
              Next Challenge 🚀
            </button>
            <button @click="reviewSolution" class="action-btn secondary">
              Review Solution 📖
            </button>
            <button @click="backToDashboard" class="action-btn tertiary">
              Back to Dashboard 🏠
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * AI JavaScript Academy Component
 * 
 * This component implements research-backed programming education methodologies:
 * 
 * 1. PROJECT-BASED LEARNING: Students build real applications
 * 2. PROBLEM-BASED LEARNING: Learning through solving authentic challenges  
 * 3. INTERACTIVE PRACTICE: Hands-on coding with immediate feedback
 * 4. GAMIFICATION: Progress tracking, points, levels, and achievements
 * 5. SCAFFOLDED LEARNING: Progressive difficulty with AI assistance
 * 6. PEER LEARNING: Code sharing and collaborative problem solving
 */

import { ref, computed, onMounted, watch } from 'vue'
import { useNotifications } from '../../composables/useNotifications.js'

// Component state management
const currentView = ref('dashboard') // 'dashboard' | 'learning'
const currentChallenge = ref(null)
const userCode = ref('')
const codeOutput = ref([])
const showAIPanel = ref(false)
const showHints = ref(false)
const challengeCompleted = ref(false)
const aiMessages = ref([])
const aiQuestion = ref('')

// User progress and statistics
const userStats = ref({
  level: 1,
  points: 0,
  streak: 0,
  challengesCompleted: 0,
  totalCodeLines: 0,
  averageScore: 0
})

// Challenge progress tracking
const challengeProgress = ref(0)
const startTime = ref(null)
const completionTime = ref(0)
const earnedPoints = ref(0)
const codeQualityScore = ref(0)

// Composables
const { showInteractiveFeedback } = useNotifications()

// Learning paths based on research-backed curriculum design
const learningPaths = ref([
  {
    id: 'fundamentals',
    title: 'JavaScript Fundamentals',
    description: 'Master the core concepts: variables, functions, and control flow',
    icon: '🧱',
    unlocked: true,
    progress: 75,
    challenges: ['variables', 'functions', 'loops', 'arrays', 'objects']
  },
  {
    id: 'dom-manipulation',
    title: 'DOM & Web APIs',
    description: 'Learn to interact with web pages and create dynamic content',
    icon: '🌐',
    unlocked: true,
    progress: 45,
    challenges: ['dom-basics', 'events', 'forms', 'fetch-api', 'local-storage']
  },
  {
    id: 'async-programming',
    title: 'Async Programming',
    description: 'Master promises, async/await, and asynchronous patterns',
    icon: '⚡',
    unlocked: false,
    progress: 0,
    challenges: ['callbacks', 'promises', 'async-await', 'fetch', 'error-handling']
  },
  {
    id: 'advanced-concepts',
    title: 'Advanced JavaScript',
    description: 'Explore closures, prototypes, and advanced programming patterns',
    icon: '🚀',
    unlocked: false,
    progress: 0,
    challenges: ['closures', 'prototypes', 'modules', 'classes', 'design-patterns']
  },
  {
    id: 'projects',
    title: 'Real-World Projects',
    description: 'Build complete applications using everything you\'ve learned',
    icon: '🏗️',
    unlocked: false,
    progress: 0,
    challenges: ['todo-app', 'weather-app', 'quiz-game', 'calculator', 'portfolio']
  }
])

// Featured challenge that changes based on user progress
const featuredChallenge = ref({
  title: 'Build a Smart Calculator',
  description: 'Create an interactive calculator with memory functions and advanced operations',
  tags: ['Functions', 'DOM', 'Events', 'Math'],
  difficulty: 'Intermediate',
  estimatedTime: '45 minutes'
})

// Available hints for current challenge (progressive disclosure)
const availableHints = ref([
  { text: 'Start by creating the basic HTML structure for your calculator', revealed: false },
  { text: 'Use event listeners to handle button clicks', revealed: false },
  { text: 'Consider using the eval() function carefully or implement your own parser', revealed: false }
])

// Computed properties
const overallProgress = computed(() => {
  const totalPaths = learningPaths.value.length
  const totalProgress = learningPaths.value.reduce((sum, path) => sum + path.progress, 0)
  return Math.round(totalProgress / totalPaths)
})

// Challenge data - implementing project-based learning methodology
const challenges = ref({
  'variables': {
    id: 'variables',
    title: 'Variable Playground',
    type: 'Interactive Exercise',
    difficulty: 'Beginner',
    estimatedTime: '15 minutes',
    instructions: `
      <h3>🎯 Master JavaScript Variables</h3>
      <p>Variables are like labeled boxes that store information in your program. Let's practice creating and using them!</p>
      
      <h4>Your Mission:</h4>
      <ol>
        <li>Create a variable called <code>playerName</code> and assign it your name</li>
        <li>Create a variable called <code>score</code> and set it to 100</li>
        <li>Create a variable called <code>isWinner</code> and set it to true</li>
        <li>Use <code>console.log()</code> to display all three variables</li>
      </ol>
      
      <div class="info-box">
        <strong>💡 Remember:</strong> Use <code>let</code> or <code>const</code> to declare variables in modern JavaScript!
      </div>
    `,
    objectives: [
      'Understand different variable declaration keywords (let, const, var)',
      'Practice assigning values to variables',
      'Learn about different data types (string, number, boolean)',
      'Use console.log() to output variable values'
    ],
    starterCode: `// Welcome to the Variable Playground!
// Let's create some variables to store information

// TODO: Create your variables here


// TODO: Display your variables using console.log()

`,
    solution: `// Variable Playground Solution
let playerName = "Alex";
let score = 100;
let isWinner = true;

console.log("Player Name:", playerName);
console.log("Score:", score);
console.log("Is Winner:", isWinner);`
  },
  
  'functions': {
    id: 'functions',
    title: 'Function Factory',
    type: 'Coding Challenge',
    difficulty: 'Beginner',
    estimatedTime: '20 minutes',
    instructions: `
      <h3>🏭 Welcome to the Function Factory!</h3>
      <p>Functions are reusable blocks of code that perform specific tasks. Think of them as mini-programs within your program!</p>
      
      <h4>Your Challenge:</h4>
      <ol>
        <li>Create a function called <code>greetUser</code> that takes a name parameter and returns a greeting</li>
        <li>Create a function called <code>calculateArea</code> that takes width and height parameters and returns the area</li>
        <li>Create a function called <code>isEven</code> that takes a number and returns true if it's even, false if odd</li>
        <li>Test all your functions with different inputs</li>
      </ol>
    `,
    objectives: [
      'Understand function syntax and structure',
      'Learn about parameters and return values',
      'Practice writing reusable code',
      'Understand function scope and local variables'
    ],
    starterCode: `// Function Factory Challenge
// Create reusable functions to solve common problems

// TODO: Create a greetUser function


// TODO: Create a calculateArea function


// TODO: Create an isEven function


// TODO: Test your functions here

`,
    solution: `// Function Factory Solution
function greetUser(name) {
  return "Hello, " + name + "! Welcome to JavaScript!";
}

function calculateArea(width, height) {
  return width * height;
}

function isEven(number) {
  return number % 2 === 0;
}

// Testing the functions
console.log(greetUser("Alice"));
console.log("Area:", calculateArea(5, 3));
console.log("Is 4 even?", isEven(4));
console.log("Is 7 even?", isEven(7));`
  }
})

// Methods implementing research-backed learning strategies

/**
 * Select a learning path and show available challenges
 * Implements scaffolded learning by showing progressive difficulty
 */
const selectPath = (path) => {
  showInteractiveFeedback(
    'Learning Path Selected',
    `Starting ${path.title} journey! 🚀`
  )
  
  // For demo, start with first challenge in the path
  if (path.challenges && path.challenges.length > 0) {
    const firstChallenge = challenges.value[path.challenges[0]]
    if (firstChallenge) {
      startChallenge(firstChallenge)
    }
  }
}

/**
 * Start a specific challenge
 * Implements problem-based learning methodology
 */
const startChallenge = (challenge) => {
  currentChallenge.value = challenge
  currentView.value = 'learning'
  userCode.value = challenge.starterCode || ''
  challengeProgress.value = 0
  challengeCompleted.value = false
  startTime.value = Date.now()
  codeOutput.value = []
  
  // Reset AI assistance
  aiMessages.value = [{
    id: 1,
    type: 'assistant',
    content: `Welcome to the <strong>${challenge.title}</strong> challenge! I'm here to help you learn. Feel free to ask me questions as you work through the problem.`,
    timestamp: Date.now()
  }]
  
  showInteractiveFeedback(
    'Challenge Started',
    `Good luck with ${challenge.title}! 💪`
  )
}

/**
 * Start the featured challenge
 */
const startFeaturedChallenge = () => {
  // For demo, start with the calculator challenge
  const calculatorChallenge = {
    id: 'calculator',
    title: 'Smart Calculator',
    type: 'Project',
    difficulty: 'Intermediate',
    estimatedTime: '45 minutes',
    instructions: `
      <h3>🧮 Build a Smart Calculator</h3>
      <p>Create an interactive calculator that can perform basic arithmetic operations and has memory functions.</p>
      
      <h4>Requirements:</h4>
      <ul>
        <li>Basic operations: +, -, *, /</li>
        <li>Clear and reset functionality</li>
        <li>Memory store and recall</li>
        <li>Error handling for invalid operations</li>
        <li>Responsive button interface</li>
      </ul>
    `,
    objectives: [
      'Practice DOM manipulation and event handling',
      'Implement error handling and edge cases',
      'Create a user-friendly interface',
      'Apply mathematical operations in code'
    ],
    starterCode: `// Smart Calculator Project
// Create a functional calculator with memory features

class Calculator {
  constructor() {
    this.currentValue = 0;
    this.memory = 0;
    this.operator = null;
    this.waitingForNewValue = false;
  }
  
  // TODO: Implement calculator methods
  
}

// TODO: Create calculator instance and set up event listeners

`
  }
  
  startChallenge(calculatorChallenge)
}

/**
 * Execute user code with error handling
 * Provides immediate feedback as per research on effective learning
 */
const runCode = () => {
  codeOutput.value = []
  
  try {
    // Create a safe execution environment
    const originalLog = console.log
    const logs = []
    
    // Capture console.log output
    console.log = (...args) => {
      logs.push({
        type: 'log',
        message: args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')
      })
    }
    
    // Execute the user's code
    eval(userCode.value)
    
    // Restore original console.log
    console.log = originalLog
    
    // Display captured output
    codeOutput.value = logs
    
    if (logs.length === 0) {
      codeOutput.value.push({
        type: 'info',
        message: 'Code executed successfully! (No output to display)'
      })
    }
    
    // Update progress based on code execution
    updateChallengeProgress()
    
  } catch (error) {
    codeOutput.value.push({
      type: 'error',
      message: `Error: ${error.message}`
    })
    
    // Provide helpful error guidance
    provideErrorGuidance(error)
  }
}

/**
 * Update challenge progress based on code quality and completion
 * Implements continuous assessment methodology
 */
const updateChallengeProgress = () => {
  if (!currentChallenge.value) return
  
  let progress = 0
  
  // Check if code contains required elements
  const codeLines = userCode.value.split('\n').filter(line => line.trim())
  progress += Math.min(codeLines.length * 5, 30) // Up to 30% for code length
  
  // Check for specific requirements based on challenge
  if (currentChallenge.value.id === 'variables') {
    if (userCode.value.includes('let ') || userCode.value.includes('const ')) progress += 20
    if (userCode.value.includes('playerName')) progress += 15
    if (userCode.value.includes('score')) progress += 15
    if (userCode.value.includes('console.log')) progress += 20
  }
  
  challengeProgress.value = Math.min(progress, 100)
  
  // Check for completion
  if (challengeProgress.value >= 90 && !challengeCompleted.value) {
    completeChallenge()
  }
}

/**
 * Handle challenge completion with rewards and feedback
 * Implements gamification and positive reinforcement
 */
const completeChallenge = () => {
  challengeCompleted.value = true
  completionTime.value = Date.now() - startTime.value
  
  // Calculate earned points based on performance
  const basePoints = 100
  const timeBonus = Math.max(0, 50 - Math.floor(completionTime.value / 60000)) // Bonus for speed
  const qualityBonus = Math.floor(challengeProgress.value / 2) // Bonus for code quality
  
  earnedPoints.value = basePoints + timeBonus + qualityBonus
  codeQualityScore.value = Math.min(challengeProgress.value + 10, 100)
  
  // Update user stats
  userStats.value.points += earnedPoints.value
  userStats.value.challengesCompleted += 1
  userStats.value.streak += 1
  
  // Level up check
  const newLevel = Math.floor(userStats.value.points / 500) + 1
  if (newLevel > userStats.value.level) {
    userStats.value.level = newLevel
    showInteractiveFeedback(
      'Level Up!',
      `Congratulations! You reached level ${newLevel}! 🎉`
    )
  }
  
  showInteractiveFeedback(
    'Challenge Completed!',
    `Great job! You earned ${earnedPoints.value} points! ⭐`
  )
}

/**
 * Provide AI-powered error guidance
 * Implements intelligent tutoring system principles
 */
const provideErrorGuidance = (error) => {
  let guidance = ''
  
  if (error.message.includes('undefined')) {
    guidance = '💡 It looks like you\'re trying to use a variable that hasn\'t been declared. Make sure to declare your variables with `let` or `const` before using them.'
  } else if (error.message.includes('syntax')) {
    guidance = '💡 There\'s a syntax error in your code. Check for missing semicolons, brackets, or quotes.'
  } else if (error.message.includes('function')) {
    guidance = '💡 There might be an issue with your function definition or function call. Check the syntax and parameters.'
  } else {
    guidance = '💡 Don\'t worry about errors - they\'re part of learning! Try reading the error message carefully and check your code line by line.'
  }
  
  codeOutput.value.push({
    type: 'info',
    message: guidance
  })
}

/**
 * Get AI feedback on current code
 * Implements AI-assisted learning methodology
 */
const getAIFeedback = () => {
  if (!userCode.value.trim()) {
    showInteractiveFeedback(
      'No Code to Review',
      'Write some code first, then I can give you feedback! 💻'
    )
    return
  }
  
  showAIPanel.value = true
  
  // Simulate AI analysis (in a real app, this would call an AI service)
  setTimeout(() => {
    const feedback = generateCodeFeedback(userCode.value)
    aiMessages.value.push({
      id: aiMessages.value.length + 1,
      type: 'assistant',
      content: feedback,
      timestamp: Date.now()
    })
  }, 1000)
}

/**
 * Generate contextual code feedback
 * Simulates AI analysis for educational purposes
 */
const generateCodeFeedback = (code) => {
  const suggestions = []
  
  // Check for best practices
  if (!code.includes('let ') && !code.includes('const ') && code.includes('var ')) {
    suggestions.push('Consider using `let` or `const` instead of `var` for better variable scoping.')
  }
  
  if (!code.includes('console.log') && currentChallenge.value?.id === 'variables') {
    suggestions.push('Don\'t forget to use `console.log()` to display your variables!')
  }
  
  if (code.split('\n').length < 3) {
    suggestions.push('Try breaking your code into multiple lines for better readability.')
  }
  
  // Positive reinforcement
  const positives = []
  if (code.includes('let ') || code.includes('const ')) {
    positives.push('Great job using modern variable declarations!')
  }
  
  if (code.includes('function')) {
    positives.push('Excellent work creating functions!')
  }
  
  let feedback = '<div class="ai-feedback">'
  
  if (positives.length > 0) {
    feedback += '<h4>✅ What you\'re doing well:</h4><ul>'
    positives.forEach(positive => {
      feedback += `<li>${positive}</li>`
    })
    feedback += '</ul>'
  }
  
  if (suggestions.length > 0) {
    feedback += '<h4>💡 Suggestions for improvement:</h4><ul>'
    suggestions.forEach(suggestion => {
      feedback += `<li>${suggestion}</li>`
    })
    feedback += '</ul>'
  }
  
  if (suggestions.length === 0 && positives.length === 0) {
    feedback += '<p>Your code looks good! Keep up the great work! 🎉</p>'
  }
  
  feedback += '</div>'
  
  return feedback
}

/**
 * Handle AI chat interactions
 * Implements conversational learning support
 */
const askAI = () => {
  if (!aiQuestion.value.trim()) return
  
  // Add user question
  aiMessages.value.push({
    id: aiMessages.value.length + 1,
    type: 'user',
    content: aiQuestion.value,
    timestamp: Date.now()
  })
  
  const question = aiQuestion.value
  aiQuestion.value = ''
  
  // Simulate AI response (in a real app, this would call an AI service)
  setTimeout(() => {
    const response = generateAIResponse(question)
    aiMessages.value.push({
      id: aiMessages.value.length + 1,
      type: 'assistant',
      content: response,
      timestamp: Date.now()
    })
  }, 1000)
}

/**
 * Generate contextual AI responses
 * Provides educational support based on current challenge
 */
const generateAIResponse = (question) => {
  const lowerQuestion = question.toLowerCase()
  
  if (lowerQuestion.includes('variable')) {
    return 'Variables in JavaScript are containers for storing data. Use `let` for values that can change, and `const` for values that stay the same. For example: `let name = "Alice";` creates a variable called name with the value "Alice".'
  }
  
  if (lowerQuestion.includes('function')) {
    return 'Functions are reusable blocks of code! You can create one like this: `function greet(name) { return "Hello " + name; }`. Then call it with `greet("Alice")` to get "Hello Alice".'
  }
  
  if (lowerQuestion.includes('error') || lowerQuestion.includes('help')) {
    return 'I\'m here to help! Can you tell me what specific error you\'re seeing, or what part of the challenge you\'re stuck on? I can provide step-by-step guidance.'
  }
  
  if (lowerQuestion.includes('console.log')) {
    return '`console.log()` is used to display information in the console. It\'s great for debugging and showing output. Try `console.log("Hello World!");` to see it in action!'
  }
  
  return 'That\'s a great question! For this challenge, focus on the requirements in the instructions. If you\'re stuck on a specific part, try breaking it down into smaller steps. Remember, making mistakes is part of learning!'
}

// Utility methods

/**
 * Reveal progressive hints to support scaffolded learning
 */
const revealHint = (index) => {
  if (index < availableHints.value.length) {
    availableHints.value[index].revealed = true
    showInteractiveFeedback(
      'Hint Revealed',
      'Check out the new hint to help you progress! 💡'
    )
  }
}

const toggleAIHelp = () => {
  showAIPanel.value = !showAIPanel.value
}

const closeAIPanel = () => {
  showAIPanel.value = false
}

const resetCode = () => {
  if (currentChallenge.value) {
    userCode.value = currentChallenge.value.starterCode || ''
    codeOutput.value = []
    challengeProgress.value = 0
  }
}

const clearOutput = () => {
  codeOutput.value = []
}

const handleCodeChange = () => {
  // Update progress as user types (encourages engagement)
  updateChallengeProgress()
}

const backToDashboard = () => {
  currentView.value = 'dashboard'
  currentChallenge.value = null
}

const nextChallenge = () => {
  // In a real app, this would load the next challenge in the sequence
  showInteractiveFeedback(
    'Next Challenge',
    'Loading next challenge... 🚀'
  )
  backToDashboard()
}

const reviewSolution = () => {
  if (currentChallenge.value?.solution) {
    userCode.value = currentChallenge.value.solution
    showInteractiveFeedback(
      'Solution Loaded',
      'Study this solution to learn best practices! 📖'
    )
  }
}

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString()
}

const formatDuration = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000)
  const seconds = Math.floor((milliseconds % 60000) / 1000)
  return `${minutes}m ${seconds}s`
}

// Initialize component
onMounted(() => {
  // Load user progress from localStorage (persistent learning)
  const savedStats = localStorage.getItem('js-academy-stats')
  if (savedStats) {
    userStats.value = { ...userStats.value, ...JSON.parse(savedStats) }
  }
  
  showInteractiveFeedback(
    'JavaScript Academy Loaded',
    'Ready to level up your JavaScript skills! 🚀'
  )
})

// Save progress when stats change
watch(userStats, (newStats) => {
  localStorage.setItem('js-academy-stats', JSON.stringify(newStats))
}, { deep: true })
</script>

<style scoped>
/**
 * AI JavaScript Academy Styles
 * 
 * Professional, modern UI design following best UX practices:
 * - Consistent color scheme and typography
 * - Responsive layout with proper spacing
 * - Interactive elements with hover states
 * - Clear visual hierarchy and accessibility
 * - Smooth animations and transitions
 */

/* Main Container */
.js-academy {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #1a202c;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Header Section */
.academy-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 0 0 24px 24px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.header-icon {
  font-size: 4rem;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.academy-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #1e40af, #7c3aed);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.academy-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0.5rem 0 0 0;
}

/* Progress Overview */
.progress-overview {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 2rem;
  align-items: center;
}

.progress-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  border: 2px solid rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;
  display: block;
}

.stat-label {
  font-size: 0.875rem;
  color: #64748b;
  display: block;
}

.overall-progress {
  text-align: right;
}

.progress-label {
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.5rem;
}

.progress-bar {
  width: 200px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.25rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  border-radius: 4px;
  transition: width 0.5s ease;
}

.progress-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #059669;
}

/* Learning Dashboard */
.learning-dashboard {
  padding: 0 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
}

.learning-paths {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.path-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.path-card:hover:not(.path-locked) {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
}

.path-locked {
  opacity: 0.6;
  cursor: not-allowed;
}

.path-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.path-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.path-description {
  color: #64748b;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.path-progress {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.progress-bar.small {
  flex: 1;
  height: 6px;
}

.path-lock {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  opacity: 0.5;
}

/* Featured Challenge */
.featured-section {
  margin-top: 3rem;
}

.featured-challenge {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  border: 2px solid #fbbf24;
  box-shadow: 0 8px 32px rgba(251, 191, 36, 0.2);
}

.challenge-content {
  flex: 1;
}

.challenge-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.challenge-description {
  color: #64748b;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.challenge-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.tag {
  background: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.challenge-btn {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.challenge-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(251, 191, 36, 0.4);
}

/* Learning Interface */
.learning-interface {
  min-height: 100vh;
  background: #f8fafc;
  color: #1a202c;
}

.challenge-header {
  background: white;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-btn {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.back-btn:hover {
  background: #4b5563;
  transform: translateY(-1px);
}

.challenge-info {
  flex: 1;
}

.challenge-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 0.5rem;
}

.challenge-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
}

.difficulty {
  background: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
}

.type {
  background: #d1fae5;
  color: #065f46;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
}

.estimated-time {
  color: #64748b;
  font-weight: 500;
}

/* Progress Circle */
.progress-circle {
  position: relative;
  width: 60px;
  height: 60px;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring-fill {
  transition: stroke-dasharray 0.5s ease;
}

.progress-percentage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: #3b82f6;
}

/* Learning Content */
.learning-content {
  display: grid;
  grid-template-columns: 1fr 2fr 300px;
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
}

/* Panel Styles */
.instructions-panel,
.code-panel,
.ai-panel {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.panel-header {
  background: #f8fafc;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e40af;
  margin: 0;
}

/* Instructions Panel */
.instructions-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.instructions-content h3 {
  color: #1e40af;
  margin-bottom: 1rem;
}

.instructions-content h4 {
  color: #374151;
  margin: 1.5rem 0 0.75rem 0;
}

.instructions-content ol,
.instructions-content ul {
  padding-left: 1.5rem;
  line-height: 1.6;
}

.instructions-content li {
  margin-bottom: 0.5rem;
}

.instructions-content code {
  background: #f1f5f9;
  color: #1e40af;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Consolas', monospace;
}

.info-box {
  background: #dbeafe;
  border: 1px solid #93c5fd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
}

.learning-objectives ul {
  list-style: none;
  padding-left: 0;
}

.learning-objectives li {
  padding-left: 1.5rem;
  position: relative;
}

.learning-objectives li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

/* Hints Section */
.hints-section {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.hint-item {
  margin-bottom: 1rem;
}

.hint-btn {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
  width: 100%;
  text-align: left;
}

.hint-btn:hover {
  background: #e5e7eb;
}

.hint-text {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: #f0fdf4;
  border-radius: 6px;
  color: #166534;
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Code Panel */
.code-panel {
  display: flex;
  flex-direction: column;
}

.editor-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: #3b82f6;
  color: white;
}

.action-btn.primary:hover {
  background: #2563eb;
}

.action-btn.secondary {
  background: #6b7280;
  color: white;
}

.action-btn.secondary:hover {
  background: #4b5563;
}

.action-btn.ai {
  background: #7c3aed;
  color: white;
}

.action-btn.ai:hover {
  background: #6d28d9;
}

.code-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.code-textarea {
  flex: 1;
  border: none;
  padding: 1.5rem;
  font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
  resize: none;
  outline: none;
  background: #1e293b;
  color: #e2e8f0;
  min-height: 300px;
}

.code-output {
  border-top: 1px solid #e2e8f0;
  max-height: 200px;
  display: flex;
  flex-direction: column;
}

.output-header {
  background: #f8fafc;
  padding: 0.75rem 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.output-header h4 {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.clear-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.output-content {
  padding: 1rem 1.5rem;
  overflow-y: auto;
  flex: 1;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 0.875rem;
}

.output-placeholder {
  color: #9ca3af;
  font-style: italic;
}

.output-line {
  margin-bottom: 0.5rem;
  padding: 0.25rem 0;
}

.output-line.log {
  color: #374151;
}

.output-line.error {
  color: #dc2626;
  background: #fef2f2;
  padding: 0.5rem;
  border-radius: 4px;
  border-left: 4px solid #dc2626;
}

.output-line.info {
  color: #1d4ed8;
  background: #eff6ff;
  padding: 0.5rem;
  border-radius: 4px;
  border-left: 4px solid #3b82f6;
}

/* AI Panel */
.ai-panel {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  z-index: 1000;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.ai-chat {
  display: flex;
  flex-direction: column;
  height: 400px;
}

.ai-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.ai-message {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  max-width: 85%;
}

.ai-message.user {
  background: #3b82f6;
  color: white;
  margin-left: auto;
  border-bottom-right-radius: 4px;
}

.ai-message.assistant {
  background: #f1f5f9;
  color: #374151;
  border-bottom-left-radius: 4px;
}

.message-content {
  line-height: 1.5;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-top: 0.5rem;
}

.ai-input {
  padding: 1rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 0.75rem;
}

.ai-input-field {
  flex: 1;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 0.75rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.ai-input-field:focus {
  border-color: #3b82f6;
}

.ask-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.ask-btn:hover {
  background: #2563eb;
}

/* Completion Modal */
.completion-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.completion-modal {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 500px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.completion-header {
  margin-bottom: 2rem;
}

.completion-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.completion-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e40af;
  margin: 0;
}

.completion-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat {
  padding: 1rem;
  background: #f8fafc;
  border-radius: 8px;
}

.stat-label {
  display: block;
  font-size: 0.875rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e40af;
}

.completion-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.action-btn.tertiary {
  background: #f3f4f6;
  color: #374151;
}

.action-btn.tertiary:hover {
  background: #e5e7eb;
}

/* Utility Classes */
.ai-help-btn {
  background: #7c3aed;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.ai-help-btn:hover {
  background: #6d28d9;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .learning-content {
    grid-template-columns: 1fr 2fr;
  }
  
  .ai-panel {
    position: relative;
    transform: none;
    top: auto;
    left: auto;
    width: 100%;
    max-width: none;
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .academy-header {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .progress-overview {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .progress-stats {
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .learning-content {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
  
  .challenge-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .featured-challenge {
    flex-direction: column;
    text-align: center;
  }
  
  .completion-actions {
    flex-direction: column;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.path-card,
.featured-challenge,
.completion-modal {
  animation: fadeIn 0.5s ease-out;
}

/* AI Feedback Styling */
.ai-feedback h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
}

.ai-feedback ul {
  margin: 0 0 1rem 0;
  padding-left: 1.5rem;
}

.ai-feedback li {
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.4;
}
</style> 