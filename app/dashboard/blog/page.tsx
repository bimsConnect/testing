"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import IconButton from "@mui/material/IconButton"
import Chip from "@mui/material/Chip"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Snackbar from "@mui/material/Snackbar"
import Alert from "@mui/material/Alert"
import CircularProgress from "@mui/material/CircularProgress"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  getBlogPostsAction,
  createBlogPostAction,
  updateBlogPostAction,
  deleteBlogPostAction,
} from "@/app/actions/blog-actions"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string | null
  published: boolean
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    published: false,
  })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  })
  const [previewMode, setPreviewMode] = useState(false)

  const loadBlogPosts = async () => {
    setLoading(true)
    try {
      const data = await getBlogPostsAction()
      setBlogPosts(data)
    } catch (error) {
      console.error("Error loading blog posts:", error)
      setSnackbar({
        open: true,
        message: "Gagal memuat data blog",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlogPosts()
  }, [])

  const handleOpenDialog = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post)
      setFormData({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image || "",
        published: post.published,
      })
    } else {
      setEditingPost(null)
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        image: "",
        published: false,
      })
    }
    setOpenDialog(true)
    setPreviewMode(false)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingPost(null)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Auto-generate slug from title if slug is empty
    if (name === "title" && (!editingPost || !formData.slug)) {
      setFormData((prev) => ({
        ...prev,
        slug: value
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-"),
      }))
    }
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      published: e.target.checked,
    })
  }

  const handleSubmit = async () => {
    try {
      if (editingPost) {
        await updateBlogPostAction(editingPost.id, formData)
        setSnackbar({
          open: true,
          message: "Blog berhasil diperbarui",
          severity: "success",
        })
      } else {
        await createBlogPostAction(formData)
        setSnackbar({
          open: true,
          message: "Blog berhasil ditambahkan",
          severity: "success",
        })
      }
      handleCloseDialog()
      loadBlogPosts()
    } catch (error) {
      console.error("Error saving blog post:", error)
      setSnackbar({
        open: true,
        message: "Gagal menyimpan blog",
        severity: "error",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus blog ini?")) {
      try {
        await deleteBlogPostAction(id)
        setBlogPosts(blogPosts.filter((post) => post.id !== id))
        setSnackbar({
          open: true,
          message: "Blog berhasil dihapus",
          severity: "success",
        })
      } catch (error) {
        console.error("Error deleting blog post:", error)
        setSnackbar({
          open: true,
          message: "Gagal menghapus blog",
          severity: "error",
        })
      }
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode)
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manajemen Blog
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} sx={{ borderRadius: 2 }}>
          Tambah Blog Baru
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ width: "100%", mb: 2, overflow: "hidden" }} elevation={2}>
          {blogPosts.length === 0 ? (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="body1" color="text.secondary">
                Belum ada blog yang ditambahkan.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleOpenDialog()}
                sx={{ mt: 2, borderRadius: 2 }}
              >
                Tambah Blog Baru
              </Button>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Judul</TableCell>
                    <TableCell>Slug</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Tanggal Publikasi</TableCell>
                    <TableCell>Aksi</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blogPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>{post.title}</TableCell>
                      <TableCell>{post.slug}</TableCell>
                      <TableCell>
                        <Chip
                          label={post.published ? "Dipublikasikan" : "Draft"}
                          color={post.published ? "success" : "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("id-ID") : "-"}
                      </TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleOpenDialog(post)} size="small" sx={{ mr: 1 }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDelete(post.id)} size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      )}

      {/* Dialog for adding/editing blog posts */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>{previewMode ? "Preview Blog" : editingPost ? "Edit Blog" : "Tambah Blog Baru"}</DialogTitle>
        <DialogContent dividers>
          {previewMode ? (
            <Box>
              <Card sx={{ mb: 3 }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={formData.image || "/placeholder.svg?height=240&width=600"}
                  alt={formData.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {formData.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {formData.excerpt}
                  </Typography>
                  <Typography variant="body1" component="div" sx={{ whiteSpace: "pre-wrap" }}>
                    {formData.content}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ) : (
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Judul Blog"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="slug"
                label="Slug URL"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                helperText="Slug akan digunakan sebagai URL blog (contoh: judul-blog)"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="excerpt"
                label="Ringkasan"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                multiline
                rows={2}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="content"
                label="Konten Blog"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                multiline
                rows={10}
              />
              <TextField
                margin="normal"
                fullWidth
                id="image"
                label="URL Gambar"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                helperText="Masukkan URL gambar untuk thumbnail blog"
              />
              <FormControlLabel
                control={
                  <Switch checked={formData.published} onChange={handleSwitchChange} name="published" color="primary" />
                }
                label="Publikasikan sekarang"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={togglePreviewMode} color="primary">
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <Button onClick={handleCloseDialog}>Batal</Button>
          {!previewMode && (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Simpan
            </Button>
          )}
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

