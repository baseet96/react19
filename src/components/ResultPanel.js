import { Paper, Typography } from "@mui/material";

export default function ResultPanel({ result }) {
  if (!result) return null;

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6">Game Result</Typography>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </Paper>
  );
}
