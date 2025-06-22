import { useEffect, useRef, useState } from "react";
import Board from "./components/Board";

import {
  type Cell,
  type MatchState,
  type PlayableMark,
  type Player,
} from "./types/types";
import { VictoryValidator } from "./logic/VictoryValidator";
import VictoryBoard from "./components/VictoryBoard";
import { Link, useLocation, useParams } from "react-router";
import { useOnlineGame } from "./hooks/useOnlineGame";
import { context } from "./contexts/useMatchContext";
import TransitionalScreen from "./components/TransitionalScreen";

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
  const [isSongPlaying, setIsSongPlaying] = useState<boolean>(false);
  const [hoverMarkState, setHoverMarkState] = useState<PlayableMark>("P00");

  const ref = useRef<HTMLAudioElement>(null);
  const ref2 = useRef<HTMLAudioElement>(null);

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

  const currentPlayerAvatar = online
    ? matchState.player === "P1"
      ? "/happy.png"
      : "/happy-face.png"
    : contextMatchState.player === "P1"
    ? "/happy.png"
    : "/happy-face.png";

  const onClick = () => {
    if (ref.current && !isSongPlaying) {
      if (ref.current.volume >= 1) {
        ref.current.volume = ref.current.volume * 0.5;
      }
      ref.current.play();
      setIsSongPlaying(true);
    } else if (ref.current && isSongPlaying) {
      ref.current.pause();
      setIsSongPlaying(false);
    }
  };

  const onClickVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      if (e.currentTarget.dataset["volume"] === "-") {
        ref.current.volume = ref.current.volume - ref.current.volume * 0.4;
      } else if (e.currentTarget.dataset["volume"] === "+") {
        if (ref.current.volume + ref.current.volume * 0.4 > 0.1) {
          ref.current.volume = 0.5;
        } else {
          ref.current.volume = ref.current.volume + ref.current.volume * 0.4;
        }
      }
    }
  };

  useEffect(() => {
    if (!location.pathname.includes("local")) {
      setOnline(true);
    }
    setIsEmpty(false);
    if (ref.current) {
      ref.current.ended ? setIsSongPlaying(false) : "";
    }

    if (ref2.current) {
      ref2.current.volume = 0.1;
    }
    const result = online
      ? VictoryValidator.checkVictory(reviewCell, matchState.markRecord)
      : VictoryValidator.checkVictory(reviewCell, contextMatchState.markRecord);

    setVictory(result);
    if (result) {
      if (ref2.current) {
        ref2.current.play();
      }
    }
  }, [
    matchState.markRecord,
    contextMatchState.markRecord,
    contextHoverMarkState,
    gameRoomsState,
  ]);

  console.log(gameRoomsState);

  const isTwoPlayersOnlineOrLocal = online ? isTwoPlayers && online : true;

  return (
    <div className="h-screen flex flex-col justify-around items-center beach-bg gap-2 relative overflow-hidden ">
      {(!isTwoPlayersOnlineOrLocal || isEmpty) && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/30 backdrop-blur-2xl flex flex-col justify-center items-center">
          {" "}
          <TransitionalScreen />{" "}
        </div>
      )}
      <audio src="/yay.mp3" ref={ref2} />
      <audio src="/M-V.mp3" ref={ref} />

      <div className="flex w-[60%] md:w-[36%] xl:w-[35%] justify-between gap-2">
        <div
          className="text-3xl cursor-pointer w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem] text-center rounded-full border-2 active:scale-90"
          data-volume="-"
          onClick={onClickVolume}
        >
          <img src="/volume-down.png" />
        </div>
        <div className="flex gap-10">
          <div className="text-3xl cursor-pointer" onClick={onClick}>
            {!isSongPlaying ? "🎵" : "⏸️"}
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
            {"🏠"}
          </Link>
        </div>

        <div
          className="text-3xl cursor-pointer w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem] text-center rounded-full border-2 active:scale-90"
          data-volume="+"
          onClick={onClickVolume}
        >
          <img src="/volume-up.png" alt="" />
        </div>
      </div>

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
        <div className="flex gap-2 justify-between w-[80%] sm:w-[50%] md:w-[40%] xl:w-[30%] items-center flex-col sm:flex-row">
          <span className="sm:text-4xl font-lucky text-3xl">
            {online
              ? matchState.player === player
                ? "Your turn!"
                : `${matchState.player}  's TURN!`
              : contextMatchState.player === "P1"
              ? `P1's TURN!`
              : "P2's TURN!"}
          </span>
          <img
            src={currentPlayerAvatar}
            className="w-[30%] sm:w-[25%] xl:w-[20%] md:w-[15%] mb-1.5"
          ></img>
        </div>
      )}
    </div>
  );
};

export default GameRoomPage;
