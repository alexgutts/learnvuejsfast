<!--
  AI Learning Game Component - Interactive Drag & Drop Vue Learning
  
  This component provides gamified Vue.js learning through:
  - Drag and drop concept matching
  - Interactive code block assembly
  - Component building challenges
  - Real-time feedback and scoring
  - Progressive difficulty levels
  - Achievement system with visual rewards
-->

<template>
  <div class="ai-learning-game">
    <!-- Game Header with Stats -->
    <div class="game-header">
      <div class="game-title-section">
        <h1 class="game-title">
          <span class="title-icon">🎮</span>
          Vue Quest: Drag & Drop Adventure
        </h1>
        <p class="game-subtitle">
          Master Vue 3 through interactive drag-and-drop challenges!
        </p>
      </div>
      
      <!-- Game Controls -->
      <div class="game-controls">
        <!-- Level Selector -->
        <div class="level-selector">
          <label class="level-label">Difficulty Level:</label>
          <select 
            v-model="selectedLevel" 
            @change="onLevelChange"
            class="level-select"
          >
            <option value="beginner">🌱 Beginner</option>
            <option value="intermediate">🚀 Intermediate</option>
            <option value="advanced">🧠 Advanced</option>
            <option value="expert">🤖 Expert</option>
            <option value="mr-robot">👾 Mr. Robot</option>
          </select>
        </div>
        
        <!-- Generate New Questions Button -->
        <button 
          @click="generateNewQuestions" 
          :disabled="isGeneratingQuestions"
          class="generate-btn"
          :class="{ 'generating': isGeneratingQuestions }"
        >
          <span class="btn-icon">{{ isGeneratingQuestions ? '🔄' : '✨' }}</span>
          {{ isGeneratingQuestions ? 'Generating...' : 'New Questions' }}
        </button>
      </div>
      
      <!-- Player Progress -->
      <div class="player-stats">
        <div class="stat-item">
          <div class="stat-icon">⭐</div>
          <div class="stat-info">
            <span class="stat-value">{{ gameStats.score }}</span>
            <span class="stat-label">Score</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🏆</div>
          <div class="stat-info">
            <span class="stat-value">{{ gameStats.level }}</span>
            <span class="stat-label">Level</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">🔥</div>
          <div class="stat-info">
            <span class="stat-value">{{ gameStats.streak }}</span>
            <span class="stat-label">Streak</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Game Area -->
    <div class="game-area">
      <!-- Level Selection -->
      <div v-if="gameState === 'menu'" class="level-menu">
        <h2 class="menu-title">Choose Your Challenge</h2>
        <div class="challenge-grid">
          <div
            v-for="challenge in availableChallenges"
            :key="challenge.id"
            :class="[
              'challenge-card',
              { 'challenge-locked': !challenge.unlocked },
              { 'challenge-completed': challenge.completed }
            ]"
            @click="challenge.unlocked ? startChallenge(challenge) : null"
          >
            <div class="challenge-icon">{{ challenge.icon }}</div>
            <h3 class="challenge-title">{{ challenge.title }}</h3>
            <p class="challenge-description">{{ challenge.description }}</p>
            <div class="challenge-difficulty">
              <span v-for="i in challenge.difficulty" :key="i" class="star">⭐</span>
            </div>
            <div v-if="challenge.completed" class="challenge-badge completed">✅ Completed</div>
            <div v-else-if="!challenge.unlocked" class="challenge-badge locked">🔒 Locked</div>
          </div>
        </div>
      </div>

      <!-- Active Challenge -->
      <div v-else-if="gameState === 'playing'" class="challenge-area">
        <div class="challenge-header">
          <button @click="gameState = 'menu'" class="back-btn">
            ← Back to Menu
          </button>
          <h2 class="current-challenge-title">{{ currentChallenge.title }}</h2>
          <div class="challenge-progress">
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: `${challengeProgress}%` }"
              ></div>
            </div>
            <span class="progress-text">{{ challengeProgress }}%</span>
          </div>
        </div>

        <!-- Challenge Instructions -->
        <div class="challenge-instructions">
          <div class="instruction-card">
            <h3 class="instruction-title">{{ currentChallenge.instruction }}</h3>
            <p class="instruction-text">{{ currentChallenge.hint }}</p>
          </div>
        </div>

        <!-- Drag and Drop Area -->
        <div class="drag-drop-container">
          <!-- Draggable Items -->
          <div class="draggable-items">
            <h4 class="section-title">Drag these items:</h4>
            <div class="items-container">
              <div
                v-for="item in currentChallenge.draggableItems"
                :key="item.id"
                :class="[
                  'draggable-item',
                  { 'item-used': item.used },
                  { 'item-correct': item.correct },
                  { 'item-incorrect': item.incorrect }
                ]"
                :draggable="!item.used"
                @dragstart="onDragStart($event, item)"
                @dragend="onDragEnd"
                @touchstart="onTouchStart($event, item)"
                @touchmove="onTouchMove($event)"
                @touchend="onTouchEnd($event)"
              >
                <div class="item-content">
                  <div class="item-icon">{{ item.icon }}</div>
                  <div class="item-text">{{ item.text }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Drop Zones -->
          <div class="drop-zones">
            <h4 class="section-title">Drop them here:</h4>
            <div class="zones-container">
              <div
                v-for="zone in currentChallenge.dropZones"
                :key="zone.id"
                :data-zone-id="zone.id"
                :class="[
                  'drop-zone',
                  { 'zone-active': zone.id === activeZone },
                  { 'zone-filled': zone.filled },
                  { 'zone-correct': zone.correct },
                  { 'zone-incorrect': zone.incorrect }
                ]"
                @dragover.prevent="onDragOver(zone)"
                @dragleave="onDragLeave"
                @drop="onDrop($event, zone)"
                @touchenter="onTouchEnter(zone)"
                @touchleave="onTouchLeave"
              >
                <div v-if="!zone.filled" class="zone-placeholder">
                  <div class="placeholder-icon">{{ zone.icon }}</div>
                  <div class="placeholder-text">{{ zone.placeholder }}</div>
                </div>
                <div v-else class="zone-content">
                  <div class="filled-icon">{{ zone.filledItem.icon }}</div>
                  <div class="filled-text">{{ zone.filledItem.text }}</div>
                  <button @click="removeFromZone(zone)" class="remove-btn">×</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Challenge Actions -->
        <div class="challenge-actions">
          <button 
            @click="checkSolution" 
            :disabled="!canCheckSolution"
            class="action-btn primary"
          >
            ✅ Check Solution
          </button>
          <button 
            @click="resetChallenge" 
            class="action-btn secondary"
          >
            🔄 Reset
          </button>
          <button 
            @click="getHint" 
            class="action-btn hint"
          >
            💡 Hint
          </button>
        </div>

        <!-- Feedback Area -->
        <div v-if="showFeedback" class="feedback-area">
          <div :class="['feedback-card', feedbackType]">
            <div class="feedback-icon">
              {{ feedbackType === 'success' ? '🎉' : feedbackType === 'error' ? '❌' : '💡' }}
            </div>
            <div class="feedback-content">
              <h4 class="feedback-title">{{ feedbackTitle }}</h4>
              <p class="feedback-message">{{ feedbackMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Results Screen -->
      <div v-else-if="gameState === 'results'" class="results-screen">
        <div class="results-content">
          <div class="results-icon">🏆</div>
          <h2 class="results-title">Challenge Complete!</h2>
          <div class="results-stats">
            <div class="result-stat">
              <span class="result-label">Score Earned:</span>
              <span class="result-value">+{{ lastChallengeScore }}</span>
            </div>
            <div class="result-stat">
              <span class="result-label">Accuracy:</span>
              <span class="result-value">{{ lastChallengeAccuracy }}%</span>
            </div>
            <div class="result-stat">
              <span class="result-label">Time:</span>
              <span class="result-value">{{ formatTime(challengeTime) }}</span>
            </div>
          </div>
          <div class="results-actions">
            <button @click="nextChallenge" class="action-btn primary">
              Next Challenge
            </button>
            <button @click="gameState = 'menu'" class="action-btn secondary">
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Achievement Popup -->
    <div v-if="showAchievement" class="achievement-popup">
      <div class="achievement-content">
        <div class="achievement-icon">🏆</div>
        <h3 class="achievement-title">Achievement Unlocked!</h3>
        <p class="achievement-text">{{ achievementText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { AIGameService } from '../../services/aiGameService.js';

export default {
  name: 'AILearningGame',
  setup() {
    // Initialize AI Game Service for dynamic question generation
    const aiGameService = new AIGameService();
    
    // Game state management
    const gameState = ref('menu'); // 'menu', 'playing', 'results'
    const currentChallenge = ref(null);
    const activeZone = ref(null);
    const draggedItem = ref(null);
    const challengeStartTime = ref(null);
    const challengeTime = ref(0);

    // New features: Level selector and question generation
    const selectedLevel = ref('beginner'); // Current difficulty level
    const isGeneratingQuestions = ref(false); // Loading state for question generation

    // Game statistics
    const gameStats = reactive({
      score: 0,
      level: 1,
      streak: 0,
      totalChallenges: 0,
      completedChallenges: 0
    });

    // Feedback system
    const showFeedback = ref(false);
    const feedbackType = ref('');
    const feedbackTitle = ref('');
    const feedbackMessage = ref('');

    // Achievement system
    const showAchievement = ref(false);
    const achievementText = ref('');

    // Results tracking
    const lastChallengeScore = ref(0);
    const lastChallengeAccuracy = ref(0);

    // Available challenges with drag-and-drop content
    const availableChallenges = ref([
      {
        id: 'vue-basics',
        title: 'Vue Fundamentals',
        description: 'Match Vue concepts with their descriptions',
        icon: '🧱',
        difficulty: 1,
        unlocked: true,
        completed: false,
        instruction: 'Match each Vue concept with its correct description',
        hint: 'Think about what each Vue feature does in a real application',
        draggableItems: [
          { id: 'reactive', text: 'reactive()', icon: '⚡', used: false, correct: false, incorrect: false },
          { id: 'ref', text: 'ref()', icon: '🔗', used: false, correct: false, incorrect: false },
          { id: 'computed', text: 'computed()', icon: '🧮', used: false, correct: false, incorrect: false },
          { id: 'watch', text: 'watch()', icon: '👁️', used: false, correct: false, incorrect: false }
        ],
        dropZones: [
          { 
            id: 'reactive-zone', 
            placeholder: 'Creates reactive objects', 
            icon: '📦',
            acceptedItem: 'reactive',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          },
          { 
            id: 'ref-zone', 
            placeholder: 'Creates reactive references', 
            icon: '🎯',
            acceptedItem: 'ref',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          },
          { 
            id: 'computed-zone', 
            placeholder: 'Creates derived values', 
            icon: '🔄',
            acceptedItem: 'computed',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          },
          { 
            id: 'watch-zone', 
            placeholder: 'Watches for changes', 
            icon: '👀',
            acceptedItem: 'watch',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          }
        ]
      },
      {
        id: 'component-lifecycle',
        title: 'Component Lifecycle',
        description: 'Order the Vue component lifecycle hooks',
        icon: '🔄',
        difficulty: 2,
        unlocked: false,
        completed: false,
        instruction: 'Arrange the lifecycle hooks in the correct order',
        hint: 'Think about when each hook runs during component creation and updates',
        draggableItems: [
          { id: 'created', text: 'created()', icon: '🏗️', used: false, correct: false, incorrect: false },
          { id: 'mounted', text: 'mounted()', icon: '🎯', used: false, correct: false, incorrect: false },
          { id: 'updated', text: 'updated()', icon: '🔄', used: false, correct: false, incorrect: false },
          { id: 'unmounted', text: 'unmounted()', icon: '🗑️', used: false, correct: false, incorrect: false }
        ],
        dropZones: [
          { 
            id: 'first', 
            placeholder: 'First lifecycle hook', 
            icon: '1️⃣',
            acceptedItem: 'created',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          },
          { 
            id: 'second', 
            placeholder: 'Second lifecycle hook', 
            icon: '2️⃣',
            acceptedItem: 'mounted',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          },
          { 
            id: 'third', 
            placeholder: 'Third lifecycle hook', 
            icon: '3️⃣',
            acceptedItem: 'updated',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          },
          { 
            id: 'fourth', 
            placeholder: 'Fourth lifecycle hook', 
            icon: '4️⃣',
            acceptedItem: 'unmounted',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          }
        ]
      },
      {
        id: 'directives',
        title: 'Vue Directives',
        description: 'Match directives with their use cases',
        icon: '🎭',
        difficulty: 2,
        unlocked: false,
        completed: false,
        instruction: 'Match each Vue directive with its correct use case',
        hint: 'Consider what each directive does to DOM elements',
        draggableItems: [
          { id: 'v-if', text: 'v-if', icon: '❓', used: false, correct: false, incorrect: false },
          { id: 'v-for', text: 'v-for', icon: '🔁', used: false, correct: false, incorrect: false },
          { id: 'v-model', text: 'v-model', icon: '🔗', used: false, correct: false, incorrect: false },
          { id: 'v-on', text: 'v-on', icon: '👂', used: false, correct: false, incorrect: false }
        ],
        dropZones: [
          { 
            id: 'conditional', 
            placeholder: 'Conditional rendering', 
            icon: '🔀',
            acceptedItem: 'v-if',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          },
          { 
            id: 'loops', 
            placeholder: 'List rendering', 
            icon: '📋',
            acceptedItem: 'v-for',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          },
          { 
            id: 'binding', 
            placeholder: 'Two-way data binding', 
            icon: '↔️',
            acceptedItem: 'v-model',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          },
          { 
            id: 'events', 
            placeholder: 'Event handling', 
            icon: '⚡',
            acceptedItem: 'v-on',
            filled: false,
            correct: false,
            incorrect: false,
            filledItem: null
          }
        ]
      }
    ]);

    // Computed properties
    const challengeProgress = computed(() => {
      if (!currentChallenge.value) return 0;
      const totalZones = currentChallenge.value.dropZones.length;
      const filledZones = currentChallenge.value.dropZones.filter(zone => zone.filled).length;
      return Math.round((filledZones / totalZones) * 100);
    });

    const canCheckSolution = computed(() => {
      if (!currentChallenge.value) return false;
      return currentChallenge.value.dropZones.every(zone => zone.filled);
    });

    // Touch support state
    const touchedItem = ref(null);
    const isDragging = ref(false);
    const touchStartPos = ref({ x: 0, y: 0 });
    const currentTouchZone = ref(null);

    // Drag and drop methods
    const onDragStart = (event, item) => {
      draggedItem.value = item;
      event.dataTransfer.effectAllowed = 'move';
      event.target.classList.add('dragging');
    };

    const onDragEnd = (event) => {
      event.target.classList.remove('dragging');
      draggedItem.value = null;
    };

    const onDragOver = (zone) => {
      activeZone.value = zone.id;
    };

    const onDragLeave = () => {
      activeZone.value = null;
    };

    const onDrop = (event, zone) => {
      event.preventDefault();
      activeZone.value = null;

      if (!draggedItem.value || zone.filled) return;

      // Fill the zone with the dragged item
      zone.filled = true;
      zone.filledItem = { ...draggedItem.value };
      draggedItem.value.used = true;

      // Provide immediate visual feedback
      provideFeedback('info', 'Item Placed', 'Good! Now complete the rest and check your solution.');
    };

    // Touch event handlers for mobile support
    const onTouchStart = (event, item) => {
      if (item.used) return;
      
      event.preventDefault();
      touchedItem.value = item;
      isDragging.value = false;
      
      const touch = event.touches[0];
      touchStartPos.value = { x: touch.clientX, y: touch.clientY };
      
      // Add visual feedback
      event.target.classList.add('touch-dragging');
      
      // Haptic feedback on supported devices
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    };

    const onTouchMove = (event) => {
      if (!touchedItem.value) return;
      
      event.preventDefault();
      const touch = event.touches[0];
      const deltaX = Math.abs(touch.clientX - touchStartPos.value.x);
      const deltaY = Math.abs(touch.clientY - touchStartPos.value.y);
      
      // Start dragging if moved more than 10px
      if (!isDragging.value && (deltaX > 10 || deltaY > 10)) {
        isDragging.value = true;
        draggedItem.value = touchedItem.value;
      }
      
      if (isDragging.value) {
        // Find the element under the touch point
        const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
        const dropZone = elementBelow?.closest('.drop-zone');
        
        if (dropZone) {
          const zoneId = dropZone.dataset.zoneId;
          if (zoneId) {
            activeZone.value = zoneId;
            currentTouchZone.value = currentChallenge.value.dropZones.find(z => z.id === zoneId);
          }
        } else {
          activeZone.value = null;
          currentTouchZone.value = null;
        }
        
        // Move the item visually (create a ghost element)
        createTouchGhost(touch, touchedItem.value);
      }
    };

    const onTouchEnd = (event) => {
      if (!touchedItem.value) return;
      
      event.preventDefault();
      
      // Remove visual feedback
      const draggedElement = document.querySelector('.touch-dragging');
      if (draggedElement) {
        draggedElement.classList.remove('touch-dragging');
      }
      
      // Remove ghost element
      removeTouchGhost();
      
      if (isDragging.value && currentTouchZone.value && !currentTouchZone.value.filled) {
        // Complete the drop
        const zone = currentTouchZone.value;
        zone.filled = true;
        zone.filledItem = { ...touchedItem.value };
        touchedItem.value.used = true;
        
        // Haptic feedback for successful drop
        if (navigator.vibrate) {
          navigator.vibrate([50, 50, 50]);
        }
        
        provideFeedback('info', 'Item Placed', 'Good! Now complete the rest and check your solution.');
      }
      
      // Reset touch state
      touchedItem.value = null;
      isDragging.value = false;
      draggedItem.value = null;
      activeZone.value = null;
      currentTouchZone.value = null;
    };

    const onTouchEnter = (zone) => {
      if (isDragging.value) {
        activeZone.value = zone.id;
        currentTouchZone.value = zone;
      }
    };

    const onTouchLeave = () => {
      if (isDragging.value) {
        activeZone.value = null;
        currentTouchZone.value = null;
      }
    };

    // Helper function to create visual feedback during touch drag
    const createTouchGhost = (touch, item) => {
      // Remove existing ghost
      removeTouchGhost();
      
      const ghost = document.createElement('div');
      ghost.className = 'touch-ghost';
      ghost.innerHTML = `
        <div class="item-content">
          <div class="item-icon">${item.icon}</div>
          <div class="item-text">${item.text}</div>
        </div>
      `;
      
      ghost.style.position = 'fixed';
      ghost.style.left = `${touch.clientX - 50}px`;
      ghost.style.top = `${touch.clientY - 25}px`;
      ghost.style.zIndex = '10000';
      ghost.style.pointerEvents = 'none';
      ghost.style.opacity = '0.8';
      ghost.style.transform = 'scale(0.9)';
      ghost.style.backgroundColor = 'white';
      ghost.style.border = '2px solid #667eea';
      ghost.style.borderRadius = '12px';
      ghost.style.padding = '8px 12px';
      ghost.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
      
      document.body.appendChild(ghost);
    };

    const removeTouchGhost = () => {
      const ghost = document.querySelector('.touch-ghost');
      if (ghost) {
        ghost.remove();
      }
    };

    const removeFromZone = (zone) => {
      if (!zone.filled) return;

      // Find the original item and mark it as unused
      const originalItem = currentChallenge.value.draggableItems.find(
        item => item.id === zone.filledItem.id
      );
      if (originalItem) {
        originalItem.used = false;
        originalItem.correct = false;
        originalItem.incorrect = false;
      }

      // Clear the zone
      zone.filled = false;
      zone.filledItem = null;
      zone.correct = false;
      zone.incorrect = false;
    };

    // Game logic methods
    const startChallenge = (challenge) => {
      currentChallenge.value = { ...challenge };
      // Reset all items and zones
      currentChallenge.value.draggableItems.forEach(item => {
        item.used = false;
        item.correct = false;
        item.incorrect = false;
      });
      currentChallenge.value.dropZones.forEach(zone => {
        zone.filled = false;
        zone.filledItem = null;
        zone.correct = false;
        zone.incorrect = false;
      });
      
      challengeStartTime.value = Date.now();
      gameState.value = 'playing';
      hideFeedback();
    };

    const checkSolution = () => {
      let correctCount = 0;
      const totalZones = currentChallenge.value.dropZones.length;

      // Check each zone
      currentChallenge.value.dropZones.forEach(zone => {
        const isCorrect = zone.filledItem && zone.filledItem.id === zone.acceptedItem;
        
        if (isCorrect) {
          zone.correct = true;
          zone.incorrect = false;
          zone.filledItem.correct = true;
          zone.filledItem.incorrect = false;
          correctCount++;
        } else {
          zone.correct = false;
          zone.incorrect = true;
          if (zone.filledItem) {
            zone.filledItem.correct = false;
            zone.filledItem.incorrect = true;
          }
        }
      });

      // Calculate results
      const accuracy = Math.round((correctCount / totalZones) * 100);
      const timeBonus = Math.max(0, 300 - Math.floor((Date.now() - challengeStartTime.value) / 1000));
      const score = (correctCount * 100) + timeBonus;

      lastChallengeScore.value = score;
      lastChallengeAccuracy.value = accuracy;
      challengeTime.value = Math.floor((Date.now() - challengeStartTime.value) / 1000);

      if (correctCount === totalZones) {
        // Perfect score!
        gameStats.score += score;
        gameStats.streak++;
        
        // Mark challenge as completed
        const originalChallenge = availableChallenges.value.find(c => c.id === currentChallenge.value.id);
        if (originalChallenge) {
          originalChallenge.completed = true;
        }

        // Unlock next challenge
        unlockNextChallenge();

        provideFeedback('success', 'Perfect!', `Amazing work! You got everything right and earned ${score} points!`);
        
        setTimeout(() => {
          gameState.value = 'results';
        }, 2000);
      } else {
        provideFeedback('error', 'Not quite right', `You got ${correctCount} out of ${totalZones} correct. Try adjusting the incorrect items!`);
      }
    };

    const resetChallenge = () => {
      if (!currentChallenge.value) return;

      // Reset all items and zones
      currentChallenge.value.draggableItems.forEach(item => {
        item.used = false;
        item.correct = false;
        item.incorrect = false;
      });
      
      currentChallenge.value.dropZones.forEach(zone => {
        zone.filled = false;
        zone.filledItem = null;
        zone.correct = false;
        zone.incorrect = false;
      });

      hideFeedback();
      challengeStartTime.value = Date.now();
    };

    const getHint = () => {
      const unfilledZones = currentChallenge.value.dropZones.filter(zone => !zone.filled);
      if (unfilledZones.length > 0) {
        const randomZone = unfilledZones[Math.floor(Math.random() * unfilledZones.length)];
        const correctItem = currentChallenge.value.draggableItems.find(item => item.id === randomZone.acceptedItem);
        
        provideFeedback('info', 'Hint', `Try placing "${correctItem.text}" in the "${randomZone.placeholder}" zone!`);
      }
    };

    const unlockNextChallenge = () => {
      const currentIndex = availableChallenges.value.findIndex(c => c.id === currentChallenge.value.id);
      if (currentIndex < availableChallenges.value.length - 1) {
        availableChallenges.value[currentIndex + 1].unlocked = true;
        showAchievementPopup(`New challenge unlocked: ${availableChallenges.value[currentIndex + 1].title}!`);
      }
    };

    const nextChallenge = () => {
      const currentIndex = availableChallenges.value.findIndex(c => c.id === currentChallenge.value.id);
      if (currentIndex < availableChallenges.value.length - 1 && availableChallenges.value[currentIndex + 1].unlocked) {
        startChallenge(availableChallenges.value[currentIndex + 1]);
      } else {
        gameState.value = 'menu';
      }
    };

    // Feedback system
    const provideFeedback = (type, title, message) => {
      feedbackType.value = type;
      feedbackTitle.value = title;
      feedbackMessage.value = message;
      showFeedback.value = true;

      if (type !== 'error') {
        setTimeout(hideFeedback, 3000);
      }
    };

    const hideFeedback = () => {
      showFeedback.value = false;
    };

    const showAchievementPopup = (text) => {
      achievementText.value = text;
      showAchievement.value = true;
      setTimeout(() => {
        showAchievement.value = false;
      }, 4000);
    };

    // New Methods for Level Selection and Question Generation
    
    /**
     * Handle level change - updates difficulty and regenerates questions
     * @param {Event} event - The select change event
     */
    const onLevelChange = async () => {
      // Update AI service user profile with new level
      aiGameService.userProfile.currentLevel = selectedLevel.value;
      aiGameService.userProfile.preferredDifficulty = selectedLevel.value;
      
      // Show feedback about level change
      provideFeedback('info', 'Level Updated!', 
        `Difficulty set to ${selectedLevel.value.charAt(0).toUpperCase() + selectedLevel.value.slice(1)}. Questions will now match your selected level!`);
      
      // Unlock challenges based on level
      updateChallengeAvailability();
    };

    /**
     * Generate new questions using OpenAI API based on current level
     * This creates fresh drag-and-drop challenges dynamically
     */
    const generateNewQuestions = async () => {
      try {
        isGeneratingQuestions.value = true;

        // Notify the user we're working on it
        provideFeedback(
          'info',
          'Generating Questions...',
          '🤖 AI is brewing up fresh Vue challenges for you. This will only take a moment!'
        );

        // Step 1: Get the topics we need for the selected level
        const challengeTypes = getDifficultyBasedChallengeTypes(selectedLevel.value);

        // Step 2: Ask the AI service to create challenges for these topics in parallel
        const rawChallenges = await aiGameService.generateChallengesBatch(
          challengeTypes,
          selectedLevel.value,
          {
            currentLevel: selectedLevel.value,
            completedChallenges: gameStats.completedChallenges,
            userStrengths: aiGameService.userProfile.strengths
          }
        );

        // Step 3: Convert the AI payloads into our drag-and-drop game format
        const newChallenges = rawChallenges.map((aiChallenge) => {
          // The meta information (icon / title) we passed in earlier is returned in _meta
          const meta = aiChallenge._meta || { topic: 'vue-basics', icon: '🧱', title: 'Vue Challenge' };
          return convertToDragDropFormat(aiChallenge, meta);
        });

        // Step 4: Post-process (unlock logic etc.)
        if (newChallenges.length === 0) {
          throw new Error('No challenges generated by AI');
        }

        newChallenges.forEach((challenge, index) => {
          challenge.unlocked = index === 0 || gameStats.completedChallenges >= index;
          challenge.completed = false;
        });

        availableChallenges.value = newChallenges;

        provideFeedback(
          'success',
          'New Questions Ready!',
          `🎉 ${newChallenges.length} brand-new ${selectedLevel.value}-level challenges await. Good luck!`
        );
      } catch (error) {
        console.error('generateNewQuestions failed:', error);
        provideFeedback(
          'error',
          'Generation Failed',
          '😅 The AI encountered an issue preparing new questions. Please try again shortly or play existing challenges.'
        );
      } finally {
        isGeneratingQuestions.value = false;
      }
    };

    /**
     * Get challenge types based on difficulty level
     * Each level focuses on different Vue concepts
     */
    const getDifficultyBasedChallengeTypes = (level) => {
      const challengeMap = {
        'beginner': [
          { topic: 'vue-basics', icon: '🧱', title: 'Vue Fundamentals' },
          { topic: 'templates', icon: '📝', title: 'Templates & Directives' },
          { topic: 'data-binding', icon: '🔗', title: 'Data Binding' }
        ],
        'intermediate': [
          { topic: 'component-communication', icon: '📡', title: 'Component Communication' },
          { topic: 'lifecycle-hooks', icon: '🔄', title: 'Lifecycle Hooks' },
          { topic: 'composition-api', icon: '🧪', title: 'Composition API' }
        ],
        'advanced': [
          { topic: 'custom-directives', icon: '🎨', title: 'Custom Directives' },
          { topic: 'performance-optimization', icon: '⚡', title: 'Performance' },
          { topic: 'advanced-patterns', icon: '🏗️', title: 'Advanced Patterns' }
        ],
        'expert': [
          { topic: 'vue-internals', icon: '🔬', title: 'Vue Internals' },
          { topic: 'plugin-development', icon: '🔌', title: 'Plugin Development' },
          { topic: 'ssr-advanced', icon: '🌐', title: 'Advanced SSR' }
        ],
        'mr-robot': [
          { topic: 'vue-source-code', icon: '👾', title: 'Vue Source Deep Dive' },
          { topic: 'compiler-internals', icon: '🤖', title: 'Compiler Internals' },
          { topic: 'reactivity-system', icon: '⚛️', title: 'Reactivity System' }
        ]
      };
      
      return challengeMap[level] || challengeMap['beginner'];
    };

    /**
     * Convert AI-generated challenge to drag-and-drop format
     * This transforms the AI response into our game's expected structure
     */
    const convertToDragDropFormat = (aiChallenge, challengeType) => {
      return {
        id: aiChallenge.id || `${challengeType.topic}-${Date.now()}`,
        title: aiChallenge.title || challengeType.title,
        description: aiChallenge.objective || aiChallenge.description,
        icon: challengeType.icon,
        difficulty: aiChallenge.difficulty || getDifficultyNumber(selectedLevel.value),
        unlocked: false,
        completed: false,
        instruction: aiChallenge.instructions?.[0] || `Complete the ${challengeType.topic} challenge`,
        hint: aiChallenge.hints?.[0] || `Think about ${challengeType.topic} concepts in Vue`,
        
        // Generate draggable items from AI challenge content
        draggableItems: generateDraggableItems(aiChallenge, challengeType.topic),
        
        // Generate drop zones from AI challenge content
        dropZones: generateDropZones(aiChallenge, challengeType.topic)
      };
    };
    
    /**
     * Generate draggable items from AI challenge content
     */
    const generateDraggableItems = (aiChallenge, topic) => {
      // Extract concepts from AI challenge or use defaults
      const concepts = aiChallenge.concepts || getDefaultConcepts(topic);
      
      return concepts.map((concept, index) => ({
        id: `item-${index}`,
        text: concept,
        icon: getConceptIcon(concept),
        used: false,
        correct: false,
        incorrect: false
      }));
    };

    /**
     * Generate drop zones from AI challenge content
     */
    const generateDropZones = (aiChallenge, topic) => {
      const testCases = aiChallenge.testCases || getDefaultTestCases(topic);
      
      return testCases.map((testCase, index) => ({
        id: `zone-${index}`,
        placeholder: testCase.description || `Drop zone ${index + 1}`,
        icon: getZoneIcon(index),
        acceptedItem: `item-${index}`,
        filled: false,
        correct: false,
        incorrect: false,
        filledItem: null
      }));
    };

    /**
     * Update challenge availability based on current level
     */
    const updateChallengeAvailability = () => {
      const levelOrder = ['beginner', 'intermediate', 'advanced', 'expert', 'mr-robot'];
      const currentLevelIndex = levelOrder.indexOf(selectedLevel.value);
      
      availableChallenges.value.forEach((challenge, index) => {
        // Unlock challenges based on level and progress
        challenge.unlocked = index <= currentLevelIndex + gameStats.completedChallenges;
      });
    };

    // Helper functions for drag-drop generation
    const getDifficultyNumber = (level) => {
      const difficultyMap = { 'beginner': 1, 'intermediate': 2, 'advanced': 3, 'expert': 4, 'mr-robot': 5 };
      return difficultyMap[level] || 1;
    };

    const getConceptIcon = (concept) => {
      const iconMap = {
        'reactive': '⚡', 'ref': '🔗', 'computed': '🧮', 'watch': '👁️',
        'component': '🧩', 'props': '📦', 'emit': '📡', 'slot': '🎰',
        'lifecycle': '🔄', 'mounted': '🎯', 'updated': '🔄', 'unmounted': '🗑️'
      };
      return iconMap[concept.toLowerCase()] || '🔹';
    };

    const getZoneIcon = (index) => {
      const icons = ['🎯', '📦', '🔄', '⚡', '🧩', '📡', '🎰', '🔬'];
      return icons[index] || '🔹';
    };

    const getDefaultConcepts = (topic) => {
      const conceptMap = {
        'vue-basics': ['reactive()', 'ref()', 'computed()', 'watch()'],
        'templates': ['v-if', 'v-for', 'v-model', 'v-show'],
        'data-binding': ['{{ }}', 'v-bind', ':class', ':style'],
        'component-communication': ['props', 'emit', 'provide', 'inject'],
        'lifecycle-hooks': ['onMounted', 'onUpdated', 'onBeforeMount', 'onUnmounted']
      };
      return conceptMap[topic] || ['concept1', 'concept2', 'concept3', 'concept4'];
    };

    const getDefaultTestCases = (topic) => {
      return [
        { description: 'Primary concept usage' },
        { description: 'Secondary concept application' },
        { description: 'Advanced concept implementation' },
        { description: 'Best practice example' }
      ];
    };

    // Utility methods
    const formatTime = (seconds) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Initialize game
    onMounted(() => {
      // Load saved progress
      const savedStats = localStorage.getItem('vue-game-stats');
      if (savedStats) {
        Object.assign(gameStats, JSON.parse(savedStats));
      }

      const savedChallenges = localStorage.getItem('vue-game-challenges');
      if (savedChallenges) {
        const saved = JSON.parse(savedChallenges);
        availableChallenges.value.forEach(challenge => {
          const savedChallenge = saved.find(s => s.id === challenge.id);
          if (savedChallenge) {
            challenge.unlocked = savedChallenge.unlocked;
            challenge.completed = savedChallenge.completed;
          }
        });
      }
    });

         // Save progress when stats change
     watch(gameStats, () => {
      localStorage.setItem('vue-game-stats', JSON.stringify(gameStats));
    }, { deep: true });

    watch(availableChallenges, () => {
      const challengeProgress = availableChallenges.value.map(c => ({
        id: c.id,
        unlocked: c.unlocked,
        completed: c.completed
      }));
      localStorage.setItem('vue-game-challenges', JSON.stringify(challengeProgress));
    }, { deep: true });

    return {
      // State
      gameState,
      currentChallenge,
      activeZone,
      gameStats,
      availableChallenges,
      showFeedback,
      feedbackType,
      feedbackTitle,
      feedbackMessage,
      showAchievement,
      achievementText,
      lastChallengeScore,
      lastChallengeAccuracy,
      challengeTime,
      
      // New state for level selection and question generation
      selectedLevel,
      isGeneratingQuestions,

      // Computed
      challengeProgress,
      canCheckSolution,

      // Methods
      startChallenge,
      onDragStart,
      onDragEnd,
      onDragOver,
      onDragLeave,
      onDrop,
      removeFromZone,
      checkSolution,
      resetChallenge,
      getHint,
      nextChallenge,
      formatTime,
      
      // Touch methods for mobile support
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchEnter,
      onTouchLeave,
      
      // New methods for level selection and question generation
      onLevelChange,
      generateNewQuestions
    };
  }
};
</script>

<style scoped>
/* AI Learning Game - Modern Drag & Drop Styles */

.ai-learning-game {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Game Header */
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 24px 32px;
  margin-bottom: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  gap: 20px;
}

.game-title-section {
  flex: 1;
  min-width: 300px;
}

.game-title {
  font-size: 32px;
  font-weight: 800;
  color: #2d3748;
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  font-size: 36px;
}

.game-subtitle {
  font-size: 16px;
  color: #718096;
  margin: 0;
}

/* Game Controls - Level Selector and Generate Button */
.game-controls {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.level-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.level-label {
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  white-space: nowrap;
}

.level-select {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;
}

.level-select:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

.level-select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.level-select option {
  background: white;
  color: #2d3748;
  padding: 8px;
}

.generate-btn {
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  justify-content: center;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(72, 187, 120, 0.3);
}

.generate-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.generate-btn.generating {
  background: linear-gradient(135deg, #ed8936, #dd6b20);
}

.generate-btn.generating .btn-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.btn-icon {
  font-size: 16px;
}

.player-stats {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 16px 20px;
  border-radius: 16px;
  min-width: 100px;
}

.stat-icon {
  font-size: 24px;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Game Area */
.game-area {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Level Menu */
.menu-title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  color: #2d3748;
  margin-bottom: 32px;
}

.challenge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.challenge-card {
  background: white;
  border: 3px solid transparent;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.challenge-card:hover:not(.challenge-locked) {
  border-color: #667eea;
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
}

.challenge-card.challenge-locked {
  opacity: 0.6;
  cursor: not-allowed;
}

.challenge-card.challenge-completed {
  border-color: #48bb78;
  background: linear-gradient(135deg, #f0fff4, #c6f6d5);
}

.challenge-icon {
  font-size: 48px;
  text-align: center;
  margin-bottom: 16px;
}

.challenge-title {
  font-size: 20px;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 8px 0;
}

.challenge-description {
  color: #718096;
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.challenge-difficulty {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.star {
  color: #ffd700;
}

.challenge-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.challenge-badge.completed {
  background: #48bb78;
  color: white;
}

.challenge-badge.locked {
  background: #e2e8f0;
  color: #718096;
}

/* Challenge Area */
.challenge-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e2e8f0;
}

.back-btn {
  background: #e2e8f0;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s ease;
}

.back-btn:hover {
  background: #cbd5e0;
}

.current-challenge-title {
  font-size: 24px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.challenge-progress {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  width: 150px;
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 14px;
  font-weight: 500;
  color: #718096;
}

/* Challenge Instructions */
.challenge-instructions {
  margin-bottom: 32px;
}

.instruction-card {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 20px;
  border-radius: 12px;
}

.instruction-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.instruction-text {
  margin: 0;
  opacity: 0.9;
}

/* Drag and Drop Container */
.drag-drop-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 32px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 16px 0;
}

/* Draggable Items */
.items-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.draggable-item {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  cursor: grab;
  transition: all 0.2s ease;
  user-select: none;
  touch-action: none; /* Prevent default touch behavior */
  position: relative;
}

.draggable-item:hover:not(.item-used) {
  border-color: #667eea;
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15);
}

.draggable-item.dragging {
  opacity: 0.5;
  transform: rotate(5deg);
}

/* Touch dragging state for mobile */
.draggable-item.touch-dragging {
  opacity: 0.7;
  transform: scale(1.05);
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.25);
  z-index: 1000;
}

.draggable-item.item-used {
  opacity: 0.5;
  cursor: not-allowed;
}

.draggable-item.item-correct {
  border-color: #48bb78;
  background: #f0fff4;
}

.draggable-item.item-incorrect {
  border-color: #f56565;
  background: #fed7d7;
}

/* Touch ghost element for mobile drag feedback */
.touch-ghost {
  background: white;
  border: 2px solid #667eea;
  border-radius: 12px;
  padding: 8px 12px;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  pointer-events: none;
  opacity: 0.8;
  transform: scale(0.9);
  z-index: 10000;
}

.touch-ghost .item-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.touch-ghost .item-icon {
  font-size: 16px;
}

.touch-ghost .item-text {
  font-size: 14px;
  font-weight: 500;
  color: #2d3748;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-icon {
  font-size: 20px;
}

.item-text {
  font-weight: 500;
  color: #2d3748;
}

/* Drop Zones */
.zones-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.drop-zone {
  background: #f7fafc;
  border: 3px dashed #cbd5e0;
  border-radius: 12px;
  padding: 20px;
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
}

.drop-zone.zone-active {
  border-color: #667eea;
  background: #ebf4ff;
}

.drop-zone.zone-filled {
  border-style: solid;
  background: white;
}

.drop-zone.zone-correct {
  border-color: #48bb78;
  background: #f0fff4;
}

.drop-zone.zone-incorrect {
  border-color: #f56565;
  background: #fed7d7;
}

.zone-placeholder {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #a0aec0;
  text-align: center;
}

.placeholder-icon {
  font-size: 24px;
}

.placeholder-text {
  font-weight: 500;
}

.zone-content {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.filled-icon {
  font-size: 20px;
}

.filled-text {
  font-weight: 500;
  color: #2d3748;
  flex: 1;
}

.remove-btn {
  background: #fed7d7;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: #f56565;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.remove-btn:hover {
  background: #f56565;
  color: white;
}

/* Challenge Actions */
.challenge-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  padding-top: 24px;
  border-top: 2px solid #e2e8f0;
}

.action-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.primary {
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
}

.action-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
}

.action-btn.secondary {
  background: #e2e8f0;
  color: #2d3748;
}

.action-btn.secondary:hover {
  background: #cbd5e0;
}

.action-btn.hint {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}

.action-btn.hint:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Feedback Area */
.feedback-area {
  margin-top: 24px;
}

.feedback-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  border-radius: 12px;
  animation: slideIn 0.3s ease-out;
}

.feedback-card.success {
  background: #f0fff4;
  border: 2px solid #48bb78;
}

.feedback-card.error {
  background: #fed7d7;
  border: 2px solid #f56565;
}

.feedback-card.info {
  background: #ebf4ff;
  border: 2px solid #4299e1;
}

.feedback-icon {
  font-size: 24px;
}

.feedback-content {
  flex: 1;
}

.feedback-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #2d3748;
}

.feedback-message {
  margin: 0;
  color: #4a5568;
}

/* Results Screen */
.results-screen {
  text-align: center;
  padding: 40px 20px;
}

.results-content {
  max-width: 500px;
  margin: 0 auto;
}

.results-icon {
  font-size: 64px;
  margin-bottom: 24px;
}

.results-title {
  font-size: 32px;
  font-weight: 700;
  color: #2d3748;
  margin: 0 0 32px 0;
}

.results-stats {
  background: #f7fafc;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
}

.result-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 16px;
}

.result-stat:last-child {
  margin-bottom: 0;
}

.result-label {
  color: #718096;
}

.result-value {
  font-weight: 600;
  color: #2d3748;
}

.results-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

/* Achievement Popup */
.achievement-popup {
  position: fixed;
  top: 24px;
  right: 24px;
  background: linear-gradient(135deg, #ffd700, #ffa500);
  color: white;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
  z-index: 1000;
  animation: bounceIn 0.5s ease-out;
}

.achievement-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.achievement-icon {
  font-size: 32px;
}

.achievement-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.achievement-text {
  margin: 0;
  opacity: 0.9;
}

/* Animations */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: translateX(100%) scale(0.3);
  }
  50% {
    opacity: 1;
    transform: translateX(-10px) scale(1.05);
  }
  70% {
    transform: translateX(5px) scale(0.95);
  }
  100% {
    transform: translateX(0) scale(1);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .ai-learning-game {
    padding: 12px;
  }
  
  .game-header {
    flex-direction: column;
    gap: 16px;
    text-align: center;
    padding: 20px 24px;
  }
  
  .game-title {
    font-size: 24px;
  }
  
  .game-subtitle {
    font-size: 14px;
  }
  
  .player-stats {
    justify-content: center;
    gap: 12px;
  }
  
  .stat-card {
    padding: 12px 16px;
    min-width: 80px;
  }
  
  .stat-number {
    font-size: 20px;
  }
  
  .stat-label {
    font-size: 12px;
  }
  
  /* Make challenge header more compact */
  .challenge-header {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
  
  .current-challenge-title {
    font-size: 20px;
    text-align: center;
  }
  
  .challenge-progress {
    justify-content: center;
  }
  
  /* Single column layout for drag-drop */
  .drag-drop-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .section-title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 12px;
  }
  
  /* Make draggable items more touch-friendly */
  .draggable-item {
    padding: 18px;
    margin: 0 4px;
    min-height: 60px;
    display: flex;
    align-items: center;
  }
  
  .item-content {
    gap: 16px;
  }
  
  .item-icon {
    font-size: 24px;
  }
  
  .item-text {
    font-size: 16px;
    line-height: 1.3;
  }
  
  /* Make drop zones more touch-friendly */
  .drop-zone {
    min-height: 80px;
    padding: 20px;
    margin: 0 4px;
  }
  
  .zone-placeholder {
    flex-direction: column;
    gap: 8px;
  }
  
  .placeholder-icon {
    font-size: 28px;
  }
  
  .placeholder-text {
    font-size: 14px;
    text-align: center;
    line-height: 1.3;
  }
  
  .zone-content {
    justify-content: space-between;
  }
  
  .filled-icon {
    font-size: 24px;
  }
  
  .filled-text {
    font-size: 16px;
  }
  
  .remove-btn {
    width: 32px;
    height: 32px;
    font-size: 18px;
  }
  
  /* Challenge actions */
  .challenge-actions {
    flex-direction: column;
    gap: 12px;
  }
  
  .action-btn {
    padding: 16px 24px;
    font-size: 16px;
  }
  
  /* Instructions */
  .instruction-card {
    padding: 16px;
  }
  
  .instruction-title {
    font-size: 16px;
  }
  
  .instruction-text {
    font-size: 14px;
  }
  
  /* Feedback */
  .feedback-popup {
    left: 12px;
    right: 12px;
    top: 12px;
  }
  
  .achievement-popup {
    left: 12px;
    right: 12px;
    top: 12px;
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .ai-learning-game {
    padding: 8px;
  }
  
  .game-header {
    padding: 16px;
    gap: 12px;
  }
  
  .game-title {
    font-size: 20px;
  }
  
  .player-stats {
    flex-direction: column;
    gap: 8px;
  }
  
  .stat-card {
    padding: 10px 12px;
  }
  
  .draggable-item {
    padding: 16px;
  }
  
  .item-icon {
    font-size: 20px;
  }
  
  .item-text {
    font-size: 14px;
  }
  
  .drop-zone {
    min-height: 70px;
    padding: 16px;
  }
  
  .placeholder-icon {
    font-size: 24px;
  }
  
  .placeholder-text {
    font-size: 12px;
  }
  
  .filled-icon {
    font-size: 20px;
  }
  
  .filled-text {
    font-size: 14px;
  }
  
  .action-btn {
    padding: 14px 20px;
    font-size: 14px;
  }
}

/* Landscape orientation optimizations */
@media (max-width: 768px) and (orientation: landscape) {
  .drag-drop-container {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  .challenge-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .current-challenge-title {
    text-align: left;
  }
}

/* Touch-specific improvements */
@media (hover: none) and (pointer: coarse) {
  .draggable-item {
    min-height: 64px; /* Minimum touch target size */
  }
  
  .drop-zone {
    min-height: 80px;
  }
  
  .action-btn {
    min-height: 48px;
  }
  
  .remove-btn {
    min-width: 36px;
    min-height: 36px;
  }
}
</style>