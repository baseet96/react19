import { Paper, Typography } from "@mui/material";

export default function ResultPanel({ result }) {
  if (!result) return null;

  const isError = !!result.error;

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Typography variant="h6">{isError ? "Error" : "Game Result"}</Typography>

      {isError ? (
        <div>
          <Typography color="error">{result.message || result.error}</Typography>
          <Typography variant="body2">Try a different session ID or reconnect.</Typography>
        </div>
      ) : (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </Paper>
  );
}
