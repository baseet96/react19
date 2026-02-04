import { Button } from "@mui/material";

export default function ConnectionControls({ onConnect }) {
  return (
    <Button variant="contained" onClick={onConnect}>
      Connect
    </Button>
  );
}
