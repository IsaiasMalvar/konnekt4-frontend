import type { MatchState, PlayableMark, Player } from "../types/types";
import { numberToColumn, numberToRow } from "../utilities/utilities";
import BoardCell from "./BoardCell";

interface BoardProps {
  sendMatchState: (state: MatchState) => void;

  matchState: MatchState;
  player: Player;
  setHoverMarkState: (
    hoverMarkState: React.SetStateAction<PlayableMark>
  ) => void;
  hoverMarkState: PlayableMark;
}

const Board = ({
  sendMatchState,
  player,
  matchState,
  hoverMarkState,
  setHoverMarkState,
}: BoardProps): React.ReactElement => {
  const grid = Array.from({ length: 49 }).fill("");

  return (
    <div
      className={`grid grid-cols-7  p-4  w-[20rem] h-[20rem] sm:h-[30rem] sm:w-[30rem] border-b-8 border-amber-950 `}
    >
      {grid.map((_, i) => (
        <BoardCell
          matchState={matchState}
          sendMatchState={sendMatchState}
          setHoverMarkState={setHoverMarkState}
          hoverMarkState={hoverMarkState}
          key={i}
          player={player}
          column={numberToColumn(i)}
          row={numberToRow(i)}
        />
      ))}
    </div>
  );
};

export default Board;
