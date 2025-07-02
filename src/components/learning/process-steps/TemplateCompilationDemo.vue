<!--
  Template Compilation Demo Component
  
  This component demonstrates how Vue transforms templates into render functions.
  It shows the compilation process with interactive animations and code examples.
-->

<template>
  <div class="template-compilation-demo">
    <div class="demo-content">
      <h3>📝 Template Compilation</h3>
      <p>This step shows how Vue transforms your templates into render functions.</p>
      
      <div class="demo-visualization">
        <div class="before">
          <h4>Before: Vue Template</h4>
          <pre><code>&lt;div&gt;{{ message }}&lt;/div&gt;</code></pre>
        </div>
        
        <div class="arrow">→</div>
        
        <div class="after">
          <h4>After: Render Function</h4>
          <pre><code>function render() {
  return h('div', message)
}</code></pre>
        </div>
      </div>
      
      <button @click="startDemo" class="demo-button">
        Start Demo
      </button>
    </div>
  </div>
</template>

<script setup>
/**
 * Template Compilation Demo Component
 * 
 * This component demonstrates Vue's template compilation process through
 * interactive animations and code examples. It shows how human-readable
 * Vue templates are transformed into optimized JavaScript render functions.
 */

import { ref } from 'vue'

const isActive = ref(false)

const startDemo = () => {
  isActive.value = true
  console.log('Template compilation demo started')
}
</script>

<style scoped>
.template-compilation-demo {
  padding: 2rem;
  text-align: center;
}

.demo-visualization {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2rem 0;
  gap: 1rem;
}

.before, .after {
  flex: 1;
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.arrow {
  font-size: 2rem;
  color: #6366f1;
  font-weight: bold;
}

pre {
  background: #1a1a1a;
  color: #fff;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
}

.demo-button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.demo-button:hover {
  background: #4f46e5;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .demo-visualization {
    flex-direction: column;
  }
  
  .arrow {
    transform: rotate(90deg);
  }
}
</style> 