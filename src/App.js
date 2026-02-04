import { useRef, useState } from "react";
import { Container, Stack, Paper } from "@mui/material";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";
import ConnectionControls from "./components/ConnectionControls";
import GameControls from "./components/GameControls";
import ResultPanel from "./components/ResultPanel";

export default function App() {
  const [sessionId, setSessionId] = useState("game123");
  const [move, setMove] = useState("rock");
  const [status, setStatus] = useState("Disconnected");
  const [result, setResult] = useState(null);

  const socketRef = useRef(null);
  const wsUrl =
    "wss://lmd25a0223.execute-api.us-east-1.amazonaws.com/production/";

  const connect = () => {
    if (socketRef.current) socketRef.current.close();

    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => setStatus("Connected");
    ws.onclose = () => setStatus("Disconnected");
    ws.onerror = () => setStatus("Error");
    ws.onmessage = (e) => setResult(JSON.parse(e.data));
  };

  const sendMove = () => {
    if (!socketRef.current || socketRef.current.readyState !== 1) {
      alert("WebSocket not connected");
      return;
    }

    socketRef.current.send(
      JSON.stringify({
        action: "play",
        sessionId,
        move,
      })
    );

    setResult(null);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Header />
          <StatusBar status={status} />
          <ConnectionControls onConnect={connect} />
          <GameControls
            sessionId={sessionId}
            move={move}
            setSessionId={setSessionId}
            setMove={setMove}
            onPlay={sendMove}
          />
          <ResultPanel result={result} />
        </Stack>
      </Paper>
    </Container>
  );
}
