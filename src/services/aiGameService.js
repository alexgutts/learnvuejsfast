/**
 * AI GAME SERVICE FOR VUE LEARNING
 * ================================
 * 
 * This service provides AI-powered features specifically for the Vue learning game:
 * - Dynamic challenge generation based on user progress
 * - Adaptive difficulty adjustment
 * - Personalized learning paths
 * - Real-time code evaluation and feedback
 * - Achievement system with AI insights
 * 
 * FEATURES:
 * - Progressive challenge creation
 * - Code analysis and validation
 * - Hint generation based on user mistakes
 * - Learning pattern recognition
 * - Gamification elements with AI enhancement
 */

import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo - use backend in production
});

/**
 * AI GAME SERVICE CLASS
 * ====================
 * 
 * Main service class that handles all AI interactions for the learning game
 */
export class AIGameService {
  constructor() {
    // User learning profile for personalization
    this.userProfile = {
      currentLevel: 1,
      skillAreas: {
        components: 0,      // 0-100 proficiency score
        reactivity: 0,
        lifecycle: 0,
        composition: 0,
        routing: 0,
        state: 0
      },
      learningStyle: 'visual', // visual, practical, theoretical
      preferredDifficulty: 'adaptive',
      completedChallenges: [],
      commonMistakes: [],
      strengths: [],
      lastSessionData: null
    };

    // Game state tracking
    this.gameState = {
      currentStreak: 0,
      totalPoints: 0,
      hintsUsed: 0,
      challengesCompleted: 0,
      averageTime: 0,
      sessionStartTime: Date.now()
    };

    // Challenge templates for different Vue concepts
    this.challengeTemplates = this.initializeChallengeTemplates();
  }

  /**
   * GENERATE DYNAMIC CHALLENGE
   * =========================
   * 
   * Creates a new challenge based on user's current skill level and learning progress
   * Uses AI to generate fresh, relevant content that adapts to the user's needs
   */
  async generateChallenge(topic, difficulty = 'adaptive', userProgress = {}) {
    try {
      // Determine actual difficulty based on user performance
      const adaptedDifficulty = this.calculateAdaptiveDifficulty(topic, difficulty, userProgress);
      
      // Build context for AI challenge generation
      const challengeContext = this.buildChallengeContext(topic, adaptedDifficulty, userProgress);
      
      const systemPrompt = `You are an expert Vue.js instructor creating an interactive coding challenge.

CHALLENGE REQUIREMENTS:
- Topic: ${topic}
- Difficulty: ${adaptedDifficulty}/10
- User's Vue experience: ${this.userProfile.currentLevel}/10
- Learning style: ${this.userProfile.learningStyle}

CHALLENGE FORMAT (return as JSON):
{
  "id": "unique-challenge-id",
  "title": "Engaging challenge title",
  "description": "Clear, motivating description of what to build",
  "objective": "Specific learning objective",
  "difficulty": ${adaptedDifficulty},
  "estimatedTime": "5-15 minutes",
  "instructions": [
    "Step 1: Clear instruction",
    "Step 2: Another step"
  ],
  "starterCode": "Vue component starter template",
  "solution": "Complete working solution",
  "testCases": [
    {
      "description": "Test description",
      "input": "test input",
      "expected": "expected output"
    }
  ],
  "hints": [
    "Helpful hint without giving away solution",
    "Progressive hint that builds on previous"
  ],
  "concepts": ["vue-concept-1", "vue-concept-2"],
  "resources": [
    {
      "title": "Relevant Vue docs",
      "url": "https://vuejs.org/..."
    }
  ]
}

CHALLENGE GUIDELINES:
- Make it practical and relevant to real Vue development
- Include clear success criteria
- Provide progressive hints that don't spoil the solution
- Ensure the challenge builds on previous learning
- Make it engaging with a real-world scenario
- Include proper Vue 3 Composition API usage when appropriate`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate a ${topic} challenge for my current skill level. Context: ${JSON.stringify(challengeContext)}` }
        ],
        max_tokens: 1500,
        temperature: 0.7
      });

      const challengeData = AIGameService.safeJSONParse(completion.choices[0].message.content) || {};
      
      // Debug logging for AI responses
      if (Object.keys(challengeData).length === 0) {
        console.warn('AI returned empty challenge data for topic:', topic);
        console.warn('Raw AI response:', completion.choices[0].message.content);
      } else {
        console.log('Successfully parsed AI challenge for topic:', topic, challengeData.title || 'Untitled');
      }
      
      // Enhance challenge with game-specific elements
      return this.enhanceChallenge(challengeData, topic, adaptedDifficulty);
      
    } catch (error) {
      console.error('Failed to generate AI challenge:', error);
      return this.getFallbackChallenge(topic, difficulty);
    }
  }

  /**
   * EVALUATE USER'S CODE SOLUTION
   * =============================
   * 
   * Uses AI to analyze user's code submission and provide detailed feedback
   */
  async evaluateCode(userCode, challenge, timeSpent = 0) {
    try {
      const evaluationPrompt = `You are an expert Vue.js code reviewer evaluating a student's solution.

CHALLENGE DETAILS:
Title: ${challenge.title}
Objective: ${challenge.objective}
Expected Solution: ${challenge.solution}

STUDENT'S CODE:
${userCode}

TIME SPENT: ${timeSpent} seconds

EVALUATION CRITERIA:
1. Correctness - Does it solve the problem?
2. Vue Best Practices - Proper Vue 3 patterns?
3. Code Quality - Clean, readable, maintainable?
4. Performance - Efficient implementation?
5. Learning Progress - Shows understanding of concepts?

RETURN AS JSON:
{
  "score": 0-100,
  "passed": true/false,
  "feedback": {
    "strengths": ["What they did well"],
    "improvements": ["Specific areas to improve"],
    "suggestions": ["Actionable improvement suggestions"]
  },
  "codeAnalysis": {
    "correctness": 0-10,
    "bestPractices": 0-10,
    "codeQuality": 0-10,
    "performance": 0-10
  },
  "nextSteps": ["What to learn next"],
  "encouragement": "Motivating message based on their progress",
  "pointsEarned": 0-150,
  "badges": ["any-badges-earned"]
}

Be encouraging and constructive. Focus on learning and improvement.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: evaluationPrompt },
          { role: 'user', content: 'Please evaluate this code solution.' }
        ],
        max_tokens: 1000,
        temperature: 0.3
      });

      const evaluation = AIGameService.safeJSONParse(completion.choices[0].message.content) || {};
      
      // Update user profile based on performance
      this.updateUserProfile(evaluation, challenge, timeSpent);
      
      return evaluation;
      
    } catch (error) {
      console.error('Failed to evaluate code:', error);
      return this.getFallbackEvaluation(userCode, challenge);
    }
  }

  /**
   * GENERATE CONTEXTUAL HINTS
   * =========================
   * 
   * Provides smart hints based on user's current code and common mistakes
   */
  async generateHint(challenge, userCode, previousHints = []) {
    try {
      const hintPrompt = `You are a helpful Vue.js tutor providing a hint for a student who is stuck.

CHALLENGE: ${challenge.title}
OBJECTIVE: ${challenge.objective}
STUDENT'S CURRENT CODE:
${userCode || 'No code written yet'}

PREVIOUS HINTS GIVEN:
${previousHints.join('\n') || 'None'}

HINT GUIDELINES:
- Don't give away the complete solution
- Guide them toward the next logical step
- Reference Vue concepts they should know
- Be encouraging and supportive
- Provide just enough information to get unstuck
- If they have no code, help them get started
- If they have some code, help them debug or improve

Return a helpful, encouraging hint that guides without spoiling the solution.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: hintPrompt },
          { role: 'user', content: 'I need a hint for this challenge.' }
        ],
        max_tokens: 200,
        temperature: 0.6
      });

      const hint = completion.choices[0].message.content;
      
      // Track hint usage for adaptive difficulty
      this.gameState.hintsUsed++;
      
      return {
        hint,
        hintNumber: previousHints.length + 1,
        encouragement: this.generateEncouragement()
      };
      
    } catch (error) {
      console.error('Failed to generate hint:', error);
      return {
        hint: "Try breaking down the problem into smaller steps. Remember that Vue components need both template and script sections!",
        hintNumber: previousHints.length + 1,
        encouragement: "You've got this! Every expert was once a beginner. 🚀"
      };
    }
  }

  /**
   * GENERATE PERSONALIZED LEARNING PATH
   * ==================================
   * 
   * Creates a customized sequence of challenges based on user's progress and goals
   */
  async generateLearningPath(userGoals = [], timeAvailable = 60) {
    try {
      const pathPrompt = `Create a personalized Vue.js learning path for a student.

STUDENT PROFILE:
- Current Level: ${this.userProfile.currentLevel}/10
- Skill Areas: ${JSON.stringify(this.userProfile.skillAreas)}
- Learning Style: ${this.userProfile.learningStyle}
- Completed Challenges: ${this.userProfile.completedChallenges.length}
- Common Mistakes: ${this.userProfile.commonMistakes.join(', ') || 'None identified yet'}
- Strengths: ${this.userProfile.strengths.join(', ') || 'Still assessing'}

USER GOALS: ${userGoals.join(', ') || 'General Vue mastery'}
TIME AVAILABLE: ${timeAvailable} minutes

RETURN AS JSON:
{
  "pathName": "Personalized path name",
  "description": "What this path will accomplish",
  "estimatedTime": "${timeAvailable} minutes",
  "difficulty": "beginner|intermediate|advanced",
  "challenges": [
    {
      "topic": "vue-topic",
      "title": "Challenge title",
      "description": "What they'll learn",
      "estimatedTime": "10 minutes",
      "priority": "high|medium|low",
      "reasoning": "Why this challenge is recommended"
    }
  ],
  "learningObjectives": ["What they'll master"],
  "motivation": "Encouraging message about their journey"
}

Focus on their weak areas while building on their strengths.`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: pathPrompt },
          { role: 'user', content: 'Generate my personalized learning path.' }
        ],
        max_tokens: 1200,
        temperature: 0.7
      });

      return AIGameService.safeJSONParse(completion.choices[0].message.content) || {};
      
    } catch (error) {
      console.error('Failed to generate learning path:', error);
      return this.getFallbackLearningPath();
    }
  }

  /**
   * CALCULATE ADAPTIVE DIFFICULTY
   * ============================
   * 
   * Determines appropriate difficulty based on user performance and learning patterns
   */
  calculateAdaptiveDifficulty(topic, requestedDifficulty, userProgress) {
    // Map string difficulty levels to numbers
    const difficultyMap = { 
      'beginner': 2, 
      'intermediate': 4, 
      'advanced': 6, 
      'expert': 8, 
      'mr-robot': 10 
    };

    // If not adaptive, return the mapped difficulty or parsed number
    if (requestedDifficulty !== 'adaptive') {
      if (typeof requestedDifficulty === 'string' && difficultyMap[requestedDifficulty]) {
        return difficultyMap[requestedDifficulty];
      }
      const parsed = parseInt(requestedDifficulty);
      return isNaN(parsed) ? 3 : Math.max(1, Math.min(10, parsed));
    }

    // Base difficulty on user's skill in this topic area
    const topicSkill = this.userProfile.skillAreas[topic] || 0;
    const overallLevel = this.userProfile.currentLevel || 1;
    
    // Consider recent performance
    const recentSuccessRate = this.calculateRecentSuccessRate();
    const streakBonus = Math.min((this.gameState.currentStreak || 0) * 0.1, 1);
    
    // Calculate adaptive difficulty (1-10 scale)
    let adaptiveDifficulty = Math.max(1, Math.min(10, 
      (topicSkill / 10) * 3 +           // 30% based on topic skill
      (overallLevel / 10) * 4 +         // 40% based on overall level
      (recentSuccessRate || 0.5) * 2 +  // 20% based on recent performance
      streakBonus                       // 10% streak bonus
    ));

    // Ensure we return a valid number, round to nearest 0.5 for more granular difficulty
    const result = Math.round(adaptiveDifficulty * 2) / 2;
    return isNaN(result) ? 3 : result; // Default to 3 if somehow NaN
  }

  /**
   * UPDATE USER PROFILE
   * ==================
   * 
   * Updates user's learning profile based on performance and interactions
   */
  updateUserProfile(evaluation, challenge, timeSpent) {
    // Update skill areas based on challenge topics
    challenge.concepts?.forEach(concept => {
      if (this.userProfile.skillAreas.hasOwnProperty(concept)) {
        const currentSkill = this.userProfile.skillAreas[concept];
        const improvement = (evaluation.score / 100) * 5; // Max 5 point improvement
        this.userProfile.skillAreas[concept] = Math.min(100, currentSkill + improvement);
      }
    });

    // Update overall level
    const avgSkill = Object.values(this.userProfile.skillAreas).reduce((a, b) => a + b, 0) / 
                     Object.keys(this.userProfile.skillAreas).length;
    this.userProfile.currentLevel = Math.min(10, Math.max(1, Math.floor(avgSkill / 10) + 1));

    // Track strengths and weaknesses
    if (evaluation.score >= 80) {
      challenge.concepts?.forEach(concept => {
        if (!this.userProfile.strengths.includes(concept)) {
          this.userProfile.strengths.push(concept);
        }
      });
    } else if (evaluation.score < 60) {
      // Add to areas needing work (but don't call them mistakes - stay positive!)
      challenge.concepts?.forEach(concept => {
        if (!this.userProfile.commonMistakes.includes(concept)) {
          this.userProfile.commonMistakes.push(concept);
        }
      });
    }

    // Update game statistics
    this.gameState.challengesCompleted++;
    this.gameState.totalPoints += evaluation.pointsEarned || 0;
    this.gameState.averageTime = (this.gameState.averageTime + timeSpent) / 2;

    // Save progress to localStorage
    this.saveProgress();
  }

  /**
   * HELPER METHODS
   * =============
   */

  calculateRecentSuccessRate() {
    // Simplified calculation - in real app, track detailed history
    const recentChallenges = Math.min(5, this.gameState.challengesCompleted);
    if (recentChallenges === 0) return 0.5; // Neutral starting point
    
    // Mock calculation based on current stats
    return Math.min(1, (this.gameState.currentStreak / recentChallenges) * 0.8 + 0.2);
  }

  generateEncouragement() {
    const encouragements = [
      "You're making great progress! 🌟",
      "Every expert was once a beginner. Keep going! 🚀",
      "Learning Vue is like building with LEGO - piece by piece! 🧩",
      "You've got this! The Vue community believes in you! 💪",
      "Remember: progress, not perfection! ✨"
    ];
    return encouragements[Math.floor(Math.random() * encouragements.length)];
  }

  buildChallengeContext(topic, difficulty, userProgress) {
    return {
      userLevel: this.userProfile.currentLevel,
      topicExperience: this.userProfile.skillAreas[topic] || 0,
      recentPerformance: this.calculateRecentSuccessRate(),
      learningStyle: this.userProfile.learningStyle,
      completedCount: this.userProfile.completedChallenges.length,
      currentStreak: this.gameState.currentStreak
    };
  }

  enhanceChallenge(challengeData, topic, difficulty) {
    // Ensure difficulty is a valid number
    const validDifficulty = typeof difficulty === 'number' && !isNaN(difficulty) ? difficulty : 3;
    
    // Validate and fix challenge data
    const enhancedChallenge = {
      // Core challenge data with fallbacks
      id: challengeData.id || `${topic}-${Date.now()}`,
      title: challengeData.title || `${topic.charAt(0).toUpperCase() + topic.slice(1)} Challenge`,
      description: challengeData.description || challengeData.objective || `Learn about ${topic}`,
      objective: challengeData.objective || challengeData.description || `Master ${topic} concepts`,
      difficulty: isNaN(challengeData.difficulty) ? validDifficulty : challengeData.difficulty,
      estimatedTime: challengeData.estimatedTime || "10 minutes",
      
      // Instructions and guidance
      instructions: Array.isArray(challengeData.instructions) ? challengeData.instructions : 
                   [challengeData.instruction || `Complete the ${topic} challenge`],
      hints: Array.isArray(challengeData.hints) ? challengeData.hints : 
             [challengeData.hint || `Think about ${topic} concepts in Vue`],
      
      // Code content
      starterCode: challengeData.starterCode || challengeData.code || "// Add your Vue code here",
      solution: challengeData.solution || challengeData.expectedCode || "// Solution will be provided",
      
      // Learning content
      concepts: Array.isArray(challengeData.concepts) ? challengeData.concepts : [topic],
      testCases: Array.isArray(challengeData.testCases) ? challengeData.testCases : [],
      resources: Array.isArray(challengeData.resources) ? challengeData.resources : [],
      
      // Game elements
      gameElements: {
        pointsReward: Math.floor(validDifficulty * 20 + 30), // 30-230 points
        bonusObjectives: this.generateBonusObjectives(topic),
        achievements: this.checkAchievementTriggers(challengeData),
        difficultyRating: validDifficulty,
        estimatedXP: Math.floor(validDifficulty * 15)
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        adaptedFor: this.userProfile.currentLevel,
        topic: topic,
        isAIGenerated: true
      }
    };

    return enhancedChallenge;
  }

  generateBonusObjectives(topic) {
    const bonusObjectives = {
      components: ["Add custom styling", "Include error handling", "Add prop validation"],
      reactivity: ["Use computed properties", "Implement watchers", "Optimize reactivity"],
      lifecycle: ["Add cleanup logic", "Handle edge cases", "Optimize performance"]
    };
    
    return bonusObjectives[topic] || ["Write clean code", "Add comments", "Follow Vue style guide"];
  }

  checkAchievementTriggers(challenge) {
    const achievements = [];
    
    if (this.gameState.challengesCompleted === 0) {
      achievements.push("first-challenge");
    }
    
    if (this.gameState.currentStreak >= 5) {
      achievements.push("streak-master");
    }
    
    return achievements;
  }

  // Fallback methods for when AI is unavailable
  getFallbackChallenge(topic, difficulty) {
    const templates = this.challengeTemplates[topic] || this.challengeTemplates.components;
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    return {
      ...template,
      id: `fallback-${Date.now()}`,
      difficulty: parseInt(difficulty) || 3,
      generatedAt: new Date().toISOString(),
      isAIGenerated: false
    };
  }

  getFallbackEvaluation(userCode, challenge) {
    const hasTemplate = userCode.includes('<template>');
    const hasScript = userCode.includes('<script');
    const score = (hasTemplate ? 50 : 0) + (hasScript ? 50 : 0);
    
    return {
      score,
      passed: score >= 60,
      feedback: {
        strengths: hasTemplate ? ["Good template structure"] : [],
        improvements: !hasTemplate ? ["Add a template section"] : [],
        suggestions: ["Keep practicing Vue fundamentals"]
      },
      codeAnalysis: {
        correctness: score / 10,
        bestPractices: 5,
        codeQuality: 5,
        performance: 5
      },
      nextSteps: ["Continue learning Vue basics"],
      encouragement: "Great effort! Keep building your Vue skills! 🌟",
      pointsEarned: Math.max(25, score),
      badges: []
    };
  }

  getFallbackLearningPath() {
    return {
      pathName: "Vue Fundamentals Journey",
      description: "Master the essential concepts of Vue.js development",
      estimatedTime: "60 minutes",
      difficulty: "beginner",
      challenges: [
        {
          topic: "components",
          title: "Your First Component",
          description: "Learn to create and use Vue components",
          estimatedTime: "15 minutes",
          priority: "high",
          reasoning: "Components are the foundation of Vue applications"
        },
        {
          topic: "reactivity",
          title: "Reactive Data Magic",
          description: "Understand Vue's reactivity system",
          estimatedTime: "20 minutes",
          priority: "high",
          reasoning: "Reactivity is what makes Vue applications dynamic"
        }
      ],
      learningObjectives: ["Create Vue components", "Understand reactivity", "Build interactive UIs"],
      motivation: "You're on the path to Vue mastery! Each challenge builds your skills. 🚀"
    };
  }

  initializeChallengeTemplates() {
    return {
      components: [
        {
          title: "Create a Welcome Component",
          description: "Build a Vue component that displays a personalized welcome message",
          objective: "Learn basic component structure and template syntax",
          instructions: [
            "Create a template with a welcome message",
            "Add a script section with component logic",
            "Use Vue's template interpolation"
          ],
          starterCode: `<template>
  <!-- Add your welcome message here -->
</template>

<script setup>
// Define your component logic
</script>`,
          solution: `<template>
  <div class="welcome">
    <h1>Welcome to Vue!</h1>
    <p>Hello, {{ name }}!</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('Vue Developer')
</script>`,
          concepts: ["components", "template", "interpolation"],
          hints: [
            "Remember to use {{ }} for displaying data in templates",
            "The script setup syntax is the modern way to write Vue components"
          ]
        }
      ],
      reactivity: [
        {
          title: "Counter Component",
          description: "Create a reactive counter that increments when clicked",
          objective: "Understand Vue's reactivity system and event handling",
          instructions: [
            "Create a counter variable using ref()",
            "Display the counter value in the template",
            "Add a button that increments the counter"
          ],
          starterCode: `<template>
  <!-- Add your counter UI here -->
</template>

<script setup>
import { ref } from 'vue'

// Create your reactive counter
</script>`,
          solution: `<template>
  <div class="counter">
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}
</script>`,
          concepts: ["reactivity", "ref", "event-handling"],
          hints: [
            "Use ref() to create reactive variables",
            "Remember to use .value when modifying ref variables in script"
          ]
        }
      ]
    };
  }

  saveProgress() {
    try {
      localStorage.setItem('vue-game-profile', JSON.stringify(this.userProfile));
      localStorage.setItem('vue-game-state', JSON.stringify(this.gameState));
    } catch (error) {
      console.error('Failed to save game progress:', error);
    }
  }

  loadProgress() {
    try {
      const savedProfile = localStorage.getItem('vue-game-profile');
      const savedState = localStorage.getItem('vue-game-state');
      
      if (savedProfile) {
        this.userProfile = { ...this.userProfile, ...JSON.parse(savedProfile) };
      }
      
      if (savedState) {
        this.gameState = { ...this.gameState, ...JSON.parse(savedState) };
      }
    } catch (error) {
      console.error('Failed to load game progress:', error);
    }
  }

  /**
   * Safely parse JSON that may be wrapped with markdown fences or contain trailing text.
   * Tries multiple strategies before failing.
   * @param {string} raw - the raw string returned by the LLM
   * @returns {object|null}
   */
  static safeJSONParse(raw) {
    if (!raw) return null;

    // Helper function to clean and fix common JSON issues
    const cleanJSON = (jsonStr) => {
      return jsonStr
        // Replace NaN with a default number
        .replace(/:\s*NaN\s*([,}])/g, ': 5$1')
        // Replace undefined with null
        .replace(/:\s*undefined\s*([,}])/g, ': null$1')
        // Fix trailing commas
        .replace(/,(\s*[}\]])/g, '$1')
        // Remove any trailing text after the JSON
        .replace(/```[\s\S]*$/, '')
        .trim();
    };

    // First attempt: straight JSON.parse
    try {
      const cleaned = cleanJSON(raw);
      return JSON.parse(cleaned);
    } catch (_) {
      /* ignore */
    }

    // Second attempt: extract fenced JSON block
    const fencedMatch = raw.match(/```(?:json)?[\r\n]+([\s\S]*?)```/i);
    if (fencedMatch && fencedMatch[1]) {
      try {
        const cleaned = cleanJSON(fencedMatch[1]);
        return JSON.parse(cleaned);
      } catch (_) {
        /* ignore */
      }
    }

    // Third attempt: strip possible backticks / code markers
    const stripped = raw.replace(/```/g, '').trim();
    try {
      const cleaned = cleanJSON(stripped);
      return JSON.parse(cleaned);
    } catch (_) {
      /* ignore */
    }

    // Fourth attempt: try to find JSON-like content between braces
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const cleaned = cleanJSON(jsonMatch[0]);
        return JSON.parse(cleaned);
      } catch (_) {
        /* ignore */
      }
    }

    console.warn('safeJSONParse: Failed to parse AI response as JSON.', raw);
    return null;
  }

  /**
   * Generate multiple challenges concurrently for better performance.
   * Accepts an array of topic definitions used throughout the app (could be plain strings or objects with a `topic` key).
   * Returns an array of challenges – falling back to default ones if generation fails for a topic.
   *
   * @param {Array<string|{topic:string}>} topics
   * @param {string} difficulty
   * @param {object} userProgress
   * @returns {Promise<Array<object>>}
   */
  async generateChallengesBatch(topics = [], difficulty = 'adaptive', userProgress = {}) {
    // Normalise to topic strings
    const topicEntries = topics.map((t) => (typeof t === 'string' ? { topic: t } : t));

    const results = await Promise.all(
      topicEntries.map(async (entry) => {
        try {
          const challenge = await this.generateChallenge(entry.topic, difficulty, userProgress);
          return { challenge, meta: entry };
        } catch (err) {
          console.error(`Batch generation failed for ${entry.topic}:`, err);
          return null;
        }
      })
    );

    return results.filter(Boolean).map((r) => ({ ...r.challenge, _meta: r.meta }));
  }
}

// Export singleton instance
export const aiGameService = new AIGameService();

// Export class for creating new instances if needed
export default AIGameService; 