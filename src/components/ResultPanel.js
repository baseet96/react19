import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function ResultPanel({ result, onClose }) {
  if (!result) return null;

  const isError = !!result.error;
  const title = isError ? "Error" : "Game Result";

  return (
    <Dialog open={!!result} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {isError ? (
          <>
            <Typography color="error" sx={{ mb: 1 }}>
              {result.message || result.error}
            </Typography>
            <Typography variant="body2">Try a different session ID or reconnect.</Typography>
          </>
        ) : (
          <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{JSON.stringify(result, null, 2)}</pre>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
