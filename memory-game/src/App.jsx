import "./App.css";
import { useState } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/image/helmet-1.png" },
  { src: "/image/potion-1.png" },
  { src: "/image/ring-1.png" },
  { src: "/image/scroll-1.png" },
  { src: "/image/shield-1.png" },
  { src: "/image/sword-1.png" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurns(0);
  };
  console.log(cards, turns);

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
