"use client"

import { useEffect } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline"
import RefreshIcon from "@mui/icons-material/Refresh"
import HomeIcon from "@mui/icons-material/Home"
import { useRouter } from "next/navigation"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <Paper
      sx={{
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        borderRadius: 2,
      }}
      elevation={3}
    >
      <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h5" gutterBottom>
        Terjadi Kesalahan
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
        Maaf, terjadi kesalahan saat memuat halaman ini. Tim kami telah diberitahu tentang masalah ini.
      </Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" color="primary" startIcon={<RefreshIcon />} onClick={reset}>
          Coba Lagi
        </Button>
        <Button variant="outlined" startIcon={<HomeIcon />} onClick={() => router.push("/dashboard")}>
          Kembali ke Dashboard
        </Button>
      </Box>
    </Paper>
  )
}

