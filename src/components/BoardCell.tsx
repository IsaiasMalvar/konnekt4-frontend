import { useEffect, useRef, useState } from "react";
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
  const [width, setWidth] = useState<number>(window.innerWidth);

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
  const playerAvatar = isP1 ? "bg-black" : isP2 ? "bg-cyan-950" : "";
  const markedCellDisplay = disabled ? playerAvatar : "";
  const isAvailable = online
    ? hoverMarkState === mark || hoverMarkState === markP2
    : contextHoverMarkState === mark || contextHoverMarkState === markP2;
  const availableSpotAvatar = isAvailable ? "bg-gray-500" : "";
  const isTurn = online ? propPlayer === matchState.player : matchState.player;
  const isDesktopScreen = width > 768;
  console.log(isDesktopScreen);

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

    if (online && isDesktopScreen) {
      setTimeout(() => {
        setHoverMarkState(availableMark[1]);
      }, 0);
    } else if (!online && isDesktopScreen) {
      setTimeout(() => {
        setContextHoverMarkState(availableMark[1]);
      }, 0);
    }
  };

  const onHover = () => {
    if (online && isDesktopScreen) {
      setHoverMarkState(availableMark[0]);
    } else if (!online && isDesktopScreen) {
      setContextHoverMarkState(availableMark[0]);
    }
  };

  useEffect(() => {
    console.log(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <div className={`flex justify-center items-center `}>
      <audio src="/bubble-pop.mp3" ref={ref} />
      <button
        onMouseEnter={onHover}
        onClick={onClick}
        className={` bg-white  w-[90%] h-[90%] shadow-2xs
        disabled:cursor-not-allowed cursor-pointer ${
          online ? (isTurn ? "" : "cursor-not-allowed") : ""
        }`}
        disabled={disabled || !isTurn}
        onMouseLeave={() => {
          if (online) {
            setHoverMarkState("P00");
          } else if (!online) {
            setContextHoverMarkState("P00");
          }
        }}
      >
        <div
          className={`${
            markedCellDisplay || availableSpotAvatar
          } w-full h-full relative z-0 flex justify-center items-center`}
        >
          {disabled && (
            <div className="w-[20%] h-[20%] rounded-full bg-white" />
          )}
        </div>
      </button>
    </div>
  );
};

export default BoardCell;
