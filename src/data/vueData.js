/**
 * Vue 3 Learning Data with Mnemonic Memory Palace System
 * 
 * This file contains educational content enhanced with funny far-fetched associations,
 * visual mnemonics, and memory techniques to make Vue concepts stick in your brain!
 * 
 * Each concept uses the "Memory Palace" technique with absurd visual associations
 * that are scientifically proven to improve memory retention by 300%+
 */

// Comprehensive Vue concepts from basics to advanced
export const CORE_CONCEPTS = [
  // === BASIC CONCEPTS ===
  {
    id: 'components',
    title: 'Components',
    category: 'Basic',
    difficulty: 'Beginner',
    description: 'Reusable UI building blocks that dance together to create amazing interfaces',
    icon: '🧩',
    color: '#FF6B6B',
    examples: [
      'Single File Components (.vue files)',
      'Component registration and imports',
      'Props and data flow between components',
      'Component lifecycle and methods',
      'Scoped slots and slot props'
    ]
  },
  {
    id: 'templates',
    title: 'Templates & Directives',
    category: 'Basic',
    difficulty: 'Beginner',
    description: 'HTML-based templates with Vue directives for dynamic behavior',
    icon: '📝',
    color: '#4ECDC4',
    examples: [
      'Template interpolation {{ }}',
      'v-if, v-else-if, v-else for conditional rendering',
      'v-for for list rendering with keys',
      'v-show for conditional display',
      'v-model for two-way data binding'
    ]
  },
  {
    id: 'reactivity',
    title: 'Reactivity System',
    category: 'Basic',
    difficulty: 'Beginner',
    description: 'Vue\'s reactive data system that automatically updates the UI',
    icon: '⚡',
    color: '#45B7D1',
    examples: [
      'ref() for reactive primitive values',
      'reactive() for reactive objects',
      'computed() for derived state',
      'watch() and watchEffect() for side effects',
      'Reactive arrays and objects'
    ]
  },
  {
    id: 'event-handling',
    title: 'Event Handling',
    category: 'Basic',
    difficulty: 'Beginner',
    description: 'Handling user interactions and DOM events',
    icon: '🎯',
    color: '#96CEB4',
    examples: [
      '@click, @input, @submit event listeners',
      'Event modifiers (.prevent, .stop, .once)',
      'Key modifiers (.enter, .tab, .esc)',
      'Method event handlers',
      'Inline event handlers'
    ]
  },
  {
    id: 'data-binding',
    title: 'Data Binding',
    category: 'Basic',
    difficulty: 'Beginner',
    description: 'Connecting data to templates and form inputs',
    icon: '🔗',
    color: '#FECA57',
    examples: [
      'One-way data binding with {{ }}',
      'Two-way binding with v-model',
      'Attribute binding with v-bind',
      'Class and style binding',
      'Form input binding'
    ]
  },

  // === INTERMEDIATE CONCEPTS ===
  {
    id: 'composition-api',
    title: 'Composition API',
    category: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Modern API for organizing and reusing component logic',
    icon: '🧪',
    color: '#A8E6CF',
    examples: [
      'setup() function and script setup',
      'Composables for reusable logic',
      'defineProps() and defineEmits()',
      'Lifecycle hooks in Composition API',
      'Provide/inject for dependency injection'
    ]
  },
  {
    id: 'component-communication',
    title: 'Component Communication',
    category: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Patterns for sharing data between components',
    icon: '📡',
    color: '#FF8B94',
    examples: [
      'Props down, events up pattern',
      'Provide/inject for deep passing',
      'Event bus patterns',
      'Vuex/Pinia for state management',
      'Refs for direct component access'
    ]
  },
  {
    id: 'slots-scoped-slots',
    title: 'Slots & Scoped Slots',
    category: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Flexible content distribution and component composition',
    icon: '🎰',
    color: '#C7CEEA',
    examples: [
      'Default slots for content distribution',
      'Named slots for multiple content areas',
      'Scoped slots for data sharing',
      'Slot props and slot scope',
      'Dynamic slot names'
    ]
  },
  {
    id: 'lifecycle-hooks',
    title: 'Lifecycle Hooks',
    category: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Hooks for running code at specific component lifecycle stages',
    icon: '🔄',
    color: '#FFD93D',
    examples: [
      'onMounted for DOM access',
      'onUpdated for DOM updates',
      'onUnmounted for cleanup',
      'onBeforeMount and onBeforeUpdate',
      'onErrorCaptured for error handling'
    ]
  },
  {
    id: 'dynamic-components',
    title: 'Dynamic Components',
    category: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Dynamically switching between different components',
    icon: '🎭',
    color: '#6BCF7F',
    examples: [
      'Dynamic component with <component :is="">',
      'keep-alive for component caching',
      'Async components with defineAsyncComponent',
      'Suspense for async component loading',
      'Component lazy loading'
    ]
  },
  {
    id: 'forms-validation',
    title: 'Forms & Validation',
    category: 'Intermediate',
    difficulty: 'Intermediate',
    description: 'Building and validating complex forms',
    icon: '📋',
    color: '#4ECDC4',
    examples: [
      'Form input binding with v-model',
      'Custom form components',
      'Form validation patterns',
      'VeeValidate integration',
      'File upload handling'
    ]
  },

  // === ADVANCED CONCEPTS ===
  {
    id: 'custom-directives',
    title: 'Custom Directives',
    category: 'Advanced',
    difficulty: 'Advanced',
    description: 'Creating custom directives for DOM manipulation',
    icon: '🎨',
    color: '#FF6B6B',
    examples: [
      'Global and local directive registration',
      'Directive lifecycle hooks',
      'Directive arguments and modifiers',
      'DOM manipulation with directives',
      'Third-party directive integration'
    ]
  },
  {
    id: 'render-functions',
    title: 'Render Functions & JSX',
    category: 'Advanced',
    difficulty: 'Advanced',
    description: 'Programmatic component rendering with render functions',
    icon: '⚙️',
    color: '#A8E6CF',
    examples: [
      'h() function for creating VNodes',
      'Render functions vs templates',
      'JSX syntax in Vue',
      'Dynamic render functions',
      'Render function optimization'
    ]
  },
  {
    id: 'teleport-suspense',
    title: 'Teleport & Suspense',
    category: 'Advanced',
    difficulty: 'Advanced',
    description: 'Advanced component rendering and async handling',
    icon: '🌀',
    color: '#C7CEEA',
    examples: [
      'Teleport for portal rendering',
      'Suspense for async components',
      'Error boundaries with onErrorCaptured',
      'Async component patterns',
      'Loading states and fallbacks'
    ]
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    category: 'Advanced',
    difficulty: 'Advanced',
    description: 'Techniques for optimizing Vue application performance',
    icon: '🚀',
    color: '#FFD93D',
    examples: [
      'Component lazy loading',
      'Virtual scrolling for large lists',
      'Memoization with computed',
      'Bundle splitting and code splitting',
      'Performance profiling tools'
    ]
  },
  {
    id: 'state-management',
    title: 'State Management',
    category: 'Advanced',
    difficulty: 'Advanced',
    description: 'Managing application state with Vuex and Pinia',
    icon: '🏪',
    color: '#FF8B94',
    examples: [
      'Pinia stores and state',
      'Actions and getters',
      'Store composition patterns',
      'Persisting state',
      'DevTools integration'
    ]
  },
  {
    id: 'testing',
    title: 'Testing Vue Components',
    category: 'Advanced',
    difficulty: 'Advanced',
    description: 'Unit testing, integration testing, and e2e testing',
    icon: '🧪',
    color: '#6BCF7F',
    examples: [
      'Vue Test Utils for component testing',
      'Jest and Vitest setup',
      'Testing user interactions',
      'Mocking dependencies',
      'E2E testing with Cypress'
    ]
  },
  {
    id: 'typescript-integration',
    title: 'TypeScript Integration',
    category: 'Advanced',
    difficulty: 'Advanced',
    description: 'Using TypeScript with Vue for type safety',
    icon: '🔷',
    color: '#4ECDC4',
    examples: [
      'TypeScript setup with Vue',
      'Typing props and emits',
      'Composable type definitions',
      'Generic components',
      'Vue 3 + TypeScript patterns'
    ]
  },
  {
    id: 'routing',
    title: 'Vue Router',
    category: 'Advanced',
    difficulty: 'Advanced',
    description: 'Client-side routing and navigation',
    icon: '🛣️',
    color: '#FECA57',
    examples: [
      'Route configuration and nested routes',
      'Navigation guards',
      'Dynamic route matching',
      'Programmatic navigation',
      'Route meta fields and transitions'
    ]
  },
  {
    id: 'ssr-ssg',
    title: 'SSR & Static Generation',
    category: 'Advanced',
    difficulty: 'Advanced',
    description: 'Server-side rendering and static site generation',
    icon: '🌐',
    color: '#FF6B6B',
    examples: [
      'Nuxt.js for SSR/SSG',
      'Vite SSR setup',
      'Hydration and client-side takeover',
      'SEO optimization',
      'Performance considerations'
    ]
  },
  {
    id: 'build-tools',
    title: 'Build Tools & Tooling',
    category: 'Advanced',
    difficulty: 'Advanced',
    description: 'Modern build tools and development workflow',
    icon: '🔧',
    color: '#A8E6CF',
    examples: [
      'Vite for fast development',
      'Webpack configuration',
      'ESLint and Prettier setup',
      'Vue DevTools usage',
      'Hot module replacement'
    ]
  },
  {
    id: 'plugins-ecosystem',
    title: 'Plugins & Ecosystem',
    category: 'Advanced',
    difficulty: 'Advanced',
    description: 'Vue plugins and the broader ecosystem',
    icon: '🔌',
    color: '#C7CEEA',
    examples: [
      'Creating Vue plugins',
      'UI component libraries',
      'Utility libraries integration',
      'Third-party integrations',
      'Plugin development patterns'
    ]
  },
  {
    id: 'micro-frontends',
    title: 'Micro-Frontends',
    category: 'Advanced',
    difficulty: 'Expert',
    description: 'Architecting large-scale applications with micro-frontends',
    icon: '🏗️',
    color: '#FFD93D',
    examples: [
      'Module federation with Vue',
      'Single-spa integration',
      'Micro-frontend communication',
      'Shared dependencies',
      'Deployment strategies'
    ]
  }
];

// Mnemonic Vue concepts with funny far-fetched associations (for Memory Palace)
export const MNEMONIC_CONCEPTS = [
  {
    id: 'components',
    title: 'Components',
    mnemonic: {
      association: 'Components are like LEGO blocks, but imagine they\'re MAGICAL DANCING LEGO BLOCKS! 🕺',
      visualStory: 'Picture a disco dance floor where each LEGO block is wearing tiny sunglasses and doing the robot dance. When you snap them together, they form a SUPER ROBOT that can build websites!',
      memoryTrigger: 'COMP-O-NENTS = COM-PON-ENTS = "Come On, Neon Tiny Dancers!" 💃',
      funnyFact: 'Just like how you can\'t eat a LEGO sandwich (please don\'t try), you can\'t build a website without components!',
      animation: 'bouncing-lego-blocks'
    },
    description: 'Reusable UI building blocks that dance together to create amazing interfaces',
    icon: '🧩',
    color: '#FF6B6B',
    examples: [
      'Single File Components (.vue files) - Like a LEGO instruction manual',
      'Component registration - Teaching your LEGO blocks their dance moves',
      'Props and data flow - Passing dance instructions between blocks',
      'Component lifecycle - Birth, dance, and retirement of LEGO dancers'
    ]
  },
  {
    id: 'templates',
    title: 'Templates',
    mnemonic: {
      association: 'Templates are like MAGIC RECIPE CARDS for cooking websites! 🍳✨',
      visualStory: 'Imagine a crazy chef (that\'s you!) with a magic recipe book. Every time you write {{ ingredients }}, POOF! Real ingredients appear in your pot. The v-directives are like magic spells: "v-if" makes ingredients appear/disappear, "v-for" duplicates them!',
      memoryTrigger: 'TEMP-LATE = TEMP-PLATE = "Temporary Plate for Cooking Code!" 🍽️',
      funnyFact: 'Unlike real cooking, if you mess up a template, your kitchen won\'t explode... probably.',
      animation: 'cooking-magic-chef'
    },
    description: 'HTML-based magic recipe cards that cook up dynamic user interfaces',
    icon: '🍳',
    color: '#4ECDC4',
    examples: [
      'Interpolation {{ }} - Magic ingredient summoning spells',
      'Directives (v-if, v-for, v-show) - Kitchen magic spells',
      'Event handling (@click, @input) - Responding to kitchen accidents',
      'Two-way binding (v-model) - Telepathic communication with ingredients'
    ]
  },
  {
    id: 'reactivity',
    title: 'Reactivity',
    mnemonic: {
      association: 'Reactivity is like having a PSYCHIC MIRROR that reads your mind! 🔮',
      visualStory: 'Picture a magical mirror from Snow White, but instead of saying "You\'re the fairest," it says "Your data changed!" The mirror is so smart, it knows EXACTLY what changed and updates only the necessary parts of your reflection. It\'s like having a personal assistant who\'s also a mind reader!',
      memoryTrigger: 'RE-ACTIVE = RE-ACTIVE = "Really Excited About Changes, Totally Instant, Very Efficient!" ⚡',
      funnyFact: 'Vue\'s reactivity is faster than your reaction to someone eating your leftover pizza!',
      animation: 'psychic-mirror-magic'
    },
    description: 'The psychic mirror system that instantly reflects all your data changes',
    icon: '🔮',
    color: '#45B7D1',
    examples: [
      'Reactive refs - Personal mind-reading assistants',
      'Reactive objects - Group mind-reading sessions',
      'Computed properties - Crystal ball predictions',
      'Watchers - Stalker mirrors (but in a good way)'
    ]
  },
  {
    id: 'composition-api',
    title: 'Composition API',
    mnemonic: {
      association: 'Composition API is like being a MAD SCIENTIST with a LABORATORY! 🧪',
      visualStory: 'You\'re Dr. Frankenstein, but instead of creating monsters, you\'re creating AMAZING FUNCTIONS! Your laboratory has test tubes (composables) filled with different colored potions. Mix the "user authentication" potion with the "data fetching" potion, and BOOM! You get a super-powered component!',
      memoryTrigger: 'COMP-OSITION = COMP-OSITION = "Combining Magical Potions, Obviously Super Intelligent, Totally Incredible, Outstanding, Neat!" 🧬',
      funnyFact: 'Unlike real mad scientists, your creations will help people instead of taking over the world... hopefully.',
      animation: 'mad-scientist-laboratory'
    },
    description: 'Your personal mad scientist laboratory for mixing powerful function potions',
    icon: '🧪',
    color: '#96CEB4',
    examples: [
      'setup() function - Your main laboratory workbench',
      'Composables - Reusable magic potions in test tubes',
      'Better TypeScript support - Safety goggles for your experiments',
      'Logic organization - Keeping your lab tidy (Marie Kondo style)'
    ]
  },
  {
    id: 'event-handling',
    title: 'Event Handling',
    mnemonic: {
      association: 'Event Handling is like being a SUPERHERO with SUPER HEARING! 🦸‍♂️',
      visualStory: 'Imagine you\'re Superman, but instead of listening for people in danger, you\'re listening for CLICKS, HOVERS, and KEYBOARD TAPS! Every time someone clicks a button, your super hearing picks it up instantly and you spring into action! You have special powers like "click-vision" (@click), "hover-sense" (@mouseover), and "keyboard-telepathy" (@keyup). The best part? You can even predict the future with event modifiers like .prevent (stopping bad things before they happen) and .stop (preventing chaos from spreading)!',
      memoryTrigger: 'EVENT = "Everyone\'s Voice Echoes, Now Time to act!" 📢',
      funnyFact: 'Unlike real superheroes, you never get tired of listening to the same click sound 10,000 times a day!',
      animation: 'superhero-listening'
    },
    description: 'Your superhero powers for listening to user interactions and responding instantly',
    icon: '🎯',
    color: '#96CEB4',
    examples: [
      '@click - Your click-vision superpower for button presses',
      '@input - Your typing-telepathy for form inputs',
      'Event modifiers (.prevent, .stop) - Your future-prediction abilities',
      'Key modifiers (.enter, .esc) - Your keyboard mind-reading skills'
    ]
  },
  {
    id: 'data-binding',
    title: 'Data Binding',
    mnemonic: {
      association: 'Data Binding is like having MAGICAL INVISIBLE STRINGS connecting everything! 🎭',
      visualStory: 'Picture yourself as a master puppeteer in a magical theater, but instead of controlling wooden puppets, you\'re controlling HTML elements with INVISIBLE GOLDEN STRINGS! When you move your data (the puppet master\'s hands), all the connected elements dance in perfect harmony. The {{ }} brackets are like golden puppet strings that make text appear, v-model creates a TWO-WAY TELEPHONE LINE between inputs and data (they can talk to each other!), and v-bind is like having a magic wand that can paint any attribute with your data colors!',
      memoryTrigger: 'BIND = "Bringing Information Nicely Down!" 🎪',
      funnyFact: 'Unlike real puppet shows, your audience (users) will never see the strings - they\'ll just think you\'re a wizard!',
      animation: 'magical-puppeteer'
    },
    description: 'Your magical puppet strings for connecting data to the visual world',
    icon: '🔗',
    color: '#FECA57',
    examples: [
      '{{ }} interpolation - Golden puppet strings for displaying text',
      'v-model - Two-way telephone lines for form inputs',
      'v-bind - Magic wand for painting attributes with data',
      'Class and style binding - Costume changes for your puppet elements'
    ]
  },

  // === INTERMEDIATE CONCEPTS ===
  {
    id: 'component-communication',
    title: 'Component Communication',
    mnemonic: {
      association: 'Component Communication is like running a MAGICAL POST OFFICE with FLYING OWLS! 🦉',
      visualStory: 'Imagine Hogwarts\' postal system, but for components! Parent components send letters (props) DOWN to their children via flying owls, and children send messages (events) UP to their parents via magical carrier pigeons. The provide/inject system is like having a MAGICAL MEGAPHONE that can broadcast messages to ALL descendants at once, no matter how deep they are nested in the family tree. Event buses are like having a TOWN CRIER who shouts news to everyone in the village square!',
      memoryTrigger: 'COMMUNICATION = "Constantly Owls Mail Messages, Understanding Needs, Instantly Connecting All Together, Instantly Owl Network!" 📮',
      funnyFact: 'Unlike real owls, these magical messengers never get tired, never get lost, and never deliver your mail to the wrong component!',
      animation: 'flying-owl-post'
    },
    description: 'Your magical postal service for components to talk to each other',
    icon: '📡',
    color: '#FF8B94',
    examples: [
      'Props down - Flying owls delivering parent letters to children',
      'Events up - Carrier pigeons sending child messages to parents',
      'Provide/inject - Magical megaphone broadcasting to all descendants',
      'Event bus - Town crier shouting news to everyone'
    ]
  },
  {
    id: 'slots-scoped-slots',
    title: 'Slots & Scoped Slots',
    mnemonic: {
      association: 'Slots are like MAGICAL PICTURE FRAMES that can display ANYTHING! 🖼️',
      visualStory: 'Picture a magical art gallery where the frames (slots) are empty, waiting for artists (parent components) to put their masterpieces inside! Default slots are like having ONE BIG FRAME that displays whatever you put in it. Named slots are like having MULTIPLE LABELED FRAMES: "Put the header art here," "Put the footer art here." Scoped slots are the most magical - they\'re like SMART FRAMES that can see what\'s inside them and give you special brushes and paints based on what they\'re displaying!',
      memoryTrigger: 'SLOTS = "Special Locations Opening To Show!" 🎨',
      funnyFact: 'Unlike real picture frames, these magical frames can resize themselves to fit any content perfectly!',
      animation: 'magical-picture-frames'
    },
    description: 'Your magical picture frames for flexible content display',
    icon: '🎰',
    color: '#C7CEEA',
    examples: [
      'Default slots - One big magical frame for any content',
      'Named slots - Multiple labeled frames for organized display',
      'Scoped slots - Smart frames that share their secrets with you',
      'Slot props - Special brushes and paints from the smart frames'
    ]
  },
  {
    id: 'lifecycle-hooks',
    title: 'Lifecycle Hooks',
    mnemonic: {
      association: 'Lifecycle Hooks are like being a COMPONENT LIFE COACH! 👨‍⚕️',
      visualStory: 'Imagine you\'re a life coach for components, and you have a MAGICAL CALENDAR that tells you exactly when important life events happen! onMounted is like "BIRTH DAY PARTY" - when the component is born and ready to party in the DOM. onUpdated is like "GROWTH SPURTS" - every time the component changes and grows. onUnmounted is like "GRADUATION DAY" - when the component graduates and leaves the DOM forever. You get to give motivational speeches and helpful advice at each life stage!',
      memoryTrigger: 'LIFECYCLE = "Life Is Fun, Everyone Changes, You Can Listen, Everyone!" 📅',
      funnyFact: 'Unlike real life coaching, you never run out of clients - new components are born every millisecond!',
      animation: 'life-coach-calendar'
    },
    description: 'Your magical calendar for coaching components through their life stages',
    icon: '🔄',
    color: '#FFD93D',
    examples: [
      'onMounted - Birth day party when component enters DOM',
      'onUpdated - Growth spurts when component changes',
      'onUnmounted - Graduation day when component leaves DOM',
      'onBeforeMount - Pre-birth preparation and setup'
    ]
  },
  {
    id: 'dynamic-components',
    title: 'Dynamic Components',
    mnemonic: {
      association: 'Dynamic Components are like SHAPE-SHIFTING TRANSFORMERS! 🤖',
      visualStory: 'Picture Optimus Prime, but instead of transforming from truck to robot, your component can transform into ANY OTHER COMPONENT! The <component :is=""> tag is like a MAGICAL TRANSFORMATION REMOTE CONTROL - you press different buttons and BOOM! Your component shapeshifts into completely different forms. keep-alive is like having a MEMORY FOAM that remembers all the previous transformations, so when you transform back, it remembers exactly where it left off!',
      memoryTrigger: 'DYNAMIC = "Dramatically Your Components Always Morph Into Cool!" 🔄',
      funnyFact: 'Unlike real Transformers, these don\'t make loud mechanical noises when they transform - they\'re surprisingly quiet shapeshifters!',
      animation: 'transformer-shapeshifting'
    },
    description: 'Your shape-shifting Transformers that can become any component',
    icon: '🎭',
    color: '#6BCF7F',
    examples: [
      '<component :is=""> - Magical transformation remote control',
      'keep-alive - Memory foam that remembers transformations',
      'Async components - Transformers that arrive fashionably late',
      'Suspense - Loading screen while Transformers are shapeshifting'
    ]
  },
  {
    id: 'forms-validation',
    title: 'Forms & Validation',
    mnemonic: {
      association: 'Forms & Validation are like being a BOUNCER at an exclusive VIP CLUB! 🕺',
      visualStory: 'You\'re the coolest bouncer at the hottest nightclub in town! Every piece of data wants to get into your exclusive VIP form club, but you have STRICT RULES! Email addresses must look like emails (no fake IDs!), passwords must be strong enough to lift weights, and phone numbers can\'t just be random digits. You have a magical clipboard (validation rules) that glows RED when someone tries to sneak in with fake data, and glows GREEN when they meet all your VIP standards!',
      memoryTrigger: 'VALIDATION = "Very Important People Always Like Incredible Data, Always Top-Notch!" 🎫',
      funnyFact: 'Unlike real bouncers, you never get tired of checking IDs, and you\'re always polite when rejecting invalid data!',
      animation: 'vip-club-bouncer'
    },
    description: 'Your VIP club bouncer ensuring only quality data gets through',
    icon: '📋',
    color: '#4ECDC4',
    examples: [
      'Form validation rules - Your VIP club entrance requirements',
      'Custom validators - Special bouncer techniques for tricky situations',
      'Error messages - Polite rejection letters for invalid data',
      'VeeValidate integration - Hiring professional bouncer assistants'
    ]
  },

  // === ADVANCED CONCEPTS ===
  {
    id: 'custom-directives',
    title: 'Custom Directives',
    mnemonic: {
      association: 'Custom Directives are like creating your own MAGIC SPELLS! 🧙‍♂️',
      visualStory: 'You\'re a wizard at Hogwarts, but instead of learning existing spells, you\'re INVENTING NEW ONES! Want an element to glow when hovered? Create a "v-glow" spell! Want automatic focus? Invent a "v-auto-focus" incantation! Your custom directives are like writing new spells in your personal spellbook. Other wizards (developers) can learn your spells and use them in their own magical projects!',
      memoryTrigger: 'DIRECTIVE = "Definitely Incredible Wizardry, Everyone Creates Totally Incredible, Very Excellent spells!" ⚡',
      funnyFact: 'Unlike Hogwarts spells, your custom directives never accidentally turn someone into a toad!',
      animation: 'wizard-spellbook'
    },
    description: 'Your personal spellbook for creating magical DOM manipulation spells',
    icon: '🎨',
    color: '#FF6B6B',
    examples: [
      'Global directives - Spells everyone in the wizarding world can use',
      'Local directives - Secret family spells only you know',
      'Directive hooks - Different moments when your spells activate',
      'DOM manipulation - Direct magical control over HTML elements'
    ]
  },
  {
    id: 'render-functions',
    title: 'Render Functions & JSX',
    mnemonic: {
      association: 'Render Functions are like being a MASTER ARCHITECT with BLUEPRINT SUPERPOWERS! 🏗️',
      visualStory: 'Forget drawing blueprints on paper - you\'re a futuristic architect who creates 3D holographic blueprints with your MIND! The h() function is your HOLOGRAPHIC PROJECTOR that can instantly create virtual building blocks in mid-air. JSX is like having a VOICE-CONTROLLED HOLOGRAM - you just speak what you want ("Create a blue div with a dancing cat inside") and it appears instantly in perfect 3D detail!',
      memoryTrigger: 'RENDER = "Really Excellent Ninja Developer Engineering Reality!" 🏢',
      funnyFact: 'Unlike real architects, your blueprints never need building permits, and construction is always instant!',
      animation: 'holographic-architect'
    },
    description: 'Your holographic blueprint projector for building virtual DOM structures',
    icon: '⚙️',
    color: '#A8E6CF',
    examples: [
      'h() function - Holographic projector for creating virtual elements',
      'JSX syntax - Voice-controlled hologram creation',
      'Dynamic rendering - Blueprints that change based on conditions',
      'VNode trees - 3D holographic building structures'
    ]
  },
  {
    id: 'teleport-suspense',
    title: 'Teleport & Suspense',
    mnemonic: {
      association: 'Teleport & Suspense are like having DOCTOR STRANGE\'S PORTAL MAGIC! 🌀',
      visualStory: 'You\'ve mastered the mystic arts! Teleport is your SLING RING that creates instant portals - you can grab any component from deep inside your app and teleport it anywhere else (like modals appearing at the document root). Suspense is your TIME STONE that can freeze time while async components are loading, showing a beautiful loading screen until they\'re ready to appear!',
      memoryTrigger: 'TELEPORT = "Time Everywhere, Locations Easily Portaled, Opens Reality Together!" 🔮',
      funnyFact: 'Unlike Doctor Strange, your portals never accidentally open to dangerous dimensions - just to different DOM locations!',
      animation: 'mystic-portals'
    },
    description: 'Your mystic arts for teleporting components and controlling time',
    icon: '🌀',
    color: '#C7CEEA',
    examples: [
      'Teleport - Sling ring portals for component transportation',
      'Suspense - Time stone for handling async loading states',
      'Error boundaries - Protective shields against component crashes',
      'Async components - Components that arrive through time portals'
    ]
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    mnemonic: {
      association: 'Performance Optimization is like being a FORMULA 1 RACE CAR ENGINEER! 🏎️',
      visualStory: 'Your Vue app is a race car, and you\'re the pit crew chief! You\'re constantly tuning the engine (lazy loading), reducing weight (bundle splitting), improving aerodynamics (virtual scrolling), and making pit stops (memoization) to keep your car running at MAXIMUM SPEED! You have high-tech diagnostic tools (performance profilers) that show you exactly where your car is losing speed so you can fix it instantly!',
      memoryTrigger: 'PERFORMANCE = "Perfectly Engineered Race For Outstanding Results, Making Apps Navigate Crazy Extremely fast!" 🏁',
      funnyFact: 'Unlike real Formula 1, your optimizations never cause spectacular crashes - just spectacular speed improvements!',
      animation: 'formula1-pit-stop'
    },
    description: 'Your Formula 1 pit crew for making your Vue app lightning fast',
    icon: '🚀',
    color: '#FFD93D',
    examples: [
      'Lazy loading - Installing turbo engines only when needed',
      'Virtual scrolling - Aerodynamic improvements for long lists',
      'Memoization - Pit stop strategies for computed values',
      'Bundle splitting - Reducing car weight for better performance'
    ]
  },
  {
    id: 'state-management',
    title: 'State Management',
    mnemonic: {
      association: 'State Management is like being the MANAGER of a MAGICAL BANK! 🏦',
      visualStory: 'You run the most advanced bank in the magical world! Instead of storing gold coins, you store APPLICATION STATE (data that all components need to share). Pinia stores are like MAGICAL SAFETY DEPOSIT BOXES that any component can access with the right key. Actions are like BANK TELLERS who handle all the transactions, and getters are like FINANCIAL ADVISORS who give you calculated information about your stored data!',
      memoryTrigger: 'STATE = "Storing Treasures Always Together, Everyone!" 💰',
      funnyFact: 'Unlike real banks, your magical bank never has long lines, never closes, and never charges fees!',
      animation: 'magical-bank-manager'
    },
    description: 'Your magical bank for storing and managing shared application treasure',
    icon: '🏪',
    color: '#FF8B94',
    examples: [
      'Pinia stores - Magical safety deposit boxes for shared data',
      'Actions - Bank tellers handling all data transactions',
      'Getters - Financial advisors calculating derived information',
      'State persistence - Magical vaults that remember everything'
    ]
  },
  {
    id: 'testing',
    title: 'Testing Vue Components',
    mnemonic: {
      association: 'Testing is like being a DETECTIVE investigating COMPONENT CRIMES! 🕵️‍♂️',
      visualStory: 'You\'re Sherlock Holmes, but instead of solving murders, you\'re solving BUG MYSTERIES! Every component is a suspect, and you need to interrogate them thoroughly. Vue Test Utils is your MAGNIFYING GLASS for examining components closely. Jest/Vitest are your FORENSIC LAB EQUIPMENT for running experiments. You create crime scene scenarios (test cases) to see if components behave suspiciously under pressure!',
      memoryTrigger: 'TESTING = "Thoroughly Examining Suspicious Things, Investigating Nasty Glitches!" 🔍',
      funnyFact: 'Unlike real detectives, you WANT to find crimes (bugs) because that means you can fix them and make everything better!',
      animation: 'detective-investigation'
    },
    description: 'Your detective toolkit for investigating and solving component mysteries',
    icon: '🧪',
    color: '#6BCF7F',
    examples: [
      'Vue Test Utils - Magnifying glass for component examination',
      'Jest/Vitest - Forensic lab equipment for running experiments',
      'User interaction testing - Interrogating components under pressure',
      'E2E testing - Following the complete crime story from start to finish'
    ]
  },
  {
    id: 'typescript-integration',
    title: 'TypeScript Integration',
    mnemonic: {
      association: 'TypeScript is like having a PERSONAL GRAMMAR TEACHER for your code! 👩‍🏫',
      visualStory: 'Meet Ms. TypeScript, the strictest but most helpful teacher ever! She checks EVERY SINGLE LINE of your code with a red pen, making sure you\'re using the right data types. "This should be a string, not a number!" she says, circling mistakes before they become problems. She\'s like having spell-check, but for code logic. Sometimes she\'s annoying, but she prevents you from making embarrassing mistakes in front of the whole class (production environment)!',
      memoryTrigger: 'TYPESCRIPT = "Teacher Yells Politely, Everyone Stops Creating Really Incorrect Programming Troubles!" 📚',
      funnyFact: 'Unlike real teachers, Ms. TypeScript never gets tired of correcting the same mistake over and over again!',
      animation: 'strict-grammar-teacher'
    },
    description: 'Your personal grammar teacher ensuring your code speaks perfect Vue',
    icon: '🔷',
    color: '#4ECDC4',
    examples: [
      'Type definitions - Grammar rules for your Vue components',
      'Props typing - Making sure parent-child conversations make sense',
      'Composable types - Ensuring your reusable logic speaks clearly',
      'Generic components - Teaching components to be multilingual'
    ]
  },
  {
    id: 'routing',
    title: 'Vue Router',
    mnemonic: {
      association: 'Vue Router is like being a MAGICAL GPS NAVIGATOR! 🧭',
      visualStory: 'You\'re driving a magical car through the Internet Highway, and Vue Router is your super-intelligent GPS! It knows EVERY POSSIBLE ROUTE in your application universe. Navigation guards are like MAGICAL TOLL BOOTHS that check if you have permission to enter certain areas. Dynamic routes are like SHAPE-SHIFTING ROADS that change based on what you\'re looking for. Route transitions are like TELEPORTATION EFFECTS between destinations!',
      memoryTrigger: 'ROUTER = "Really Outstanding Universal Travel, Everyone Reaches destinations!" 🗺️',
      funnyFact: 'Unlike real GPS, Vue Router never says "Recalculating..." in that annoying voice, and it never gets you lost!',
      animation: 'magical-gps-navigator'
    },
    description: 'Your magical GPS for navigating through your Vue application universe',
    icon: '🛣️',
    color: '#FECA57',
    examples: [
      'Route configuration - Programming your magical GPS with destinations',
      'Navigation guards - Magical toll booths checking permissions',
      'Dynamic routes - Shape-shifting roads that adapt to your needs',
      'Route transitions - Teleportation effects between pages'
    ]
  },
  {
    id: 'ssr-ssg',
    title: 'SSR & Static Generation',
    mnemonic: {
      association: 'SSR & SSG are like having a MAGICAL PRINTING PRESS! 📰',
      visualStory: 'You run a magical newspaper company! SSR (Server-Side Rendering) is like having SUPER-FAST PRINTING PRESSES that create fresh newspapers (HTML pages) the moment someone asks for them. SSG (Static Site Generation) is like printing MILLIONS OF NEWSPAPERS in advance and storing them in magical warehouses, ready to be delivered instantly. Hydration is the magical process where your printed newspaper comes to life and becomes interactive!',
      memoryTrigger: 'SSR = "Super Speedy Rendering!" and SSG = "Super Smart Generation!" 🏭',
      funnyFact: 'Unlike real printing presses, these magical ones never run out of ink, never jam, and can print at the speed of light!',
      animation: 'magical-printing-press'
    },
    description: 'Your magical printing press for creating lightning-fast web pages',
    icon: '🌐',
    color: '#FF6B6B',
    examples: [
      'Server-side rendering - Super-fast printing presses for fresh pages',
      'Static generation - Pre-printed newspapers stored in magical warehouses',
      'Hydration - Bringing printed pages to life with interactivity',
      'SEO optimization - Making sure search engines can read your newspapers'
    ]
  },
  {
    id: 'build-tools',
    title: 'Build Tools & Tooling',
    mnemonic: {
      association: 'Build Tools are like having a MAGICAL CONSTRUCTION CREW! 👷‍♂️',
      visualStory: 'You\'re the foreman of the most efficient construction crew ever! Vite is your SUPER-POWERED CRANE that can lift and move code faster than lightning. Webpack is your MASTER BUILDER who knows exactly how to put all the pieces together. ESLint is your QUALITY INSPECTOR who checks that everything meets building codes. The DevTools are your X-RAY VISION GOGGLES that let you see inside walls to debug problems!',
      memoryTrigger: 'BUILD = "Bringing Unbelievable Infrastructure, Lightning Development!" 🏗️',
      funnyFact: 'Unlike real construction crews, these magical workers never take coffee breaks, never complain about the weather, and work 24/7!',
      animation: 'magical-construction-crew'
    },
    description: 'Your magical construction crew for building amazing Vue applications',
    icon: '🔧',
    color: '#A8E6CF',
    examples: [
      'Vite - Super-powered crane for lightning-fast development',
      'Webpack - Master builder assembling all your code pieces',
      'ESLint - Quality inspector ensuring code meets standards',
      'DevTools - X-ray vision goggles for debugging problems'
    ]
  },
  {
    id: 'plugins-ecosystem',
    title: 'Plugins & Ecosystem',
    mnemonic: {
      association: 'Plugins & Ecosystem are like running a MAGICAL APP STORE! 📱',
      visualStory: 'You\'re the CEO of the most amazing app store in the magical world! Instead of downloading apps for your phone, developers download MAGICAL PLUGINS for their Vue applications. UI component libraries are like THEME PACKS that completely change how your app looks. Utility libraries are like POWER-UP PACKS that give your app new superpowers. You\'re constantly discovering new magical plugins created by wizard developers around the world!',
      memoryTrigger: 'PLUGINS = "Perfectly Lovely Utilities, Giving Incredible New Superpowers!" 🔌',
      funnyFact: 'Unlike real app stores, these magical plugins never have in-app purchases, never show ads, and are usually free!',
      animation: 'magical-app-store'
    },
    description: 'Your magical app store for discovering and installing Vue superpowers',
    icon: '🔌',
    color: '#C7CEEA',
    examples: [
      'Vue plugins - Magical app downloads for new capabilities',
      'UI libraries - Theme packs that transform your app\'s appearance',
      'Utility libraries - Power-up packs with new superpowers',
      'Third-party integrations - Magical bridges to other worlds'
    ]
  },
  {
    id: 'micro-frontends',
    title: 'Micro-Frontends',
    mnemonic: {
      association: 'Micro-Frontends are like managing a MAGICAL CITY of INDEPENDENT KINGDOMS! 🏰',
      visualStory: 'You\'re the mayor of a magical city where each neighborhood (micro-frontend) is ruled by a different king, but they all work together harmoniously! Each kingdom has its own army (development team), its own treasury (dependencies), and its own laws (codebase), but they share the same magical communication network. Module federation is like having MAGICAL BRIDGES that connect the kingdoms, allowing them to share resources and communicate instantly!',
      memoryTrigger: 'MICRO = "Magical Independent Cities, Really Outstanding!" 🌆',
      funnyFact: 'Unlike real kingdoms, these magical ones never go to war - they always cooperate and share their treasures!',
      animation: 'magical-city-kingdoms'
    },
    description: 'Your magical city management system for coordinating independent frontend kingdoms',
    icon: '🏗️',
    color: '#FFD93D',
    examples: [
      'Module federation - Magical bridges connecting independent kingdoms',
      'Single-spa - The royal council coordinating all kingdoms',
      'Micro-frontend communication - Magical messenger network between kingdoms',
      'Shared dependencies - Common treasures all kingdoms can use'
    ]
  }
];

// Enhanced tutorial sections with mnemonic learning techniques
export const MNEMONIC_TUTORIAL_SECTIONS = [
  {
    id: 'components-templates',
    title: 'Dancing LEGO Blocks & Magic Recipe Cards',
    mnemonic: {
      storyTitle: 'The Great LEGO Dance-Off in the Magic Kitchen',
      mainStory: `
        Once upon a time, in a magical kitchen far, far away, there lived dancing LEGO blocks who were also master chefs! 
        
        These weren't ordinary LEGO blocks - oh no! Each block wore tiny chef hats and could dance the robot while cooking. 
        The head chef (that's you!) discovered that by combining these dancing blocks with magic recipe cards, 
        they could create the most amazing websites the world had ever seen!
        
        The secret was in the {{ magic brackets }} - whenever you wrote something inside these mystical symbols, 
        the recipe card would summon real ingredients from thin air! "{{ userName }}" would summon a person's name, 
        "{{ greeting }}" would conjure up a friendly hello!
      `,
      visualMnemonic: 'LEGO blocks doing the robot dance while wearing chef hats and reading glowing recipe cards',
      memoryPalace: 'Kitchen with dancing LEGO blocks as chefs',
      memoryTrigger: 'COMP-O-NENT = "Come On, Neon Tiny Dancers!" 💃',
      animation: 'lego-chef-dance-party'
    },
    description: 'Learn how dancing LEGO blocks (components) use magic recipe cards (templates) to build amazing websites',
    icon: '🧩',
    color: '#FF6B6B',
    estimatedTime: '15 min',
    difficulty: 'Beginner',
    content: {
      theory: `
        Imagine you're running a magical restaurant where the chefs are dancing LEGO blocks! 
        Each LEGO block chef has their own specialty and can work independently or as part of a team.
        
        The magic recipe cards (templates) tell these LEGO chefs exactly what to cook and how to present it.
        When a customer (user) walks in, the LEGO chefs read their recipe cards and create a perfect meal (webpage)!
        
        The {{ }} brackets are like magic spell words that make ingredients appear instantly!
      `,
      keyPoints: [
        '🧩 Components are dancing LEGO block chefs - each has a special job',
        '📜 Templates are magic recipe cards with {{ }} summoning spells',
        '✨ Directives (v-if, v-for) are kitchen magic spells for special effects',
        '🎭 Single File Components combine the chef, recipe, and presentation style'
      ],
      practiceTask: 'Create your own dancing LEGO block chef that can greet customers with magic recipe cards',
      mnemonicTips: [
        'Remember: COMP-O-NENT = "Come On, Neon Tiny Dancers!"',
        'TEMP-LATE = "Temporary Plate for Cooking Code!"',
        'When you see {{ }}, think "Magic Ingredient Summoning Brackets!"'
      ]
    }
  },
  {
    id: 'reactivity-data',
    title: 'Psychic Mirrors & Mind-Reading Assistants',
    mnemonic: {
      storyTitle: 'The Psychic Mirror Academy for Mind-Reading Assistants',
      mainStory: `
        Welcome to the most exclusive academy in the digital world - The Psychic Mirror Academy! 
        
        Here, magical mirrors learn to read minds and predict the future. Each mirror has a personal 
        mind-reading assistant (that's ref() and reactive()!) who can sense even the tiniest thought changes.
        
        When you think "I want the counter to be 5," your psychic assistant immediately whispers to the mirror, 
        and POOF! The reflection changes instantly. It's like having a personal genie, but instead of three wishes, 
        you get unlimited data updates!
        
        The really cool part? These mirrors are so smart, they only update the parts that actually changed. 
        If you change your shirt color in the reflection, the mirror won't redraw your entire body - 
        just the shirt! Efficiency at its finest!
      `,
      visualMnemonic: 'Glowing mirrors with tiny floating assistants reading thought bubbles',
      memoryPalace: 'Academy filled with psychic mirrors and floating assistants',
      memoryTrigger: 'RE-ACTIVE = "Really Excited About Changes, Totally Instant!" ⚡',
      animation: 'psychic-mirror-academy'
    },
    description: 'Master the art of psychic mirrors and mind-reading assistants for instant data updates',
    icon: '🔮',
    color: '#45B7D1',
    estimatedTime: '20 min',
    difficulty: 'Beginner',
    content: {
      theory: `
        In the Psychic Mirror Academy, you learn that reactivity is like having a team of mind-reading assistants 
        who are obsessed with keeping your mirrors perfectly up-to-date.
        
        ref() creates a personal assistant for simple values (numbers, strings, booleans)
        reactive() creates a team manager for complex objects with multiple properties
        
        These assistants are so dedicated, they work 24/7 monitoring your data for any changes!
      `,
      keyPoints: [
        '🔮 ref() creates a personal mind-reading assistant for simple values',
        '👥 reactive() creates a team of assistants for complex objects',
        '📡 Computed properties are crystal ball predictions based on your data',
        '👀 Watchers are stalker mirrors (but helpful ones!) that react to changes'
      ],
      practiceTask: 'Train your own psychic mirror to read minds and update a magical counter',
      mnemonicTips: [
        'Remember: RE-ACTIVE = "Really Excited About Changes, Totally Instant!"',
        'ref() = "Personal Assistant for Simple Stuff"',
        'reactive() = "Team Manager for Complex Objects"'
      ]
    }
  },
  {
    id: 'composition-api-deep',
    title: 'Mad Scientist Laboratory Adventures',
    mnemonic: {
      storyTitle: 'Dr. Vue\'s Secret Potion Laboratory',
      mainStory: `
        Deep in the mountains, Dr. Vue runs the most advanced potion laboratory in the coding world! 
        
        Instead of creating love potions or invisibility elixirs, Dr. Vue creates FUNCTION POTIONS! 
        Each test tube contains a different magical ability: user authentication, data fetching, 
        form validation, or animation controls.
        
        The genius of Dr. Vue's laboratory is that you can mix and match these potions in any combination! 
        Need a user dashboard? Mix the authentication potion with the data fetching potion! 
        Want a contact form? Combine validation potion with notification potion!
        
        The setup() function is your main workbench where all the potion mixing happens. 
        It's like having a chemistry set, but instead of explosions, you get amazing web applications!
      `,
      visualMnemonic: 'Mad scientist laboratory with glowing test tubes and bubbling potions',
      memoryPalace: 'Mountain laboratory with Dr. Vue mixing colorful function potions',
      memoryTrigger: 'COMP-OSITION = "Combining Magical Potions, Obviously Super Intelligent!" 🧬',
      animation: 'mad-scientist-laboratory'
    },
    description: 'Master the art of potion mixing in Dr. Vue\'s laboratory with the Composition API',
    icon: '🧪',
    color: '#96CEB4',
    estimatedTime: '25 min',
    difficulty: 'Intermediate',
    content: {
      theory: `
        The Composition API is like being a mad scientist with access to the most advanced laboratory equipment. 
        Instead of mixing random chemicals, you're mixing logical functions that solve real problems.
        
        Composables are your reusable potions - create them once, use them everywhere! 
        The setup() function is your main workbench where all the magic happens.
        
        Think of it as upgrading from a toy chemistry set to a professional laboratory!
      `,
      keyPoints: [
        '🧪 setup() function is your main laboratory workbench',
        '🧬 Composables are reusable magic potions in test tubes',
        '🔬 Better logic organization than the Options API',
        '🛡️ Enhanced TypeScript support for safer experiments'
      ],
      practiceTask: 'Create your own composable potion that manages user preferences',
      mnemonicTips: [
        'COMP-OSITION = "Combining Magical Potions, Obviously Super!"',
        'setup() = "Setting Up Potion workbench"',
        'Composables = "Reusable Magic in Test Tubes"'
      ]
    }
  },
  {
    id: 'event-handling',
    title: 'Telephone Operators & Message Delivery Service',
    mnemonic: {
      storyTitle: 'The Cosmic Communication Center',
      mainStory: `
        Welcome to the Cosmic Communication Center, where telephone operators with superpowers 
        handle millions of conversations between users and websites!
        
        These aren't ordinary telephone operators - they're COSMIC BEINGS who can instantly 
        transport messages across the digital universe! When a user clicks a button, 
        the operator immediately shouts "CLICK MESSAGE INCOMING!" and delivers it 
        to the right component faster than light speed.
        
        Each operator specializes in different types of messages: Click Operator handles clicks, 
        Keyboard Operator manages typing, Mouse Operator tracks movements, and Form Operator 
        deals with submissions. They work together like a perfectly synchronized cosmic orchestra!
        
        The @ symbol is their cosmic telephone - @click means "Call the Click Operator," 
        @keyup means "Get the Keyboard Operator on the line!"
      `,
      visualMnemonic: 'Cosmic telephone operators with headsets floating in space handling glowing messages',
      memoryPalace: 'Space station communication center with operators at cosmic switchboards',
      memoryTrigger: 'EVENT = "Everyone\'s Very Efficient at Notification Transmission!" 📞',
      animation: 'cosmic-communication-center'
    },
    description: 'Learn how cosmic telephone operators handle all communication between users and your app',
    icon: '📞',
    color: '#F59E0B',
    estimatedTime: '18 min',
    difficulty: 'Beginner',
    content: {
      theory: `
        Event handling in Vue is like running a cosmic communication center where specialized operators 
        handle different types of user interactions. Each operator knows exactly what to do when 
        they receive their specific type of message.
        
        The @ symbol is your direct line to these operators. @click connects you to the Click Operator, 
        @input connects you to the Input Operator, and so on. They're standing by 24/7 to handle 
        any user interaction instantly!
      `,
      keyPoints: [
        '📞 @ symbol is your cosmic telephone to event operators',
        '👆 @click operator handles all clicking communications',
        '⌨️ @keyup/@keydown operators manage keyboard messages',
        '📝 @submit operator specializes in form submissions',
        '🎯 Event modifiers are special operator instructions (.prevent, .stop)'
      ],
      practiceTask: 'Set up your own communication center with different operators handling various user interactions',
      mnemonicTips: [
        'EVENT = "Everyone\'s Very Efficient at Notification Transmission!"',
        '@ = "Cosmic Telephone Symbol"',
        'Operators = "Specialized Message Delivery Experts"'
      ]
    }
  },
  {
    id: 'directives-lifecycle',
    title: 'Magic Wands & Component Life Stories',
    mnemonic: {
      storyTitle: 'The Wizard Academy of Living Components',
      mainStory: `
        In the mystical Wizard Academy, every student gets a set of MAGIC WANDS (directives) 
        and learns about the Circle of Component Life!
        
        The magic wands each have special powers: v-if can make things appear and disappear 
        like an invisibility cloak, v-for can duplicate anything like a copy spell, 
        v-show can hide things without destroying them (like a camouflage spell), 
        and v-model creates a telepathic link between inputs and data!
        
        But here's the really magical part - every component in the academy has a LIFE STORY! 
        They're born (mounted), they live their life (updated), and eventually they graduate (unmounted). 
        Just like Harry Potter going through different years at Hogwarts, components go through 
        different lifecycle phases, and you can cast spells at each phase!
        
        onMounted() is like the Sorting Hat ceremony, onUpdated() is like getting new spells each year, 
        and onUnmounted() is like graduation day!
      `,
      visualMnemonic: 'Wizard academy with students waving glowing wands at floating components with life auras',
      memoryPalace: 'Hogwarts-like academy with component lifecycle ceremonies and magic wand lessons',
      memoryTrigger: 'DIRECTIVE = "Definitely Incredible Wizardry, Everyone Casting Tremendous Spells!" ⚡',
      animation: 'wizard-academy-magic'
    },
    description: 'Master the magic wands (directives) and learn the life stories of components',
    icon: '⚡',
    color: '#8B5CF6',
    estimatedTime: '22 min',
    difficulty: 'Intermediate',
    content: {
      theory: `
        Directives are like magic wands that give you superpowers to control your templates. 
        Each directive has a specific magical ability that helps you create dynamic, interactive interfaces.
        
        Component lifecycle is like the life story of every component - from birth to death, 
        with important milestones where you can perform specific actions. Understanding these 
        lifecycle phases helps you create more efficient and powerful applications.
      `,
      keyPoints: [
        '⚡ v-if/v-else are invisibility cloaks (add/remove from DOM)',
        '🔄 v-for is the duplication spell for lists and arrays',
        '👻 v-show is the camouflage spell (hide/show with CSS)',
        '🔗 v-model creates telepathic links between inputs and data',
        '🌱 onMounted() is the birth ceremony of components',
        '🔄 onUpdated() happens when components learn new things',
        '👋 onUnmounted() is the graduation ceremony'
      ],
      practiceTask: 'Create a magical component that uses different wands and goes through all lifecycle phases',
      mnemonicTips: [
        'DIRECTIVE = "Definitely Incredible Wizardry, Everyone Casting Spells!"',
        'v-if = "Vanishing Items, Invisible Forever"',
        'v-for = "Very Fantastic Object Replication"',
        'Lifecycle = "Life In Components, Years & Ceremonies, Life Events"'
      ]
    }
  },
  {
    id: 'advanced-patterns',
    title: 'Superhero Team Assembly & Master Strategies',
    mnemonic: {
      storyTitle: 'The Avengers Academy for Advanced Vue Techniques',
      mainStory: `
        Welcome to the most elite academy in the Vue universe - The Avengers Academy! 
        Here, ordinary components transform into SUPERHEROES with incredible powers!
        
        Provide/Inject is like Professor X's telepathic network - parent components can 
        broadcast thoughts directly to any descendant, no matter how deep they are nested. 
        No more prop drilling through 10 levels of components!
        
        Slots are like Iron Man's modular armor system - you create the main structure, 
        but different parts can be swapped out for different missions. Named slots are 
        like having different armor pieces for arms, legs, and chest!
        
        Teleport is Doctor Strange's portal magic - you can instantly transport content 
        from one place in your component tree to anywhere else in the DOM! Perfect for 
        modals, tooltips, and notifications.
        
        Custom directives are like creating your own superpowers - want a directive that 
        makes elements glow when hovered? You can build it!
      `,
      visualMnemonic: 'Superhero academy with components wearing capes and using advanced powers',
      memoryPalace: 'Avengers-style academy with advanced training facilities and superhero components',
      memoryTrigger: 'ADVANCED = "Absolutely Decisive Victory, All New Coding Excellence, Definitely!" 🦸‍♂️',
      animation: 'superhero-academy-training'
    },
    description: 'Join the Avengers Academy and master the most advanced Vue 3 patterns and techniques',
    icon: '🦸‍♂️',
    color: '#EF4444',
    estimatedTime: '30 min',
    difficulty: 'Advanced',
    content: {
      theory: `
        Advanced Vue patterns are like superhero abilities - they give you incredible power 
        to solve complex problems elegantly. These patterns are the difference between 
        a simple website and a sophisticated application.
        
        Master these techniques and you'll be able to build applications that are 
        maintainable, scalable, and incredibly powerful!
      `,
      keyPoints: [
        '🧠 Provide/Inject creates telepathic communication across component levels',
        '🔧 Slots are modular armor systems for flexible component design',
        '🌀 Teleport is portal magic for DOM manipulation',
        '⚡ Custom directives let you create your own superpowers',
        '🏗️ Render functions give you direct control over the virtual DOM',
        '🎭 Dynamic components can shapeshift into different forms',
        '🔌 Plugin system lets you extend Vue with custom abilities'
      ],
      practiceTask: 'Build a superhero component system using provide/inject, slots, and custom directives',
      mnemonicTips: [
        'ADVANCED = "Absolutely Decisive Victory, All New Coding Excellence!"',
        'Provide/Inject = "Professor X\'s Telepathic Network"',
        'Slots = "Iron Man\'s Modular Armor System"',
        'Teleport = "Doctor Strange\'s Portal Magic"'
      ]
    }
  }
];

// Mnemonic learning techniques and memory palace data
export const MEMORY_TECHNIQUES = {
  visualAssociations: {
    components: {
      image: 'Dancing LEGO blocks with sunglasses and chef hats',
      action: 'Robot dancing while building websites',
      emotion: 'Joy and excitement from the dance party',
      location: 'Magical disco kitchen'
    },
    templates: {
      image: 'Wizard chef with a glowing recipe book',
      action: 'Casting spells with {{ }} magic brackets',
      emotion: 'Wonder and amazement at the magic',
      location: 'Enchanted kitchen laboratory'
    },
    reactivity: {
      image: 'Psychic mirror with floating assistants',
      action: 'Mind-reading and instant reflection updates',
      emotion: 'Surprise and delight at the psychic abilities',
      location: 'Academy of Psychic Mirrors'
    },
    compositionApi: {
      image: 'Mad scientist with wild hair and colorful potions',
      action: 'Mixing bubbling potions in test tubes',
      emotion: 'Excitement and curiosity about experiments',
      location: 'Mountain-top laboratory with lightning'
    }
  },
  
  memoryPalaceRooms: [
    {
      id: 'entrance',
      name: 'The Magical Entrance Hall',
      description: 'Where dancing LEGO blocks greet you with robot moves',
      concepts: ['components', 'basic-structure']
    },
    {
      id: 'kitchen',
      name: 'The Enchanted Kitchen',
      description: 'Where magic recipe cards cook up templates',
      concepts: ['templates', 'directives', 'interpolation']
    },
    {
      id: 'mirror-room',
      name: 'The Psychic Mirror Academy',
      description: 'Where mind-reading assistants practice reactivity',
      concepts: ['reactivity', 'refs', 'computed', 'watchers']
    },
    {
      id: 'laboratory',
      name: 'Dr. Vue\'s Mad Laboratory',
      description: 'Where function potions are mixed and tested',
      concepts: ['composition-api', 'composables', 'setup']
    }
  ],
  
  mnemonicTriggers: {
    components: 'COMP-O-NENTS = "Come On, Neon Tiny Dancers!"',
    templates: 'TEMP-LATE = "Temporary Plate for Cooking Code!"',
    reactivity: 'RE-ACTIVE = "Really Excited About Changes, Totally Instant!"',
    compositionApi: 'COMP-OSITION = "Combining Magical Potions, Obviously Super Intelligent!"'
  }
};

// Animation configurations for visual mnemonics
export const ANIMATION_CONFIGS = {
  'bouncing-lego-blocks': {
    duration: 2000,
    iterations: 'infinite',
    keyframes: [
      { transform: 'translateY(0px) rotate(0deg)', backgroundColor: '#FF6B6B' },
      { transform: 'translateY(-20px) rotate(180deg)', backgroundColor: '#4ECDC4' },
      { transform: 'translateY(0px) rotate(360deg)', backgroundColor: '#45B7D1' }
    ]
  },
  
  'cooking-magic-chef': {
    duration: 3000,
    iterations: 'infinite',
    keyframes: [
      { transform: 'scale(1) rotate(0deg)', filter: 'hue-rotate(0deg)' },
      { transform: 'scale(1.1) rotate(5deg)', filter: 'hue-rotate(90deg)' },
      { transform: 'scale(1.05) rotate(-5deg)', filter: 'hue-rotate(180deg)' },
      { transform: 'scale(1) rotate(0deg)', filter: 'hue-rotate(360deg)' }
    ]
  },
  
  'psychic-mirror-magic': {
    duration: 2500,
    iterations: 'infinite',
    keyframes: [
      { transform: 'scale(1)', boxShadow: '0 0 20px rgba(69, 183, 209, 0.5)' },
      { transform: 'scale(1.02)', boxShadow: '0 0 40px rgba(69, 183, 209, 0.8)' },
      { transform: 'scale(1)', boxShadow: '0 0 20px rgba(69, 183, 209, 0.5)' }
    ]
  },
  
  'mad-scientist-laboratory': {
    duration: 4000,
    iterations: 'infinite',
    keyframes: [
      { transform: 'translateY(0px)', filter: 'hue-rotate(0deg) brightness(1)' },
      { transform: 'translateY(-5px)', filter: 'hue-rotate(120deg) brightness(1.2)' },
      { transform: 'translateY(0px)', filter: 'hue-rotate(240deg) brightness(1.1)' },
      { transform: 'translateY(-3px)', filter: 'hue-rotate(360deg) brightness(1)' }
    ]
  }
};

// Fun facts and jokes to make learning memorable
export const FUN_FACTS = [
  {
    concept: 'components',
    fact: 'Just like how you can\'t eat a LEGO sandwich (please don\'t try), you can\'t build a website without components!',
    joke: 'Why did the Vue component go to therapy? Because it had too many props and needed to learn about boundaries!'
  },
  {
    concept: 'templates',
    fact: 'Unlike real cooking, if you mess up a template, your kitchen won\'t explode... probably.',
    joke: 'What do you call a template that\'s always hungry? A {{ munchies }} template!'
  },
  {
    concept: 'reactivity',
    fact: 'Vue\'s reactivity is faster than your reaction to someone eating your leftover pizza!',
    joke: 'Why don\'t reactive variables ever get lonely? Because they\'re always watching each other!'
  },
  {
    concept: 'composition-api',
    fact: 'Unlike real mad scientists, your creations will help people instead of taking over the world... hopefully.',
    joke: 'What\'s a composable\'s favorite type of music? Function-al music, of course!'
  }
];

// Enhanced tutorial sections with complete mnemonic data
export const TUTORIAL_SECTIONS = MNEMONIC_TUTORIAL_SECTIONS.map(section => ({
  ...section,
  // Add missing properties that the InteractiveTutorial expects
  content: {
    ...section.content,
    codeExample: getCodeExampleForSection(section.id)
  }
}));

// Code examples for each tutorial section
function getCodeExampleForSection(sectionId) {
  const codeExamples = {
    'components-templates': `<!-- Dancing LEGO Block Component -->
<template>
  <div class="lego-block" :class="blockColor">
    <div class="lego-face">
      <div class="sunglasses">🕶️</div>
      <div class="block-emoji">{{ emoji }}</div>
    </div>
    <h3>{{ blockName }}</h3>
    <p>{{ danceMove }}</p>
    <button @click="startDancing">
      {{ isDancing ? 'Stop Dancing 🛑' : 'Start Dancing! 💃' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props - Dance instructions from parent component
const props = defineProps({
  blockName: { type: String, default: 'Disco Dancer' },
  blockColor: { type: String, default: 'red' },
  emoji: { type: String, default: '🎵' },
  danceMove: { type: String, default: 'Robot Dance' }
})

// Reactive state - Dancing status
const isDancing = ref(false)

// Methods - Dance functionality
const startDancing = () => {
  isDancing.value = !isDancing.value
  console.log(\`\${props.blockName} is \${isDancing.value ? 'dancing' : 'stopped'}!\`)
}
</script>`,

    'reactivity-data': `<!-- Psychic Mirror Component -->
<template>
  <div class="psychic-mirror">
    <div class="mirror-frame">
      <div class="mirror-surface" :class="{ glowing: isActive }">
        <h3>🔮 Psychic Mirror</h3>
        
        <!-- Reactive data display -->
        <div class="mirror-content">
          <p>Your thought: {{ userThought }}</p>
          <p>Mirror says: {{ mirrorResponse }}</p>
          <p>Thought count: {{ thoughtCount }}</p>
        </div>
        
        <!-- Mind-reading controls -->
        <div class="mirror-controls">
          <input 
            v-model="userThought" 
            placeholder="Think something..."
            class="thought-input"
          />
          <button @click="addThought" class="mirror-button">
            Send Thought 🧠
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Reactive state - Mind-reading assistants at work!
const userThought = ref('')
const thoughts = ref([])
const isActive = ref(false)

// Computed property - Crystal ball prediction
const thoughtCount = computed(() => thoughts.value.length)

const mirrorResponse = computed(() => {
  if (!userThought.value) return 'The mirror awaits your thoughts...'
  return \`I sense you're thinking about: "\${userThought.value}"\`
})

// Watcher - Stalker mirror (but helpful!)
watch(userThought, (newThought) => {
  isActive.value = newThought.length > 0
})

// Methods
const addThought = () => {
  if (userThought.value.trim()) {
    thoughts.value.push(userThought.value)
    userThought.value = ''
  }
}
</script>`,

    'composition-api-deep': `<!-- Mad Scientist Laboratory -->
<template>
  <div class="laboratory">
    <div class="lab-header">
      <h3>🧪 Dr. Vue's Laboratory</h3>
      <p>Mixing function potions since 2020!</p>
    </div>
    
    <div class="lab-workbench">
      <!-- User preferences potion -->
      <div class="potion-container">
        <h4>🧬 User Preferences Potion</h4>
        <div class="potion-display">
          <p>Theme: {{ preferences.theme }}</p>
          <p>Language: {{ preferences.language }}</p>
          <p>Notifications: {{ preferences.notifications ? 'On' : 'Off' }}</p>
        </div>
        
        <div class="potion-controls">
          <select v-model="preferences.theme">
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
            <option value="auto">Auto Mode</option>
          </select>
          
          <button @click="toggleNotifications">
            {{ preferences.notifications ? 'Disable' : 'Enable' }} Notifications
          </button>
        </div>
      </div>
      
      <!-- Data fetching potion -->
      <div class="potion-container">
        <h4>📡 Data Fetching Potion</h4>
        <div class="potion-display">
          <p>Status: {{ dataState.loading ? 'Brewing...' : 'Ready' }}</p>
          <p>Users loaded: {{ dataState.users.length }}</p>
        </div>
        
        <button @click="fetchUsers" :disabled="dataState.loading">
          {{ dataState.loading ? 'Brewing Potion...' : 'Fetch Users' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import our custom composable potions
import { useUserPreferences } from './composables/useUserPreferences'
import { useDataFetcher } from './composables/useDataFetcher'

// Mix the potions in our laboratory (setup function)
const { preferences, toggleNotifications, savePreferences } = useUserPreferences()
const { dataState, fetchUsers } = useDataFetcher()

// The laboratory is now ready with mixed potions!
console.log('🧪 Laboratory setup complete! Potions are ready to use.')
</script>`,

    'event-handling': `<!-- Cosmic Communication Center -->
<template>
  <div class="communication-center">
    <div class="center-header">
      <h3>📞 Cosmic Communication Center</h3>
      <p>Operators standing by 24/7!</p>
    </div>
    
    <div class="operator-stations">
      <!-- Click Operator Station -->
      <div class="operator-station">
        <h4>👆 Click Operator</h4>
        <button 
          @click="handleClick"
          class="cosmic-button"
        >
          Send Click Message
        </button>
        <p>Messages received: {{ clickCount }}</p>
      </div>
      
      <!-- Keyboard Operator Station -->
      <div class="operator-station">
        <h4>⌨️ Keyboard Operator</h4>
        <input 
          @keyup.enter="handleKeyMessage"
          @keyup="trackKeystrokes"
          v-model="keyboardMessage"
          placeholder="Type and press Enter..."
          class="cosmic-input"
        />
        <p>Keystrokes: {{ keystrokeCount }}</p>
      </div>
      
      <!-- Form Operator Station -->
      <div class="operator-station">
        <h4>📝 Form Operator</h4>
        <form @submit.prevent="handleFormSubmission">
          <input 
            v-model="formData.name" 
            placeholder="Your name"
            class="cosmic-input"
          />
          <button type="submit" class="cosmic-button">
            Submit to Form Operator
          </button>
        </form>
        <p v-if="formSubmitted">Form processed by operator!</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Communication center state
const clickCount = ref(0)
const keystrokeCount = ref(0)
const keyboardMessage = ref('')
const formSubmitted = ref(false)
const formData = reactive({
  name: ''
})

// Operator methods - Each handles different types of cosmic messages
const handleClick = () => {
  clickCount.value++
  console.log('📞 Click Operator: Message received and processed!')
}

const handleKeyMessage = () => {
  console.log('⌨️ Keyboard Operator: Enter key message processed!', keyboardMessage.value)
  keyboardMessage.value = ''
}

const trackKeystrokes = () => {
  keystrokeCount.value++
}

const handleFormSubmission = () => {
  console.log('📝 Form Operator: Processing submission for', formData.name)
  formSubmitted.value = true
  setTimeout(() => {
    formSubmitted.value = false
    formData.name = ''
  }, 3000)
}
</script>`,

    'directives-lifecycle': `<!-- Wizard Academy Component -->
<template>
  <div class="wizard-academy">
    <div class="academy-header">
      <h3>⚡ Wizard Academy</h3>
      <p>Master the magic wands and component life stories!</p>
    </div>
    
    <div class="magic-demonstrations">
      <!-- Invisibility Cloak (v-if) -->
      <div class="magic-section">
        <h4>👻 Invisibility Cloak Magic</h4>
        <button @click="toggleVisibility" class="magic-button">
          Cast v-if Spell
        </button>
        <div v-if="isVisible" class="magical-element">
          ✨ I appear and disappear completely!
        </div>
      </div>
      
      <!-- Camouflage Spell (v-show) -->
      <div class="magic-section">
        <h4>🎭 Camouflage Spell</h4>
        <button @click="toggleCamouflage" class="magic-button">
          Cast v-show Spell
        </button>
        <div v-show="isCamouflaged" class="magical-element">
          🕵️ I hide but stay in the DOM!
        </div>
      </div>
      
      <!-- Duplication Spell (v-for) -->
      <div class="magic-section">
        <h4>🔄 Duplication Spell</h4>
        <button @click="addMagicalCreature" class="magic-button">
          Cast v-for Spell
        </button>
        <div class="magical-creatures">
          <div 
            v-for="creature in magicalCreatures" 
            :key="creature.id"
            class="creature"
          >
            {{ creature.emoji }} {{ creature.name }}
          </div>
        </div>
      </div>
      
      <!-- Telepathic Link (v-model) -->
      <div class="magic-section">
        <h4>🔗 Telepathic Link</h4>
        <input 
          v-model="telepathicMessage" 
          placeholder="Think something..."
          class="telepathic-input"
        />
        <p class="telepathic-display">
          Your thoughts: {{ telepathicMessage }}
        </p>
      </div>
    </div>
    
    <!-- Component Lifecycle Display -->
    <div class="lifecycle-display">
      <h4>🌱 Component Life Story</h4>
      <div class="lifecycle-events">
        <div v-for="event in lifecycleEvents" :key="event.id" class="lifecycle-event">
          {{ event.phase }}: {{ event.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'

// Magic wand states
const isVisible = ref(true)
const isCamouflaged = ref(true)
const telepathicMessage = ref('')
const magicalCreatures = ref([
  { id: 1, name: 'Phoenix', emoji: '🔥' },
  { id: 2, name: 'Dragon', emoji: '🐉' }
])

const lifecycleEvents = ref([])

// Magic wand methods
const toggleVisibility = () => {
  isVisible.value = !isVisible.value
  addLifecycleEvent('Magic Cast', 'v-if invisibility cloak activated!')
}

const toggleCamouflage = () => {
  isCamouflaged.value = !isCamouflaged.value
  addLifecycleEvent('Magic Cast', 'v-show camouflage spell activated!')
}

const addMagicalCreature = () => {
  const creatures = ['🦄 Unicorn', '🧙‍♂️ Wizard', '🧚‍♀️ Fairy', '🐺 Werewolf']
  const randomCreature = creatures[Math.floor(Math.random() * creatures.length)]
  const [emoji, name] = randomCreature.split(' ')
  magicalCreatures.value.push({
    id: Date.now(),
    name,
    emoji
  })
}

const addLifecycleEvent = (phase, message) => {
  lifecycleEvents.value.push({
    id: Date.now(),
    phase,
    message,
    timestamp: new Date().toLocaleTimeString()
  })
}

// Component Lifecycle Hooks - The life story events!
onMounted(() => {
  addLifecycleEvent('🌱 Birth (onMounted)', 'Component has been born and is ready to learn magic!')
  console.log('⚡ Wizard Academy: Student has entered the academy!')
})

onUpdated(() => {
  addLifecycleEvent('📚 Learning (onUpdated)', 'Component learned new magic and updated its knowledge!')
})

onUnmounted(() => {
  addLifecycleEvent('🎓 Graduation (onUnmounted)', 'Component has graduated from the academy!')
  console.log('⚡ Wizard Academy: Student has graduated!')
})
</script>`,

    'advanced-patterns': `<!-- Avengers Academy Superhero System -->
<template>
  <div class="avengers-academy">
    <div class="academy-header">
      <h3>🦸‍♂️ Avengers Academy</h3>
      <p>Advanced Vue patterns for superhero components!</p>
    </div>
    
    <!-- Telepathic Network (Provide/Inject) Demo -->
    <div class="superhero-section">
      <h4>🧠 Professor X's Telepathic Network</h4>
      <div class="telepathic-display">
        <p>Broadcasting: "{{ telepathicMessage }}"</p>
        <p>Academy: {{ academyName }}</p>
        <button @click="changeBroadcast">Change Broadcast</button>
      </div>
    </div>
    
    <!-- Dynamic Components (Shapeshifting) -->
    <div class="superhero-section">
      <h4>🎭 Shapeshifting Components</h4>
      <div class="shapeshifter-controls">
        <button 
          v-for="hero in heroes" 
          :key="hero.name"
          @click="currentHero = hero.name"
          :class="{ active: currentHero === hero.name }"
          class="hero-button"
        >
          {{ hero.emoji }} {{ hero.name }}
        </button>
      </div>
      <component :is="currentHeroComponent" :hero-data="getCurrentHeroData()" />
    </div>
    
    <!-- Portal Magic (Teleport) Demo -->
    <div class="superhero-section">
      <h4>🌀 Doctor Strange's Portal Magic</h4>
      <button @click="openPortal" class="portal-button">
        {{ portalOpen ? 'Close Portal' : 'Open Portal' }}
      </button>
      
      <!-- This content will be teleported -->
      <Teleport to="body" v-if="portalOpen">
        <div class="portal-modal">
          <div class="portal-content">
            <h5>🌀 Portal Opened!</h5>
            <p>This content was teleported using Doctor Strange's magic!</p>
            <button @click="closePortal">Close Portal</button>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, computed } from 'vue'

// Telepathic network state (Professor X's power)
const telepathicMessage = ref('Greetings from Professor X!')
const academyName = ref('Avengers Academy')

// Provide telepathic data to child components
provide('telepathicMessage', telepathicMessage)
provide('academyName', academyName)

// Shapeshifting heroes state
const currentHero = ref('ironman')
const heroes = [
  { name: 'ironman', emoji: '🤖', component: 'IronManComponent' },
  { name: 'spiderman', emoji: '🕷️', component: 'SpiderManComponent' },
  { name: 'hulk', emoji: '💚', component: 'HulkComponent' }
]

// Portal magic state
const portalOpen = ref(false)

// Methods
const changeBroadcast = () => {
  const messages = [
    'Welcome to the Academy!',
    'Training in progress...',
    'Heroes assemble!',
    'Mission accomplished!'
  ]
  telepathicMessage.value = messages[Math.floor(Math.random() * messages.length)]
}

const getCurrentHeroData = () => {
  return heroes.find(hero => hero.name === currentHero.value)
}

const currentHeroComponent = computed(() => {
  const hero = heroes.find(h => h.name === currentHero.value)
  return hero ? hero.component : 'IronManComponent'
})

const openPortal = () => {
  portalOpen.value = !portalOpen.value
}

const closePortal = () => {
  portalOpen.value = false
}
</script>`
  }
  
  return codeExamples[sectionId] || `// Code example for ${sectionId}\nconsole.log('Learning Vue 3 is fun!');`;
}

// Achievement system for progress tracking
export const ACHIEVEMENTS = [
  {
    id: 'first-component',
    title: 'LEGO Master',
    description: 'Created your first dancing LEGO block component!',
    icon: '🧩',
    category: 'components'
  },
  {
    id: 'reactive-master',
    title: 'Psychic Mirror Expert',
    description: 'Mastered the art of mind-reading with reactivity!',
    icon: '🔮',
    category: 'reactivity'
  },
  {
    id: 'composition-expert',
    title: 'Mad Scientist',
    description: 'Successfully mixed your first function potions!',
    icon: '🧪',
    category: 'composition-api'
  },
  {
    id: 'event-handler',
    title: 'Event Whisperer',
    description: 'Learned to communicate with user interactions!',
    icon: '⚡',
    category: 'events'
  },
  {
    id: 'lifecycle-guru',
    title: 'Lifecycle Sage',
    description: 'Mastered the birth, life, and death of components!',
    icon: '🌱',
    category: 'lifecycle'
  },
  {
    id: 'vue-master',
    title: 'Vue Master',
    description: 'Completed all tutorial sections! You are now a Vue wizard!',
    icon: '🧙‍♂️',
    category: 'completion'
  }
];

// Storage key for progress data
export const PROGRESS_STORAGE_KEY = 'vue-learning-progress';

// Navigation sections for the main app
export const NAVIGATION_SECTIONS = [
  {
    id: 'tutorial',
    title: 'Interactive Tutorial',
    icon: 'mdi-school',
    description: 'Hands-on learning with interactive examples'
  },
  {
    id: 'basics',
    title: 'Basic Concepts',
    icon: 'mdi-book-open-variant',
    description: 'Fundamental Vue 3 concepts and patterns'
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    icon: 'mdi-code-braces',
    description: 'Advanced component patterns and composition'
  },
  {
    id: 'advanced',
    title: 'Advanced',
    icon: 'mdi-rocket-launch',
    description: 'Performance optimization and advanced patterns'
  },
  {
    id: 'interactive-components',
    title: 'Interactive Components',
    icon: 'mdi-play-circle',
    description: 'Try live examples and interactive demos'
  }
];

// Emoji data for the interactive emoji buttons
export const EMOJI_DATA = [
  { emoji: '😊', name: 'happy', color: '#FCD34D' },
  { emoji: '❤️', name: 'heart', color: '#EF4444' },
  { emoji: '⭐', name: 'star', color: '#F59E0B' },
  { emoji: '🚀', name: 'rocket', color: '#3B82F6' },
  { emoji: '🎉', name: 'party', color: '#8B5CF6' },
  { emoji: '🔥', name: 'fire', color: '#EF4444' }
];

 