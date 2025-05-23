<template>
  <div class="social-proof-widget-container">
    <div class="social-proof-settings">
      <h2>Social Proof Widget Settings</h2>
      
      <!-- Notifications Management -->
      <div class="settings-section">
        <h3>Customer Notifications</h3>
        <div class="notifications-list">
          <div v-for="(notification, index) in widget.notifications" :key="notification.id" class="notification-item">
            <div class="notification-header">
              <h4>Notification {{ index + 1 }}</h4>
              <button @click="removeNotification(index)" class="remove-btn">Remove</button>
            </div>
            <div class="form-group">
              <label>Customer Name:</label>
              <input v-model="notification.customerName" type="text" placeholder="John D." />
            </div>
            <div class="form-group">
              <label>Action:</label>
              <select v-model="notification.action">
                <option value="purchased">purchased</option>
                <option value="signed up for">signed up for</option>
                <option value="downloaded">downloaded</option>
                <option value="joined">joined</option>
                <option value="booked">booked</option>
              </select>
            </div>
            <div class="form-group">
              <label>Product/Service:</label>
              <input v-model="notification.product" type="text" placeholder="Premium Course" />
            </div>
            <div class="form-group">
              <label>Location:</label>
              <input v-model="notification.location" type="text" placeholder="New York, NY" />
            </div>
            <div class="form-group">
              <label>Time Ago:</label>
              <input v-model="notification.timeAgo" type="text" placeholder="2 minutes ago" />
            </div>
          </div>
        </div>
        <button @click="addNotification" class="add-btn">Add Notification</button>
      </div>

      <!-- Display Settings -->
      <div class="settings-section">
        <h3>Display Settings</h3>
        <div class="form-group">
          <label>Position:</label>
          <select v-model="widget.position">
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-right">Bottom Right</option>
            <option value="top-left">Top Left</option>
            <option value="top-right">Top Right</option>
          </select>
        </div>
        <div class="form-group">
          <label>Display Duration (seconds):</label>
          <input v-model.number="widget.displayDuration" type="number" min="1" max="10" />
        </div>
        <div class="form-group">
          <label>Interval Between Notifications (seconds):</label>
          <input v-model.number="widget.intervalBetween" type="number" min="1" max="30" />
        </div>
        <div class="form-group">
          <label>Max Notifications to Show:</label>
          <input v-model.number="widget.maxNotifications" type="number" min="1" max="10" />
        </div>
        <div class="checkbox-group">
          <label><input v-model="widget.showLocation" type="checkbox" /> Show Location</label>
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
          <label>Border Color:</label>
          <input v-model="widget.styles.borderColor" type="color" />
        </div>
        <div class="form-group">
          <label>Border Radius:</label>
          <input v-model="widget.styles.borderRadius" type="text" placeholder="8px" />
        </div>
        <div class="form-group">
          <label>Font Size:</label>
          <input v-model="widget.styles.fontSize" type="text" placeholder="14px" />
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
      <div class="preview-container">
        <div v-html="htmlPreview" class="widget-preview"></div>
        <p class="preview-note">Note: In the actual funnel, notifications will appear one at a time in the selected position.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { SocialProofWidget } from '../types/widgets';

const widget = ref<SocialProofWidget>({
  id: 'social-proof-1',
  type: 'social-proof',
  name: 'Social Proof Widget',
  notifications: [
    {
      id: '1',
      customerName: 'Sarah M.',
      action: 'purchased',
      product: 'Premium Course',
      location: 'New York, NY',
      timeAgo: '2 minutes ago'
    },
    {
      id: '2',
      customerName: 'Mike R.',
      action: 'signed up for',
      product: 'Free Webinar',
      location: 'Los Angeles, CA',
      timeAgo: '5 minutes ago'
    },
    {
      id: '3',
      customerName: 'Jennifer L.',
      action: 'downloaded',
      product: 'Free Guide',
      location: 'Chicago, IL',
      timeAgo: '8 minutes ago'
    }
  ],
  displayDuration: 4,
  intervalBetween: 6,
  position: 'bottom-left',
  showAvatar: false,
  showLocation: true,
  maxNotifications: 5,
  styles: {
    backgroundColor: '#ffffff',
    textColor: '#374151',
    borderColor: '#e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'Inter',
    shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  }
});

const addNotification = () => {
  const newId = (widget.value.notifications.length + 1).toString();
  widget.value.notifications.push({
    id: newId,
    customerName: 'New Customer',
    action: 'purchased',
    product: 'Product Name',
    location: 'City, State',
    timeAgo: '1 minute ago'
  });
};

const removeNotification = (index: number) => {
  widget.value.notifications.splice(index, 1);
};

const htmlPreview = computed(() => {
  const positionStyles = {
    'bottom-left': 'bottom: 20px; left: 20px;',
    'bottom-right': 'bottom: 20px; right: 20px;',
    'top-left': 'top: 20px; left: 20px;',
    'top-right': 'top: 20px; right: 20px;'
  };

  return `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=${widget.value.styles.fontFamily}:wght@400;500;600&display=swap');
      
      .social-proof-container {
        position: fixed;
        ${positionStyles[widget.value.position]}
        z-index: 9999;
        max-width: 320px;
        font-family: '${widget.value.styles.fontFamily}', sans-serif;
      }
      
      .social-proof-notification {
        background-color: ${widget.value.styles.backgroundColor};
        color: ${widget.value.styles.textColor};
        border: 1px solid ${widget.value.styles.borderColor};
        border-radius: ${widget.value.styles.borderRadius};
        padding: 12px 16px;
        margin-bottom: 8px;
        box-shadow: ${widget.value.styles.shadow};
        font-size: ${widget.value.styles.fontSize};
        line-height: 1.4;
        opacity: 0;
        transform: translateX(-100%);
        transition: all 0.3s ease-in-out;
        cursor: pointer;
      }
      
      .social-proof-notification.show {
        opacity: 1;
        transform: translateX(0);
      }
      
      .social-proof-notification.hide {
        opacity: 0;
        transform: translateX(-100%);
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .notification-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 12px;
        flex-shrink: 0;
      }
      
      .notification-text {
        flex: 1;
      }
      
      .notification-main {
        font-weight: 500;
        margin-bottom: 2px;
      }
      
      .notification-meta {
        font-size: calc(${widget.value.styles.fontSize} * 0.85);
        opacity: 0.7;
      }
      
      .notification-close {
        background: none;
        border: none;
        color: ${widget.value.styles.textColor};
        opacity: 0.5;
        cursor: pointer;
        padding: 0;
        margin-left: 8px;
        font-size: 16px;
        line-height: 1;
      }
      
      .notification-close:hover {
        opacity: 1;
      }
      
      @media (max-width: 768px) {
        .social-proof-container {
          max-width: 280px;
          left: 10px !important;
          right: 10px !important;
        }
        
        .social-proof-notification {
          padding: 10px 12px;
          font-size: calc(${widget.value.styles.fontSize} * 0.9);
        }
      }
      
      .--mobile .social-proof-container {
        max-width: 260px;
      }
    </style>
    
    <div class="social-proof-container" id="social-proof-container">
      <!-- Notifications will be dynamically inserted here -->
    </div>
  `;
});

const jsCode = computed(() => {
  const notifications = widget.value.notifications.slice(0, widget.value.maxNotifications);
  
  return `
    (function() {
      const notifications = ${JSON.stringify(notifications)};
      const container = document.getElementById('social-proof-container');
      const displayDuration = ${widget.value.displayDuration * 1000};
      const intervalBetween = ${widget.value.intervalBetween * 1000};
      const showLocation = ${widget.value.showLocation};
      
      let currentIndex = 0;
      let isShowing = false;
      
      function createNotificationElement(notification) {
        const div = document.createElement('div');
        div.className = 'social-proof-notification';
        
        const initials = notification.customerName.split(' ').map(n => n[0]).join('').toUpperCase();
        
        div.innerHTML = \`
          <div class="notification-content">
            <div class="notification-avatar">\${initials}</div>
            <div class="notification-text">
              <div class="notification-main">
                <strong>\${notification.customerName}</strong> \${notification.action} <strong>\${notification.product}</strong>
              </div>
              <div class="notification-meta">
                \${showLocation ? notification.location + ' • ' : ''}\${notification.timeAgo}
              </div>
            </div>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
          </div>
        \`;
        
        return div;
      }
      
      function showNotification() {
        if (isShowing || notifications.length === 0) return;
        
        isShowing = true;
        const notification = notifications[currentIndex];
        const element = createNotificationElement(notification);
        
        container.appendChild(element);
        
        // Trigger show animation
        setTimeout(() => {
          element.classList.add('show');
        }, 100);
        
        // Hide after display duration
        setTimeout(() => {
          element.classList.add('hide');
          setTimeout(() => {
            if (element.parentNode) {
              element.remove();
            }
            isShowing = false;
          }, 300);
        }, displayDuration);
        
        currentIndex = (currentIndex + 1) % notifications.length;
      }
      
      // Start showing notifications
      if (notifications.length > 0) {
        showNotification();
        setInterval(showNotification, intervalBetween);
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
.social-proof-widget-container {
  display: flex;
  gap: 20px;
  height: 100vh;
  overflow: hidden;
}

.social-proof-settings {
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

.notifications-list {
  margin-bottom: 15px;
}

.notification-item {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 15px;
  background: #f9fafb;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.notification-header h4 {
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

.remove-btn:hover {
  background: #dc2626;
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

.add-btn:hover {
  background: #2563eb;
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