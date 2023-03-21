import { useState } from "react";
import { useDispatch } from "react-redux";
import { increment, reset, resetRound } from "./store/counterSlice";

function KeyBoard(props) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(reset());
    dispatch(resetRound());
  };

  return (
    <div className="reset-div">
      <button className="restart" onClick={handleClick}>
        Restart
      </button>
    </div>
  );
}

export default KeyBoard;
