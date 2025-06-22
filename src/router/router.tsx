import { createBrowserRouter, Navigate, type RouteObject } from "react-router";
import LobbyPage from "../pages/LobbyPage";
import GameRoomPage from "../pages/GameRoomPage";

const routes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="/lobby" replace />,
      },
      {
        path: "lobby",
        element: <LobbyPage />,
      },
      {
        path: "room/:roomId",
        element: <GameRoomPage />,
      },
      {
        path: "room/local",
        element: <GameRoomPage />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
