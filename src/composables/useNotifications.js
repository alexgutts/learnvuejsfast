/**
 * COMPOSABLE FOR MANAGING NOTIFICATIONS & TOASTS
 * ==============================================
 * 
 * WHAT ARE NOTIFICATIONS?
 * ======================
 * Notifications are like friendly pop-up messages that appear to give users feedback.
 * Think of them as the app's way of talking to the user:
 * - "Great job completing that section!" (success)
 * - "Oops, something went wrong!" (error)
 * - "Hey, you unlocked an achievement!" (achievement)
 * - "Just so you know..." (info)
 * 
 * WHY DO WE NEED A NOTIFICATION SYSTEM?
 * ====================================
 * Without notifications, users would be confused:
 * - Did my action work?
 * - What just happened?
 * - Did I make a mistake?
 * - Am I making progress?
 * 
 * Good notifications make the app feel alive and responsive!
 * 
 * HOW DOES THIS COMPOSABLE WORK?
 * =============================
 * 1. It maintains a global list of active notifications
 * 2. It provides functions to show different types of messages
 * 3. It automatically removes notifications after a set time
 * 4. It handles different notification styles (success, error, warning, etc.)
 * 5. It provides a consistent API for all components to use
 * 
 * TYPES OF NOTIFICATIONS:
 * =====================
 * - Success: Green, for when things go well
 * - Error: Red, for when things go wrong
 * - Warning: Yellow/Orange, for cautions
 * - Info: Blue, for general information
 * - Achievement: Purple, for special accomplishments
 */

// Import Vue 3's reactivity system
// =================================
// ref: Creates reactive references for the notification list
// computed: Creates calculated values that update automatically
import { ref, computed } from 'vue'

// GLOBAL NOTIFICATION STATE
// ========================
// This is like a message board that all components can post to
// notifications: Array of all currently visible notifications
// notificationId: Counter to give each notification a unique ID (like a ticket number)
const notifications = ref([])
let notificationId = 0

// NOTIFICATION TYPE CONFIGURATIONS
// ===============================
// This object defines how each type of notification should look and behave
// Think of it as a style guide for different types of messages
const NOTIFICATION_TYPES = {
  success: {
    color: '#10B981',
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    icon: 'mdi-check-circle',
    duration: 4000
  },
  error: {
    color: '#EF4444',
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    icon: 'mdi-alert-circle',
    duration: 6000
  },
  warning: {
    color: '#F59E0B',
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    icon: 'mdi-alert',
    duration: 5000
  },
  info: {
    color: '#3B82F6',
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    icon: 'mdi-information',
    duration: 4000
  },
  achievement: {
    color: '#8B5CF6',
    backgroundColor: '#F5F3FF',
    borderColor: '#DDD6FE',
    icon: 'mdi-trophy',
    duration: 6000
  }
}

/**
 * Main composable function for notification management
 */
export function useNotifications() {
  
  // Computed properties
  const hasNotifications = computed(() => notifications.value.length > 0)
  const notificationCount = computed(() => notifications.value.length)
  
  /**
   * Add a notification to the queue
   * @param {Object} notification - The notification object
   * @param {string} notification.message - The message to display
   * @param {string} notification.type - The type of notification (success, error, warning, info, achievement)
   * @param {string} [notification.title] - Optional title for the notification
   * @param {number} [notification.duration] - Optional custom duration in milliseconds
   * @param {boolean} [notification.persistent] - Whether the notification should not auto-dismiss
   * @param {Object} [notification.actions] - Optional action buttons
   */
  const addNotification = (notification) => {
    const id = ++notificationId
    const type = notification.type || 'info'
    const typeConfig = NOTIFICATION_TYPES[type] || NOTIFICATION_TYPES.info
    
    const newNotification = {
      id,
      message: notification.message,
      title: notification.title || '',
      type,
      timestamp: Date.now(),
      duration: notification.duration || typeConfig.duration,
      persistent: notification.persistent || false,
      actions: notification.actions || null,
      isVisible: true,
      ...typeConfig // Merge in the type-specific styling
    }
    
    notifications.value.push(newNotification)
    
    // Auto-remove after duration (if not persistent)
    if (!newNotification.persistent) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }
  
  /**
   * Remove a notification by ID
   * @param {number} id - The notification ID to remove
   */
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }
  
  /**
   * Clear all notifications
   */
  const clearAllNotifications = () => {
    notifications.value = []
  }
  
  /**
   * Convenience methods for different notification types
   */
  const showSuccess = (message, options = {}) => {
    return addNotification({
      message,
      type: 'success',
      ...options
    })
  }
  
  const showError = (message, options = {}) => {
    return addNotification({
      message,
      type: 'error',
      ...options
    })
  }
  
  const showWarning = (message, options = {}) => {
    return addNotification({
      message,
      type: 'warning',
      ...options
    })
  }
  
  const showInfo = (message, options = {}) => {
    return addNotification({
      message,
      type: 'info',
      ...options
    })
  }
  
  const showAchievement = (title, message, options = {}) => {
    return addNotification({
      title,
      message,
      type: 'achievement',
      ...options
    })
  }
  
  /**
   * Show section completion notification
   * @param {string} sectionTitle - The title of the completed section
   * @param {boolean} isNewCompletion - Whether this is a new completion or repeat
   */
  const showSectionComplete = (sectionTitle, isNewCompletion = true) => {
    if (isNewCompletion) {
      showSuccess(
        `Great job! You've completed "${sectionTitle}"`,
        {
          title: 'Section Complete! 🎉',
          duration: 5000
        }
      )
    } else {
      showInfo(
        `You've already completed "${sectionTitle}"`,
        {
          title: 'Already Complete',
          duration: 3000
        }
      )
    }
  }
  
  /**
   * Show achievement unlocked notification
   * @param {Object} achievement - The achievement object
   */
  const showAchievementUnlocked = (achievement) => {
    showAchievement(
      `Achievement Unlocked: ${achievement.title}`,
      achievement.description,
      {
        duration: 6000,
        persistent: false
      }
    )
  }
  
  /**
   * Show learning progress notification
   * @param {number} percentage - The completion percentage
   * @param {number} sectionsCompleted - Number of sections completed
   * @param {number} totalSections - Total number of sections
   */
  const showProgressUpdate = (percentage, sectionsCompleted, totalSections) => {
    if (percentage === 100) {
      showAchievement(
        'Congratulations! 🎉',
        'You\'ve completed all tutorial sections!',
        {
          duration: 8000,
          persistent: false
        }
      )
    } else if (percentage >= 50 && percentage < 75) {
      showSuccess(
        `You're halfway there! ${sectionsCompleted}/${totalSections} sections complete`,
        {
          title: 'Great Progress! 📈',
          duration: 4000
        }
      )
    } else if (percentage >= 75) {
      showSuccess(
        `Almost done! ${sectionsCompleted}/${totalSections} sections complete`,
        {
          title: 'Nearly There! 🚀',
          duration: 4000
        }
      )
    }
  }
  
  /**
   * Show welcome message for new users
   */
  const showWelcomeMessage = () => {
    showInfo(
      'Start with any section that interests you, or follow the tutorial in order. Your progress will be saved automatically!',
      {
        title: 'Welcome to Vue 3 Learning! 👋',
        duration: 6000
      }
    )
  }
  
  /**
   * Show tips and hints
   * @param {string} tip - The tip message
   * @param {string} context - Context for the tip (optional)
   */
  const showTip = (tip, context = '') => {
    const title = context ? `💡 Tip: ${context}` : '💡 Pro Tip'
    showInfo(tip, {
      title,
      duration: 5000
    })
  }
  
  /**
   * Show interactive feedback
   * @param {string} action - The action that was performed
   * @param {string} result - The result of the action
   */
  const showInteractiveFeedback = (action, result) => {
    showSuccess(
      `${action}: ${result}`,
      {
        title: 'Interactive Example',
        duration: 3000
      }
    )
  }
  
  /**
   * Show error with helpful suggestion
   * @param {string} error - The error message
   * @param {string} suggestion - Helpful suggestion to fix the error
   */
  const showErrorWithSuggestion = (error, suggestion) => {
    showError(error, {
      title: 'Something went wrong',
      duration: 7000,
      actions: suggestion ? [{
        label: 'Learn More',
        action: () => showTip(suggestion, 'How to fix this')
      }] : null
    })
  }
  
  /**
   * Get notifications filtered by type
   * @param {string} type - The notification type to filter by
   */
  const getNotificationsByType = (type) => {
    return notifications.value.filter(n => n.type === type)
  }
  
  /**
   * Get recent notifications (last 5)
   */
  const getRecentNotifications = () => {
    return notifications.value
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5)
  }
  
  // Return the public API
  return {
    // Reactive data
    notifications: computed(() => notifications.value),
    hasNotifications,
    notificationCount,
    
    // Core methods
    addNotification,
    removeNotification,
    clearAllNotifications,
    
    // Convenience methods
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showAchievement,
    
    // Specialized methods for the learning app
    showSectionComplete,
    showAchievementUnlocked,
    showProgressUpdate,
    showWelcomeMessage,
    showTip,
    showInteractiveFeedback,
    showErrorWithSuggestion,
    
    // Query methods
    getNotificationsByType,
    getRecentNotifications
  }
} 