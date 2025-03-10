import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import ArticleIcon from "@mui/icons-material/Article"
import ImageIcon from "@mui/icons-material/Image"
import CommentIcon from "@mui/icons-material/Comment"
import PeopleIcon from "@mui/icons-material/People"
import VisitorChart from "@/components/dashboard/visitor-chart"
import RecentTestimonials from "@/components/dashboard/recent-testimonials"

export default function DashboardPage() {
  return (
    <Grid container spacing={3}>
      {/* Summary Cards */}
      <Grid item xs={12} md={6} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 140,
            borderRadius: 2,
            boxShadow: 3,
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            color: "white",
          }}
          elevation={3}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography component="h2" variant="h6" gutterBottom fontWeight="bold">
              Total Blog
            </Typography>
            <ArticleIcon />
          </Box>
          <Typography component="p" variant="h3" fontWeight="bold">
            12
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
            +2 dalam 30 hari terakhir
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 140,
            borderRadius: 2,
            boxShadow: 3,
            background: "linear-gradient(135deg, #FF9800 0%, #FF5722 100%)",
            color: "white",
          }}
          elevation={3}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography component="h2" variant="h6" gutterBottom fontWeight="bold">
              Total Galeri
            </Typography>
            <ImageIcon />
          </Box>
          <Typography component="p" variant="h3" fontWeight="bold">
            24
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
            +4 dalam 30 hari terakhir
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 140,
            borderRadius: 2,
            boxShadow: 3,
            background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
            color: "white",
          }}
          elevation={3}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography component="h2" variant="h6" gutterBottom fontWeight="bold">
              Total Testimoni
            </Typography>
            <CommentIcon />
          </Box>
          <Typography component="p" variant="h3" fontWeight="bold">
            18
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
            +3 dalam 30 hari terakhir
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 140,
            borderRadius: 2,
            boxShadow: 3,
            background: "linear-gradient(135deg, #4A00E0 0%, #8E2DE2 100%)",
            color: "white",
          }}
          elevation={3}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography component="h2" variant="h6" gutterBottom fontWeight="bold">
              Pengunjung
            </Typography>
            <PeopleIcon />
          </Box>
          <Typography component="p" variant="h3" fontWeight="bold">
            15,234
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
            +15% dari bulan lalu
          </Typography>
        </Paper>
      </Grid>

      {/* Chart */}
      <Grid item xs={12} md={8}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 400,
            borderRadius: 2,
          }}
          elevation={3}
        >
          <VisitorChart />
        </Paper>
      </Grid>

      {/* Recent Testimonials */}
      <Grid item xs={12} md={4}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 400,
            borderRadius: 2,
          }}
          elevation={3}
        >
          <RecentTestimonials />
        </Paper>
      </Grid>

      {/* Quick Actions */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, borderRadius: 2 }} elevation={3}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom fontWeight="bold">
            Aktivitas Terbaru
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2">
                • Blog baru `Strategi Marketing Digital 2023` telah dipublikasikan
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2">• 3 item galeri baru telah ditambahkan</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="body2">• 5 testimoni baru menunggu persetujuan</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

