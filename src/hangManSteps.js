import { hangManFrames } from "./data.js";

function HangManSteps(props) {
  let hangMan = hangManFrames[props.index];
  if (!hangMan) return null; // Return null if hangMan is undefined
  return (
    <div className="hangMan">
      <img src={hangMan.url} alt={hangMan.alt} />
    </div>
  );
}

export default HangManSteps;
