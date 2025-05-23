<template>
  <div class="scroll-depth-widget-container">
    <div class="scroll-depth-settings">
      <h2>Scroll Depth Analytics Widget</h2>
      
      <!-- Tracking Settings -->
      <div class="settings-section">
        <h3>Scroll Tracking Configuration</h3>
        <div class="form-group">
          <label>Tracking Milestones (%):</label>
          <div class="milestone-inputs">
            <input v-for="(milestone, index) in widget.milestones" 
                   :key="index"
                   v-model.number="widget.milestones[index]" 
                   type="number" 
                   min="0" 
                   max="100" 
                   class="milestone-input" />
          </div>
          <button @click="addMilestone" class="add-milestone-btn">Add Milestone</button>
        </div>
        <div class="form-group">
          <label>Engagement Threshold (seconds):</label>
          <input v-model.number="widget.engagementThreshold" type="number" min="1" max="300" />
          <small>Time spent reading at each milestone</small>
        </div>
        <div class="checkbox-group">
          <label><input v-model="widget.trackTimeOnPage" type="checkbox" /> Track total time on page</label>
          <label><input v-model="widget.trackReadingSpeed" type="checkbox" /> Calculate reading speed</label>
          <label><input v-model="widget.trackBounceRate" type="checkbox" /> Track bounce indicators</label>
        </div>
      </div>

      <!-- Action Triggers -->
      <div class="settings-section">
        <h3>Action Triggers</h3>
        <div v-for="(trigger, index) in widget.triggers" :key="index" class="trigger-item">
          <div class="trigger-header">
            <h4>Trigger {{ index + 1 }}</h4>
            <button @click="removeTrigger(index)" class="remove-btn">Remove</button>
          </div>
          <div class="form-group">
            <label>Trigger at scroll depth (%):</label>
            <input v-model.number="trigger.scrollDepth" type="number" min="0" max="100" />
          </div>
          <div class="form-group">
            <label>Action:</label>
            <select v-model="trigger.action">
              <option value="popup">Open Popup</option>
              <option value="next-step">Go to Next Step</option>
              <option value="show-element">Show Hidden Element</option>
              <option value="send-event">Send Custom Event</option>
            </select>
          </div>
          <div v-if="trigger.action === 'show-element'" class="form-group">
            <label>Element ID to Show:</label>
            <input v-model="trigger.elementId" type="text" placeholder="my-hidden-element" />
          </div>
          <div v-if="trigger.action === 'send-event'" class="form-group">
            <label>Event Name:</label>
            <input v-model="trigger.eventName" type="text" placeholder="scroll-milestone-reached" />
          </div>
          <div class="form-group">
            <label>Delay (ms):</label>
            <input v-model.number="trigger.delay" type="number" min="0" max="10000" />
          </div>
          <div class="checkbox-group">
            <label><input v-model="trigger.onlyOnce" type="checkbox" /> Only trigger once</label>
          </div>
        </div>
        <button @click="addTrigger" class="add-btn">Add Trigger</button>
      </div>

      <!-- Analytics Display -->
      <div class="settings-section">
        <h3>Analytics Display</h3>
        <div class="form-group">
          <label>Display Mode:</label>
          <select v-model="widget.displayMode">
            <option value="hidden">Hidden (background only)</option>
            <option value="progress-bar">Progress Bar</option>
            <option value="reading-time">Reading Time Indicator</option>
            <option value="engagement-score">Engagement Score</option>
          </select>
        </div>
        <div v-if="widget.displayMode !== 'hidden'" class="form-group">
          <label>Position:</label>
          <select v-model="widget.position">
            <option value="top">Top of Page</option>
            <option value="bottom">Bottom of Page</option>
            <option value="floating">Floating</option>
          </select>
        </div>
        <div class="checkbox-group">
          <label><input v-model="widget.showToAdmin" type="checkbox" /> Show detailed analytics to admin</label>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div class="preview-section">
      <h3>Preview</h3>
      <div class="preview-container">
        <div v-html="htmlPreview" class="widget-preview"></div>
        <div class="analytics-preview">
          <h4>Analytics Tracking:</h4>
          <ul>
            <li>Milestones: {{ widget.milestones.join('%, ') }}%</li>
            <li>Engagement threshold: {{ widget.engagementThreshold }}s</li>
            <li>Triggers: {{ widget.triggers.length }} configured</li>
            <li>Display: {{ widget.displayMode }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface ScrollTrigger {
  scrollDepth: number;
  action: 'popup' | 'next-step' | 'show-element' | 'send-event';
  elementId?: string;
  eventName?: string;
  delay: number;
  onlyOnce: boolean;
}

interface ScrollDepthWidget {
  id: string;
  type: 'scroll-depth';
  name: string;
  milestones: number[];
  engagementThreshold: number;
  trackTimeOnPage: boolean;
  trackReadingSpeed: boolean;
  trackBounceRate: boolean;
  triggers: ScrollTrigger[];
  displayMode: 'hidden' | 'progress-bar' | 'reading-time' | 'engagement-score';
  position: 'top' | 'bottom' | 'floating';
  showToAdmin: boolean;
}

const widget = ref<ScrollDepthWidget>({
  id: 'scroll-depth-1',
  type: 'scroll-depth',
  name: 'Scroll Depth Analytics Widget',
  milestones: [25, 50, 75, 90],
  engagementThreshold: 15,
  trackTimeOnPage: true,
  trackReadingSpeed: true,
  trackBounceRate: true,
  triggers: [
    {
      scrollDepth: 50,
      action: 'popup',
      delay: 2000,
      onlyOnce: true
    }
  ],
  displayMode: 'progress-bar',
  position: 'top',
  showToAdmin: false
});

const addMilestone = () => {
  widget.value.milestones.push(100);
};

const addTrigger = () => {
  widget.value.triggers.push({
    scrollDepth: 75,
    action: 'popup',
    delay: 1000,
    onlyOnce: true
  });
};

const removeTrigger = (index: number) => {
  widget.value.triggers.splice(index, 1);
};

const htmlPreview = computed(() => {
  if (widget.value.displayMode === 'hidden') {
    return '<div style="text-align: center; padding: 20px; color: #6b7280;">Analytics running in background (no visible UI)</div>';
  }

  const positionStyles = {
    'top': 'position: fixed; top: 0; left: 0; right: 0; z-index: 9998;',
    'bottom': 'position: fixed; bottom: 0; left: 0; right: 0; z-index: 9998;',
    'floating': 'position: fixed; bottom: 20px; right: 20px; z-index: 9998;'
  };

  return `
    <style>
      .scroll-analytics-container {
        ${positionStyles[widget.value.position]}
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid #e5e7eb;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        ${widget.value.position === 'floating' ? 'border-radius: 8px; padding: 12px; max-width: 250px;' : 'padding: 8px 16px;'}
      }
      
      .scroll-progress-bar {
        width: 100%;
        height: 4px;
        background: #e5e7eb;
        border-radius: 2px;
        overflow: hidden;
      }
      
      .scroll-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #3b82f6, #8b5cf6);
        width: 0%;
        transition: width 0.3s ease;
      }
      
      .scroll-reading-time {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #374151;
      }
      
      .scroll-engagement-score {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #374151;
      }
      
      .scroll-metric {
        font-weight: 600;
        color: #1f2937;
      }
      
      .scroll-admin-panel {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        padding: 12px;
        margin-top: 8px;
        font-size: 12px;
      }
      
      .scroll-milestone {
        display: inline-block;
        background: #ddd6fe;
        color: #5b21b6;
        padding: 2px 6px;
        border-radius: 4px;
        margin: 2px;
        font-size: 11px;
      }
      
      .scroll-milestone.reached {
        background: #10b981;
        color: white;
      }
    </style>
    
    <div class="scroll-analytics-container" id="scroll-analytics">
      ${widget.value.displayMode === 'progress-bar' ? `
        <div class="scroll-progress-bar">
          <div class="scroll-progress-fill" id="scroll-progress"></div>
        </div>
      ` : ''}
      
      ${widget.value.displayMode === 'reading-time' ? `
        <div class="scroll-reading-time">
          📖 Reading time: <span class="scroll-metric" id="reading-time">0m 0s</span>
        </div>
      ` : ''}
      
      ${widget.value.displayMode === 'engagement-score' ? `
        <div class="scroll-engagement-score">
          📊 Engagement: <span class="scroll-metric" id="engagement-score">0%</span>
        </div>
      ` : ''}
      
      ${widget.value.showToAdmin ? `
        <div class="scroll-admin-panel" id="admin-panel">
          <div>Milestones: <span id="milestone-indicators"></span></div>
          <div>Time on page: <span id="time-on-page">0s</span></div>
          <div>Reading speed: <span id="reading-speed">0 WPM</span></div>
          <div>Scroll depth: <span id="max-scroll">0%</span></div>
        </div>
      ` : ''}
    </div>
  `;
});

const jsCode = computed(() => {
  return `
    (function() {
      const config = {
        milestones: ${JSON.stringify(widget.value.milestones)},
        engagementThreshold: ${widget.value.engagementThreshold},
        trackTimeOnPage: ${widget.value.trackTimeOnPage},
        trackReadingSpeed: ${widget.value.trackReadingSpeed},
        trackBounceRate: ${widget.value.trackBounceRate},
        triggers: ${JSON.stringify(widget.value.triggers)},
        displayMode: '${widget.value.displayMode}',
        showToAdmin: ${widget.value.showToAdmin}
      };
      
      let analytics = {
        startTime: Date.now(),
        maxScroll: 0,
        timeAtDepths: {},
        milestoneReached: {},
        triggersExecuted: {},
        totalReadingTime: 0,
        wordCount: 0,
        engagementScore: 0
      };
      
      // Calculate word count for reading speed
      analytics.wordCount = document.body.innerText.split(/\\s+/).length;
      
      function getScrollPercent() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        return scrollHeight > 0 ? Math.round((scrollTop / scrollHeight) * 100) : 0;
      }
      
      function updateAnalytics() {
        const currentScroll = getScrollPercent();
        const currentTime = Date.now();
        const timeOnPage = Math.round((currentTime - analytics.startTime) / 1000);
        
        // Update max scroll
        if (currentScroll > analytics.maxScroll) {
          analytics.maxScroll = currentScroll;
        }
        
        // Track time at current depth
        const depthKey = Math.floor(currentScroll / 10) * 10;
        if (!analytics.timeAtDepths[depthKey]) {
          analytics.timeAtDepths[depthKey] = 0;
        }
        analytics.timeAtDepths[depthKey] += 0.5; // Update every 500ms
        
        // Check milestones
        config.milestones.forEach(milestone => {
          if (currentScroll >= milestone && !analytics.milestoneReached[milestone]) {
            analytics.milestoneReached[milestone] = currentTime;
            console.log('Milestone reached:', milestone + '%');
          }
        });
        
        // Check triggers
        config.triggers.forEach((trigger, index) => {
          if (currentScroll >= trigger.scrollDepth && !analytics.triggersExecuted[index]) {
            if (trigger.onlyOnce) {
              analytics.triggersExecuted[index] = true;
            }
            
            setTimeout(() => {
              switch (trigger.action) {
                case 'popup':
                  var event = new Event('customWidgetOpenPopup');
                  window.dispatchEvent(event);
                  break;
                case 'next-step':
                  var event = new Event('customWidgetGoToNextStep');
                  window.dispatchEvent(event);
                  break;
                case 'show-element':
                  if (trigger.elementId) {
                    const element = document.getElementById(trigger.elementId);
                    if (element) element.style.display = 'block';
                  }
                  break;
                case 'send-event':
                  if (trigger.eventName) {
                    var customEvent = new CustomEvent(trigger.eventName, {
                      detail: { scrollDepth: currentScroll, analytics: analytics }
                    });
                    window.dispatchEvent(customEvent);
                  }
                  break;
              }
            }, trigger.delay);
          }
        });
        
        // Calculate engagement score
        const engagedTime = Object.values(analytics.timeAtDepths)
          .filter(time => time >= config.engagementThreshold).length;
        analytics.engagementScore = Math.min(100, Math.round((engagedTime / config.milestones.length) * 100));
        
        // Update UI
        updateDisplay(currentScroll, timeOnPage);
      }
      
      function updateDisplay(scrollPercent, timeOnPage) {
        if (config.displayMode === 'hidden') return;
        
        const progressBar = document.getElementById('scroll-progress');
        const readingTime = document.getElementById('reading-time');
        const engagementScore = document.getElementById('engagement-score');
        
        if (progressBar) {
          progressBar.style.width = scrollPercent + '%';
        }
        
        if (readingTime) {
          const minutes = Math.floor(timeOnPage / 60);
          const seconds = timeOnPage % 60;
          readingTime.textContent = minutes + 'm ' + seconds + 's';
        }
        
        if (engagementScore) {
          engagementScore.textContent = analytics.engagementScore + '%';
        }
        
        if (config.showToAdmin) {
          updateAdminPanel(timeOnPage);
        }
      }
      
      function updateAdminPanel(timeOnPage) {
        const milestoneIndicators = document.getElementById('milestone-indicators');
        const timeOnPageEl = document.getElementById('time-on-page');
        const readingSpeedEl = document.getElementById('reading-speed');
        const maxScrollEl = document.getElementById('max-scroll');
        
        if (milestoneIndicators) {
          milestoneIndicators.innerHTML = config.milestones.map(milestone => 
            '<span class="scroll-milestone' + 
            (analytics.milestoneReached[milestone] ? ' reached' : '') + 
            '">' + milestone + '%</span>'
          ).join('');
        }
        
        if (timeOnPageEl) timeOnPageEl.textContent = timeOnPage + 's';
        if (maxScrollEl) maxScrollEl.textContent = analytics.maxScroll + '%';
        
        if (readingSpeedEl && timeOnPage > 0) {
          const wordsRead = Math.round((analytics.wordCount * analytics.maxScroll) / 100);
          const wpm = Math.round(wordsRead / (timeOnPage / 60));
          readingSpeedEl.textContent = wpm + ' WPM';
        }
      }
      
      // Start tracking
      setInterval(updateAnalytics, 500);
      
      // Track scroll events
      window.addEventListener('scroll', updateAnalytics);
      
      // Send analytics on page unload
      window.addEventListener('beforeunload', () => {
        if (config.trackBounceRate) {
          const finalAnalytics = {
            ...analytics,
            finalTime: Date.now(),
            bounced: analytics.maxScroll < 25 && (Date.now() - analytics.startTime) < 30000
          };
          
          // You could send this data to your analytics service
          console.log('Final analytics:', finalAnalytics);
        }
      });
      
      console.log('Scroll depth analytics initialized');
    })();
  `;
});

// Emit code changes to parent
const emit = defineEmits(['codeChange']);

watch([widget], () => {
  emit('codeChange', {
    html: htmlPreview.value,
    js: jsCode.value,
    elementStore: widget.value
  });
}, { deep: true, immediate: true });
</script>

<style scoped>
.scroll-depth-widget-container {
  display: flex;
  gap: 20px;
  height: 100vh;
  overflow: hidden;
}

.scroll-depth-settings {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f9fafb;
}

.preview-section {
  flex: 1;
  padding: 20px;
  background: white;
  border-left: 1px solid #e5e7eb;
}

.preview-container {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  background: #f9fafb;
}

.analytics-preview {
  margin-top: 20px;
  padding: 15px;
  background: #eff6ff;
  border-radius: 6px;
}

.analytics-preview h4 {
  margin: 0 0 10px 0;
  color: #1e40af;
}

.analytics-preview ul {
  margin: 0;
  padding-left: 20px;
}

.analytics-preview li {
  margin-bottom: 5px;
  color: #374151;
}

.milestone-inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.milestone-input {
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
}

.add-milestone-btn {
  background: #10b981;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.trigger-item {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  background: #f9fafb;
}

.trigger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.trigger-header h4 {
  margin: 0;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
}

.remove-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.add-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
}

.settings-section {
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.settings-section h3 {
  margin: 0 0 15px 0;
  color: #374151;
  font-size: 18px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #374151;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
}

.form-group small {
  display: block;
  margin-top: 4px;
  color: #6b7280;
  font-size: 12px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
}

h2 {
  margin: 0 0 20px 0;
  color: #111827;
  font-size: 24px;
  font-weight: 700;
}
</style> 