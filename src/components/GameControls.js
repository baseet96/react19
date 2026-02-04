import {
  TextField,
  Select,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";

export default function GameControls({
  sessionId,
  move,
  setSessionId,
  setMove,
  onPlay,
}) {
  return (
    <Stack spacing={2}>
      <TextField
        label="Session ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
        fullWidth
      />

      <Select
        value={move}
        onChange={(e) => setMove(e.target.value)}
        fullWidth
      >
        <MenuItem value="rock">Rock</MenuItem>
        <MenuItem value="paper">Paper</MenuItem>
        <MenuItem value="scissors">Scissors</MenuItem>
      </Select>

      <Button variant="outlined" onClick={onPlay}>
        Play
      </Button>
    </Stack>
  );
}
