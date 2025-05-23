<template>
  <div class="cta-banner-widget-container">
    <div class="cta-banner-settings">
      <h2>CTA Banner Widget Settings</h2>
      
      <!-- Content Settings -->
      <div class="settings-section">
        <h3>Content</h3>
        <div class="form-group">
          <label>Headline:</label>
          <input v-model="widget.headline" type="text" placeholder="Don't Miss Out! Limited Time Offer" />
        </div>
        <div class="form-group">
          <label>Subheadline:</label>
          <input v-model="widget.subheadline" type="text" placeholder="Get 50% off our premium course - expires in 24 hours!" />
        </div>
        <div class="form-group">
          <label>Button Text:</label>
          <input v-model="widget.buttonText" type="text" placeholder="Claim Your Discount" />
        </div>
        <div class="form-group">
          <label>Button Action:</label>
          <select v-model="widget.buttonType">
            <option value="link">Open Link</option>
            <option value="popup">Open Popup</option>
            <option value="next-step">Go to Next Step</option>
          </select>
        </div>
        <div v-if="widget.buttonType === 'link'" class="form-group">
          <label>Button URL:</label>
          <input v-model="widget.buttonAction" type="url" placeholder="https://example.com/offer" />
        </div>
      </div>

      <!-- Position Settings -->
      <div class="settings-section">
        <h3>Position & Behavior</h3>
        <div class="form-group">
          <label>Position:</label>
          <select v-model="widget.position">
            <option value="top">Top of Page</option>
            <option value="bottom">Bottom of Page</option>
            <option value="floating">Floating</option>
          </select>
        </div>
        <div class="checkbox-group">
          <label><input v-model="widget.showCloseButton" type="checkbox" /> Show Close Button</label>
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
          <label>Button Background Color:</label>
          <input v-model="widget.styles.buttonBgColor" type="color" />
        </div>
        <div class="form-group">
          <label>Button Text Color:</label>
          <input v-model="widget.styles.buttonTextColor" type="color" />
        </div>
        <div class="form-group">
          <label>Border Color:</label>
          <input v-model="widget.styles.borderColor" type="color" />
        </div>
        <div class="form-group">
          <label>Border Radius:</label>
          <input v-model="widget.styles.borderRadius" type="text" placeholder="8px" />
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
        <div class="form-group">
          <label>Padding:</label>
          <input v-model="widget.styles.padding" type="text" placeholder="20px" />
        </div>
      </div>
    </div>

    <!-- Preview -->
    <div class="preview-section">
      <h3>Preview</h3>
      <div class="preview-container">
        <div v-html="htmlPreview" class="widget-preview"></div>
        <p class="preview-note">Note: The banner will appear in the selected position on the actual page.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { CTABannerWidget } from '../types/widgets';

const widget = ref<CTABannerWidget>({
  id: 'cta-banner-1',
  type: 'cta-banner',
  name: 'CTA Banner Widget',
  headline: "Don't Miss Out! Limited Time Offer",
  subheadline: "Get 50% off our premium course - expires in 24 hours!",
  buttonText: "Claim Your Discount",
  buttonAction: "https://example.com/offer",
  buttonType: 'link',
  showCloseButton: true,
  position: 'top',
  styles: {
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    buttonBgColor: '#f59e0b',
    buttonTextColor: '#000000',
    borderColor: '#374151',
    borderRadius: '0px',
    fontSize: '16px',
    fontFamily: 'Inter',
    padding: '16px'
  }
});

const htmlPreview = computed(() => {
  const positionStyles = {
    'top': 'position: fixed; top: 0; left: 0; right: 0; z-index: 9999;',
    'bottom': 'position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999;',
    'floating': 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; max-width: 400px;'
  };

  return `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=${widget.value.styles.fontFamily}:wght@400;500;600;700&display=swap');
      
      .cta-banner-container {
        ${positionStyles[widget.value.position]}
        background-color: ${widget.value.styles.backgroundColor};
        color: ${widget.value.styles.textColor};
        padding: ${widget.value.styles.padding};
        border-radius: ${widget.value.styles.borderRadius};
        font-family: '${widget.value.styles.fontFamily}', sans-serif;
        font-size: ${widget.value.styles.fontSize};
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        ${widget.value.position === 'floating' ? 'border: 1px solid ' + widget.value.styles.borderColor + ';' : ''}
      }
      
      .cta-banner-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        max-width: 1200px;
        margin: 0 auto;
        flex-wrap: wrap;
      }
      
      .cta-banner-text {
        flex: 1;
        min-width: 300px;
      }
      
      .cta-banner-headline {
        font-size: calc(${widget.value.styles.fontSize} * 1.25);
        font-weight: 700;
        margin: 0 0 4px 0;
        line-height: 1.2;
      }
      
      .cta-banner-subheadline {
        font-size: ${widget.value.styles.fontSize};
        margin: 0;
        opacity: 0.9;
        line-height: 1.4;
      }
      
      .cta-banner-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }
      
      .cta-banner-button {
        background-color: ${widget.value.styles.buttonBgColor};
        color: ${widget.value.styles.buttonTextColor};
        border: none;
        padding: 12px 24px;
        border-radius: calc(${widget.value.styles.borderRadius} / 2);
        font-size: ${widget.value.styles.fontSize};
        font-weight: 600;
        font-family: '${widget.value.styles.fontFamily}', sans-serif;
        cursor: pointer;
        transition: all 0.2s ease;
        text-decoration: none;
        display: inline-block;
        text-align: center;
        white-space: nowrap;
      }
      
      .cta-banner-button:hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      .cta-banner-close {
        background: none;
        border: none;
        color: ${widget.value.styles.textColor};
        font-size: 20px;
        cursor: pointer;
        padding: 4px;
        opacity: 0.7;
        transition: opacity 0.2s ease;
        line-height: 1;
      }
      
      .cta-banner-close:hover {
        opacity: 1;
      }
      
      @media (max-width: 768px) {
        .cta-banner-content {
          flex-direction: column;
          text-align: center;
          gap: 16px;
        }
        
        .cta-banner-text {
          min-width: auto;
        }
        
        .cta-banner-headline {
          font-size: calc(${widget.value.styles.fontSize} * 1.1);
        }
        
        .cta-banner-button {
          padding: 10px 20px;
          font-size: calc(${widget.value.styles.fontSize} * 0.9);
        }
        
        .cta-banner-container {
          padding: calc(${widget.value.styles.padding} * 0.75);
        }
      }
      
      .--mobile .cta-banner-content {
        flex-direction: column;
        gap: 12px;
      }
      
      .--mobile .cta-banner-button {
        width: 100%;
        max-width: 280px;
      }
    </style>
    
    <div class="cta-banner-container" id="cta-banner">
      <div class="cta-banner-content">
        <div class="cta-banner-text">
          <div class="cta-banner-headline">${widget.value.headline}</div>
          <div class="cta-banner-subheadline">${widget.value.subheadline}</div>
        </div>
        <div class="cta-banner-actions">
          <button class="cta-banner-button" id="cta-banner-button">${widget.value.buttonText}</button>
          ${widget.value.showCloseButton ? '<button class="cta-banner-close" id="cta-banner-close">×</button>' : ''}
        </div>
      </div>
    </div>
  `;
});

const jsCode = computed(() => {
  return `
    (function() {
      const banner = document.getElementById('cta-banner');
      const button = document.getElementById('cta-banner-button');
      const closeButton = document.getElementById('cta-banner-close');
      
      // Button click handler
      if (button) {
        button.addEventListener('click', function() {
          ${widget.value.buttonType === 'link' && widget.value.buttonAction ? 
            `window.open('${widget.value.buttonAction}', '_blank');` : 
            widget.value.buttonType === 'popup' ? 
            'var event = new Event("customWidgetOpenPopup"); window.dispatchEvent(event);' :
            widget.value.buttonType === 'next-step' ?
            'var event = new Event("customWidgetGoToNextStep"); window.dispatchEvent(event);' : ''
          }
        });
      }
      
      // Close button handler
      if (closeButton) {
        closeButton.addEventListener('click', function() {
          banner.style.display = 'none';
          // Store in localStorage to remember user closed it
          localStorage.setItem('cta-banner-closed-${widget.value.id}', 'true');
        });
      }
      
      // Check if user previously closed the banner
      if (localStorage.getItem('cta-banner-closed-${widget.value.id}') === 'true') {
        banner.style.display = 'none';
      }
      
      // Add body padding to prevent content overlap for fixed positioned banners
      if (banner && (banner.style.position === 'fixed')) {
        const bannerHeight = banner.offsetHeight;
        const position = '${widget.value.position}';
        
        if (position === 'top') {
          document.body.style.paddingTop = bannerHeight + 'px';
        } else if (position === 'bottom') {
          document.body.style.paddingBottom = bannerHeight + 'px';
        }
        
        // Remove padding when banner is closed
        if (closeButton) {
          closeButton.addEventListener('click', function() {
            if (position === 'top') {
              document.body.style.paddingTop = '0px';
            } else if (position === 'bottom') {
              document.body.style.paddingBottom = '0px';
            }
          });
        }
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
.cta-banner-widget-container {
  display: flex;
  gap: 20px;
  height: 100vh;
  overflow: hidden;
}

.cta-banner-settings {
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
  position: relative;
  height: 400px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
  overflow: hidden;
}

.preview-note {
  margin-top: 10px;
  font-size: 12px;
  color: #6b7280;
  font-style: italic;
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

h2 {
  margin: 0 0 20px 0;
  color: #111827;
  font-size: 24px;
  font-weight: 700;
}
</style> 