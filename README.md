# Londeka Zikalala - Portfolio

A modern, interactive portfolio website built with React, featuring smooth animations and engaging user interactions inspired by contemporary design trends.

## Features

- ✨ Interactive project cards with hover effects
- 🎨 Smooth animations using Framer Motion
- 📱 Fully responsive design
- 🎯 Scroll indicators for easy navigation
- 💌 Contact form with backend integration
- 🎭 Beautiful gradient backgrounds with animations

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **Swiper** - Carousel component
- **Axios** - HTTP client

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Move the images folder to public directory:**
   - Create a `public` folder in the root directory if it doesn't exist
   - Move the `images-and-files` folder into the `public` directory
   - The structure should be: `public/images-and-files/`

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx
│   ├── Header.jsx
│   ├── About.jsx
│   ├── Projects.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── ScrollIndicator.jsx
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Color Scheme

- Background: `#fffff8` (cream/off-white)
- Primary Accent: `#FF99C8` (pink)
- Text: `#333` (dark gray)
- Gradients: Purple/pink gradients throughout

## Images

All images are stored in the `images-and-files/` directory. The portfolio uses:
- Original Avatar.png
- b&w avatar.png
- matrix avatar.png
- Various icon images

## Contact Form

The contact form submits to: `https://portfolio-server-yhj6.onrender.com/contact`

## License

© 2024 Londeka Zikalala. All rights reserved.

