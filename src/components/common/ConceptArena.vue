<!--
  Concept Arena - Vue Knowledge Testing Ground
  
  This component creates an interactive quiz game for testing Vue knowledge:
  - Asks random Vue interview questions with 4 multiple choice options
  - Users must get 5 correct answers in a row to win 1 fake million dollars in emojis
  - If users fail 3 questions in a row, the entire website turns into a giant toilet emoji
  - Before playing, checks if user knows Vue - if not, redirects them to learn first
  - Maintains consistent design system with modern UI/UX patterns
-->

<template>
  <div class="concept-arena" :class="{ 'toilet-mode': isToiletMode }">
    <!-- Toilet Mode - No escape! -->
    <div v-if="isToiletMode" class="toilet-prison">
      <div class="giant-toilet">
        🚽
      </div>
      <div class="toilet-message">
        <h2>YOU HAVE BEEN FLUSHED!</h2>
        <p>Your Vue knowledge wasn't strong enough...</p>
        <p>The toilet gods have spoken! 🚽💩</p>
      </div>
    </div>

    <!-- Normal Arena Mode -->
    <div v-else class="arena-container">
      <!-- Pre-game Knowledge Check -->
      <div v-if="gameState === 'knowledge-check'" class="knowledge-check">
        <div class="check-header">
          <div class="arena-icon">⚔️</div>
          <h3 class="arena-title">Welcome to the Concept Arena!</h3>
          <p class="arena-subtitle">
            This is where Vue warriors test their knowledge against challenging interview questions!
          </p>
        </div>
        
        <div class="knowledge-question">
          <h4>Before we begin, do you know Vue.js?</h4>
          <p class="question-description">
            The Arena contains advanced Vue interview questions. 
            If you're new to Vue, we recommend exploring the learning sections first!
          </p>
          
          <div class="knowledge-buttons">
            <button 
              @click="startGame" 
              class="knowledge-btn knowledge-btn--yes"
            >
              <span class="btn-emoji">💪</span>
              Yes, I know Vue! Let's battle!
            </button>
            
            <button 
              @click="redirectToLearning" 
              class="knowledge-btn knowledge-btn--no"
            >
              <span class="btn-emoji">📚</span>
              No, I need to learn first
            </button>
          </div>
        </div>
      </div>

      <!-- Game Arena -->
      <div v-else-if="gameState === 'playing'" class="game-arena">
        <!-- Game Header with Stats -->
        <div class="game-header">
          <div class="game-stats">
            <div class="stat-card stat-card--streak">
              <div class="stat-icon">🔥</div>
              <div class="stat-info">
                <span class="stat-number">{{ correctStreak }}</span>
                <span class="stat-label">Correct Streak</span>
              </div>
            </div>
            
            <div class="stat-card stat-card--failures">
              <div class="stat-icon">💀</div>
              <div class="stat-info">
                <span class="stat-number">{{ failureStreak }}</span>
                <span class="stat-label">Failures in Row</span>
              </div>
            </div>
            
            <div class="stat-card stat-card--total">
              <div class="stat-icon">📊</div>
              <div class="stat-info">
                <span class="stat-number">{{ totalQuestions }}</span>
                <span class="stat-label">Questions Asked</span>
              </div>
            </div>
          </div>
          
          <!-- Progress to Victory -->
          <div class="victory-progress">
            <div class="progress-header">
              <span class="progress-label">Progress to Victory (5 in a row needed)</span>
              <span class="progress-count">{{ correctStreak }}/5</span>
            </div>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: (correctStreak / 5) * 100 + '%' }"
              ></div>
            </div>
          </div>
          
          <!-- Danger Zone -->
          <div v-if="failureStreak > 0" class="danger-zone">
            <div class="danger-header">
              <span class="danger-icon">⚠️</span>
              <span class="danger-text">
                DANGER! {{ 3 - failureStreak }} more failures = TOILET PRISON! 🚽
              </span>
            </div>
          </div>
        </div>

        <!-- Current Question -->
        <div class="question-container">
          <div class="question-header">
            <h4 class="question-title">Question #{{ totalQuestions + 1 }}</h4>
            <div class="question-difficulty" :class="`difficulty--${currentQuestion.difficulty}`">
              {{ currentQuestion.difficulty.toUpperCase() }}
            </div>
          </div>
          
          <div class="question-content">
            <p class="question-text">{{ currentQuestion.question }}</p>
            
            <!-- Answer Options -->
            <div class="answer-options">
              <button
                v-for="(option, index) in currentQuestion.options"
                :key="index"
                @click="selectAnswer(index)"
                :class="[
                  'answer-option',
                  { 
                    'answer-option--selected': selectedAnswer === index,
                    'answer-option--correct': showResult && index === currentQuestion.correctAnswer,
                    'answer-option--wrong': showResult && selectedAnswer === index && index !== currentQuestion.correctAnswer
                  }
                ]"
                :disabled="showResult"
              >
                <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
                <span class="option-text">{{ option }}</span>
              </button>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div class="question-actions">
            <button
              v-if="!showResult"
              @click="submitAnswer"
              :disabled="selectedAnswer === null"
              class="submit-btn"
              :class="{ 'submit-btn--disabled': selectedAnswer === null }"
            >
              <span class="btn-icon">⚡</span>
              Submit Answer
            </button>
            
            <button
              v-else
              @click="nextQuestion"
              class="next-btn"
            >
              <span class="btn-icon">➡️</span>
              Next Question
            </button>
          </div>
          
          <!-- Result Feedback -->
          <div v-if="showResult" class="result-feedback">
            <div 
              class="feedback-message" 
              :class="{ 
                'feedback-message--correct': isLastAnswerCorrect,
                'feedback-message--wrong': !isLastAnswerCorrect 
              }"
            >
              <div class="feedback-icon">
                {{ isLastAnswerCorrect ? '✅' : '❌' }}
              </div>
              <div class="feedback-content">
                <h5 class="feedback-title">
                  {{ isLastAnswerCorrect ? 'Correct!' : 'Wrong!' }}
                </h5>
                <p class="feedback-explanation">
                  {{ currentQuestion.explanation }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Victory Screen -->
      <div v-else-if="gameState === 'victory'" class="victory-screen">
        <div class="victory-content">
          <div class="victory-animation">
            <div class="money-rain">
              <div v-for="i in 20" :key="i" class="money-emoji" :style="{ 
                left: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's'
              }">
                💰
              </div>
            </div>
            
            <div class="victory-trophy">🏆</div>
            <h2 class="victory-title">CONGRATULATIONS!</h2>
            <p class="victory-message">
              You've conquered the Concept Arena! 
              Here's your reward: 1 FAKE MILLION DOLLARS! 💰💰💰
            </p>
            
            <div class="fake-money-display">
              <div class="money-amount">$1,000,000</div>
              <div class="money-note">(Completely fake, but feels good right?)</div>
              <div class="money-emojis">
                💰💵💎💸🤑💰💵💎💸🤑
              </div>
            </div>
            
            <div class="victory-stats">
              <div class="victory-stat">
                <span class="stat-label">Total Questions:</span>
                <span class="stat-value">{{ totalQuestions }}</span>
              </div>
              <div class="victory-stat">
                <span class="stat-label">Final Streak:</span>
                <span class="stat-value">{{ correctStreak }}</span>
              </div>
            </div>
            
            <button @click="playAgain" class="play-again-btn">
              <span class="btn-icon">🔄</span>
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useNotifications } from '../../composables/useNotifications.js'

const { showInteractiveFeedback } = useNotifications()

const gameState = ref('knowledge-check')
const isToiletMode = ref(false)
const currentQuestion = ref(null)
const selectedAnswer = ref(null)
const showResult = ref(false)
const isLastAnswerCorrect = ref(false)

const correctStreak = ref(0)
const failureStreak = ref(0) 
const totalQuestions = ref(0)

const vueQuestions = [
  {
    question: "What is the main difference between Vue 2 and Vue 3?",
    options: [
      "Vue 3 uses TypeScript by default",
      "Vue 3 has a new Composition API and better performance",
      "Vue 3 only works with Vite",
      "Vue 3 removed the Options API"
    ],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "Vue 3 introduced the Composition API for better logic reuse and has significant performance improvements with a rewritten reactivity system."
  },
  {
    question: "What does 'ref' do in Vue 3 Composition API?",
    options: [
      "Creates a template reference",
      "Creates a reactive reference to a value",
      "References another component",
      "Creates a computed property"
    ],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "ref() creates a reactive reference that can hold any value type. It returns an object with a .value property."
  },
  {
    question: "What is the purpose of 'reactive' in Vue 3?",
    options: [
      "Makes arrays reactive only",
      "Creates reactive proxy for objects",
      "Same as ref but for strings",
      "Creates computed properties"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "reactive() creates a reactive proxy for objects and arrays, making all nested properties reactive."
  },
  {
    question: "How do you define props in Composition API?",
    options: [
      "const props = props()",
      "const props = defineProps()",
      "const props = useProps()",
      "const props = createProps()"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "defineProps() is a compile-time macro used to define props in Composition API setup script."
  },
  {
    question: "What is the difference between 'computed' and 'watch'?",
    options: [
      "No difference, they're the same",
      "computed is for derived state, watch is for side effects",
      "watch is faster than computed",
      "computed only works with strings"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "computed creates derived reactive state, while watch performs side effects in response to reactive state changes."
  },
  {
    question: "What does 'nextTick' do in Vue?",
    options: [
      "Waits for the next user click",
      "Waits for the next DOM update cycle",
      "Adds a 1-second delay",
      "Triggers the next animation frame"
    ],
    correctAnswer: 1,
    difficulty: "hard",
    explanation: "nextTick waits for the next DOM update cycle, useful when you need to access updated DOM after a state change."
  },
  {
    question: "How do you provide/inject dependencies in Vue 3?",
    options: [
      "provide() and inject()",
      "createProvider() and useProvider()",
      "supply() and consume()",
      "give() and take()"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    explanation: "provide() and inject() enable dependency injection, allowing ancestor components to provide values to descendant components."
  },
  {
    question: "What is Teleport in Vue 3?",
    options: [
      "A navigation library",
      "A way to render content outside the component tree",
      "A state management tool",
      "A testing utility"
    ],
    correctAnswer: 1,
    difficulty: "hard",
    explanation: "Teleport allows you to render a component's template in a different part of the DOM tree, useful for modals and overlays."
  },
  {
    question: "What are Vue 3 Fragments?",
    options: [
      "Broken components",
      "Multiple root elements in a template",
      "CSS animations",
      "Error boundaries"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "Fragments allow components to have multiple root elements, removing the single root element requirement from Vue 2."
  },
  {
    question: "How do you emit events in Composition API?",
    options: [
      "this.$emit()",
      "defineEmits() and emit()",
      "createEmit()",
      "useEmit()"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "defineEmits() declares events and returns an emit function to trigger them in Composition API."
  },
  {
    question: "What is the purpose of v-model in Vue?",
    options: [
      "Creates a one-way data binding",
      "Creates two-way data binding",
      "Only works with input elements",
      "Replaces all event handlers"
    ],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "v-model creates two-way data binding, automatically handling both value binding and event listening."
  },
  {
    question: "Which lifecycle hook runs after component is mounted?",
    options: [
      "onBeforeMount",
      "onMounted",
      "onCreated",
      "onUpdated"
    ],
    correctAnswer: 1,
    difficulty: "easy",
    explanation: "onMounted runs after the component has been mounted to the DOM and is ready for DOM manipulation."
  },
  {
    question: "What is the correct way to conditionally render elements?",
    options: [
      "v-show only",
      "v-if only", 
      "Both v-if and v-show work",
      "Neither works in Vue 3"
    ],
    correctAnswer: 2,
    difficulty: "medium",
    explanation: "Both v-if and v-show can conditionally render elements. v-if removes/adds elements from DOM, v-show toggles CSS display."
  },
  {
    question: "What does the 'key' attribute do in v-for?",
    options: [
      "Makes loops run faster",
      "Helps Vue track changes efficiently",
      "Required for all loops",
      "Only works with objects"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    explanation: "The key attribute helps Vue's virtual DOM algorithm identify which items have changed, been added, or removed for efficient updates."
  },
  {
    question: "How do you create a global component in Vue 3?",
    options: [
      "app.component('name', component)",
      "Vue.component('name', component)",
      "global.component('name', component)",
      "window.component('name', component)"
    ],
    correctAnswer: 0,
    difficulty: "medium",
    explanation: "In Vue 3, you use app.component() on the app instance to register global components."
  }
]

const startGame = () => {
  gameState.value = 'playing'
  resetGameStats()
  loadRandomQuestion()
  
  showInteractiveFeedback(
    'Arena Entered!',
    'The battle begins! Good luck, Vue warrior! ⚔️'
  )
}

const redirectToLearning = () => {
  showInteractiveFeedback(
    'Wise Choice!',
    'Learn the basics first, then return to conquer the Arena! 📚'
  )
  
  emit('redirect-to-learning')
}

const resetGameStats = () => {
  correctStreak.value = 0
  failureStreak.value = 0
  totalQuestions.value = 0
  selectedAnswer.value = null
  showResult.value = false
  isLastAnswerCorrect.value = false
}

const loadRandomQuestion = () => {
  let newQuestion
  do {
    const randomIndex = Math.floor(Math.random() * vueQuestions.length)
    newQuestion = vueQuestions[randomIndex]
  } while (newQuestion === currentQuestion.value && vueQuestions.length > 1)
  
  currentQuestion.value = newQuestion
  selectedAnswer.value = null
  showResult.value = false
}

const selectAnswer = (index) => {
  if (!showResult.value) {
    selectedAnswer.value = index
  }
}

const submitAnswer = () => {
  if (selectedAnswer.value === null) return
  
  showResult.value = true
  totalQuestions.value++
  
  const isCorrect = selectedAnswer.value === currentQuestion.value.correctAnswer
  isLastAnswerCorrect.value = isCorrect
  
  if (isCorrect) {
    correctStreak.value++
    failureStreak.value = 0
    
    showInteractiveFeedback(
      'Correct! 🎉',
      `Great job! Your streak is now ${correctStreak.value}!`
    )
    
    if (correctStreak.value >= 5) {
      setTimeout(() => {
        gameState.value = 'victory'
      }, 2000)
    }
  } else {
    failureStreak.value++
    correctStreak.value = 0
    
    showInteractiveFeedback(
      'Wrong! 😞',
      `Oops! Your failure streak is now ${failureStreak.value}.`
    )
    
    if (failureStreak.value >= 3) {
      setTimeout(() => {
        enterToiletMode()
      }, 2000)
    }
  }
}

const nextQuestion = () => {
  loadRandomQuestion()
}

const enterToiletMode = () => {
  isToiletMode.value = true
  
  emit('toilet-mode-activated')
  
  showInteractiveFeedback(
    'FLUSHED! 🚽',
    'You have been banished to the toilet dimension!'
  )
}

const playAgain = () => {
  gameState.value = 'knowledge-check'
  resetGameStats()
  
  showInteractiveFeedback(
    'Ready for Round 2?',
    'The Arena awaits your return! ⚔️'
  )
}

onMounted(() => {
  console.log('🏟️ Concept Arena initialized - Ready for battle!')
})

const emit = defineEmits(['redirect-to-learning', 'toilet-mode-activated'])

watch(gameState, (newState) => {
  console.log(`🎮 Game state changed to: ${newState}`)
})

watch([correctStreak, failureStreak], () => {
  console.log(`📊 Stats - Correct: ${correctStreak.value}, Failures: ${failureStreak.value}`)
})
</script>

<style scoped>
.concept-arena {
  width: 100%;
  min-height: 400px;
  position: relative;
  transition: all 0.5s ease;
}

.toilet-mode {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, #8B4513, #A0522D);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.toilet-prison {
  text-align: center;
  color: white;
  animation: toiletShake 2s infinite;
}

.giant-toilet {
  font-size: 20rem;
  animation: toiletSpin 3s infinite linear;
  margin-bottom: 2rem;
}

.toilet-message h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #FFD700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.toilet-message p {
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

.arena-container {
  background: linear-gradient(135deg, 
    rgba(99, 102, 241, 0.1) 0%, 
    rgba(168, 85, 247, 0.1) 100%);
  border-radius: 16px;
  padding: 2rem;
  border: 2px solid rgba(99, 102, 241, 0.2);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.knowledge-check {
  text-align: center;
}

.check-header {
  margin-bottom: 2rem;
}

.arena-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.arena-title {
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.arena-subtitle {
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.knowledge-question {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.knowledge-question h4 {
  font-size: 1.5rem;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.question-description {
  color: #6b7280;
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.knowledge-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.knowledge-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
}

.knowledge-btn--yes {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.knowledge-btn--yes:hover {
  background: linear-gradient(135deg, #059669, #047857);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.knowledge-btn--no {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
}

.knowledge-btn--no:hover {
  background: linear-gradient(135deg, #4f46e5, #4338ca);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.btn-emoji {
  font-size: 1.5rem;
}

.game-arena {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.game-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.game-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.stat-card--streak {
  border-color: #f59e0b;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.05));
}

.stat-card--failures {
  border-color: #ef4444;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05));
}

.stat-card--total {
  border-color: #6366f1;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05));
}

.stat-icon {
  font-size: 2rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.victory-progress {
  background: white;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid #10b981;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-label {
  font-weight: 600;
  color: #1f2937;
}

.progress-count {
  font-weight: bold;
  color: #10b981;
  font-size: 1.125rem;
}

.progress-bar {
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  transition: width 0.5s ease;
}

.danger-zone {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.05));
  padding: 0.75rem;
  border-radius: 12px;
  border: 2px solid #ef4444;
  animation: dangerPulse 2s infinite;
}

.danger-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.danger-icon {
  font-size: 1.5rem;
  animation: dangerShake 0.5s infinite;
}

.danger-text {
  font-weight: bold;
  color: #dc2626;
  font-size: 1.125rem;
}

.question-container {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.question-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0;
}

.question-difficulty {
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.875rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.difficulty--easy {
  background: #dcfce7;
  color: #166534;
}

.difficulty--medium {
  background: #fef3c7;
  color: #92400e;
}

.difficulty--hard {
  background: #fecaca;
  color: #991b1b;
}

.question-content {
  margin-bottom: 2rem;
}

.question-text {
  font-size: 1.125rem;
  color: #1f2937;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  font-weight: 500;
}

.answer-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.answer-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.answer-option:hover:not(:disabled) {
  background: white;
  border-color: #6366f1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.answer-option--selected {
  background: rgba(99, 102, 241, 0.1);
  border-color: #6366f1;
}

.answer-option--correct {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}

.answer-option--wrong {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.answer-option:disabled {
  cursor: not-allowed;
}

.option-letter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #6366f1;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.answer-option--correct .option-letter {
  background: #10b981;
}

.answer-option--wrong .option-letter {
  background: #ef4444;
}

.option-text {
  font-size: 1rem;
  color: #1f2937;
  line-height: 1.6;
}

.question-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.submit-btn,
.next-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover:not(.submit-btn--disabled),
.next-btn:hover {
  background: linear-gradient(135deg, #4f46e5, #4338ca);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.submit-btn--disabled {
  background: #9ca3af;
  cursor: not-allowed;
  transform: none;
}

.btn-icon {
  font-size: 1.2rem;
}

.result-feedback {
  margin-top: 1rem;
}

.feedback-message {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid;
}

.feedback-message--correct {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}

.feedback-message--wrong {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.feedback-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.feedback-content {
  flex: 1;
}

.feedback-title {
  font-size: 1.125rem;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.feedback-explanation {
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

.victory-screen {
  text-align: center;
  padding: 2rem;
}

.victory-content {
  position: relative;
}

.money-rain {
  position: absolute;
  top: -50px;
  left: 0;
  width: 100%;
  height: 200px;
  pointer-events: none;
  overflow: hidden;
}

.money-emoji {
  position: absolute;
  font-size: 2rem;
  animation: moneyFall 3s infinite linear;
}

.victory-trophy {
  font-size: 6rem;
  margin-bottom: 1rem;
  animation: victoryBounce 2s infinite;
}

.victory-title {
  font-size: 3rem;
  font-weight: bold;
  color: #f59e0b;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.victory-message {
  font-size: 1.125rem;
  color: #1f2937;
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.fake-money-display {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  padding: 2rem;
  border-radius: 16px;
  margin: 2rem 0;
  color: white;
}

.money-amount {
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.money-note {
  font-size: 0.875rem;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.money-emojis {
  font-size: 2rem;
  animation: moneyGlow 2s infinite;
}

.victory-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
}

.victory-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.victory-stat .stat-label {
  font-size: 0.875rem;
  color: #6b7280;
}

.victory-stat .stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #6366f1;
}

.play-again-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin: 0 auto;
}

.play-again-btn:hover {
  background: linear-gradient(135deg, #059669, #047857);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

@keyframes toiletShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  75% { transform: translateX(10px); }
}

@keyframes toiletSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes dangerPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes dangerShake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}

@keyframes moneyFall {
  0% { 
    transform: translateY(-100px) rotate(0deg);
    opacity: 1;
  }
  100% { 
    transform: translateY(300px) rotate(360deg);
    opacity: 0;
  }
}

@keyframes victoryBounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-20px); }
  60% { transform: translateY(-10px); }
}

@keyframes moneyGlow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@media (max-width: 768px) {
  .arena-container {
    padding: 1rem;
  }
  
  .game-stats {
    grid-template-columns: 1fr;
  }
  
  .knowledge-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .knowledge-btn {
    width: 100%;
    max-width: 300px;
  }
  
  .question-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  
  .victory-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .giant-toilet {
    font-size: 10rem;
  }
  
  .toilet-message h2 {
    font-size: 2rem;
  }
  
  .toilet-message p {
    font-size: 1.2rem;
  }
}
</style>
