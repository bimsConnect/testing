"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import IconButton from "@mui/material/IconButton"
import Chip from "@mui/material/Chip"
import Snackbar from "@mui/material/Snackbar"
import Alert, { type AlertColor } from "@mui/material/Alert"
import CircularProgress from "@mui/material/CircularProgress"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import VisibilityIcon from "@mui/icons-material/Visibility"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import {
  getGalleryItemsAction,
  createGalleryItemAction,
  updateGalleryItemAction,
  deleteGalleryItemAction,
} from "@/app/actions/gallery-actions"
import Image from "next/image"

// Definisi tipe untuk item galeri
interface GalleryItem {
  id: string
  title: string
  description: string | null
  image: string
  published: boolean
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

// Definisi tipe untuk form data
interface FormData {
  title: string
  description: string
  image: string
  published: boolean
}

export default function GaleriPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    image: "",
    published: false,
  })
  const [snackbar, setSnackbar] = useState<{
    open: boolean
    message: string
    severity: AlertColor
  }>({
    open: false,
    message: "",
    severity: "success",
  })

  // Fungsi untuk memuat data galeri
  const loadGalleryItems = async () => {
    setLoading(true)
    try {
      const data = await getGalleryItemsAction()
      setGalleryItems(data || [])
    } catch (error) {
      console.error("Error loading gallery items:", error)
      setSnackbar({
        open: true,
        message: "Gagal memuat data galeri",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  // Memuat data saat komponen dimount
  useEffect(() => {
    loadGalleryItems()
  }, [])

  const handleOpenDialog = (item: GalleryItem | null = null) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        description: item.description || "",
        image: item.image,
        published: item.published,
      })
    } else {
      setEditingItem(null)
      setFormData({
        title: "",
        description: "",
        image: "",
        published: false,
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingItem(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      published: e.target.checked,
    })
  }

  const handleSubmit = async () => {
    try {
      if (editingItem) {
        // Update existing item
        await updateGalleryItemAction(editingItem.id, formData)
        setSnackbar({
          open: true,
          message: "Item galeri berhasil diperbarui",
          severity: "success",
        })
      } else {
        // Add new item
        await createGalleryItemAction(formData)
        setSnackbar({
          open: true,
          message: "Item galeri berhasil ditambahkan",
          severity: "success",
        })
      }
      handleCloseDialog()
      loadGalleryItems()
    } catch (error) {
      console.error("Error saving gallery item:", error)
      setSnackbar({
        open: true,
        message: "Gagal menyimpan item galeri",
        severity: "error",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus item galeri ini?")) {
      try {
        await deleteGalleryItemAction(id)
        setSnackbar({
          open: true,
          message: "Item galeri berhasil dihapus",
          severity: "success",
        })
        loadGalleryItems()
      } catch (error) {
        console.error("Error deleting gallery item:", error)
        setSnackbar({
          open: true,
          message: "Gagal menghapus item galeri",
          severity: "error",
        })
      }
    }
  }

  const handleTogglePublish = async (id: string) => {
    try {
      const item = galleryItems.find((item) => item.id === id)
      if (item) {
        await updateGalleryItemAction(id, {
          title: item.title,
          description: item.description || "",
          image: item.image,
          published: !item.published,
        })
        setSnackbar({
          open: true,
          message: "Status publikasi berhasil diubah",
          severity: "success",
        })
        loadGalleryItems()
      }
    } catch (error) {
      console.error("Error toggling publish status:", error)
      setSnackbar({
        open: true,
        message: "Gagal mengubah status publikasi",
        severity: "error",
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manajemen Galeri
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} sx={{ borderRadius: 2 }}>
          Tambah Item Galeri
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {galleryItems.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: "center" }} elevation={2}>
              <Typography variant="body1" color="text.secondary">
                Belum ada item galeri yang ditambahkan.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                sx={{ mt: 2, borderRadius: 2 }}
              >
                Tambah Item Galeri
              </Button>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {galleryItems.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }} elevation={3}>
                    <Box sx={{ position: "relative" }}>
                    <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={300} // Sesuaikan ukuran
                        height={200} // Sesuaikan ukuran
                        style={{ width: "100%", height: "200px", objectFit: "cover" }}
                        />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          bgcolor: "rgba(0, 0, 0, 0.6)",
                          borderRadius: "4px",
                          padding: "2px 8px",
                        }}
                      >
                        <Chip
                          label={item.published ? "Dipublikasikan" : "Draft"}
                          color={item.published ? "success" : "default"}
                          size="small"
                          sx={{ height: 24 }}
                        />
                      </Box>
                    </Box>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h6" component="div">
                        {item.title}
                      </Typography>
                      {item.description && (
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      )}
                    </CardContent>
                    <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
                      <Box>
                        <IconButton color="primary" onClick={() => handleOpenDialog(item)} size="small" sx={{ mr: 1 }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(item.id)} size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      <IconButton
                        color={item.published ? "default" : "success"}
                        onClick={() => handleTogglePublish(item.id)}
                        size="small"
                      >
                        {item.published ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      {/* Dialog untuk menambah/mengedit item galeri */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>{editingItem ? "Edit Item Galeri" : "Tambah Item Galeri"}</DialogTitle>
        <DialogContent dividers>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Judul"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Deskripsi"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="image"
              label="URL Gambar"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              helperText="Masukkan URL gambar untuk item galeri"
            />
            {formData.image && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom>
                  Preview Gambar
                </Typography>
                <Image
                  src={formData.image || "/placeholder.svg"}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                />
              </Box>
            )}
            <FormControlLabel
              control={
                <Switch checked={formData.published} onChange={handleSwitchChange} name="published" color="primary" />
              }
              label="Publikasikan sekarang"
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Batal</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>

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

