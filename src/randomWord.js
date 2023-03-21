//Below are the hooks imported for the component and the redux tool kit tools.
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
//The reducers/actions from redux store are imported.
import {
  nextRound,
  setCurrentWord,
  setPlaceHolderWord,
  setLoser,
} from "./store/counterSlice";

//Component
function GetRandomWord() {
  //arraty of words created.
  const words = [
    "dog",
    "cat",
    "monkey",
    "car",
    "rock",
    "paper",
    "water",
    "log",
    "moon",
    "sun",
    "tree",
    "drink",
    "horse",
    "bridge",
    "tower",
    "grass",
    "flower",
    "stars",
    "power",
    "ginger",
    "mint",
    "ocean",
    "waves",
    "elephant",
    "green",
    "brown",
    "blue",
    "music",
    "sound",
    "pinch",
    "splinter",
    "donkey",
    "truck",
    "bike",
    "food",
    "phone",
  ];

  //DISPATCH to use store reducers/
  const dispatch = useDispatch();

  //Initial state variables from store.
  const selectRound = (state) => state.counter.round;
  const round = useSelector(selectRound);

  //Below are all the store variable values needed for the component.
  const selectIndex = (state) => state.counter.index;
  const index = useSelector(selectIndex);

  //CURRENTWORD (STORE)
  const selectCurrentWord = (state) => state.counter.currentWord;
  const currentWord = useSelector(selectCurrentWord);

  //PLACEHOLDERWORD (STORE)
  const selectPlaceHolderWord = (state) => state.counter.placeHolderWord;
  const placeHolderWord = useSelector(selectPlaceHolderWord);

  //Use effect hook that fires when dispatch is changed or used and the next round is incremented.
  useEffect(() => {
    dispatch(nextRound());
  }, [dispatch]);

  //When the round changes the current word in the store is reset to a new one. Then that current word is converted to underscores for each letter and stored in the placeholder word variable in the store.
  useEffect(() => {
    let word = words[Math.floor(Math.random() * words.length)];
    dispatch(setCurrentWord(word));
    dispatch(setPlaceHolderWord(word));
  }, [round, dispatch]);

  //If the index is 5 then the setLoser action is used. This is a useEffect hook that watches the index every time it changes.
  useEffect(() => {
    if (index === 5) {
      dispatch(setLoser());
    }
  }, [index, dispatch]);

  //RETURN AND ELEMENTS including the round and the place holder word.
  return (
    <div className="randomWord">
      <h1 className="roundHeading">Round {round}</h1>
      <h2 className="word">{placeHolderWord}</h2>
    </div>
  );
}

export default GetRandomWord;
