import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceDot, ReferenceLine } from 'recharts';
import '../styles/PokemonSupplyDemand.css';

const PokemonSupplyDemand = () => {
  const [selectedPokemon, setSelectedPokemon] = useState('sprigatito');
  const [supplyShift, setSupplyShift] = useState(0);
  const [demandShift, setDemandShift] = useState(0);
  const [showExplanation, setShowExplanation] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [pokemonSectionCollapsed, setPokemonSectionCollapsed] = useState(false);
  const [gameMode, setGameMode] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [tradeAmount, setTradeAmount] = useState(1);
  const [gameMessage, setGameMessage] = useState('');
  const [actionsLeft, setActionsLeft] = useState(3);
  const [maxActionsPerTurn, setMaxActionsPerTurn] = useState(3);
  const [startingMoney, setStartingMoney] = useState(1000);
  const [showPokedex, setShowPokedex] = useState(false);
  const [pokedexPlayer, setPokedexPlayer] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  
  // Game state for two players
  const [playerData, setPlayerData] = useState({
    1: { name: 'Player 1', money: 1000, portfolio: {}, color: '#3498DB' },
    2: { name: 'Player 2', money: 1000, portfolio: {}, color: '#E74C3C' }
  });

  const [pokemonData, setPokemonData] = useState({
    pikachu: {
      name: 'Pikachu',
      emoji: '⚡',
      color: '#FFCC00',
      baseSupply: 45,
      baseDemand: 85,
      description: 'Found in forests across Kanto, Johto, Hoenn, Kalos & more!',
      evolution: 'raichu',
      initialStock: 4500,
      currentStock: 4500
    },
    charmander: {
      name: 'Charmander',
      emoji: '🔥',
      color: '#FF6B35',
      baseSupply: 18,
      baseDemand: 95,
      description: 'Fire starter Pokemon from Kanto region!',
      evolution: 'charmeleon',
      initialStock: 1800,
      currentStock: 1800
    },
    magikarp: {
      name: 'Magikarp',
      emoji: '🐟',
      color: '#4A90E2',
      baseSupply: 92,
      baseDemand: 10,
      description: 'In EVERY region\'s waters - most common Pokemon!',
      evolution: 'gyarados',
      initialStock: 9200,
      currentStock: 9200
    },
    mewtwo: {
      name: 'Mewtwo',
      emoji: '🟣',
      color: '#9B59B6',
      baseSupply: 5,
      baseDemand: 98,
      description: 'Legendary in Kanto & Kalos caves - one per game!',
      evolution: 'megamewtwo',
      initialStock: 500,
      currentStock: 500
    },
    snorlax: {
      name: 'Snorlax',
      emoji: '😴',
      color: '#34495E',
      baseSupply: 28,
      baseDemand: 75,
      description: 'Routes in Kanto, Johto, Sinnoh, Kalos, Alola & more',
      evolution: 'gigasnorlax',
      initialStock: 2800,
      currentStock: 2800
    },
    eevee: {
      name: 'Eevee',
      emoji: '🦊',
      color: '#A8744F',
      baseSupply: 35,
      baseDemand: 90,
      description: 'Gift Pokemon + wild in newer games - 8 evolutions!',
      evolution: 'vaporeon',
      initialStock: 3500,
      currentStock: 3500
    },
    sprigatito: {
      name: 'Sprigatito',
      emoji: '🌿',
      color: '#76C893',
      baseSupply: 12,
      baseDemand: 88,
      description: 'Paldea starter only - newest grass cat Pokemon!',
      evolution: 'floragato',
      initialStock: 1200,
      currentStock: 1200
    },
    grookey: {
      name: 'Grookey',
      emoji: '🥁',
      color: '#7FB069',
      baseSupply: 14,
      baseDemand: 82,
      description: 'Galar starter only - the drumming chimp!',
      evolution: 'thwackey',
      initialStock: 1400,
      currentStock: 1400
    },
    hattenna: {
      name: 'Hattenna',
      emoji: '🎀',
      color: '#F8B5D5',
      baseSupply: 22,
      baseDemand: 68,
      description: 'Rare psychic type in Galar forests',
      evolution: 'hattrem',
      initialStock: 2200,
      currentStock: 2200
    },
    hawlucha: {
      name: 'Hawlucha',
      emoji: '🦅',
      color: '#C1292E',
      baseSupply: 25,
      baseDemand: 72,
      description: 'Wrestling bird from Kalos & Alola routes',
      evolution: 'megahawlucha',
      initialStock: 2500,
      currentStock: 2500
    },
    arceus: {
      name: 'Arceus',
      emoji: '⭐',
      color: '#D4AF37',
      baseSupply: 2,
      baseDemand: 99,
      description: 'Mythical creator - event exclusive only!',
      evolution: 'originarceus',
      initialStock: 200,
      currentStock: 200
    },
    abra: {
      name: 'Abra',
      emoji: '🔮',
      color: '#FFD700',
      baseSupply: 38,
      baseDemand: 78,
      description: 'Teleports away! Found in Kanto, Johto, Hoenn & more!',
      evolution: 'kadabra',
      initialStock: 3800,
      currentStock: 3800
    },
    // Hidden evolutions
    raichu: {
      name: 'Raichu',
      emoji: '⚡',
      color: '#FF8C00',
      baseSupply: 20,
      baseDemand: 80,
      description: 'Evolved from Pikachu - More powerful but less cute!',
      evolution: 'alolanraichu',
      hidden: true,
      initialStock: 2000,
      currentStock: 2000
    },
    gyarados: {
      name: 'Gyarados',
      emoji: '🐉',
      color: '#4169E1',
      baseSupply: 15,
      baseDemand: 92,
      description: 'The mighty evolution of Magikarp!',
      evolution: 'megagyarados',
      hidden: true,
      initialStock: 1500,
      currentStock: 1500
    },
    vaporeon: {
      name: 'Vaporeon',
      emoji: '💧',
      color: '#4682B4',
      baseSupply: 25,
      baseDemand: 85,
      description: 'Water evolution of Eevee!',
      evolution: 'maxvaporeon',
      hidden: true,
      initialStock: 2500,
      currentStock: 2500
    },
    kadabra: {
      name: 'Kadabra',
      emoji: '🥄',
      color: '#FFD700',
      baseSupply: 25,
      baseDemand: 82,
      description: 'Evolved psychic Pokemon with a spoon!',
      evolution: 'alakazam',
      hidden: true,
      initialStock: 2500,
      currentStock: 2500
    },
    // New evolutions
    charmeleon: {
      name: 'Charmeleon',
      emoji: '🔥',
      color: '#FF4500',
      baseSupply: 10,
      baseDemand: 90,
      description: 'The fierce evolution of Charmander!',
      evolution: 'charizard',
      hidden: true,
      initialStock: 1000,
      currentStock: 1000
    },
    megamewtwo: {
      name: 'Mega Mewtwo',
      emoji: '💜',
      color: '#8B008B',
      baseSupply: 1,
      baseDemand: 99,
      description: 'The mega evolution of Mewtwo - ultimate power!',
      hidden: true,
      initialStock: 100,
      currentStock: 100
    },
    gigasnorlax: {
      name: 'Gigantamax Snorlax',
      emoji: '🛌',
      color: '#2C3E50',
      baseSupply: 15,
      baseDemand: 80,
      description: 'The gigantic form of Snorlax!',
      hidden: true,
      initialStock: 1500,
      currentStock: 1500
    },
    floragato: {
      name: 'Floragato',
      emoji: '🍃',
      color: '#228B22',
      baseSupply: 8,
      baseDemand: 85,
      description: 'The agile evolution of Sprigatito!',
      evolution: 'meowscarada',
      hidden: true,
      initialStock: 800,
      currentStock: 800
    },
    thwackey: {
      name: 'Thwackey',
      emoji: '🥁',
      color: '#556B2F',
      baseSupply: 10,
      baseDemand: 78,
      description: 'The rhythmic evolution of Grookey!',
      evolution: 'rillaboom',
      hidden: true,
      initialStock: 1000,
      currentStock: 1000
    },
    hattrem: {
      name: 'Hattrem',
      emoji: '💗',
      color: '#FF69B4',
      baseSupply: 15,
      baseDemand: 75,
      description: 'The emotional evolution of Hattenna!',
      evolution: 'hatterene',
      hidden: true,
      initialStock: 1500,
      currentStock: 1500
    },
    megahawlucha: {
      name: 'Mega Hawlucha',
      emoji: '🦅',
      color: '#8B0000',
      baseSupply: 12,
      baseDemand: 85,
      description: 'The mega evolution of Hawlucha - wrestling champion!',
      hidden: true,
      initialStock: 1200,
      currentStock: 1200
    },
    originarceus: {
      name: 'Origin Arceus',
      emoji: '✨',
      color: '#FFD700',
      baseSupply: 1,
      baseDemand: 100,
      description: 'The original form of Arceus - creation itself!',
      hidden: true,
      initialStock: 50,
      currentStock: 50
    },
    // Final evolutions
    alakazam: {
      name: 'Alakazam',
      emoji: '🧠',
      color: '#DAA520',
      baseSupply: 15,
      baseDemand: 88,
      description: 'The mega-intelligent final evolution of Abra!',
      hidden: true,
      initialStock: 1500,
      currentStock: 1500
    },
    meowscarada: {
      name: 'Meowscarada',
      emoji: '🌺',
      color: '#006400',
      baseSupply: 5,
      baseDemand: 92,
      description: 'The masked magician - final evolution of Sprigatito!',
      hidden: true,
      initialStock: 500,
      currentStock: 500
    },
    rillaboom: {
      name: 'Rillaboom',
      emoji: '🥁',
      color: '#2F4F2F',
      baseSupply: 6,
      baseDemand: 85,
      description: 'The drumming gorilla - final evolution of Grookey!',
      hidden: true,
      initialStock: 600,
      currentStock: 600
    },
    hatterene: {
      name: 'Hatterene',
      emoji: '👗',
      color: '#DDA0DD',
      baseSupply: 10,
      baseDemand: 82,
      description: 'The silent witch - final evolution of Hattenna!',
      hidden: true,
      initialStock: 1000,
      currentStock: 1000
    },
    // Third-stage evolutions
    charizard: {
      name: 'Charizard',
      emoji: '🐲',
      color: '#FF6B35',
      baseSupply: 5,
      baseDemand: 95,
      description: 'The powerful dragon - final evolution of Charmander!',
      hidden: true,
      initialStock: 500,
      currentStock: 500
    },
    alolanraichu: {
      name: 'Alolan Raichu',
      emoji: '🌊',
      color: '#FFA500',
      baseSupply: 12,
      baseDemand: 85,
      description: 'Psychic surfing Raichu - ultimate form!',
      hidden: true,
      initialStock: 1200,
      currentStock: 1200
    },
    megagyarados: {
      name: 'Mega Gyarados',
      emoji: '🌊',
      color: '#191970',
      baseSupply: 8,
      baseDemand: 96,
      description: 'The mega evolution of Gyarados - destructive power!',
      hidden: true,
      initialStock: 800,
      currentStock: 800
    },
    maxvaporeon: {
      name: 'Gigantamax Vaporeon',
      emoji: '💙',
      color: '#00CED1',
      baseSupply: 18,
      baseDemand: 88,
      description: 'The gigantic water form of Vaporeon!',
      hidden: true,
      initialStock: 1800,
      currentStock: 1800
    }
  });

  const getEffectiveSupply = (pokemonKey) => {
    const poke = pokemonData[pokemonKey];
    // Calculate supply as a percentage based on initial stock
    // More stock = higher supply percentage (inverse relationship for rarity)
    const maxStock = 10000; // Maximum possible stock
    const baseSupply = Math.round((poke.initialStock / maxStock) * 100);
    return baseSupply * (poke.currentStock / poke.initialStock || 1);
  };

  // More extreme pricing formula
  const calculatePrice = (supply, demand, supplyShift = 0, demandShift = 0) => {
    const adjustedSupply = Math.max(1, supply - supplyShift);
    const adjustedDemand = Math.max(1, demand + demandShift);
    
    // Exponential formula for more extreme differences
    const rarity = (100 - adjustedSupply) / 100;
    const popularity = adjustedDemand / 100;
    
    // Base price with extreme scaling
    const basePrice = 10;
    const rarityMultiplier = Math.pow(10, rarity * 2.5); // Up to 316x for super rare
    const demandMultiplier = Math.pow(popularity, 2.5); // Exponential demand effect
    
    return Math.round(basePrice * rarityMultiplier * demandMultiplier);
  };

  const generateCurveData = (pokemon, currentMarketPrice) => {
    const data = [];
    const { baseDemand, initialStock, currentStock } = pokemonData[pokemon];
    const effectiveSupply = getEffectiveSupply(pokemon);
    
    // Generate theoretical supply and demand curves
    const maxQuantity = 100;
    
    for (let quantity = 0; quantity <= maxQuantity; quantity += 5) {
      // Supply curve: Shows how price changes with supply
      // Lower supply = higher price (inverse relationship)
      const supplyPrice = calculatePrice(
        100 - quantity,  // As quantity increases, supply decreases
        baseDemand,
        supplyShift,
        demandShift
      );
      
      // Demand curve: Shows how price changes with demand
      // At this quantity level, what would the price be with different demand?
      const demandPrice = calculatePrice(
        quantity,  // Use the quantity directly as supply
        baseDemand,
        supplyShift,
        demandShift
      );
      
      data.push({
        quantity: quantity,
        supply: Math.max(1, Math.min(50000, supplyPrice)), // Reasonable bounds
        demand: Math.max(1, Math.min(50000, demandPrice)), // Reasonable bounds
        actualPrice: currentMarketPrice
      });
    }
    
    return data;
  };

  const findEquilibrium = (data, currentStock) => {
    let minDiff = Infinity;
    let equilibrium = null;
    
    data.forEach(point => {
      const diff = Math.abs(point.supply - point.demand);
      if (diff < minDiff) {
        minDiff = diff;
        equilibrium = {
          quantity: point.quantity,
          price: (point.supply + point.demand) / 2,
          actualQuantity: Math.min(point.quantity, Math.floor(currentStock / 100)) // Convert to hundreds
        };
      }
    });
    
    return equilibrium;
  };

  const handleBaseValueChange = (pokemon, type, value) => {
    const intValue = parseInt(value) || 0;
    setPokemonData(prev => ({
      ...prev,
      [pokemon]: {
        ...prev[pokemon],
        [type]: intValue,
        // If changing initial stock, also update current stock if in edit mode
        ...(type === 'initialStock' && editMode && !gameMode ? { currentStock: intValue } : {})
      }
    }));
  };

  const buyPokemon = () => {
    if (actionsLeft <= 0) {
      setGameMessage("No more actions this turn! Switch to next player.");
      return;
    }

    const effectiveSupply = getEffectiveSupply(selectedPokemon);
    const price = calculatePrice(
      effectiveSupply,
      pokemonData[selectedPokemon].baseDemand,
      supplyShift,
      demandShift
    );
    const totalCost = price * tradeAmount;
    
    if (pokemonData[selectedPokemon].currentStock < tradeAmount) {
      setGameMessage(`Not enough in market stock! Only ${pokemonData[selectedPokemon].currentStock} left.`);
      return;
    }

    if (playerData[currentPlayer].money >= totalCost) {
      setPlayerData(prev => ({
        ...prev,
        [currentPlayer]: {
          ...prev[currentPlayer],
          money: prev[currentPlayer].money - totalCost,
          portfolio: {
            ...prev[currentPlayer].portfolio,
            [selectedPokemon]: (prev[currentPlayer].portfolio[selectedPokemon] || 0) + tradeAmount
          }
        }
      }));
      setPokemonData(prev => ({
        ...prev,
        [selectedPokemon]: {
          ...prev[selectedPokemon],
          currentStock: prev[selectedPokemon].currentStock - tradeAmount
        }
      }));
      setActionsLeft(prev => prev - 1);
      setGameMessage(`${playerData[currentPlayer].name} bought ${tradeAmount} ${pokemonData[selectedPokemon].name} for $${totalCost}! Actions left: ${actionsLeft - 1}`);
    } else {
      setGameMessage(`Not enough money! You need $${totalCost} but only have $${playerData[currentPlayer].money}`);
    }
  };

  const sellPokemon = () => {
    if (actionsLeft <= 0) {
      setGameMessage("No more actions this turn! Switch to next player.");
      return;
    }

    const owned = playerData[currentPlayer].portfolio[selectedPokemon] || 0;
    if (owned >= tradeAmount) {
      const effectiveSupply = getEffectiveSupply(selectedPokemon);
      const price = calculatePrice(
        effectiveSupply,
        pokemonData[selectedPokemon].baseDemand,
        supplyShift,
        demandShift
      );
      const totalValue = price * tradeAmount;
      
      setPlayerData(prev => ({
        ...prev,
        [currentPlayer]: {
          ...prev[currentPlayer],
          money: prev[currentPlayer].money + totalValue,
          portfolio: {
            ...prev[currentPlayer].portfolio,
            [selectedPokemon]: prev[currentPlayer].portfolio[selectedPokemon] - tradeAmount
          }
        }
      }));
      setPokemonData(prev => ({
        ...prev,
        [selectedPokemon]: {
          ...prev[selectedPokemon],
          currentStock: prev[selectedPokemon].currentStock + tradeAmount
        }
      }));
      setActionsLeft(prev => prev - 1);
      setGameMessage(`${playerData[currentPlayer].name} sold ${tradeAmount} ${pokemonData[selectedPokemon].name} for $${totalValue}! Actions left: ${actionsLeft - 1}`);
    } else {
      setGameMessage(`You don't have ${tradeAmount} ${pokemonData[selectedPokemon].name} to sell!`);
    }
  };

  const evolvePokemon = () => {
    if (actionsLeft <= 0) {
      setGameMessage("No more actions this turn! Switch to next player.");
      return;
    }

    const evolution = pokemonData[selectedPokemon].evolution;
    if (!evolution) {
      setGameMessage(`${pokemonData[selectedPokemon].name} can't evolve!`);
      return;
    }
    
    const owned = playerData[currentPlayer].portfolio[selectedPokemon] || 0;
    if (owned >= 3) {
      // Evolution costs 3 of the base Pokemon
      setPlayerData(prev => ({
        ...prev,
        [currentPlayer]: {
          ...prev[currentPlayer],
          portfolio: {
            ...prev[currentPlayer].portfolio,
            [selectedPokemon]: prev[currentPlayer].portfolio[selectedPokemon] - 3,
            [evolution]: (prev[currentPlayer].portfolio[evolution] || 0) + 1
          }
        }
      }));
      
      // Make evolution visible
      setPokemonData(prev => ({
        ...prev,
        [evolution]: { ...prev[evolution], hidden: false }
      }));
      
      setActionsLeft(prev => prev - 1);
      setGameMessage(`${playerData[currentPlayer].name} evolved 3 ${pokemonData[selectedPokemon].name} into ${pokemonData[evolution].name}! Actions left: ${actionsLeft - 1}`);
    } else {
      setGameMessage(`You need 3 ${pokemonData[selectedPokemon].name} to evolve (you have ${owned})!`);
    }
  };

  const calculatePortfolioValue = (player) => {
    let total = playerData[player].money;
    Object.entries(playerData[player].portfolio).forEach(([pokemon, count]) => {
      if (count > 0) {
        const effectiveSupply = getEffectiveSupply(pokemon);
        const price = calculatePrice(
          effectiveSupply,
          pokemonData[pokemon].baseDemand,
          supplyShift,
          demandShift
        );
        total += price * count;
      }
    });
    return total;
  };

  const resetGame = () => {
    setPlayerData({
      1: { name: 'Player 1', money: startingMoney, portfolio: {}, color: '#3498DB' },
      2: { name: 'Player 2', money: startingMoney, portfolio: {}, color: '#E74C3C' }
    });
    setCurrentPlayer(1);
    setActionsLeft(maxActionsPerTurn);
    setGameMessage('');
    setSupplyShift(0);
    setDemandShift(0);
    setShowPokedex(false);
    // Reset stocks and hide evolutions
    setPokemonData(prev => {
      const newData = { ...prev };
      Object.keys(newData).forEach(key => {
        newData[key].currentStock = newData[key].initialStock;
        if (newData[key].hidden !== undefined) {
          newData[key].hidden = true;
        }
      });
      return newData;
    });
  };

  const canEvolve = (pokemonKey, player) => {
    const pokemon = pokemonData[pokemonKey];
    const owned = playerData[player].portfolio[pokemonKey] || 0;
    return pokemon.evolution && owned >= 3;
  };

  const sellFromPokedex = (pokemonKey, amount = 1) => {
    const owned = playerData[pokedexPlayer].portfolio[pokemonKey] || 0;
    if (owned >= amount) {
      const effectiveSupply = getEffectiveSupply(pokemonKey);
      const price = calculatePrice(
        effectiveSupply,
        pokemonData[pokemonKey].baseDemand,
        supplyShift,
        demandShift
      );
      const totalValue = price * amount;
      
      setPlayerData(prev => ({
        ...prev,
        [pokedexPlayer]: {
          ...prev[pokedexPlayer],
          money: prev[pokedexPlayer].money + totalValue,
          portfolio: {
            ...prev[pokedexPlayer].portfolio,
            [pokemonKey]: prev[pokedexPlayer].portfolio[pokemonKey] - amount
          }
        }
      }));
      setPokemonData(prev => ({
        ...prev,
        [pokemonKey]: {
          ...prev[pokemonKey],
          currentStock: prev[pokemonKey].currentStock + amount
        }
      }));
      setGameMessage(`Sold ${amount} ${pokemonData[pokemonKey].name} for $${totalValue}!`);
    }
  };

  const currentPokemon = pokemonData[selectedPokemon];
  const effectiveSupply = getEffectiveSupply(selectedPokemon);
  const currentPrice = calculatePrice(
    effectiveSupply,
    currentPokemon.baseDemand,
    supplyShift,
    demandShift
  );
  const data = generateCurveData(selectedPokemon, currentPrice);
  const equilibrium = findEquilibrium(data, currentPokemon.currentStock);
  
  // Calculate dynamic Y-axis domain to ensure all important values are visible
  const allPrices = data.flatMap(d => [d.supply, d.demand]).filter(p => p > 0 && p < Infinity);
  allPrices.push(currentPrice);
  
  // Ensure we have valid prices
  if (allPrices.length === 0) {
    allPrices.push(100); // Fallback price
  }
  
  const minPrice = Math.max(1, Math.min(...allPrices) * 0.5);
  const maxPrice = Math.min(100000, Math.max(...allPrices) * 1.5); // Cap at 100k for visualization

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-xl">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Pokemon Trading Economics! 📊
        </h1>
        <p className="text-gray-600">
          {gameMode ? '🎮 Two-Player Trading Game - Build the Best Portfolio!' : 'Learn how supply and demand affect Pokemon trading card prices!'}
        </p>
        <button
          onClick={() => setGameMode(!gameMode)}
          className="mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          {gameMode ? '📊 Switch to Learning Mode' : '🎮 Start Trading Game'}
        </button>
      </div>

      {gameMode && (
        <>
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-lg shadow-md border-2 ${currentPlayer === 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}>
              <h3 className="font-bold text-lg mb-2 flex items-center justify-between">
                <span style={{color: playerData[1].color}}>{playerData[1].name}</span>
                <button
                  onClick={() => { setPokedexPlayer(1); setShowPokedex(true); }}
                  className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  📖 Pokedex
                </button>
              </h3>
              <p className="text-2xl font-bold">${playerData[1].money}</p>
              <p className="text-sm text-gray-600">Portfolio Value: ${calculatePortfolioValue(1)}</p>
              {currentPlayer === 1 && <p className="text-sm text-gray-600">Actions left: {actionsLeft}</p>}
              <div className="mt-2 text-xs">
                {Object.entries(playerData[1].portfolio).map(([poke, count]) => 
                  count > 0 && (
                    <div key={poke} className="flex items-center justify-between">
                      <span>{pokemonData[poke].emoji} {pokemonData[poke].name}: {count}</span>
                      {canEvolve(poke, 1) && <span className="text-purple-600 font-bold">✨</span>}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="font-bold text-center mb-2">Game Controls</h3>
              <button
                onClick={() => {
                  setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
                  setActionsLeft(maxActionsPerTurn);
                  setGameMessage('');
                }}
                className="w-full mb-2 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Switch to {currentPlayer === 1 ? 'Player 2' : 'Player 1'}
              </button>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  onClick={resetGame}
                  className="px-3 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                >
                  New Game
                </button>
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm flex items-center justify-center gap-1"
                >
                  ⚙️ Settings
                </button>
              </div>
              {gameMessage && (
                <div className="mt-2 p-2 bg-yellow-100 rounded text-xs text-center">
                  {gameMessage}
                </div>
              )}
            </div>

            <div className={`p-4 rounded-lg shadow-md border-2 ${currentPlayer === 2 ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'}`}>
              <h3 className="font-bold text-lg mb-2 flex items-center justify-between">
                <span style={{color: playerData[2].color}}>{playerData[2].name}</span>
                <button
                  onClick={() => { setPokedexPlayer(2); setShowPokedex(true); }}
                  className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  📖 Pokedex
                </button>
              </h3>
              <p className="text-2xl font-bold">${playerData[2].money}</p>
              <p className="text-sm text-gray-600">Portfolio Value: ${calculatePortfolioValue(2)}</p>
              {currentPlayer === 2 && <p className="text-sm text-gray-600">Actions left: {actionsLeft}</p>}
              <div className="mt-2 text-xs">
                {Object.entries(playerData[2].portfolio).map(([poke, count]) => 
                  count > 0 && (
                    <div key={poke} className="flex items-center justify-between">
                      <span>{pokemonData[poke].emoji} {pokemonData[poke].name}: {count}</span>
                      {canEvolve(poke, 2) && <span className="text-purple-600 font-bold">✨</span>}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className={`lg:col-span-2 bg-white p-6 rounded-lg shadow-md transition-all duration-300 ${
          pokemonSectionCollapsed ? 'ring-2 ring-purple-200' : ''
        }`}>
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="text-2xl">{currentPokemon.emoji}</span>
              {currentPokemon.name} Market
            </span>
            <span className="text-2xl font-bold text-green-600">
              ${currentPrice}
            </span>
          </h2>
          
          {maxPrice / minPrice > 50 && (
            <div className="mb-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
              📊 Note: Chart is using logarithmic scale due to large price range (${Math.round(minPrice)} - ${Math.round(maxPrice)})
            </div>
          )}
          
          <LineChart width={600} height={pokemonSectionCollapsed ? 500 : 400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="quantity" 
              label={{ value: 'Market Quantity (%)', position: 'insideBottom', offset: -5 }}
              stroke="#666"
            />
            <YAxis 
              label={{ value: 'Price ($)', angle: -90, position: 'insideLeft' }}
              stroke="#666"
              domain={[minPrice, maxPrice]}
              scale="log"
              tickFormatter={(value) => `$${value >= 1000 ? `${Math.round(value/1000)}k` : Math.round(value)}`}
            />
            <Tooltip 
              formatter={(value) => `$${Math.round(value)}`}
              labelFormatter={(label) => `Quantity: ${label}%`}
              contentStyle={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: '8px' }}
            />
            <Legend />
            
            <Line 
              type="monotone" 
              dataKey="supply" 
              stroke="#E74C3C" 
              strokeWidth={3}
              name="Supply Curve" 
              dot={false}
            />
            <Line 
              type="monotone" 
              dataKey="demand" 
              stroke="#3498DB" 
              strokeWidth={3}
              name="Demand Curve" 
              dot={false}
            />
            
            {/* Current market price line */}
            <ReferenceLine 
              y={currentPrice} 
              stroke="#10B981" 
              strokeWidth={3}
              strokeDasharray="5 5"
              label={{ 
                value: `Current Price: $${currentPrice}`, 
                position: "right",
                fill: "#10B981",
                fontSize: 14,
                fontWeight: "bold"
              }}
            />
            
            {/* Current effective supply point */}
            <ReferenceDot
              x={effectiveSupply}
              y={currentPrice}
              r={10}
              fill="#10B981"
              stroke="#059669"
              strokeWidth={2}
              label={{ value: "Current Market", position: "top" }}
            />
            
            {equilibrium && (
              <>
                <ReferenceDot 
                  x={equilibrium.quantity} 
                  y={equilibrium.price} 
                  r={8} 
                  fill="#2ECC71"
                  stroke="#27AE60"
                  strokeWidth={2}
                  label={{ 
                    value: "Theoretical Equilibrium", 
                    position: "bottom",
                    fontSize: 12
                  }}
                />
                {/* Show a connecting line if current price is far from equilibrium */}
                {Math.abs(currentPrice - equilibrium.price) > equilibrium.price * 0.5 && (
                  <ReferenceLine
                    segment={[
                      { x: effectiveSupply, y: currentPrice },
                      { x: equilibrium.quantity, y: equilibrium.price }
                    ]}
                    stroke="#666"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    opacity={0.5}
                  />
                )}
              </>
            )}
          </LineChart>

                                <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-semibold text-sm">Current Market Price:</span>
                  <span className="text-green-700 font-bold text-lg ml-2">${currentPrice}</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Stock Available:</p>
                  <p className="text-sm font-semibold">{currentPokemon.currentStock} cards</p>
                </div>
              </div>
              {equilibrium && Math.abs(currentPrice - equilibrium.price) > equilibrium.price * 0.3 && (
                <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                  <p className="text-xs text-yellow-800">
                    ⚠️ Market is {currentPrice > equilibrium.price ? 'overpriced' : 'underpriced'} by{' '}
                    {Math.round(Math.abs((currentPrice - equilibrium.price) / equilibrium.price) * 100)}%
                    {' '}compared to theoretical equilibrium (${Math.round(equilibrium.price)})
                  </p>
                </div>
              )}
              <div className="pt-2 border-t border-green-200">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">How it works:</span> Price = Rarity × Demand
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  • Low stock (rare) + High demand = Very expensive
                </p>
                <p className="text-xs text-gray-500">
                  • High stock (common) + Low demand = Very cheap
                </p>
              </div>
            </div>
            {gameMode && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                  className="px-2 py-1 border rounded text-center"
                />
                <button
                  onClick={buyPokemon}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Buy {tradeAmount}
                </button>
                <button
                  onClick={sellPokemon}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Sell {tradeAmount}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md transition-all duration-300">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold flex items-center gap-2 cursor-pointer select-none hover:text-purple-600 transition-colors"
                  onClick={() => setPokemonSectionCollapsed(!pokemonSectionCollapsed)}>
                <span className="text-gray-600 transition-transform duration-200"
                      style={{ transform: pokemonSectionCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}>
                  ▼
                </span>
                Choose a Pokemon:
                <span className="text-sm font-normal text-gray-600">
                  ({currentPokemon.emoji} {currentPokemon.name})
                </span>
              </h3>
              {!pokemonSectionCollapsed && !gameMode && (
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    editMode ? 'bg-purple-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {editMode ? '✓ Save' : '✏️ Edit Market'}
                </button>
              )}
            </div>
            
            {!pokemonSectionCollapsed && (
              <>
                {editMode && !gameMode && (
                  <div className="mb-3 p-2 bg-yellow-50 rounded text-xs text-yellow-800">
                    ✏️ Edit Mode: Set initial card quantities and demand levels for each Pokemon
                  </div>
                )}
                <div className="space-y-2 animate-slideDown max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(pokemonData).filter(([_, poke]) => !poke.hidden).map(([key, pokemon]) => (
                  <div key={key}>
                    <div className={`p-3 rounded-lg transition-all ${
                      selectedPokemon === key 
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white transform scale-105' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}>
                      <button
                        onClick={() => setSelectedPokemon(key)}
                        className="w-full flex items-center gap-3"
                      >
                        <span className="text-2xl">{pokemon.emoji}</span>
                        <div className="text-left flex-1">
                          <div className="font-medium flex items-center gap-2">
                            {pokemon.name}
                            <span className="text-xs font-bold text-green-400">
                              ${calculatePrice(getEffectiveSupply(key), pokemon.baseDemand, supplyShift, demandShift)}
                            </span>
                          </div>
                          <div className={`text-xs ${selectedPokemon === key ? 'text-gray-200' : 'text-gray-600'}`}>
                            {pokemon.description}
                          </div>
                          {!editMode && (
                            <div className={`text-xs mt-1 ${selectedPokemon === key ? 'text-gray-300' : 'text-gray-500'}`}>
                              Stock: {gameMode ? pokemon.currentStock : pokemon.initialStock} cards | Demand: {pokemon.baseDemand}%
                              {gameMode && playerData[currentPlayer].portfolio[key] > 0 && (
                                <span className="ml-2 font-bold">
                                  (You own: {playerData[currentPlayer].portfolio[key]})
                                </span>
                              )}
                              {gameMode && canEvolve(key, currentPlayer) && (
                                <span className="ml-2 text-purple-600 font-bold">✨ Can Evolve!</span>
                              )}
                            </div>
                          )}
                        </div>
                      </button>
                      
                      {gameMode && actionsLeft > 0 && (
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedPokemon(key);
                              setTimeout(() => buyPokemon(), 0);
                            }}
                            disabled={pokemon.currentStock < 1 || playerData[currentPlayer].money < calculatePrice(getEffectiveSupply(key), pokemon.baseDemand, supplyShift, demandShift)}
                            className={`flex-1 px-2 py-1 text-xs rounded ${
                              pokemon.currentStock < 1 || playerData[currentPlayer].money < calculatePrice(getEffectiveSupply(key), pokemon.baseDemand, supplyShift, demandShift)
                                ? 'bg-gray-400 cursor-not-allowed'
                                : selectedPokemon === key 
                                  ? 'bg-green-600 text-white hover:bg-green-700' 
                                  : 'bg-green-500 text-white hover:bg-green-600'
                            }`}
                          >
                            Buy 1
                          </button>
                          {playerData[currentPlayer].portfolio[key] > 0 && (
                            <button
                              onClick={() => {
                                setSelectedPokemon(key);
                                setTimeout(() => sellPokemon(), 0);
                              }}
                              className={`flex-1 px-2 py-1 text-xs rounded ${
                                selectedPokemon === key 
                                  ? 'bg-red-600 text-white hover:bg-red-700' 
                                  : 'bg-red-500 text-white hover:bg-red-600'
                              }`}
                            >
                              Sell 1
                            </button>
                          )}
                          {canEvolve(key, currentPlayer) && (
                            <button
                              onClick={() => {
                                setSelectedPokemon(key);
                                evolvePokemon();
                              }}
                              className={`px-2 py-1 text-xs rounded ${
                                selectedPokemon === key 
                                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                                  : 'bg-purple-500 text-white hover:bg-purple-600'
                              }`}
                            >
                              Evolve
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {editMode && !gameMode && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs font-medium text-gray-600 block mb-1">
                              Initial Stock: <span className="text-green-600">{pokemon.initialStock} cards</span>
                            </label>
                            <input
                              type="range"
                              min="100"
                              max="10000"
                              step="100"
                              value={pokemon.initialStock}
                              onChange={(e) => handleBaseValueChange(key, 'initialStock', e.target.value)}
                              className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                              style={{
                                background: `linear-gradient(to right, #10B981 0%, #10B981 ${((pokemon.initialStock - 100) / 9900) * 100}%, #E5E7EB ${((pokemon.initialStock - 100) / 9900) * 100}%, #E5E7EB 100%)`
                              }}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>100</span>
                              <span>10,000</span>
                            </div>
                          </div>
                          <div>
                            <label className="text-xs font-medium text-gray-600 block mb-1">
                              Demand: <span className="text-blue-600">{pokemon.baseDemand}%</span>
                            </label>
                            <input
                              type="range"
                              min="5"
                              max="99"
                              value={pokemon.baseDemand}
                              onChange={(e) => handleBaseValueChange(key, 'baseDemand', e.target.value)}
                              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                              style={{
                                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((pokemon.baseDemand - 5) / 94) * 100}%, #E5E7EB ${((pokemon.baseDemand - 5) / 94) * 100}%, #E5E7EB 100%)`
                              }}
                            />
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                              <span>5%</span>
                              <span>99%</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-600">
                            💡 Stock: How many cards exist | Demand: How popular it is
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              </>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-3">Market Events:</h3>
            
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Supply Change: <span className="text-red-600">{supplyShift > 0 ? '+' : ''}{supplyShift}</span>
                <span className="text-xs ml-2 text-gray-500">
                  {supplyShift !== 0 && `(Prices ${supplyShift > 0 ? '↓' : '↑'})`}
                </span>
              </label>
              <input
                type="range"
                min="-30"
                max="30"
                value={supplyShift}
                onChange={(e) => setSupplyShift(Number(e.target.value))}
                className="w-full slider"
                style={{
                  background: `linear-gradient(to right, #E74C3C 0%, #E74C3C ${((supplyShift + 30) / 60) * 100}%, #ddd ${((supplyShift + 30) / 60) * 100}%, #ddd 100%)`
                }}
              />
              <p className="text-xs text-gray-600 mt-1">
                {supplyShift > 0 ? '📈 More cards printed - prices drop!' : supplyShift < 0 ? '📉 Cards become rarer - prices rise!' : 'Normal supply'}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Demand Change: <span className="text-blue-600">{demandShift > 0 ? '+' : ''}{demandShift}</span>
                <span className="text-xs ml-2 text-gray-500">
                  {demandShift !== 0 && `(Prices ${demandShift > 0 ? '↑' : '↓'})`}
                </span>
              </label>
              <input
                type="range"
                min="-30"
                max="30"
                value={demandShift}
                onChange={(e) => setDemandShift(Number(e.target.value))}
                className="w-full slider"
                style={{
                  background: `linear-gradient(to right, #3498DB 0%, #3498DB ${((demandShift + 30) / 60) * 100}%, #ddd ${((demandShift + 30) / 60) * 100}%, #ddd 100%)`
                }}
              />
              <p className="text-xs text-gray-600 mt-1">
                {demandShift > 0 ? '🔥 Pokemon gets popular - prices rise!' : demandShift < 0 ? '❄️ Less people want it - prices drop!' : 'Normal demand'}
              </p>
            </div>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => { setSupplyShift(0); setDemandShift(0); }}
                className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium transition-colors"
              >
                Reset Events
              </button>
            </div>
          </div>

          {gameMode && pokemonData[selectedPokemon].evolution && (
            <div className="bg-purple-50 p-4 rounded-lg shadow-md border-2 border-purple-200">
              <h3 className="font-semibold mb-2 text-purple-800">🔮 Evolution Lab</h3>
              <p className="text-xs text-purple-700 mb-2">
                Combine 3 {pokemonData[selectedPokemon].name} to evolve!
              </p>
              <button
                onClick={evolvePokemon}
                className="w-full py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Evolve to {pokemonData[pokemonData[selectedPokemon].evolution]?.name || 'Unknown'}
              </button>
            </div>
          )}

          <div className="bg-amber-50 p-4 rounded-lg shadow-md border-2 border-amber-200">
            <h3 className="font-semibold mb-2 text-amber-800">🎯 Price Extremes!</h3>
            <div className="text-xs space-y-1 text-amber-700">
              <p>• Arceus (2% supply, 99% demand): <span className="font-bold">${calculatePrice(getEffectiveSupply('arceus'), 99)}</span></p>
              <p>• Magikarp (92% supply, 10% demand): <span className="font-bold">${calculatePrice(getEffectiveSupply('magikarp'), 10)}</span></p>
              <p>• Price ratio: <span className="font-bold">{Math.round(calculatePrice(getEffectiveSupply('arceus'), 99) / calculatePrice(getEffectiveSupply('magikarp'), 10))}x difference!</span></p>
            </div>
          </div>
        </div>
      </div>

      {showExplanation && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">🎓 How It Works:</h3>
            <button
              onClick={() => setShowExplanation(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-red-600">Supply (Red Line):</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Shows how many cards people want to sell</li>
                <li>Goes up = sellers want higher prices</li>
                <li>Low supply % = very rare Pokemon!</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-600">Demand (Blue Line):</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Shows how many cards people want to buy</li>
                <li>Goes down = buyers want lower prices</li>
                <li>High demand % = everyone wants it!</li>
              </ul>
            </div>
          </div>
          <p className="mt-3 text-sm font-medium text-green-700">
            💚 The green dot shows where they meet - that's the market price!
          </p>
          {gameMode && (
            <div className="mt-3 p-3 bg-purple-100 rounded">
              <h4 className="font-semibold text-purple-800 mb-1">🎮 Game Tips:</h4>
              <ul className="text-xs space-y-1 text-purple-700">
                <li>• Buy low (high supply/low demand) and sell high!</li>
                <li>• Watch market events - they change prices dramatically!</li>
                <li>• Evolve Pokemon to unlock rarer, more valuable forms!</li>
                <li>• The winner has the highest total portfolio value!</li>
                <li>• 3 actions (buy/sell/evolve) per turn!</li>
                <li>• Buying depletes market stock - prices rise as stock falls!</li>
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Pokedex Modal */}
      {showPokedex && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <span style={{color: playerData[pokedexPlayer].color}}>
                  {playerData[pokedexPlayer].name}'s Pokedex
                </span>
                📖
              </h2>
              <button
                onClick={() => setShowPokedex(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(playerData[pokedexPlayer].portfolio)
                  .filter(([_, count]) => count > 0)
                  .map(([pokemonKey, count]) => {
                    const pokemon = pokemonData[pokemonKey];
                    const price = calculatePrice(
                      getEffectiveSupply(pokemonKey),
                      pokemon.baseDemand,
                      supplyShift,
                      demandShift
                    );
                    const totalValue = price * count;
                    const canEvolveThis = canEvolve(pokemonKey, pokedexPlayer);
                    
                    return (
                      <div key={pokemonKey} className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{pokemon.emoji}</span>
                            <div>
                              <h3 className="font-bold text-lg">{pokemon.name}</h3>
                              <p className="text-xs text-gray-600">{pokemon.description}</p>
                            </div>
                          </div>
                          {canEvolveThis && (
                            <span className="text-purple-600 text-2xl animate-pulse">✨</span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                          <div>
                            <span className="text-gray-600">Owned:</span>
                            <span className="font-bold ml-2">{count}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Price:</span>
                            <span className="font-bold ml-2 text-green-600">${price}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Total Value:</span>
                            <span className="font-bold ml-2 text-green-600">${totalValue}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Market Stock:</span>
                            <span className="font-bold ml-2">{pokemon.currentStock}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => sellFromPokedex(pokemonKey, 1)}
                            className="flex-1 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                          >
                            Sell 1 for ${price}
                          </button>
                          {count >= 5 && (
                            <button
                              onClick={() => sellFromPokedex(pokemonKey, 5)}
                              className="flex-1 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                            >
                              Sell 5 for ${price * 5}
                            </button>
                          )}
                          {canEvolveThis && pokedexPlayer === currentPlayer && actionsLeft > 0 && (
                            <button
                              onClick={() => {
                                setSelectedPokemon(pokemonKey);
                                evolvePokemon();
                                setShowPokedex(false);
                              }}
                              className="flex-1 px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
                            >
                              Evolve (3→1)
                            </button>
                          )}
                        </div>
                        
                        {canEvolveThis && (
                          <p className="text-xs text-purple-600 mt-2 text-center font-semibold">
                            ✨ Can evolve to {pokemonData[pokemon.evolution]?.name}!
                          </p>
                        )}
                      </div>
                    );
                  })}
              </div>
              
              {Object.entries(playerData[pokedexPlayer].portfolio).filter(([_, count]) => count > 0).length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  No Pokemon in portfolio yet. Start trading to build your collection!
                </p>
              )}
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total Portfolio Value:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${calculatePortfolioValue(pokedexPlayer)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm">
                  <span className="text-gray-600">Cash on hand:</span>
                  <span className="font-semibold">${playerData[pokedexPlayer].money}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold flex items-center gap-2">
                ⚙️ Game Settings
              </h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actions per turn
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={maxActionsPerTurn}
                    onChange={(e) => setMaxActionsPerTurn(Math.max(1, Math.min(10, parseInt(e.target.value) || 3)))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    How many buy/sell/evolve actions each player gets per turn (1-10)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Starting money
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="10000"
                    step="100"
                    value={startingMoney}
                    onChange={(e) => setStartingMoney(Math.max(100, Math.min(10000, parseInt(e.target.value) || 1000)))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Starting cash for each player ($100-$10,000)
                  </p>
                </div>
                
                <div className="pt-4 space-y-2">
                  <button
                    onClick={() => {
                      resetGame();
                      setShowSettings(false);
                    }}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Apply Settings & Start New Game
                  </button>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
                
                <div className="pt-4 border-t">
                  <p className="text-xs text-gray-600 text-center">
                    ⚠️ Applying settings will reset the current game
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonSupplyDemand; 