"use client"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"

// Mock data for recent testimonials
const recentTestimonials = [
  {
    id: 1,
    name: "Ahmad Rizki",
    company: "PT Maju Jaya",
    content: "Layanan yang sangat memuaskan, terima kasih banyak!",
    time: "2 jam yang lalu",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    company: "CV Berkah Abadi",
    content: "Sangat profesional dan tepat waktu.",
    time: "5 jam yang lalu",
  },
  {
    id: 3,
    name: "Budi Santoso",
    company: "PT Sukses Mandiri",
    content: "Kualitas produk sangat baik, akan order lagi.",
    time: "1 hari yang lalu",
  },
]

export default function RecentTestimonials() {
  return (
    <>
      <Typography component="h2" variant="h6" color="primary" gutterBottom fontWeight="bold">
        Testimoni Terbaru
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Testimoni yang belum dimoderasi
      </Typography>
      <Stack spacing={2} sx={{ overflow: "auto", flex: 1 }}>
        {recentTestimonials.map((testimonial) => (
          <Card key={testimonial.id} variant="outlined" sx={{ boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: "primary.main" }}>
                  {testimonial.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="subtitle2">{testimonial.name}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {testimonial.company}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {testimonial.content}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                {testimonial.time}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </>
  )
}

