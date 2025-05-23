<template>
  <div class="exit-intent-widget-container">
    <div class="exit-intent-settings">
      <h2>Exit Intent Widget Settings</h2>
      
      <!-- Trigger Settings -->
      <div class="settings-section">
        <h3>Trigger Configuration</h3>
        <div class="form-group">
          <label>Sensitivity:</label>
          <select v-model="widget.sensitivity">
            <option value="low">Low (cursor near top edge)</option>
            <option value="medium">Medium (cursor at top edge)</option>
            <option value="high">High (cursor leaves viewport)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Minimum Time on Page (seconds):</label>
          <input v-model.number="widget.minTimeOnPage" type="number" min="0" max="300" />
        </div>
        <div class="form-group">
          <label>Scroll Threshold (%):</label>
          <input v-model.number="widget.scrollThreshold" type="number" min="0" max="100" />
          <small>Only trigger if user has scrolled this percentage</small>
        </div>
        <div class="checkbox-group">
          <label><input v-model="widget.onlyOnce" type="checkbox" /> Only trigger once per session</label>
          <label><input v-model="widget.mobileEnabled" type="checkbox" /> Enable on mobile devices</label>
        </div>
      </div>

      <!-- Action Settings -->
      <div class="settings-section">
        <h3>Exit Intent Action</h3>
        <div class="form-group">
          <label>Action Type:</label>
          <select v-model="widget.actionType">
            <option value="popup">Open GHL Popup</option>
            <option value="redirect">Redirect to URL</option>
            <option value="message">Show Custom Message</option>
            <option value="discount">Show Discount Code</option>
          </select>
        </div>
        <div v-if="widget.actionType === 'redirect'" class="form-group">
          <label>Redirect URL:</label>
          <input v-model="widget.redirectUrl" type="url" placeholder="https://example.com/special-offer" />
        </div>
        <div v-if="widget.actionType === 'message'" class="form-group">
          <label>Custom Message:</label>
          <textarea v-model="widget.customMessage" placeholder="Wait! Don't leave yet..." rows="3"></textarea>
        </div>
        <div v-if="widget.actionType === 'discount'" class="form-group">
          <label>Discount Code:</label>
          <input v-model="widget.discountCode" type="text" placeholder="SAVE20" />
        </div>
      </div>

      <!-- Advanced Settings -->
      <div class="settings-section">
        <h3>Advanced Options</h3>
        <div class="form-group">
          <label>Delay Before Trigger (ms):</label>
          <input v-model.number="widget.delay" type="number" min="0" max="5000" />
        </div>
        <div class="form-group">
          <label>Cookie Expiry (days):</label>
          <input v-model.number="widget.cookieExpiry" type="number" min="1" max="365" />
          <small>How long to remember if user already saw this</small>
        </div>
        <div class="checkbox-group">
          <label><input v-model="widget.debugMode" type="checkbox" /> Debug Mode (console logs)</label>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div class="preview-section">
      <h3>Preview</h3>
      <div class="preview-container">
        <div class="preview-info">
          <h4>Exit Intent Detection Active</h4>
          <p>This widget runs invisibly in the background and triggers when:</p>
          <ul>
            <li>User moves cursor toward browser close/back button</li>
            <li>User has been on page for {{ widget.minTimeOnPage }}+ seconds</li>
            <li>User has scrolled {{ widget.scrollThreshold }}%+ of the page</li>
            <li>Sensitivity: {{ widget.sensitivity }}</li>
          </ul>
          <div class="action-preview">
            <strong>Action:</strong> {{ getActionDescription() }}
          </div>
          <button @click="testTrigger" class="test-button">Test Trigger</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface ExitIntentWidget {
  id: string;
  type: 'exit-intent';
  name: string;
  sensitivity: 'low' | 'medium' | 'high';
  minTimeOnPage: number;
  scrollThreshold: number;
  onlyOnce: boolean;
  mobileEnabled: boolean;
  actionType: 'popup' | 'redirect' | 'message' | 'discount';
  redirectUrl?: string;
  customMessage?: string;
  discountCode?: string;
  delay: number;
  cookieExpiry: number;
  debugMode: boolean;
}

const widget = ref<ExitIntentWidget>({
  id: 'exit-intent-1',
  type: 'exit-intent',
  name: 'Exit Intent Widget',
  sensitivity: 'medium',
  minTimeOnPage: 30,
  scrollThreshold: 25,
  onlyOnce: true,
  mobileEnabled: false,
  actionType: 'popup',
  redirectUrl: '',
  customMessage: "Wait! Don't leave yet...",
  discountCode: 'SAVE20',
  delay: 500,
  cookieExpiry: 7,
  debugMode: false
});

const getActionDescription = () => {
  switch (widget.value.actionType) {
    case 'popup': return 'Open GoHighLevel Popup';
    case 'redirect': return `Redirect to ${widget.value.redirectUrl || 'URL'}`;
    case 'message': return `Show message: "${widget.value.customMessage}"`;
    case 'discount': return `Show discount code: ${widget.value.discountCode}`;
    default: return 'No action configured';
  }
};

const testTrigger = () => {
  alert('Exit intent would trigger here with action: ' + getActionDescription());
};

const htmlPreview = computed(() => {
  return `
    <style>
      .exit-intent-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 99999;
        display: none;
        align-items: center;
        justify-content: center;
      }
      
      .exit-intent-modal {
        background: white;
        padding: 30px;
        border-radius: 12px;
        max-width: 400px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        animation: exitIntentSlideIn 0.3s ease-out;
      }
      
      @keyframes exitIntentSlideIn {
        from {
          opacity: 0;
          transform: translateY(-50px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      .exit-intent-title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 15px;
        color: #1f2937;
      }
      
      .exit-intent-message {
        font-size: 16px;
        color: #6b7280;
        margin-bottom: 20px;
        line-height: 1.5;
      }
      
      .exit-intent-discount {
        background: #fef3c7;
        border: 2px dashed #f59e0b;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
      }
      
      .exit-intent-code {
        font-size: 24px;
        font-weight: 700;
        color: #92400e;
        letter-spacing: 2px;
      }
      
      .exit-intent-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #9ca3af;
      }
      
      .exit-intent-close:hover {
        color: #374151;
      }
    </style>
    
    <div class="exit-intent-overlay" id="exit-intent-overlay">
      <div class="exit-intent-modal">
        <button class="exit-intent-close" onclick="document.getElementById('exit-intent-overlay').style.display='none'">×</button>
        <div class="exit-intent-title">Wait! Don't Leave Yet!</div>
        <div class="exit-intent-message">
          ${widget.value.actionType === 'message' ? widget.value.customMessage : 
            widget.value.actionType === 'discount' ? 'Get an exclusive discount before you go!' :
            'We have something special for you!'}
        </div>
        ${widget.value.actionType === 'discount' ? `
          <div class="exit-intent-discount">
            <div>Use code:</div>
            <div class="exit-intent-code">${widget.value.discountCode}</div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
});

const jsCode = computed(() => {
  const sensitivityMap = {
    low: 50,
    medium: 20,
    high: 5
  };
  
  return `
    (function() {
      const config = {
        sensitivity: ${sensitivityMap[widget.value.sensitivity]},
        minTimeOnPage: ${widget.value.minTimeOnPage * 1000},
        scrollThreshold: ${widget.value.scrollThreshold},
        onlyOnce: ${widget.value.onlyOnce},
        mobileEnabled: ${widget.value.mobileEnabled},
        actionType: '${widget.value.actionType}',
        redirectUrl: '${widget.value.redirectUrl || ''}',
        delay: ${widget.value.delay},
        cookieExpiry: ${widget.value.cookieExpiry},
        debugMode: ${widget.value.debugMode}
      };
      
      let triggered = false;
      let startTime = Date.now();
      let maxScroll = 0;
      
      // Check if already triggered in this session
      const cookieName = 'exit-intent-triggered-${widget.value.id}';
      if (config.onlyOnce && getCookie(cookieName)) {
        if (config.debugMode) console.log('Exit intent already triggered in this session');
        return;
      }
      
      // Check if mobile and not enabled
      if (!config.mobileEnabled && /Mobi|Android/i.test(navigator.userAgent)) {
        if (config.debugMode) console.log('Exit intent disabled on mobile');
        return;
      }
      
      function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
      }
      
      function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
        document.cookie = name + "=" + value + "; expires=" + expires + "; path=/";
      }
      
      function getScrollPercent() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        return scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      }
      
      function triggerExitIntent() {
        if (triggered) return;
        
        const timeOnPage = Date.now() - startTime;
        const scrollPercent = Math.max(maxScroll, getScrollPercent());
        
        if (timeOnPage < config.minTimeOnPage) {
          if (config.debugMode) console.log('Not enough time on page:', timeOnPage / 1000, 'seconds');
          return;
        }
        
        if (scrollPercent < config.scrollThreshold) {
          if (config.debugMode) console.log('Not enough scroll:', scrollPercent + '%');
          return;
        }
        
        triggered = true;
        if (config.debugMode) console.log('Exit intent triggered!');
        
        setTimeout(() => {
          switch (config.actionType) {
            case 'popup':
              var event = new Event('customWidgetOpenPopup');
              window.dispatchEvent(event);
              break;
            case 'redirect':
              if (config.redirectUrl) {
                window.location.href = config.redirectUrl;
              }
              break;
            case 'message':
            case 'discount':
              const overlay = document.getElementById('exit-intent-overlay');
              if (overlay) {
                overlay.style.display = 'flex';
              }
              break;
          }
          
          if (config.onlyOnce) {
            setCookie(cookieName, 'true', config.cookieExpiry);
          }
        }, config.delay);
      }
      
      // Track scroll progress
      window.addEventListener('scroll', () => {
        maxScroll = Math.max(maxScroll, getScrollPercent());
      });
      
      // Mouse leave detection
      document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= config.sensitivity) {
          triggerExitIntent();
        }
      });
      
      // Additional mobile detection (scroll up quickly)
      if (config.mobileEnabled) {
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
          const currentScrollY = window.scrollY;
          if (lastScrollY - currentScrollY > 100) { // Quick upward scroll
            triggerExitIntent();
          }
          lastScrollY = currentScrollY;
        });
      }
      
      if (config.debugMode) {
        console.log('Exit intent widget initialized with config:', config);
      }
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
.exit-intent-widget-container {
  display: flex;
  gap: 20px;
  height: 100vh;
  overflow: hidden;
}

.exit-intent-settings {
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

.preview-info h4 {
  color: #059669;
  margin-bottom: 10px;
}

.preview-info ul {
  margin: 15px 0;
  padding-left: 20px;
}

.preview-info li {
  margin-bottom: 5px;
  color: #6b7280;
}

.action-preview {
  background: #eff6ff;
  padding: 10px;
  border-radius: 6px;
  margin: 15px 0;
  color: #1e40af;
}

.test-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.test-button:hover {
  background: #2563eb;
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
.form-group select,
.form-group textarea {
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