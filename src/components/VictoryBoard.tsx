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
    <div className="w-full flex flex-col justify-center items-center gap-10 mt-10">
      <div className="bg-black grow-tall w-[10rem] h-[10rem] absolute top-0 left-0" />
      <div className="bg-black grow-tall w-[10rem] h-[10rem] absolute top-0 right-0" />
      <div className="bg-black grow-tall w-[10rem] h-[10rem] absolute bottom-0 left-0" />
      <div className="bg-black grow-tall w-[10rem] h-[10rem] absolute bottom-0 right-0" />
      <div className="bg-black grow-wide  w-[10rem] h-[10rem] absolute top-0 left-0" />
      <div className="bg-black grow-wide  w-[10rem] h-[10rem] absolute top-0 right-0" />
      <div className="bg-black grow-wide  w-[10rem] h-[10rem] absolute bottom-0 left-0" />
      <div className="bg-black grow-wide  w-[10rem] h-[10rem] absolute bottom-0 right-0" />

      <h1 className="text-4xl sm:text-6xl text-white uppercase font-lucky  text-center bg-black p-5 z-10">
        VICTORY - {victoryPlayer}
      </h1>

      <div
        className=" bg-black sm:w-[50%] w-[100%]  z-10 flex justify-center items-center"
        onClick={onClick}
      >
        <button className="active:scale-90 text-xl text-center sm:text-2xl text-white border-4 border-white p-5 cursor-pointer">
          REMATCH
        </button>
      </div>
    </div>
  );
};

export default VictoryBoard;
