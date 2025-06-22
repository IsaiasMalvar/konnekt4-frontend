import { context } from "../contexts/useMatchContext";
import type { MatchState, Player } from "../types/types";

interface VictoryProps {
  matchState: MatchState;
  setVictory: (victory: boolean) => void;
  sendMatch: (MatchState: MatchState) => void;
}
const VictoryBoard = ({
  setVictory,
  sendMatch,
  matchState,
}: VictoryProps): React.ReactElement => {
  const {
    matchState: contextMatchState,
    setMatchState: setContextMatchState,
    online,
  } = context();
  const victoryPlayer: Player = online
    ? matchState.player === "P2"
      ? "P1"
      : "P2"
    : contextMatchState.player === "P2"
    ? "P1"
    : "P2";
  const victoryAvatar =
    victoryPlayer === "P1" ? "/happy.png" : "/happy-face.png";

  const onClick = () => {
    if (online) {
      sendMatch({ markRecord: [], player: "P0" });
      setVictory(false);
    } else if (!online) {
      setContextMatchState({
        markRecord: [],
        player: "P1",
      });
      setVictory(false);
    }
  };

  return (
    <div className="w-[20rem] h-[20rem] sm:h-[30rem] sm:w-[30rem] flex flex-col justify-end items-center gap-10 mt-10">
      <img src={victoryAvatar} className="w-[50%]" />
      <h1 className="text-6xl text-orange-700 uppercase font-lucky -rotate-12  text-center">
        {victoryPlayer} has won!
      </h1>

      <button
        className="active:scale-90 hover:bg-orange-700 hover:text-amber-200 flex justify-center items-center transition-all duration-100 cursor-pointer bg-amber-200 w-[40%] 
         rounded-4xl border-orange-700 p-5  font-bold text-orange-700"
        onClick={onClick}
      >
        <span className="text-xl text-center sm:text-2xl">REMATCH!</span>
      </button>
    </div>
  );
};

export default VictoryBoard;
