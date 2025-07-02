<template>
  <div class="virtual-dom-demo">
    <div class="demo-content">
      <h3>🌳 Virtual DOM Creation</h3>
      <p>This step shows how Vue creates a lightweight JavaScript representation of your DOM.</p>
      
      <div class="demo-visualization">
        <div class="virtual-tree">
          <h4>Virtual DOM Tree</h4>
          <div class="tree-structure">
            <div class="node">div</div>
            <div class="children">
              <div class="node">h1</div>
              <div class="node">p</div>
              <div class="node">button</div>
            </div>
          </div>
        </div>
        
        <div class="arrow">→</div>
        
        <div class="real-dom">
          <h4>Real DOM</h4>
          <div class="dom-preview">
            <div class="element">
              <h1>Hello Vue!</h1>
              <p>This is a paragraph</p>
              <button>Click me</button>
            </div>
          </div>
        </div>
      </div>
      
      <button @click="startDemo" class="demo-button">
        Create Virtual DOM
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isActive = ref(false)

const startDemo = () => {
  isActive.value = true
  console.log('Virtual DOM demo started')
}
</script>

<style scoped>
.virtual-dom-demo {
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

.virtual-tree, .real-dom {
  flex: 1;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.tree-structure {
  text-align: left;
}

.node {
  background: #6366f1;
  color: white;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 4px;
  display: inline-block;
}

.children {
  margin-left: 2rem;
  border-left: 2px solid #6366f1;
  padding-left: 1rem;
}

.dom-preview {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 4px;
  background: white;
}

.element h1 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.element p {
  margin: 0.5rem 0;
  color: #666;
}

.element button {
  background: #6366f1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.arrow {
  font-size: 2rem;
  color: #6366f1;
  font-weight: bold;
}

.demo-button {
  background: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.demo-button:hover {
  background: #059669;
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