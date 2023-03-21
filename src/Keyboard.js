//Below are the hook imports and reducers imports from the redux store.
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  increment,
  reset,
  setPlaceHolderWord,
  updatePlaceHolderWord,
  setLoser,
  removeScore,
} from "./store/counterSlice";
import { useSelector } from "react-redux";
import Loser from "./loser";

//Below is the KeyBoard component.
function KeyBoard(props) {
  //Below the dispatch redux tool is created and stored in the variable.
  const dispatch = useDispatch();
  //The letters in this string are turned into an array.
  const letters = Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ");

  //The initial state variables from the redux store are accessed using the variables below. And by making use of useSelector.
  const index = useSelector((state) => state.counter.index);
  const currentWord = useSelector((state) => state.counter.currentWord);
  const placeHolderWord = useSelector((state) => state.counter.placeHolderWord);
  const round = useSelector((state) => state.counter.round);

  //Two state variables are created.
  const [winner, setWinner] = useState(false);
  const [showLoser, setShowLoser] = useState(false);

  //letter click function is defined and it is called when a letter button is being clicked.
  const handleLetterClick = (letter) => {
    const letterLowerCase = letter.toLowerCase();

    //The click function checkes if the clicked letter is present in the current word and if it is it is updated in the placeHolderWord.
    //If the letter is not in the current word then the index of the initial state in the store is incremented.
    //If the number of wrong guesses (5 index) the setShowLoser variable is set to true and the removeScore() action is used.
    if (currentWord.includes(letterLowerCase)) {
      const letterIndices = [];
      let index = currentWord.indexOf(letterLowerCase);

      while (index !== -1) {
        letterIndices.push(index);
        index = currentWord.indexOf(letterLowerCase, index + 1);
      }

      let revealingWord = placeHolderWord.split(" ").map((char, i) => {
        if (letterIndices.includes(i)) {
          return letterLowerCase;
        }
        return char;
      });

      let joinedNewWord = revealingWord.join(" ");

      dispatch(updatePlaceHolderWord(joinedNewWord));
    } else {
      dispatch(increment());
      if (index >= 5) {
        setShowLoser(true);
        setTimeout(() => {
          dispatch(reset());
          dispatch(setLoser(false));
          setShowLoser(false);
          dispatch(removeScore());
          props.handleClick();
        }, 3000);
      } else {
        props.handleClick();
      }
    }

    if (round > 10) {
      console.log("winner");
    }
  };

  //Below the useEffect hook is used to check whether the user has correctly guessed the currentWord in the game.
  //If the place holder word does not contain any underscore characters then all the letters have been guesed correctly and the setWinner function sets itself to true and shows the round has been won.
  useEffect(() => {
    if (!winner && placeHolderWord.includes("_") === false) {
      setWinner(true);
      props.setShowWinner(true);
    } else if (winner && placeHolderWord.includes("_")) {
      setWinner(false);
    }
  }, [placeHolderWord, winner, props]);

  //Below is the jsx of the component.
  //The letters varibale is mapped over and a button is created for each letter. A unique key for each letter button is set to the letter of itself. So the unique key for "K" is "K".
  //If a correct letter has been chosen then the letter button on the keyboard will be inactive for the round.
  //And at the bottom on line 108, the code uses a conditional rendering technique. If the showLoser state is true, the Loser component will be rendered. This component displays a message when the player has lost the game.
  return (
    <div className="keyboard-div">
      {letters.map((letter) => (
        <button
          key={letter}
          className="letterButton"
          //The onclick function is making use of the handleLetterClick function above and passing the letter clicked as an argument.
          onClick={() => handleLetterClick(letter)}
          disabled={showLoser}
        >
          {letter}
        </button>
      ))}

      {showLoser && <Loser />}
    </div>
  );
}

export default KeyBoard;
