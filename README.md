# Wordle Game Clone

A modern implementation of the popular word-guessing game Wordle, built with React, TypeScript, and Vite. This project features a clean, responsive design with a dark theme interface.

<img width="1470" alt="Screenshot 2025-04-14 at 10 32 31" src="https://github.com/user-attachments/assets/e2f9efb8-4cda-4af7-a127-a62e43bbb109" />

## Features

- Classic Wordle gameplay with 6 attempts to guess a 5-letter word
- Dark theme UI with GitHub-inspired color scheme
- Virtual keyboard with color-coded feedback
- Fully responsive design for mobile and desktop
- Interactive game instructions panel
- Built with modern web technologies
- Real-time feedback on guesses
- Word validation against a dictionary

## Tech Stack

- React 19
- TypeScript
- Vite
- TailwindCSS
- ESLint

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- npm/yarn/pnpm

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

### Building for Production

Build the project:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## How to Play

1. Try to guess the 5-letter word in 6 attempts
2. Each guess must be a valid word
3. After each guess, the color of the tiles will change:
   - Green: Letter is correct and in the right position
   - Yellow: Letter is in the word but in the wrong position
   - Gray: Letter is not in the word

## License

This project is open source and available under the MIT License.
