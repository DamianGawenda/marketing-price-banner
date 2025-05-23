# GoHighLevel Widget Collection

A comprehensive collection of customizable web widgets designed specifically for GoHighLevel funnels and marketing pages. These widgets help increase conversions, build trust, and create urgency in your marketing campaigns.

## 🚀 Available Widgets

### 1. **Countdown Timer Widget** ⏰
Create urgency with customizable countdown timers for limited-time offers.

**Features:**
- Customizable end date and time with timezone support
- Show/hide days, hours, minutes, seconds
- Multiple expiration actions (hide, redirect, popup, message)
- Fully customizable styling
- Mobile responsive
- Integrates with GHL popup and next-step events

**Use Cases:**
- Limited-time offers
- Product launches
- Webinar registration deadlines
- Flash sales

### 2. **Social Proof Widget** 👥
Display recent customer activity to build trust and encourage conversions.

**Features:**
- Multiple notification management
- Customizable customer actions (purchased, signed up, downloaded, etc.)
- Position control (corners of screen)
- Timing controls (display duration, intervals)
- Location display toggle
- Smooth animations
- Mobile optimized

**Use Cases:**
- E-commerce stores
- Course sales
- Service bookings
- Lead generation

### 3. **CTA Banner Widget** 📢
Eye-catching banners to promote offers and drive immediate action.

**Features:**
- Multiple positioning options (top, bottom, floating)
- Customizable headlines and subheadlines
- Button actions (link, popup, next-step)
- Close button with localStorage memory
- Responsive design
- Auto body padding adjustment

**Use Cases:**
- Special promotions
- Newsletter signups
- Product announcements
- Exit-intent offers

### 4. **Pricing Table Widget** 💰 *(Original)*
Display pricing plans with features comparison to drive conversions.

**Features:**
- Multiple pricing plans
- Feature comparison with checkmarks/crosses
- "Most Popular" highlighting
- Customizable styling and fonts
- Mobile responsive grid
- Button actions for each plan

### 5. **Progress Bar Widget** 📊 *(Coming Soon)*
Show progress towards goals, fundraising targets, or course completion.

### 6. **Exit Intent Trigger Widget** 🚪 *(New!)*
Detect when users are about to leave and trigger smart recovery actions.

**Features:**
- Mouse movement detection (cursor toward close button)
- Configurable sensitivity levels
- Time on page and scroll depth requirements
- Multiple action types (popup, redirect, discount, message)
- Mobile-friendly exit detection
- Session memory to avoid spam
- Debug mode for testing

**Use Cases:**
- Exit-intent popups
- Last-chance offers
- Email capture before leaving
- Discount code reveals
- Callback request triggers

### 7. **Scroll Depth Analytics Widget** 📊 *(New!)*
Track user engagement and trigger actions based on scroll behavior.

**Features:**
- Customizable scroll milestones
- Reading time calculation
- Engagement scoring
- Action triggers at specific depths
- Progress bar display options
- Admin analytics panel
- Bounce rate tracking
- Reading speed analysis

**Use Cases:**
- Content engagement tracking
- Progressive disclosure
- Scroll-triggered offers
- Reading analytics
- User behavior insights

### 8. **Form Abandonment Recovery Widget** 📝 *(New!)*
Detect form abandonment and trigger smart recovery actions.

**Features:**
- Multi-form tracking support
- Field-level progress monitoring
- Smart abandonment detection
- Recovery action triggers
- Form data preservation
- Focus pattern analysis
- Exit intent integration
- Mobile-optimized recovery

**Use Cases:**
- Lead capture optimization
- Form completion rates
- Progress saving
- Smart reminders
- Conversion recovery

### 9. **FAQ Accordion Widget** ❓ *(Coming Soon)*
Collapsible FAQ sections to address common questions and concerns.

## 🛠️ Technical Implementation

### GoHighLevel Integration

Each widget follows the GHL widget specification:

```javascript
// Required functions for GHL integration
createHtml() // Returns HTML with embedded CSS
createJS()   // Returns JavaScript for widget functionality
createCss()  // Returns CSS (embedded in HTML)
```

### Event Integration

Widgets support GHL-specific events:

```javascript
// Open popup in funnel
var event = new Event('customWidgetOpenPopup');
window.dispatchEvent(event);

// Go to next step in funnel
var event = new Event('customWidgetGoToNextStep');
window.dispatchEvent(event);
```

### Mobile Compatibility

All widgets include:
- Responsive CSS with mobile breakpoints
- GHL mobile mode support with `.--mobile` prefix
- Touch-friendly interactions
- Optimized layouts for small screens

## 🎨 Customization Features

### Universal Styling Options
- **Colors**: Background, text, borders, buttons
- **Typography**: Font family, size, weight
- **Spacing**: Padding, margins, border radius
- **Layout**: Positioning, alignment, sizing

### Widget-Specific Options
Each widget includes unique customization options relevant to its functionality.

## 📱 Mobile Optimization

All widgets are designed with mobile-first principles:
- Responsive layouts that adapt to screen size
- Touch-friendly button sizes
- Optimized font sizes for mobile reading
- GHL mobile mode compatibility

## 🔧 Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📦 Project Structure

```
src/
├── components/
│   ├── WidgetSelector.vue    # Main widget selection interface
│   └── Setting.vue          # Original pricing table settings
├── widgets/
│   ├── CountdownWidget.vue      # Countdown timer implementation
│   ├── SocialProofWidget.vue    # Social proof notifications
│   ├── CTABannerWidget.vue      # Call-to-action banners
│   ├── ExitIntentWidget.vue     # Exit intent detection & recovery
│   ├── ScrollDepthWidget.vue    # Scroll analytics & triggers
│   └── FormAbandonmentWidget.vue # Form abandonment recovery
├── types/
│   └── widgets.ts           # TypeScript interfaces
├── composition/
│   ├── usePostmate.ts       # GHL communication
│   └── useTranspiler.ts     # HTML/CSS/JS generation
└── utils/
    └── theme.ts             # UI theme configuration
```

## 🚀 Deployment to GHL Marketplace

### Prerequisites
1. Register as a developer on the GHL App Marketplace
2. Create a new app in the marketplace
3. Build your widget application

### Build Process
```bash
# Build the project
npm run build

# The dist/ folder contains your widget files
# Upload as a zip to the GHL marketplace
```

### Marketplace Requirements
- ✅ No external scripts (unless intended)
- ✅ Mobile responsive design
- ✅ No disruption to builder functionality
- ✅ Consistent state management
- ✅ Proper initial state display
- ✅ All settings functional

## 🎯 Widget Benefits for Marketers

### Conversion Optimization
- **Countdown Timers**: Create urgency and scarcity
- **Social Proof**: Build trust through customer activity
- **CTA Banners**: Drive immediate action
- **Pricing Tables**: Clear value proposition

### User Experience
- **Mobile Optimized**: Works perfectly on all devices
- **Fast Loading**: Lightweight and optimized code
- **Customizable**: Match your brand perfectly
- **Professional**: High-quality, modern designs

### Marketing Psychology
- **Urgency**: Countdown timers create FOMO
- **Social Proof**: Reduces buyer hesitation
- **Clear CTAs**: Guides user actions
- **Trust Building**: Professional appearance

## 📈 Performance Features

- **Lightweight**: Minimal code footprint
- **Fast Rendering**: Optimized CSS and JavaScript
- **Memory Efficient**: Proper cleanup and event handling
- **SEO Friendly**: Semantic HTML structure

## 🔒 Privacy & Security

- **No External Calls**: All code runs locally
- **localStorage**: Respects user preferences
- **Clean Code**: No malicious scripts
- **GDPR Compliant**: No tracking without consent

## 📞 Support & Documentation

For detailed implementation guides and support:
- Check the [GHL Developer Documentation](https://help.gohighlevel.com/support/solutions/articles/155000003915-developer-guide-for-selling-web-widgets-on-the-app-marketplace)
- Review widget-specific configuration options
- Test thoroughly before marketplace submission

## 🤝 Contributing

This is a template for creating GHL widgets. Feel free to:
- Add new widget types
- Improve existing widgets
- Enhance mobile responsiveness
- Add new customization options

## 📄 License

This project is open source and available under the MIT License.
