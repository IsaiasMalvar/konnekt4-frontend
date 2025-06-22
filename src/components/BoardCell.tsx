import { useRef } from "react";
import type { Cell, MatchState, PlayableMark } from "../types/types";
import { getAvailableMarks } from "../utilities/utilities";
import { context } from "../contexts/useMatchContext";

interface CellProps extends Cell {
  matchState: MatchState;
  sendMatchState: (state: MatchState) => void;
  setHoverMarkState: (
    hoverMarkState: React.SetStateAction<PlayableMark>
  ) => void;
  hoverMarkState: PlayableMark;
}

const BoardCell = ({
  column,
  row,
  setHoverMarkState,
  sendMatchState,
  hoverMarkState,
  matchState,
  player: propPlayer,
}: CellProps): React.ReactElement => {
  const {
    online,
    setMatchState,
    matchState: contextMatchState,
    setHoverMarkState: setContextHoverMarkState,
    hoverMarkState: contextHoverMarkState,
  } = context();
  const { markRecord, player: player } = matchState;

  const ref = useRef<HTMLAudioElement>(null);
  const mark: PlayableMark = `P1${row}${column}`;
  const markP2: PlayableMark = `P2${row}${column}`;
  const isP1 = online
    ? markRecord.includes(mark)
    : contextMatchState.markRecord.includes(mark);
  const isP2 = online
    ? markRecord.includes(markP2)
    : contextMatchState.markRecord.includes(markP2);
  const availableMark = online
    ? getAvailableMarks(player, row, column, markRecord)
    : getAvailableMarks(
        contextMatchState.player,
        row,
        column,
        contextMatchState.markRecord
      );
  const disabled = isP1 || isP2;
  const playerAvatar = isP1 ? "/happy.png" : isP2 ? "/happy-face.png" : "";
  const markedCellDisplay = disabled ? playerAvatar : "/base.png";
  const isAvailable = online
    ? hoverMarkState === mark || hoverMarkState === markP2
    : contextHoverMarkState === mark || contextHoverMarkState === markP2;
  const availableSpotAvatar = isAvailable ? "/emoji.png" : "";
  const isTurn = online ? propPlayer === matchState.player : matchState.player;

  const onClick = () => {
    console.log(contextMatchState.player);
    if (ref.current) {
      ref.current.play();
    }

    if (online) {
      sendMatchState({
        markRecord: [availableMark[0]],
        player: matchState.player,
      });
    } else {
      setMatchState((prev) => ({
        markRecord: [...prev.markRecord, availableMark[0]],
        player: contextMatchState.player === "P1" ? "P2" : "P1",
      }));
    }

    if (online) {
      setTimeout(() => {
        setHoverMarkState(availableMark[1]);
      }, 0);
    } else if (!online) {
      setTimeout(() => {
        setContextHoverMarkState(availableMark[1]);
      }, 0);
    }
  };

  const onHover = () => {
    if (online) {
      setHoverMarkState(availableMark[0]);
    } else if (!online) {
      setContextHoverMarkState(availableMark[0]);
    }
  };

  return (
    <div className={`flex justify-center items-center `}>
      <audio src="/bubble-pop.mp3" ref={ref} />
      <button
        onMouseEnter={onHover}
        onClick={onClick}
        className={`rounded-full bg-amber-200  w-[90%] h-[90%] shadow-2xs
        disabled:cursor-not-allowed cursor-pointer ${
          online ? (isTurn ? "" : "cursor-not-allowed") : ""
        }`}
        disabled={disabled || !isTurn}
        onMouseLeave={() => setHoverMarkState("P00")}
      >
        <img
          src={availableSpotAvatar || markedCellDisplay}
          className="object-cover"
        ></img>
      </button>
    </div>
  );
};

export default BoardCell;
