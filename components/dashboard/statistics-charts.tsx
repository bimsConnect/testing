"use client"

import { useState } from "react"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts"

// Mock data for visitor statistics
const visitorData = [
  { name: "Jan", visitors: 4000, pageViews: 6400, uniqueVisitors: 2400 },
  { name: "Feb", visitors: 3000, pageViews: 4300, uniqueVisitors: 1900 },
  { name: "Mar", visitors: 6000, pageViews: 9000, uniqueVisitors: 3200 },
  { name: "Apr", visitors: 8000, pageViews: 12000, uniqueVisitors: 4800 },
  { name: "May", visitors: 5000, pageViews: 7500, uniqueVisitors: 3100 },
  { name: "Jun", visitors: 9000, pageViews: 13500, uniqueVisitors: 5400 },
  { name: "Jul", visitors: 10000, pageViews: 15000, uniqueVisitors: 6000 },
  { name: "Aug", visitors: 12000, pageViews: 18000, uniqueVisitors: 7200 },
  { name: "Sep", visitors: 11000, pageViews: 16500, uniqueVisitors: 6600 },
  { name: "Oct", visitors: 13000, pageViews: 19500, uniqueVisitors: 7800 },
  { name: "Nov", visitors: 14000, pageViews: 21000, uniqueVisitors: 8400 },
  { name: "Dec", visitors: 15000, pageViews: 22500, uniqueVisitors: 9000 },
]

// Mock data for content statistics
const contentData = [
  { name: "Blog", value: 12 },
  { name: "Galeri", value: 24 },
  { name: "Testimoni", value: 18 },
]

// Mock data for traffic sources
const trafficSourceData = [
  { name: "Organic Search", value: 45 },
  { name: "Direct", value: 25 },
  { name: "Social Media", value: 15 },
  { name: "Referral", value: 10 },
  { name: "Email", value: 5 },
]

// Mock data for device usage
const deviceData = [
  { name: "Desktop", value: 55 },
  { name: "Mobile", value: 35 },
  { name: "Tablet", value: 10 },
]

// Mock data for page performance
const pagePerformanceData = [
  { name: "Beranda", views: 8500, avgTime: 120 },
  { name: "Tentang Kami", views: 3200, avgTime: 90 },
  { name: "Galeri", views: 4800, avgTime: 150 },
  { name: "Blog", views: 6200, avgTime: 180 },
  { name: "Testimoni", views: 3800, avgTime: 100 },
  { name: "Kontak", views: 2900, avgTime: 70 },
]

// Colors for charts
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"]

export default function StatisticsCharts() {
  const [timeRange, setTimeRange] = useState("year")
  const [chartType, setTimeChartType] = useState("area")

  // Filter data based on time range
  const getFilteredData = () => {
    if (timeRange === "month") {
      // Last 30 days (just show last 4 entries for demo)
      return visitorData.slice(-4)
    } else if (timeRange === "quarter") {
      // Last 90 days (just show last 8 entries for demo)
      return visitorData.slice(-8)
    } else {
      // Full year
      return visitorData
    }
  }

  const filteredData = getFilteredData()

  // Render different chart types
  const renderVisitorChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
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
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
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
              <Line
                type="monotone"
                dataKey="visitors"
                name="Total Pengunjung"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                animationDuration={1500}
              />
              <Line
                type="monotone"
                dataKey="uniqueVisitors"
                name="Pengunjung Unik"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        )
      default: // area
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
      {/* Visitor Statistics */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }} elevation={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" component="h2" fontWeight="bold">
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
                <MenuItem value="month">30 Hari Terakhir</MenuItem>
                <MenuItem value="quarter">90 Hari Terakhir</MenuItem>
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
                onChange={(e) => setTimeChartType(e.target.value)}
              >
                <MenuItem value="area">Area</MenuItem>
                <MenuItem value="line">Line</MenuItem>
                <MenuItem value="bar">Bar</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        {renderVisitorChart()}
      </Paper>

      {/* Content and Traffic Source */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%", borderRadius: 2 }} elevation={3}>
            <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
              Distribusi Konten
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {contentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} item`, undefined]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    border: "none",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: "100%", borderRadius: 2 }} elevation={3}>
            <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
              Sumber Traffic
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius="80%"
                barSize={10}
                data={trafficSourceData}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar
                  background
                  dataKey="value"
                  cornerRadius={8}
                  label={{ fill: "#666", position: "insideStart" }}
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {trafficSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </RadialBar>
                <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  wrapperStyle={{ paddingLeft: 20 }}
                />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, undefined]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    border: "none",
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Device Usage and Page Performance */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, height: "100%", borderRadius: 2 }} elevation={3}>
            <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
              Penggunaan Perangkat
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  paddingAngle={5}
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, undefined]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    border: "none",
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, height: "100%", borderRadius: 2 }} elevation={3}>
            <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
              Performa Halaman
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={pagePerformanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip
                  formatter={(value, name) => [
                    name === "views" ? `${value.toLocaleString()} views` : `${value} detik`,
                    name === "views" ? "Jumlah View" : "Waktu Rata-rata",
                  ]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                    border: "none",
                  }}
                />
                <Legend />
                <Bar dataKey="views" name="Jumlah View" fill="#8884d8" radius={[0, 4, 4, 0]} animationDuration={1500} />
                <Bar
                  dataKey="avgTime"
                  name="Waktu Rata-rata (detik)"
                  fill="#82ca9d"
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}

