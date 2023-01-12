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
  const [dice, setDice] = React.useState([1, 1, 1]);

  const [valid, setValid] = React.useState(false);

  const [buttonType, setButtonType] = React.useState("start");

  const rollDice = () => {
    return Math.floor(Math.random() * 6 + 1);
  };

  const startGame = (e) => {
    e.preventDefault();

    setLoading({
      1: true,
      2: false,
      3: false,
    });

    setTimeout(() => {
      setDice([rollDice(), 1, 1]);
      setLoading({
        1: false,
        2: false,
        3: false,
      });
    }, 3000);
  };

  const handleLock = () => {
    setLock(true);
    setButtonType("tryLuck");
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
    }, 3000);
  };

  const [modal, setModal] = React.useState({
    modal: false,
    result: "win",
  });

  const [lock, setLock] = React.useState(false);
  return (
    <div>
      {modal["modal"] === true && (
        <div id="modal" style={{ marginTop: "200px" }}>
          <h3 id="close" onClick={() => window.location.reload()}>
            X
          </h3>

          {modal["result"] === "fail" && <h3>Better Luck next time!!</h3>}
          {modal["result"] === "win" && <h3>You Win!!</h3>}
        </div>
      )}

      <h1>Try Your Luck !!</h1>

      <section id="container">
        <div>
          {loading[1] == false && (
            <div className="dice-div">
              {lock === true && (
                <img
                  id="lock"
                  src="https://cdn-icons-png.flaticon.com/512/1803/1803612.png"
                />
              )}
              {lock === false && (
                <img
                  onClick={handleLock}
                  id="lock"
                  src="https://png.pngtree.com/png-vector/20191024/ourmid/pngtree-unlock-glyph-icon-vector-png-image_1859166.jpg"
                />
              )}

              <img src={DICE_img[dice[0]]} />
            </div>
          )}

          {loading[1] == true && (
            <React.Fragment>
              <Player
                src={animationData}
                className="player"
                loop
                autoplay
                style={{ width: "200px", height: "200px" }}
              />
            </React.Fragment>
          )}
        </div>

        <div>
          {loading[2] == false && (
            <div>
              <img src={DICE_img[dice[1]]} />
            </div>
          )}

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
          <button onClick={startGame}>Roll Dice</button>
        )}
        {buttonType === "tryLuck" && (
          <button onClick={tryLuck}>Try Luck</button>
        )}
      </section>
    </div>
  );
}
