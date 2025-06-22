export type Player = "P1" | "P2" | "P0";

export type PlayableMark = `${Player}${number}${string}`;

export type BottomLineCell = `${number}${string}`;

export type Cell = {
  player: Player;
  row: number;
  column: string;
};

export type MarkRecords = PlayableMark[];

export interface ReviewedCells {
  top: PlayableMark;
  bottom: PlayableMark;
  left: PlayableMark;
  right: PlayableMark;
  topLeft: PlayableMark;
  topRight: PlayableMark;
  bottomLeft: PlayableMark;
  bottomRight: PlayableMark;
}

export interface MatchState {
  player: Player;
  markRecord: MarkRecords;
}

export interface GameRoomState {
  roomId: number;
  players: { [key: string]: Player };
}

export interface GameRoomNotification {
  message: string;
  playerSessionId: string;
  playerSymbol: Player;
  capacity: number;
  isEmpty?: boolean;
  roomId?: string;
}

export interface PlayerInfo {
  playerSymbol: Player;
}
