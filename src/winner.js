import { useEffect } from "react";

//Component
//The Winner component is created and is only conditionally rendered when the user gains 50 points from guessing all the letters in the current word of the round.
//This component is also only shown for 3 seconds with time Interval.
function Winner(props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setShowWinner(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [props]);

  return (
    <div className="winner-div">
      <h1 className="winner">50 pts</h1>
    </div>
  );
}

export default Winner;
