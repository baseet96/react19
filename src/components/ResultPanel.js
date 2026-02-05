import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function ResultPanel({ result, onClose }) {
  if (!result) return null;

  const isError = !!result.error;
  const isWaiting = result && (result.status === "waiting" || result.waiting === true || (result.message && result.message.toLowerCase().includes("waiting")));
  const title = isError ? "Error" : isWaiting ? "Waiting" : "Game Result";

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
        ) : isWaiting ? (
          <Typography variant="h5" align="center" sx={{ my: 2 }}>
            Waiting...
          </Typography>
        ) : (
          (() => {
            const getOutcome = (res) => {
              if (!res) return null;
              try {
                const s = JSON.stringify(res).toLowerCase();
                if (/\b(win|won|victory|you won)\b/.test(s)) return "win";
                if (/\b(lose|lost|loss|defeat)\b/.test(s)) return "lose";
              } catch (e) {
                if (typeof res.win === "boolean") return res.win ? "win" : "lose";
                if (typeof res.youWon === "boolean") return res.youWon ? "win" : "lose";
              }
              return null;
            };

            const outcome = getOutcome(result);

            if (outcome) {
              return (
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ color: outcome === "win" ? "success.main" : "error.main", textTransform: "capitalize", my: 2 }}
                >
                  {outcome}
                </Typography>
              );
            }

            return <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{JSON.stringify(result, null, 2)}</pre>;
          })()
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
