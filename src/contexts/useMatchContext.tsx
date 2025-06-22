import { createContext, useContext, useState } from "react";
import type { GameRoomState, MatchState, PlayableMark } from "../types/types";

interface MatchContextProps {
  matchState: MatchState;
  setMatchState: (matchState: React.SetStateAction<MatchState>) => void;
  setHoverMarkState: (
    hoverMarkState: React.SetStateAction<PlayableMark>
  ) => void;
  hoverMarkState: PlayableMark;
  online: boolean;
  setOnline: (online: React.SetStateAction<boolean>) => void;
  availableRooms: number[];
  setAvailableRooms: (availableRooms: number[]) => void;
  gameRoomsState: GameRoomState[];
  setGameRoomsState: (
    gameRoomsState: React.SetStateAction<GameRoomState[]>
  ) => void;
  isTwoPlayers: boolean;
  setIsTwoPlayers: (isTwoPlayers: React.SetStateAction<boolean>) => void;
  isEmpty: boolean;
  setIsEmpty: (isEmpty: React.SetStateAction<boolean>) => void;
}

export const MatchContext = createContext<MatchContextProps>(
  {} as MatchContextProps
);

export const MatchProvider = ({
  children,
}: {
  children: React.ReactElement;
}): React.ReactElement => {
  const [availableRooms, setAvailableRooms] = useState<number[]>([]);
  const [gameRoomsState, setGameRoomsState] = useState<GameRoomState[]>([]);
  const [isTwoPlayers, setIsTwoPlayers] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const [matchState, setMatchState] = useState<MatchState>({
    markRecord: [],
    player: "P1",
  });

  const [hoverMarkState, setHoverMarkState] = useState<PlayableMark>("P00");

  const [online, setOnline] = useState<boolean>(false);

  return (
    <MatchContext.Provider
      value={{
        matchState,
        setMatchState,
        hoverMarkState,
        setHoverMarkState,
        online,
        setOnline,
        availableRooms,
        setAvailableRooms,
        setGameRoomsState,
        gameRoomsState,
        isTwoPlayers,
        setIsTwoPlayers,
        isEmpty,
        setIsEmpty,
      }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const context = () => {
  return useContext(MatchContext);
};
