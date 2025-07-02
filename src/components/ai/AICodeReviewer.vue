<!--
  AI Code Reviewer Component - Intelligent Vue.js Code Analysis
  
  This component provides AI-powered code review functionality:
  - Analyzes Vue.js code for best practices and improvements
  - Provides constructive feedback with explanations
  - Suggests optimizations and alternative approaches
  - Follows the app's modern design system and encouraging tone
  - Helps users learn through practical code examples
-->

<template>
  <div class="ai-code-reviewer">
    <!-- Header -->
    <div class="reviewer-header">
      <div class="header-icon">🔍</div>
      <div class="header-content">
        <h3 class="header-title">AI Code Reviewer</h3>
        <p class="header-subtitle">
          Get expert feedback on your Vue.js code! Paste your code below and I'll analyze it 
          for best practices, performance, and suggest improvements. 🚀
        </p>
      </div>
    </div>

    <!-- Code Input Section -->
    <div class="code-input-section">
      <div class="input-header">
        <label for="code-input" class="input-label">
          📝 Paste Your Vue Code Here:
        </label>
        <div class="code-type-selector">
          <select v-model="selectedCodeType" class="code-type-select">
            <option value="component">Vue Component</option>
            <option value="template">Template Only</option>
            <option value="script">Script Only</option>
            <option value="style">Style Only</option>
            <option value="composable">Composable</option>
          </select>
        </div>
      </div>
      
      <div class="code-input-container">
        <textarea
          id="code-input"
          v-model="codeToReview"
          placeholder="// Paste your Vue.js code here...
// For example:
<template>
  <div class='my-component'>
    <h1>{{ title }}</h1>
    <button @click='handleClick'>Click me!</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello Vue!'
    }
  },
  methods: {
    handleClick() {
      console.log('Button clicked!')
    }
  }
}
</script>"
          class="code-textarea"
          rows="12"
          :disabled="isAnalyzing"
        ></textarea>
        
        <!-- Code input actions -->
        <div class="input-actions">
          <button 
            @click="clearCode"
            class="action-btn action-btn--clear"
            :disabled="!codeToReview.trim()"
            title="Clear code"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18"/>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            </svg>
            Clear
          </button>
          
          <button 
            @click="loadExample"
            class="action-btn action-btn--example"
            title="Load example code"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
            Example
          </button>
          
          <button 
            @click="analyzeCode"
            class="action-btn action-btn--analyze"
            :disabled="!codeToReview.trim() || isAnalyzing"
            :class="{ 'btn-loading': isAnalyzing }"
          >
            <svg v-if="!isAnalyzing" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
              <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
            </svg>
            <div v-else class="loading-spinner"></div>
            {{ isAnalyzing ? 'Analyzing...' : 'Analyze Code' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Review Results Section -->
    <div v-if="reviewResult" class="review-results">
      <div class="results-header">
        <div class="score-display">
          <div class="score-circle" :class="getScoreClass(reviewResult.overallScore)">
            <span class="score-number">{{ reviewResult.overallScore }}</span>
            <span class="score-label">/ 10</span>
          </div>
          <div class="score-info">
            <h4 class="score-title">Overall Score</h4>
            <p class="score-description">{{ getScoreDescription(reviewResult.overallScore) }}</p>
          </div>
        </div>
      </div>

      <!-- Strengths Section -->
      <div v-if="reviewResult.strengths?.length" class="review-section strengths-section">
        <div class="section-header">
          <div class="section-icon">💪</div>
          <h4 class="section-title">What You're Doing Great!</h4>
        </div>
        <ul class="strengths-list">
          <li 
            v-for="strength in reviewResult.strengths"
            :key="strength"
            class="strength-item"
          >
            <div class="item-icon">✅</div>
            <span class="item-text">{{ strength }}</span>
          </li>
        </ul>
      </div>

      <!-- Improvements Section -->
      <div v-if="reviewResult.improvements?.length" class="review-section improvements-section">
        <div class="section-header">
          <div class="section-icon">🚀</div>
          <h4 class="section-title">Areas for Improvement</h4>
        </div>
        <div class="improvements-list">
          <div 
            v-for="(improvement, index) in reviewResult.improvements"
            :key="index"
            class="improvement-item"
            :class="`severity-${improvement.severity}`"
          >
            <div class="improvement-header">
              <div class="severity-badge" :class="`badge-${improvement.severity}`">
                {{ improvement.severity.toUpperCase() }}
              </div>
              <h5 class="improvement-title">{{ improvement.issue }}</h5>
            </div>
            <p class="improvement-suggestion">{{ improvement.suggestion }}</p>
            <div v-if="improvement.example" class="improvement-example">
              <div class="example-header">💡 Example:</div>
              <pre class="example-code"><code>{{ improvement.example }}</code></pre>
            </div>
          </div>
        </div>
      </div>

      <!-- Encouragement Section -->
      <div class="review-section encouragement-section">
        <div class="section-header">
          <div class="section-icon">🎉</div>
          <h4 class="section-title">Keep Going!</h4>
        </div>
        <p class="encouragement-text">{{ reviewResult.encouragement }}</p>
      </div>

      <!-- Next Steps Section -->
      <div v-if="reviewResult.nextSteps?.length" class="review-section next-steps-section">
        <div class="section-header">
          <div class="section-icon">📚</div>
          <h4 class="section-title">Suggested Next Steps</h4>
        </div>
        <ul class="next-steps-list">
          <li 
            v-for="step in reviewResult.nextSteps"
            :key="step"
            class="next-step-item"
          >
            <div class="step-number">{{ reviewResult.nextSteps.indexOf(step) + 1 }}</div>
            <span class="step-text">{{ step }}</span>
          </li>
        </ul>
      </div>

      <!-- Review Actions -->
      <div class="review-actions">
        <button 
          @click="analyzeCode"
          class="action-btn action-btn--reanalyze"
          :disabled="isAnalyzing"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 4v6h6"/>
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
          </svg>
          Re-analyze
        </button>
        
        <button 
          @click="shareReview"
          class="action-btn action-btn--share"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16,6 12,2 8,6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          Share Results
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="!isAnalyzing" class="empty-state">
      <div class="empty-icon">🤖</div>
      <h4 class="empty-title">Ready to Review Your Code!</h4>
      <p class="empty-description">
        Paste your Vue.js code above and click "Analyze Code" to get expert feedback 
        and suggestions for improvement. I'll help you write better Vue code! 💪
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { aiCodeReviewer } from '@/services/aiService.js';
import { useProgress } from '@/composables/useProgress.js';

// Props definition
const props = defineProps({
  // Initial code to review (optional)
  initialCode: {
    type: String,
    default: ''
  }
});

// Emits definition
const emit = defineEmits(['code-reviewed']);
    // Reactive state
    const codeToReview = ref(props.initialCode || '');
    const selectedCodeType = ref('component');
    const reviewResult = ref(null);
    const isAnalyzing = ref(false);

    // Progress tracking
    const { trackProgress } = useProgress();

    // Example code snippets for different types
    const exampleCodes = {
      component: `<template>
  <div class="user-profile">
    <img :src="user.avatar" :alt="user.name" />
    <h2>{{ user.name }}</h2>
    <button @click="toggleFollow">
      {{ isFollowing ? 'Unfollow' : 'Follow' }}
    </button>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'UserProfile',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const isFollowing = ref(false)
    
    const toggleFollow = () => {
      isFollowing.value = !isFollowing.value
    }
    
    return {
      isFollowing,
      toggleFollow
    }
  }
}
</script>,
      template: `<template>
  <div class="todo-list">
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add new todo..." />
    <ul>
      <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.done }">
        <input type="checkbox" v-model="todo.done" />
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">Remove</button>
      </li>
    </ul>
  </div>
</template>`,
      script: `import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    const users = ref([])
    
    const doubleCount = computed(() => count.value * 2)
    
    const increment = () => {
      count.value++
    }
    
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users')
        users.value = await response.json()
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }
    
    onMounted(() => {
      fetchUsers()
    })
    
    return {
      count,
      users,
      doubleCount,
      increment
    }
  }
}`,
      composable: `import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const doubleCount = computed(() => count.value * 2)
  
  const increment = () => {
    count.value++
  }
  
  const decrement = () => {
    count.value--
  }
  
  const reset = () => {
    count.value = initialValue
  }
  
  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}`
    };

    /**
     * Analyze the provided code using AI
     */
    const analyzeCode = async () => {
      if (!codeToReview.value.trim()) return;

      isAnalyzing.value = true;
      reviewResult.value = null;

      try {
        const result = await aiCodeReviewer.reviewCode(
          codeToReview.value,
          selectedCodeType.value
        );

        reviewResult.value = result;

        // Track the code review for progress
        trackProgress('ai-code-review', {
          codeType: selectedCodeType.value,
          score: result.overallScore,
          improvementsCount: result.improvements?.length || 0
        });

        // Emit the review result
        emit('code-reviewed', {
          code: codeToReview.value,
          codeType: selectedCodeType.value,
          result
        });

      } catch (error) {
        console.error('Error analyzing code:', error);
        
        // Show fallback result
        reviewResult.value = {
          overallScore: 7,
          strengths: ["Code structure looks good!"],
          improvements: [
            {
              issue: "AI review temporarily unavailable",
              severity: "low",
              suggestion: "Try the review again in a moment, or check Vue documentation for best practices",
              example: ""
            }
          ],
          encouragement: "Keep coding! Every line of code is a step forward in your Vue journey! 🚀",
          nextSteps: ["Continue practicing", "Explore Vue documentation"]
        };
      } finally {
        isAnalyzing.value = false;
      }
    };

    /**
     * Clear the code input
     */
    const clearCode = () => {
      codeToReview.value = '';
      reviewResult.value = null;
    };

    /**
     * Load example code based on selected type
     */
    const loadExample = () => {
      codeToReview.value = exampleCodes[selectedCodeType.value] || exampleCodes.component;
    };

    /**
     * Get CSS class for score display
     */
    const getScoreClass = (score) => {
      if (score >= 8) return 'score-excellent';
      if (score >= 6) return 'score-good';
      if (score >= 4) return 'score-fair';
      return 'score-needs-work';
    };

    /**
     * Get description for score
     */
    const getScoreDescription = (score) => {
      if (score >= 8) return 'Excellent! Your code follows Vue best practices! 🌟';
      if (score >= 6) return 'Good work! Just a few improvements needed. 👍';
      if (score >= 4) return 'Not bad! Some areas could use attention. 💪';
      return 'Keep learning! Everyone starts somewhere. 🚀';
    };

    /**
     * Share review results
     */
    const shareReview = async () => {
      if (!reviewResult.value) return;

      const shareText = `My Vue.js code got a ${reviewResult.value.overallScore}/10 score from the AI Code Reviewer! 🚀`;
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Vue.js Code Review Results',
            text: shareText,
            url: window.location.href
          });
        } catch (error) {
          console.log('Share cancelled or failed:', error);
        }
      } else {
        // Fallback to copying to clipboard
        try {
          await navigator.clipboard.writeText(shareText);
          alert('Results copied to clipboard!');
        } catch (error) {
          console.error('Failed to copy to clipboard:', error);
        }
      }
    };

// Initialize with initial code if provided
onMounted(() => {
  if (props.initialCode) {
    analyzeCode();
  }
});
</script>

<style scoped>
/* AI Code Reviewer Styles following the app's design system */
.ai-code-reviewer {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  color: white;
}

/* Header */
.reviewer-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 32px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.header-icon {
  font-size: 48px;
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.header-title {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: white;
}

.header-subtitle {
  margin: 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

/* Code Input Section */
.code-input-section {
  margin-bottom: 32px;
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.input-label {
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.code-type-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.code-type-select {
  padding: 8px 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  backdrop-filter: blur(10px);
}

.code-type-select option {
  background: #333;
  color: white;
}

.code-input-container {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 16px;
  backdrop-filter: blur(10px);
}

.code-textarea {
  width: 100%;
  min-height: 300px;
  padding: 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.3);
  color: #f8f8f2;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: border-color 0.3s ease;
}

.code-textarea:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
}

.code-textarea::placeholder {
  color: rgba(248, 248, 242, 0.6);
}

.input-actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
  justify-content: flex-end;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.action-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn svg {
  width: 16px;
  height: 16px;
}

.action-btn--analyze {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  border-color: transparent;
}

.action-btn--analyze:hover:not(:disabled) {
  background: linear-gradient(135deg, #45b7aa, #3d8b7a);
}

.btn-loading {
  pointer-events: none;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Review Results */
.review-results {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 24px;
  color: #333;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.results-header {
  margin-bottom: 32px;
}

.score-display {
  display: flex;
  align-items: center;
  gap: 20px;
}

.score-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  position: relative;
  border: 4px solid;
}

.score-number {
  font-size: 24px;
  line-height: 1;
}

.score-label {
  font-size: 12px;
  opacity: 0.8;
}

.score-excellent {
  background: linear-gradient(135deg, #2ecc71, #27ae60);
  border-color: #27ae60;
  color: white;
}

.score-good {
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-color: #2980b9;
  color: white;
}

.score-fair {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  border-color: #e67e22;
  color: white;
}

.score-needs-work {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-color: #c0392b;
  color: white;
}

.score-info {
  flex: 1;
}

.score-title {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.score-description {
  margin: 0;
  color: #666;
  font-size: 16px;
}

/* Review Sections */
.review-section {
  margin-bottom: 24px;
  padding: 20px;
  border-radius: 12px;
  border-left: 4px solid;
}

.strengths-section {
  background: rgba(46, 204, 113, 0.1);
  border-left-color: #2ecc71;
}

.improvements-section {
  background: rgba(52, 152, 219, 0.1);
  border-left-color: #3498db;
}

.encouragement-section {
  background: rgba(155, 89, 182, 0.1);
  border-left-color: #9b59b6;
}

.next-steps-section {
  background: rgba(241, 196, 15, 0.1);
  border-left-color: #f1c40f;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.section-icon {
  font-size: 24px;
}

.section-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

/* Strengths List */
.strengths-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.strength-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.strength-item:last-child {
  border-bottom: none;
}

.item-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.item-text {
  color: #333;
  font-size: 14px;
}

/* Improvements List */
.improvements-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.improvement-item {
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid;
}

.severity-high {
  background: rgba(231, 76, 60, 0.1);
  border-left-color: #e74c3c;
}

.severity-medium {
  background: rgba(243, 156, 18, 0.1);
  border-left-color: #f39c12;
}

.severity-low {
  background: rgba(52, 152, 219, 0.1);
  border-left-color: #3498db;
}

.improvement-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.severity-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-high {
  background: #e74c3c;
  color: white;
}

.badge-medium {
  background: #f39c12;
  color: white;
}

.badge-low {
  background: #3498db;
  color: white;
}

.improvement-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.improvement-suggestion {
  margin: 0 0 12px 0;
  color: #666;
  line-height: 1.6;
}

.improvement-example {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 12px;
}

.example-header {
  font-size: 12px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
}

.example-code {
  margin: 0;
  padding: 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #333;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Encouragement and Next Steps */
.encouragement-text {
  margin: 0;
  font-size: 16px;
  color: #333;
  line-height: 1.6;
}

.next-steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.next-step-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0;
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f1c40f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

.step-text {
  color: #333;
  font-size: 14px;
  line-height: 1.5;
}

/* Review Actions */
.review-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.action-btn--reanalyze {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: transparent;
  color: white;
}

.action-btn--share {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  border-color: transparent;
  color: white;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
}

.empty-title {
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 600;
  color: white;
}

.empty-description {
  margin: 0;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

/* Responsive Design */
@media (max-width: 768px) {
  .ai-code-reviewer {
    padding: 16px;
    border-radius: 16px;
  }
  
  .reviewer-header {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .input-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .input-actions {
    flex-wrap: wrap;
  }
  
  .score-display {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  
  .review-actions {
    flex-direction: column;
  }
}
</style>
