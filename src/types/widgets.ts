// Widget Types for GoHighLevel
export interface BaseWidget {
  id: string;
  type: string;
  name: string;
}

// Countdown Timer Widget
export interface CountdownWidget extends BaseWidget {
  type: 'countdown';
  endDate: string;
  endTime: string;
  timezone: string;
  title: string;
  subtitle: string;
  expiredMessage: string;
  showDays: boolean;
  showHours: boolean;
  showMinutes: boolean;
  showSeconds: boolean;
  onExpire: 'hide' | 'redirect' | 'popup' | 'message';
  redirectUrl?: string;
  styles: {
    backgroundColor: string;
    textColor: string;
    numberColor: string;
    labelColor: string;
    borderColor: string;
    borderRadius: string;
    fontSize: string;
    fontFamily: string;
    padding: string;
    margin: string;
  };
}

// Social Proof Widget
export interface SocialProofWidget extends BaseWidget {
  type: 'social-proof';
  notifications: Array<{
    id: string;
    customerName: string;
    action: string;
    product: string;
    location: string;
    timeAgo: string;
    avatar?: string;
  }>;
  displayDuration: number;
  intervalBetween: number;
  position: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  showAvatar: boolean;
  showLocation: boolean;
  maxNotifications: number;
  styles: {
    backgroundColor: string;
    textColor: string;
    borderColor: string;
    borderRadius: string;
    fontSize: string;
    fontFamily: string;
    shadow: string;
  };
}

// Progress Bar Widget
export interface ProgressBarWidget extends BaseWidget {
  type: 'progress-bar';
  currentValue: number;
  maxValue: number;
  title: string;
  subtitle: string;
  showPercentage: boolean;
  showNumbers: boolean;
  animationDuration: number;
  styles: {
    backgroundColor: string;
    fillColor: string;
    textColor: string;
    borderColor: string;
    borderRadius: string;
    height: string;
    fontSize: string;
    fontFamily: string;
  };
}

// Testimonial Carousel Widget
export interface TestimonialWidget extends BaseWidget {
  type: 'testimonial';
  testimonials: Array<{
    id: string;
    name: string;
    title: string;
    company: string;
    content: string;
    rating: number;
    avatar?: string;
  }>;
  autoPlay: boolean;
  autoPlayInterval: number;
  showDots: boolean;
  showArrows: boolean;
  showRating: boolean;
  styles: {
    backgroundColor: string;
    textColor: string;
    nameColor: string;
    titleColor: string;
    borderColor: string;
    borderRadius: string;
    fontSize: string;
    fontFamily: string;
    padding: string;
  };
}

// Call-to-Action Banner Widget
export interface CTABannerWidget extends BaseWidget {
  type: 'cta-banner';
  headline: string;
  subheadline: string;
  buttonText: string;
  buttonAction: string;
  buttonType: 'link' | 'popup' | 'next-step';
  showCloseButton: boolean;
  position: 'top' | 'bottom' | 'floating';
  styles: {
    backgroundColor: string;
    textColor: string;
    buttonBgColor: string;
    buttonTextColor: string;
    borderColor: string;
    borderRadius: string;
    fontSize: string;
    fontFamily: string;
    padding: string;
  };
}

// FAQ Accordion Widget
export interface FAQWidget extends BaseWidget {
  type: 'faq';
  title: string;
  faqs: Array<{
    id: string;
    question: string;
    answer: string;
    isOpen: boolean;
  }>;
  allowMultipleOpen: boolean;
  styles: {
    backgroundColor: string;
    textColor: string;
    questionColor: string;
    answerColor: string;
    borderColor: string;
    borderRadius: string;
    fontSize: string;
    fontFamily: string;
    padding: string;
  };
}

// Exit Intent Widget
export interface ExitIntentWidget extends BaseWidget {
  type: 'exit-intent';
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

// Scroll Depth Analytics Widget
export interface ScrollDepthWidget extends BaseWidget {
  type: 'scroll-depth';
  milestones: number[];
  engagementThreshold: number;
  trackTimeOnPage: boolean;
  trackReadingSpeed: boolean;
  trackBounceRate: boolean;
  triggers: Array<{
    scrollDepth: number;
    action: 'popup' | 'next-step' | 'show-element' | 'send-event';
    elementId?: string;
    eventName?: string;
    delay: number;
    onlyOnce: boolean;
  }>;
  displayMode: 'hidden' | 'progress-bar' | 'reading-time' | 'engagement-score';
  position: 'top' | 'bottom' | 'floating';
  showToAdmin: boolean;
}

// Form Abandonment Recovery Widget
export interface FormAbandonmentWidget extends BaseWidget {
  type: 'form-abandonment';
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

export type Widget = CountdownWidget | SocialProofWidget | ProgressBarWidget | TestimonialWidget | CTABannerWidget | FAQWidget | ExitIntentWidget | ScrollDepthWidget | FormAbandonmentWidget; 