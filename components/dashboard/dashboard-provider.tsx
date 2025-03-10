"use client"

import React from "react"

import { createContext, useContext, type ReactNode } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
})

// Create context
type DashboardContextType = {
  // Add any dashboard context values here
  sidebarOpen: boolean
  toggleSidebar: () => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined)

export function useDashboard() {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider")
  }
  return context
}

export function DashboardProvider({ children }: { children: ReactNode }) {
  // Add any dashboard state here
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <DashboardContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </DashboardContext.Provider>
  )
}

