"use client"

import type React from "react"

import { useState } from "react"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardHeader from "@mui/material/CardHeader"
import Snackbar from "@mui/material/Snackbar"
import Alert, { type AlertColor } from "@mui/material/Alert"
import SaveIcon from "@mui/icons-material/Save"
import SecurityIcon from "@mui/icons-material/Security"
import SettingsIcon from "@mui/icons-material/Settings"
import PersonIcon from "@mui/icons-material/Person"
import LanguageIcon from "@mui/icons-material/Language"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { updateSettingsAction, updatePasswordAction } from "@/app/actions/setting-actions"

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
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `settings-tab-${index}`,
    "aria-controls": `settings-tabpanel-${index}`,
  }
}

interface GeneralSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  enableComments: boolean
  enableTestimonials: boolean
}

interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function PengaturanPage() {
  const [tabValue, setTabValue] = useState(0)
  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    siteName: "SaaS Company",
    siteDescription: "Platform SaaS yang membantu Anda mengembangkan bisnis dengan cepat, aman, dan efisien.",
    contactEmail: "info@example.com",
    contactPhone: "+62 123 4567 890",
    address: "Jl. Contoh No. 123, Jakarta Pusat",
    enableComments: true,
    enableTestimonials: true,
  })

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
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

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleGeneralInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    })
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneralSettings({
      ...generalSettings,
      [e.target.name]: e.target.checked,
    })
  }

  const handlePasswordInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPasswordData({
      ...passwordData,
      [name]: value,
    })
  }

  const handleSaveGeneralSettings = async () => {
    try {
      await updateSettingsAction(generalSettings)
      setSnackbar({
        open: true,
        message: "Pengaturan berhasil disimpan",
        severity: "success",
      })
    } catch (error) {
      console.error("Error saving settings:", error)
      setSnackbar({
        open: true,
        message: "Gagal menyimpan pengaturan",
        severity: "error",
      })
    }
  }

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setSnackbar({
        open: true,
        message: "Password baru dan konfirmasi password tidak cocok",
        severity: "error",
      })
      return
    }

    try {
      await updatePasswordAction(passwordData.currentPassword, passwordData.newPassword)
      setSnackbar({
        open: true,
        message: "Password berhasil diubah",
        severity: "success",
      })
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.error("Error changing password:", error)
      setSnackbar({
        open: true,
        message: "Gagal mengubah password. Pastikan password saat ini benar.",
        severity: "error",
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Pengaturan
      </Typography>

      <Paper sx={{ width: "100%", mb: 2, borderRadius: 2 }} elevation={3}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="settings tabs"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Umum" icon={<SettingsIcon />} iconPosition="start" {...a11yProps(0)} />
            <Tab label="Profil" icon={<PersonIcon />} iconPosition="start" {...a11yProps(1)} />
            <Tab label="Keamanan" icon={<SecurityIcon />} iconPosition="start" {...a11yProps(2)} />
            <Tab label="Website" icon={<LanguageIcon />} iconPosition="start" {...a11yProps(3)} />
            <Tab label="Notifikasi" icon={<NotificationsIcon />} iconPosition="start" {...a11yProps(4)} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={0}>
                <CardHeader title="Informasi Website" />
                <CardContent>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="siteName"
                    label="Nama Website"
                    name="siteName"
                    value={generalSettings.siteName}
                    onChange={handleGeneralInputChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="siteDescription"
                    label="Deskripsi Website"
                    name="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={handleGeneralInputChange}
                    multiline
                    rows={3}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card elevation={0}>
                <CardHeader title="Informasi Kontak" />
                <CardContent>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="contactEmail"
                    label="Email Kontak"
                    name="contactEmail"
                    value={generalSettings.contactEmail}
                    onChange={handleGeneralInputChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="contactPhone"
                    label="Telepon Kontak"
                    name="contactPhone"
                    value={generalSettings.contactPhone}
                    onChange={handleGeneralInputChange}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="address"
                    label="Alamat"
                    name="address"
                    value={generalSettings.address}
                    onChange={handleGeneralInputChange}
                    multiline
                    rows={2}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card elevation={0}>
                <CardHeader title="Fitur Website" />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={generalSettings.enableComments}
                        onChange={handleSwitchChange}
                        name="enableComments"
                        color="primary"
                      />
                    }
                    label="Aktifkan Komentar di Blog"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={generalSettings.enableTestimonials}
                        onChange={handleSwitchChange}
                        name="enableTestimonials"
                        color="primary"
                      />
                    }
                    label="Aktifkan Pengiriman Testimoni oleh Pengunjung"
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSaveGeneralSettings}
                >
                  Simpan Pengaturan
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>
            Profil Admin
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                value="admin"
                disabled
              />
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Nama Lengkap"
                name="name"
                defaultValue="Administrator"
              />
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email"
                name="email"
                defaultValue="admin@example.com"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  p: 3,
                  border: "1px dashed",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "3rem",
                    mb: 2,
                  }}
                >
                  A
                </Box>
                <Button variant="outlined">Ubah Foto Profil</Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
                  Simpan Profil
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Ubah Password
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="currentPassword"
                label="Password Saat Ini"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                id="newPassword"
                label="Password Baru"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                id="confirmPassword"
                label="Konfirmasi Password Baru"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleChangePassword}>
                  Ubah Password
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, bgcolor: "background.default", borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Ketentuan Password
                </Typography>
                <Typography variant="body2" paragraph>
                  Password harus memenuhi kriteria berikut:
                </Typography>
                <ul style={{ paddingLeft: 20 }}>
                  <li>
                    <Typography variant="body2" gutterBottom>
                      Minimal 8 karakter
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" gutterBottom>
                      Mengandung setidaknya 1 huruf besar
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" gutterBottom>
                      Mengandung setidaknya 1 huruf kecil
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2" gutterBottom>
                      Mengandung setidaknya 1 angka
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Mengandung setidaknya 1 karakter khusus (misalnya: !@#$%^&*)
                    </Typography>
                  </li>
                </ul>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>
            Pengaturan Website
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="siteUrl"
                label="URL Website"
                name="siteUrl"
                defaultValue="https://www.example.com"
              />
              <TextField
                margin="normal"
                fullWidth
                id="metaKeywords"
                label="Meta Keywords"
                name="metaKeywords"
                defaultValue="saas, business, software, cloud"
                helperText="Pisahkan dengan koma"
              />
              <FormControlLabel
                control={<Switch defaultChecked name="enableSEO" color="primary" />}
                label="Aktifkan Fitur SEO"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                margin="normal"
                fullWidth
                id="googleAnalyticsId"
                label="Google Analytics ID"
                name="googleAnalyticsId"
                defaultValue="UA-XXXXXXXXX-X"
              />
              <TextField
                margin="normal"
                fullWidth
                id="facebookPixelId"
                label="Facebook Pixel ID"
                name="facebookPixelId"
                defaultValue=""
              />
              <FormControlLabel
                control={<Switch defaultChecked name="enableCookieConsent" color="primary" />}
                label="Aktifkan Cookie Consent Banner"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
                  Simpan Pengaturan
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" gutterBottom>
            Pengaturan Notifikasi
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Notifikasi Email
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked name="emailNewTestimonial" color="primary" />}
                label="Kirim email saat ada testimoni baru"
              />
              <FormControlLabel
                control={<Switch defaultChecked name="emailNewContact" color="primary" />}
                label="Kirim email saat ada pesan kontak baru"
              />
              <FormControlLabel
                control={<Switch defaultChecked name="emailLoginAttempt" color="primary" />}
                label="Kirim email saat ada percobaan login yang mencurigakan"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Notifikasi Dashboard
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked name="dashboardNewTestimonial" color="primary" />}
                label="Tampilkan notifikasi di dashboard saat ada testimoni baru"
              />
              <FormControlLabel
                control={<Switch defaultChecked name="dashboardNewContact" color="primary" />}
                label="Tampilkan notifikasi di dashboard saat ada pesan kontak baru"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" color="primary" startIcon={<SaveIcon />}>
                  Simpan Pengaturan
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
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

