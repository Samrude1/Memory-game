import { useEffect, useState } from "react";

export default function Stats({ turns, cards }) {
  const [best, setBest] = useState(
    () => Number(localStorage.getItem("bestScore")) || null
  );
  const [worst, setWorst] = useState(
    () => Number(localStorage.getItem("worstScore")) || null
  );
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("scoreHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const pairsMatched = cards.filter((card) => card.matched).length / 2;
  const allMatched = pairsMatched === 6;

  useEffect(() => {
    if (allMatched) {
      const newHistory = [...history, turns].slice(-10);
      setHistory(newHistory);
      localStorage.setItem("scoreHistory", JSON.stringify(newHistory));

      if (!best || turns < best) {
        setBest(turns);
        localStorage.setItem("bestScore", turns);
      }

      if (!worst || turns > worst) {
        setWorst(turns);
        localStorage.setItem("worstScore", turns);
      }
    }
  }, [allMatched]);

  const getPerformanceLevel = (avgTurns) => {
    if (avgTurns === "-") return "–";
    const avgNum = parseFloat(avgTurns);
    if (avgNum <= 12) return "Erinomainen 🔥";
    if (avgNum <= 16) return "Hyvä 👍";
    if (avgNum <= 20) return "OK 👌";
    return "Parannettavaa 🐢";
  };

  const avg =
    history.length > 0
      ? (history.reduce((a, b) => a + b, 0) / history.length).toFixed(1)
      : "-";

  const performance = getPerformanceLevel(avg);

  const resetStats = () => {
    localStorage.removeItem("bestScore");
    localStorage.removeItem("worstScore");
    localStorage.removeItem("scoreHistory");
    setBest(null);
    setWorst(null);
    setHistory([]);
  };

  return (
    <div className="stats">
      <h2>Tilastot</h2>
      <p>
        Parhaat siirrot: <strong>{best ?? "-"}</strong>
      </p>
      <p>
        Huonoimmat siirrot: <strong>{worst ?? "-"}</strong>
      </p>
      <p>
        Keskiarvo (viimeiset 10): <strong>{avg}</strong>
      </p>
      <p>
        Arvio: <strong>{performance}</strong>
      </p>
      <button onClick={resetStats}>Nollaa tilastot</button>
    </div>
  );
}
