<!--
  AI Tutor Chat Component - Personal Vue.js Learning Assistant
  
  This component provides an interactive chat interface with an AI tutor that:
  - Answers Vue.js questions with context awareness
  - Maintains conversation history
  - Adapts responses based on user's learning progress
  - Uses the app's fun memory palace style and mnemonics
  - Provides encouraging, educational guidance
  - Follows the modern design system established in the app
-->

<template>
  <div class="ai-tutor-chat">
    <!-- Chat Header -->
    <div class="chat-header">
      <div class="tutor-avatar">
        <div class="avatar-icon">🤖</div>
        <div class="avatar-status" :class="{ 'status-online': isOnline }"></div>
      </div>
      <div class="tutor-info">
        <h3 class="tutor-name">Vue AI Tutor</h3>
        <p class="tutor-status">
          {{ isOnline ? 'Ready to help with Vue concepts!' : 'Connecting...' }}
        </p>
      </div>
      <div class="chat-actions">
        <!-- Clear chat button -->
        <button 
          @click="clearChat" 
          class="action-btn action-btn--clear"
          title="Clear conversation"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </button>
        
        <!-- Minimize/expand button -->
        <button 
          @click="toggleMinimized" 
          class="action-btn action-btn--minimize"
          :title="isMinimized ? 'Expand chat' : 'Minimize chat'"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path v-if="isMinimized" d="M18 15l-6-6-6 6"/>
            <path v-else d="M6 9l6 6 6-6"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Chat Messages Area -->
    <div 
      v-show="!isMinimized" 
      class="chat-messages" 
      ref="messagesContainer"
    >
      <!-- Welcome message -->
      <div v-if="messages.length === 0" class="welcome-message">
        <div class="welcome-content">
          <div class="welcome-icon">🎉</div>
          <h4 class="welcome-title">Hey there, Vue explorer!</h4>
          <p class="welcome-text">
            I'm your personal AI tutor, here to help you master Vue 3 through our 
            fun memory palace system! Ask me anything about dancing LEGO blocks (components), 
            psychic mirrors (reactivity), or mad scientist laboratories (Composition API)! 🧪✨
          </p>
          <div class="quick-questions">
            <p class="quick-title">Try asking me:</p>
            <div class="question-suggestions">
              <button 
                v-for="suggestion in quickQuestions"
                :key="suggestion"
                @click="sendMessage(suggestion)"
                class="suggestion-btn"
              >
                {{ suggestion }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Chat messages -->
      <div 
        v-for="message in messages" 
        :key="message.id"
        class="message"
        :class="`message--${message.role}`"
      >
        <!-- User message -->
        <div v-if="message.role === 'user'" class="message-content message-content--user">
          <div class="message-bubble message-bubble--user">
            <p class="message-text">{{ message.content }}</p>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
          <div class="message-avatar message-avatar--user">
            <div class="avatar-icon">👤</div>
          </div>
        </div>

        <!-- AI tutor message -->
        <div v-else class="message-content message-content--assistant">
          <div class="message-avatar message-avatar--assistant">
            <div class="avatar-icon">🤖</div>
          </div>
          <div class="message-bubble message-bubble--assistant">
            <div class="message-text" v-html="formatMessageContent(message.content)"></div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
            
            <!-- Message actions -->
            <div class="message-actions">
              <button 
                @click="copyMessage(message.content)"
                class="message-action"
                title="Copy message"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
              </button>
              <button 
                @click="rateMessage(message.id, 'helpful')"
                class="message-action"
                :class="{ 'action-active': message.rating === 'helpful' }"
                title="Helpful"
              >
                👍
              </button>
              <button 
                @click="rateMessage(message.id, 'not-helpful')"
                class="message-action"
                :class="{ 'action-active': message.rating === 'not-helpful' }"
                title="Not helpful"
              >
                👎
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Typing indicator -->
      <div v-if="isTyping" class="message message--assistant">
        <div class="message-content message-content--assistant">
          <div class="message-avatar message-avatar--assistant">
            <div class="avatar-icon">��</div>
          </div>
          <div class="message-bubble message-bubble--assistant">
            <div class="typing-indicator">
              <div class="typing-dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
              <span class="typing-text">AI Tutor is thinking...</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Input Area -->
    <div v-show="!isMinimized" class="chat-input">
      <div class="input-container">
        <textarea
          v-model="currentMessage"
          @keydown.enter.prevent="handleEnterKey"
          @input="handleInput"
          placeholder="Ask me anything about Vue.js... 🤔"
          class="message-input"
          ref="messageInput"
          rows="1"
          :disabled="isLoading"
        ></textarea>
        
        <button 
          @click="sendCurrentMessage"
          :disabled="!currentMessage.trim() || isLoading"
          class="send-btn"
          :class="{ 'send-btn--disabled': !currentMessage.trim() || isLoading }"
        >
          <svg v-if="!isLoading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 2L11 13"/>
            <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
          </svg>
          <div v-else class="loading-spinner"></div>
        </button>
      </div>
      
      <!-- Input hints -->
      <div class="input-hints">
        <span class="hint">💡 Tip: Ask about components, reactivity, or any Vue concept!</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, nextTick, watch } from 'vue';
import { aiTutor } from '@/services/aiService.js';
import { useProgress } from '@/composables/useProgress.js';

export default {
  name: 'AITutorChat',
  props: {
    // Current learning context to provide to AI
    currentSection: {
      type: String,
      default: 'general',
      validator: (value) => ['general', 'tutorial', 'concepts', 'practice'].includes(value)
    },
    // User's learning progress for context
    userProgress: {
      type: Object,
      default: () => ({}),
      required: false
    }
  },
  emits: ['tutor-interaction'],
  setup(props, { emit }) {
    // Reactive state for chat functionality
    const messages = ref([]);
    const currentMessage = ref('');
    const isLoading = ref(false);
    const isTyping = ref(false);
    const isMinimized = ref(false);
    const isOnline = ref(true);
    const messagesContainer = ref(null);
    const messageInput = ref(null);

    // Progress tracking composable
    const { trackProgress } = useProgress();

    // Quick question suggestions for new users
    const quickQuestions = ref([
      "What are Vue components?",
      "How does reactivity work?",
      "Explain the Composition API",
      "What's the difference between ref and reactive?",
      "How do I handle events in Vue?"
    ]);

    /**
     * Send a message to the AI tutor
     * @param {string} messageText - Message to send (optional, uses currentMessage if not provided)
     */
    const sendMessage = async (messageText = null) => {
      const text = messageText || currentMessage.value.trim();
      if (!text || isLoading.value) return;

      // Create user message
      const userMessage = {
        id: Date.now(),
        role: 'user',
        content: text,
        timestamp: new Date().toISOString()
      };

      // Add user message to chat
      messages.value.push(userMessage);
      
      // Clear input if using current message
      if (!messageText) {
        currentMessage.value = '';
      }

      // Start loading state
      isLoading.value = true;
      isTyping.value = true;

      // Scroll to bottom
      await nextTick();
      scrollToBottom();

      try {
        // Get AI response with current context
        const context = {
          currentSection: props.currentSection,
          userProgress: props.userProgress,
          conversationLength: messages.value.length
        };

        const aiResponse = await aiTutor.chatWithTutor(text, context);

        // Create AI message
        const aiMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date().toISOString(),
          rating: null
        };

        // Add AI message to chat
        messages.value.push(aiMessage);

        // Track interaction for progress
        trackProgress('ai-tutor-interaction', {
          question: text,
          section: props.currentSection
        });

        // Emit interaction event
        emit('tutor-interaction', {
          userMessage: text,
          aiResponse,
          context
        });

      } catch (error) {
        console.error('Error sending message to AI tutor:', error);
        
        // Add error message
        const errorMessage = {
          id: Date.now() + 1,
          role: 'assistant',
          content: "🤖 Oops! I'm having trouble connecting right now. But don't worry - keep exploring the tutorials and try asking me again in a moment! 💪",
          timestamp: new Date().toISOString(),
          isError: true
        };
        
        messages.value.push(errorMessage);
      } finally {
        isLoading.value = false;
        isTyping.value = false;
        
        // Scroll to bottom and focus input
        await nextTick();
        scrollToBottom();
        if (messageInput.value) {
          messageInput.value.focus();
        }
      }
    };

    /**
     * Handle Enter key in textarea (send message, Shift+Enter for new line)
     */
    const handleEnterKey = (event) => {
      if (event.shiftKey) {
        // Allow new line with Shift+Enter
        return;
      }
      
      // Send message with Enter
      event.preventDefault();
      sendCurrentMessage();
    };

    /**
     * Send the current message
     */
    const sendCurrentMessage = () => {
      sendMessage();
    };

    /**
     * Handle input changes (auto-resize textarea)
     */
    const handleInput = () => {
      if (messageInput.value) {
        // Auto-resize textarea
        messageInput.value.style.height = 'auto';
        messageInput.value.style.height = Math.min(messageInput.value.scrollHeight, 120) + 'px';
      }
    };

    /**
     * Clear the entire chat conversation
     */
    const clearChat = () => {
      if (confirm('Are you sure you want to clear the conversation?')) {
        messages.value = [];
        aiTutor.conversationHistory = [];
      }
    };

    /**
     * Toggle minimized state
     */
    const toggleMinimized = () => {
      isMinimized.value = !isMinimized.value;
      
      if (!isMinimized.value) {
        // Focus input when expanding
        nextTick(() => {
          if (messageInput.value) {
            messageInput.value.focus();
          }
        });
      }
    };

    /**
     * Scroll chat to bottom
     */
    const scrollToBottom = () => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
      }
    };

    /**
     * Format timestamp for display
     */
    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    };

    /**
     * Format message content (convert markdown-like syntax to HTML)
     */
    const formatMessageContent = (content) => {
      return content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
    };

    /**
     * Copy message content to clipboard
     */
    const copyMessage = async (content) => {
      try {
        await navigator.clipboard.writeText(content);
        // Could add a toast notification here
      } catch (error) {
        console.error('Failed to copy message:', error);
      }
    };

    /**
     * Rate a message (helpful/not helpful)
     */
    const rateMessage = (messageId, rating) => {
      const message = messages.value.find(m => m.id === messageId);
      if (message) {
        message.rating = message.rating === rating ? null : rating;
        
        // Track rating for AI improvement
        trackProgress('ai-tutor-rating', {
          messageId,
          rating: message.rating,
          section: props.currentSection
        });
      }
    };

    // Watch for section changes to update AI context
    watch(() => props.currentSection, (newSection) => {
      if (newSection && aiTutor.userLearningProfile) {
        aiTutor.updateLearningProfile({
          currentSection: newSection
        });
      }
    });

    // Initialize component
    onMounted(() => {
      // Update AI tutor with user progress
      if (props.userProgress) {
        aiTutor.updateLearningProfile(props.userProgress);
      }
      
      // Focus input
      if (messageInput.value) {
        messageInput.value.focus();
      }
    });

    return {
      // Reactive state
      messages,
      currentMessage,
      isLoading,
      isTyping,
      isMinimized,
      isOnline,
      messagesContainer,
      messageInput,
      quickQuestions,
      
      // Methods
      sendMessage,
      sendCurrentMessage,
      handleEnterKey,
      handleInput,
      clearChat,
      toggleMinimized,
      scrollToBottom,
      formatTime,
      formatMessageContent,
      copyMessage,
      rateMessage
    };
  }
};
</script>

<style scoped>
/* Modern AI Tutor Chat Styles following the app's design system */
.ai-tutor-chat {
  display: flex;
  flex-direction: column;
  height: 600px;
  max-height: 80vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
}

/* Chat Header */
.chat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.tutor-avatar {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e74c3c;
  border: 2px solid white;
  transition: background 0.3s ease;
}

.avatar-status.status-online {
  background: #2ecc71;
}

.tutor-info {
  flex: 1;
}

.tutor-name {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.tutor-status {
  margin: 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
}

.chat-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.action-btn svg {
  width: 18px;
  height: 18px;
}

/* Chat Messages */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
}

.welcome-message {
  text-align: center;
  padding: 40px 20px;
}

.welcome-content {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(10px);
}

.welcome-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.welcome-title {
  margin: 0 0 12px 0;
  font-size: 24px;
  font-weight: 600;
  color: white;
}

.welcome-text {
  margin: 0 0 24px 0;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.quick-questions {
  text-align: left;
}

.quick-title {
  margin: 0 0 12px 0;
  font-weight: 500;
  color: white;
}

.question-suggestions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.suggestion-btn {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  font-size: 14px;
}

.suggestion-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(4px);
}

/* Message Styles */
.message {
  margin-bottom: 16px;
}

.message-content {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.message-content--user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.message-avatar--user {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
}

.message-avatar--assistant {
  background: linear-gradient(135deg, #ff6b6b, #feca57);
}

.message-bubble {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 18px;
  position: relative;
}

.message-bubble--user {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: white;
  border-bottom-right-radius: 4px;
}

.message-bubble--assistant {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  border-bottom-left-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message-text {
  margin: 0;
  line-height: 1.5;
  word-wrap: break-word;
}

.message-time {
  font-size: 11px;
  opacity: 0.7;
  margin-top: 4px;
}

.message-actions {
  display: flex;
  gap: 4px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.message-action {
  padding: 4px;
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s ease;
  font-size: 12px;
}

.message-action:hover {
  background: rgba(0, 0, 0, 0.05);
}

.message-action.action-active {
  background: rgba(0, 123, 255, 0.1);
}

.message-action svg {
  width: 12px;
  height: 12px;
}

/* Typing Indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
}

.typing-dots {
  display: flex;
  gap: 2px;
}

.typing-dots .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #666;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dots .dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dots .dot:nth-child(2) { animation-delay: -0.16s; }

.typing-text {
  font-size: 12px;
  color: #666;
}

@keyframes typing {
  0%, 80%, 100% { 
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% { 
    transform: scale(1);
    opacity: 1;
  }
}

/* Chat Input */
.chat-input {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.input-container {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.message-input {
  flex: 1;
  min-height: 44px;
  max-height: 120px;
  padding: 12px 16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  transition: border-color 0.3s ease;
}

.message-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
}

.message-input::placeholder {
  color: #999;
}

.send-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.send-btn:hover:not(.send-btn--disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.send-btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-btn svg {
  width: 20px;
  height: 20px;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.input-hints {
  margin-top: 8px;
  text-align: center;
}

.hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

/* Responsive Design */
@media (max-width: 768px) {
  .ai-tutor-chat {
    height: 500px;
    border-radius: 16px;
  }
  
  .chat-header {
    padding: 12px 16px;
  }
  
  .chat-messages {
    padding: 16px;
  }
  
  .message-bubble {
    max-width: 85%;
  }
  
  .chat-input {
    padding: 12px 16px;
  }
}

/* Code highlighting */
.message-text :deep(code) {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
}

.message-text :deep(strong) {
  font-weight: 600;
}

.message-text :deep(em) {
  font-style: italic;
}
</style>
