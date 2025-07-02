<!--
  Psychic Mirror Academy - Reactivity Playground with Mnemonic Learning
  
  This component transforms Vue reactivity learning into a memorable experience using:
  - Psychic Mirror Academy theme with mind-reading assistants
  - Animated visual mnemonics that reinforce the learning
  - Funny far-fetched associations that stick in memory
  - Interactive elements that demonstrate reactivity concepts
  
  Memory Association: Reactivity = Psychic mirrors with mind-reading assistants
  Visual Story: Magical mirrors that instantly reflect your thoughts with floating assistants
-->

<template>
  <div class="psychic-mirror-academy">
    <!-- Academy Header with Animated Elements -->
    <div class="academy-header">
      <div class="academy-title">
        <div class="psychic-icon">🔮</div>
        <div class="title-content">
          <h4>🏛️ Psychic Mirror Academy</h4>
          <p class="academy-subtitle">Where Mind-Reading Assistants Master the Art of Reactivity!</p>
        </div>
      </div>
      
      <!-- Memory Trigger Reminder -->
      <div class="memory-trigger">
        <strong>Remember:</strong> RE-ACTIVE = "Really Excited About Changes, Totally Instant!" ⚡
      </div>
    </div>

    <!-- Visual Story Section -->
    <div class="story-section">
      <div class="story-visual">
        <div class="psychic-mirrors">
          <!-- Main Psychic Mirror -->
          <div class="main-mirror" :class="{ 'glowing': count !== 0 }">
            <div class="mirror-face">🔮</div>
            <div class="mirror-reflection">
              <div class="reflection-text">Count: {{ count }}</div>
              <div class="reflection-computed">Doubled: {{ computedValue }}</div>
            </div>
          </div>
          
          <!-- Floating Mind-Reading Assistants -->
          <div class="assistants-container">
            <div 
              v-for="i in 3" 
              :key="i" 
              class="mind-reader-assistant" 
              :class="{ 'active': isAssistantActive(i) }"
              :style="{ animationDelay: `${i * 0.5}s` }"
            >
              👻
              <div class="thought-bubble" v-if="isAssistantActive(i)">
                {{ getAssistantThought(i) }}
              </div>
            </div>
          </div>
          
          <!-- Thought Bubbles Animation -->
          <div class="thought-bubbles">
            <div 
              v-for="bubble in activeBubbles" 
              :key="bubble.id"
              class="floating-thought"
              :style="{ 
                left: bubble.x + 'px', 
                top: bubble.y + 'px',
                animationDelay: bubble.delay + 's'
              }"
            >
              💭
            </div>
          </div>
        </div>
      </div>
      
      <div class="story-explanation">
        <h5>🎭 The Psychic Mirror Academy Story</h5>
        <p>
          Welcome to the most exclusive academy in the digital world! Here, magical mirrors learn to read minds 
          and predict the future. Each mirror has personal mind-reading assistants (ref() and reactive()!) 
          who sense even the tiniest thought changes. When you think "I want the counter to be 5," 
          your psychic assistant whispers to the mirror, and POOF! The reflection changes instantly! ✨
        </p>
      </div>
    </div>

    <!-- Interactive Psychic Mirror Controls -->
    <div class="mirror-controls">
      <div class="control-section">
        <h5>🎮 Train Your Psychic Mirror</h5>
        <p>Watch how your mind-reading assistants instantly update the mirror when you change values!</p>
        
        <div class="controls-grid">
          <!-- Counter Control with Psychic Assistant -->
          <div class="control-group psychic-counter">
            <label class="control-label">
              <span class="assistant-icon">👻</span>
              Personal Assistant (ref):
            </label>
            <div class="psychic-controls">
              <button @click="decrement" class="psychic-btn decrement-btn">
                <span class="btn-icon">➖</span>
                Think Smaller
              </button>
              <div class="psychic-display">
                <div class="mirror-mini">🔮</div>
                <span class="value">{{ count }}</span>
              </div>
              <button @click="increment" class="psychic-btn increment-btn">
                <span class="btn-icon">➕</span>
                Think Bigger
              </button>
            </div>
          </div>
          
          <!-- Multiplier Control -->
          <div class="control-group psychic-multiplier">
            <label class="control-label">
              <span class="assistant-icon">🧠</span>
              Team Manager (reactive):
            </label>
            <input 
              v-model.number="multiplier" 
              type="number" 
              class="psychic-input"
              placeholder="Enter multiplier..."
              @input="onMultiplierChange"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Psychic Predictions (Computed Properties) -->
    <div class="psychic-predictions">
      <h5>🔮 Crystal Ball Predictions (Computed Properties)</h5>
      <div class="predictions-grid">
        <div class="prediction-card" :class="{ 'active': computedValue !== 0 }">
          <div class="crystal-ball">🔮</div>
          <div class="prediction-content">
            <div class="prediction-label">Multiplied Value:</div>
            <div class="prediction-value">{{ computedValue }}</div>
          </div>
        </div>
        
        <div class="prediction-card" :class="{ 'active': count % 2 === 0 }">
          <div class="crystal-ball">🎱</div>
          <div class="prediction-content">
            <div class="prediction-label">Is Even:</div>
            <div class="prediction-value">{{ isEven ? 'Yes! ✨' : 'Nope! 🌟' }}</div>
          </div>
        </div>
        
        <div class="prediction-card" :class="{ 'active': status !== 'Zero' }">
          <div class="crystal-ball">⚡</div>
          <div class="prediction-content">
            <div class="prediction-label">Energy Status:</div>
            <div class="prediction-value">{{ status }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Memory Reinforcement Section -->
    <div class="memory-reinforcement">
      <div class="reinforcement-card">
        <div class="reinforcement-header">
          <span class="reinforcement-icon">🧠</span>
          <h5>Memory Booster!</h5>
        </div>
        <p class="reinforcement-text">
          <strong>Fun Fact:</strong> Vue's reactivity is faster than your reaction to someone eating your leftover pizza! 🍕
          The psychic assistants (ref & reactive) work 24/7 monitoring your data, just like obsessive pizza guards!
        </p>
        <div class="mnemonic-reminder">
          <strong>Mnemonic:</strong> When you see reactive code, picture psychic mirrors with floating ghost assistants! 👻🔮
        </div>
      </div>
    </div>

    <!-- Interactive Memory Test -->
    <div class="memory-test">
      <button @click="testMemory" class="test-button" :class="{ 'testing': isTesting }">
        {{ isTesting ? 'Reading Your Mind... 🔮' : 'Test Your Psychic Powers! 🧠' }}
      </button>
      <div v-if="showTestResult" class="test-result">
        {{ testMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

/**
 * 🔮 Reactive State Management - The Heart of Vue's Magic
 * 
 * In Vue 3's Composition API, we use special "mind-reading assistants" to make our data reactive:
 * 
 * 1. ref() - Personal Assistant
 *    - Perfect for simple values (numbers, strings, booleans)
 *    - Wraps the value in a reactive container
 *    - Requires .value to access/modify (like asking your assistant politely!)
 * 
 * 2. reactive() - Team Manager
 *    - Better for complex objects
 *    - Makes the entire object and its properties reactive
 *    - No .value needed (the manager is always watching!)
 */

// 📝 Simple Reactive Values using ref()
const count = ref(0)         // Personal assistant watching a number
const multiplier = ref(2)    // Another assistant watching another number
const isTesting = ref(false) // Assistant watching a boolean
const showTestResult = ref(false)
const testMessage = ref('')
const activeBubbles = ref([]) // Assistant watching an array

/**
 * 🔮 Computed Properties - Crystal Ball Predictions
 * 
 * Computed properties are like crystal balls that:
 * 1. Automatically recalculate when their dependencies change
 * 2. Cache their results until dependencies update
 * 3. Are read-only by default (you can't argue with a crystal ball!)
 */
const computedValue = computed(() => count.value * multiplier.value)
const isEven = computed(() => count.value % 2 === 0)
const status = computed(() => {
  if (count.value === 0) return 'Zero Energy 😴'
  if (count.value > 0) return 'Positive Vibes! ✨'
  return 'Negative Energy 🌙'
})

/**
 * 🎮 Methods - Training Your Psychic Powers
 * 
 * Methods in Vue components are regular JavaScript functions that:
 * 1. Can modify reactive state
 * 2. Trigger reactivity updates
 * 3. Handle user interactions
 */
const increment = () => {
  count.value++ // Politely ask the assistant to increase the value
  createThoughtBubble()
  triggerAssistantActivity()
}

const decrement = () => {
  count.value-- // Politely ask the assistant to decrease the value
  createThoughtBubble()
  triggerAssistantActivity()
}

const onMultiplierChange = () => {
  createThoughtBubble()
  triggerAssistantActivity()
}

/**
 * 👻 Visual Effects - Making the Magic Visible
 * 
 * These methods create visual feedback to help understand reactivity:
 * 1. Thought bubbles appear when data changes
 * 2. Assistants animate to show they're working
 * 3. Visual effects reinforce the learning metaphor
 */
const createThoughtBubble = () => {
  const bubble = {
    id: Date.now(),
    x: Math.random() * 300,
    y: Math.random() * 100,
    delay: Math.random() * 0.5
  }
  
  activeBubbles.value.push(bubble)
  
  // Cleanup after animation (memory management!)
  setTimeout(() => {
    activeBubbles.value = activeBubbles.value.filter(b => b.id !== bubble.id)
  }, 2000)
}

const triggerAssistantActivity = () => {
  // Trigger assistant animations when data changes
  const assistants = document.querySelectorAll('.mind-reader-assistant')
  assistants.forEach((assistant, index) => {
    setTimeout(() => {
      assistant.classList.add('active')
      setTimeout(() => {
        assistant.classList.remove('active')
      }, 1500)
    }, index * 200)
  })
}

const isAssistantActive = (assistantIndex) => {
  // Show different assistant thoughts based on which one is "active"
  return (count.value + multiplier.value) % 3 === assistantIndex - 1
}

const getAssistantThought = (assistantIndex) => {
  const thoughts = [
    "I sense a change! 👻",
    "The mirror must update! 🔮",
    "Reactivity is magic! ✨"
  ]
  return thoughts[assistantIndex - 1]
}

/**
 * 👀 Watchers - Stalker Mirrors
 * 
 * Watchers are like stalker mirrors that:
 * 1. Watch for changes in reactive values
 * 2. Perform side effects when changes occur
 * 3. Can access both old and new values
 * 
 * Unlike computed properties that return values,
 * watchers perform actions or side effects
 */
watch(count, (newCount, oldCount) => {
  console.log(`🔮 Psychic Mirror detected: Count changed from ${oldCount} to ${newCount}`)
})

watch(computedValue, (newValue) => {
  console.log(`🎱 Crystal Ball prediction updated: ${newValue}`)
})

/**
 * 🏛️ Lifecycle Hooks - Academy Schedule
 * 
 * Component lifecycle hooks are like the academy's daily schedule:
 * 1. onMounted = Opening ceremony (component is ready)
 * 2. onUpdated = Daily activities (after data updates)
 * 3. onUnmounted = Graduation day (cleanup)
 */
onMounted(() => {
  console.log('🏛️ Psychic Mirror Academy initialized - Your mind-reading assistants are ready!')
  
  // Create initial visual effects
  setTimeout(() => {
    createThoughtBubble()
  }, 1000)
})

/**
 * 📡 Event Communication - Telepathic Messages
 * 
 * Components can communicate with their parents through events:
 * 1. defineEmits declares what events we can send
 * 2. emit() sends the event with data
 * 3. Parent components can listen with @event syntax
 */
const emit = defineEmits(['interaction'])

// Track and report all interactions
watch([count, multiplier], () => {
  emit('interaction', {
    component: 'PsychicMirrorAcademy',
    type: 'reactivity-change',
    data: { 
      count: count.value, 
      multiplier: multiplier.value,
      computed: computedValue.value
    }
  })
})
</script>

<style scoped>
/**
 * 🎨 Styling - The Academy's Magical Appearance
 * 
 * Our styles reinforce the learning metaphor through:
 * 1. Mystical gradients and glowing effects
 * 2. Animated transitions for state changes
 * 3. Visual hierarchy that guides understanding
 * 4. Interactive elements with clear feedback
 */

.psychic-mirror-academy {
  background: linear-gradient(135deg, 
    rgba(139, 92, 246, 0.1) 0%, 
    rgba(59, 130, 246, 0.1) 50%,
    rgba(16, 185, 129, 0.05) 100%);
  border-radius: 16px;
  padding: 2rem;
  border: 2px solid rgba(139, 92, 246, 0.2);
  position: relative;
  overflow: hidden;
}

/* Academy Header */
.academy-header {
  text-align: center;
  margin-bottom: 2rem;
}

.academy-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.psychic-icon {
  font-size: 3rem;
  animation: psychicGlow 3s infinite ease-in-out;
}

.title-content h4 {
  margin: 0;
  font-size: 1.5rem;
  color: #5b21b6;
  font-weight: 700;
}

.academy-subtitle {
  margin: 0.5rem 0 0 0;
  color: #7c3aed;
  font-size: 1rem;
  font-style: italic;
}

.memory-trigger {
  background: linear-gradient(135deg, #fef3c7, #fbbf24);
  padding: 1rem;
  border-radius: 12px;
  border: 2px solid #f59e0b;
  color: #92400e;
  font-size: 0.9rem;
  margin-top: 1rem;
}

/* Visual Story Section */
.story-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
}

.story-visual {
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.psychic-mirrors {
  position: relative;
  width: 100%;
  height: 200px;
}

.main-mirror {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #e0f2fe, #0ea5e9);
  border-radius: 50%;
  border: 3px solid #0284c7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(2, 132, 199, 0.3);
}

.main-mirror.glowing {
  box-shadow: 0 0 40px rgba(2, 132, 199, 0.6);
  transform: translate(-50%, -50%) scale(1.05);
}

.mirror-face {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.mirror-reflection {
  text-align: center;
  font-size: 0.7rem;
  color: #0c4a6e;
  font-weight: 600;
}

.assistants-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.mind-reader-assistant {
  position: absolute;
  font-size: 1.5rem;
  animation: assistantFloat 3s infinite ease-in-out;
  transition: all 0.3s ease;
  cursor: pointer;
}

.mind-reader-assistant:nth-child(1) {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.mind-reader-assistant:nth-child(2) {
  top: 60%;
  right: 15%;
  animation-delay: 1s;
}

.mind-reader-assistant:nth-child(3) {
  bottom: 20%;
  left: 20%;
  animation-delay: 2s;
}

.mind-reader-assistant.active {
  transform: scale(1.3);
  filter: brightness(1.5);
}

.thought-bubble {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #7c3aed;
  border-radius: 20px;
  padding: 0.5rem;
  font-size: 0.7rem;
  color: #5b21b6;
  white-space: nowrap;
  animation: thoughtBubbleFloat 2s ease-in-out;
}

.floating-thought {
  position: absolute;
  font-size: 1.2rem;
  animation: thoughtFloat 2s ease-out forwards;
  pointer-events: none;
}

.story-explanation {
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid rgba(124, 58, 237, 0.3);
}

.story-explanation h5 {
  margin: 0 0 1rem 0;
  color: #5b21b6;
  font-size: 1.1rem;
}

.story-explanation p {
  margin: 0;
  color: #4c1d95;
  line-height: 1.6;
  font-size: 0.9rem;
}

/* Interactive Controls */
.mirror-controls {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 2px solid rgba(59, 130, 246, 0.3);
}

.control-section h5 {
  margin: 0 0 0.5rem 0;
  color: #1e40af;
  font-size: 1.1rem;
}

.control-section p {
  margin: 0 0 1.5rem 0;
  color: #3730a3;
  font-size: 0.9rem;
}

.controls-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e40af;
}

.assistant-icon {
  font-size: 1.2rem;
}

.psychic-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.psychic-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem;
  border: 2px solid #3b82f6;
  background: linear-gradient(135deg, #dbeafe, #3b82f6);
  color: #1e40af;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.8rem;
  font-weight: 600;
}

.psychic-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.btn-icon {
  font-size: 1.2rem;
}

.psychic-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
  border: 2px solid #0ea5e9;
  border-radius: 12px;
  min-width: 80px;
}

.mirror-mini {
  font-size: 1.5rem;
  animation: mirrorPulse 2s infinite ease-in-out;
}

.value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0c4a6e;
}

.psychic-input {
  padding: 0.75rem;
  border: 2px solid #7c3aed;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #5b21b6;
}

.psychic-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

/* Psychic Predictions */
.psychic-predictions {
  margin-bottom: 2rem;
}

.psychic-predictions h5 {
  text-align: center;
  margin: 0 0 1.5rem 0;
  color: #5b21b6;
  font-size: 1.2rem;
}

.predictions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.prediction-card {
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  transition: all 0.3s ease;
}

.prediction-card.active {
  border-color: #8b5cf6;
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.2);
}

.crystal-ball {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.prediction-label {
  font-size: 0.8rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.prediction-value {
  font-size: 1.1rem;
  font-weight: 700;
  color: #5b21b6;
}

/* Memory Reinforcement */
.memory-reinforcement {
  margin-bottom: 2rem;
}

.reinforcement-card {
  background: linear-gradient(135deg, #fef3c7, #fbbf24);
  border: 2px solid #f59e0b;
  border-radius: 12px;
  padding: 1.5rem;
}

.reinforcement-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.reinforcement-icon {
  font-size: 1.5rem;
}

.reinforcement-header h5 {
  margin: 0;
  color: #92400e;
  font-size: 1.1rem;
}

.reinforcement-text {
  margin: 0 0 1rem 0;
  color: #78350f;
  line-height: 1.6;
  font-size: 0.9rem;
}

.mnemonic-reminder {
  background: rgba(251, 191, 36, 0.3);
  padding: 0.75rem;
  border-radius: 8px;
  color: #78350f;
  font-size: 0.85rem;
}

/* Memory Test */
.memory-test {
  text-align: center;
}

.test-button {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}

.test-button:hover:not(.testing) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
}

.test-button.testing {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  cursor: not-allowed;
  animation: testingPulse 1.5s infinite ease-in-out;
}

.test-result {
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #d1fae5, #10b981);
  color: #065f46;
  border: 2px solid #059669;
  border-radius: 8px;
  font-weight: 600;
  animation: resultSlideIn 0.5s ease-out;
}

/* Animations */
@keyframes psychicGlow {
  0%, 100% { 
    transform: scale(1); 
    filter: brightness(1) hue-rotate(0deg); 
  }
  50% { 
    transform: scale(1.1); 
    filter: brightness(1.3) hue-rotate(180deg); 
  }
}

@keyframes assistantFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

@keyframes thoughtBubbleFloat {
  0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
  50% { opacity: 1; transform: translateX(-50%) translateY(-5px); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
}

@keyframes thoughtFloat {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(-50px); opacity: 0; }
}

@keyframes mirrorPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes testingPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes resultSlideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .story-section {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .controls-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .predictions-grid {
    grid-template-columns: 1fr;
  }
  
  .psychic-controls {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .psychic-btn {
    flex-direction: row;
    gap: 0.5rem;
  }
}
</style> 