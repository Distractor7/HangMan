//Below the useSelector is imported from redux to access the store variables.
import { useSelector } from "react-redux";

//The Loser component is created and is only confitionally rendered when the user loses 50 points from making 5 mistakes in a round.
function Loser() {
  const selectIndex = (state) => state.counter.index;
  const index = useSelector(selectIndex);

  return (
    <div className="loser" style={{ display: index > 4 ? "block" : "none" }}>
      <h1 className="loser">-50pts</h1>
    </div>
  );
}

export default Loser;
