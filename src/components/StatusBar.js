import { Chip } from "@mui/material";

export default function StatusBar({ status }) {
  const color =
    status === "Connected" ? "success" :
    status === "Disconnected" ? "default" :
    "error";

  return <Chip label={`Status: ${status}`} color={color} />;
}
