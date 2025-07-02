<!--
  MnemonicCard Component - Visual Memory Palace for Vue Concepts
  
  This component creates memorable visual associations using:
  - Funny far-fetched stories and analogies
  - Animated visual mnemonics that stick in memory
  - Memory palace technique with spatial associations
  - Interactive elements that reinforce learning
  
  Each concept is transformed into an absurd, memorable story that's
  scientifically proven to improve memory retention by making information
  more vivid, emotional, and spatially organized.
-->

<template>
  <!--
    The `loaded` class is toggled per-instance (see <script setup> below).
    This ensures EVERY MnemonicCard fades/slides in correctly instead of only
    the first card. The previous implementation used `document.querySelector`,
    which grabbed just the first element and left the rest permanently
    transparent (opacity 0), leading to the *disappearing* effect reported by
    the user.
  -->
  <div
    class="mnemonic-card"
    :class="[
      `theme-${concept.color.replace('#', '')}`,
      { expanded: isExpanded, loaded: isLoaded }
    ]"
    ref="cardRef"
  >
    <!-- Main concept header with animated icon -->
    <div class="card-header" @click="toggleExpanded">
      <div class="concept-icon" :class="animationClass">
        {{ concept.icon }}
      </div>
      
      <div class="concept-info">
        <h3 class="concept-title">{{ concept.title }}</h3>
        <p class="concept-description">{{ concept.description }}</p>
      </div>
      
      <div class="expand-button" :class="{ 'rotated': isExpanded }">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    </div>

    <!-- Mnemonic content - expands on click -->
    <transition name="expand" @enter="onEnter" @leave="onLeave">
      <div v-if="isExpanded" class="mnemonic-content">
        <!-- Memory association section -->
        <div class="memory-section association-section">
          <div class="section-header">
            <span class="section-icon">🧠</span>
            <h4 class="section-title">Memory Association</h4>
          </div>
          <div class="association-card">
            <p class="association-text">{{ concept.mnemonic.association }}</p>
            <div class="memory-trigger">
              <strong>Remember:</strong> {{ concept.mnemonic.memoryTrigger }}
            </div>
          </div>
        </div>

        <!-- Visual story section with animated elements -->
        <div class="memory-section story-section">
          <div class="section-header">
            <span class="section-icon">📖</span>
            <h4 class="section-title">Visual Story</h4>
          </div>
          <div class="story-card">
            <div class="story-visual" :class="visualAnimationClass">
              <div class="visual-elements">
                <!-- Animated visual elements based on concept -->
                <div v-if="concept.id === 'components'" class="lego-blocks">
                  <div v-for="i in 3" :key="i" class="lego-block" :style="{ animationDelay: `${i * 0.2}s` }">
                    🧩
                  </div>
                  <div class="dance-floor">💃🕺</div>
                </div>
                
                <div v-else-if="concept.id === 'templates'" class="magic-kitchen">
                  <div class="chef-hat">👨‍🍳</div>
                  <div class="magic-book">📜</div>
                  <div class="magic-sparkles">✨✨✨</div>
                  <div class="ingredients">&#123;&#123; ingredients &#125;&#125;</div>
                </div>
                
                <div v-else-if="concept.id === 'reactivity'" class="psychic-mirror">
                  <div class="mirror">🔮</div>
                  <div class="thought-bubbles">
                    <div v-for="i in 3" :key="i" class="thought-bubble" :style="{ animationDelay: `${i * 0.5}s` }">
                      💭
                    </div>
                  </div>
                  <div class="assistants">👻👻</div>
                </div>
                
                <div v-else-if="concept.id === 'composition-api'" class="mad-laboratory">
                  <div class="scientist">🧪</div>
                  <div class="test-tubes">
                    <div v-for="i in 4" :key="i" class="test-tube" :style="{ animationDelay: `${i * 0.3}s` }">
                      🧪
                    </div>
                  </div>
                  <div class="lightning">⚡</div>
                </div>
                
                <div v-else-if="concept.id === 'event-handling'" class="superhero-academy">
                  <div class="superhero">🦸‍♂️</div>
                  <div class="sound-waves">
                    <div v-for="i in 3" :key="i" class="sound-wave" :style="{ animationDelay: `${i * 0.4}s` }">
                      📢
                    </div>
                  </div>
                  <div class="super-ears">👂✨</div>
                </div>
                
                <div v-else-if="concept.id === 'data-binding'" class="puppet-theater">
                  <div class="puppeteer">🎭</div>
                  <div class="puppet-strings">
                    <div v-for="i in 4" :key="i" class="puppet-string" :style="{ animationDelay: `${i * 0.2}s` }">
                      ✨
                    </div>
                  </div>
                  <div class="magic-wand">🪄</div>
                </div>
                
                <!-- Intermediate Concepts Visual Elements -->
                <div v-else-if="concept.id === 'component-communication'" class="owl-post-office">
                  <div class="flying-owl">🦉</div>
                  <div class="mail-letters">
                    <div v-for="i in 3" :key="i" class="mail-letter" :style="{ animationDelay: `${i * 0.3}s` }">
                      📨
                    </div>
                  </div>
                  <div class="megaphone">📢</div>
                </div>
                
                <div v-else-if="concept.id === 'slots-scoped-slots'" class="art-gallery">
                  <div class="picture-frame">🖼️</div>
                  <div class="art-pieces">
                    <div v-for="i in 3" :key="i" class="art-piece" :style="{ animationDelay: `${i * 0.4}s` }">
                      🎨
                    </div>
                  </div>
                  <div class="smart-frame">🤖🖼️</div>
                </div>
                
                <div v-else-if="concept.id === 'lifecycle-hooks'" class="life-coach-office">
                  <div class="life-coach">👨‍⚕️</div>
                  <div class="calendar">📅</div>
                  <div class="life-events">
                    <div v-for="i in 3" :key="i" class="life-event" :style="{ animationDelay: `${i * 0.5}s` }">
                      🎉
                    </div>
                  </div>
                </div>
                
                <div v-else-if="concept.id === 'dynamic-components'" class="transformer-arena">
                  <div class="transformer">🤖</div>
                  <div class="remote-control">📱</div>
                  <div class="transformation-effects">
                    <div v-for="i in 4" :key="i" class="transform-effect" :style="{ animationDelay: `${i * 0.2}s` }">
                      ⚡
                    </div>
                  </div>
                </div>
                
                <div v-else-if="concept.id === 'forms-validation'" class="vip-club">
                  <div class="bouncer">🕺</div>
                  <div class="clipboard">📋</div>
                  <div class="vip-rope">🚧</div>
                  <div class="validation-lights">
                    <div class="red-light">🔴</div>
                    <div class="green-light">🟢</div>
                  </div>
                </div>
                
                <!-- Advanced Concepts Visual Elements -->
                <div v-else-if="concept.id === 'custom-directives'" class="wizard-academy">
                  <div class="wizard">🧙‍♂️</div>
                  <div class="spellbook">📚</div>
                  <div class="magic-wands">
                    <div v-for="i in 3" :key="i" class="magic-wand" :style="{ animationDelay: `${i * 0.3}s` }">
                      🪄
                    </div>
                  </div>
                </div>
                
                <div v-else-if="concept.id === 'render-functions'" class="architect-studio">
                  <div class="architect">🏗️</div>
                  <div class="hologram-projector">📽️</div>
                  <div class="blueprints">
                    <div v-for="i in 3" :key="i" class="blueprint" :style="{ animationDelay: `${i * 0.4}s` }">
                      📐
                    </div>
                  </div>
                </div>
                
                <div v-else-if="concept.id === 'teleport-suspense'" class="mystic-sanctum">
                  <div class="doctor-strange">🧙‍♂️</div>
                  <div class="sling-ring">💍</div>
                  <div class="portals">
                    <div v-for="i in 3" :key="i" class="portal" :style="{ animationDelay: `${i * 0.3}s` }">
                      🌀
                    </div>
                  </div>
                  <div class="time-stone">💎</div>
                </div>
                
                <div v-else-if="concept.id === 'performance-optimization'" class="racing-pit">
                  <div class="race-car">🏎️</div>
                  <div class="pit-crew">👨‍🔧</div>
                  <div class="speed-lines">
                    <div v-for="i in 4" :key="i" class="speed-line" :style="{ animationDelay: `${i * 0.1}s` }">
                      💨
                    </div>
                  </div>
                </div>
                
                <div v-else-if="concept.id === 'state-management'" class="magical-bank">
                  <div class="bank-manager">🏦</div>
                  <div class="safety-deposit-box">🗃️</div>
                  <div class="bank-tellers">
                    <div v-for="i in 3" :key="i" class="bank-teller" :style="{ animationDelay: `${i * 0.3}s` }">
                      👨‍💼
                    </div>
                  </div>
                </div>
                
                <div v-else-if="concept.id === 'testing'" class="detective-office">
                  <div class="detective">🕵️‍♂️</div>
                  <div class="magnifying-glass">🔍</div>
                  <div class="evidence-board">
                    <div v-for="i in 4" :key="i" class="evidence" :style="{ animationDelay: `${i * 0.2}s` }">
                      📎
                    </div>
                  </div>
                </div>
                
                <div v-else-if="concept.id === 'typescript-integration'" class="classroom">
                  <div class="teacher">👩‍🏫</div>
                  <div class="red-pen">✏️</div>
                  <div class="grammar-rules">
                    <div v-for="i in 3" :key="i" class="grammar-rule" :style="{ animationDelay: `${i * 0.4}s` }">
                      📝
                    </div>
                  </div>
                </div>
                
                <div v-else-if="concept.id === 'routing'" class="gps-navigation">
                  <div class="magical-car">🚗</div>
                  <div class="gps-device">🧭</div>
                  <div class="road-signs">
                    <div v-for="i in 3" :key="i" class="road-sign" :style="{ animationDelay: `${i * 0.3}s` }">
                      🛣️
                    </div>
                  </div>
                </div>
                
                <div v-else-if="concept.id === 'ssr-ssg'" class="printing-factory">
                  <div class="printing-press">📰</div>
                  <div class="newspaper-stack">📚</div>
                  <div class="delivery-trucks">
                    <div v-for="i in 2" :key="i" class="delivery-truck" :style="{ animationDelay: `${i * 0.5}s` }">
                      🚚
                    </div>
                  </div>
                </div>
                
                <div v-else-if="concept.id === 'build-tools'" class="construction-site">
                  <div class="construction-worker">👷‍♂️</div>
                  <div class="super-crane">🏗️</div>
                  <div class="tools">
                    <div v-for="i in 4" :key="i" class="tool" :style="{ animationDelay: `${i * 0.2}s` }">
                      🔧
                    </div>
                  </div>
                </div>
                
                <div v-else-if="concept.id === 'plugins-ecosystem'" class="app-store">
                  <div class="store-manager">👨‍💼</div>
                  <div class="app-icons">
                    <div v-for="i in 6" :key="i" class="app-icon" :style="{ animationDelay: `${i * 0.2}s` }">
                      📱
                    </div>
                  </div>
                  <div class="download-arrow">⬇️</div>
                </div>
                
                <div v-else-if="concept.id === 'micro-frontends'" class="magical-city">
                  <div class="mayor">👑</div>
                  <div class="kingdoms">
                    <div v-for="i in 4" :key="i" class="kingdom" :style="{ animationDelay: `${i * 0.3}s` }">
                      🏰
                    </div>
                  </div>
                  <div class="magical-bridges">🌉</div>
                </div>
              </div>
            </div>
            <p class="story-text">{{ concept.mnemonic.visualStory }}</p>
          </div>
        </div>

        <!-- Fun fact section -->
        <div class="memory-section fun-fact-section">
          <div class="section-header">
            <span class="section-icon">🎭</span>
            <h4 class="section-title">Fun Memory Booster</h4>
          </div>
          <div class="fun-fact-card">
            <p class="fun-fact">{{ concept.mnemonic.funnyFact }}</p>
          </div>
        </div>

        <!-- Interactive memory test -->
        <div class="memory-section test-section">
          <div class="section-header">
            <span class="section-icon">🎯</span>
            <h4 class="section-title">Memory Test</h4>
          </div>
          <div class="memory-test">
            <button @click="startMemoryTest" class="test-button" :class="{ 'testing': isTesting }">
              {{ isTesting ? 'Testing...' : 'Test Your Memory!' }}
            </button>
            <div v-if="showTestResult" class="test-result" :class="testResultClass">
              {{ testMessage }}
            </div>
          </div>
        </div>

        <!-- Practical examples -->
        <div class="memory-section examples-section">
          <div class="section-header">
            <span class="section-icon">💡</span>
            <h4 class="section-title">Real-World Examples</h4>
          </div>
          <div class="examples-grid">
            <div v-for="example in concept.examples" :key="example" class="example-card">
              <div class="example-icon">⚡</div>
              <p class="example-text">{{ example }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

// Props - receive the concept data with mnemonic information
const props = defineProps({
  concept: {
    type: Object,
    required: true,
    validator: (concept) => {
      // Ensure the concept has the required mnemonic structure
      return concept.mnemonic && 
             concept.mnemonic.association && 
             concept.mnemonic.visualStory &&
             concept.mnemonic.memoryTrigger
    }
  }
})

// Component state for interactivity and animations
const isExpanded = ref(false)
const isTesting = ref(false)
const showTestResult = ref(false)
const testMessage = ref('')
const testResultClass = ref('')

// Computed properties for dynamic styling and animations
const animationClass = computed(() => {
  // Map concept IDs to their specific animation classes
  const animationMap = {
    // Basic concepts
    'components': 'bounce-dance',
    'templates': 'magic-cook',
    'reactivity': 'psychic-glow',
    'composition-api': 'mad-scientist',
    'event-handling': 'superhero-listening',
    'data-binding': 'puppet-master',
    
    // Intermediate concepts
    'component-communication': 'flying-owl-post',
    'slots-scoped-slots': 'magical-frames',
    'lifecycle-hooks': 'life-coach',
    'dynamic-components': 'transformer-shift',
    'forms-validation': 'vip-bouncer',
    
    // Advanced concepts
    'custom-directives': 'wizard-spells',
    'render-functions': 'holographic-architect',
    'teleport-suspense': 'mystic-portals',
    'performance-optimization': 'formula1-racing',
    'state-management': 'magical-banking',
    'testing': 'detective-investigation',
    'typescript-integration': 'grammar-teacher',
    'routing': 'magical-gps',
    'ssr-ssg': 'printing-press',
    'build-tools': 'construction-crew',
    'plugins-ecosystem': 'magical-app-store',
    'micro-frontends': 'city-kingdoms'
  }
  return `animate-${animationMap[props.concept.id] || 'default'}`
})

const visualAnimationClass = computed(() => {
  // Different visual animations for the story section
  return `visual-${props.concept.id}`
})

// Methods for user interaction and memory reinforcement
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
  
  // Track interaction for learning analytics
  if (isExpanded.value) {
    console.log(`🧠 Memory palace opened for: ${props.concept.title}`)
  }
}

// Memory test functionality to reinforce learning
const startMemoryTest = async () => {
  isTesting.value = true
  showTestResult.value = false
  
  // Simulate a quick memory challenge
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Show encouraging result (always positive to build confidence)
  const encouragingMessages = [
    '🎉 Great! Your memory palace is getting stronger!',
    '🧠 Excellent! The visual association is working!',
    '⭐ Amazing! You\'re building powerful memory connections!',
    '🚀 Fantastic! Your brain loves these visual stories!'
  ]
  
  testMessage.value = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]
  testResultClass.value = 'success'
  showTestResult.value = true
  isTesting.value = false
  
  // Hide result after a few seconds
  setTimeout(() => {
    showTestResult.value = false
  }, 3000)
}

// Animation lifecycle hooks for smooth transitions
const onEnter = (element) => {
  // Smooth expand animation
  element.style.height = '0px'
  element.style.overflow = 'hidden'
  
  nextTick(() => {
    element.style.height = element.scrollHeight + 'px'
    element.style.transition = 'height 0.5s ease-out'
  })
}

const onLeave = (element) => {
  // Smooth collapse animation
  element.style.height = element.scrollHeight + 'px'
  element.style.transition = 'height 0.3s ease-in'
  
  nextTick(() => {
    element.style.height = '0px'
  })
}

// ============================================
//   Lifecycle – per-card "loaded" animation
// ============================================

// Reference to the root element so we can add the `loaded` class
const cardRef = ref(null)

// Local state tracking if this particular card has finished its fade-in.
const isLoaded = ref(false)

// Ensure the card is marked as loaded on the very next DOM update so it
// becomes visible immediately. The staggered appearance can still be
// achieved purely with CSS `transition-delay` if desired.
onMounted(async () => {
  // Wait for the component to finish rendering, then flip the flag so the
  // `loaded` class is added and the opacity/transform transition kicks in.
  await nextTick()
  isLoaded.value = true
})
</script>

<style scoped>
/* 
  Mnemonic Card Styling - Designed for Maximum Visual Impact and Memory Retention
  
  Key design principles:
  - High contrast colors for better memory encoding
  - Generous spacing for cognitive processing
  - Smooth animations to maintain attention
  - Visual hierarchy that guides the eye through the memory palace
*/

.mnemonic-card {
  /* Base card styling with memory-friendly design */
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95));
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(10px);
  opacity: 0;
  border: 2px solid transparent;
}

.mnemonic-card.loaded {
  transform: translateY(0);
  opacity: 1;
}

.mnemonic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.mnemonic-card.expanded {
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
}

/* Theme-based color schemes for different concepts */
.theme-FF6B6B {
  border-color: #FF6B6B;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.1), rgba(255, 255, 255, 0.95));
}

.theme-4ECDC4 {
  border-color: #4ECDC4;
  background: linear-gradient(135deg, rgba(78, 205, 196, 0.1), rgba(255, 255, 255, 0.95));
}

.theme-45B7D1 {
  border-color: #45B7D1;
  background: linear-gradient(135deg, rgba(69, 183, 209, 0.1), rgba(255, 255, 255, 0.95));
}

.theme-96CEB4 {
  border-color: #96CEB4;
  background: linear-gradient(135deg, rgba(150, 206, 180, 0.1), rgba(255, 255, 255, 0.95));
}

/* Card header with concept information */
.card-header {
  display: flex;
  align-items: center;
  padding: 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.card-header:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.concept-icon {
  font-size: 3rem;
  margin-right: 1.5rem;
  transition: transform 0.3s ease;
}

/* Animated icon classes for each concept */
.animate-bounce-dance {
  animation: bounceDance 2s infinite ease-in-out;
}

.animate-magic-cook {
  animation: magicCook 3s infinite ease-in-out;
}

.animate-psychic-glow {
  animation: psychicGlow 2.5s infinite ease-in-out;
}

.animate-mad-scientist {
  animation: madScientist 4s infinite ease-in-out;
}

.animate-superhero-listening {
  animation: superheroListening 2.2s infinite ease-in-out;
}

.animate-puppet-master {
  animation: puppetMaster 2.6s infinite ease-in-out;
}

/* Intermediate Concept Animations */
.animate-flying-owl-post {
  animation: flyingOwlPost 2.8s infinite ease-in-out;
}

.animate-magical-frames {
  animation: magicalFrames 3.2s infinite ease-in-out;
}

.animate-life-coach {
  animation: lifeCoach 2.4s infinite ease-in-out;
}

.animate-transformer-shift {
  animation: transformerShift 3s infinite ease-in-out;
}

.animate-vip-bouncer {
  animation: vipBouncer 2.6s infinite ease-in-out;
}

/* Advanced Concept Animations */
.animate-wizard-spells {
  animation: wizardSpells 3.4s infinite ease-in-out;
}

.animate-holographic-architect {
  animation: holographicArchitect 3.6s infinite ease-in-out;
}

.animate-mystic-portals {
  animation: mysticPortals 4s infinite ease-in-out;
}

.animate-formula1-racing {
  animation: formula1Racing 1.8s infinite ease-in-out;
}

.animate-magical-banking {
  animation: magicalBanking 2.8s infinite ease-in-out;
}

.animate-detective-investigation {
  animation: detectiveInvestigation 3.2s infinite ease-in-out;
}

.animate-grammar-teacher {
  animation: grammarTeacher 2.4s infinite ease-in-out;
}

.animate-magical-gps {
  animation: magicalGPS 3s infinite ease-in-out;
}

.animate-printing-press {
  animation: printingPress 2.2s infinite ease-in-out;
}

.animate-construction-crew {
  animation: constructionCrew 2.6s infinite ease-in-out;
}

.animate-magical-app-store {
  animation: magicalAppStore 3.4s infinite ease-in-out;
}

.animate-city-kingdoms {
  animation: cityKingdoms 4.2s infinite ease-in-out;
}

/* Concept information */
.concept-info {
  flex: 1;
}

.concept-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.concept-description {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
}

/* Expand button */
.expand-button {
  width: 2rem;
  height: 2rem;
  transition: transform 0.3s ease;
}

.expand-button.rotated {
  transform: rotate(180deg);
}

.expand-button svg {
  width: 100%;
  height: 100%;
  color: #6b7280;
}

/* Mnemonic content sections */
.mnemonic-content {
  padding: 0 2rem 2rem 2rem;
}

.memory-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.section-icon {
  font-size: 1.5rem;
  margin-right: 0.75rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

/* Association section */
.association-card {
  background: linear-gradient(135deg, #fef3c7, #fbbf24);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid #f59e0b;
}

.association-text {
  font-size: 1.1rem;
  color: #92400e;
  margin: 0 0 1rem 0;
  font-weight: 500;
}

.memory-trigger {
  background: rgba(251, 191, 36, 0.3);
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #78350f;
}

/* Visual story section */
.story-card {
  background: linear-gradient(135deg, #e0f2fe, #0ea5e9);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid #0284c7;
}

.story-visual {
  margin-bottom: 1rem;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual-elements {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Visual animations for each concept */
.visual-components .lego-blocks {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.lego-block {
  font-size: 2rem;
  animation: legoBlockDance 2s infinite ease-in-out;
}

.dance-floor {
  margin-left: 1rem;
  font-size: 1.5rem;
  animation: danceFloorPulse 1.5s infinite ease-in-out;
}

.visual-templates .magic-kitchen {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.chef-hat, .magic-book, .lightning {
  font-size: 2rem;
  animation: magicFloat 3s infinite ease-in-out;
}

.magic-sparkles {
  font-size: 1.5rem;
  animation: sparkle 2s infinite ease-in-out;
}

.ingredients {
  background: rgba(255, 255, 255, 0.8);
  padding: 0.5rem;
  border-radius: 6px;
  font-family: monospace;
  font-weight: bold;
  color: #1f2937;
  animation: codeGlow 2.5s infinite ease-in-out;
}

.visual-reactivity .psychic-mirror {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.mirror {
  font-size: 3rem;
  animation: mirrorGlow 2.5s infinite ease-in-out;
}

.thought-bubbles {
  display: flex;
  gap: 0.5rem;
}

.thought-bubble {
  font-size: 1.5rem;
  animation: thoughtFloat 3s infinite ease-in-out;
}

.assistants {
  font-size: 1.5rem;
  animation: assistantFloat 2s infinite ease-in-out;
}

.visual-composition-api .mad-laboratory {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.scientist {
  font-size: 3rem;
  animation: scientistWork 4s infinite ease-in-out;
}

.test-tubes {
  display: flex;
  gap: 0.5rem;
}

.test-tube {
  font-size: 1.5rem;
  animation: testTubeBubble 3s infinite ease-in-out;
}

/* Event Handling Visual Elements */
.visual-event-handling .superhero-academy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.superhero {
  font-size: 3rem;
  animation: superheroListening 2.2s infinite ease-in-out;
}

.sound-waves {
  display: flex;
  gap: 0.5rem;
}

.sound-wave {
  font-size: 1.5rem;
  animation: soundWave 2s infinite ease-in-out;
}

.super-ears {
  font-size: 1.5rem;
  animation: assistantFloat 2.5s infinite ease-in-out;
}

/* Data Binding Visual Elements */
.visual-data-binding .puppet-theater {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.puppeteer {
  font-size: 3rem;
  animation: puppetMaster 2.6s infinite ease-in-out;
}

.puppet-strings {
  display: flex;
  gap: 0.3rem;
}

.puppet-string {
  font-size: 1.2rem;
  animation: puppetString 2.8s infinite ease-in-out;
}

.magic-wand {
  font-size: 2rem;
  animation: magicFloat 3s infinite ease-in-out;
}

/* Intermediate Concepts Visual Styles */
.owl-post-office {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.flying-owl {
  font-size: 3rem;
  animation: flyingOwlPost 2.8s infinite ease-in-out;
}

.mail-letters {
  display: flex;
  gap: 0.5rem;
}

.mail-letter {
  font-size: 1.5rem;
  animation: magicFloat 2.5s infinite ease-in-out;
}

.megaphone {
  font-size: 2rem;
  animation: assistantFloat 2s infinite ease-in-out;
}

.art-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.picture-frame {
  font-size: 3rem;
  animation: magicalFrames 3.2s infinite ease-in-out;
}

.art-pieces {
  display: flex;
  gap: 0.5rem;
}

.art-piece {
  font-size: 1.5rem;
  animation: sparkle 2.8s infinite ease-in-out;
}

.smart-frame {
  font-size: 1.8rem;
  animation: assistantFloat 2.2s infinite ease-in-out;
}

.life-coach-office {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.life-coach {
  font-size: 3rem;
  animation: lifeCoach 2.4s infinite ease-in-out;
}

.calendar {
  font-size: 2.5rem;
  animation: magicFloat 3s infinite ease-in-out;
}

.life-events {
  display: flex;
  gap: 0.5rem;
}

.life-event {
  font-size: 1.5rem;
  animation: sparkle 2s infinite ease-in-out;
}

.transformer-arena {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.transformer {
  font-size: 3rem;
  animation: transformerShift 3s infinite ease-in-out;
}

.remote-control {
  font-size: 2rem;
  animation: assistantFloat 2.5s infinite ease-in-out;
}

.transformation-effects {
  display: flex;
  gap: 0.3rem;
}

.transform-effect {
  font-size: 1.2rem;
  animation: sparkle 1.5s infinite ease-in-out;
}

.vip-club {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.bouncer {
  font-size: 3rem;
  animation: vipBouncer 2.6s infinite ease-in-out;
}

.clipboard {
  font-size: 2rem;
  animation: magicFloat 2.8s infinite ease-in-out;
}

.vip-rope {
  font-size: 2rem;
  animation: assistantFloat 3s infinite ease-in-out;
}

.validation-lights {
  display: flex;
  gap: 1rem;
}

.red-light, .green-light {
  font-size: 1.5rem;
  animation: sparkle 1.8s infinite ease-in-out;
}

/* Advanced Concepts Visual Styles */
.wizard-academy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.wizard {
  font-size: 3rem;
  animation: wizardSpells 3.4s infinite ease-in-out;
}

.spellbook {
  font-size: 2.5rem;
  animation: magicFloat 3s infinite ease-in-out;
}

.magic-wands {
  display: flex;
  gap: 0.5rem;
}

.magic-wand {
  font-size: 1.5rem;
  animation: sparkle 2.2s infinite ease-in-out;
}

.architect-studio {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.architect {
  font-size: 3rem;
  animation: holographicArchitect 3.6s infinite ease-in-out;
}

.hologram-projector {
  font-size: 2.5rem;
  animation: assistantFloat 2.8s infinite ease-in-out;
}

.blueprints {
  display: flex;
  gap: 0.5rem;
}

.blueprint {
  font-size: 1.5rem;
  animation: magicFloat 2.5s infinite ease-in-out;
}

.mystic-sanctum {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.doctor-strange {
  font-size: 3rem;
  animation: mysticPortals 4s infinite ease-in-out;
}

.sling-ring {
  font-size: 2rem;
  animation: assistantFloat 2.2s infinite ease-in-out;
}

.portals {
  display: flex;
  gap: 0.5rem;
}

.portal {
  font-size: 1.8rem;
  animation: mysticPortals 3s infinite ease-in-out;
}

.time-stone {
  font-size: 2rem;
  animation: sparkle 2.5s infinite ease-in-out;
}

.racing-pit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.race-car {
  font-size: 3rem;
  animation: formula1Racing 1.8s infinite ease-in-out;
}

.pit-crew {
  font-size: 2rem;
  animation: assistantFloat 2s infinite ease-in-out;
}

.speed-lines {
  display: flex;
  gap: 0.3rem;
}

.speed-line {
  font-size: 1.2rem;
  animation: formula1Racing 1.2s infinite ease-in-out;
}

.magical-bank {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.bank-manager {
  font-size: 3rem;
  animation: magicalBanking 2.8s infinite ease-in-out;
}

.safety-deposit-box {
  font-size: 2.5rem;
  animation: magicFloat 3.2s infinite ease-in-out;
}

.bank-tellers {
  display: flex;
  gap: 0.5rem;
}

.bank-teller {
  font-size: 1.5rem;
  animation: assistantFloat 2.5s infinite ease-in-out;
}

.detective-office {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.detective {
  font-size: 3rem;
  animation: detectiveInvestigation 3.2s infinite ease-in-out;
}

.magnifying-glass {
  font-size: 2.5rem;
  animation: assistantFloat 2.8s infinite ease-in-out;
}

.evidence-board {
  display: flex;
  gap: 0.3rem;
}

.evidence {
  font-size: 1.2rem;
  animation: sparkle 2s infinite ease-in-out;
}

.classroom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.teacher {
  font-size: 3rem;
  animation: grammarTeacher 2.4s infinite ease-in-out;
}

.red-pen {
  font-size: 2rem;
  animation: assistantFloat 2.2s infinite ease-in-out;
}

.grammar-rules {
  display: flex;
  gap: 0.5rem;
}

.grammar-rule {
  font-size: 1.5rem;
  animation: magicFloat 2.8s infinite ease-in-out;
}

.gps-navigation {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.magical-car {
  font-size: 3rem;
  animation: magicalGPS 3s infinite ease-in-out;
}

.gps-device {
  font-size: 2.5rem;
  animation: assistantFloat 2.5s infinite ease-in-out;
}

.road-signs {
  display: flex;
  gap: 0.5rem;
}

.road-sign {
  font-size: 1.5rem;
  animation: magicFloat 2.2s infinite ease-in-out;
}

.printing-factory {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.printing-press {
  font-size: 3rem;
  animation: printingPress 2.2s infinite ease-in-out;
}

.newspaper-stack {
  font-size: 2.5rem;
  animation: magicFloat 2.8s infinite ease-in-out;
}

.delivery-trucks {
  display: flex;
  gap: 0.5rem;
}

.delivery-truck {
  font-size: 1.8rem;
  animation: assistantFloat 2.5s infinite ease-in-out;
}

.construction-site {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.construction-worker {
  font-size: 3rem;
  animation: constructionCrew 2.6s infinite ease-in-out;
}

.super-crane {
  font-size: 2.5rem;
  animation: assistantFloat 3s infinite ease-in-out;
}

.tools {
  display: flex;
  gap: 0.3rem;
}

.tool {
  font-size: 1.2rem;
  animation: sparkle 2s infinite ease-in-out;
}

.app-store {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.store-manager {
  font-size: 3rem;
  animation: magicalAppStore 3.4s infinite ease-in-out;
}

.app-icons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.3rem;
}

.app-icon {
  font-size: 1.2rem;
  animation: sparkle 1.8s infinite ease-in-out;
}

.download-arrow {
  font-size: 2rem;
  animation: assistantFloat 2.5s infinite ease-in-out;
}

.magical-city {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.mayor {
  font-size: 3rem;
  animation: cityKingdoms 4.2s infinite ease-in-out;
}

.kingdoms {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.kingdom {
  font-size: 1.5rem;
  animation: magicFloat 3.5s infinite ease-in-out;
}

.magical-bridges {
  font-size: 2.5rem;
  animation: assistantFloat 3.8s infinite ease-in-out;
}

.story-text {
  color: #0c4a6e;
  margin: 0;
  line-height: 1.7;
  font-size: 1rem;
}

/* Fun fact section */
.fun-fact-card {
  background: linear-gradient(135deg, #fce7f3, #ec4899);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid #db2777;
}

.fun-fact {
  color: #831843;
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
}

/* Memory test section */
.memory-test {
  text-align: center;
}

.test-button {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.test-button:hover:not(.testing) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

.test-button.testing {
  background: linear-gradient(135deg, #6b7280, #4b5563);
  cursor: not-allowed;
  animation: testingPulse 1.5s infinite ease-in-out;
}

.test-result {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  animation: resultSlideIn 0.5s ease-out;
}

.test-result.success {
  background: linear-gradient(135deg, #d1fae5, #10b981);
  color: #065f46;
  border: 2px solid #059669;
}

/* Examples section */
.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.example-card {
  background: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.2s ease;
}

.example-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.example-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.example-text {
  margin: 0;
  font-size: 0.9rem;
  color: #374151;
  line-height: 1.5;
}

/* Animations and keyframes for visual mnemonics */
@keyframes bounceDance {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(5deg); }
  50% { transform: translateY(-5px) rotate(-5deg); }
  75% { transform: translateY(-15px) rotate(3deg); }
}

@keyframes magicCook {
  0%, 100% { transform: scale(1) rotate(0deg); filter: hue-rotate(0deg); }
  25% { transform: scale(1.05) rotate(2deg); filter: hue-rotate(90deg); }
  50% { transform: scale(1.1) rotate(-2deg); filter: hue-rotate(180deg); }
  75% { transform: scale(1.05) rotate(1deg); filter: hue-rotate(270deg); }
}

@keyframes psychicGlow {
  0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(69, 183, 209, 0.5); }
  50% { transform: scale(1.05); box-shadow: 0 0 40px rgba(69, 183, 209, 0.8); }
}

@keyframes madScientist {
  0%, 100% { transform: translateY(0); filter: hue-rotate(0deg) brightness(1); }
  25% { transform: translateY(-3px); filter: hue-rotate(90deg) brightness(1.1); }
  50% { transform: translateY(-1px); filter: hue-rotate(180deg) brightness(1.2); }
  75% { transform: translateY(-2px); filter: hue-rotate(270deg) brightness(1.1); }
}

@keyframes superheroListening {
  0%, 100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
  25% { transform: scale(1.05) rotate(2deg); filter: brightness(1.1); }
  50% { transform: scale(1.1) rotate(-1deg); filter: brightness(1.2); }
  75% { transform: scale(1.05) rotate(1deg); filter: brightness(1.1); }
}

@keyframes puppetMaster {
  0%, 100% { transform: translateY(0) rotate(0deg); filter: hue-rotate(0deg); }
  25% { transform: translateY(-5px) rotate(3deg); filter: hue-rotate(90deg); }
  50% { transform: translateY(-8px) rotate(-2deg); filter: hue-rotate(180deg); }
  75% { transform: translateY(-3px) rotate(1deg); filter: hue-rotate(270deg); }
}

@keyframes legoBlockDance {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(180deg); }
}

@keyframes danceFloorPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

@keyframes magicFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes sparkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

@keyframes codeGlow {
  0%, 100% { box-shadow: 0 0 10px rgba(31, 41, 55, 0.3); }
  50% { box-shadow: 0 0 20px rgba(31, 41, 55, 0.6); }
}

@keyframes mirrorGlow {
  0%, 100% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.1); filter: brightness(1.3); }
}

@keyframes thoughtFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
  50% { transform: translateY(-12px) rotate(10deg); opacity: 1; }
}

@keyframes assistantFloat {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

@keyframes scientistWork {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-2px) rotate(1deg); }
  50% { transform: translateY(-4px) rotate(-1deg); }
  75% { transform: translateY(-1px) rotate(0.5deg); }
}

@keyframes testTubeBubble {
  0%, 100% { transform: translateY(0); filter: hue-rotate(0deg); }
  50% { transform: translateY(-5px); filter: hue-rotate(180deg); }
}

@keyframes soundWave {
  0%, 100% { transform: scale(1) translateX(0); opacity: 0.8; }
  50% { transform: scale(1.3) translateX(10px); opacity: 1; }
}

@keyframes puppetString {
  0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
  50% { transform: translateY(-8px) rotate(5deg); opacity: 1; }
}

/* Intermediate Concept Keyframes */
@keyframes flyingOwlPost {
  0%, 100% { transform: translateY(0) rotate(0deg); filter: hue-rotate(0deg); }
  25% { transform: translateY(-8px) rotate(5deg); filter: hue-rotate(90deg); }
  50% { transform: translateY(-12px) rotate(-3deg); filter: hue-rotate(180deg); }
  75% { transform: translateY(-6px) rotate(2deg); filter: hue-rotate(270deg); }
}

@keyframes magicalFrames {
  0%, 100% { transform: scale(1) rotate(0deg); border-radius: 50%; }
  33% { transform: scale(1.1) rotate(2deg); border-radius: 20%; }
  66% { transform: scale(1.05) rotate(-1deg); border-radius: 10%; }
}

@keyframes lifeCoach {
  0%, 100% { transform: translateY(0) scale(1); filter: brightness(1); }
  50% { transform: translateY(-5px) scale(1.05); filter: brightness(1.2); }
}

@keyframes transformerShift {
  0%, 100% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
  25% { transform: rotate(90deg) scale(1.1); filter: hue-rotate(90deg); }
  50% { transform: rotate(180deg) scale(0.9); filter: hue-rotate(180deg); }
  75% { transform: rotate(270deg) scale(1.05); filter: hue-rotate(270deg); }
}

@keyframes vipBouncer {
  0%, 100% { transform: translateX(0) scale(1); }
  25% { transform: translateX(-3px) scale(1.02); }
  50% { transform: translateX(0) scale(1.05); }
  75% { transform: translateX(3px) scale(1.02); }
}

/* Advanced Concept Keyframes */
@keyframes wizardSpells {
  0%, 100% { transform: translateY(0) rotate(0deg); filter: hue-rotate(0deg) brightness(1); }
  33% { transform: translateY(-8px) rotate(5deg); filter: hue-rotate(120deg) brightness(1.3); }
  66% { transform: translateY(-4px) rotate(-3deg); filter: hue-rotate(240deg) brightness(1.1); }
}

@keyframes holographicArchitect {
  0%, 100% { transform: translateY(0) scale(1); opacity: 1; filter: brightness(1); }
  50% { transform: translateY(-10px) scale(1.1); opacity: 0.8; filter: brightness(1.4); }
}

@keyframes mysticPortals {
  0%, 100% { transform: rotate(0deg) scale(1); filter: hue-rotate(0deg); }
  25% { transform: rotate(90deg) scale(1.1); filter: hue-rotate(90deg); }
  50% { transform: rotate(180deg) scale(1.2); filter: hue-rotate(180deg); }
  75% { transform: rotate(270deg) scale(1.1); filter: hue-rotate(270deg); }
}

@keyframes formula1Racing {
  0%, 100% { transform: translateX(0) scale(1); filter: blur(0px); }
  50% { transform: translateX(10px) scale(1.1); filter: blur(1px); }
}

@keyframes magicalBanking {
  0%, 100% { transform: translateY(0) scale(1); filter: brightness(1); }
  33% { transform: translateY(-3px) scale(1.05); filter: brightness(1.2); }
  66% { transform: translateY(-1px) scale(1.02); filter: brightness(1.1); }
}

@keyframes detectiveInvestigation {
  0%, 100% { transform: scale(1) rotate(0deg); filter: sepia(0); }
  50% { transform: scale(1.1) rotate(2deg); filter: sepia(0.3); }
}

@keyframes grammarTeacher {
  0%, 100% { transform: translateY(0) rotate(0deg); filter: brightness(1); }
  25% { transform: translateY(-2px) rotate(1deg); filter: brightness(1.1); }
  75% { transform: translateY(-1px) rotate(-0.5deg); filter: brightness(1.05); }
}

@keyframes magicalGPS {
  0%, 100% { transform: translateY(0) rotate(0deg); filter: hue-rotate(0deg); }
  33% { transform: translateY(-5px) rotate(3deg); filter: hue-rotate(120deg); }
  66% { transform: translateY(-2px) rotate(-2deg); filter: hue-rotate(240deg); }
}

@keyframes printingPress {
  0%, 100% { transform: scale(1) translateY(0); }
  25% { transform: scale(1.02) translateY(-2px); }
  50% { transform: scale(1.05) translateY(-4px); }
  75% { transform: scale(1.02) translateY(-2px); }
}

@keyframes constructionCrew {
  0%, 100% { transform: translateY(0) rotate(0deg); filter: brightness(1); }
  33% { transform: translateY(-6px) rotate(2deg); filter: brightness(1.2); }
  66% { transform: translateY(-3px) rotate(-1deg); filter: brightness(1.1); }
}

@keyframes magicalAppStore {
  0%, 100% { transform: scale(1) rotate(0deg); filter: hue-rotate(0deg); }
  25% { transform: scale(1.05) rotate(1deg); filter: hue-rotate(90deg); }
  50% { transform: scale(1.1) rotate(-1deg); filter: hue-rotate(180deg); }
  75% { transform: scale(1.05) rotate(0.5deg); filter: hue-rotate(270deg); }
}

@keyframes cityKingdoms {
  0%, 100% { transform: translateY(0) scale(1); filter: hue-rotate(0deg) brightness(1); }
  25% { transform: translateY(-4px) scale(1.02); filter: hue-rotate(90deg) brightness(1.1); }
  50% { transform: translateY(-8px) scale(1.05); filter: hue-rotate(180deg) brightness(1.2); }
  75% { transform: translateY(-4px) scale(1.02); filter: hue-rotate(270deg) brightness(1.1); }
}

@keyframes testingPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes resultSlideIn {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive design for mobile devices */
@media (max-width: 768px) {
  .mnemonic-card {
    margin-bottom: 1.5rem;
  }
  
  .card-header {
    padding: 1.5rem;
  }
  
  .concept-icon {
    font-size: 2.5rem;
    margin-right: 1rem;
  }
  
  .concept-title {
    font-size: 1.25rem;
  }
  
  .mnemonic-content {
    padding: 0 1.5rem 1.5rem 1.5rem;
  }
  
  .examples-grid {
    grid-template-columns: 1fr;
  }
}
</style> 