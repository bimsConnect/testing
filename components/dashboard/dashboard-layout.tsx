"use client"

import type React from "react"

import { useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Container from "@mui/material/Container"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import DashboardIcon from "@mui/icons-material/Dashboard"
import ArticleIcon from "@mui/icons-material/Article"
import ImageIcon from "@mui/icons-material/Image"
import CommentIcon from "@mui/icons-material/Comment"
import BarChartIcon from "@mui/icons-material/BarChart"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import { logoutAction } from "@/app/actions/auth-actions"

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

export function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await logoutAction()
    router.push("/login")
    router.refresh()
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Dashboard Admin
          </Typography>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>A</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profil</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <SettingsIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Pengaturan</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            SaaS Company
          </Typography>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {/* Pastikan path navigasi sudah benar dan konsisten */}
          <Link href="/dashboard" passHref style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
          <Link href="/dashboard/blog" passHref style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              <ListItemText primary="Blog" />
            </ListItemButton>
          </Link>
          <Link href="/dashboard/galeri" passHref style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary="Galeri" />
            </ListItemButton>
          </Link>
          <Link href="/dashboard/testimoni" passHref style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              <ListItemText primary="Testimoni" />
            </ListItemButton>
          </Link>
          <Link href="/dashboard/statistik" passHref style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Statistik" />
            </ListItemButton>
          </Link>
          <Link href="/dashboard/pengaturan" passHref style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Pengaturan" />
            </ListItemButton>
          </Link>
          <Divider sx={{ my: 1 }} />
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </Box>
    </Box>
  )
}

