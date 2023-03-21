//Below are the imports for the project including hooks, components and slice reducers.
import "./App.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  reset,
  setCurrentWord,
  nextRound,
  setLoser,
  setPlaceHolderWord,
  updatePlaceHolderWord,
  addScore,
  removeScore,
} from "./store/counterSlice";
import GetRandomWord from "./randomWord";
import KeyBoard from "./Keyboard";
import HangManSteps from "./hangManSteps";
import Reset from "./reset";
import Winner from "./winner";
import Loser from "./loser";
import Score from "./score";
import Heading from "./Heading";
import GameOver from "./gameOver";
import GameOverLoser from "./gameOver";

//Below is the app.
function App() {
  //Below dispatch is created and stored in a variable to be used in the app.
  const dispatch = useDispatch();

  //Below the state values from the redux store are accessed and stored here.
  const index = useSelector((state) => state.counter.index);
  const currentWord = useSelector((state) => state.counter.currentWord);
  const placeHolderWord = useSelector((state) => state.counter.placeHolderWord);
  const round = useSelector((state) => state.counter.round);
  const score = useSelector((state) => state.counter.score);

  //Below the state variables are created to show and hide certain components depending on conditional circumstances in the game.
  const [showWinner, setShowWinner] = useState(false);
  const [showDelayedWinner, setShowDelayedWinner] = useState(false);
  const [showDelayedLoser, setShowDelayedLoser] = useState(false);
  const [showLoser, setShowLoser] = useState(false);
  const [scoreChange, setScoreChange] = useState(0);

  //Below is the state variable that controls whether the rules are being shown or not.
  const [showParagraph, setShowParagraph] = useState(false);

  //Below is the rules of the game in a variable.
  const customParagraph =
    "Welcome to The Hang Man Game. The aim of the game is to guess as many words correctly as possible. You will play 10 rounds and then your score will determine whether you win or lose. If your score is 250 or above, you have won the game. If your score is below 250 after the 10 rounds you have lost and must click restart to begin again. You can make up to 5 mistakes in each round, but if you make 5 mistakes you've lost the round. If you guess the word in under 5 guesses you will win the round. You will get 50 points for winning a round and lose 50 points for losing a round. You can press the restart button at any time to restart the game and reset the score.";

  //Below is a useEffect hook that manages the end of the game and if the winner component needs to be shown or the loser component needs to be shown.
  useEffect(() => {
    if (showWinner) {
      setScoreChange(50);
      setShowDelayedWinner(true);
      const timer = setTimeout(() => {
        setShowDelayedWinner(false);
        dispatch(nextRound());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showWinner]);

  //Below if the user has made 5 guesses the setShowLoser function is used to set the varibale to true and indicate the round is lost.
  useEffect(() => {
    if (index >= 5) {
      setShowLoser(true);
    }
  }, [index]);

  //Below the useEffect hook performs actionas when the showLoser state varibale changes.
  useEffect(() => {
    if (showLoser) {
      setScoreChange(-50);
      setShowDelayedLoser(true);
      const timer = setTimeout(() => {
        setShowDelayedLoser(false);
        setShowLoser(false);
        dispatch(setLoser(false));
        dispatch(reset());
        dispatch(nextRound());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLoser]);

  //Below a useEffect hook performs the score change using dispatched reducers from the store. This use effect hook works whenever the round value in the store changes.
  useEffect(() => {
    if (scoreChange !== 0) {
      if (scoreChange > 0) {
        dispatch(addScore(50));
      } else {
        dispatch(removeScore(50));
      }
      setScoreChange(0);
    }
  }, [round]);

  //This make the showWinner component disappear when the round changes.
  useEffect(() => {
    setShowWinner(false);
  }, [round]);

  //Below is a handle click function that is passed down to the keyboard component as props.
  function handleClick() {
    if (index >= 5) {
      dispatch(reset());
      dispatch(nextRound());
    }
  }

  //Below is the JSX for the application. It uses a conditional ternerary operator to determing which elements to display depending on the value of showParagraph.
  //When show paragraph is true the rules paragraph is shown and the app is hidden. When the showParagraph element is false the games elemtns are displayed.

  //Additionally, below all the components are rendered with they relevant props and attributes included.
  return (
    <div className="App">
      {showParagraph ? (
        <div>
          <p className="help">{customParagraph}</p>
          <button className="hide" onClick={() => setShowParagraph(false)}>
            Hide Paragraph
          </button>
        </div>
      ) : (
        <>
          <button className="rules" onClick={() => setShowParagraph(true)}>
            Show Rules
          </button>
          <Heading></Heading>
          <GetRandomWord />
          <GameOverLoser></GameOverLoser>
          {showDelayedLoser && <Loser />}
          {showDelayedWinner && <Winner />}
          <HangManSteps index={index} onClick={handleClick} show={!showLoser} />
          <KeyBoard
            handleClick={handleClick}
            showWinner={showWinner}
            setShowWinner={setShowWinner}
            setShowLoser={setShowLoser}
            placeHolderWord={placeHolderWord}
            currentWord={currentWord}
            showLoser={showLoser}
          />
          <Reset />
          <Score></Score>
        </>
      )}
    </div>
  );
}

export default App;
