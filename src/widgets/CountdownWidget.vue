<template>
  <div class="countdown-widget-container">
    <div class="countdown-settings">
      <h2>Countdown Timer Settings</h2>
      
      <!-- Basic Settings -->
      <div class="settings-section">
        <h3>Timer Configuration</h3>
        <div class="form-group">
          <label>Title:</label>
          <input v-model="widget.title" type="text" placeholder="Limited Time Offer!" />
        </div>
        <div class="form-group">
          <label>Subtitle:</label>
          <input v-model="widget.subtitle" type="text" placeholder="Hurry! This deal expires soon" />
        </div>
        <div class="form-group">
          <label>End Date:</label>
          <input v-model="widget.endDate" type="date" />
        </div>
        <div class="form-group">
          <label>End Time:</label>
          <input v-model="widget.endTime" type="time" />
        </div>
        <div class="form-group">
          <label>Timezone:</label>
          <select v-model="widget.timezone">
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </div>
      </div>

      <!-- Display Options -->
      <div class="settings-section">
        <h3>Display Options</h3>
        <div class="checkbox-group">
          <label><input v-model="widget.showDays" type="checkbox" /> Show Days</label>
          <label><input v-model="widget.showHours" type="checkbox" /> Show Hours</label>
          <label><input v-model="widget.showMinutes" type="checkbox" /> Show Minutes</label>
          <label><input v-model="widget.showSeconds" type="checkbox" /> Show Seconds</label>
        </div>
      </div>

      <!-- Expiration Settings -->
      <div class="settings-section">
        <h3>When Timer Expires</h3>
        <div class="form-group">
          <label>Action:</label>
          <select v-model="widget.onExpire">
            <option value="message">Show Message</option>
            <option value="hide">Hide Widget</option>
            <option value="redirect">Redirect to URL</option>
            <option value="popup">Open Popup</option>
          </select>
        </div>
        <div v-if="widget.onExpire === 'message'" class="form-group">
          <label>Expired Message:</label>
          <input v-model="widget.expiredMessage" type="text" placeholder="This offer has expired" />
        </div>
        <div v-if="widget.onExpire === 'redirect'" class="form-group">
          <label>Redirect URL:</label>
          <input v-model="widget.redirectUrl" type="url" placeholder="https://example.com" />
        </div>
      </div>

      <!-- Style Settings -->
      <div class="settings-section">
        <h3>Styling</h3>
        <div class="form-group">
          <label>Background Color:</label>
          <input v-model="widget.styles.backgroundColor" type="color" />
        </div>
        <div class="form-group">
          <label>Text Color:</label>
          <input v-model="widget.styles.textColor" type="color" />
        </div>
        <div class="form-group">
          <label>Number Color:</label>
          <input v-model="widget.styles.numberColor" type="color" />
        </div>
        <div class="form-group">
          <label>Label Color:</label>
          <input v-model="widget.styles.labelColor" type="color" />
        </div>
        <div class="form-group">
          <label>Font Size:</label>
          <input v-model="widget.styles.fontSize" type="text" placeholder="16px" />
        </div>
        <div class="form-group">
          <label>Font Family:</label>
          <select v-model="widget.styles.fontFamily">
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div class="preview-section">
      <h3>Preview</h3>
      <div v-html="htmlPreview" class="widget-preview"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { CountdownWidget } from '../types/widgets';

const widget = ref<CountdownWidget>({
  id: 'countdown-1',
  type: 'countdown',
  name: 'Countdown Timer',
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
  endTime: '23:59',
  timezone: 'UTC',
  title: 'Limited Time Offer!',
  subtitle: 'Hurry! This deal expires soon',
  expiredMessage: 'This offer has expired',
  showDays: true,
  showHours: true,
  showMinutes: true,
  showSeconds: true,
  onExpire: 'message',
  styles: {
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    numberColor: '#f59e0b',
    labelColor: '#d1d5db',
    borderColor: '#374151',
    borderRadius: '8px',
    fontSize: '16px',
    fontFamily: 'Inter',
    padding: '20px',
    margin: '10px'
  }
});

const htmlPreview = computed(() => {
  const endDateTime = new Date(`${widget.value.endDate}T${widget.value.endTime}`);
  
  return `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=${widget.value.styles.fontFamily}:wght@400;600;700&display=swap');
      
      .countdown-container {
        background-color: ${widget.value.styles.backgroundColor};
        color: ${widget.value.styles.textColor};
        padding: ${widget.value.styles.padding};
        margin: ${widget.value.styles.margin};
        border-radius: ${widget.value.styles.borderRadius};
        text-align: center;
        font-family: '${widget.value.styles.fontFamily}', sans-serif;
        max-width: 600px;
        margin: 0 auto;
      }
      
      .countdown-title {
        font-size: calc(${widget.value.styles.fontSize} * 1.5);
        font-weight: 700;
        margin-bottom: 8px;
      }
      
      .countdown-subtitle {
        font-size: ${widget.value.styles.fontSize};
        margin-bottom: 20px;
        opacity: 0.9;
      }
      
      .countdown-timer {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
      }
      
      .countdown-unit {
        text-align: center;
        min-width: 60px;
      }
      
      .countdown-number {
        display: block;
        font-size: calc(${widget.value.styles.fontSize} * 2);
        font-weight: 700;
        color: ${widget.value.styles.numberColor};
        line-height: 1;
      }
      
      .countdown-label {
        display: block;
        font-size: calc(${widget.value.styles.fontSize} * 0.8);
        color: ${widget.value.styles.labelColor};
        margin-top: 4px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      
      .countdown-expired {
        font-size: calc(${widget.value.styles.fontSize} * 1.2);
        font-weight: 600;
        padding: 20px;
      }
      
      @media (max-width: 768px) {
        .countdown-timer {
          gap: 15px;
        }
        .countdown-unit {
          min-width: 50px;
        }
        .countdown-number {
          font-size: calc(${widget.value.styles.fontSize} * 1.5);
        }
      }
      
      .--mobile .countdown-timer {
        gap: 10px;
      }
      
      .--mobile .countdown-unit {
        min-width: 45px;
      }
    </style>
    
    <div class="countdown-container">
      <div class="countdown-title">${widget.value.title}</div>
      <div class="countdown-subtitle">${widget.value.subtitle}</div>
      <div class="countdown-timer" id="countdown-timer">
        ${widget.value.showDays ? '<div class="countdown-unit"><span class="countdown-number" id="days">00</span><span class="countdown-label">Days</span></div>' : ''}
        ${widget.value.showHours ? '<div class="countdown-unit"><span class="countdown-number" id="hours">00</span><span class="countdown-label">Hours</span></div>' : ''}
        ${widget.value.showMinutes ? '<div class="countdown-unit"><span class="countdown-number" id="minutes">00</span><span class="countdown-label">Minutes</span></div>' : ''}
        ${widget.value.showSeconds ? '<div class="countdown-unit"><span class="countdown-number" id="seconds">00</span><span class="countdown-label">Seconds</span></div>' : ''}
      </div>
      <div class="countdown-expired" id="countdown-expired" style="display: none;">${widget.value.expiredMessage}</div>
    </div>
  `;
});

const jsCode = computed(() => {
  const endDateTime = `${widget.value.endDate}T${widget.value.endTime}`;
  
  return `
    (function() {
      const endDate = new Date('${endDateTime}').getTime();
      const timer = document.getElementById('countdown-timer');
      const expiredDiv = document.getElementById('countdown-expired');
      
      function updateCountdown() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
          // Timer expired
          ${widget.value.onExpire === 'hide' ? 'timer.parentElement.style.display = "none";' : ''}
          ${widget.value.onExpire === 'message' ? 'timer.style.display = "none"; expiredDiv.style.display = "block";' : ''}
          ${widget.value.onExpire === 'redirect' && widget.value.redirectUrl ? `window.location.href = "${widget.value.redirectUrl}";` : ''}
          ${widget.value.onExpire === 'popup' ? 'var event = new Event("customWidgetOpenPopup"); window.dispatchEvent(event);' : ''}
          return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        ${widget.value.showDays ? 'const daysEl = document.getElementById("days"); if (daysEl) daysEl.textContent = days.toString().padStart(2, "0");' : ''}
        ${widget.value.showHours ? 'const hoursEl = document.getElementById("hours"); if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, "0");' : ''}
        ${widget.value.showMinutes ? 'const minutesEl = document.getElementById("minutes"); if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, "0");' : ''}
        ${widget.value.showSeconds ? 'const secondsEl = document.getElementById("seconds"); if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, "0");' : ''}
      }
      
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      
      // Clean up interval when widget is removed
      window.addEventListener('beforeunload', () => clearInterval(interval));
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
.countdown-widget-container {
  display: flex;
  gap: 20px;
  height: 100vh;
  overflow: hidden;
}

.countdown-settings {
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

.widget-preview {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  background: #f9fafb;
}

h2 {
  margin: 0 0 20px 0;
  color: #111827;
  font-size: 24px;
  font-weight: 700;
}
</style> 