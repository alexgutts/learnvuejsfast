/**
 * COMPOSABLE FOR MANAGING LEARNING PROGRESS
 * =========================================
 * 
 * WHAT IS THIS COMPOSABLE FOR?
 * ===========================
 * This composable is like a personal learning coach that keeps track of your
 * Vue learning journey! It remembers:
 * - Which sections you've completed (like checkmarks on a to-do list)
 * - What achievements you've unlocked (like collecting badges in a video game)
 * - How much time you've spent learning (like a fitness tracker for your brain)
 * - Your overall progress percentage (like a progress bar in a video game)
 * 
 * WHY IS THIS USEFUL?
 * ==================
 * Imagine learning Vue without any progress tracking - you'd never know:
 * - How far you've come
 * - What you've already mastered
 * - What to tackle next
 * - How much you've improved
 * 
 * This composable makes learning feel like a fun game with clear goals,
 * achievements, and progress tracking!
 * 
 * HOW DOES IT WORK?
 * ================
 * 1. It stores your progress in localStorage (so it persists between sessions)
 * 2. It provides reactive data that updates the UI instantly
 * 3. It calculates statistics and percentages automatically
 * 4. It triggers achievement unlocks when you hit milestones
 * 5. It syncs across all components that need progress information
 */

// Import Vue 3's reactivity system
// =================================
// ref: Creates reactive references (smart variables that update the UI)
// computed: Creates calculated values that update when their dependencies change
// watch: Monitors changes and runs code when something changes
import { ref, computed, watch } from 'vue'

// Import learning data and constants
// ==================================
// TUTORIAL_SECTIONS: Array of all learning sections in our app
// ACHIEVEMENTS: Array of all possible achievements users can unlock
// PROGRESS_STORAGE_KEY: The localStorage key where we save progress data
import { TUTORIAL_SECTIONS, ACHIEVEMENTS, PROGRESS_STORAGE_KEY } from '../data/vueData.js'

// GLOBAL PROGRESS STATE
// ====================
// This is like a central scoreboard that all components can access
// It's shared across all components - when one component updates progress,
// all other components see the change instantly (thanks to Vue's reactivity!)
//
// Why global? Because progress affects many parts of the app:
// - Navigation shows completion status
// - Progress bars show percentages
// - Achievement notifications pop up
// - Section lists show what's completed
const progressData = ref({
  completedSections: new Set(),
  unlockedAchievements: new Set(),
  startDate: null,
  lastActivity: null,
  totalTimeSpent: 0
})

// Load progress from localStorage on module load
const loadProgress = () => {
  try {
    const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY)
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress)
      progressData.value = {
        completedSections: new Set(parsed.completedSections || []),
        unlockedAchievements: new Set(parsed.unlockedAchievements || []),
        startDate: parsed.startDate || Date.now(),
        lastActivity: parsed.lastActivity || Date.now(),
        totalTimeSpent: parsed.totalTimeSpent || 0
      }
    } else {
      // Initialize with default values for new users
      progressData.value.startDate = Date.now()
      progressData.value.lastActivity = Date.now()
    }
  } catch (error) {
    console.error('Error loading progress:', error)
    // Reset to defaults if loading fails
    progressData.value = {
      completedSections: new Set(),
      unlockedAchievements: new Set(),
      startDate: Date.now(),
      lastActivity: Date.now(),
      totalTimeSpent: 0
    }
  }
}

// Save progress to localStorage
const saveProgress = () => {
  try {
    const toSave = {
      completedSections: Array.from(progressData.value.completedSections),
      unlockedAchievements: Array.from(progressData.value.unlockedAchievements),
      startDate: progressData.value.startDate,
      lastActivity: progressData.value.lastActivity,
      totalTimeSpent: progressData.value.totalTimeSpent
    }
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(toSave))
  } catch (error) {
    console.error('Error saving progress:', error)
  }
}

// Initialize progress on first load
loadProgress()

// Watch for changes and auto-save
watch(progressData, saveProgress, { deep: true })

/**
 * Main composable function for progress management
 * Returns reactive progress data and methods to update progress
 */
export function useProgress() {
  
  // Computed properties for progress statistics
  const completionPercentage = computed(() => {
    const totalSections = TUTORIAL_SECTIONS.length
    const completedCount = progressData.value.completedSections.size
    return totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0
  })
  
  const achievementCount = computed(() => progressData.value.unlockedAchievements.size)
  
  const totalAchievements = computed(() => ACHIEVEMENTS.length)
  
  const achievementPercentage = computed(() => {
    return totalAchievements.value > 0 
      ? Math.round((achievementCount.value / totalAchievements.value) * 100) 
      : 0
  })
  
  const isComplete = computed(() => completionPercentage.value === 100)
  
  const currentStreak = computed(() => {
    // Calculate learning streak (simplified version)
    const now = Date.now()
    const lastActivity = progressData.value.lastActivity
    const daysSinceLastActivity = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24))
    return daysSinceLastActivity <= 1 ? 1 : 0 // Simplified streak calculation
  })
  
  // Methods for updating progress
  const markSectionComplete = (sectionId) => {
    if (!progressData.value.completedSections.has(sectionId)) {
      progressData.value.completedSections.add(sectionId)
      progressData.value.lastActivity = Date.now()
      
      // Check for achievements
      checkAchievements(sectionId)
      
      console.log(`Section ${sectionId} marked as complete!`)
      return true // Section was newly completed
    }
    return false // Section was already completed
  }
  
  const markSectionIncomplete = (sectionId) => {
    if (progressData.value.completedSections.has(sectionId)) {
      progressData.value.completedSections.delete(sectionId)
      progressData.value.lastActivity = Date.now()
      return true
    }
    return false
  }
  
  const isSectionComplete = (sectionId) => {
    return progressData.value.completedSections.has(sectionId)
  }
  
  const unlockAchievement = (achievementId) => {
    if (!progressData.value.unlockedAchievements.has(achievementId)) {
      progressData.value.unlockedAchievements.add(achievementId)
      console.log(`Achievement unlocked: ${achievementId}!`)
      return true // Achievement was newly unlocked
    }
    return false // Achievement was already unlocked
  }
  
  const isAchievementUnlocked = (achievementId) => {
    return progressData.value.unlockedAchievements.has(achievementId)
  }
  
  const checkAchievements = (completedSectionId) => {
    const completedCount = progressData.value.completedSections.size
    
    // Check section-specific achievements
    const sectionAchievements = {
      'components-templates': 'first-component',
      'reactivity-data': 'reactive-master',
      'composition-api-deep': 'composition-expert',
      'event-handling': 'event-handler',
      'directives-lifecycle': 'lifecycle-guru'
    }
    
    if (sectionAchievements[completedSectionId]) {
      unlockAchievement(sectionAchievements[completedSectionId])
    }
    
    // Check completion-based achievements
    if (completedCount >= TUTORIAL_SECTIONS.length) {
      unlockAchievement('vue-master')
    }
  }
  
  const resetProgress = () => {
    progressData.value = {
      completedSections: new Set(),
      unlockedAchievements: new Set(),
      startDate: Date.now(),
      lastActivity: Date.now(),
      totalTimeSpent: 0
    }
    console.log('Progress reset successfully')
  }
  
  const addTimeSpent = (minutes) => {
    progressData.value.totalTimeSpent += minutes
    progressData.value.lastActivity = Date.now()
  }
  
  const getFormattedTimeSpent = () => {
    const hours = Math.floor(progressData.value.totalTimeSpent / 60)
    const minutes = progressData.value.totalTimeSpent % 60
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }
  
  const getProgressStats = () => {
    return {
      completedSections: progressData.value.completedSections.size,
      totalSections: TUTORIAL_SECTIONS.length,
      completionPercentage: completionPercentage.value,
      achievementsUnlocked: achievementCount.value,
      totalAchievements: totalAchievements.value,
      achievementPercentage: achievementPercentage.value,
      timeSpent: getFormattedTimeSpent(),
      currentStreak: currentStreak.value,
      isComplete: isComplete.value
    }
  }
  
  // Get next recommended section
  const getNextSection = () => {
    return TUTORIAL_SECTIONS.find(section => 
      !progressData.value.completedSections.has(section.id)
    )
  }
  
  // Get recently completed sections
  const getRecentlyCompleted = () => {
    return TUTORIAL_SECTIONS.filter(section => 
      progressData.value.completedSections.has(section.id)
    ).slice(-3) // Last 3 completed sections
  }
  
  // Get available achievements
  const getAvailableAchievements = () => {
    return ACHIEVEMENTS.filter(achievement => 
      !progressData.value.unlockedAchievements.has(achievement.id)
    )
  }
  
  const getUnlockedAchievements = () => {
    return ACHIEVEMENTS.filter(achievement => 
      progressData.value.unlockedAchievements.has(achievement.id)
    )
  }
  
  // Return the public API
  return {
    // Reactive data
    completedSections: computed(() => Array.from(progressData.value.completedSections)),
    unlockedAchievements: computed(() => Array.from(progressData.value.unlockedAchievements)),
    
    // Computed properties
    completionPercentage,
    achievementCount,
    totalAchievements,
    achievementPercentage,
    isComplete,
    currentStreak,
    
    // Methods
    markSectionComplete,
    markSectionIncomplete,
    isSectionComplete,
    unlockAchievement,
    isAchievementUnlocked,
    resetProgress,
    addTimeSpent,
    getFormattedTimeSpent,
    getProgressStats,
    getNextSection,
    getRecentlyCompleted,
    getAvailableAchievements,
    getUnlockedAchievements
  }
} 