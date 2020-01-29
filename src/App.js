import React, { useState, useEffect } from "react";
import refresh from "./imgs/baseline_refresh_black_18dp.png";
import star from "./imgs/baseline_star_black_18dp.png";

import "./App.css";

function App() {
  const [playButtons] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [chances, setChances] = useState(5);
  const [randomNumbers, setRanfomNumber] = useState([]);
  const [numbers, setNumber] = useState([]);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [status, setStatus] = useState("");
  console.log(status);
  console.log(randomNumbers.length);
  console.log(numbers.join());

  const generateRandomNumber = () => {
    return Array.apply(null, { length: Math.floor(Math.random() * 10 + 1) + 1 })
      .map(Number.call, Number)
      .slice(0);
  };
  useEffect(() => {
    setRanfomNumber(generateRandomNumber());
  }, []);

  const selectNumber = num => {
    const newArr = [...numbers, num];
    setNumber(newArr);
  };
  const handleEqulityCheck = () => {
    if (Number.parseInt(numbers.join()) === randomNumbers.length) {
      setSelectedNumbers(prev => [...prev, Number.parseInt(numbers.join())]);
      setRanfomNumber(generateRandomNumber());
      setNumber([]);
    } else {
      setStatus("Wrong");
    }
  };
  const handleRefresh = () => {
    setChances(prev => {
      return prev <= 0 ? prev : --prev;
    });
    setRanfomNumber(generateRandomNumber());
    setNumber([]);
  };

  const removeNumber = num => {
    setNumber(numbers.filter(item => !numbers.includes(item)));
  };

  return (
    <div className="App">
      <header>
        <h2>Play Nine</h2>
        <h2>{status}</h2>
        <h2>Chances: {chances}</h2>
      </header>
      <hr />
      {chances === 0 ? (
        <h4>Game Over</h4>
      ) : (
        <>
          <div className="board">
            <div className="playButtons">
              {randomNumbers.map(btn => (
                <img key={btn} src={star} alt="Star" />
              ))}
            </div>
            <div>
              <button onClick={handleEqulityCheck}>
                <img
                  src="http://play-nine-test.herokuapp.com/equal.png"
                  alt="Equality Check"
                ></img>
              </button>
              <button onClick={handleRefresh} disabled={chances === 1}>
                <img src={refresh} alt="Refresh"></img>
              </button>
            </div>
          </div>
          <div className="footer">
            <div>
              {playButtons.map(btn => (
                <button
                  key={btn}
                  onClick={e => selectNumber(btn)}
                  style={{
                    backgroundColor: selectedNumbers.includes(btn)
                      ? "green"
                      : ""
                  }}
                >
                  {btn}
                </button>
              ))}
            </div>
            <div>
              {numbers.map(btn => (
                <button key={btn} onClick={e => removeNumber(btn)}>
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
