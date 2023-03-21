//Below createSlice is imported from the redux tool kit.
import { createSlice } from "@reduxjs/toolkit";

//Below the slice is created with the intitial state and reducers.
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    index: 0,
    score: 0,
    round: 0,
    currentWord: "",
    placeHolderWord: "_",
    isWinner: false,
    isLoser: false,
  },
  reducers: {
    increment: (state) => {
      state.index += 1;
    },
    reset: (state) => {
      state.index = 0;
    },
    nextRound: (state) => {
      state.round += 1;
    },
    resetRound: (state) => {
      state.round = 1;
      state.score = 0;
    },
    setCurrentWord: (state, action) => {
      state.currentWord = action.payload;
    },
    setPlaceHolderWord: (state, action) => {
      const word = action.payload;
      const placeHolderWord = word.replace(/./g, "_ ");
      state.placeHolderWord = placeHolderWord.trim();
    },
    updatePlaceHolderWord: (state, action) => {
      state.placeHolderWord = action.payload;
    },
    setLoser: (state, action) => {
      state.isLoser = action.payload;
    },
    addScore: (state, action) => {
      state.score += action.payload;
    },
    removeScore: (state, action) => {
      state.score -= action.payload;
    },
    resetGame: (state) => {
      state.round = 0;
      state.index = 0;
      state.score = 0;
    },
  },
});

//Below the reducers are exported to be used in other components in the application.
export const {
  increment,
  reset,
  resetRound,
  setCurrentWord,
  setPlaceHolderWord,
  nextRound,
  updatePlaceHolderWord,
  setLoser,
  addScore,
  removeScore,
  resetGame,
} = counterSlice.actions;

export default counterSlice.reducer;
