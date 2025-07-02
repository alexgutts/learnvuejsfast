<template>
  <div class="diff-algorithm-demo">
    <div class="demo-content">
      <h3>🔍 Diff Algorithm</h3>
      <p>This step shows how Vue efficiently compares old and new virtual DOM trees.</p>
      
      <div class="demo-visualization">
        <div class="old-tree">
          <h4>Old Virtual DOM</h4>
          <div class="tree-nodes">
            <div class="node old">Item 1</div>
            <div class="node old">Item 2</div>
            <div class="node old">Item 3</div>
          </div>
        </div>
        
        <div class="diff-process">
          <div class="diff-icon">⚡</div>
          <div class="diff-text">Diffing...</div>
        </div>
        
        <div class="new-tree">
          <h4>New Virtual DOM</h4>
          <div class="tree-nodes">
            <div class="node new">Item 1</div>
            <div class="node added">Item 1.5</div>
            <div class="node changed">Item 2 Updated</div>
            <div class="node new">Item 3</div>
          </div>
        </div>
      </div>
      
      <div class="changes-summary">
        <h4>🎯 Changes Detected:</h4>
        <div class="change-list">
          <div class="change added">+ Added Item 1.5</div>
          <div class="change modified">~ Modified Item 2</div>
          <div class="change unchanged">= Item 1, 3 unchanged</div>
        </div>
      </div>
      
      <button @click="startDemo" class="demo-button">
        Run Diff Algorithm
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isActive = ref(false)

const startDemo = () => {
  isActive.value = true
  console.log('Diff algorithm demo started')
}
</script>

<style scoped>
.diff-algorithm-demo {
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

.old-tree, .new-tree {
  flex: 1;
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.tree-nodes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.node {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
}

.node.old {
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.node.new {
  background: #f3f4f6;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.node.added {
  background: #dcfce7;
  color: #16a34a;
  border: 1px solid #22c55e;
}

.node.changed {
  background: #fef3c7;
  color: #d97706;
  border: 1px solid #f59e0b;
}

.diff-process {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: #f59e0b;
  color: white;
  border-radius: 8px;
}

.diff-icon {
  font-size: 2rem;
  animation: spin 2s linear infinite;
}

.diff-text {
  font-weight: 600;
  font-size: 0.9rem;
}

.changes-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
  margin: 1rem 0;
}

.change-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.change {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  text-align: left;
}

.change.added {
  background: #dcfce7;
  color: #16a34a;
  border-left: 4px solid #22c55e;
}

.change.modified {
  background: #fef3c7;
  color: #d97706;
  border-left: 4px solid #f59e0b;
}

.change.unchanged {
  background: #f3f4f6;
  color: #6b7280;
  border-left: 4px solid #d1d5db;
}

.demo-button {
  background: #f59e0b;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}

.demo-button:hover {
  background: #d97706;
  transform: translateY(-2px);
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .demo-visualization {
    flex-direction: column;
  }
  
  .diff-process {
    order: 2;
    margin: 1rem 0;
  }
}
</style> 