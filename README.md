# CompliQ: Accessibility Compliance Simulator

> **Simulate. Debug. Fix. Build Accessible Web Experiences.**

CompliQ is an open-source accessibility simulator designed for frontend developers to **visualize and debug accessibility issues in real-time**. From color-blindness simulations to keyboard-only navigation overlays, CompliQ helps you build inclusive web apps with confidence.

---

## Features

- Real-time color-blindness simulation (Protanopia, Deuteranopia, Tritanopia)
- Keyboard-only navigation highlighting
- Screen reader output preview
- Low vision simulation
- Contrast issue detection
- Accessibility scorecard
- Fix suggestions for color, ARIA, and semantic issues

## Documentation

For complete documentation, visit [CompliQ Documentation](https://deepwiki.com/RgnDunes/CompliQ).

---

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/compliq.git
cd compliq

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Testing

```bash
# Run tests
npm test
```

---

## Usage

1. Visit the homepage to view available simulations
2. Select a simulation type (Color Blindness, Keyboard Navigation, etc.)
3. Enter a URL to analyze or use the demo page
4. View the simulation and accessibility suggestions
5. Make improvements based on the findings

---

## Simulations

### Color Blindness

Visualize how your website appears to users with various types of color blindness.

### Keyboard Navigation

Experience how keyboard-only users navigate through your interface, highlighting focus issues.

### Screen Reader

Preview how screen readers interpret your content and identify missing accessibility attributes.

### Low Vision

Simulate low vision conditions to ensure your content is readable at various zoom levels.

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Acknowledgements

- [Axe Core](https://github.com/dequelabs/axe-core) for accessibility testing
- [Color Blind](https://github.com/skratchdot/color-blind) for color blindness simulations

---

## Live Demo

Visit the live demo at [https://rgndunes.github.io/CompliQ](https://rgndunes.github.io/CompliQ)

---

## Deployment

### GitHub Pages

CompliQ is configured for easy deployment to GitHub Pages:

```bash
# Deploy to GitHub Pages
npm run deploy
```

This will build the project and publish it to the `gh-pages` branch, which will automatically deploy to GitHub Pages.

For automated deployments, a GitHub Actions workflow is included in `.github/workflows/deploy.yml` that will deploy to GitHub Pages whenever changes are pushed to the main branch.

---
