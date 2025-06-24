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
      className={`grid grid-cols-7  p-4 min-[320px]:w-[20rem] min-[320px]:h-[20rem] min-[430px]:w-[27rem] min-[430px]:h-[27rem] w-[30rem] h-[30rem] sm:h-[100%] sm:w-auto sm:aspect-square border-4 border-white `}
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
