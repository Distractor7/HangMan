//Below the hooks are imported.
import { useEffect } from "react";
import { useSelector } from "react-redux";

//Component
function Score(props) {
  // current word and score from store are accessed here.
  const selectScore = (state) => state.counter.score;
  const score = useSelector(selectScore);

  //Below the value of score is rendered in the component.
  return (
    <div className="winner-div">
      <h1 className="score">Score: {score}</h1>
    </div>
  );
}

export default Score;
