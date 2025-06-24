import { useEffect, useRef, useState } from "react";
import Board from "../components/Board";

import {
  type Cell,
  type MatchState,
  type PlayableMark,
  type Player,
} from "../types/types";
import { VictoryValidator } from "../logic/VictoryValidator";
import VictoryBoard from "../components/VictoryBoard";
import { Link, useLocation, useParams } from "react-router";
import { useOnlineGame } from "../hooks/useOnlineGame";
import { context } from "../contexts/useMatchContext";
import TransitionalScreen from "../components/TransitionalScreen";
import RandomTiledBackground from "../components/RandomTiledBackground";
import HomeLogo from "../components/HomeLogo";

const GameRoomPage = (): React.ReactElement => {
  const {
    hoverMarkState: contextHoverMarkState,
    setHoverMarkState: setContextHoverMarkState,
    setMatchState: setContextMatchState,
    setOnline,
    online,
    matchState: contextMatchState,
    isEmpty,
    setIsEmpty,
    gameRoomsState,
  } = context();
  let params = useParams();
  const roomId = params.roomId;

  const [matchState, setMatchState] = useState<MatchState>({
    markRecord: [],
    player: "P1",
  });

  const location = useLocation();

  const [player, setPlayer] = useState<Player>("P0");
  const [isTwoPlayers, setIsTwoPlayers] = useState<boolean>(false);

  const { sendMatchState } = useOnlineGame(
    parseInt(roomId!),
    setMatchState,
    setPlayer,
    setIsTwoPlayers
  );

  const [victory, setVictory] = useState<boolean>(false);
  const [hoverMarkState, setHoverMarkState] = useState<PlayableMark>("P00");

  const victorySoundRef = useRef<HTMLAudioElement>(null);

  const lastMark: PlayableMark = online
    ? matchState.markRecord[matchState.markRecord.length - 1] ?? "P00"
    : contextMatchState.markRecord[contextMatchState.markRecord.length - 1] ??
      "P00";

  const row: number = parseInt(lastMark.substring(2, 3)) ?? 0;
  const column: string = lastMark.substring(3) ?? "0";
  const reviewCell: Cell = {
    column,
    player: online
      ? matchState.player === "P1"
        ? "P2"
        : "P1"
      : contextMatchState.player === "P1"
      ? "P2"
      : "P1",
    row,
  };

  useEffect(() => {
    if (!location.pathname.includes("local")) {
      setOnline(true);
    }
    setIsEmpty(false);

    if (victorySoundRef.current) {
      victorySoundRef.current.volume = 0.1;
    }
    const result = online
      ? VictoryValidator.checkVictory(reviewCell, matchState.markRecord)
      : VictoryValidator.checkVictory(reviewCell, contextMatchState.markRecord);

    setVictory(result);
    if (result) {
      console.log("true");
      if (victorySoundRef.current) {
        victorySoundRef.current.play();
      }
    }
  }, [
    matchState.markRecord,
    contextMatchState.markRecord,
    contextHoverMarkState,
    gameRoomsState,
  ]);

  const isTwoPlayersOnlineOrLocal = online ? isTwoPlayers && online : true;
  const isCurrentPlayer1 =
    (online && matchState.player === "P1") || contextMatchState.player === "P1";

  return (
    <div className="h-screen flex p-5  justify-around items-center gap-5 relative overflow-hidden flex-col ">
      <RandomTiledBackground />
      {(!isTwoPlayersOnlineOrLocal || isEmpty) && <TransitionalScreen />}
      <audio src="/yay.mp3" ref={victorySoundRef} />

      {!victory ? (
        <Board
          sendMatchState={sendMatchState}
          player={player}
          matchState={matchState}
          hoverMarkState={hoverMarkState}
          setHoverMarkState={
            online ? setHoverMarkState : setContextHoverMarkState
          }
        />
      ) : (
        <VictoryBoard
          setVictory={setVictory}
          sendMatch={online ? sendMatchState : setContextMatchState}
          matchState={online ? matchState : contextMatchState}
        />
      )}
      {!victory && (
        <div className="inner-border-white flex bg-black p-5 gap-4  w-[80%] sm:w-[80%] md:w-[40%] items-center xl:flex-row flex-col justify-between relative">
          <div className="flex justify-between gap-6 items-center">
            <span className="text-center sm:text-7xl md:text-4xl text-white font-lucky text-3xl ">
              {online
                ? matchState.player === player
                  ? "YOUR TURN"
                  : `${matchState.player}  's TURN`
                : contextMatchState.player === "P1"
                ? `P1's TURN`
                : "P2's TURN"}
            </span>
            <div
              className={`
           aspect-square w-16 h-16 relative  flex flex-col justify-center items-center inner-border-white ${
             isCurrentPlayer1 ? "bg-black" : "bg-cyan-950"
           }`}
            >
              {(matchState.player === "P1" ||
                contextMatchState.player === "P1") && (
                <div
                  className={`w-[15%] h-[15%] rounded-full bg-white mb-1 `}
                />
              )}
              {(matchState.player === "P2" ||
                contextMatchState.player === "P2") && (
                <div className="w-[15%] h-[15%] rounded-full bg-white" />
              )}
            </div>
          </div>
          <Link
            to="/lobby"
            className="text-3xl cursor-pointer"
            onClick={() =>
              setContextMatchState({
                markRecord: [],
                player: "P1",
              })
            }
          >
            <HomeLogo />
          </Link>
        </div>
      )}
    </div>
  );
};

export default GameRoomPage;
