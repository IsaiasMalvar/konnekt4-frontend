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
      className={`grid grid-cols-7  p-4 min-[10rem]:w-[21rem] min-[10rem]:h-[21rem]  w-[25rem] h-[25rem] sm:h-[30rem] sm:w-[30rem] md:w-[40rem] md:h-[40rem] border-4 border-white `}
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
