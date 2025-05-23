<template>
  <div class="widget-selector-container">
    <div v-if="!selectedWidget" class="widget-gallery">
      <h1>Choose Your Widget</h1>
      <p class="subtitle">Select a widget type to customize for your GoHighLevel funnel</p>
      
      <div class="widget-grid">
        <!-- Pricing Table Widget -->
        <div class="widget-card" @click="selectWidget('pricing')">
          <div class="widget-icon">💰</div>
          <h3>Pricing Table</h3>
          <p>Display pricing plans with features comparison to drive conversions</p>
          <div class="widget-preview-img">
            <div class="mini-pricing-preview">
              <div class="mini-plan">
                <div class="mini-plan-name">Basic</div>
                <div class="mini-plan-price">$29</div>
                <div class="mini-plan-features">
                  <div class="mini-feature">✓ Feature 1</div>
                  <div class="mini-feature">✓ Feature 2</div>
                </div>
              </div>
              <div class="mini-plan popular">
                <div class="mini-plan-name">Pro</div>
                <div class="mini-plan-price">$99</div>
                <div class="mini-plan-features">
                  <div class="mini-feature">✓ Feature 1</div>
                  <div class="mini-feature">✓ Feature 2</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Countdown Timer Widget -->
        <div class="widget-card" @click="selectWidget('countdown')">
          <div class="widget-icon">⏰</div>
          <h3>Countdown Timer</h3>
          <p>Create urgency with customizable countdown timers for limited-time offers</p>
          <div class="widget-preview-img">
            <div class="mini-countdown-preview">
              <div class="mini-countdown-title">Limited Time Offer!</div>
              <div class="mini-countdown-timer">
                <div class="mini-time-unit">
                  <div class="mini-time-number">05</div>
                  <div class="mini-time-label">Days</div>
                </div>
                <div class="mini-time-unit">
                  <div class="mini-time-number">12</div>
                  <div class="mini-time-label">Hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Proof Widget -->
        <div class="widget-card" @click="selectWidget('social-proof')">
          <div class="widget-icon">👥</div>
          <h3>Social Proof</h3>
          <p>Show recent customer activity to build trust and encourage conversions</p>
          <div class="widget-preview-img">
            <div class="mini-social-proof-preview">
              <div class="mini-notification">
                <div class="mini-avatar">JD</div>
                <div class="mini-notification-text">
                  <div><strong>John D.</strong> purchased Premium Course</div>
                  <div class="mini-meta">2 minutes ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Banner Widget -->
        <div class="widget-card" @click="selectWidget('cta-banner')">
          <div class="widget-icon">📢</div>
          <h3>CTA Banner</h3>
          <p>Eye-catching banners to promote offers and drive immediate action</p>
          <div class="widget-preview-img">
            <div class="mini-cta-preview">
              <div class="mini-cta-text">
                <div class="mini-cta-headline">Don't Miss Out!</div>
                <div class="mini-cta-sub">Limited time offer</div>
              </div>
              <div class="mini-cta-button">Get Started</div>
            </div>
          </div>
        </div>

        <!-- Progress Bar Widget -->
        <div class="widget-card" @click="selectWidget('progress-bar')">
          <div class="widget-icon">📊</div>
          <h3>Progress Bar</h3>
          <p>Show progress towards goals, fundraising targets, or course completion</p>
          <div class="widget-preview-img">
            <div class="mini-progress-preview">
              <div class="mini-progress-title">Goal Progress</div>
              <div class="mini-progress-bar">
                <div class="mini-progress-fill" style="width: 75%"></div>
              </div>
              <div class="mini-progress-text">75% Complete</div>
            </div>
          </div>
        </div>

        <!-- FAQ Widget -->
        <div class="widget-card" @click="selectWidget('faq')">
          <div class="widget-icon">❓</div>
          <h3>FAQ Accordion</h3>
          <p>Collapsible FAQ sections to address common questions and concerns</p>
          <div class="widget-preview-img">
            <div class="mini-faq-preview">
              <div class="mini-faq-item">
                <div class="mini-faq-question">What's included? ▼</div>
              </div>
              <div class="mini-faq-item">
                <div class="mini-faq-question">How does it work? ▼</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Exit Intent Widget -->
        <div class="widget-card" @click="selectWidget('exit-intent')">
          <div class="widget-icon">🚪</div>
          <h3>Exit Intent Trigger</h3>
          <p>Detect when users are about to leave and trigger recovery actions</p>
          <div class="widget-preview-img">
            <div class="mini-exit-intent-preview">
              <div class="mini-cursor">🖱️</div>
              <div class="mini-exit-text">Exit detected!</div>
              <div class="mini-exit-action">→ Trigger Action</div>
            </div>
          </div>
        </div>

        <!-- Scroll Depth Analytics Widget -->
        <div class="widget-card" @click="selectWidget('scroll-depth')">
          <div class="widget-icon">📊</div>
          <h3>Scroll Analytics</h3>
          <p>Track user engagement and trigger actions based on scroll behavior</p>
          <div class="widget-preview-img">
            <div class="mini-scroll-analytics-preview">
              <div class="mini-scroll-bar">
                <div class="mini-scroll-fill" style="width: 60%"></div>
              </div>
              <div class="mini-scroll-stats">60% • 2m 15s</div>
            </div>
          </div>
        </div>

        <!-- Form Abandonment Recovery Widget -->
        <div class="widget-card" @click="selectWidget('form-abandonment')">
          <div class="widget-icon">📝</div>
          <h3>Form Recovery</h3>
          <p>Detect form abandonment and trigger smart recovery actions</p>
          <div class="widget-preview-img">
            <div class="mini-form-recovery-preview">
              <div class="mini-form">
                <div class="mini-form-field filled"></div>
                <div class="mini-form-field filled"></div>
                <div class="mini-form-field empty"></div>
              </div>
              <div class="mini-recovery-popup">💾 Save progress?</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Widget Configuration -->
    <div v-else class="widget-configuration">
      <div class="widget-header">
        <button @click="goBack" class="back-button">← Back to Widgets</button>
        <h2>{{ getWidgetTitle(selectedWidget) }}</h2>
      </div>
      
      <!-- Dynamic Widget Component -->
      <component :is="getWidgetComponent(selectedWidget)" @codeChange="handleCodeChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CountdownWidget from '../widgets/CountdownWidget.vue';
import SocialProofWidget from '../widgets/SocialProofWidget.vue';
import CTABannerWidget from '../widgets/CTABannerWidget.vue';
import ExitIntentWidget from '../widgets/ExitIntentWidget.vue';
import ScrollDepthWidget from '../widgets/ScrollDepthWidget.vue';
import FormAbandonmentWidget from '../widgets/FormAbandonmentWidget.vue';
// Import other widgets as they're created

const selectedWidget = ref<string | null>(null);

const selectWidget = (widgetType: string) => {
  selectedWidget.value = widgetType;
};

const goBack = () => {
  selectedWidget.value = null;
};

const getWidgetTitle = (type: string) => {
  const titles = {
    'pricing': 'Pricing Table Widget',
    'countdown': 'Countdown Timer Widget',
    'social-proof': 'Social Proof Widget',
    'cta-banner': 'CTA Banner Widget',
    'progress-bar': 'Progress Bar Widget',
    'faq': 'FAQ Accordion Widget',
    'exit-intent': 'Exit Intent Trigger Widget',
    'scroll-depth': 'Scroll Depth Analytics Widget',
    'form-abandonment': 'Form Abandonment Recovery Widget'
  };
  return titles[type] || 'Widget Configuration';
};

const getWidgetComponent = (type: string) => {
  const components = {
    'countdown': CountdownWidget,
    'social-proof': SocialProofWidget,
    'cta-banner': CTABannerWidget,
    'exit-intent': ExitIntentWidget,
    'scroll-depth': ScrollDepthWidget,
    'form-abandonment': FormAbandonmentWidget,
    // Add other components as they're created
  };
  return components[type];
};

// Emit code changes to parent (for GHL integration)
const emit = defineEmits(['codeChange']);

const handleCodeChange = (codeData: any) => {
  emit('codeChange', codeData);
};
</script>

<style scoped>
.widget-selector-container {
  min-height: 100vh;
  background: #f9fafb;
}

.widget-gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.widget-gallery h1 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.subtitle {
  text-align: center;
  font-size: 1.125rem;
  color: #6b7280;
  margin-bottom: 40px;
}

.widget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
  margin-top: 40px;
}

.widget-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.widget-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #3b82f6;
}

.widget-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.widget-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
}

.widget-card p {
  color: #6b7280;
  line-height: 1.5;
  margin-bottom: 16px;
}

.widget-preview-img {
  height: 120px;
  background: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

/* Mini Preview Styles */
.mini-pricing-preview {
  display: flex;
  gap: 8px;
  scale: 0.7;
}

.mini-plan {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 12px;
  text-align: center;
  min-width: 80px;
}

.mini-plan.popular {
  border-color: #3b82f6;
  background: #eff6ff;
}

.mini-plan-name {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 4px;
}

.mini-plan-price {
  font-weight: 700;
  font-size: 14px;
  color: #3b82f6;
  margin-bottom: 6px;
}

.mini-feature {
  font-size: 10px;
  margin-bottom: 2px;
}

.mini-countdown-preview {
  text-align: center;
  scale: 0.8;
}

.mini-countdown-title {
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 8px;
  color: #111827;
}

.mini-countdown-timer {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.mini-time-unit {
  text-align: center;
}

.mini-time-number {
  background: #1f2937;
  color: white;
  padding: 4px 6px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 14px;
}

.mini-time-label {
  font-size: 10px;
  margin-top: 2px;
  color: #6b7280;
}

.mini-social-proof-preview {
  scale: 0.8;
}

.mini-notification {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mini-avatar {
  width: 24px;
  height: 24px;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: 600;
}

.mini-notification-text {
  font-size: 10px;
}

.mini-meta {
  color: #6b7280;
  font-size: 9px;
}

.mini-cta-preview {
  background: #1f2937;
  color: white;
  padding: 12px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 12px;
  scale: 0.8;
}

.mini-cta-headline {
  font-weight: 600;
  font-size: 12px;
}

.mini-cta-sub {
  font-size: 10px;
  opacity: 0.8;
}

.mini-cta-button {
  background: #f59e0b;
  color: black;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
  white-space: nowrap;
}

.mini-progress-preview {
  text-align: center;
  scale: 0.8;
  width: 120px;
}

.mini-progress-title {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
}

.mini-progress-bar {
  background: #e5e7eb;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}

.mini-progress-fill {
  background: #3b82f6;
  height: 100%;
  transition: width 0.3s ease;
}

.mini-progress-text {
  font-size: 10px;
  color: #6b7280;
}

.mini-faq-preview {
  scale: 0.8;
  width: 140px;
}

.mini-faq-item {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 6px 8px;
  margin-bottom: 4px;
}

.mini-faq-question {
  font-size: 10px;
  font-weight: 500;
}

.mini-exit-intent-preview {
  text-align: center;
  scale: 0.8;
}

.mini-cursor {
  font-size: 16px;
  margin-bottom: 4px;
}

.mini-exit-text {
  font-size: 10px;
  font-weight: 600;
  color: #ef4444;
  margin-bottom: 4px;
}

.mini-exit-action {
  font-size: 9px;
  color: #3b82f6;
  font-weight: 500;
}

.mini-scroll-analytics-preview {
  text-align: center;
  scale: 0.8;
  width: 100px;
}

.mini-scroll-bar {
  background: #e5e7eb;
  height: 6px;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.mini-scroll-fill {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  height: 100%;
  transition: width 0.3s ease;
}

.mini-scroll-stats {
  font-size: 9px;
  color: #6b7280;
  font-weight: 500;
}

.mini-form-recovery-preview {
  scale: 0.8;
  position: relative;
}

.mini-form {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 6px;
}

.mini-form-field {
  height: 4px;
  border-radius: 2px;
  margin-bottom: 3px;
}

.mini-form-field.filled {
  background: #10b981;
}

.mini-form-field.empty {
  background: #e5e7eb;
}

.mini-recovery-popup {
  background: #fef3c7;
  border: 1px solid #f59e0b;
  border-radius: 4px;
  padding: 4px 6px;
  font-size: 8px;
  font-weight: 600;
  color: #92400e;
  text-align: center;
}

.widget-configuration {
  min-height: 100vh;
}

.widget-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.back-button {
  background: #f3f4f6;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  color: #374151;
  transition: background-color 0.2s ease;
}

.back-button:hover {
  background: #e5e7eb;
}

.widget-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
}

@media (max-width: 768px) {
  .widget-grid {
    grid-template-columns: 1fr;
  }
  
  .widget-gallery {
    padding: 20px;
  }
  
  .widget-gallery h1 {
    font-size: 2rem;
  }
}
</style> 