import { useRef, useState } from "react";

function App() {
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
    ws.onerror = (err) => setStatus("Error: " + err.message);
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("Server:", data);
      setResult(data);
    };
  };

  const sendMove = () => {
    if (!socketRef.current || socketRef.current.readyState !== 1) {
      alert("WebSocket not connected");
      return;
    }
    const msg = {
      action: "play",
      sessionId,
      move,
    };
    socketRef.current.send(JSON.stringify(msg));
    setResult(null);
  };

  return (
    <div>
      <h2>Rock Paper Scissors (WebSocket)</h2>

      <div>Status: {status}</div>

      <div>
        <button onClick={connect}>Connect</button>
      </div>

      <div>
        <label>Session ID: </label>
        <input
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
        />
      </div>

      <div>
        <label>Move: </label>
        <select value={move} onChange={(e) => setMove(e.target.value)}>
          <option>rock</option>
          <option>paper</option>
          <option>scissors</option>
        </select>
      </div>

      <div>
        <button onClick={sendMove}>Play</button>
      </div>

      {result && (
        <div>
          <h3>Game Result</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
