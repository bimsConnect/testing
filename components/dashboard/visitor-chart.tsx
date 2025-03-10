"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Enhanced data for the chart with more realistic values and better visualization
const visitorData = [
  { name: "Jan", visitors: 4000, pageViews: 6400, uniqueVisitors: 2400 },
  { name: "Feb", visitors: 3000, pageViews: 4300, uniqueVisitors: 1900 },
  { name: "Mar", visitors: 6000, pageViews: 9000, uniqueVisitors: 3200 },
  { name: "Apr", visitors: 8000, pageViews: 12000, uniqueVisitors: 4800 },
  { name: "May", visitors: 5000, pageViews: 7500, uniqueVisitors: 3100 },
  { name: "Jun", visitors: 9000, pageViews: 13500, uniqueVisitors: 5400 },
  { name: "Jul", visitors: 10000, pageViews: 15000, uniqueVisitors: 6000 },
]

export default function VisitorChart() {
  const [timeRange, setTimeRange] = useState("month")
  const [chartType, setChartType] = useState("area")

  // Filter data based on time range
  const getFilteredData = () => {
    if (timeRange === "week") {
      // Last 7 days (just show last 3 entries for demo)
      return visitorData.slice(-3)
    } else if (timeRange === "month") {
      // Last 30 days (just show last 5 entries for demo)
      return visitorData.slice(-5)
    } else {
      // Full year
      return visitorData
    }
  }

  const filteredData = getFilteredData()

  // Render different chart types
  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  border: "none",
                }}
                formatter={(value: number) => [`${value.toLocaleString()} kunjungan`, undefined]}
              />
              <Legend />
              <Bar
                dataKey="visitors"
                name="Total Pengunjung"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
              <Bar
                dataKey="uniqueVisitors"
                name="Pengunjung Unik"
                fill="#82ca9d"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        )
      default: // area
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorUniqueVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                  border: "none",
                }}
                formatter={(value: number) => [`${value.toLocaleString()} kunjungan`, undefined]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="visitors"
                name="Total Pengunjung"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorVisitors)"
                strokeWidth={2}
                animationDuration={1500}
              />
              <Area
                type="monotone"
                dataKey="uniqueVisitors"
                name="Pengunjung Unik"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorUniqueVisitors)"
                strokeWidth={2}
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography component="h2" variant="h6" color="primary" fontWeight="bold">
          Statistik Pengunjung
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="time-range-label">Rentang Waktu</InputLabel>
            <Select
              labelId="time-range-label"
              id="time-range"
              value={timeRange}
              label="Rentang Waktu"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="week">7 Hari Terakhir</MenuItem>
              <MenuItem value="month">30 Hari Terakhir</MenuItem>
              <MenuItem value="year">1 Tahun</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="chart-type-label">Tipe Grafik</InputLabel>
            <Select
              labelId="chart-type-label"
              id="chart-type"
              value={chartType}
              label="Tipe Grafik"
              onChange={(e) => setChartType(e.target.value)}
            >
              <MenuItem value="area">Area</MenuItem>
              <MenuItem value="bar">Bar</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ height: 300, mt: 1 }}>{renderChart()}</Box>
    </>
  )
}

