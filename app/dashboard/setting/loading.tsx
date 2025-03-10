import Box from "@mui/material/Box"
import CircularProgress from "@mui/material/CircularProgress"
import Typography from "@mui/material/Typography"

export default function Loading() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh" }}
    >
      <CircularProgress size={60} />
      <Typography variant="body1" sx={{ mt: 2 }}>
        Memuat pengaturan...
      </Typography>
    </Box>
  )
}

