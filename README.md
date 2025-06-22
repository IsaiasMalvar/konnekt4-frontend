# Konnekt4 Frontend

This is the frontend for **Konnekt4**, a real-time, online multiplayer Connect Four game built with **React 19**, **TypeScript**, **Tailwind CSS**, and **Vite**. It connects to a **Java Spring Boot** backend using **WebSockets over STOMP** via **SockJS**.

## Features

- Real-time multiplayer gameplay via STOMP/WebSockets
- Clean, responsive UI using Tailwind CSS
- React 19 hooks and modern TypeScript
- Game state synchronization between players
- Room management and matchmaking logic

## Tech Stack

- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Vite**
- **SockJS**
- **@stomp/stompjs**
- **Java Spring Boot (Backend - STOMP/WebSocket)**

## Setup

### Prerequisites

- Node.js 20+
- Java 21 (for backend)
- Docker (optional)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Backend Server

This frontend connects to a **Spring Boot** server using **WebSockets over STOMP**, with a fallback to **SockJS**. Make sure the backend is:

- Running
- Exposing the correct WebSocket endpoint (e.g., `/ws`)
- Allowing CORS for frontend origin
- Publishing to `/topic` and receiving on `/app`

The backend provides:

- `/app/game.join/{roomId}`
- `/topic/game.move/{roomId}`
- `/topic/roomInfo/{roomId}`
- `/topic/disconnected`
- `/topic/connected`

## Environment Variables

Create a `.env` file in the root:

```
VITE_SERVER_URL=http://localhost:8080/ws
```

Ensure it matches the WebSocket endpoint exposed by your Spring server.

## Project Structure

```
.
├── src/
│   ├── components/
│   ├── hooks/
│   ├── contexts/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
└── tailwind.config.js
```

## License

MIT
