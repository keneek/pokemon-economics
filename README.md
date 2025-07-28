# Pokemon Trading Economics

An interactive educational app that teaches supply and demand economics through Pokemon trading cards! Built with React, Vite, Tailwind CSS, and Recharts.

## Features

- **Learning Mode**: Understand how supply and demand affect Pokemon card prices
- **Trading Game Mode**: Two-player game where you build the best portfolio
- **Interactive Charts**: Real-time price visualization with supply/demand curves
- **Market Events**: Simulate market changes and see price impacts
- **Pokemon Evolution**: Combine Pokemon to unlock rare evolutions
- **Customizable Stats**: Edit supply and demand values to experiment

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/pokemon-economics.git
cd pokemon-economics
```

2. Install dependencies:

```bash
npm install
```

### Running the App

Start the development server:

```bash
npm run dev
```

The app will automatically open in your browser at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

This will create optimized production files in the `dist` directory.

To preview the production build:

```bash
npm run preview
```

## How to Play

### Learning Mode

- Select different Pokemon to see their market dynamics
- Adjust supply and demand sliders to see price changes
- Learn about equilibrium points where buyers and sellers agree

### Trading Game Mode

1. Each player starts with $1000
2. Take turns buying and selling Pokemon (3 actions per turn)
3. Watch market prices change as stock depletes
4. Evolve Pokemon by combining 3 of the same type
5. Winner has the highest portfolio value!

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Hooks** - State management

## Project Structure

```
pokemon-economics/
├── src/
│   ├── components/
│   │   └── PokemonSupplyDemand.jsx
│   ├── styles/
│   │   └── PokemonSupplyDemand.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
