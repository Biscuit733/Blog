<script setup>
import CyberCard from './CyberCard.vue'
</script>

<template>
  <div class="right-sidebar">
    
    <CyberCard class="mb-20">
      <div class="cal-header">December 2025</div>
      <div class="cal-grid">
        <span class="head">S</span><span class="head">M</span><span class="head">T</span><span class="head">W</span><span class="head">T</span><span class="head">F</span><span class="head">S</span>
        <span></span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
        <span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span>
        <span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span>
        <span class="today">21</span><span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span>
        <span>28</span><span>29</span><span>30</span><span>31</span>
      </div>
    </CyberCard>

    <CyberCard class="terminal">
      <div class="term-bar">
        <span class="title">user@biscuit-os:~</span>
      </div>
      <div class="term-content">
        <p><span class="prompt">$</span> init system...</p>
        <p><span class="success">[OK]</span> core modules loaded.</p>
        <p><span class="prompt">$</span> mount /dev/blog</p>
        <p><span class="success">[OK]</span> mounted read-only.</p>
        <p><span class="prompt">$</span> <span class="blink">_</span></p>
      </div>
    </CyberCard>

  </div>
</template>

<style scoped>
* { font-family: Consolas, "JetBrains Mono", monospace; }

.right-sidebar { display: flex; flex-direction: column; gap: 20px; }
.mb-20 { margin-bottom: 20px; }

/* Calendar */
.cal-header { 
  color: #00FFFF; font-size: 16px; font-weight: bold; text-align: center; 
  margin-bottom: 12px; border-bottom: 1px solid rgba(0,255,255,0.2); padding-bottom: 8px; 
  text-shadow: 0 0 4px rgba(0,255,255,0.5);
}
.cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px; text-align: center; font-size: 0.85rem; color: #94a3b8; }
.head { color: #00FFFF; font-weight: bold; }
.cal-grid span:not(.head):not(:empty) { 
  padding: 4px; border-radius: 4px; cursor: pointer; transition: 0.2s;
}
.cal-grid span:not(.head):not(:empty):hover { color: #00FFFF; background: rgba(0,255,255,0.1); }

.today { 
  background: #00FFFF !important; 
  color: #000 !important; 
  font-weight: bold; 
  box-shadow: 0 0 8px rgba(0,255,255,0.6);
}

/* Terminal */
.terminal { min-height: 200px; display: flex; flex-direction: column; }
.term-bar { 
  border-bottom: 1px solid rgba(0,255,255,0.2); padding-bottom: 8px; margin-bottom: 10px;
}
.title { font-size: 0.75rem; color: #94a3b8; }

.term-content { font-size: 0.85rem; color: #e5e5e5; line-height: 1.6; }
.prompt { color: #00FFFF; margin-right: 8px; }
.success { color: #00FFFF; opacity: 0.8; margin-right: 5px; }
.blink { animation: blink 1s infinite; color: #00FFFF; }
@keyframes blink { 50% { opacity: 0; } }
</style>