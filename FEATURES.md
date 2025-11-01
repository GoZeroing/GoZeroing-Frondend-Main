# GoZeroing - Feature Documentation

## ✨ Implemented Features

### 1. **Professional Logo Design**
- Custom SVG logo with gradient effects
- Geometric precision design representing "zero"
- Primary color: `#20b8cd` with gradient variations
- Scalable and crisp at all resolutions

### 2. **Sidebar Navigation**
- **Width**: 72px fixed
- **Background**: `#0f0f0f` (darker than main background)
- **Icons**: 
  - Home (active state)
  - Discover
  - Library
  - Finance
  - Bell (Alerts)
  - User (Account)
  - LogOut (Upgrade)
  - HelpCircle (Help)
- **New Chat Button**: Plus icon with hover effects
- **Active State**: Primary color background with glow

### 3. **Advanced Search Input**
- **Container**: Rounded 2xl with dynamic focus ring
- **Background**: `#2d2d2d`
- **Focus State**: Primary color ring with 50% opacity
- **Icons**:
  - Search icon (left)
  - Image upload icon
  - Focus selector (NEW - with dropdown)
  - Attach file icon
  - Code snippet icon
  - Microphone icon
  - Submit arrow (right)
- **Placeholder**: "Ask anything. Type @ for mentions."
- **Submit Button**: Activates when text is entered

### 4. **Focus Selector (Radio Panel) - NEW**
- **Trigger Button**: 
  - Focus icon with label
  - Dropdown chevron with rotation animation
  - Transparent background with hover effect
- **Dropdown Panel**:
  - Width: 288px (72 * 4)
  - Background: `#1f1f1f`
  - Border: `#333`
  - Rounded corners: 8px
  - Shadow: 2xl for depth
  - Fade-in animation
- **Options**:
  - Writing
  - Wolfram
  - YouTube
  - Reddit
  - Academic
- **Radio Buttons**:
  - Size: 14px (3.5 * 4)
  - Border: 1.5px
  - Active state: Primary color with inner dot
  - Inactive state: Gray border
- **Interactions**:
  - Click outside to close
  - Hover effects on options
  - Selected state with primary background
  - Clear selection footer button

### 5. **Category Pills**
- **Pills**:
  - Parenting (Baby icon)
  - Troubleshoot (Wrench icon)
  - Perplexity 101 (Sparkles icon)
  - Health (Heart icon)
  - Learn (Lightbulb icon)
- **Styling**:
  - Background: `#2d2d2d`
  - Border: `#333`
  - Rounded: Full (pill shape)
  - Horizontal scroll with hidden scrollbar
  - Hover effects with color transitions

### 6. **Dark Theme**
- **Background**: `#1a1a1a`
- **Secondary**: `#2d2d2d`
- **Primary**: `#20b8cd`
- **Border**: `#333333`
- **Text**: `#ffffff`
- **Gray shades**: 300, 400, 500, 600

### 7. **Typography**
- **Font**: Inter (Google Fonts)
- **Weights**: Regular (400), Medium (500), Semibold (600)
- **Sizes**: 
  - 10px (category labels)
  - 11px (descriptions)
  - 12px (small text)
  - 13px (option labels)
  - 15px (input text)
  - 20px (logo text)

### 8. **Animations & Transitions**
- **Duration**: 200ms (standard)
- **Easing**: ease-in-out, ease-out
- **Effects**:
  - Fade-in for dropdowns
  - Rotation for chevrons
  - Color transitions on hover
  - Scale effects on buttons

### 9. **Accessibility**
- **ARIA Labels**: All interactive elements
- **Keyboard Navigation**: Tab support
- **Focus Indicators**: Visible focus rings
- **Screen Reader**: Semantic HTML

### 10. **Responsive Design**
- **Max Width**: 768px (3xl) for search container
- **Flex Layout**: Sidebar + Main content
- **Overflow**: Hidden on body, auto on main
- **Scrollbar**: Custom styled

## 🎯 Quality Standards

### Code Quality
- ✅ TypeScript for type safety
- ✅ ESLint configuration
- ✅ Modular component structure
- ✅ Reusable utility functions
- ✅ Clean, readable code

### Design Quality
- ✅ Pixel-perfect implementation
- ✅ Consistent spacing (4px grid)
- ✅ Professional color palette
- ✅ Smooth animations
- ✅ Enterprise-grade UI

### Performance
- ✅ Next.js 14 optimization
- ✅ Client-side rendering where needed
- ✅ Efficient re-renders
- ✅ Minimal bundle size
- ✅ Fast page loads

## 🚀 Technical Stack

- **Framework**: Next.js 14.2.5
- **Language**: TypeScript 5.5.4
- **Styling**: Tailwind CSS 3.4.7
- **Icons**: Lucide React 0.424.0
- **Font**: Inter (Google Fonts)
- **Build Tool**: Turbopack (Next.js)

## 📦 Components

1. **Logo.tsx** - Standalone logo component
2. **LogoText.tsx** - Logo with text branding
3. **Sidebar.tsx** - Navigation sidebar
4. **SearchInput.tsx** - Advanced search input
5. **FocusSelector.tsx** - Radio panel for focus mode (NEW)
6. **CategoryPills.tsx** - Category selection chips

## 🎨 Design Tokens

```typescript
colors: {
  background: "#1a1a1a",
  foreground: "#ffffff",
  primary: {
    DEFAULT: "#20b8cd",
    hover: "#1a9fb3",
  },
  secondary: {
    DEFAULT: "#2d2d2d",
    hover: "#3a3a3a",
  },
  border: "#333333",
}
```

## 📝 Usage

```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Lint
npm run lint
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Proprietary - All rights reserved
