# NHS EHR Frontend - Atomic Design System

A comprehensive Electronic Health Record (EHR) system built with React, NHS.UK Frontend, and Atomic Design methodology.

## 🧩 Atomic Design Structure

This project follows Atomic Design methodology for better component organization, reusability, and maintainability.

### Atoms (`/components/atoms/`)
The smallest, most basic UI elements:
- **Button** - NHS.UK compliant buttons with variants (primary, secondary, warning)
- **Input** - Form input fields with accessibility features
- **Label** - Semantic form labels with proper associations
- **Text** - Typography components (headings, body text, captions)
- **Icon** - SVG icons with NHS.UK styling

### Molecules (`/components/molecules/`)
Groups of atoms functioning together:
- **FormField** - Complete form field with label, input, hint, and error states
- **Card** - NHS.UK card component with optional clickable variants
- **SearchBox** - Search input with submit button and accessibility features
- **MenuItem** - Navigation menu items with proper ARIA attributes

### Organisms (`/components/organisms/`)
Complex components made of molecules and atoms:
- **Header** - Complete page header with NHS logo, navigation, and search
- **LoginForm** - Full login form with demo accounts and validation

### Templates (`/components/templates/`)
Page-level layouts:
- **MainLayout** - Standard application layout with header
- **AuthLayout** - Authentication pages layout

## 🎯 NHS.UK Frontend Integration

- ✅ **Accessible forms** with proper labeling and ARIA attributes
- ✅ **WCAG 2.1 AA compliant** color contrast and focus indicators
- ✅ **Screen reader optimized** with visually hidden labels and descriptions
- ✅ **Keyboard navigation** support for all interactive elements
- ✅ **Mobile-first responsive** design with NHS.UK breakpoints

## 📦 Component Usage

Import components from their atomic level or use the main index:

```typescript
// Atomic level imports
import { Button, Input, Text } from '../components/atoms';
import { FormField, Card } from '../components/molecules';
import { Header, LoginForm } from '../components/organisms';
import { MainLayout } from '../components/templates';

// Or from main components index
import { Button, FormField, Header, MainLayout } from '../components';
```

Example usage:

```tsx
// Basic form field
<FormField
  id="email"
  name="email"
  label="Email address"
  hint="Enter your NHS email address"
  type="email"
  required
/>

// NHS.UK compliant button
<Button variant="primary" type="submit">
  Sign in
</Button>

// Complete layout
<MainLayout headerProps={{ accountText: "Dr. Smith" }}>
  <YourPageContent />
</MainLayout>
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone and navigate to the project:
   ```bash
   git clone <repository-url>
   cd j-vaka-ehr/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3001](http://localhost:3001) to view the application.

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/              # Basic UI elements
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Text/
│   │   ├── Icon/
│   │   └── index.ts
│   ├── molecules/          # Groups of atoms
│   │   ├── FormField/
│   │   ├── Card/
│   │   ├── SearchBox/
│   │   ├── MenuItem/
│   │   └── index.ts
│   ├── organisms/          # Complex components
│   │   ├── Header/
│   │   ├── LoginForm/
│   │   └── index.ts
│   ├── templates/          # Page layouts
│   │   ├── MainLayout/
│   │   ├── AuthLayout/
│   │   └── index.ts
│   └── index.ts           # Main exports
├── pages/                 # Page components
├── contexts/              # React contexts
└── styles/               # Global styles
```

## 🛠 Available Scripts

- `npm start` - Development server (runs on port 3001)
- `npm run build` - Production build
- `npm test` - Run tests
- `npm run lint` - Lint code (if configured)

## 🏗 Technologies Used

- **React 18** - Frontend framework with TypeScript
- **NHS.UK Frontend 9.3.0** - Official NHS design system
- **Atomic Design** - Component architecture methodology
- **Sass** - CSS preprocessing for NHS.UK styles
- **Create React App** - Build tooling and development server

## ♿ Accessibility Features

- Semantic HTML structure with proper roles and landmarks
- ARIA labels, descriptions, and live regions
- Keyboard navigation with proper focus management
- High contrast colors meeting WCAG AA standards
- Screen reader compatible with descriptive text
- Form validation with accessible error messages

## 🔄 Benefits of Atomic Design

- **Reusability**: Components can be reused across different contexts
- **Consistency**: Design system ensures uniform look and feel
- **Maintainability**: Changes cascade appropriately through the hierarchy
- **Testability**: Each atomic level can be tested independently
- **Scalability**: Easy to add new components following established patterns
- **Documentation**: Clear component hierarchy and usage patterns

## 📋 Component Guidelines

1. **Atoms** should be pure, stateless, and highly reusable
2. **Molecules** should combine atoms with specific functionality
3. **Organisms** should handle complex interactions and state
4. **Templates** should define page structure without content
5. All components should follow NHS.UK Frontend patterns
6. Include proper TypeScript interfaces and accessibility attributes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch following atomic design principles
3. Ensure components follow NHS.UK accessibility guidelines
4. Add proper TypeScript types and documentation
5. Test components across different screen sizes
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.