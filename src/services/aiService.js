/**
 * AI Service for Vue Learning Application
 * 
 * This service integrates OpenAI API to provide intelligent learning features:
 * - AI Tutor: Personal assistant for Vue questions and guidance
 * - Code Review: Analyzes user's Vue code and provides feedback
 * - Quiz Generator: Creates personalized quiz questions based on progress
 * - Concept Explainer: Explains Vue concepts in different learning styles
 * - Learning Path Optimizer: Suggests next learning steps based on performance
 */

import OpenAI from 'openai';

// Initialize OpenAI client
// Note: In production, API key should be handled securely on the backend
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Only for demo purposes - use backend in production
});

/**
 * AI Tutor Service - Personal Vue.js learning assistant
 * Provides contextual help, explanations, and guidance
 */
export class AITutorService {
  constructor() {
    this.conversationHistory = [];
    this.userLearningProfile = {
      currentLevel: 'beginner',
      completedTopics: [],
      strugglingAreas: [],
      learningStyle: 'visual' // visual, auditory, kinesthetic, reading
    };
  }

  /**
   * Chat with AI tutor about Vue concepts
   * @param {string} userMessage - User's question or message
   * @param {Object} context - Current learning context (section, progress, etc.)
   * @returns {Promise<string>} AI tutor's response
   */
  async chatWithTutor(userMessage, context = {}) {
    try {
      // Build context-aware system prompt
      const systemPrompt = this.buildTutorSystemPrompt(context);
      
      // Add user message to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date().toISOString(),
        context
      });

      const messages = [
        { role: 'system', content: systemPrompt },
        ...this.conversationHistory.slice(-10).map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      ];

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1
      });

      const aiResponse = completion.choices[0].message.content;
      
      // Add AI response to conversation history
      this.conversationHistory.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toISOString()
      });

      return aiResponse;
    } catch (error) {
      console.error('AI Tutor Error:', error);
      return this.getFallbackTutorResponse(userMessage);
    }
  }

  /**
   * Build context-aware system prompt for the AI tutor
   */
  buildTutorSystemPrompt(context) {
    return `You are an expert Vue.js tutor with a fun, encouraging personality. You're helping someone learn Vue 3 through a unique memory palace system with funny mnemonics.

TEACHING STYLE:
- Use the same fun, quirky style as the app (dancing LEGO blocks, psychic mirrors, mad scientists)
- Be encouraging and patient, like the best mentor ever
- Explain concepts using analogies and visual metaphors
- Break down complex topics into digestible pieces
- Always provide practical, actionable examples

CURRENT CONTEXT:
- User's level: ${this.userLearningProfile.currentLevel}
- Current section: ${context.currentSection || 'general'}
- Learning style: ${this.userLearningProfile.learningStyle}
- Completed topics: ${this.userLearningProfile.completedTopics.join(', ') || 'none yet'}

RESPONSE GUIDELINES:
- Keep responses under 400 words
- Use emojis to make it engaging 🎉
- Reference the memory palace mnemonics when relevant
- Suggest next learning steps when appropriate
- If user seems stuck, offer multiple explanation approaches
- Always end with encouragement or a question to keep engagement

Remember: You're not just teaching Vue - you're making it memorable and fun!`;
  }

  /**
   * Fallback response when AI service is unavailable
   */
  getFallbackTutorResponse(userMessage) {
    const fallbackResponses = [
      "🤖 Oops! My AI brain is taking a coffee break ☕. Try asking me about Vue components, reactivity, or the Composition API - I love talking about those dancing LEGO blocks! 🧩",
      "🔧 My neural networks are doing some maintenance! But here's a quick tip: Remember that Vue components are like magical LEGO blocks that can dance together to build amazing apps! 💃",
      "⚡ AI services are temporarily unavailable, but don't let that stop your learning momentum! Try exploring the interactive tutorials or test your knowledge in the Concept Arena! 🏟️"
    ];
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }

  /**
   * Update user's learning profile based on interactions
   */
  updateLearningProfile(updates) {
    this.userLearningProfile = { ...this.userLearningProfile, ...updates };
  }
}

/**
 * AI Code Review Service - Analyzes Vue code and provides feedback
 */
export class AICodeReviewService {
  /**
   * Review Vue.js code and provide constructive feedback
   * @param {string} code - Vue code to review
   * @param {string} codeType - Type of code (component, template, script, etc.)
   * @returns {Promise<Object>} Review results with feedback and suggestions
   */
  async reviewCode(code, codeType = 'component') {
    try {
      const systemPrompt = `You are an expert Vue.js code reviewer. Analyze the provided Vue code and give constructive, educational feedback.

REVIEW CRITERIA:
- Vue 3 best practices and conventions
- Code structure and organization
- Performance considerations
- Accessibility and UX
- Security considerations
- Readability and maintainability

RESPONSE FORMAT (JSON):
{
  "overallScore": 1-10,
  "strengths": ["strength1", "strength2"],
  "improvements": [
    {
      "issue": "description",
      "severity": "low|medium|high",
      "suggestion": "how to fix",
      "example": "code example if helpful"
    }
  ],
  "encouragement": "positive message",
  "nextSteps": ["suggestion1", "suggestion2"]
}

Be encouraging and educational - remember this is for learning!`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Please review this Vue ${codeType} code:\n\n${code}` }
        ],
        max_tokens: 800,
        temperature: 0.3
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('AI Code Review Error:', error);
      return this.getFallbackCodeReview();
    }
  }

  getFallbackCodeReview() {
    return {
      overallScore: 7,
      strengths: ["Code structure looks good!", "Following Vue conventions"],
      improvements: [
        {
          issue: "AI review temporarily unavailable",
          severity: "low",
          suggestion: "Try the review again in a moment, or check Vue documentation for best practices",
          example: ""
        }
      ],
      encouragement: "Keep coding! Every line of code is a step forward in your Vue journey! 🚀",
      nextSteps: ["Continue practicing", "Explore Vue documentation", "Try building a small project"]
    };
  }
}

/**
 * AI Quiz Generator Service - Creates personalized quiz questions
 */
export class AIQuizGeneratorService {
  /**
   * Generate personalized quiz questions based on user's progress
   * @param {Object} userProgress - User's learning progress and preferences
   * @param {string} topic - Specific Vue topic to focus on
   * @param {number} difficulty - Difficulty level (1-5)
   * @returns {Promise<Array>} Array of quiz questions
   */
  async generateQuiz(userProgress, topic = 'general', difficulty = 3) {
    try {
      const systemPrompt = `You are an expert Vue.js educator creating personalized quiz questions. Generate engaging, educational quiz questions that test understanding, not just memorization.

REQUIREMENTS:
- Create 5 multiple-choice questions
- Focus on practical Vue 3 concepts
- Include real-world scenarios
- Vary question types (conceptual, practical, debugging)
- Use the fun memory palace style when appropriate

USER CONTEXT:
- Completed topics: ${userProgress.completedTopics?.join(', ') || 'none'}
- Struggling areas: ${userProgress.strugglingAreas?.join(', ') || 'none'}
- Target topic: ${topic}
- Difficulty level: ${difficulty}/5

RESPONSE FORMAT (JSON):
{
  "questions": [
    {
      "id": "unique_id",
      "question": "question text",
      "options": ["option1", "option2", "option3", "option4"],
      "correctAnswer": 0,
      "explanation": "why this answer is correct",
      "difficulty": "beginner|intermediate|advanced",
      "topic": "vue topic",
      "memoryHint": "optional mnemonic hint"
    }
  ]
}`;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate a personalized Vue.js quiz focusing on ${topic} at difficulty level ${difficulty}` }
        ],
        max_tokens: 1200,
        temperature: 0.8
      });

      return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
      console.error('AI Quiz Generator Error:', error);
      return this.getFallbackQuiz(topic);
    }
  }

  getFallbackQuiz(topic) {
    return {
      questions: [
        {
          id: 'fallback_1',
          question: `What makes Vue.js components like dancing LEGO blocks?`,
          options: [
            "They can be reused and combined to build complex UIs",
            "They are made of plastic",
            "They only work in Denmark",
            "They make clicking sounds"
          ],
          correctAnswer: 0,
          explanation: "Vue components are reusable building blocks that can be combined to create complex user interfaces, just like LEGO blocks!",
          difficulty: "beginner",
          topic: topic,
          memoryHint: "Remember: Components = Dancing LEGO blocks that build amazing apps! 🧩💃"
        }
      ]
    };
  }
}

/**
 * AI Concept Explainer Service - Explains concepts in different learning styles
 */
export class AIConceptExplainerService {
  /**
   * Explain a Vue concept using different learning styles
   * @param {string} concept - Vue concept to explain
   * @param {string} learningStyle - User's preferred learning style
   * @param {string} currentLevel - User's current skill level
   * @returns {Promise<Object>} Explanation tailored to learning style
   */
  async explainConcept(concept, learningStyle = 'visual', currentLevel = 'beginner') {
    try {
      const systemPrompt = this.buildExplainerSystemPrompt(learningStyle, currentLevel);

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Explain the Vue.js concept: ${concept}` }
        ],
        max_tokens: 600,
        temperature: 0.7
      });

      return {
        concept,
        learningStyle,
        explanation: completion.choices[0].message.content,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('AI Concept Explainer Error:', error);
      return this.getFallbackExplanation(concept, learningStyle);
    }
  }

  buildExplainerSystemPrompt(learningStyle, currentLevel) {
    const stylePrompts = {
      visual: "Use visual metaphors, diagrams descriptions, colors, and spatial relationships. Paint pictures with words!",
      auditory: "Use sound metaphors, rhythmic patterns, and verbal mnemonics. Make it sing!",
      kinesthetic: "Use physical actions, movement metaphors, and hands-on analogies. Make it tangible!",
      reading: "Use structured text, lists, definitions, and written examples. Make it clear and organized!"
    };

    return `You are a Vue.js expert who specializes in ${learningStyle} learning. Explain Vue concepts in a way that resonates with ${learningStyle} learners at the ${currentLevel} level.

LEARNING STYLE APPROACH:
${stylePrompts[learningStyle]}

REQUIREMENTS:
- Use the fun memory palace style from the app
- Include practical examples
- Make it memorable and engaging
- Adapt complexity to ${currentLevel} level
- Use emojis and formatting for clarity
- Connect to real-world scenarios

Keep explanations under 500 words but make every word count!`;
  }

  getFallbackExplanation(concept, learningStyle) {
    return {
      concept,
      learningStyle,
      explanation: `🤖 AI explanation temporarily unavailable! But remember: ${concept} in Vue is like a magical tool that helps you build amazing web applications. Think of it as part of your developer toolkit - each Vue concept is designed to make your coding life easier and more enjoyable! 🎉`,
      timestamp: new Date().toISOString()
    };
  }
}

// Create singleton instances for easy import
export const aiTutor = new AITutorService();
export const aiCodeReviewer = new AICodeReviewService();
export const aiQuizGenerator = new AIQuizGeneratorService();
export const aiConceptExplainer = new AIConceptExplainerService();

// Main AI service aggregator
export const aiService = {
  tutor: aiTutor,
  codeReviewer: aiCodeReviewer,
  quizGenerator: aiQuizGenerator,
  conceptExplainer: aiConceptExplainer
};

export default aiService; 