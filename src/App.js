import React from "react";
import * as animationData from "./asset/rollDice.json";
import { Player } from "@lottiefiles/react-lottie-player";
import dice1 from "./asset/dice1.png";
import dice2 from "./asset/dice2.png";
import dice3 from "./asset/dice3.png";
import dice4 from "./asset/dice4.png";
import dice5 from "./asset/dice5.png";
import dice6 from "./asset/dice6.png";

import "./App.css";

export default function App() {
  const DICE_img = {
    1: dice1,
    2: dice2,
    3: dice3,
    4: dice4,
    5: dice5,
    6: dice6,
  };

  const [loading, setLoading] = React.useState({
    1: false,
    2: false,
    3: false,
  });

  const [buttonType, setButtonType] = React.useState("start");

  const rollDice = () => {
    return Math.floor(Math.random() * 6 + 1);
  };

  const [dice, setDice] = React.useState([1, 1, 1]);

  const [valid, setValid] = React.useState(false);

  const startGame = () => {
    if (firstDice > 6 || firstDice < 0) {
      setValid(true);
      return;
    }
    setLoading({
      1: true,
      2: true,
      3: true,
    });

    setTimeout(() => {
      setDice([firstDice, rollDice(), rollDice()]);
      setLoading({
        1: false,
        2: false,
        3: false,
      });
      setButtonType("tryLuck");
    }, 5000);
  };

  const finalResult = () => {
    let x = new Set(dice);
    return x.length === 1 ? "win" : "fail";
  };

  const tryLuck = () => {
    setLoading({
      1: false,
      2: true,
      3: true,
    });

    setTimeout(() => {
      setDice([dice[0], rollDice(), rollDice()]);
      setLoading({
        1: false,
        2: false,
        3: false,
      });
      setButtonType("start");
      setModal({
        modal: true,
        result: finalResult(),
      });
    }, 5000);
  };
  DICE_img[dice[0]];

  const [modal, setModal] = React.useState({
    modal: false,
    result: "win",
  });

  const [firstDice, setFirstDice] = React.useState(1);

  return (
    <div>
      {valid === true && (
        <div id="modal">
          <h3 id="close" onClick={() => setValid(false)}>
            X
          </h3>
          Invalid Input!!
        </div>
      )}
      {modal["modal"] === true && (
        <div id="modal">
          <h3 id="close" onClick={() => setModal({ modal: false, result: "" })}>
            X
          </h3>

          {modal["result"] === "fail" && <h3>Better Luck next time!!</h3>}
          {modal["result"] === "win" && <h3>You Win!!</h3>}
        </div>
      )}

      <h1>Try Your Luck !!</h1>

      <section id="container">
        <div>
          {loading[1] == false && <img src={DICE_img[dice[0]]} />}

          {loading[1] == true && (
            <Player
              src={animationData}
              className="player"
              loop
              autoplay
              style={{ width: "200px", height: "200px" }}
            />
          )}
        </div>

        <div>
          {loading[2] == false && <img src={DICE_img[dice[1]]} />}

          {loading[2] == true && (
            <Player
              src={animationData}
              className="player"
              loop
              autoplay
              style={{ width: "200px", height: "200px" }}
            />
          )}
        </div>

        <div>
          {loading[3] == false && <img src={DICE_img[dice[2]]} />}
          {loading[3] == true && (
            <Player
              src={animationData}
              className="player"
              loop
              autoplay
              style={{ width: "203px", height: "203px" }}
            />
          )}
        </div>
      </section>

      <section id="button-container">
        {buttonType === "start" && (
          <div id="start-button-div">
            <input
              placeholder="Enter the value of first dice"
              type="number"
              onChange={(e) => setFirstDice(e.target.value)}
            />

            <button onClick={startGame}>Start Game</button>
          </div>
        )}
        {buttonType === "tryLuck" && (
          <button onClick={tryLuck}>Try Luck</button>
        )}
      </section>
    </div>
  );
}
