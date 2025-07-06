# Vanilla JavaScript Single Page Application (SPA) Template

This repository contains a flexible and lightweight single-page application (SPA) template built using pure HTML, CSS, and vanilla JavaScript. This SPA template helps you quickly set up a modern website without complex frameworks or build tools.

## How It Works

Instead of loading separate HTML pages, the application loads different sections dynamically. Here's the breakdown:

### HTML Structure

The main content of the site is placed within `<section>` elements inside a single `<main>` tag. Each section represents a different "page" or view:

```html
<main id="main-content">
    <section id="home" class="content-section active-section">
        <!-- Home page content -->
    </section>
    <section id="how-it-works" class="content-section">
        <!-- How It Works content -->
    </section>
    <!-- Add additional sections as needed -->
</main>
```

### JavaScript Navigation

Navigation between sections is handled via JavaScript. Clicking a navigation link triggers the following:

1. **Prevents default anchor behavior**.
2. **Reads the target section** from the clicked navigation link's `data-section` attribute.
3. **Updates visibility** by removing the `active-section` class from the currently visible section and applying it to the selected section.
4. **Smoothly scrolls** the viewport back to the top for a clean user experience.

Example JavaScript snippet:

```javascript
const showSection = (targetId) => {
    contentSections.forEach(section => {
        if (section.id === targetId) {
            section.classList.remove('hidden');
            section.classList.add('active-section');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            section.classList.add('hidden');
            section.classList.remove('active-section');
        }
    });
    setActiveLink(targetId);
};
```

## Template Features

### Components

* **Content Cards**: Pre-built and styled content cards for displaying images, text, and action buttons.
* **Interactive Elements**: Includes examples like a random text generator button.
* **Modal Dialogs**: Fully accessible modals that can be triggered from any element.

### Customization

The template is easily customizable:

* **Color Scheme**: Adjust CSS variables in `style.css`.
* **Adding Sections**: Quickly add new sections/pages by editing the HTML and JavaScript automatically picks them up.
* **Interactive Content**: Modify JavaScript arrays to customize generated content.

## Directory Structure

```
site/
├── index.html
├── script.js
└── style.css
```

## Getting Started

1. Clone the repository:

```sh
git clone [your-repo-url]
```

2. Open `index.html` in your preferred browser.

3. Start customizing your SPA according to the guidance in the HTML and JS comments.

## Browser Compatibility

Fully compatible with all modern browsers including Chrome, Firefox, Safari, and Edge.

## License
Personal use. 
---
p e a c e
