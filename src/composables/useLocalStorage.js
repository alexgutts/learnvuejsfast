/**
 * COMPOSABLE FOR MANAGING LOCALSTORAGE WITH VUE 3 REACTIVITY
 * ==========================================================
 * 
 * WHAT IS A COMPOSABLE?
 * ====================
 * A composable is like a magical toolbox that you can use in any Vue component.
 * It contains reusable logic that you can "compose" into your components.
 * Think of it as a LEGO instruction manual that you can use to build the same
 * functionality in different places.
 * 
 * WHAT IS LOCALSTORAGE?
 * ====================
 * localStorage is like a persistent notebook in your browser that remembers
 * things even after you close the website. It's perfect for saving user preferences,
 * progress, settings, etc. Unlike regular variables that forget everything when
 * you refresh the page, localStorage keeps your data safe!
 * 
 * WHAT DOES THIS COMPOSABLE DO?
 * ============================
 * This composable makes localStorage work seamlessly with Vue's reactivity system.
 * When you change a value, it automatically:
 * 1. Updates the UI (Vue reactivity)
 * 2. Saves to localStorage (persistence)
 * 3. Syncs across browser tabs (magic!)
 * 4. Handles errors gracefully (no crashes)
 * 
 * It's like having a smart assistant that remembers everything and keeps
 * all your browser tabs in sync!
 */

// Import Vue 3's reactivity superpowers
// ====================================
// ref: Creates reactive references (like smart variables that update the UI)
// computed: Creates calculated values that update automatically when dependencies change
// watch: Watches for changes and runs code when something changes (like a detective)
import { ref, computed, watch } from 'vue'

/**
 * MAIN LOCALSTORAGE COMPOSABLE FUNCTION
 * =====================================
 * This is the main function that creates a reactive connection to localStorage.
 * 
 * PARAMETERS EXPLAINED:
 * @param {string} key - The name of the "folder" in localStorage (like "user-preferences")
 * @param {*} defaultValue - What to use if nothing is saved yet (like a default setting)
 * @param {Object} options - Extra configuration options (like special instructions)
 * 
 * RETURNS:
 * @returns {Object} - A toolbox with the reactive value and helper methods
 * 
 * EXAMPLE USAGE:
 * const { value: theme } = useLocalStorage('theme', 'light')
 * // Now 'theme' is reactive and automatically saves to localStorage!
 */
export function useLocalStorage(key, defaultValue = null, options = {}) {
  // DESTRUCTURE OPTIONS WITH DEFAULTS
  // =================================
  // This is like unpacking a toolbox and setting up default tools if some are missing
  const {
    // serialize: How to convert JavaScript objects to strings for storage
    // (localStorage can only store strings, not objects)
    serialize = JSON.stringify,
    
    // deserialize: How to convert strings back to JavaScript objects
    // (the reverse of serialize - like translating back from storage language)
    deserialize = JSON.parse,
    
    // syncAcrossTabs: Whether to sync changes across browser tabs
    // (like having multiple windows of the same app stay in sync)
    syncAcrossTabs = true,
    
    // onError: What to do when something goes wrong
    // (like having a first aid kit for errors)
    onError = (error) => console.error('localStorage error:', error)
  } = options
  
  // FUNCTION TO READ DATA FROM LOCALSTORAGE
  // =======================================
  // This function is like a librarian who goes to the localStorage "library"
  // and retrieves the book (data) you asked for
  const readFromStorage = () => {
    try {
      const item = localStorage.getItem(key)
      if (item === null) return defaultValue
      
      // Handle primitive values that don't need JSON parsing
      if (typeof defaultValue === 'string') return item
      if (typeof defaultValue === 'number') return Number(item)
      if (typeof defaultValue === 'boolean') return item === 'true'
      
      // Parse JSON for objects and arrays
      return deserialize(item)
    } catch (error) {
      onError(error)
      return defaultValue
    }
  }
  
  // Write value to localStorage
  const writeToStorage = (value) => {
    try {
      // Handle null/undefined values
      if (value === null || value === undefined) {
        localStorage.removeItem(key)
        return
      }
      
      // Handle primitive values
      if (typeof value === 'string') {
        localStorage.setItem(key, value)
        return
      }
      
      // Serialize objects and arrays
      localStorage.setItem(key, serialize(value))
    } catch (error) {
      onError(error)
    }
  }
  
  // Create reactive reference
  const storedValue = ref(readFromStorage())
  
  // Watch for changes and sync to localStorage
  watch(
    storedValue,
    (newValue) => writeToStorage(newValue),
    { deep: true }
  )
  
  // Listen for storage events (changes from other tabs)
  if (syncAcrossTabs && typeof window !== 'undefined') {
    window.addEventListener('storage', (event) => {
      if (event.key === key && event.newValue !== serialize(storedValue.value)) {
        try {
          storedValue.value = event.newValue ? deserialize(event.newValue) : defaultValue
        } catch (error) {
          onError(error)
        }
      }
    })
  }
  
  // Utility methods
  const remove = () => {
    storedValue.value = defaultValue
    localStorage.removeItem(key)
  }
  
  const reset = () => {
    storedValue.value = defaultValue
  }
  
  return {
    value: storedValue,
    remove,
    reset
  }
}

/**
 * Specialized composable for user preferences
 */
export function useUserPreferences() {
  const defaultPreferences = {
    theme: 'light',
    fontSize: 16,
    language: 'en',
    soundEnabled: true,
    animationsEnabled: true,
    autoSave: true,
    showHints: true
  }
  
  const { value: preferences, remove, reset } = useLocalStorage(
    'user-preferences',
    defaultPreferences
  )
  
  // Individual preference getters/setters
  const theme = computed({
    get: () => preferences.value.theme,
    set: (value) => preferences.value.theme = value
  })
  
  const fontSize = computed({
    get: () => preferences.value.fontSize,
    set: (value) => preferences.value.fontSize = Math.max(12, Math.min(24, value))
  })
  
  const language = computed({
    get: () => preferences.value.language,
    set: (value) => preferences.value.language = value
  })
  
  const soundEnabled = computed({
    get: () => preferences.value.soundEnabled,
    set: (value) => preferences.value.soundEnabled = value
  })
  
  const animationsEnabled = computed({
    get: () => preferences.value.animationsEnabled,
    set: (value) => preferences.value.animationsEnabled = value
  })
  
  const autoSave = computed({
    get: () => preferences.value.autoSave,
    set: (value) => preferences.value.autoSave = value
  })
  
  const showHints = computed({
    get: () => preferences.value.showHints,
    set: (value) => preferences.value.showHints = value
  })
  
  // Computed properties
  const isDarkTheme = computed(() => preferences.value.theme === 'dark')
  
  // Methods
  const toggleTheme = () => {
    theme.value = isDarkTheme.value ? 'light' : 'dark'
  }
  
  const increaseFontSize = () => {
    fontSize.value = Math.min(24, fontSize.value + 1)
  }
  
  const decreaseFontSize = () => {
    fontSize.value = Math.max(12, fontSize.value - 1)
  }
  
  const resetToDefaults = () => {
    preferences.value = { ...defaultPreferences }
  }
  
  return {
    preferences,
    theme,
    fontSize,
    language,
    soundEnabled,
    animationsEnabled,
    autoSave,
    showHints,
    isDarkTheme,
    toggleTheme,
    increaseFontSize,
    decreaseFontSize,
    resetToDefaults,
    remove,
    reset
  }
}

/**
 * Specialized composable for learning session data
 */
export function useLearningSession() {
  const defaultSession = {
    currentSection: null,
    timeSpent: 0,
    lastVisited: Date.now(),
    completedExercises: [],
    bookmarks: [],
    notes: {}
  }
  
  const { value: session, remove, reset } = useLocalStorage(
    'learning-session',
    defaultSession
  )
  
  // Methods for session management
  const updateCurrentSection = (sectionId) => {
    session.value.currentSection = sectionId
    session.value.lastVisited = Date.now()
  }
  
  const addTimeSpent = (minutes) => {
    session.value.timeSpent += minutes
    session.value.lastVisited = Date.now()
  }
  
  const markExerciseComplete = (exerciseId) => {
    if (!session.value.completedExercises.includes(exerciseId)) {
      session.value.completedExercises.push(exerciseId)
    }
  }
  
  const addBookmark = (sectionId, note = '') => {
    const bookmark = {
      id: Date.now(),
      sectionId,
      note,
      timestamp: Date.now()
    }
    session.value.bookmarks.push(bookmark)
    return bookmark.id
  }
  
  const removeBookmark = (bookmarkId) => {
    session.value.bookmarks = session.value.bookmarks.filter(
      b => b.id !== bookmarkId
    )
  }
  
  const addNote = (sectionId, note) => {
    session.value.notes[sectionId] = note
  }
  
  const getNote = (sectionId) => {
    return session.value.notes[sectionId] || ''
  }
  
  const getSessionStats = () => {
    return {
      timeSpent: session.value.timeSpent,
      lastVisited: session.value.lastVisited,
      exercisesCompleted: session.value.completedExercises.length,
      bookmarksCount: session.value.bookmarks.length,
      notesCount: Object.keys(session.value.notes).length
    }
  }
  
  return {
    session,
    updateCurrentSection,
    addTimeSpent,
    markExerciseComplete,
    addBookmark,
    removeBookmark,
    addNote,
    getNote,
    getSessionStats,
    remove,
    reset
  }
}

/**
 * Utility functions for localStorage management
 */
export const localStorageUtils = {
  /**
   * Check if localStorage is available
   */
  isAvailable() {
    try {
      const test = '__localStorage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  },
  
  /**
   * Get all keys from localStorage
   */
  getAllKeys() {
    return Object.keys(localStorage)
  },
  
  /**
   * Get localStorage usage info
   */
  getUsageInfo() {
    let totalSize = 0
    const keys = this.getAllKeys()
    
    keys.forEach(key => {
      const value = localStorage.getItem(key)
      totalSize += key.length + (value ? value.length : 0)
    })
    
    return {
      totalKeys: keys.length,
      estimatedSize: totalSize,
      estimatedSizeKB: Math.round(totalSize / 1024 * 100) / 100
    }
  },
  
  /**
   * Clear all app-related localStorage data
   */
  clearAppData() {
    const appKeys = this.getAllKeys().filter(key => 
      key.startsWith('vue-learning-') || 
      key.startsWith('user-preferences') ||
      key.startsWith('learning-session')
    )
    
    appKeys.forEach(key => localStorage.removeItem(key))
    return appKeys.length
  },
  
  /**
   * Export app data for backup
   */
  exportAppData() {
    const appKeys = this.getAllKeys().filter(key => 
      key.startsWith('vue-learning-') || 
      key.startsWith('user-preferences') ||
      key.startsWith('learning-session')
    )
    
    const data = {}
    appKeys.forEach(key => {
      data[key] = localStorage.getItem(key)
    })
    
    return {
      exportDate: new Date().toISOString(),
      data
    }
  },
  
  /**
   * Import app data from backup
   */
  importAppData(backupData) {
    try {
      if (!backupData.data) {
        throw new Error('Invalid backup data format')
      }
      
      Object.entries(backupData.data).forEach(([key, value]) => {
        localStorage.setItem(key, value)
      })
      
      return true
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }
} 