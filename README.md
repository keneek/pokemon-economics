# Pokemon Trading Economics

An interactive educational app that teaches supply and demand economics through Pokemon trading cards! Built with React, Vite, Tailwind CSS, and Recharts.

## Features

- **Learning Mode**: Understand how supply and demand affect Pokemon card prices
- **Trading Game Mode**: Competitive two-player economy simulation game
- **Interactive Charts**: Real-time price visualization with dynamic scaling and logarithmic views
- **Market Events**: Simulate supply and demand shocks to see price impacts
- **Complete Evolution System**: Every Pokemon can evolve - some have three-stage evolution chains!
- **Pokedex**: Track your Pokemon collection and evolution possibilities
- **Customizable Game Settings**: Configure starting money and actions per turn
- **Direct Trading Interface**: Buy, sell, and evolve directly from the Pokemon selection menu
- **Market Analysis**: Visual indicators when markets are over/underpriced vs equilibrium

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
- Use "Edit Market" mode to adjust initial stock quantities and demand levels
- Observe how the supply/demand curves create market prices
- Learn about equilibrium points and market efficiency

### Trading Game Mode

1. Configure game settings (starting money, actions per turn)
2. Each player takes turns with limited actions
3. Buy low, sell high to maximize profits
4. Collect 3+ of any Pokemon to unlock evolution (marked with ✨)
5. Build powerful evolution chains (e.g., Charmander → Charmeleon → Charizard)
6. Use the Pokedex to track your collection and plan strategies
7. Winner has the highest portfolio value when game ends!

## Pokemon Evolution Chains

Every Pokemon in the game can evolve! Some examples:

- **Fire**: Charmander → Charmeleon → Charizard 🔥
- **Electric**: Pikachu → Raichu → Alolan Raichu ⚡
- **Water**: Magikarp → Gyarados → Mega Gyarados 🐟
- **Psychic**: Abra → Kadabra → Alakazam 🔮
- **Grass**: Sprigatito → Floragato → Meowscarada 🌿
- **And many more!**

## Game Features

### Dynamic Pricing

- Prices calculated using rarity × demand formula
- Real-time market adjustments as players trade
- Visual warnings when prices diverge from equilibrium

### Market Visualization

- Supply and demand curves update in real-time
- Dynamic chart scaling (including logarithmic for extreme ranges)
- Current market position clearly marked
- Theoretical equilibrium points shown

### Player Tools

- **Pokedex**: View owned Pokemon and evolution possibilities
- **Quick Actions**: Buy/Sell/Evolve buttons in Pokemon list
- **Market Events**: Random supply/demand shocks
- **Portfolio Tracking**: Real-time net worth calculations

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
