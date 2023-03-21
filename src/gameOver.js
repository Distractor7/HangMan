//Below are the imports of the hooks from react. And the resetGame reducers the store slice.
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetGame } from "./store/counterSlice";

//Below is the component to be shown when the user has won the game and their score is 250 or above.
function WinnerO() {
  return (
    <h1 className="youWon">
      Congratulations! You are the winner! Press the reset button to start
      again.
    </h1>
  );
}

//Below is the component to be shown when the user has lost the game and their score is below 250.
function LoserO() {
  return (
    <h1 className="youLost">
      Sorry, you lost. Better luck next time! Press the reset button to start
      again.
    </h1>
  );
}

//Below is the main component.
function GameOverLoser() {
  //State variables used to know when the user is winner or loser and what component to show at the end of the game.
  const [gameStatus, setGameStatus] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  //Below are the redux store intital state variables.
  const round = useSelector((state) => state.counter.round);
  const score = useSelector((state) => state.counter.score);

  //Below dipatch is stored in a variable to make use of redux reducers in the component.
  const dispatch = useDispatch();

  //Below a useEffect hook checks if the game is over after 10 round and if the users score is above or below 250.
  //If score above 250 gameState set to winner and the winner component is shown.
  //If score above 250 gameState set to loser and the loser component is shown.
  useEffect(() => {
    if (round > 10 && score >= 250) {
      setGameStatus("winner");
      setShowOverlay(true);
    } else if (round > 10 && score <= 250) {
      setGameStatus("loser");
      setShowOverlay(true);
    }
  }, [round, score]);

  //Below is the reset button that resets the game and re-hides the Overlay component.
  function handleReset() {
    setShowOverlay(false);
    dispatch(resetGame());
  }

  //Below is the jsx of the component.
  //If the game status is set to winner the winner component is shown with the reset button.
  //If the game status is set to loser the loser component is shown with the reset button.
  return (
    <>
      {showOverlay && (
        <div className="overlay">
          <div>
            {gameStatus === "winner" && <WinnerO className="overlay-message" />}
            {gameStatus === "loser" && <LoserO className="overlay-message" />}
            <button className="overlay-button" onClick={handleReset}>
              Restart
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default GameOverLoser;
