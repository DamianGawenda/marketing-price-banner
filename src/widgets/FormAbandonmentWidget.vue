<template>
  <div class="form-abandonment-widget-container">
    <div class="form-abandonment-settings">
      <h2>Form Abandonment Recovery Widget</h2>
      
      <!-- Form Tracking Settings -->
      <div class="settings-section">
        <h3>Form Tracking Configuration</h3>
        <div class="form-group">
          <label>Target Forms:</label>
          <select v-model="widget.targetMode">
            <option value="all">All forms on page</option>
            <option value="specific">Specific form IDs</option>
            <option value="class">Forms with specific class</option>
          </select>
        </div>
        <div v-if="widget.targetMode === 'specific'" class="form-group">
          <label>Form IDs (comma separated):</label>
          <input v-model="widget.formIds" type="text" placeholder="contact-form, signup-form" />
        </div>
        <div v-if="widget.targetMode === 'class'" class="form-group">
          <label>CSS Class:</label>
          <input v-model="widget.formClass" type="text" placeholder="tracked-form" />
        </div>
        <div class="form-group">
          <label>Minimum Fields Filled:</label>
          <input v-model.number="widget.minFieldsFilled" type="number" min="1" max="10" />
          <small>Trigger only after this many fields are filled</small>
        </div>
        <div class="form-group">
          <label>Abandonment Delay (seconds):</label>
          <input v-model.number="widget.abandonmentDelay" type="number" min="5" max="300" />
          <small>Time of inactivity before considering form abandoned</small>
        </div>
      </div>

      <!-- Recovery Actions -->
      <div class="settings-section">
        <h3>Recovery Actions</h3>
        <div class="form-group">
          <label>Primary Recovery Action:</label>
          <select v-model="widget.primaryAction">
            <option value="popup">Show Recovery Popup</option>
            <option value="banner">Show Sticky Banner</option>
            <option value="email-capture">Quick Email Capture</option>
            <option value="discount">Offer Discount</option>
            <option value="callback">Request Callback</option>
          </select>
        </div>
        <div class="form-group">
          <label>Recovery Message:</label>
          <textarea v-model="widget.recoveryMessage" rows="3" 
                    placeholder="Don't lose your progress! Complete your form to get started."></textarea>
        </div>
        <div v-if="widget.primaryAction === 'discount'" class="form-group">
          <label>Discount Offer:</label>
          <input v-model="widget.discountOffer" type="text" placeholder="Get 20% off if you complete now!" />
        </div>
        <div v-if="widget.primaryAction === 'email-capture'" class="form-group">
          <label>Email Capture Text:</label>
          <input v-model="widget.emailCaptureText" type="text" 
                 placeholder="Save your progress - enter your email" />
        </div>
      </div>

      <!-- Advanced Settings -->
      <div class="settings-section">
        <h3>Advanced Options</h3>
        <div class="form-group">
          <label>Recovery Attempts:</label>
          <input v-model.number="widget.maxRecoveryAttempts" type="number" min="1" max="5" />
          <small>Maximum recovery attempts per session</small>
        </div>
        <div class="form-group">
          <label>Retry Delay (minutes):</label>
          <input v-model.number="widget.retryDelay" type="number" min="1" max="60" />
        </div>
        <div class="checkbox-group">
          <label><input v-model="widget.saveFormData" type="checkbox" /> Save form data locally</label>
          <label><input v-model="widget.trackFieldFocus" type="checkbox" /> Track field focus patterns</label>
          <label><input v-model="widget.enableExitIntent" type="checkbox" /> Combine with exit intent</label>
          <label><input v-model="widget.mobileOptimized" type="checkbox" /> Mobile-optimized recovery</label>
        </div>
      </div>

      <!-- Styling -->
      <div class="settings-section">
        <h3>Recovery UI Styling</h3>
        <div class="form-group">
          <label>Theme:</label>
          <select v-model="widget.theme">
            <option value="modern">Modern</option>
            <option value="minimal">Minimal</option>
            <option value="urgent">Urgent</option>
            <option value="friendly">Friendly</option>
          </select>
        </div>
        <div class="form-group">
          <label>Primary Color:</label>
          <input v-model="widget.primaryColor" type="color" />
        </div>
        <div class="form-group">
          <label>Animation Style:</label>
          <select v-model="widget.animationStyle">
            <option value="slide">Slide In</option>
            <option value="fade">Fade In</option>
            <option value="bounce">Bounce</option>
            <option value="shake">Shake</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div class="preview-section">
      <h3>Preview</h3>
      <div class="preview-container">
        <div v-html="htmlPreview" class="widget-preview"></div>
        <div class="recovery-preview">
          <h4>Form Abandonment Recovery Active</h4>
          <ul>
            <li>Tracking: {{ getTrackingDescription() }}</li>
            <li>Trigger: {{ widget.minFieldsFilled }} fields + {{ widget.abandonmentDelay }}s delay</li>
            <li>Action: {{ widget.primaryAction }}</li>
            <li>Max attempts: {{ widget.maxRecoveryAttempts }}</li>
          </ul>
          <button @click="testRecovery" class="test-button">Test Recovery Action</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface FormAbandonmentWidget {
  id: string;
  type: 'form-abandonment';
  name: string;
  targetMode: 'all' | 'specific' | 'class';
  formIds: string;
  formClass: string;
  minFieldsFilled: number;
  abandonmentDelay: number;
  primaryAction: 'popup' | 'banner' | 'email-capture' | 'discount' | 'callback';
  recoveryMessage: string;
  discountOffer: string;
  emailCaptureText: string;
  maxRecoveryAttempts: number;
  retryDelay: number;
  saveFormData: boolean;
  trackFieldFocus: boolean;
  enableExitIntent: boolean;
  mobileOptimized: boolean;
  theme: 'modern' | 'minimal' | 'urgent' | 'friendly';
  primaryColor: string;
  animationStyle: 'slide' | 'fade' | 'bounce' | 'shake';
}

const widget = ref<FormAbandonmentWidget>({
  id: 'form-abandonment-1',
  type: 'form-abandonment',
  name: 'Form Abandonment Recovery Widget',
  targetMode: 'all',
  formIds: '',
  formClass: '',
  minFieldsFilled: 2,
  abandonmentDelay: 30,
  primaryAction: 'popup',
  recoveryMessage: "Don't lose your progress! Complete your form to get started.",
  discountOffer: 'Get 20% off if you complete now!',
  emailCaptureText: 'Save your progress - enter your email',
  maxRecoveryAttempts: 2,
  retryDelay: 5,
  saveFormData: true,
  trackFieldFocus: true,
  enableExitIntent: true,
  mobileOptimized: true,
  theme: 'modern',
  primaryColor: '#3b82f6',
  animationStyle: 'slide'
});

const getTrackingDescription = () => {
  switch (widget.value.targetMode) {
    case 'all': return 'All forms on page';
    case 'specific': return `Forms: ${widget.value.formIds || 'none specified'}`;
    case 'class': return `Class: ${widget.value.formClass || 'none specified'}`;
    default: return 'Not configured';
  }
};

const testRecovery = () => {
  alert(`Recovery action would trigger: ${widget.value.primaryAction}\nMessage: ${widget.value.recoveryMessage}`);
};

const htmlPreview = computed(() => {
  const themeStyles = {
    modern: {
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      text: '#ffffff',
      border: 'none',
      shadow: '0 20px 40px rgba(0,0,0,0.1)'
    },
    minimal: {
      bg: '#ffffff',
      text: '#374151',
      border: '1px solid #e5e7eb',
      shadow: '0 4px 6px rgba(0,0,0,0.05)'
    },
    urgent: {
      bg: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
      text: '#ffffff',
      border: 'none',
      shadow: '0 8px 25px rgba(255,107,107,0.3)'
    },
    friendly: {
      bg: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)',
      text: '#ffffff',
      border: 'none',
      shadow: '0 8px 25px rgba(116,185,255,0.3)'
    }
  };

  const currentTheme = themeStyles[widget.value.theme];

  return `
    <style>
      .form-recovery-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        z-index: 99999;
        display: none;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(4px);
      }
      
      .form-recovery-modal {
        background: ${currentTheme.bg};
        color: ${currentTheme.text};
        padding: 30px;
        border-radius: 16px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        border: ${currentTheme.border};
        box-shadow: ${currentTheme.shadow};
        position: relative;
        animation: recoverySlideIn 0.4s ease-out;
      }
      
      @keyframes recoverySlideIn {
        from {
          opacity: 0;
          transform: translateY(-30px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      @keyframes recoveryShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      
      .form-recovery-title {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 15px;
        line-height: 1.3;
      }
      
      .form-recovery-message {
        font-size: 16px;
        margin-bottom: 25px;
        line-height: 1.5;
        opacity: 0.9;
      }
      
      .form-recovery-actions {
        display: flex;
        gap: 12px;
        justify-content: center;
        flex-wrap: wrap;
      }
      
      .form-recovery-btn {
        background: ${widget.value.primaryColor};
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 14px;
      }
      
      .form-recovery-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      }
      
      .form-recovery-btn.secondary {
        background: transparent;
        color: ${currentTheme.text};
        border: 2px solid ${currentTheme.text === '#ffffff' ? 'rgba(255,255,255,0.3)' : '#e5e7eb'};
      }
      
      .form-recovery-close {
        position: absolute;
        top: 15px;
        right: 15px;
        background: none;
        border: none;
        color: ${currentTheme.text};
        font-size: 24px;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s ease;
      }
      
      .form-recovery-close:hover {
        opacity: 1;
      }
      
      .form-recovery-banner {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: ${currentTheme.bg};
        color: ${currentTheme.text};
        padding: 16px;
        text-align: center;
        border-top: ${currentTheme.border};
        box-shadow: 0 -4px 12px rgba(0,0,0,0.1);
        z-index: 99998;
        display: none;
        animation: recoverySlideUp 0.3s ease-out;
      }
      
      @keyframes recoverySlideUp {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0);
        }
      }
      
      .form-recovery-email-capture {
        display: flex;
        gap: 8px;
        max-width: 300px;
        margin: 15px auto 0;
      }
      
      .form-recovery-email-input {
        flex: 1;
        padding: 10px 12px;
        border: 1px solid rgba(255,255,255,0.3);
        border-radius: 6px;
        background: rgba(255,255,255,0.1);
        color: ${currentTheme.text};
        font-size: 14px;
      }
      
      .form-recovery-email-input::placeholder {
        color: rgba(255,255,255,0.7);
      }
      
      .form-recovery-progress {
        background: rgba(255,255,255,0.2);
        height: 4px;
        border-radius: 2px;
        margin: 15px 0;
        overflow: hidden;
      }
      
      .form-recovery-progress-fill {
        background: ${widget.value.primaryColor};
        height: 100%;
        width: 60%;
        border-radius: 2px;
      }
      
      @media (max-width: 768px) {
        .form-recovery-modal {
          margin: 20px;
          padding: 25px 20px;
        }
        
        .form-recovery-actions {
          flex-direction: column;
        }
        
        .form-recovery-btn {
          width: 100%;
        }
      }
    </style>
    
    <div class="form-recovery-overlay" id="form-recovery-overlay">
      <div class="form-recovery-modal">
        <button class="form-recovery-close" onclick="document.getElementById('form-recovery-overlay').style.display='none'">×</button>
        <div class="form-recovery-title">
          ${widget.value.primaryAction === 'discount' ? '🎉 Special Offer!' : 
            widget.value.primaryAction === 'callback' ? '📞 We Can Help!' :
            widget.value.primaryAction === 'email-capture' ? '💾 Save Your Progress' :
            '⚠️ Don\'t Lose Your Progress!'}
        </div>
        <div class="form-recovery-message">${widget.value.recoveryMessage}</div>
        
        ${widget.value.primaryAction === 'discount' ? `
          <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; margin: 15px 0;">
            <strong>${widget.value.discountOffer}</strong>
          </div>
        ` : ''}
        
        ${widget.value.primaryAction === 'email-capture' ? `
          <div class="form-recovery-email-capture">
            <input type="email" class="form-recovery-email-input" placeholder="Enter your email">
            <button class="form-recovery-btn">Save</button>
          </div>
        ` : ''}
        
        <div class="form-recovery-progress">
          <div class="form-recovery-progress-fill"></div>
        </div>
        
        <div class="form-recovery-actions">
          <button class="form-recovery-btn">
            ${widget.value.primaryAction === 'callback' ? 'Request Callback' :
              widget.value.primaryAction === 'email-capture' ? 'Continue Form' :
              'Complete Form'}
          </button>
          <button class="form-recovery-btn secondary">Maybe Later</button>
        </div>
      </div>
    </div>
    
    <div class="form-recovery-banner" id="form-recovery-banner">
      <div>${widget.value.recoveryMessage}</div>
      <button class="form-recovery-btn" style="margin-top: 8px;">Complete Now</button>
    </div>
  `;
});

const jsCode = computed(() => {
  return `
    (function() {
      const config = {
        targetMode: '${widget.value.targetMode}',
        formIds: '${widget.value.formIds}'.split(',').map(id => id.trim()).filter(Boolean),
        formClass: '${widget.value.formClass}',
        minFieldsFilled: ${widget.value.minFieldsFilled},
        abandonmentDelay: ${widget.value.abandonmentDelay * 1000},
        primaryAction: '${widget.value.primaryAction}',
        maxRecoveryAttempts: ${widget.value.maxRecoveryAttempts},
        retryDelay: ${widget.value.retryDelay * 60 * 1000},
        saveFormData: ${widget.value.saveFormData},
        trackFieldFocus: ${widget.value.trackFieldFocus},
        enableExitIntent: ${widget.value.enableExitIntent},
        mobileOptimized: ${widget.value.mobileOptimized}
      };
      
      let formTracker = {
        forms: [],
        abandonmentTimers: new Map(),
        recoveryAttempts: 0,
        lastActivity: Date.now(),
        fieldsFilled: new Map(),
        formData: new Map(),
        focusPatterns: []
      };
      
      function initializeFormTracking() {
        let targetForms = [];
        
        switch (config.targetMode) {
          case 'all':
            targetForms = Array.from(document.querySelectorAll('form'));
            break;
          case 'specific':
            config.formIds.forEach(id => {
              const form = document.getElementById(id);
              if (form) targetForms.push(form);
            });
            break;
          case 'class':
            if (config.formClass) {
              targetForms = Array.from(document.querySelectorAll('.' + config.formClass));
            }
            break;
        }
        
        targetForms.forEach(form => {
          if (form.tagName === 'FORM') {
            setupFormTracking(form);
          }
        });
        
        console.log('Form abandonment tracking initialized for', targetForms.length, 'forms');
      }
      
      function setupFormTracking(form) {
        const formId = form.id || 'form-' + Math.random().toString(36).substr(2, 9);
        formTracker.fieldsFilled.set(formId, 0);
        formTracker.formData.set(formId, {});
        
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
          // Track field changes
          input.addEventListener('input', (e) => {
            handleFieldChange(formId, input, e.target.value);
          });
          
          input.addEventListener('change', (e) => {
            handleFieldChange(formId, input, e.target.value);
          });
          
          // Track focus patterns
          if (config.trackFieldFocus) {
            input.addEventListener('focus', () => {
              formTracker.focusPatterns.push({
                formId,
                field: input.name || input.type,
                timestamp: Date.now(),
                action: 'focus'
              });
            });
            
            input.addEventListener('blur', () => {
              formTracker.focusPatterns.push({
                formId,
                field: input.name || input.type,
                timestamp: Date.now(),
                action: 'blur'
              });
            });
          }
        });
        
        // Track form submission
        form.addEventListener('submit', () => {
          clearAbandonmentTimer(formId);
          console.log('Form submitted successfully:', formId);
        });
      }
      
      function handleFieldChange(formId, input, value) {
        formTracker.lastActivity = Date.now();
        
        // Update form data
        const formData = formTracker.formData.get(formId) || {};
        const fieldName = input.name || input.type || 'field-' + Math.random().toString(36).substr(2, 5);
        
        const hadValue = formData[fieldName] && formData[fieldName].length > 0;
        const hasValue = value && value.length > 0;
        
        formData[fieldName] = value;
        formTracker.formData.set(formId, formData);
        
        // Update filled fields count
        if (!hadValue && hasValue) {
          const currentCount = formTracker.fieldsFilled.get(formId) || 0;
          formTracker.fieldsFilled.set(formId, currentCount + 1);
        } else if (hadValue && !hasValue) {
          const currentCount = formTracker.fieldsFilled.get(formId) || 0;
          formTracker.fieldsFilled.set(formId, Math.max(0, currentCount - 1));
        }
        
        // Save form data locally
        if (config.saveFormData) {
          localStorage.setItem('form-data-' + formId, JSON.stringify(formData));
        }
        
        // Reset abandonment timer
        clearAbandonmentTimer(formId);
        setAbandonmentTimer(formId);
        
        console.log('Field changed in form', formId, '- Fields filled:', formTracker.fieldsFilled.get(formId));
      }
      
      function setAbandonmentTimer(formId) {
        const timer = setTimeout(() => {
          const fieldsFilled = formTracker.fieldsFilled.get(formId) || 0;
          
          if (fieldsFilled >= config.minFieldsFilled && 
              formTracker.recoveryAttempts < config.maxRecoveryAttempts) {
            triggerRecoveryAction(formId);
          }
        }, config.abandonmentDelay);
        
        formTracker.abandonmentTimers.set(formId, timer);
      }
      
      function clearAbandonmentTimer(formId) {
        const timer = formTracker.abandonmentTimers.get(formId);
        if (timer) {
          clearTimeout(timer);
          formTracker.abandonmentTimers.delete(formId);
        }
      }
      
      function triggerRecoveryAction(formId) {
        if (formTracker.recoveryAttempts >= config.maxRecoveryAttempts) {
          console.log('Max recovery attempts reached');
          return;
        }
        
        formTracker.recoveryAttempts++;
        console.log('Triggering recovery action:', config.primaryAction, 'for form:', formId);
        
        switch (config.primaryAction) {
          case 'popup':
            showRecoveryModal();
            break;
          case 'banner':
            showRecoveryBanner();
            break;
          case 'email-capture':
            showEmailCapture();
            break;
          case 'discount':
            showDiscountOffer();
            break;
          case 'callback':
            showCallbackRequest();
            break;
        }
        
        // Schedule retry if configured
        if (formTracker.recoveryAttempts < config.maxRecoveryAttempts) {
          setTimeout(() => {
            setAbandonmentTimer(formId);
          }, config.retryDelay);
        }
      }
      
      function showRecoveryModal() {
        const overlay = document.getElementById('form-recovery-overlay');
        if (overlay) {
          overlay.style.display = 'flex';
          
          // Add click handlers
          const completeBtn = overlay.querySelector('.form-recovery-btn:not(.secondary)');
          const laterBtn = overlay.querySelector('.form-recovery-btn.secondary');
          
          if (completeBtn) {
            completeBtn.addEventListener('click', () => {
              overlay.style.display = 'none';
              // Focus on first empty field
              focusFirstEmptyField();
            });
          }
          
          if (laterBtn) {
            laterBtn.addEventListener('click', () => {
              overlay.style.display = 'none';
            });
          }
        }
      }
      
      function showRecoveryBanner() {
        const banner = document.getElementById('form-recovery-banner');
        if (banner) {
          banner.style.display = 'block';
          
          const btn = banner.querySelector('.form-recovery-btn');
          if (btn) {
            btn.addEventListener('click', () => {
              banner.style.display = 'none';
              focusFirstEmptyField();
            });
          }
        }
      }
      
      function showEmailCapture() {
        showRecoveryModal();
        // Additional email capture logic would go here
      }
      
      function showDiscountOffer() {
        showRecoveryModal();
        // Additional discount logic would go here
      }
      
      function showCallbackRequest() {
        // Could trigger GHL popup or custom callback form
        var event = new Event('customWidgetOpenPopup');
        window.dispatchEvent(event);
      }
      
      function focusFirstEmptyField() {
        const forms = document.querySelectorAll('form');
        for (let form of forms) {
          const inputs = form.querySelectorAll('input, textarea, select');
          for (let input of inputs) {
            if (!input.value || input.value.trim() === '') {
              input.focus();
              return;
            }
          }
        }
      }
      
      // Exit intent integration
      if (config.enableExitIntent) {
        document.addEventListener('mouseleave', (e) => {
          if (e.clientY <= 5 && formTracker.recoveryAttempts < config.maxRecoveryAttempts) {
            // Check if any form has enough fields filled
            for (let [formId, fieldCount] of formTracker.fieldsFilled) {
              if (fieldCount >= config.minFieldsFilled) {
                triggerRecoveryAction(formId);
                break;
              }
            }
          }
        });
      }
      
      // Initialize tracking when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeFormTracking);
      } else {
        initializeFormTracking();
      }
      
      // Re-initialize if new forms are added dynamically
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              const forms = node.tagName === 'FORM' ? [node] : node.querySelectorAll('form');
              forms.forEach(setupFormTracking);
            }
          });
        });
      });
      
      observer.observe(document.body, { childList: true, subtree: true });
      
      console.log('Form abandonment recovery widget initialized');
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
.form-abandonment-widget-container {
  display: flex;
  gap: 20px;
  height: 100vh;
  overflow: hidden;
}

.form-abandonment-settings {
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

.recovery-preview {
  margin-top: 20px;
  padding: 15px;
  background: #fef3c7;
  border-radius: 6px;
  border: 1px solid #f59e0b;
}

.recovery-preview h4 {
  margin: 0 0 10px 0;
  color: #92400e;
}

.recovery-preview ul {
  margin: 10px 0;
  padding-left: 20px;
}

.recovery-preview li {
  margin-bottom: 5px;
  color: #78350f;
}

.test-button {
  background: #f59e0b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 10px;
}

.test-button:hover {
  background: #d97706;
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