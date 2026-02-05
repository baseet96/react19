import { useRef, useState } from "react";
import { Container, Stack, Paper } from "@mui/material";
import Header from "./components/Header";
import StatusBar from "./components/StatusBar";
import ConnectionControls from "./components/ConnectionControls";
import GameControls from "./components/GameControls";
import ResultPanel from "./components/ResultPanel";

export default function App() {
  const [sessionId, setSessionId] = useState("");
  const [move, setMove] = useState("rock");
  const [status, setStatus] = useState("Disconnected");
  const [result, setResult] = useState(null);

  const socketRef = useRef(null);
  const wsUrl =
    "wss://lmd25a0223.execute-api.us-east-1.amazonaws.com/production/";

  const connect = () => {
    if (socketRef.current) socketRef.current.close();

    if (!sessionId || sessionId.trim() === "") {
      setResult({ error: "No session ID", message: "Please enter a session ID before connecting." });
      return;
    }

    const ws = new WebSocket(wsUrl);
    socketRef.current = ws;

    ws.onopen = () => setStatus("Connected");
    ws.onclose = () => {
      setStatus("Disconnected");
    };
    ws.onerror = (err) => {
      setStatus("Error");
      setResult({ error: "Connection error", message: "WebSocket error - try reconnecting or using a different session ID." });
    };
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data && data.error) {
          setResult({ error: data.error, message: data.message || "Server error. Try a different session ID." });
        } else {
          setResult(data);
        }
      } catch (err) {
        setResult({ error: "Invalid response", details: e.data });
      }
    };
  };

  const sendMove = () => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      setResult({ error: "Not connected", message: "WebSocket not connected. Please connect first." });
      return;
    }

    try {
      socketRef.current.send(
        JSON.stringify({
          action: "play",
          sessionId,
          move,
        })
      );
      setResult(null);
    } catch (err) {
      setResult({ error: "Send error", message: "Unable to send move. Try reconnecting or using a different session ID." });
    }
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
          <ResultPanel result={result} onClose={() => setResult(null)} />
        </Stack>
      </Paper>
    </Container>
  );
}
