import { type Cell, type MarkRecords, type PlayableMark } from "../types/types";

export class VictoryValidator {
  private constructor() {}

  private static readonly VICTORY_CONDITION = 4;

  public static checkVictory(
    checkedCell: Cell,
    markRecords: MarkRecords
  ): boolean {
    const minMarksForWin =
      this.VICTORY_CONDITION + (this.VICTORY_CONDITION - 1);

    if (markRecords.length === 0 || markRecords.length < minMarksForWin) {
      return false;
    }

    if (this.checkHorizontal(checkedCell, markRecords)) return true;
    if (this.checkVertical(checkedCell, markRecords)) return true;
    if (this.checkDiagonal(checkedCell, markRecords)) return true;

    return false;
  }

  private static checkVertical(
    checkedCell: Cell,
    markRecords: MarkRecords
  ): boolean {
    const marksUp = this.countInDirection(checkedCell, markRecords, -1, 0);
    const marksDown = this.countInDirection(checkedCell, markRecords, 1, 0);

    return this.isLineWinner(marksUp, marksDown);
  }

  private static checkHorizontal(
    checkedCell: Cell,
    markRecords: MarkRecords
  ): boolean {
    const marksLeft = this.countInDirection(checkedCell, markRecords, 0, -1);
    const marksRight = this.countInDirection(checkedCell, markRecords, 0, +1);

    return this.isLineWinner(marksLeft, marksRight);
  }

  private static checkDiagonal(
    checkedCell: Cell,
    markRecords: MarkRecords
  ): boolean {
    const marksTopLeft = this.countInDirection(
      checkedCell,
      markRecords,
      -1,
      -1
    );
    const marksBottomRight = this.countInDirection(
      checkedCell,
      markRecords,
      1,
      1
    );

    if (this.isLineWinner(marksTopLeft, marksBottomRight)) {
      return true;
    }

    const marksTopRight = this.countInDirection(
      checkedCell,
      markRecords,
      -1,
      1
    );
    const marksBottomLeft = this.countInDirection(
      checkedCell,
      markRecords,
      1,
      -1
    );

    if (this.isLineWinner(marksTopRight, marksBottomLeft)) {
      return true;
    }

    return false;
  }

  private static countInDirection(
    checkedCell: Cell,
    markRecords: MarkRecords,
    deltaRow: number,
    deltaCol: number
  ): number {
    const { player, row, column } = checkedCell;
    let consecutiveMarks = 0;

    for (let i = 1; i < 4; i++) {
      const nextRow = row + i * deltaRow;
      const nextColCode = column.charCodeAt(0) + i * deltaCol;
      const nextCol = String.fromCharCode(nextColCode).toUpperCase();

      const cellToReview: PlayableMark = `${player}${nextRow}${nextCol}`;

      if (markRecords.includes(cellToReview)) {
        consecutiveMarks++;
      } else break;
    }
    return consecutiveMarks;
  }

  private static isLineWinner(
    marksDirectionA: number,
    marksDirectionB: number
  ): boolean {
    return 1 + marksDirectionA + marksDirectionB === this.VICTORY_CONDITION;
  }
}
