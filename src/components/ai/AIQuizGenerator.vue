<!--
  AI Quiz Generator Component - Personalized Vue.js Learning Quizzes
  
  This component provides an interactive quiz interface powered by AI that:
  - Generates personalized quiz questions based on user progress
  - Adapts difficulty based on performance
  - Provides detailed explanations for answers
  - Tracks learning progress and identifies knowledge gaps
  - Uses the memory palace mnemonics for memorable explanations
  - Integrates with the app's progress tracking system
-->

<template>
  <div class="ai-quiz-generator">
    <!-- Quiz Header -->
    <div class="quiz-header">
      <div class="quiz-title-section">
        <div class="quiz-icon">🧠</div>
        <div class="quiz-title-content">
          <h3 class="quiz-title">AI-Powered Vue Quiz</h3>
          <p class="quiz-subtitle">
            Personalized questions that adapt to your learning progress
          </p>
        </div>
      </div>
      
      <!-- Quiz Stats -->
      <div class="quiz-stats" v-if="quizStats.totalQuizzes > 0">
        <div class="stat-item">
          <span class="stat-number">{{ quizStats.totalQuizzes }}</span>
          <span class="stat-label">Quizzes</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ Math.round(quizStats.averageScore) }}%</span>
          <span class="stat-label">Avg Score</span>
        </div>
      </div>
    </div>

    <!-- Quiz Configuration (when not in quiz mode) -->
    <div v-if="!isQuizActive && !isLoading" class="quiz-config">
      <div class="config-section">
        <h4 class="config-title">📚 Choose Your Quiz Topic</h4>
        <div class="topic-grid">
          <button
            v-for="topic in availableTopics"
            :key="topic.id"
            @click="selectedTopic = topic.id"
            :class="['topic-btn', { active: selectedTopic === topic.id }]"
          >
            <span class="topic-icon">{{ topic.icon }}</span>
            <span class="topic-name">{{ topic.name }}</span>
          </button>
        </div>
      </div>

      <div class="config-section">
        <h4 class="config-title">🎯 Difficulty Level</h4>
        <div class="difficulty-slider">
          <input
            type="range"
            min="1"
            max="5"
            v-model="selectedDifficulty"
            class="slider"
          />
          <div class="difficulty-labels">
            <span class="difficulty-label">Beginner</span>
            <span class="difficulty-label">Expert</span>
          </div>
          <div class="difficulty-indicator">
            Level {{ selectedDifficulty }}: {{ getDifficultyLabel(selectedDifficulty) }}
          </div>
        </div>
      </div>

      <div class="config-section">
        <h4 class="config-title">🔢 Number of Questions</h4>
        <div class="question-count-options">
          <button
            v-for="count in [3, 5, 10]"
            :key="count"
            @click="selectedQuestionCount = count"
            :class="['count-btn', { active: selectedQuestionCount === count }]"
          >
            {{ count }} Questions
          </button>
        </div>
      </div>

      <!-- Start Quiz Button -->
      <button 
        @click="generateQuiz"
        :disabled="!selectedTopic"
        class="start-quiz-btn"
      >
        <span class="btn-icon">🚀</span>
        Generate AI Quiz
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div class="loading-animation">
        <div class="ai-brain">🤖</div>
        <div class="loading-text">
          <h4>AI is crafting your personalized quiz...</h4>
          <p>{{ loadingMessages[currentLoadingMessage] }}</p>
        </div>
      </div>
    </div>

    <!-- Active Quiz -->
    <div v-if="isQuizActive && !isLoading" class="active-quiz">
      <!-- Quiz Progress -->
      <div class="quiz-progress">
        <div class="progress-bar">
          <div 
            class="progress-fill"
            :style="{ width: `${(currentQuestionIndex / currentQuiz.questions.length) * 100}%` }"
          ></div>
        </div>
        <div class="progress-text">
          Question {{ currentQuestionIndex + 1 }} of {{ currentQuiz.questions.length }}
        </div>
      </div>

      <!-- Current Question -->
      <div class="question-card" v-if="currentQuestion">
        <div class="question-header">
          <div class="question-type">{{ currentQuestion.type }}</div>
          <div class="question-difficulty">
            {{ getDifficultyLabel(currentQuestion.difficulty) }}
          </div>
        </div>
        
        <h4 class="question-text">{{ currentQuestion.question }}</h4>
        
        <!-- Code Block (if present) -->
        <div v-if="currentQuestion.code" class="question-code">
          <pre><code>{{ currentQuestion.code }}</code></pre>
        </div>

        <!-- Answer Options -->
        <div class="answer-options">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="selectAnswer(index)"
            :class="['answer-btn', { 
              selected: selectedAnswer === index,
              correct: showResults && index === currentQuestion.correctAnswer,
              incorrect: showResults && selectedAnswer === index && index !== currentQuestion.correctAnswer
            }]"
            :disabled="showResults"
          >
            <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
            <span class="option-text">{{ option }}</span>
          </button>
        </div>

        <!-- Answer Explanation (shown after selection) -->
        <div v-if="showResults" class="answer-explanation">
          <div class="explanation-header">
            <div class="explanation-icon">
              {{ selectedAnswer === currentQuestion.correctAnswer ? '✅' : '❌' }}
            </div>
            <h5 class="explanation-title">
              {{ selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Not quite!' }}
            </h5>
          </div>
          <p class="explanation-text">{{ currentQuestion.explanation }}</p>
          
          <!-- Memory Palace Mnemonic (if available) -->
          <div v-if="currentQuestion.mnemonic" class="mnemonic-section">
            <div class="mnemonic-header">
              <span class="mnemonic-icon">🏰</span>
              <span class="mnemonic-title">Memory Palace Tip</span>
            </div>
            <p class="mnemonic-text">{{ currentQuestion.mnemonic }}</p>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <div class="question-navigation">
          <button
            v-if="!showResults"
            @click="submitAnswer"
            :disabled="selectedAnswer === null"
            class="submit-btn"
          >
            Submit Answer
          </button>
          
          <button
            v-if="showResults && currentQuestionIndex < currentQuiz.questions.length - 1"
            @click="nextQuestion"
            class="next-btn"
          >
            Next Question
          </button>
          
          <button
            v-if="showResults && currentQuestionIndex === currentQuiz.questions.length - 1"
            @click="finishQuiz"
            class="finish-btn"
          >
            Finish Quiz
          </button>
        </div>
      </div>
    </div>

    <!-- Quiz Results -->
    <div v-if="quizCompleted" class="quiz-results">
      <div class="results-header">
        <div class="results-icon">🎉</div>
        <h3 class="results-title">Quiz Complete!</h3>
      </div>
      
      <div class="results-stats">
        <div class="result-stat">
          <div class="stat-number">{{ quizResults.score }}%</div>
          <div class="stat-label">Final Score</div>
        </div>
        <div class="result-stat">
          <div class="stat-number">{{ quizResults.correct }}</div>
          <div class="stat-label">Correct Answers</div>
        </div>
        <div class="result-stat">
          <div class="stat-number">{{ quizResults.total }}</div>
          <div class="stat-label">Total Questions</div>
        </div>
      </div>

      <div class="results-feedback">
        <h4 class="feedback-title">{{ getScoreFeedback(quizResults.score) }}</h4>
        <p class="feedback-text">{{ getDetailedFeedback(quizResults.score) }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="results-actions">
        <button @click="resetQuiz" class="action-btn primary">
          <span class="btn-icon">🔄</span>
          Take Another Quiz
        </button>
        <button @click="reviewAnswers" class="action-btn secondary">
          <span class="btn-icon">📝</span>
          Review Answers
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * AI Quiz Generator Component
 * 
 * This component creates personalized Vue.js quizzes using AI:
 * - Generates questions based on user progress and selected topics
 * - Adapts difficulty dynamically based on performance
 * - Provides detailed explanations with memory palace mnemonics
 * - Tracks learning progress and identifies knowledge gaps
 * - Integrates with the app's existing progress system
 */

// IMPORT VUE COMPOSITION API
// =========================
// These provide reactive state management and lifecycle hooks
import { ref, computed, onMounted, defineEmits } from 'vue'

// IMPORT AI SERVICES
// ==================
// AIQuizGeneratorService handles the AI-powered quiz generation
import { AIQuizGeneratorService } from '../../services/aiService.js'

// COMPONENT EVENTS
// ================
// Emit events to parent components for tracking and analytics
const emit = defineEmits(['quiz-completed', 'quiz-started', 'answer-submitted'])

// REACTIVE STATE VARIABLES
// ========================
// These variables automatically update the UI when changed

// Quiz configuration state
const selectedTopic = ref('components')           // Currently selected quiz topic
const selectedDifficulty = ref(3)                // Difficulty level (1-5)
const selectedQuestionCount = ref(5)              // Number of questions to generate

// Quiz state management
const isQuizActive = ref(false)                   // Whether a quiz is currently active
const isLoading = ref(false)                      // Loading state during AI generation
const quizCompleted = ref(false)                  // Whether the current quiz is completed
const currentQuiz = ref(null)                     // Current quiz data from AI
const currentQuestionIndex = ref(0)               // Index of current question
const selectedAnswer = ref(null)                  // User's selected answer for current question
const showResults = ref(false)                    // Whether to show answer explanation

// Quiz statistics
const quizStats = ref({
  totalQuizzes: 0,                                // Total number of quizzes taken
  averageScore: 0,                                // Average score across all quizzes
  completedTopics: [],                            // Topics the user has practiced
  strongAreas: [],                                // Areas where user performs well
  weakAreas: []                                   // Areas needing improvement
})

// Quiz results for the current quiz
const quizResults = ref({
  score: 0,                                       // Percentage score
  correct: 0,                                     // Number of correct answers
  total: 0,                                       // Total number of questions
  answers: []                                     // Detailed answer history
})

// LOADING MESSAGES
// ================
// Rotating messages to show during AI quiz generation
const loadingMessages = ref([
  "Analyzing your learning progress...",
  "Crafting personalized questions...",
  "Adding memory palace mnemonics...",
  "Calibrating difficulty level...",
  "Almost ready to challenge your brain!"
])
const currentLoadingMessage = ref(0)

// AVAILABLE QUIZ TOPICS
// =====================
// Topics that users can choose from for their quiz
const availableTopics = ref([
  { id: 'components', name: 'Components', icon: '🧩' },
  { id: 'reactivity', name: 'Reactivity', icon: '⚡' },
  { id: 'composition-api', name: 'Composition API', icon: '🎯' },
  { id: 'directives', name: 'Directives', icon: '🎭' },
  { id: 'routing', name: 'Vue Router', icon: '🗺️' },
  { id: 'state-management', name: 'State Management', icon: '🏪' },
  { id: 'lifecycle', name: 'Lifecycle', icon: '🔄' },
  { id: 'advanced', name: 'Advanced Topics', icon: '🚀' }
])

// COMPUTED PROPERTIES
// ===================
// These automatically recalculate when their dependencies change

/**
 * Get the current question object
 * @returns {Object|null} Current question data or null if no quiz active
 */
const currentQuestion = computed(() => {
  if (!currentQuiz.value || !currentQuiz.value.questions) return null
  return currentQuiz.value.questions[currentQuestionIndex.value]
})

// AI SERVICE INSTANCE
// ===================
// Initialize the AI quiz generator service
const aiQuizService = new AIQuizGeneratorService()

// COMPONENT METHODS
// =================
// Functions that handle user interactions and quiz logic

/**
 * Generate a new AI-powered quiz based on user selections
 * This function calls the AI service to create personalized questions
 */
const generateQuiz = async () => {
  try {
    // Set loading state and start loading message rotation
    isLoading.value = true
    rotateLoadingMessages()
    
    // Emit event to parent for analytics tracking
    emit('quiz-started', {
      topic: selectedTopic.value,
      difficulty: selectedDifficulty.value,
      questionCount: selectedQuestionCount.value
    })

    // Call AI service to generate personalized quiz
    const userProgress = {
      completedTopics: quizStats.value.completedTopics,
      averageScore: quizStats.value.averageScore,
      weakAreas: quizStats.value.weakAreas
    }

    // Generate quiz using AI service
    const generatedQuiz = await aiQuizService.generateQuiz(
      userProgress,
      selectedTopic.value,
      selectedDifficulty.value,
      selectedQuestionCount.value
    )

    // Set up quiz state
    currentQuiz.value = generatedQuiz
    isQuizActive.value = true
    isLoading.value = false
    currentQuestionIndex.value = 0
    selectedAnswer.value = null
    showResults.value = false
    quizCompleted.value = false

    // Initialize results tracking
    quizResults.value = {
      score: 0,
      correct: 0,
      total: generatedQuiz.questions.length,
      answers: []
    }

  } catch (error) {
    console.error('Error generating quiz:', error)
    isLoading.value = false
    // Could show error notification here
  }
}

/**
 * Handle user selecting an answer option
 * @param {number} answerIndex - Index of the selected answer
 */
const selectAnswer = (answerIndex) => {
  if (showResults.value) return // Prevent changing answer after submission
  selectedAnswer.value = answerIndex
}

/**
 * Submit the current answer and show explanation
 */
const submitAnswer = () => {
  if (selectedAnswer.value === null) return

  // Show results and explanation
  showResults.value = true
  
  // Check if answer is correct
  const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer
  
  // Record the answer
  quizResults.value.answers.push({
    questionIndex: currentQuestionIndex.value,
    selectedAnswer: selectedAnswer.value,
    correctAnswer: currentQuestion.value.correctAnswer,
    isCorrect: isCorrect,
    question: currentQuestion.value.question
  })

  // Update score
  if (isCorrect) {
    quizResults.value.correct++
  }

  // Emit event for analytics
  emit('answer-submitted', {
    questionIndex: currentQuestionIndex.value,
    isCorrect: isCorrect,
    topic: selectedTopic.value
  })
}

/**
 * Move to the next question
 */
const nextQuestion = () => {
  currentQuestionIndex.value++
  selectedAnswer.value = null
  showResults.value = false
}

/**
 * Finish the quiz and show results
 */
const finishQuiz = () => {
  // Calculate final score
  quizResults.value.score = Math.round((quizResults.value.correct / quizResults.value.total) * 100)
  
  // Update quiz statistics
  quizStats.value.totalQuizzes++
  quizStats.value.averageScore = calculateNewAverage(
    quizStats.value.averageScore,
    quizResults.value.score,
    quizStats.value.totalQuizzes
  )

  // Add topic to completed topics if not already there
  if (!quizStats.value.completedTopics.includes(selectedTopic.value)) {
    quizStats.value.completedTopics.push(selectedTopic.value)
  }

  // Analyze performance for weak/strong areas
  analyzePerformance()

  // Show results screen
  isQuizActive.value = false
  quizCompleted.value = true

  // Emit completion event to parent
  emit('quiz-completed', {
    score: quizResults.value.score,
    topic: selectedTopic.value,
    difficulty: selectedDifficulty.value,
    results: quizResults.value
  })
}

/**
 * Reset quiz to start over
 */
const resetQuiz = () => {
  isQuizActive.value = false
  quizCompleted.value = false
  currentQuiz.value = null
  currentQuestionIndex.value = 0
  selectedAnswer.value = null
  showResults.value = false
}

/**
 * Review answers from the completed quiz
 */
const reviewAnswers = () => {
  // Reset to quiz mode but show all answers
  isQuizActive.value = true
  quizCompleted.value = false
  currentQuestionIndex.value = 0
  showResults.value = true
  // User can navigate through questions to review
}

// UTILITY FUNCTIONS
// =================
// Helper functions for calculations and UI feedback

/**
 * Get difficulty label for display
 * @param {number} level - Difficulty level (1-5)
 * @returns {string} Human-readable difficulty label
 */
const getDifficultyLabel = (level) => {
  const labels = {
    1: 'Beginner',
    2: 'Easy',
    3: 'Intermediate',
    4: 'Advanced',
    5: 'Expert'
  }
  return labels[level] || 'Intermediate'
}

/**
 * Get encouraging feedback based on score
 * @param {number} score - Quiz score percentage
 * @returns {string} Encouraging feedback message
 */
const getScoreFeedback = (score) => {
  if (score >= 90) return "Outstanding! You're a Vue wizard! 🧙‍♂️"
  if (score >= 80) return "Excellent work! You're mastering Vue! 🎉"
  if (score >= 70) return "Great job! You're on the right track! 🚀"
  if (score >= 60) return "Good effort! Keep practicing! 💪"
  return "Keep learning! Every expert was once a beginner! 🌱"
}

/**
 * Get detailed feedback with next steps
 * @param {number} score - Quiz score percentage
 * @returns {string} Detailed feedback with suggestions
 */
const getDetailedFeedback = (score) => {
  if (score >= 90) {
    return "You've demonstrated excellent mastery of Vue concepts! Consider taking on more advanced topics or helping others learn."
  }
  if (score >= 80) {
    return "You have a solid understanding of Vue fundamentals. Try tackling some advanced concepts or building a small project."
  }
  if (score >= 70) {
    return "You're making good progress! Review the concepts you missed and practice with more examples."
  }
  if (score >= 60) {
    return "You have the basics down but need more practice. Focus on the areas where you struggled most."
  }
  return "Don't get discouraged! Learning takes time. Review the fundamentals and try again when you're ready."
}

/**
 * Calculate new running average
 * @param {number} currentAverage - Current average score
 * @param {number} newScore - New quiz score
 * @param {number} totalQuizzes - Total number of quizzes taken
 * @returns {number} New average score
 */
const calculateNewAverage = (currentAverage, newScore, totalQuizzes) => {
  if (totalQuizzes === 1) return newScore
  return ((currentAverage * (totalQuizzes - 1)) + newScore) / totalQuizzes
}

/**
 * Analyze quiz performance to identify strong and weak areas
 */
const analyzePerformance = () => {
  const topicScore = quizResults.value.score
  const topic = selectedTopic.value

  // If score is high (>= 80%), add to strong areas
  if (topicScore >= 80) {
    if (!quizStats.value.strongAreas.includes(topic)) {
      quizStats.value.strongAreas.push(topic)
    }
    // Remove from weak areas if it was there
    quizStats.value.weakAreas = quizStats.value.weakAreas.filter(area => area !== topic)
  }
  // If score is low (< 60%), add to weak areas
  else if (topicScore < 60) {
    if (!quizStats.value.weakAreas.includes(topic)) {
      quizStats.value.weakAreas.push(topic)
    }
    // Remove from strong areas if it was there
    quizStats.value.strongAreas = quizStats.value.strongAreas.filter(area => area !== topic)
  }
}

/**
 * Rotate loading messages to keep user engaged
 */
const rotateLoadingMessages = () => {
  const interval = setInterval(() => {
    if (!isLoading.value) {
      clearInterval(interval)
      return
    }
    currentLoadingMessage.value = (currentLoadingMessage.value + 1) % loadingMessages.value.length
  }, 1500)
}

// COMPONENT LIFECYCLE
// ===================
// Code that runs when the component is mounted

onMounted(() => {
  // Load quiz statistics from localStorage if available
  const savedStats = localStorage.getItem('vue-quiz-stats')
  if (savedStats) {
    try {
      quizStats.value = JSON.parse(savedStats)
    } catch (error) {
      console.error('Error loading quiz stats:', error)
    }
  }
})

// WATCHERS
// ========
// Automatically save quiz statistics when they change
import { watch } from 'vue'

watch(quizStats, (newStats) => {
  localStorage.setItem('vue-quiz-stats', JSON.stringify(newStats))
}, { deep: true })
</script>

<style scoped>
/* AI Quiz Generator Styles - Following the app's design system */

.ai-quiz-generator {
  /* Main container with modern styling */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  color: white;
  min-height: 400px;
  position: relative;
  overflow: hidden;
}

.ai-quiz-generator::before {
  /* Animated background pattern */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

/* Header Styles */
.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.quiz-title-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quiz-icon {
  font-size: 2.5rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.quiz-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.quiz-subtitle {
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-size: 0.95rem;
}

.quiz-stats {
  display: flex;
  gap: 1rem;
}

.stat-item {
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.stat-number {
  display: block;
  font-size: 1.2rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.8;
}

/* Configuration Styles */
.quiz-config {
  position: relative;
  z-index: 1;
}

.config-section {
  margin-bottom: 2rem;
}

.config-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.75rem;
}

.topic-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);
}

.topic-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

.topic-btn.active {
  background: rgba(255, 255, 255, 0.3);
  border-color: #fff;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
}

.topic-icon {
  font-size: 1.5rem;
}

.topic-name {
  font-size: 0.9rem;
  font-weight: 500;
}

/* Difficulty Slider */
.difficulty-slider {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  margin-bottom: 1rem;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.difficulty-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
}

.difficulty-indicator {
  text-align: center;
  font-weight: 600;
  color: #fff;
}

/* Question Count Options */
.question-count-options {
  display: flex;
  gap: 0.75rem;
}

.count-btn {
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.count-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.count-btn.active {
  background: rgba(255, 255, 255, 0.3);
  border-color: #fff;
}

/* Start Quiz Button */
.start-quiz-btn {
  width: 100%;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  border: none;
  color: white;
  padding: 1rem 2rem;
  border-radius: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 4px 20px rgba(238, 90, 36, 0.4);
}

.start-quiz-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(238, 90, 36, 0.6);
}

.start-quiz-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  font-size: 1.2rem;
}

/* Loading State */
.loading-state {
  text-align: center;
  padding: 3rem 1rem;
  position: relative;
  z-index: 1;
}

.loading-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.ai-brain {
  font-size: 4rem;
  animation: bounce 1.5s ease-in-out infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.loading-text h4 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.loading-text p {
  opacity: 0.9;
  font-size: 1rem;
  animation: fadeInOut 1.5s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.9; }
  50% { opacity: 0.6; }
}

/* Active Quiz Styles */
.active-quiz {
  position: relative;
  z-index: 1;
}

.quiz-progress {
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #00d2ff, #3a7bd5);
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Question Card */
.question-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.question-type {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.question-difficulty {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.question-text {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.question-code {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #00d2ff;
}

.question-code pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #f8f8f2;
}

/* Answer Options */
.answer-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.answer-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 1rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  backdrop-filter: blur(10px);
}

.answer-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: translateX(5px);
}

.answer-btn.selected {
  background: rgba(255, 255, 255, 0.3);
  border-color: #fff;
}

.answer-btn.correct {
  background: rgba(46, 213, 115, 0.3);
  border-color: #2ed573;
}

.answer-btn.incorrect {
  background: rgba(255, 107, 107, 0.3);
  border-color: #ff6b6b;
}

.option-letter {
  background: rgba(255, 255, 255, 0.3);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.option-text {
  flex: 1;
  font-size: 0.95rem;
}

/* Answer Explanation */
.answer-explanation {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #00d2ff;
}

.explanation-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.explanation-icon {
  font-size: 1.5rem;
}

.explanation-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.explanation-text {
  margin-bottom: 1rem;
  line-height: 1.5;
  opacity: 0.95;
}

.mnemonic-section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.mnemonic-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.mnemonic-icon {
  font-size: 1.2rem;
}

.mnemonic-title {
  font-weight: 600;
  font-size: 0.9rem;
}

.mnemonic-text {
  font-style: italic;
  opacity: 0.9;
  line-height: 1.4;
  margin: 0;
}

/* Navigation Buttons */
.question-navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.submit-btn, .next-btn, .finish-btn {
  background: linear-gradient(45deg, #00d2ff, #3a7bd5);
  border: none;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(58, 123, 213, 0.4);
}

.submit-btn:hover:not(:disabled),
.next-btn:hover,
.finish-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(58, 123, 213, 0.6);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Quiz Results */
.quiz-results {
  text-align: center;
  position: relative;
  z-index: 1;
}

.results-header {
  margin-bottom: 2rem;
}

.results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: celebration 2s ease-in-out infinite;
}

@keyframes celebration {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(-5deg); }
  75% { transform: scale(1.1) rotate(5deg); }
}

.results-title {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.results-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.result-stat {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem 1rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.result-stat .stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #00d2ff;
}

.result-stat .stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-top: 0.5rem;
}

.results-feedback {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.feedback-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #00d2ff;
}

.feedback-text {
  line-height: 1.5;
  opacity: 0.95;
  margin: 0;
}

.results-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn.primary {
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  color: white;
  box-shadow: 0 4px 15px rgba(238, 90, 36, 0.4);
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.action-btn:hover {
  transform: translateY(-2px);
}

.action-btn.primary:hover {
  box-shadow: 0 6px 20px rgba(238, 90, 36, 0.6);
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .ai-quiz-generator {
    padding: 1.5rem;
  }
  
  .quiz-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .topic-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .question-navigation {
    flex-direction: column;
  }
  
  .results-actions {
    flex-direction: column;
  }
}
</style>
