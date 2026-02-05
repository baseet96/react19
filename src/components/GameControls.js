import { TextField, Button, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function GameControls({ sessionId, move, setSessionId, setMove, onPlay }) {
  const handleMoveChange = (event, newMove) => {
    if (newMove !== null) setMove(newMove);
  };

  return (
    <Stack spacing={2}>
      <TextField
        label="Session ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        fullWidth
      />

      <ToggleButtonGroup
        value={move}
        exclusive
        onChange={handleMoveChange}
        aria-label="move selection"
        fullWidth
      >
        <ToggleButton value="rock" aria-label="rock" sx={{ fontSize: 20, flex: 1 }}>
          ✊
        </ToggleButton>
        <ToggleButton value="paper" aria-label="paper" sx={{ fontSize: 20, flex: 1 }}>
          ✋
        </ToggleButton>
        <ToggleButton value="scissors" aria-label="scissors" sx={{ fontSize: 20, flex: 1 }}>
          ✌️
        </ToggleButton>
      </ToggleButtonGroup>

      <Button variant="outlined" onClick={onPlay} fullWidth>
        Play
      </Button>
    </Stack>
  );
}
