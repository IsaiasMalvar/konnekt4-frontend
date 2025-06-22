import type { MarkRecords, PlayableMark, Player } from "../types/types";

const numberColumnMap: { [key: number]: string } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
};

export const numberToColumn = (number: number): string => {
  if (number >= 7) {
    return numberColumnMap[number % 7];
  }

  return numberColumnMap[number];
};

export const numberToRow = (number: number): number => {
  return Math.floor(number / 7) + 1;
};

export const getAvailableMarks = (
  player: Player,
  row: number,
  column: string,
  markRecord: MarkRecords
): PlayableMark[] => {
  let playableMark: PlayableMark;
  let playableMarkTopHover: PlayableMark;

  while (row < 7) {
    const bottomP1: PlayableMark = `${"P1"}${row + 1}${column}`;
    const bottomP2: PlayableMark = `${"P2"}${row + 1}${column}`;

    if (markRecord.includes(bottomP1) || markRecord.includes(bottomP2)) {
      playableMark = `${player}${row}${column}`;
      playableMarkTopHover = `${player}${row - 1}${column}`;
      return [playableMark, playableMarkTopHover];
    }

    row++;
  }
  playableMark = `${player}7${column}`;
  playableMarkTopHover = `${player}6${column}`;
  return [playableMark, playableMarkTopHover];
};
