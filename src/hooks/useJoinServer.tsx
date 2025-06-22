// hooks/useSocketListener.ts
import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { context } from "../contexts/useMatchContext";

export const useJoinServer = () => {
  const { setAvailableRooms, online } = context();
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (online) {
      const socket = new SockJS("http://localhost:8080/ws");
      const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        debug: console.log,
        onConnect: () => {
          stompClient.subscribe(`/topic/connected`, (response) => {
            console.log(response);
            const serverRooms: number[] = JSON.parse(response.body);
            setAvailableRooms([...serverRooms]);
          });
          stompClient.publish({
            destination: "/app/availability",
          });
        },
        onStompError: (frame) => {
          console.error("STOMP error:", frame.headers["message"]);
          console.error(frame.body);
        },
      });

      stompClient.activate();
      stompClientRef.current = stompClient;
    }
  }, [online]);
};
