<!--
  Superhero Signal Academy - Events Playground with Mnemonic Learning
  
  This component transforms Vue event handling learning into a memorable experience using:
  - Superhero Signal Academy theme with heroes responding to emergency signals
  - Animated visual mnemonics that reinforce event handling concepts
  - Funny far-fetched associations that stick in memory
  - Interactive elements that demonstrate event listeners and handlers
  
  Memory Association: Events = Emergency signals that activate superhero responses
  Visual Story: Superhero headquarters where @click, @input, @keyup are actual emergency signals
-->

<template>
  <div class="superhero-signal-academy">
    <!-- Academy Header with Animated Elements -->
    <div class="academy-header">
      <div class="academy-title">
        <div class="superhero-icon">🦸‍♂️</div>
        <div class="title-content">
          <h4>🏢 Superhero Signal Academy</h4>
          <p class="academy-subtitle">Where Heroes Master the Art of Responding to Vue Events!</p>
        </div>
        <div class="floating-signals">
          <div v-for="i in 5" :key="i" class="floating-signal" :style="{ animationDelay: `${i * 0.3}s` }">
            📡
          </div>
        </div>
      </div>
      
      <!-- Memory Trigger Reminder -->
      <div class="memory-trigger">
        <strong>Remember:</strong> EVENTS = "Emergency Vigilant Emergency Network, Totally Swift!" 🚨
      </div>
    </div>

    <!-- Visual Story Section -->
    <div class="story-section">
      <div class="story-visual">
        <div class="superhero-headquarters">
          <!-- Superhero Control Panel -->
          <div class="control-panel">
            <div class="panel-screen">
              <div class="screen-glow" :class="{ 'active': isSignalActive }"></div>
              <div class="signal-display">
                <div class="signal-line" v-for="i in 4" :key="i" :style="{ animationDelay: `${i * 0.2}s` }">
                  ━━━━━━━━━━
                </div>
              </div>
            </div>
            <div class="panel-label">Event Monitoring System</div>
          </div>
          
          <!-- Superhero Team -->
          <div class="superhero-team">
            <div class="superhero" :class="{ 'responding': isClickHeroActive }">
              <div class="hero-cape">🦸‍♂️</div>
              <div class="hero-name">@click Captain</div>
              <div class="hero-power">Click Response</div>
            </div>
            
            <div class="superhero" :class="{ 'responding': isInputHeroActive }">
              <div class="hero-cape">🦸‍♀️</div>
              <div class="hero-name">@input Wonder</div>
              <div class="hero-power">Input Detection</div>
            </div>
            
            <div class="superhero" :class="{ 'responding': isKeyHeroActive }">
              <div class="hero-cape">🦸‍♂️</div>
              <div class="hero-name">@keyup Flash</div>
              <div class="hero-power">Key Sensing</div>
            </div>
          </div>
          
          <!-- Emergency Signal Effects -->
          <div class="signal-effects">
            <div 
              v-for="signal in activeSignals" 
              :key="signal.id"
              class="emergency-signal"
              :style="{ 
                left: signal.x + 'px', 
                top: signal.y + 'px',
                animationDelay: signal.delay + 's'
              }"
            >
              {{ signal.symbol }}
            </div>
          </div>
          
          <!-- Emergency Hotline -->
          <div class="emergency-hotline">
            <div class="hotline-phone">📞</div>
            <div class="hotline-label">Emergency Hotline</div>
            <div class="hotline-status" :class="{ 'ringing': isEmergencyActive }">
              {{ isEmergencyActive ? 'INCOMING CALL!' : 'Standby' }}
            </div>
          </div>
        </div>
      </div>
      
      <div class="story-explanation">
        <h5>🎭 The Superhero Signal Academy Story</h5>
        <p>
          Welcome to the most advanced superhero headquarters in the Vue universe! Here, elite heroes are trained to 
          respond instantly to emergency signals (events). When someone clicks a button (@click), types in a field (@input), 
          or presses a key (@keyup), our heroes spring into action faster than you can say "event listener"! 
          Each hero has a special power to detect and respond to specific types of emergencies. 
          The @click Captain handles all clicking emergencies, @input Wonder detects typing situations, 
          and @keyup Flash responds to keyboard alerts! 🦸‍♂️⚡
        </p>
      </div>
    </div>

    <!-- Interactive Hero Training Controls -->
    <div class="hero-training">
      <div class="training-section">
        <h5>🎮 Hero Training Simulator</h5>
        <p>Test the heroes' response time to different emergency signals!</p>
        
        <div class="training-grid">
          <!-- @click Hero Training -->
          <div class="training-group click-training">
            <div class="training-header">
              <span class="training-icon">👆</span>
              <h6>@click Captain Training</h6>
            </div>
            <div class="training-description">
              <p>The most common emergency! Tests hero's ability to respond to click signals.</p>
            </div>
            <div class="training-controls">
              <button @click="activateClickHero" class="emergency-button click-button">
                <span class="btn-icon">🚨</span>
                Emergency Click Signal!
              </button>
              <div class="response-counter">
                <span class="counter-label">Emergencies Handled:</span>
                <span class="counter-value">{{ clickCount }}</span>
              </div>
            </div>
            <div class="hero-response" v-if="isClickHeroActive">
              <div class="response-message">
                <span class="hero-emoji">🦸‍♂️</span>
                <p>"@click Captain here! Click emergency resolved in {{ responseTime }}ms!"</p>
              </div>
            </div>
          </div>
          
          <!-- @input Hero Training -->
          <div class="training-group input-training">
            <div class="training-header">
              <span class="training-icon">⌨️</span>
              <h6>@input Wonder Training</h6>
            </div>
            <div class="training-description">
              <p>Real-time typing emergencies! Hero responds to every character typed.</p>
            </div>
            <div class="training-controls">
              <input 
                v-model="userMessage" 
                @input="activateInputHero" 
                placeholder="Type an emergency message..."
                class="emergency-input"
              />
              <div class="input-display">
                <span class="display-label">Live Signal:</span>
                <span class="display-value">{{ userMessage || 'No signal detected' }}</span>
              </div>
            </div>
            <div class="hero-response" v-if="isInputHeroActive">
              <div class="response-message">
                <span class="hero-emoji">🦸‍♀️</span>
                <p>"@input Wonder reporting! Detected {{ userMessage.length }} characters in the signal!"</p>
              </div>
            </div>
          </div>
          
          <!-- @keyup Hero Training -->
          <div class="training-group keyup-training">
            <div class="training-header">
              <span class="training-icon">⚡</span>
              <h6>@keyup Flash Training</h6>
            </div>
            <div class="training-description">
              <p>Lightning-fast key release detection! Special response to Enter key.</p>
            </div>
            <div class="training-controls">
              <input 
                v-model="secretCode" 
                @keyup="activateKeyHero"
                @keyup.enter="handleEnterKey"
                placeholder="Type secret code (press Enter for special response)..."
                class="emergency-input key-input"
              />
              <div class="key-status">
                <span class="status-label">Last Key Signal:</span>
                <span class="status-value">{{ lastKey || 'None detected' }}</span>
              </div>
            </div>
            <div class="hero-response" v-if="isKeyHeroActive">
              <div class="response-message">
                <span class="hero-emoji">🦸‍♂️</span>
                <p v-if="lastKey === 'Enter'">
                  "⚡ @keyup Flash here! ENTER key emergency protocol activated! Code accepted!"
                </p>
                <p v-else>
                  "@keyup Flash responding! Key '{{ lastKey }}' signal detected and processed!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Hero Techniques -->
    <div class="advanced-techniques">
      <h5>🎓 Advanced Hero Techniques</h5>
      <div class="techniques-section">
        <div class="technique-group">
          <h6>Event Modifiers: Super Powers!</h6>
          <p>Heroes can use special modifiers to enhance their abilities!</p>
          <div class="modifier-demos">
            <div class="modifier-demo">
              <label class="modifier-label">@click.prevent Hero (Prevents Default Action):</label>
              <a href="#" @click.prevent="demonstratePrevent" class="demo-link">
                Try clicking this link - it won't navigate!
              </a>
              <div v-if="preventDemoActive" class="demo-result">
                <span class="demo-icon">🛡️</span>
                <p>Hero prevented the default link behavior!</p>
              </div>
            </div>
            
            <div class="modifier-demo">
              <label class="modifier-label">@click.once Hero (One-Time Response):</label>
              <button @click.once="demonstrateOnce" class="demo-button" :disabled="onceUsed">
                {{ onceUsed ? 'Hero Retired' : 'Emergency Button (One Use Only)' }}
              </button>
              <div v-if="onceDemoActive" class="demo-result">
                <span class="demo-icon">⭐</span>
                <p>Hero responded once and then retired!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Emergency Statistics Dashboard -->
    <div class="emergency-stats">
      <h5>📊 Emergency Response Statistics</h5>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">👆</div>
          <div class="stat-value">{{ clickCount }}</div>
          <div class="stat-label">Click Emergencies</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⌨️</div>
          <div class="stat-value">{{ userMessage.length }}</div>
          <div class="stat-label">Input Characters</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-value">{{ keyPressCount }}</div>
          <div class="stat-label">Key Signals</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-value">{{ totalEmergencies }}</div>
          <div class="stat-label">Total Emergencies</div>
        </div>
      </div>
    </div>

    <!-- Memory Reinforcement Section -->
    <div class="memory-reinforcement">
      <div class="reinforcement-card">
        <div class="reinforcement-header">
          <span class="reinforcement-icon">🧠</span>
          <h5>Superhero Memory Booster!</h5>
        </div>
        <p class="reinforcement-text">
          <strong>Heroic Fact:</strong> Vue events are like emergency signals that activate superhero responses! 
          @click is like a red emergency button, @input is like a live communication channel, 
          and @keyup is like a morse code signal. Each event listener is a dedicated hero ready to spring into action 
          the moment their specific signal is detected! 🦸‍♂️🚨
        </p>
        <div class="mnemonic-reminder">
          <strong>Hero Mnemonic:</strong> When you see @ events, picture superheroes in a control room responding to emergency signals! 📡⚡
        </div>
      </div>
    </div>

    <!-- Interactive Memory Test -->
    <div class="memory-test">
      <button @click="testHeroKnowledge" class="test-button" :class="{ 'testing': isTesting }">
        {{ isTesting ? 'Testing Hero Knowledge... 🔍' : 'Test Your Hero Skills! 🦸‍♂️' }}
      </button>
      <div v-if="showTestResult" class="test-result">
        {{ testMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

/**
 * 🦸‍♂️ Vue Events - The Emergency Response System
 * 
 * Vue events are like emergency signals that components respond to:
 * 
 * 1. Event Listeners (@event)
 *    - Like emergency hotlines waiting for calls
 *    - Start with @ in templates
 *    - Can listen for native DOM events or custom events
 * 
 * 2. Event Handlers (methods)
 *    - Like superhero response protocols
 *    - Execute when their matching event occurs
 *    - Can receive event data as parameters
 * 
 * 3. Event Modifiers (.modifier)
 *    - Like special superhero powers
 *    - Modify event behavior
 *    - Examples: .prevent, .stop, .once
 */

/**
 * 📡 Event Tracking State
 * 
 * Each type of emergency needs its own tracking system:
 * - Click events = Emergency button presses
 * - Input events = Live communication signals
 * - Key events = Special code transmissions
 */
const clickCount = ref(0)          // Tracks click emergencies
const userMessage = ref('')        // Monitors input signals
const secretCode = ref('')         // Stores key sequence
const lastKey = ref('')           // Records last key press
const keyPressCount = ref(0)      // Counts total key signals

/**
 * 🎬 Animation States
 * 
 * Visual feedback states to show hero activity:
 * - Active states trigger hero animations
 * - Signal states control control panel effects
 * - Emergency states manage alert displays
 */
const isClickHeroActive = ref(false)   // Click hero in action
const isInputHeroActive = ref(false)   // Input hero responding
const isKeyHeroActive = ref(false)     // Key hero on duty
const isSignalActive = ref(false)      // Control panel alert
const isEmergencyActive = ref(false)   // Hotline ringing
const responseTime = ref(0)            // Hero response speed

/**
 * 🛡️ Advanced Technique States
 * 
 * States for demonstrating special hero powers:
 * - Prevent = Blocking default actions
 * - Once = One-time response power
 */
const preventDemoActive = ref(false)   // Shield power active
const onceDemoActive = ref(false)      // Single-use power
const onceUsed = ref(false)            // Power exhausted
const activeSignals = ref([])          // Visual emergency effects

/**
 * 📊 Emergency Statistics
 * 
 * Computed property that demonstrates:
 * 1. Combining multiple reactive sources
 * 2. Automatic updates when dependencies change
 * 3. Efficient caching of calculated values
 */
const totalEmergencies = computed(() => {
  return clickCount.value + userMessage.value.length + keyPressCount.value
})

/**
 * 👆 Click Event Handler
 * 
 * This hero demonstrates:
 * 1. Basic click event handling
 * 2. State updates in response to events
 * 3. Animation timing and cleanup
 * 4. Performance measurement
 */
const activateClickHero = () => {
  clickCount.value++
  isClickHeroActive.value = true
  isSignalActive.value = true
  responseTime.value = Math.floor(Math.random() * 50) + 10 // Simulate response time
  
  addEmergencySignal('🚨', 'click')
  
  // Cleanup after response
  setTimeout(() => {
    isClickHeroActive.value = false
    isSignalActive.value = false
  }, 1500)
}

/**
 * ⌨️ Input Event Handler
 * 
 * This hero shows:
 * 1. Real-time input monitoring
 * 2. Immediate feedback on changes
 * 3. Debounced cleanup for performance
 */
const activateInputHero = () => {
  isInputHeroActive.value = true
  isSignalActive.value = true
  
  addEmergencySignal('⌨️', 'input')
  
  // Reset hero state after response
  setTimeout(() => {
    isInputHeroActive.value = false
    isSignalActive.value = false
  }, 1000)
}

/**
 * ⚡ Keyboard Event Handler
 * 
 * This hero demonstrates:
 * 1. Keyboard event handling
 * 2. Accessing event properties
 * 3. Special key detection
 */
const activateKeyHero = (event) => {
  keyPressCount.value++
  lastKey.value = event.key
  isKeyHeroActive.value = true
  isSignalActive.value = true
  
  addEmergencySignal('⚡', 'keyup')
  
  setTimeout(() => {
    isKeyHeroActive.value = false
    isSignalActive.value = false
  }, 1200)
}

/**
 * 🎯 Special Key Handler
 * 
 * Demonstrates:
 * 1. Key modifier usage (@keyup.enter)
 * 2. Special case handling
 * 3. Visual feedback for special events
 */
const handleEnterKey = () => {
  isEmergencyActive.value = true
  addEmergencySignal('🎯', 'enter')
  
  setTimeout(() => {
    isEmergencyActive.value = false
  }, 2000)
}

/**
 * 🛡️ Event Modifier Demonstrations
 * 
 * These methods show:
 * 1. .prevent modifier (blocks default behavior)
 * 2. .once modifier (single-use events)
 * 3. Visual feedback for modifier effects
 */
const demonstratePrevent = () => {
  preventDemoActive.value = true
  addEmergencySignal('🛡️', 'prevent')
  
  setTimeout(() => {
    preventDemoActive.value = false
  }, 2000)
}

const demonstrateOnce = () => {
  onceDemoActive.value = true
  onceUsed.value = true
  addEmergencySignal('⭐', 'once')
  
  setTimeout(() => {
    onceDemoActive.value = false
  }, 2000)
}

/**
 * ✨ Visual Effects System
 * 
 * Helper method that:
 * 1. Creates visual emergency signals
 * 2. Manages signal animations
 * 3. Handles cleanup of old signals
 */
const addEmergencySignal = (symbol, type) => {
  const signal = {
    id: Date.now(),
    symbol,
    type,
    x: Math.random() * 300,
    y: Math.random() * 200,
    delay: Math.random() * 0.3
  }
  
  activeSignals.value.push(signal)
  
  // Cleanup old signals
  setTimeout(() => {
    activeSignals.value = activeSignals.value.filter(s => s.id !== signal.id)
  }, 2000)
}

/**
 * 🏛️ Component Lifecycle
 * 
 * onMounted shows:
 * 1. Initial setup timing
 * 2. First-render operations
 * 3. Emergency system activation
 */
onMounted(() => {
  // Initialize the emergency response system
  addEmergencySignal('🚀', 'init')
})

/**
 * 📡 Event Communication
 * 
 * Emits track:
 * 1. Emergency responses
 * 2. Hero activities
 * 3. System statistics
 */
const emit = defineEmits(['emergency-response'])

// Memory test for hero knowledge
const testHeroKnowledge = async () => {
  isTesting.value = true
  showTestResult.value = false
  
  // Simulate hero knowledge test
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const heroFacts = [
    "🎉 Outstanding! You're ready to join the Superhero Signal Academy!",
    "🌟 Incredible! Your event handling skills are legendary!",
    "⚡ Amazing! You've mastered the art of Vue event heroics!",
    "🦸‍♂️ Fantastic! Even Superman would be impressed with your event knowledge!"
  ]
  
  testMessage.value = heroFacts[Math.floor(Math.random() * heroFacts.length)]
  showTestResult.value = true
  isTesting.value = false
}
</script>

<style scoped>
/**
 * 🎨 Superhero Styling
 * 
 * Our CSS reinforces the emergency response theme:
 * 1. Emergency signal animations
 * 2. Hero response effects
 * 3. Control panel displays
 * 4. Statistical dashboards
 */

.superhero-signal-academy {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Academy Header with Heroic Elements */
.academy-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.academy-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
}

.superhero-icon {
  font-size: 3rem;
  animation: heroFloat 3s ease-in-out infinite;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}

.title-content h4 {
  font-size: 2rem;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.academy-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0.5rem 0 0 0;
}

.floating-signals {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  height: 40px;
}

.floating-signal {
  position: absolute;
  font-size: 1.5rem;
  animation: signalPulse 2s ease-in-out infinite;
}

.floating-signal:nth-child(1) { left: 5%; }
.floating-signal:nth-child(2) { left: 25%; }
.floating-signal:nth-child(3) { left: 45%; }
.floating-signal:nth-child(4) { left: 65%; }
.floating-signal:nth-child(5) { left: 85%; }

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

.superhero-headquarters {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  min-height: 350px;
  backdrop-filter: blur(10px);
}

.control-panel {
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
}

.panel-screen {
  width: 100px;
  height: 80px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  border: 2px solid #00ff00;
  position: relative;
  margin-bottom: 0.5rem;
}

.screen-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.screen-glow.active {
  box-shadow: 0 0 20px #00ff00, inset 0 0 20px rgba(0, 255, 0, 0.2);
  animation: screenFlash 1s ease-in-out;
}

.signal-display {
  padding: 0.5rem;
  font-family: monospace;
  font-size: 0.6rem;
  color: #00ff00;
}

.signal-line {
  animation: signalScroll 2s linear infinite;
  opacity: 0.7;
}

.panel-label {
  font-size: 0.8rem;
  opacity: 0.9;
}

.superhero-team {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}

.superhero {
  text-align: center;
  transition: all 0.3s ease;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
}

.superhero.responding {
  transform: scale(1.1);
  background: rgba(255, 215, 0, 0.2);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  animation: heroResponse 1.5s ease;
}

.hero-cape {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  animation: capeFlow 3s ease-in-out infinite;
}

.hero-name {
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 0.25rem;
}

.hero-power {
  font-size: 0.8rem;
  opacity: 0.8;
}

.signal-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.emergency-signal {
  position: absolute;
  font-size: 1.5rem;
  animation: emergencySignal 2s ease-out forwards;
}

.emergency-hotline {
  position: absolute;
  bottom: 20px;
  left: 20px;
  text-align: center;
}

.hotline-phone {
  font-size: 2rem;
  animation: phoneRing 2s ease-in-out infinite;
}

.hotline-label {
  font-size: 0.8rem;
  margin: 0.5rem 0;
}

.hotline-status {
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.hotline-status.ringing {
  background: rgba(255, 0, 0, 0.7);
  animation: statusBlink 0.5s ease-in-out infinite alternate;
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

/* Interactive Hero Training */
.hero-training {
  margin-bottom: 2rem;
}

.training-section h5 {
  text-align: center;
  margin-bottom: 1rem;
  color: #ffd700;
}

.training-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.training-group {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.training-group:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.training-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.training-icon {
  font-size: 1.5rem;
}

.training-header h6 {
  margin: 0;
  color: #ffd700;
}

.training-description {
  margin-bottom: 1rem;
  opacity: 0.9;
}

.training-controls {
  margin-bottom: 1rem;
}

.emergency-button {
  background: linear-gradient(45deg, #ff4757, #ff6b7a);
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

.emergency-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 71, 87, 0.4);
}

.emergency-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
}

.emergency-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.emergency-input:focus {
  outline: none;
  border-color: #ffd700;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
}

.response-counter, .input-display, .key-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.counter-value, .display-value, .status-value {
  color: #ffd700;
  font-weight: bold;
}

.hero-response {
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid rgba(255, 215, 0, 0.3);
  padding: 1rem;
  border-radius: 8px;
  animation: responseAppear 0.5s ease;
}

.response-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hero-emoji {
  font-size: 1.5rem;
}

/* Advanced Techniques */
.advanced-techniques {
  margin-bottom: 2rem;
}

.advanced-techniques h5 {
  text-align: center;
  color: #ffd700;
  margin-bottom: 1rem;
}

.technique-group {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.modifier-demos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.modifier-demo {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #ffd700;
}

.modifier-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #ffd700;
}

.demo-link {
  color: #4fc3f7;
  text-decoration: underline;
  cursor: pointer;
}

.demo-button {
  background: linear-gradient(45deg, #4fc3f7, #29b6f6);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.demo-button:disabled {
  background: #666;
  cursor: not-allowed;
}

.demo-result {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(76, 175, 80, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  animation: demoResult 0.5s ease;
}

.demo-icon {
  font-size: 1.2rem;
}

/* Emergency Statistics Dashboard */
.emergency-stats {
  margin-bottom: 2rem;
}

.emergency-stats h5 {
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

.stat-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #ffd700;
  margin-bottom: 0.25rem;
}

.stat-label {
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
@keyframes heroFloat {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

@keyframes signalPulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}

@keyframes screenFlash {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes signalScroll {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@keyframes heroResponse {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1.1); }
}

@keyframes capeFlow {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-2deg); }
  75% { transform: rotate(2deg); }
}

@keyframes emergencySignal {
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
}

@keyframes phoneRing {
  0%, 100% { transform: rotate(0deg); }
  10%, 30%, 50%, 70%, 90% { transform: rotate(-10deg); }
  20%, 40%, 60%, 80% { transform: rotate(10deg); }
}

@keyframes statusBlink {
  0% { opacity: 1; }
  100% { opacity: 0.5; }
}

@keyframes responseAppear {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes demoResult {
  0% { transform: scale(0.8); opacity: 0; }
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
  
  .training-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .modifier-demos {
    gap: 0.5rem;
  }
}
</style> 