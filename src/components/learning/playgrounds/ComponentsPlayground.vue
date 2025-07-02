<!--
  Dancing LEGO Blocks Disco - Components Playground with Mnemonic Learning
  
  This component transforms Vue components learning into a memorable experience using:
  - Dancing LEGO blocks theme with robot dance moves
  - Animated visual mnemonics that reinforce component concepts
  - Funny far-fetched associations that stick in memory
  - Interactive elements that demonstrate component composition
  
  Memory Association: Components = Dancing LEGO blocks with sunglasses doing robot dance
  Visual Story: Disco dance floor where LEGO blocks snap together to build amazing websites
-->

<template>
  <div class="lego-disco-components">
    <!-- Disco Header with Animated Elements -->
    <div class="disco-header">
      <div class="disco-title">
        <div class="disco-ball">🕺</div>
        <div class="title-content">
          <h4>🎪 Dancing LEGO Blocks Disco</h4>
          <p class="disco-subtitle">Where Components Come Together in Perfect Harmony!</p>
        </div>
        <div class="disco-lights">
          <div v-for="i in 5" :key="i" class="disco-light" :style="{ animationDelay: `${i * 0.2}s` }">
            ✨
          </div>
        </div>
      </div>
      
      <!-- Memory Trigger Reminder -->
      <div class="memory-trigger">
        <strong>Remember:</strong> COMP-O-NENTS = "Come On, Neon Tiny Dancers!" 💃
      </div>
    </div>

    <!-- Visual Story Section -->
    <div class="story-section">
      <div class="story-visual">
        <div class="dance-floor">
          <!-- Dancing LEGO Blocks -->
          <div class="lego-dancers">
            <div 
              v-for="(block, index) in legoBlocks" 
              :key="block.id"
              class="lego-block-dancer" 
              :class="[`color-${block.color}`, { 'dancing': isDancing }]"
              :style="{ animationDelay: `${index * 0.3}s` }"
              @click="makeBlockDance(block.id)"
            >
              <div class="lego-face">
                <div class="sunglasses">🕶️</div>
                <div class="block-emoji">{{ block.emoji }}</div>
              </div>
              <div class="block-label">{{ block.name }}</div>
            </div>
          </div>
          
          <!-- Dance Floor Effects -->
          <div class="floor-effects">
            <div 
              v-for="effect in floorEffects" 
              :key="effect.id"
              class="floor-sparkle"
              :style="{ 
                left: effect.x + 'px', 
                top: effect.y + 'px',
                animationDelay: effect.delay + 's'
              }"
            >
              ⭐
            </div>
          </div>
          
          <!-- DJ Booth (Parent Component) -->
          <div class="dj-booth">
            <div class="dj-emoji">🎧</div>
            <div class="dj-label">Parent Component</div>
            <div class="music-notes">
              <span v-for="i in 3" :key="i" class="note" :style="{ animationDelay: `${i * 0.5}s` }">
                🎵
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="story-explanation">
        <h5>🎭 The Dancing LEGO Blocks Story</h5>
        <p>
          Welcome to the most amazing disco in the digital world! Here, LEGO blocks aren't just building toys - 
          they're professional dancers with tiny sunglasses and robot dance moves! Each block has its own special 
          dance routine (component logic), but when they come together on the dance floor, they create the most 
          incredible website performances you've ever seen! The DJ (parent component) controls the music and 
          coordinates all the dancers. 🕺✨
        </p>
      </div>
    </div>

    <!-- Interactive Component Builder -->
    <div class="component-builder">
      <div class="builder-section">
        <h5>🎮 Build Your Dancing Component</h5>
        <p>Create your own dancing LEGO block and watch it join the disco!</p>
        
        <div class="builder-controls">
          <!-- Component Name Input -->
          <div class="control-group">
            <label class="control-label">
              <span class="label-icon">🏷️</span>
              Block Name (Component Name):
            </label>
            <input 
              v-model="customBlockName"
              type="text"
              placeholder="Enter your block's stage name..."
              class="disco-input"
              @input="updateCustomBlock"
            />
          </div>
          
          <!-- Props Input (Dance Instructions) -->
          <div class="control-group">
            <label class="control-label">
              <span class="label-icon">📜</span>
              Dance Instructions (Props):
            </label>
            <input 
              v-model="customBlockProps"
              type="text"
              placeholder="Enter dance moves (props)..."
              class="disco-input"
              @input="updateCustomBlock"
            />
          </div>
          
          <!-- Block Color/Style -->
          <div class="control-group">
            <label class="control-label">
              <span class="label-icon">🎨</span>
              Block Style:
            </label>
            <select v-model="customBlockColor" class="disco-select" @change="updateCustomBlock">
              <option value="red">Red Rockstar 🔴</option>
              <option value="blue">Blue Breakdancer 🔵</option>
              <option value="green">Green Groover 🟢</option>
              <option value="yellow">Yellow Yodeler 🟡</option>
              <option value="purple">Purple Pop-locker 🟣</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Component Preview -->
    <div class="component-preview">
      <h5>🎬 Live Preview: Your Dancing Component</h5>
      <div class="preview-stage">
        <div class="preview-component" :class="`theme-${customBlockColor}`">
          <!-- Custom Component Display -->
          <div class="component-header">
            <div class="component-icon">🧩</div>
            <h3 class="component-title">{{ customBlockName || 'My Dancing Block' }}</h3>
          </div>
          
          <div class="component-content">
            <p class="component-description">
              {{ customBlockProps || 'This block is ready to dance!' }}
            </p>
            
            <!-- Simulated Props Display -->
            <div class="props-display">
              <div class="prop-item">
                <span class="prop-label">Name:</span>
                <span class="prop-value">{{ customBlockName || 'Unnamed Dancer' }}</span>
              </div>
              <div class="prop-item">
                <span class="prop-label">Style:</span>
                <span class="prop-value">{{ getColorName(customBlockColor) }}</span>
              </div>
              <div class="prop-item">
                <span class="prop-label">Dance Moves:</span>
                <span class="prop-value">{{ customBlockProps || 'Default Robot Dance' }}</span>
              </div>
            </div>
            
            <!-- Component Actions -->
            <div class="component-actions">
              <button @click="makeComponentDance" class="dance-button">
                {{ isComponentDancing ? 'Stop Dancing 🛑' : 'Start Dancing! 💃' }}
              </button>
              <button @click="addToDiscoFloor" class="add-button">
                Add to Disco Floor! 🕺
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Component Composition Demo -->
    <div class="composition-demo">
      <h5>🎪 Component Composition Magic</h5>
      <div class="composition-explanation">
        <p>
          Watch how multiple dancing LEGO blocks (components) work together! 
          Each block maintains its own dance routine (state) while following the DJ's music (parent props).
        </p>
      </div>
      
      <div class="composition-controls">
        <button @click="startDiscoParty" class="party-button" :class="{ 'partying': isPartyMode }">
          {{ isPartyMode ? 'End Party 🎉' : 'Start Disco Party! 🎊' }}
        </button>
        <button @click="changeMusic" class="music-button">
          Change Music 🎵
        </button>
      </div>
      
      <!-- Component Tree Visualization -->
      <div class="component-tree">
        <div class="tree-node parent-node">
          <div class="node-content">
            <span class="node-icon">🎧</span>
            <span class="node-label">DJ App Component</span>
          </div>
          <div class="tree-children">
            <div v-for="block in legoBlocks" :key="block.id" class="tree-node child-node">
              <div class="node-content">
                <span class="node-icon">{{ block.emoji }}</span>
                <span class="node-label">{{ block.name }}</span>
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
          <h5>Memory Booster!</h5>
        </div>
        <p class="reinforcement-text">
          <strong>Fun Fact:</strong> Just like how you can't eat a LEGO sandwich (please don't try), 
          you can't build a website without components! Each LEGO block component has its own personality 
          and special moves, but they all work together to create something amazing! 🏗️
        </p>
        <div class="mnemonic-reminder">
          <strong>Mnemonic:</strong> When you see Vue components, picture dancing LEGO blocks with sunglasses at a disco! 🕺🕶️
        </div>
      </div>
    </div>

    <!-- Interactive Memory Test -->
    <div class="memory-test">
      <button @click="testMemory" class="test-button" :class="{ 'testing': isTesting }">
        {{ isTesting ? 'Testing Your Disco Memory... 🕺' : 'Test Your Component Knowledge! 🧠' }}
      </button>
      <div v-if="showTestResult" class="test-result">
        {{ testMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

// Dancing LEGO Disco state
const customBlockName = ref('')
const customBlockProps = ref('')
const customBlockColor = ref('blue')
const isDancing = ref(false)
const isComponentDancing = ref(false)
const isPartyMode = ref(false)
const isTesting = ref(false)
const showTestResult = ref(false)
const testMessage = ref('')
const floorEffects = ref([])

// LEGO block dancers data
const legoBlocks = ref([
  { id: 1, name: 'Header Block', emoji: '🧩', color: 'red', danceMove: 'robot' },
  { id: 2, name: 'Content Block', emoji: '📄', color: 'blue', danceMove: 'breakdance' },
  { id: 3, name: 'Footer Block', emoji: '🦶', color: 'green', danceMove: 'moonwalk' },
  { id: 4, name: 'Sidebar Block', emoji: '📋', color: 'yellow', danceMove: 'twist' }
])

// Methods for disco interactions
const makeBlockDance = (blockId) => {
  const block = legoBlocks.value.find(b => b.id === blockId)
  if (block) {
    console.log(`🕺 ${block.name} is doing the ${block.danceMove}!`)
    createFloorEffect()
    triggerDanceAnimation()
  }
}

const updateCustomBlock = () => {
  // Trigger visual updates when custom block changes
  createFloorEffect()
}

const makeComponentDance = () => {
  isComponentDancing.value = !isComponentDancing.value
  createFloorEffect()
  
  if (isComponentDancing.value) {
    console.log('🎉 Custom component joined the dance floor!')
  }
}

const addToDiscoFloor = () => {
  if (customBlockName.value.trim()) {
    const newBlock = {
      id: Date.now(),
      name: customBlockName.value,
      emoji: '🆕',
      color: customBlockColor.value,
      danceMove: 'custom'
    }
    
    legoBlocks.value.push(newBlock)
    createFloorEffect()
    
    // Reset form
    customBlockName.value = ''
    customBlockProps.value = ''
    
    console.log(`🎊 ${newBlock.name} joined the disco floor!`)
  }
}

const startDiscoParty = () => {
  isPartyMode.value = !isPartyMode.value
  isDancing.value = isPartyMode.value
  
  if (isPartyMode.value) {
    // Create multiple floor effects for party mode
    for (let i = 0; i < 10; i++) {
      setTimeout(() => createFloorEffect(), i * 200)
    }
    console.log('🎉 DISCO PARTY STARTED! All blocks are dancing!')
  } else {
    console.log('🎭 Party ended. Blocks are taking a break.')
  }
}

const changeMusic = () => {
  const musicTypes = ['🎵 Pop', '🎸 Rock', '🎺 Jazz', '🎤 Hip-hop', '🎻 Classical']
  const randomMusic = musicTypes[Math.floor(Math.random() * musicTypes.length)]
  
  createFloorEffect()
  console.log(`🎧 DJ changed the music to: ${randomMusic}`)
  
  // Trigger all blocks to react to music change
  triggerDanceAnimation()
}

const triggerDanceAnimation = () => {
  // Add dance class to all blocks temporarily
  const blocks = document.querySelectorAll('.lego-block-dancer')
  blocks.forEach((block, index) => {
    setTimeout(() => {
      block.classList.add('dancing')
      setTimeout(() => {
        block.classList.remove('dancing')
      }, 2000)
    }, index * 100)
  })
}

// Visual effects for the disco floor
const createFloorEffect = () => {
  const effect = {
    id: Date.now() + Math.random(),
    x: Math.random() * 400,
    y: Math.random() * 200,
    delay: Math.random() * 0.5
  }
  
  floorEffects.value.push(effect)
  
  // Remove effect after animation
  setTimeout(() => {
    floorEffects.value = floorEffects.value.filter(e => e.id !== effect.id)
  }, 2000)
}

// Helper functions
const getColorName = (color) => {
  const colorNames = {
    red: 'Red Rockstar',
    blue: 'Blue Breakdancer',
    green: 'Green Groover',
    yellow: 'Yellow Yodeler',
    purple: 'Purple Pop-locker'
  }
  return colorNames[color] || 'Unknown Style'
}

// Memory test functionality
const testMemory = async () => {
  isTesting.value = true
  showTestResult.value = false
  
  // Simulate disco memory test
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  const messages = [
    "🕺 Fantastic! You remember that components are like dancing LEGO blocks!",
    "🧩 Excellent! Your component composition skills are on fire!",
    "💃 Amazing! You've mastered the art of LEGO block choreography!",
    "🎪 Incredible! Your memory disco is in full swing!"
  ]
  
  testMessage.value = messages[Math.floor(Math.random() * messages.length)]
  showTestResult.value = true
  isTesting.value = false
  
  // Trigger celebration effects
  startDiscoParty()
  setTimeout(() => {
    isPartyMode.value = false
    isDancing.value = false
  }, 3000)
  
  // Hide result after a few seconds
  setTimeout(() => {
    showTestResult.value = false
  }, 5000)
}

// Initialize the disco
onMounted(() => {
  console.log('🎪 Dancing LEGO Blocks Disco initialized - Let the component party begin!')
  
  // Create some initial floor effects
  setTimeout(() => {
    createFloorEffect()
  }, 1000)
  
  // Start with a welcome dance
  setTimeout(() => {
    triggerDanceAnimation()
  }, 2000)
})

// Emit interaction events for parent component tracking
const emit = defineEmits(['interaction'])

// Track all interactions for learning analytics
watch([customBlockName, customBlockProps, customBlockColor], () => {
  emit('interaction', {
    component: 'DancingLegoBlocksDisco',
    type: 'component-creation',
    data: { 
      name: customBlockName.value,
      props: customBlockProps.value,
      color: customBlockColor.value
    }
  })
})

watch(legoBlocks, () => {
  emit('interaction', {
    component: 'DancingLegoBlocksDisco',
    type: 'component-composition',
    data: { blockCount: legoBlocks.value.length }
  })
}, { deep: true })
</script>

<style scoped>
/*
  Dancing LEGO Blocks Disco Styling
  
  Designed to reinforce the mnemonic association of Vue components with:
  - Vibrant disco theme with dancing animations
  - LEGO block visual metaphors
  - Interactive elements that respond to user actions
  - Visual hierarchy that guides component learning
*/

.lego-disco-components {
  background: linear-gradient(135deg, 
    rgba(255, 107, 107, 0.1) 0%, 
    rgba(59, 130, 246, 0.1) 25%,
    rgba(16, 185, 129, 0.1) 50%,
    rgba(251, 191, 36, 0.1) 75%,
    rgba(139, 92, 246, 0.1) 100%);
  border-radius: 16px;
  padding: 2rem;
  border: 2px solid rgba(255, 107, 107, 0.3);
  position: relative;
  overflow: hidden;
}

/* Disco Header */
.disco-header {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.disco-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
}

.disco-ball {
  font-size: 3rem;
  animation: discoBallSpin 4s infinite linear;
}

.title-content h4 {
  margin: 0;
  font-size: 1.5rem;
  color: #dc2626;
  font-weight: 700;
}

.disco-subtitle {
  margin: 0.5rem 0 0 0;
  color: #ea580c;
  font-size: 1rem;
  font-style: italic;
}

.disco-lights {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
}

.disco-light {
  font-size: 1rem;
  animation: discoLightFlash 2s infinite ease-in-out;
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
  min-height: 300px;
  background: linear-gradient(135deg, #1f2937, #374151);
  border-radius: 16px;
  padding: 1rem;
  border: 3px solid #fbbf24;
  overflow: hidden;
}

.dance-floor {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 250px;
}

.lego-dancers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.lego-block-dancer {
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border: 2px solid #374151;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.lego-block-dancer:hover {
  transform: translateY(-5px) rotate(2deg);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.lego-block-dancer.dancing {
  animation: robotDance 2s ease-in-out;
  transform: scale(1.1);
}

.color-red { border-color: #ef4444; background: linear-gradient(135deg, #fecaca, #ef4444); }
.color-blue { border-color: #3b82f6; background: linear-gradient(135deg, #dbeafe, #3b82f6); }
.color-green { border-color: #10b981; background: linear-gradient(135deg, #d1fae5, #10b981); }
.color-yellow { border-color: #f59e0b; background: linear-gradient(135deg, #fef3c7, #f59e0b); }
.color-purple { border-color: #8b5cf6; background: linear-gradient(135deg, #f3e8ff, #8b5cf6); }

.lego-face {
  position: relative;
  margin-bottom: 0.5rem;
}

.sunglasses {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.8rem;
}

.block-emoji {
  font-size: 2rem;
  margin-top: 0.5rem;
}

.block-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #1f2937;
}

.floor-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floor-sparkle {
  position: absolute;
  font-size: 1rem;
  animation: sparkleFloat 2s ease-out forwards;
}

.dj-booth {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: linear-gradient(135deg, #1f2937, #111827);
  border: 2px solid #fbbf24;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  color: white;
}

.dj-emoji {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.dj-label {
  font-size: 0.7rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.music-notes {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
}

.note {
  font-size: 0.8rem;
  animation: musicFloat 2s infinite ease-in-out;
}

.story-explanation {
  background: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  border-radius: 12px;
  border: 2px solid rgba(220, 38, 38, 0.3);
}

.story-explanation h5 {
  margin: 0 0 1rem 0;
  color: #dc2626;
  font-size: 1.1rem;
}

.story-explanation p {
  margin: 0;
  color: #7f1d1d;
  line-height: 1.6;
  font-size: 0.9rem;
}

/* Component Builder */
.component-builder {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 2px solid rgba(59, 130, 246, 0.3);
}

.builder-section h5 {
  margin: 0 0 0.5rem 0;
  color: #1e40af;
  font-size: 1.1rem;
}

.builder-section p {
  margin: 0 0 1.5rem 0;
  color: #3730a3;
  font-size: 0.9rem;
}

.builder-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1e40af;
}

.label-icon {
  font-size: 1rem;
}

.disco-input,
.disco-select {
  padding: 0.75rem;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #1e40af;
  transition: all 0.3s ease;
}

.disco-input:focus,
.disco-select:focus {
  outline: none;
  border-color: #1d4ed8;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Component Preview */
.component-preview {
  margin-bottom: 2rem;
}

.component-preview h5 {
  text-align: center;
  margin: 0 0 1.5rem 0;
  color: #059669;
  font-size: 1.2rem;
}

.preview-stage {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border: 2px solid #10b981;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
}

.preview-component {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 1.5rem;
  max-width: 400px;
  margin: 0 auto;
  border: 2px solid #e5e7eb;
  transition: all 0.3s ease;
}

.theme-red { border-color: #ef4444; background: linear-gradient(135deg, #fef2f2, rgba(255, 255, 255, 0.9)); }
.theme-blue { border-color: #3b82f6; background: linear-gradient(135deg, #eff6ff, rgba(255, 255, 255, 0.9)); }
.theme-green { border-color: #10b981; background: linear-gradient(135deg, #f0fdf4, rgba(255, 255, 255, 0.9)); }
.theme-yellow { border-color: #f59e0b; background: linear-gradient(135deg, #fffbeb, rgba(255, 255, 255, 0.9)); }
.theme-purple { border-color: #8b5cf6; background: linear-gradient(135deg, #faf5ff, rgba(255, 255, 255, 0.9)); }

.component-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  justify-content: center;
}

.component-icon {
  font-size: 2rem;
}

.component-title {
  margin: 0;
  font-size: 1.2rem;
  color: #1f2937;
}

.component-description {
  margin: 0 0 1.5rem 0;
  color: #6b7280;
  font-style: italic;
}

.props-display {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: left;
}

.prop-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.prop-item:last-child {
  border-bottom: none;
}

.prop-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.8rem;
}

.prop-value {
  color: #6b7280;
  font-size: 0.8rem;
}

.component-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.dance-button,
.add-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dance-button {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.add-button {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.dance-button:hover,
.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Composition Demo */
.composition-demo {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 2px solid rgba(139, 92, 246, 0.3);
}

.composition-demo h5 {
  margin: 0 0 1rem 0;
  color: #7c3aed;
  font-size: 1.2rem;
  text-align: center;
}

.composition-explanation {
  margin-bottom: 1.5rem;
  text-align: center;
}

.composition-explanation p {
  margin: 0;
  color: #5b21b6;
  line-height: 1.6;
  font-size: 0.9rem;
}

.composition-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.party-button,
.music-button {
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.party-button {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.party-button.partying {
  animation: partyPulse 1s infinite ease-in-out;
}

.music-button {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.party-button:hover,
.music-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

/* Component Tree */
.component-tree {
  background: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
}

.tree-node {
  margin-bottom: 1rem;
}

.parent-node .node-content {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #92400e;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: 700;
  margin-bottom: 1rem;
}

.tree-children {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  padding-left: 2rem;
  position: relative;
}

.tree-children::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #d1d5db;
}

.child-node .node-content {
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid #d1d5db;
  padding: 0.75rem;
  border-radius: 8px;
  text-align: center;
  font-size: 0.8rem;
}

.node-icon {
  font-size: 1.2rem;
  margin-right: 0.5rem;
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
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.test-button:hover:not(.testing) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
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
@keyframes discoBallSpin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes discoLightFlash {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

@keyframes robotDance {
  0%, 100% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(5deg) scale(1.05); }
  50% { transform: rotate(-5deg) scale(1.1); }
  75% { transform: rotate(3deg) scale(1.05); }
}

@keyframes sparkleFloat {
  0% { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
}

@keyframes musicFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes partyPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
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
  
  .builder-controls {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .lego-dancers {
    grid-template-columns: 1fr;
  }
  
  .component-actions {
    flex-direction: column;
  }
  
  .composition-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .tree-children {
    grid-template-columns: 1fr;
    padding-left: 1rem;
  }
}
</style> 