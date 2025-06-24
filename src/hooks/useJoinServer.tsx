// hooks/useSocketListener.ts
import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { context } from "../contexts/useMatchContext";

export const useJoinServer = () => {
  const { setAvailableRooms, online } = context();
  const stompClientRef = useRef<Client | null>(null);
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    if (online) {
      const socket = new SockJS(serverUrl);
      const stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
          stompClient.subscribe(`/topic/connected`, (response) => {
            const serverRooms: number[] = JSON.parse(response.body);
            setAvailableRooms([...serverRooms]);
          });
          stompClient.publish({
            destination: "/app/availability",
          });
        },
      });

      stompClient.activate();
      stompClientRef.current = stompClient;
    }
  }, [online]);
};
