---
name: SkillPulse Intelligence
colors:
  surface: '#051424'
  surface-dim: '#051424'
  surface-bright: '#2c3a4c'
  surface-container-lowest: '#010f1f'
  surface-container-low: '#0d1c2d'
  surface-container: '#122131'
  surface-container-high: '#1c2b3c'
  surface-container-highest: '#273647'
  on-surface: '#d4e4fa'
  on-surface-variant: '#c6c6cd'
  inverse-surface: '#d4e4fa'
  inverse-on-surface: '#233143'
  outline: '#909097'
  outline-variant: '#45464d'
  surface-tint: '#bec6e0'
  primary: '#bec6e0'
  on-primary: '#283044'
  primary-container: '#0f172a'
  on-primary-container: '#798098'
  inverse-primary: '#565e74'
  secondary: '#44e2cd'
  on-secondary: '#003731'
  secondary-container: '#03c6b2'
  on-secondary-container: '#004d44'
  tertiary: '#c0c1ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#050060'
  on-tertiary-container: '#6d70fb'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#62fae3'
  secondary-fixed-dim: '#3cddc7'
  on-secondary-fixed: '#00201c'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#051424'
  on-background: '#d4e4fa'
  surface-variant: '#273647'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-md-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

The design system is engineered for high-density data interpretation and executive-level decision-making. It adopts a **Modern Corporate** aesthetic infused with **Subtle Glassmorphism** to distinguish AI-generated insights from static historical data. 

The visual language communicates authority and precision through a "Data-First" philosophy. It balances the cold, analytical nature of market statistics with vibrant, "living" accents that represent the kinetic nature of the modern workforce. The emotional response should be one of clarity, confidence, and foresight.

Key stylistic pillars include:
- **Clarity over Decoration:** Whitespace is used as a functional tool to separate complex data modules.
- **Layered Intelligence:** AI components utilize translucent backgrounds to feel "elevated" above the standard UI plane.
- **Precision Engineering:** Sharp geometric alignments and consistent stroke weights reflect technical accuracy.

## Colors

The palette is optimized for a dark-mode default to reduce eye strain during prolonged data analysis. 

- **Primary (Deep Navy):** Used for the foundation, sidebars, and deep backgrounds to establish trust and stability.
- **Secondary (Vibrant Teal):** Represents "Pulse" and "Growth." Used for primary actions, success indicators, and positive market trends.
- **Tertiary (Indigo):** Reserved for AI-driven features, machine learning insights, and predictive trajectories.
- **Data Visualization Tiers:**
    - **Success:** High-saturation emerald for met benchmarks.
    - **Gap:** Soft crimson for skill shortages and risks.
    - **Demand:** Warm amber for emerging market opportunities.
- **Neutrals:** A range of cool grays (Slate/Zinc) to provide high-contrast legibility for labels and metadata.

## Typography

This design system utilizes **Inter** for its exceptional legibility in dashboard environments and high x-height, which aids readability on mobile screens. 

**JetBrains Mono** is introduced as a secondary functional font for numerical data, skill tags, and "raw" AI confidence scores, reinforcing the technical and precise nature of the platform.

- **Headlines:** Use tight letter spacing and semi-bold weights to maintain a strong hierarchy.
- **Body:** Standardized at 16px for comfortable reading of long-form market reports.
- **Data Labels:** Always use the monospaced font variant when displaying percentages, currency, or growth rates to ensure column alignment in tables.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for desktop and a **4-column fluid grid** for mobile. 

A **4px baseline grid** governs all vertical rhythm. Spacing is intentionally generous around AI insights to prevent cognitive overload, while data tables use "Compact" spacing (8px cell padding) to maximize information density.

- **Mobile Reflow:** On small screens, sidebars collapse into a bottom navigation bar. Data cards stack vertically, with secondary metrics hidden behind a horizontal swipe "carousel" within the card itself.
- **Margins:** 20px safe areas on mobile; 48px to 64px on desktop to maintain a premium feel.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** rather than traditional heavy shadows.

- **Level 0 (Base):** Deep Navy (#0F172A).
- **Level 1 (Cards/Surface):** Slate-900 with a subtle 1px border (#1E293B).
- **Level 2 (AI Insight Layer):** Glassmorphism effect. Use `backdrop-filter: blur(12px)` with a 10% opacity Indigo tint. This layer "floats" above the data.
- **Borders:** Instead of shadows, use "Inner Glow" borders (0.5px white at 10% opacity) on the top and left edges of cards to simulate a light source from the top-left, creating a sophisticated, etched look.

## Shapes

The shape language is **Refined and Professional (Soft)**. 

- **Standard Components:** 4px (0.25rem) radius for input fields, buttons, and skill tags. This maintains a sharp, analytical feel.
- **Insight Cards:** 8px (0.5rem) radius to differentiate "Calculated Insights" from raw data blocks.
- **Selection Indicators:** Use "Pill" shapes only for status badges (e.g., "Trending", "High Demand") to distinguish them from functional buttons.

## Components

### Buttons & Inputs
- **Primary Button:** Solid Teal (#2DD4BF) with dark text. No gradient. High-contrast hover state (slight brightness increase).
- **AI Action Button:** Indigo outline with a subtle inner glow.
- **Inputs:** Dark background (#0F172A) with a 1px Slate border. On focus, the border transitions to Teal with a 2px outer glow.

### AI Insight Cards
- Feature a gradient border-image using the Indigo-to-Teal spectrum.
- Include a "Confidence Score" gauge in the top-right corner using the monospaced font.
- Background uses the glassmorphic blur defined in the Elevation section.

### Data Visualization Markers
- **Trend Lines:** 2px stroke width. Use Teal for positive, Rose for negative.
- **Gap Indicators:** Dotted borders signify "missing" or "needed" data/skills.
- **Skill Chips:** Small, 4px rounded boxes with the secondary color as a subtle 10% background tint and 100% opacity text.

### Mobile Navigation
- **Persistent Bottom Bar:** Features high-contrast icons with a "Teal Dot" indicator above the active state. 
- **Sheet Pattern:** Complex filters should emerge from a bottom drawer (Sheet) to keep the thumb-zone accessible.