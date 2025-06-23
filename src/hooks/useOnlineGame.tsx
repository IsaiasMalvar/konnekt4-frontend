import { Client } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import type { GameRoomNotification, MatchState, Player } from "../types/types";
import { context } from "../contexts/useMatchContext";

export const useOnlineGame = (
  roomId: number,
  setMatchState: (matchState: React.SetStateAction<MatchState>) => void,
  setPlayer: (player: React.SetStateAction<Player>) => void,
  setIsTwoPlayers: (boolean: React.SetStateAction<boolean>) => void
) => {
  const { setAvailableRooms, setGameRoomsState, online, setIsEmpty } =
    context();
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    const disconnect = () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.forceDisconnect();
      }
    };
    if (online) {
      window.addEventListener("beforeunload", disconnect);
      window.addEventListener("popstate", disconnect);

      const socket = new SockJS(serverUrl);
      const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,

        onConnect: () => {
          stompClient.subscribe(`/topic/game.move/${roomId}`, (response) => {
            const matchState: MatchState = JSON.parse(response.body);
            setMatchState((prev) => ({
              ...prev,
              markRecord:
                matchState.markRecord.length >= 1
                  ? [...prev.markRecord, ...matchState.markRecord]
                  : [],
              player: matchState.player,
            }));
          });

          stompClient.subscribe(`/topic/connected`, (response) => {
            const serverRooms: number[] = JSON.parse(response.body);
            setAvailableRooms([...serverRooms]);
          });
          stompClient.subscribe(`/topic/roomInfo/${roomId}`, (response) => {
            const gameRoomNotification: GameRoomNotification = JSON.parse(
              response.body
            );
            setIsTwoPlayers(gameRoomNotification.capacity > 1);

            setPlayer((prev) =>
              prev === "P1" ? "P1" : gameRoomNotification.playerSymbol
            );

            setGameRoomsState((prev) => {
              const index = prev.findIndex((room) => room.roomId === roomId);

              if (index !== -1) {
                return prev.map((room) =>
                  room.roomId === roomId
                    ? {
                        ...room,
                        players: {
                          ...room.players,
                          [gameRoomNotification.playerSessionId]:
                            gameRoomNotification.playerSymbol,
                        },
                      }
                    : room
                );
              } else {
                return [
                  ...prev,
                  {
                    roomId: roomId,
                    players: {
                      [gameRoomNotification.playerSessionId]:
                        gameRoomNotification.playerSymbol,
                    },
                  },
                ];
              }
            });
          });
          stompClient.subscribe(`/topic/disconnected`, (response) => {
            const gameRoomNotification: GameRoomNotification = JSON.parse(
              response.body
            );
            if (
              gameRoomNotification.isEmpty &&
              gameRoomNotification.roomId === String(roomId)
            ) {
              setIsEmpty(gameRoomNotification.isEmpty);
            }
          });
          stompClient.publish({
            destination: `/app/game.join/${roomId}`,
          });
        },

        onDisconnect: () => {},
      });

      stompClient.activate();
      stompClientRef.current = stompClient;
    }
    return () => {
      window.removeEventListener("beforeunload", disconnect);
      window.removeEventListener("popstate", disconnect);
      disconnect();
    };
  }, [online]);

  const sendMatchState = (matchState: MatchState) => {
    const stompClient = stompClientRef.current;
    if (stompClient && stompClient.connected) {
      stompClient.publish({
        destination: `/app/game.move/${roomId}`,
        body: JSON.stringify(matchState),
      });
    }
  };

  return { sendMatchState };
};
