//Below the useSelector tool is imported from redux to access intial state variables.
import { useSelector } from "react-redux";

//Below the heading component is created just to show the name of the game in the app.
function Heading() {
  return (
    <div>
      <h1 className="Heading">Hang Man</h1>
    </div>
  );
}

export default Heading;
