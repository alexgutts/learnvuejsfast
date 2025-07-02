<!--
  Magic Spell Academy - Directives Playground with Mnemonic Learning
  
  This component transforms Vue directives learning into a memorable experience using:
  - Magic Spell Academy theme with wizard apprentices casting spells
  - Animated visual mnemonics that reinforce directive concepts
  - Funny far-fetched associations that stick in memory
  - Interactive elements that demonstrate directive magic
  
  Memory Association: Directives = Magic spells cast by wizard apprentices
  Visual Story: Hogwarts-style academy where v-if, v-for, v-show are actual magic spells
-->

<template>
  <div class="magic-spell-academy">
    <!-- Academy Header with Animated Elements -->
    <div class="academy-header">
      <div class="academy-title">
        <div class="wizard-icon">🧙‍♂️</div>
        <div class="title-content">
          <h4>🏰 Magic Spell Academy</h4>
          <p class="academy-subtitle">Where Apprentice Wizards Master the Art of Vue Directives!</p>
        </div>
        <div class="floating-spells">
          <div v-for="i in 4" :key="i" class="floating-spell" :style="{ animationDelay: `${i * 0.4}s` }">
            ✨
          </div>
        </div>
      </div>
      
      <!-- Memory Trigger Reminder -->
      <div class="memory-trigger">
        <strong>Remember:</strong> DIRECTIVES = "Definitely Incredible Magical Spells, Extremely Cool, Totally Incredible, Very Effective, Super!" 🪄
      </div>
    </div>

    <!-- Visual Story Section -->
    <div class="story-section">
      <div class="story-visual">
        <div class="spell-academy">
          <!-- Wizard Apprentices -->
          <div class="apprentice-wizards">
            <div class="apprentice" :class="{ 'casting': isCastingSpell }">
              <div class="wizard-hat">🎩</div>
              <div class="wizard-face">🧙‍♂️</div>
              <div class="magic-wand" :class="{ 'glowing': isCastingSpell }">🪄</div>
              <div class="apprentice-name">v-if Apprentice</div>
            </div>
            
            <div class="apprentice" :class="{ 'casting': isLoopSpellActive }">
              <div class="wizard-hat">🎩</div>
              <div class="wizard-face">🧙‍♀️</div>
              <div class="magic-wand" :class="{ 'glowing': isLoopSpellActive }">🪄</div>
              <div class="apprentice-name">v-for Apprentice</div>
            </div>
            
            <div class="apprentice" :class="{ 'casting': isShowSpellActive }">
              <div class="wizard-hat">🎩</div>
              <div class="wizard-face">🧙‍♂️</div>
              <div class="magic-wand" :class="{ 'glowing': isShowSpellActive }">🪄</div>
              <div class="apprentice-name">v-show Apprentice</div>
            </div>
          </div>
          
          <!-- Magic Spell Effects -->
          <div class="spell-effects">
            <div 
              v-for="effect in activeSpellEffects" 
              :key="effect.id"
              class="spell-sparkle"
              :style="{ 
                left: effect.x + 'px', 
                top: effect.y + 'px',
                animationDelay: effect.delay + 's'
              }"
            >
              {{ effect.symbol }}
            </div>
          </div>
          
          <!-- Spell Book (Documentation) -->
          <div class="spell-book">
            <div class="book-emoji">📚</div>
            <div class="book-label">Ancient Spell Book</div>
            <div class="book-pages">
              <div class="page" v-for="i in 3" :key="i" :style="{ animationDelay: `${i * 0.2}s` }">
                📄
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="story-explanation">
        <h5>🎭 The Magic Spell Academy Story</h5>
        <p>
          Welcome to the most prestigious magical academy in the Vue kingdom! Here, apprentice wizards learn to cast 
          powerful directives spells that can make elements appear (v-if), multiply items (v-for), and control visibility (v-show). 
          Each directive is like a magic spell with its own incantation and effect. The v-if spell can make things vanish completely, 
          while v-show just makes them invisible but still present in the magical realm (DOM)! 🪄✨
        </p>
      </div>
    </div>

    <!-- Interactive Spell Casting Controls -->
    <div class="spell-controls">
      <div class="control-section">
        <h5>🎮 Practice Your Spell Casting</h5>
        <p>Watch the apprentice wizards demonstrate their magical directives!</p>
        
        <div class="spells-grid">
          <!-- v-if Spell (Existence Magic) -->
          <div class="spell-group existence-spell">
            <div class="spell-header">
              <span class="spell-icon">🪄</span>
              <h6>v-if Spell: Existence Magic</h6>
            </div>
            <div class="spell-description">
              <p>The most powerful spell! Makes elements exist or not exist in the magical realm.</p>
            </div>
            <div class="spell-controls">
              <label class="magic-checkbox">
                <input type="checkbox" v-model="showMagicalItems" @change="castExistenceSpell" />
                <span class="checkbox-custom">✨</span>
                Cast Existence Spell
              </label>
            </div>
            <div class="spell-result">
              <div v-if="showMagicalItems" class="magical-items">
                <div class="magic-item" v-for="item in magicalItems" :key="item.id">
                  <span class="item-icon">{{ item.icon }}</span>
                  <span class="item-name">{{ item.name }}</span>
                </div>
              </div>
              <div v-else class="no-items">
                <span class="puff-smoke">💨</span>
                <p>Items vanished into thin air!</p>
              </div>
            </div>
          </div>
          
          <!-- v-for Spell (Multiplication Magic) -->
          <div class="spell-group multiplication-spell">
            <div class="spell-header">
              <span class="spell-icon">🔄</span>
              <h6>v-for Spell: Multiplication Magic</h6>
            </div>
            <div class="spell-description">
              <p>Creates multiple copies of magical elements from a single template!</p>
            </div>
            <div class="spell-controls">
              <button @click="castMultiplicationSpell" class="spell-button">
                <span class="btn-icon">🪄</span>
                Cast Multiplication Spell
              </button>
            </div>
            <div class="spell-result">
              <div class="multiplied-items">
                <div 
                  v-for="(star, index) in multipliedStars" 
                  :key="index"
                  class="multiplied-star"
                  :style="{ animationDelay: `${index * 0.1}s` }"
                >
                  ⭐
                </div>
              </div>
            </div>
          </div>
          
          <!-- v-show Spell (Visibility Magic) -->
          <div class="spell-group visibility-spell">
            <div class="spell-header">
              <span class="spell-icon">👁️</span>
              <h6>v-show Spell: Visibility Magic</h6>
            </div>
            <div class="spell-description">
              <p>Makes elements invisible but keeps them in the magical realm (DOM)!</p>
            </div>
            <div class="spell-controls">
              <button @click="castVisibilitySpell" class="spell-button">
                <span class="btn-icon">🪄</span>
                {{ isSecretVisible ? 'Hide Secret' : 'Reveal Secret' }}
              </button>
            </div>
            <div class="spell-result">
              <div class="secret-container">
                <div v-show="isSecretVisible" class="secret-message">
                  <span class="secret-icon">🔮</span>
                  <p>The secret of Vue directives: They're just JavaScript with magical syntax!</p>
                </div>
                <div v-if="!isSecretVisible" class="hidden-message">
                  <span class="ghost-icon">👻</span>
                  <p>Secret is hidden but still exists in the DOM!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Spell Combinations -->
    <div class="advanced-spells">
      <h5>🎓 Advanced Spell Combinations</h5>
      <div class="combo-section">
        <div class="combo-spell">
          <h6>v-if + v-for Combo: The Forbidden Technique!</h6>
          <p>Combine existence and multiplication magic for ultimate power!</p>
          <div class="combo-controls">
            <label class="magic-checkbox">
              <input type="checkbox" v-model="showAdvancedItems" />
              <span class="checkbox-custom">⚡</span>
              Enable Advanced Items
            </label>
            <select v-model="selectedCategory" class="magic-select">
              <option value="all">All Categories</option>
              <option value="potions">Potions</option>
              <option value="spells">Spells</option>
              <option value="artifacts">Artifacts</option>
            </select>
          </div>
          <div class="combo-result">
            <div v-if="showAdvancedItems" class="advanced-items">
              <div 
                v-for="item in filteredAdvancedItems" 
                :key="item.id"
                class="advanced-item"
                :class="`category-${item.category}`"
              >
                <span class="item-icon">{{ item.icon }}</span>
                <span class="item-name">{{ item.name }}</span>
                <span class="item-category">{{ item.category }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Memory Reinforcement Section -->
    <div class="memory-reinforcement">
      <div class="reinforcement-card">
        <div class="reinforcement-header">
          <span class="reinforcement-icon">🧠</span>
          <h5>Memory Spell Booster!</h5>
        </div>
        <p class="reinforcement-text">
          <strong>Magical Fact:</strong> Vue directives are like magic spells that transform your HTML into living, breathing elements! 
          v-if is like a vanishing spell (element disappears from DOM), v-show is like an invisibility cloak (element stays but becomes invisible), 
          and v-for is like a duplication charm (creates multiple copies)! 🪄✨
        </p>
        <div class="mnemonic-reminder">
          <strong>Spell Mnemonic:</strong> When you see v-directives, picture wizard apprentices casting spells with glowing wands! 🧙‍♂️⚡
        </div>
      </div>
    </div>

    <!-- Interactive Memory Test -->
    <div class="memory-test">
      <button @click="testSpellKnowledge" class="test-button" :class="{ 'testing': isTesting }">
        {{ isTesting ? 'Testing Your Spell Knowledge... 🔮' : 'Test Your Spell Mastery! 🧙‍♂️' }}
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
 * 🪄 Vue Directives - The Magic Spells of Vue
 * 
 * Vue directives are special attributes that start with 'v-'.
 * They apply special reactive behavior to rendered DOM:
 * 
 * 1. v-if = Existence Spell
 *    - Completely adds/removes elements from DOM
 *    - More expensive but saves memory
 *    - Best for rarely toggled content
 * 
 * 2. v-show = Invisibility Spell
 *    - Toggles CSS 'display' property
 *    - Cheaper for frequent toggles
 *    - Element stays in DOM
 * 
 * 3. v-for = Multiplication Spell
 *    - Renders lists/arrays of items
 *    - Requires unique ':key' binding
 *    - Can be combined with other directives
 */

/**
 * 📝 Reactive State for Our Spells
 * 
 * Each spell needs its own magical energy (reactive state):
 * - Simple toggles use ref() for boolean flags
 * - Complex data uses ref() for arrays/objects
 * - Computed values handle derived magical effects
 */
const showMagicalItems = ref(true)    // Powers the v-if spell
const isSecretVisible = ref(false)    // Powers the v-show spell
const showAdvancedItems = ref(true)   // Powers advanced combinations
const selectedCategory = ref('all')    // Controls spell filtering
const multipliedStars = ref([])       // Stores multiplication results
const isCastingSpell = ref(false)     // Controls spell animations
const isLoopSpellActive = ref(false)  // Controls v-for animations
const isShowSpellActive = ref(false)  // Controls v-show animations
const isTesting = ref(false)          // Memory test state
const showTestResult = ref(false)     // Test result display
const testMessage = ref('')           // Test feedback message
const activeSpellEffects = ref([])    // Stores visual spell effects

/**
 * 📚 Magical Items Data
 * 
 * These arrays provide the source data for our spells:
 * - Each item needs a unique 'id' for :key binding
 * - Objects can have multiple properties
 * - Used to demonstrate different directive effects
 */
const magicalItems = ref([
  { id: 1, name: 'Crystal Ball', icon: '🔮' },
  { id: 2, name: 'Magic Wand', icon: '🪄' },
  { id: 3, name: 'Spell Book', icon: '📚' },
  { id: 4, name: 'Potion Bottle', icon: '🧪' }
])

/**
 * 🎭 Advanced Items for Complex Spells
 * 
 * These items demonstrate more complex directive usage:
 * - Multiple properties for advanced filtering
 * - Used in directive combinations
 * - Shows real-world data structures
 */
const advancedItems = ref([
  { id: 1, name: 'Healing Potion', icon: '🧪', category: 'potions' },
  { id: 2, name: 'Fireball Spell', icon: '🔥', category: 'spells' },
  { id: 3, name: 'Ancient Artifact', icon: '🏺', category: 'artifacts' },
  { id: 4, name: 'Invisibility Potion', icon: '👻', category: 'potions' },
  { id: 5, name: 'Lightning Spell', icon: '⚡', category: 'spells' },
  { id: 6, name: 'Mystic Orb', icon: '🔮', category: 'artifacts' }
])

/**
 * 🔮 Computed Properties - Advanced Spell Effects
 * 
 * This computed property demonstrates:
 * 1. Filtering data based on conditions
 * 2. Reactive updates when dependencies change
 * 3. Common v-for + v-if combination pattern
 */
const filteredAdvancedItems = computed(() => {
  if (selectedCategory.value === 'all') {
    return advancedItems.value
  }
  return advancedItems.value.filter(item => item.category === selectedCategory.value)
})

/**
 * 🪄 Spell Casting Methods
 * 
 * These methods demonstrate:
 * 1. Updating reactive state
 * 2. Triggering animations
 * 3. Managing side effects
 * 4. Common directive patterns
 */
const castExistenceSpell = () => {
  isCastingSpell.value = true
  addSpellEffect('✨', 3)  // Add visual feedback
  
  setTimeout(() => {
    isCastingSpell.value = false
  }, 1000)
}

/**
 * ⭐ Multiplication Spell (v-for demonstration)
 * 
 * This method shows:
 * 1. Dynamic array manipulation
 * 2. Animated list building
 * 3. Timing effects for visual feedback
 */
const castMultiplicationSpell = () => {
  isLoopSpellActive.value = true
  addSpellEffect('⭐', 5)
  
  // Create stars with staggered animation
  multipliedStars.value = []
  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      multipliedStars.value.push(i)
    }, i * 100)
  }
  
  setTimeout(() => {
    isLoopSpellActive.value = false
  }, 1500)
}

/**
 * 👁️ Visibility Spell (v-show demonstration)
 * 
 * This method demonstrates:
 * 1. Toggle pattern with v-show
 * 2. Visual feedback for state changes
 * 3. Simple boolean state management
 */
const castVisibilitySpell = () => {
  isShowSpellActive.value = true
  isSecretVisible.value = !isSecretVisible.value
  addSpellEffect('👁️', 2)
  
  setTimeout(() => {
    isShowSpellActive.value = false
  }, 800)
}

/**
 * ✨ Visual Effects Helper
 * 
 * This method shows:
 * 1. Dynamic effect generation
 * 2. Array manipulation
 * 3. Cleanup with setTimeout
 */
const addSpellEffect = (symbol, count) => {
  for (let i = 0; i < count; i++) {
    const effect = {
      id: Date.now() + i,
      symbol,
      x: Math.random() * 300,
      y: Math.random() * 200,
      delay: i * 0.2
    }
    activeSpellEffects.value.push(effect)
  }
  
  // Cleanup effects after animation
  setTimeout(() => {
    activeSpellEffects.value = []
  }, 2000)
}

/**
 * 🏛️ Component Lifecycle
 * 
 * onMounted demonstrates:
 * 1. Initialization after component is mounted
 * 2. Setting up initial effects
 * 3. Timing of directive applications
 */
onMounted(() => {
  // Add initial magical ambiance
  setTimeout(() => {
    addSpellEffect('✨', 2)
  }, 500)
})

/**
 * 📡 Event Communication
 * 
 * Emits help track:
 * 1. User interactions with directives
 * 2. State changes for analytics
 * 3. Component communication
 */
const emit = defineEmits(['interaction'])

// Track spell interactions
const trackSpellInteraction = (spellType) => {
  emit('interaction', {
    type: 'spell-cast',
    spell: spellType,
    timestamp: new Date().toISOString()
  })
  console.log(`🪄 Spell cast: ${spellType} at Magic Spell Academy`)
}
</script>

<style scoped>
/**
 * 🎨 Magical Styling
 * 
 * Our CSS reinforces directive learning through:
 * 1. Visual feedback for directive effects
 * 2. Smooth transitions for v-show
 * 3. Animation effects for v-for
 * 4. Clear state indication for v-if
 */
.magic-spell-academy {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Academy Header with Magical Elements */
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

.wizard-icon {
  font-size: 3rem;
  animation: float 3s ease-in-out infinite;
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

.floating-spells {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 40px;
}

.floating-spell {
  position: absolute;
  font-size: 1.5rem;
  animation: sparkle 2s ease-in-out infinite;
}

.floating-spell:nth-child(1) { left: 10%; }
.floating-spell:nth-child(2) { left: 30%; }
.floating-spell:nth-child(3) { left: 60%; }
.floating-spell:nth-child(4) { left: 80%; }

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

.spell-academy {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  min-height: 300px;
  backdrop-filter: blur(10px);
}

.apprentice-wizards {
  display: flex;
  justify-content: space-around;
  margin-bottom: 2rem;
}

.apprentice {
  text-align: center;
  transition: all 0.3s ease;
}

.apprentice.casting {
  transform: scale(1.1);
  filter: drop-shadow(0 0 20px rgba(255, 255, 0, 0.8));
}

.wizard-hat {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  animation: wiggle 2s ease-in-out infinite;
}

.wizard-face {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.magic-wand {
  font-size: 2rem;
  transition: all 0.3s ease;
}

.magic-wand.glowing {
  animation: glow 1s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 15px rgba(255, 255, 0, 0.8));
}

.apprentice-name {
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-weight: bold;
}

.spell-effects {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.spell-sparkle {
  position: absolute;
  font-size: 1.5rem;
  animation: sparkleEffect 2s ease-out forwards;
}

.spell-book {
  position: absolute;
  bottom: 20px;
  right: 20px;
  text-align: center;
}

.book-emoji {
  font-size: 2rem;
  animation: bookFlip 3s ease-in-out infinite;
}

.book-label {
  font-size: 0.8rem;
  margin-top: 0.5rem;
}

.book-pages {
  display: flex;
  justify-content: center;
  gap: 2px;
  margin-top: 0.5rem;
}

.page {
  font-size: 0.8rem;
  animation: pageFlutter 2s ease-in-out infinite;
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

/* Interactive Spell Controls */
.spell-controls {
  margin-bottom: 2rem;
}

.control-section h5 {
  text-align: center;
  margin-bottom: 1rem;
  color: #ffd700;
}

.spells-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.spell-group {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.spell-group:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.spell-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.spell-icon {
  font-size: 1.5rem;
}

.spell-header h6 {
  margin: 0;
  color: #ffd700;
}

.spell-description {
  margin-bottom: 1rem;
  opacity: 0.9;
}

.spell-controls {
  margin-bottom: 1rem;
}

.magic-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
}

.magic-checkbox input[type="checkbox"] {
  display: none;
}

.checkbox-custom {
  width: 24px;
  height: 24px;
  border: 2px solid #ffd700;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.magic-checkbox input[type="checkbox"]:checked + .checkbox-custom {
  background: #ffd700;
  color: #333;
  animation: checkboxGlow 0.5s ease;
}

.spell-button {
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #333;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.spell-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
}

.spell-result {
  min-height: 100px;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.magical-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
}

.magic-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  animation: itemAppear 0.5s ease;
}

.item-icon {
  font-size: 1.5rem;
}

.no-items {
  text-align: center;
  opacity: 0.7;
}

.puff-smoke {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
  animation: puffSmoke 1s ease;
}

.multiplied-items {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.multiplied-star {
  font-size: 1.5rem;
  animation: starAppear 0.5s ease;
}

.secret-container {
  width: 100%;
  text-align: center;
}

.secret-message {
  animation: secretReveal 0.5s ease;
}

.secret-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

.hidden-message {
  opacity: 0.5;
  animation: fadeIn 0.5s ease;
}

.ghost-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.5rem;
}

/* Advanced Spells Section */
.advanced-spells {
  margin-bottom: 2rem;
}

.advanced-spells h5 {
  text-align: center;
  color: #ffd700;
  margin-bottom: 1rem;
}

.combo-spell {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.combo-controls {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  align-items: center;
}

.magic-select {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem;
  border-radius: 6px;
  backdrop-filter: blur(10px);
}

.magic-select option {
  background: #333;
  color: white;
}

.advanced-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.advanced-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  animation: itemSlideIn 0.5s ease;
}

.advanced-item.category-potions {
  border-left: 4px solid #4ade80;
}

.advanced-item.category-spells {
  border-left: 4px solid #f59e0b;
}

.advanced-item.category-artifacts {
  border-left: 4px solid #8b5cf6;
}

.item-category {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-left: auto;
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
  animation: pulse 1s ease-in-out infinite;
}

.test-result {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 8px;
  font-size: 1.1rem;
  animation: resultAppear 0.5s ease;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes sparkle {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.2) rotate(180deg); opacity: 0.8; }
}

@keyframes wiggle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

@keyframes glow {
  0% { filter: drop-shadow(0 0 5px rgba(255, 255, 0, 0.5)); }
  100% { filter: drop-shadow(0 0 20px rgba(255, 255, 0, 1)); }
}

@keyframes sparkleEffect {
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
  100% { transform: scale(0) rotate(360deg); opacity: 0; }
}

@keyframes bookFlip {
  0%, 100% { transform: rotateY(0deg); }
  50% { transform: rotateY(20deg); }
}

@keyframes pageFlutter {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(2px); }
}

@keyframes checkboxGlow {
  0% { box-shadow: 0 0 0 rgba(255, 215, 0, 0.5); }
  100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.8); }
}

@keyframes itemAppear {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes puffSmoke {
  0% { transform: scale(0.5); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.8; }
}

@keyframes starAppear {
  0% { transform: scale(0) rotate(0deg); }
  100% { transform: scale(1) rotate(360deg); }
}

@keyframes secretReveal {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 0.5; }
}

@keyframes itemSlideIn {
  0% { transform: translateX(-20px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes resultAppear {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .story-section {
    grid-template-columns: 1fr;
  }
  
  .spells-grid {
    grid-template-columns: 1fr;
  }
  
  .combo-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .advanced-items {
    grid-template-columns: 1fr;
  }
}
</style> 