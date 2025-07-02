<!--
  Mad Scientist Laboratory - Composition API Playground with Mnemonic Learning
  
  This component transforms Vue Composition API learning into a memorable experience using:
  - Mad Scientist Laboratory theme with scientists mixing magical function potions
  - Animated visual mnemonics that reinforce composition concepts
  - Funny far-fetched associations that stick in memory
  - Interactive elements that demonstrate composables and logic composition
  
  Memory Association: Composition API = Mad scientist laboratory mixing powerful function potions
  Visual Story: Frankenstein-style lab where setup(), composables, and reactivity are actual experiments
-->

<template>
  <div class="mad-scientist-laboratory">
    <!-- Laboratory Header with Animated Elements -->
    <div class="laboratory-header">
      <div class="laboratory-title">
        <div class="scientist-icon">🧪</div>
        <div class="title-content">
          <h4>🔬 Mad Scientist Laboratory</h4>
          <p class="laboratory-subtitle">Where Scientists Master the Art of Vue Composition API!</p>
        </div>
        <div class="floating-molecules">
          <div v-for="i in 6" :key="i" class="floating-molecule" :style="{ animationDelay: `${i * 0.25}s` }">
            ⚗️
          </div>
        </div>
      </div>
      
      <!-- Memory Trigger Reminder -->
      <div class="memory-trigger">
        <strong>Remember:</strong> COMPOSITION = "Combining Magical Potions, Obviously Super Intelligent, Totally Incredible, Outstanding, Neat!" 🧬
      </div>
    </div>

    <!-- Visual Story Section -->
    <div class="story-section">
      <div class="story-visual">
        <div class="laboratory-setup">
          <!-- Main Laboratory Workbench -->
          <div class="workbench">
            <div class="workbench-surface">
              <div class="setup-function" :class="{ 'active': isExperimentActive }">
                <div class="function-label">setup()</div>
                <div class="function-glow" :class="{ 'glowing': isExperimentActive }"></div>
              </div>
            </div>
            <div class="workbench-label">Main Laboratory Workbench</div>
          </div>
          
          <!-- Test Tube Rack (Composables) -->
          <div class="test-tube-rack">
            <div 
              v-for="(tube, index) in testTubes" 
              :key="tube.id"
              class="test-tube" 
              :class="[`tube-${tube.color}`, { 'bubbling': tube.active }]"
              :style="{ animationDelay: `${index * 0.2}s` }"
              @click="activateTestTube(tube.id)"
            >
              <div class="tube-liquid" :style="{ backgroundColor: tube.liquidColor }"></div>
              <div class="tube-bubbles" v-if="tube.active">
                <div v-for="i in 3" :key="i" class="bubble" :style="{ animationDelay: `${i * 0.1}s` }">
                  ○
                </div>
              </div>
              <div class="tube-label">{{ tube.name }}</div>
            </div>
          </div>
          
          <!-- Lightning Generator (Reactivity System) -->
          <div class="lightning-generator" :class="{ 'generating': isLightningActive }">
            <div class="generator-core">⚡</div>
            <div class="lightning-bolts" v-if="isLightningActive">
              <div v-for="i in 4" :key="i" class="lightning-bolt" :style="{ animationDelay: `${i * 0.1}s` }">
                ⚡
              </div>
            </div>
            <div class="generator-label">Reactivity Generator</div>
          </div>
          
          <!-- Experiment Results Display -->
          <div class="results-display">
            <div class="display-screen" :class="{ 'active': experimentResults.length > 0 }">
              <div class="screen-content">
                <div v-for="result in experimentResults" :key="result.id" class="result-item">
                  {{ result.text }}
                </div>
              </div>
            </div>
            <div class="display-label">Experiment Results</div>
          </div>
        </div>
      </div>
      
      <div class="story-explanation">
        <h5>🎭 The Mad Scientist Laboratory Story</h5>
        <p>
          Welcome to the most advanced composition laboratory in the Vue universe! Here, mad scientists 
          (that's you!) create powerful function potions using the Composition API. Your main workbench 
          is the setup() function, where all the magic happens. The test tubes contain different composables 
          - reusable function potions that you can mix and match. The lightning generator represents Vue's 
          reactivity system, providing the electrical energy that makes everything work together! 
          Unlike Dr. Frankenstein, your creations help build amazing applications instead of terrorizing villages! ⚡🧪
        </p>
      </div>
    </div>

    <!-- Interactive Laboratory Controls -->
    <div class="laboratory-controls">
      <div class="control-section">
        <h5>🎮 Laboratory Experiment Controls</h5>
        <p>Mix different composables and watch the magical reactions!</p>
        
        <div class="experiments-grid">
          <!-- Basic Composable Experiment -->
          <div class="experiment-group basic-experiment">
            <div class="experiment-header">
              <span class="experiment-icon">🧪</span>
              <h6>Basic Composable Potion</h6>
            </div>
            <div class="experiment-description">
              <p>Create a simple reactive potion using ref() and computed()!</p>
            </div>
            <div class="experiment-controls">
              <button @click="startBasicExperiment" class="experiment-button">
                <span class="btn-icon">⚗️</span>
                Start Basic Experiment
              </button>
              <div class="potion-mixer">
                <input 
                  v-model.number="potionStrength" 
                  type="range" 
                  min="0" 
                  max="100" 
                  class="strength-slider"
                  @input="updatePotionStrength"
                />
                <div class="strength-display">
                  <span class="strength-label">Potion Strength:</span>
                  <span class="strength-value">{{ potionStrength }}%</span>
                </div>
              </div>
            </div>
            <div class="experiment-result" v-if="basicExperimentActive">
              <div class="result-card">
                <span class="result-icon">🧪</span>
                <p>Basic Potion Created! Strength: {{ potionStrength }}% | Double Strength: {{ doubleStrength }}%</p>
              </div>
            </div>
          </div>
          
          <!-- Advanced Composable Experiment -->
          <div class="experiment-group advanced-experiment">
            <div class="experiment-header">
              <span class="experiment-icon">🔬</span>
              <h6>Advanced Composable Mixture</h6>
            </div>
            <div class="experiment-description">
              <p>Combine multiple composables for a super-powered potion!</p>
            </div>
            <div class="experiment-controls">
              <div class="composable-selector">
                <label class="selector-label">Select Composables to Mix:</label>
                <div class="composable-options">
                  <label v-for="composable in availableComposables" :key="composable.id" class="composable-option">
                    <input 
                      type="checkbox" 
                      :value="composable.id" 
                      v-model="selectedComposables"
                      @change="updateAdvancedExperiment"
                    />
                    <span class="option-custom">{{ composable.icon }}</span>
                    <span class="option-label">{{ composable.name }}</span>
                  </label>
                </div>
              </div>
              <button @click="mixComposables" class="experiment-button advanced-btn">
                <span class="btn-icon">🧬</span>
                Mix Selected Composables
              </button>
            </div>
            <div class="experiment-result" v-if="advancedExperimentActive">
              <div class="result-card advanced-result">
                <span class="result-icon">🔬</span>
                <p>Advanced Mixture Created!</p>
                <div class="mixture-components">
                  <div v-for="comp in activeMixture" :key="comp.id" class="component-item">
                    <span class="component-icon">{{ comp.icon }}</span>
                    <span class="component-name">{{ comp.name }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Reactivity Experiment -->
          <div class="experiment-group reactivity-experiment">
            <div class="experiment-header">
              <span class="experiment-icon">⚡</span>
              <h6>Reactivity Lightning Experiment</h6>
            </div>
            <div class="experiment-description">
              <p>Harness the power of Vue's reactivity system!</p>
            </div>
            <div class="experiment-controls">
              <div class="lightning-controls">
                <button @click="generateLightning" class="experiment-button lightning-btn">
                  <span class="btn-icon">⚡</span>
                  Generate Lightning
                </button>
                <div class="energy-meter">
                  <div class="meter-bar">
                    <div class="meter-fill" :style="{ width: `${energyLevel}%` }"></div>
                  </div>
                  <div class="meter-label">Energy Level: {{ energyLevel }}%</div>
                </div>
              </div>
            </div>
            <div class="experiment-result" v-if="reactivityExperimentActive">
              <div class="result-card lightning-result">
                <span class="result-icon">⚡</span>
                <p>Lightning Generated! Reactivity System Activated!</p>
                <div class="lightning-stats">
                  <div class="stat-item">
                    <span class="stat-label">Voltage:</span>
                    <span class="stat-value">{{ lightningVoltage }}V</span>
                  </div>
                  <div class="stat-item">
                    <span class="stat-label">Updates:</span>
                    <span class="stat-value">{{ reactiveUpdates }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Laboratory Statistics Dashboard -->
    <div class="laboratory-stats">
      <h5>📊 Laboratory Statistics</h5>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🧪</div>
          <div class="stat-value">{{ experimentsCompleted }}</div>
          <div class="stat-label">Experiments Completed</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⚗️</div>
          <div class="stat-value">{{ potionsCreated }}</div>
          <div class="stat-label">Potions Created</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-value">{{ lightningGenerated }}</div>
          <div class="stat-label">Lightning Bolts</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🔬</div>
          <div class="stat-value">{{ selectedComposables.length }}</div>
          <div class="stat-label">Active Composables</div>
        </div>
      </div>
    </div>

    <!-- Memory Reinforcement Section -->
    <div class="memory-reinforcement">
      <div class="reinforcement-card">
        <div class="reinforcement-header">
          <span class="reinforcement-icon">🧠</span>
          <h5>Mad Scientist Memory Booster!</h5>
        </div>
        <p class="reinforcement-text">
          <strong>Scientific Fact:</strong> The Composition API is like having your own mad scientist laboratory! 
          setup() is your main workbench where all experiments happen, composables are reusable test tubes 
          filled with powerful function potions, and the reactivity system is your lightning generator 
          that brings everything to life! Unlike the Options API (old laboratory), the Composition API 
          lets you organize your experiments by logic instead of by type! 🧪⚡
        </p>
        <div class="mnemonic-reminder">
          <strong>Laboratory Mnemonic:</strong> When you see Composition API, picture a mad scientist mixing colorful potions in test tubes! 🧬🔬
        </div>
      </div>
    </div>

    <!-- Interactive Memory Test -->
    <div class="memory-test">
      <button @click="testScientificKnowledge" class="test-button" :class="{ 'testing': isTesting }">
        {{ isTesting ? 'Analyzing Scientific Knowledge... 🔬' : 'Test Your Scientific Skills! 🧪' }}
      </button>
      <div v-if="showTestResult" class="test-result">
        {{ testMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * COMPOSITION API FUNDAMENTALS
 * ==========================
 * The Composition API is Vue 3's modern way to organize component logic.
 * Think of it like a mad scientist's laboratory where you:
 * - Mix different pieces of logic (like potions)
 * - Create reusable experiments (composables)
 * - Watch reactions happen automatically (reactivity)
 */

import { ref, computed, onMounted } from 'vue'

/**
 * REACTIVE STATE (Your Laboratory Equipment)
 * =======================================
 * ref() creates reactive references - like test tubes that can hold any type of value
 * When the contents change, Vue automatically updates the UI
 */

// Basic laboratory state
const potionStrength = ref(50)              // Basic experiment strength (like a measuring beaker)
const energyLevel = ref(0)                  // Lightning energy level (like a voltage meter)
const selectedComposables = ref([])         // Selected composables for mixing (like ingredient list)
const basicExperimentActive = ref(false)    // Basic experiment state (like a power switch)
const advancedExperimentActive = ref(false) // Advanced experiment state
const reactivityExperimentActive = ref(false) // Reactivity experiment state
const isExperimentActive = ref(false)       // General experiment animation
const isLightningActive = ref(false)        // Lightning animation

// Laboratory statistics
const experimentsCompleted = ref(0)         // Track completed experiments
const potionsCreated = ref(0)               // Track successful potions
const lightningGenerated = ref(0)           // Track lightning strikes
const reactiveUpdates = ref(0)              // Track reactive updates

// Test state
const isTesting = ref(false)                // Memory test state
const showTestResult = ref(false)           // Test result display
const testMessage = ref('')                 // Test feedback message
const experimentResults = ref([])           // Experiment results log

/**
 * REACTIVE OBJECTS (Complex Laboratory Equipment)
 * ============================================
 * ref() is used for primitive values, but for objects and arrays,
 * we can also use them to maintain reactivity throughout the object
 */

// Test tubes configuration (like a rack of prepared solutions)
const testTubes = ref([
  { id: 1, name: 'useCounter', color: 'blue', liquidColor: '#3b82f6', active: false },
  { id: 2, name: 'useAuth', color: 'green', liquidColor: '#10b981', active: false },
  { id: 3, name: 'useFetch', color: 'purple', liquidColor: '#8b5cf6', active: false },
  { id: 4, name: 'useLocalStorage', color: 'orange', liquidColor: '#f59e0b', active: false }
])

// Available composables (like a shelf of ingredients)
const availableComposables = ref([
  { id: 'counter', name: 'useCounter', icon: '🔢' },
  { id: 'auth', name: 'useAuth', icon: '🔐' },
  { id: 'fetch', name: 'useFetch', icon: '📡' },
  { id: 'storage', name: 'useLocalStorage', icon: '💾' },
  { id: 'theme', name: 'useTheme', icon: '🎨' },
  { id: 'router', name: 'useRouter', icon: '🛣️' }
])

/**
 * COMPUTED PROPERTIES (Automatic Calculations)
 * =========================================
 * computed() creates reactive values that automatically update
 * when their dependencies change. Like automatic measuring equipment!
 */

// Double the potion strength (automatic calculation)
const doubleStrength = computed(() => potionStrength.value * 2)

// Calculate lightning voltage (derived value)
const lightningVoltage = computed(() => energyLevel.value * 10)

// Get active mixture components (filtered list)
const activeMixture = computed(() => {
  return availableComposables.value.filter(comp => 
    selectedComposables.value.includes(comp.id)
  )
})

/**
 * LABORATORY METHODS (Your Experimental Procedures)
 * =============================================
 * In Composition API, methods are just regular functions.
 * They can modify reactive state and handle user interactions.
 */

// Activate a test tube (like turning on a Bunsen burner)
const activateTestTube = (tubeId) => {
  const tube = testTubes.value.find(t => t.id === tubeId)
  if (tube) {
    tube.active = true
    setTimeout(() => {
      tube.active = false
    }, 2000)
  }
}

// Add experiment results (like writing in a lab notebook)
const addExperimentResult = (text) => {
  const result = {
    id: Date.now(),
    text: text
  }
  experimentResults.value.unshift(result)
  
  // Keep only last 5 results (like limited notebook pages)
  if (experimentResults.value.length > 5) {
    experimentResults.value = experimentResults.value.slice(0, 5)
  }
}

/**
 * LIFECYCLE HOOKS (Laboratory Setup and Cleanup)
 * ==========================================
 * Lifecycle hooks let you run code at specific times:
 * - onMounted: When the lab is ready (component mounted)
 * - onUnmounted: When closing the lab (component removed)
 * - onUpdated: After each experiment (component updated)
 */

// Initialize laboratory on component mount
onMounted(() => {
  // Add initial experiment result
  setTimeout(() => {
    addExperimentResult('Laboratory initialized successfully!')
  }, 500)
})

/**
 * EVENT HANDLING (Laboratory Communication)
 * =====================================
 * Events let components communicate with their parents.
 * Like sending lab reports to the head scientist!
 */

// Define events we can emit
const emit = defineEmits(['interaction'])

// Track laboratory interactions (like logging experiments)
const trackLaboratoryInteraction = (experimentType) => {
  emit('interaction', {
    type: 'experiment-conducted',
    experiment: experimentType,
    timestamp: new Date().toISOString()
  })
  console.log(`🧪 Experiment conducted: ${experimentType} at Mad Scientist Laboratory`)
}

// Laboratory experiment methods
const startBasicExperiment = () => {
  basicExperimentActive.value = true
  isExperimentActive.value = true
  experimentsCompleted.value++
  potionsCreated.value++
  
  addExperimentResult('Basic composable potion created successfully!')
  activateTestTube(1)
  
  setTimeout(() => {
    isExperimentActive.value = false
  }, 2000)
}

const updatePotionStrength = () => {
  if (basicExperimentActive.value) {
    reactiveUpdates.value++
  }
}

const mixComposables = () => {
  if (selectedComposables.value.length === 0) return
  
  advancedExperimentActive.value = true
  isExperimentActive.value = true
  experimentsCompleted.value++
  potionsCreated.value++
  
  const mixtureNames = activeMixture.value.map(comp => comp.name).join(' + ')
  addExperimentResult(`Advanced mixture created: ${mixtureNames}`)
  
  // Activate corresponding test tubes
  selectedComposables.value.forEach(id => {
    const tubeIndex = availableComposables.value.findIndex(comp => comp.id === id)
    if (tubeIndex !== -1) {
      activateTestTube(tubeIndex + 1)
    }
  })
  
  setTimeout(() => {
    isExperimentActive.value = false
  }, 2500)
}

const updateAdvancedExperiment = () => {
  if (selectedComposables.value.length > 0) {
    reactiveUpdates.value++
  }
}

const generateLightning = () => {
  reactivityExperimentActive.value = true
  isLightningActive.value = true
  isExperimentActive.value = true
  experimentsCompleted.value++
  lightningGenerated.value++
  
  // Animate energy level increase
  const targetEnergy = Math.min(energyLevel.value + 25, 100)
  const energyInterval = setInterval(() => {
    if (energyLevel.value < targetEnergy) {
      energyLevel.value += 2
      reactiveUpdates.value++
    } else {
      clearInterval(energyInterval)
    }
  }, 50)
  
  addExperimentResult(`Lightning generated! Energy level: ${targetEnergy}%`)
  
  setTimeout(() => {
    isLightningActive.value = false
    isExperimentActive.value = false
  }, 3000)
}

// Memory test for scientific knowledge
const testScientificKnowledge = async () => {
  isTesting.value = true
  showTestResult.value = false
  
  // Simulate scientific knowledge test
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const scientificFacts = [
    "🎉 Brilliant! You're ready to become a Vue Composition API scientist!",
    "🌟 Excellent! Your composable mixing skills are extraordinary!",
    "⚡ Amazing! You've mastered the art of scientific Vue development!",
    "🧪 Outstanding! Even Marie Curie would be impressed with your composition knowledge!"
  ]
  
  testMessage.value = scientificFacts[Math.floor(Math.random() * scientificFacts.length)]
  showTestResult.value = true
  isTesting.value = false
}
</script>

<style scoped>
/* Mad Scientist Laboratory Styling with Animated Visual Mnemonics */
.mad-scientist-laboratory {
  background: linear-gradient(135deg, #2d1b69 0%, #11998e 100%);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Laboratory Header with Scientific Elements */
.laboratory-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.laboratory-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
}

.scientist-icon {
  font-size: 3rem;
  animation: scientistFloat 3s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}

.title-content h4 {
  font-size: 2rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.laboratory-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0.5rem 0 0 0;
}

.floating-molecules {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 40px;
}

.floating-molecule {
  position: absolute;
  font-size: 1.2rem;
  animation: moleculeFloat 2.5s ease-in-out infinite;
}

.floating-molecule:nth-child(1) { left: 0%; }
.floating-molecule:nth-child(2) { left: 16%; }
.floating-molecule:nth-child(3) { left: 32%; }
.floating-molecule:nth-child(4) { left: 48%; }
.floating-molecule:nth-child(5) { left: 64%; }
.floating-molecule:nth-child(6) { left: 80%; }

.memory-trigger {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  margin-top: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

/* Visual Story Section */
.story-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: center;
}

.laboratory-setup {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  min-height: 400px;
  backdrop-filter: blur(10px);
}

.workbench {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.workbench-surface {
  width: 120px;
  height: 80px;
  background: rgba(139, 69, 19, 0.7);
  border-radius: 8px;
  border: 2px solid #8b4513;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.setup-function {
  background: rgba(255, 215, 0, 0.2);
  border: 2px solid #ffd700;
  border-radius: 6px;
  padding: 0.5rem;
  position: relative;
  transition: all 0.3s ease;
}

.setup-function.active {
  transform: scale(1.1);
  box-shadow: 0 0 20px #ffd700;
}

.function-label {
  font-size: 0.8rem;
  font-weight: bold;
  color: #ffd700;
}

.function-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.function-glow.glowing {
  box-shadow: 0 0 15px #ffd700, inset 0 0 15px rgba(255, 215, 0, 0.3);
  animation: setupGlow 2s ease-in-out infinite alternate;
}

.workbench-label {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  opacity: 0.9;
}

.test-tube-rack {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  gap: 1rem;
}

.test-tube {
  width: 40px;
  height: 80px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0 0 20px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.test-tube:hover {
  transform: translateY(-5px);
}

.test-tube.bubbling {
  animation: tubeBubble 1s ease-in-out infinite;
}

.tube-liquid {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  border-radius: 0 0 18px 18px;
  transition: all 0.3s ease;
}

.tube-bubbles {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.bubble {
  font-size: 0.6rem;
  animation: bubbleRise 1s ease-in-out infinite;
  opacity: 0.7;
}

.tube-label {
  position: absolute;
  bottom: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.6rem;
  white-space: nowrap;
}

.lightning-generator {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  text-align: center;
}

.generator-core {
  font-size: 3rem;
  animation: coreRotate 4s linear infinite;
  transition: all 0.3s ease;
}

.lightning-generator.generating .generator-core {
  animation: coreRotate 0.5s linear infinite, coreGlow 0.5s ease-in-out infinite alternate;
}

.lightning-bolts {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
}

.lightning-bolt {
  position: absolute;
  font-size: 1.5rem;
  animation: boltStrike 0.5s ease-in-out infinite;
}

.lightning-bolt:nth-child(1) { top: 0; left: 50%; transform: translateX(-50%); }
.lightning-bolt:nth-child(2) { right: 0; top: 50%; transform: translateY(-50%); }
.lightning-bolt:nth-child(3) { bottom: 0; left: 50%; transform: translateX(-50%); }
.lightning-bolt:nth-child(4) { left: 0; top: 50%; transform: translateY(-50%); }

.generator-label {
  font-size: 0.8rem;
  margin-top: 1rem;
  opacity: 0.9;
}

.results-display {
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 150px;
}

.display-screen {
  width: 100%;
  height: 100px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  border: 2px solid #00ff00;
  padding: 0.5rem;
  overflow-y: auto;
  transition: all 0.3s ease;
}

.display-screen.active {
  box-shadow: 0 0 15px #00ff00;
}

.screen-content {
  font-family: monospace;
  font-size: 0.6rem;
  color: #00ff00;
}

.result-item {
  margin-bottom: 0.25rem;
  animation: resultAppear 0.5s ease;
}

.display-label {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  text-align: center;
  opacity: 0.9;
}

.story-explanation {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.story-explanation h5 {
  color: #ffd700;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

/* Interactive Laboratory Controls */
.laboratory-controls {
  margin-bottom: 2rem;
}

.control-section h5 {
  text-align: center;
  margin-bottom: 1rem;
  color: #ffd700;
}

.experiments-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.experiment-group {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.experiment-group:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.experiment-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.experiment-icon {
  font-size: 1.5rem;
}

.experiment-header h6 {
  margin: 0;
  color: #ffd700;
}

.experiment-description {
  margin-bottom: 1rem;
  opacity: 0.9;
}

.experiment-controls {
  margin-bottom: 1rem;
}

.experiment-button {
  background: linear-gradient(45deg, #11998e, #38ef7d);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.experiment-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(17, 153, 142, 0.4);
}

.experiment-button.advanced-btn {
  background: linear-gradient(45deg, #8b5cf6, #a855f7);
}

.experiment-button.lightning-btn {
  background: linear-gradient(45deg, #fbbf24, #f59e0b);
}

.potion-mixer {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
}

.strength-slider {
  width: 100%;
  margin-bottom: 0.5rem;
}

.strength-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.strength-value {
  color: #ffd700;
  font-weight: bold;
}

.composable-selector {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.selector-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #ffd700;
}

.composable-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.composable-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.composable-option:hover {
  background: rgba(255, 255, 255, 0.1);
}

.composable-option input[type="checkbox"] {
  display: none;
}

.option-custom {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.composable-option input[type="checkbox"]:checked + .option-custom {
  background: #ffd700;
  border-color: #ffd700;
}

.option-label {
  font-size: 0.9rem;
}

.lightning-controls {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
}

.energy-meter {
  margin-top: 1rem;
}

.meter-bar {
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.meter-fill {
  height: 100%;
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
  transition: width 0.3s ease;
  border-radius: 10px;
}

.meter-label {
  font-size: 0.9rem;
  text-align: center;
}

.experiment-result {
  background: rgba(17, 153, 142, 0.1);
  border: 2px solid rgba(17, 153, 142, 0.3);
  padding: 1rem;
  border-radius: 8px;
  animation: experimentResult 0.5s ease;
}

.result-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.result-icon {
  font-size: 1.5rem;
}

.mixture-components {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.component-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.component-icon {
  font-size: 1rem;
}

.lightning-stats {
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.8;
}

.stat-value {
  font-weight: bold;
  color: #ffd700;
}

/* Laboratory Statistics Dashboard */
.laboratory-stats {
  margin-bottom: 2rem;
}

.laboratory-stats h5 {
  text-align: center;
  color: #ffd700;
  margin-bottom: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.stat-card .stat-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.stat-card .stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 0.25rem;
}

.stat-card .stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Memory Reinforcement */
.memory-reinforcement {
  margin-bottom: 2rem;
}

.reinforcement-card {
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid rgba(255, 215, 0, 0.3);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.reinforcement-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.reinforcement-icon {
  font-size: 1.5rem;
}

.reinforcement-header h5 {
  margin: 0;
  color: #ffd700;
}

.mnemonic-reminder {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border-left: 4px solid #ffd700;
}

/* Memory Test */
.memory-test {
  text-align: center;
}

.test-button {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
}

.test-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 107, 107, 0.3);
}

.test-button.testing {
  animation: testPulse 1s ease-in-out infinite;
}

.test-result {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  animation: testResultAppear 0.5s ease;
}

/* Animations */
@keyframes scientistFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(3deg); }
}

@keyframes moleculeFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 1; }
  50% { transform: translateY(-15px) rotate(180deg); opacity: 0.7; }
}

@keyframes setupGlow {
  0% { box-shadow: 0 0 10px #ffd700; }
  100% { box-shadow: 0 0 25px #ffd700; }
}

@keyframes tubeBubble {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes bubbleRise {
  0% { transform: translateY(0px); opacity: 1; }
  100% { transform: translateY(-20px); opacity: 0; }
}

@keyframes coreRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes coreGlow {
  0% { filter: drop-shadow(0 0 5px #ffd700); }
  100% { filter: drop-shadow(0 0 20px #ffd700); }
}

@keyframes boltStrike {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes resultAppear {
  0% { transform: translateX(-10px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes experimentResult {
  0% { transform: scale(0.9); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes testPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes testResultAppear {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .story-section {
    grid-template-columns: 1fr;
  }
  
  .experiments-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .composable-options {
    grid-template-columns: 1fr;
  }
  
  .lightning-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style> 