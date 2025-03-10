"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import IconButton from "@mui/material/IconButton"
import Chip from "@mui/material/Chip"
import Rating from "@mui/material/Rating"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
import Avatar from "@mui/material/Avatar"
import {
  getTestimonialsAction,
  updateTestimonialStatusAction,
  deleteTestimonialAction,
} from "@/app/actions/testimonial-actions"
import type { Testimonial } from "@prisma/client"
import Alert from "@mui/material/Alert"
import Snackbar from "@mui/material/Snackbar"
import CircularProgress from "@mui/material/CircularProgress"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`testimonial-tabpanel-${index}`}
      aria-labelledby={`testimonial-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `testimonial-tab-${index}`,
    "aria-controls": `testimonial-tabpanel-${index}`,
  }
}

export default function TestimoniPage() {
  const [value, setValue] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const loadTestimonials = async () => {
    setLoading(true)
    try {
      const data = await getTestimonialsAction()
      setTestimonials(data)
    } catch (error) {
      console.error("Error loading testimonials:", error)
      setSnackbar({
        open: true,
        message: "Gagal memuat data testimoni",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTestimonials()
  }, [])

  const handleApprove = async (id: string) => {
    try {
      await updateTestimonialStatusAction(id, "approved")
      setTestimonials(testimonials.map((item) => (item.id === id ? { ...item, status: "approved" } : item)))
      setSnackbar({
        open: true,
        message: "Testimoni berhasil disetujui",
        severity: "success",
      })
    } catch (error) {
      console.error("Error approving testimonial:", error)
      setSnackbar({
        open: true,
        message: "Gagal menyetujui testimoni",
        severity: "error",
      })
    }
  }

  const handleReject = async (id: string) => {
    try {
      await updateTestimonialStatusAction(id, "rejected")
      setTestimonials(testimonials.map((item) => (item.id === id ? { ...item, status: "rejected" } : item)))
      setSnackbar({
        open: true,
        message: "Testimoni berhasil ditolak",
        severity: "success",
      })
    } catch (error) {
      console.error("Error rejecting testimonial:", error)
      setSnackbar({
        open: true,
        message: "Gagal menolak testimoni",
        severity: "error",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteTestimonialAction(id)
      setTestimonials(testimonials.filter((item) => item.id !== id))
      setSnackbar({
        open: true,
        message: "Testimoni berhasil dihapus",
        severity: "success",
      })
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      setSnackbar({
        open: true,
        message: "Gagal menghapus testimoni",
        severity: "error",
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const pendingTestimonials = testimonials.filter((item) => item.status === "pending")
  const approvedTestimonials = testimonials.filter((item) => item.status === "approved")
  const rejectedTestimonials = testimonials.filter((item) => item.status === "rejected")

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Manajemen Testimoni
      </Typography>

      <Paper sx={{ width: "100%", mb: 2 }} elevation={2}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="testimonial tabs">
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Menunggu Persetujuan
                  <Chip label={pendingTestimonials.length} size="small" sx={{ ml: 1, height: 20 }} color="primary" />
                </Box>
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Disetujui
                  <Chip label={approvedTestimonials.length} size="small" sx={{ ml: 1, height: 20 }} color="primary" />
                </Box>
              }
              {...a11yProps(1)}
            />
            <Tab
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  Ditolak
                  <Chip label={rejectedTestimonials.length} size="small" sx={{ ml: 1, height: 20 }} color="primary" />
                </Box>
              }
              {...a11yProps(2)}
            />
          </Tabs>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TabPanel value={value} index={0}>
              {pendingTestimonials.length === 0 ? (
                <Box sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    Tidak ada testimoni yang menunggu persetujuan.
                  </Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nama</TableCell>
                        <TableCell>Perusahaan</TableCell>
                        <TableCell>Testimoni</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Tanggal</TableCell>
                        <TableCell>Aksi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pendingTestimonials.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar sx={{ mr: 1, width: 32, height: 32 }} src={item.image || undefined}>
                                {item.name.charAt(0)}
                              </Avatar>
                              {item.name}
                            </Box>
                          </TableCell>
                          <TableCell>{item.company || "-"}</TableCell>
                          <TableCell>{item.content}</TableCell>
                          <TableCell>
                            <Rating value={item.rating} readOnly size="small" />
                          </TableCell>
                          <TableCell>{new Date(item.createdAt).toLocaleDateString("id-ID")}</TableCell>
                          <TableCell>
                            <IconButton color="success" onClick={() => handleApprove(item.id)} size="small">
                              <CheckIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => handleReject(item.id)} size="small">
                              <CloseIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>

            <TabPanel value={value} index={1}>
              {approvedTestimonials.length === 0 ? (
                <Box sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    Tidak ada testimoni yang disetujui.
                  </Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nama</TableCell>
                        <TableCell>Perusahaan</TableCell>
                        <TableCell>Testimoni</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Tanggal</TableCell>
                        <TableCell>Aksi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {approvedTestimonials.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar sx={{ mr: 1, width: 32, height: 32 }} src={item.image || undefined}>
                                {item.name.charAt(0)}
                              </Avatar>
                              {item.name}
                            </Box>
                          </TableCell>
                          <TableCell>{item.company || "-"}</TableCell>
                          <TableCell>{item.content}</TableCell>
                          <TableCell>
                            <Rating value={item.rating} readOnly size="small" />
                          </TableCell>
                          <TableCell>{new Date(item.createdAt).toLocaleDateString("id-ID")}</TableCell>
                          <TableCell>
                            <IconButton color="error" onClick={() => handleDelete(item.id)} size="small">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>

            <TabPanel value={value} index={2}>
              {rejectedTestimonials.length === 0 ? (
                <Box sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="body1" color="text.secondary">
                    Tidak ada testimoni yang ditolak.
                  </Typography>
                </Box>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nama</TableCell>
                        <TableCell>Perusahaan</TableCell>
                        <TableCell>Testimoni</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Tanggal</TableCell>
                        <TableCell>Aksi</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rejectedTestimonials.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar sx={{ mr: 1, width: 32, height: 32 }} src={item.image || undefined}>
                                {item.name.charAt(0)}
                              </Avatar>
                              {item.name}
                            </Box>
                          </TableCell>
                          <TableCell>{item.company || "-"}</TableCell>
                          <TableCell>{item.content}</TableCell>
                          <TableCell>
                            <Rating value={item.rating} readOnly size="small" />
                          </TableCell>
                          <TableCell>{new Date(item.createdAt).toLocaleDateString("id-ID")}</TableCell>
                          <TableCell>
                            <IconButton
                              color="success"
                              onClick={() => handleApprove(item.id)}
                              size="small"
                              sx={{ mr: 1 }}
                            >
                              <CheckIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => handleDelete(item.id)} size="small">
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </TabPanel>
          </>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

