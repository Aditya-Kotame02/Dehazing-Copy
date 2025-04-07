import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [systemStats, setSystemStats] = useState({
    processedImages: 0,
    successfulImages: 0,
    avgProcessingTime: 0,
    successRate: 0,
    psnr: 0,
    accuracy: 0, // Ensure accuracy is initialized
  });
  const [processingHistory, setProcessingHistory] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    psnr: 0,
    accuracy: 0, // Add accuracy to performance metrics
  });

  // WebSocket connection for real-time updates
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received WebSocket message:", message);

      if (message.type === "stats") {
        console.log("Updating system stats:", message.data);
        setSystemStats(prev => ({
          ...prev,
          ...message.data,
          // Ensure accuracy is included in the update
          accuracy: message.data.accuracy !== undefined ? message.data.accuracy : prev.accuracy
        }));
      }
    };
    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onerror = (error) => console.error("WebSocket error:", error);

    return () => ws.close();
  }, []);

  // Fetch initial data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, historyRes, metricsRes, activityRes] = await Promise.all([
          axios.get("http://localhost:5000/api/system-stats"),
          axios.get("http://localhost:5000/api/processing-history"),
          axios.get("http://localhost:5000/api/performance-metrics"), // Fetch performance metrics
          axios.get("http://localhost:5000/api/recent-activity"),
        ]);

        setSystemStats(statsRes.data);
        setProcessingHistory(historyRes.data);
        setPerformanceMetrics(metricsRes.data); // Store performance metrics
        setRecentActivity(activityRes.data);
        
        console.log("Fetched performance metrics:", metricsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Chart data for processing history
  const historyChartData = {
    labels: processingHistory.map((entry) => entry.date),
    datasets: [
      {
        label: "Processed Images",
        data: processingHistory.map((entry) => entry.count),
        borderColor: "rgba(79, 70, 229, 1)",
        backgroundColor: "rgba(79, 70, 229, 0.1)",
        borderWidth: 2,
        tension: 0.1,
        fill: true,
      },
    ],
  };

  // Chart data for performance metrics (now includes accuracy)
  const performanceChartData = {
    labels: ["PSNR", "Accuracy"],
    datasets: [
      {
        label: "Performance Metrics",
        data: [
          performanceMetrics.psnr ?? 0,
          performanceMetrics.accuracy ?? 0
        ],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(236, 72, 153, 0.8)"
        ],
        borderColor: [
          "rgba(79, 70, 229, 1)",
          "rgba(219, 39, 119, 1)"
        ],
        borderWidth: 1,
      },
    ],
  };

  // UI Cards
  const statsCards = [
    { 
      title: "Processed Images", 
      value: systemStats.processedImages,
      color: "bg-indigo-100 text-indigo-800"
    },
    { 
      title: "Successful Images", 
      value: systemStats.successfulImages,
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Avg. Processing Time",
      value:
        systemStats.avgProcessingTime !== undefined
          ? `${systemStats.avgProcessingTime.toFixed(2)} ms`
          : "N/A",
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Success Rate",
      value:
        systemStats.successRate !== undefined
          ? `${systemStats.successRate.toFixed(2)}%`
          : "N/A",
      color: "bg-purple-100 text-purple-800"
    },
    {
      title: "Accuracy",
      value:
        systemStats.accuracy !== undefined
          ? `${systemStats.accuracy.toFixed(2)}%`
          : "N/A",
      color: "bg-pink-100 text-pink-800"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">System Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {statsCards.map((stat, index) => (
          <div 
            key={index} 
            className={`p-6 rounded-lg shadow-sm border ${stat.color} transition-all hover:shadow-md`}
          >
            <h2 className="text-sm font-medium uppercase tracking-wider">{stat.title}</h2>
            <p className="text-2xl font-bold mt-2">{stat.value ?? "N/A"}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Processing History Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Processing History (Last 7 Days)
          </h2>
          <div className="h-64">
            <Line 
              data={historyChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            {recentActivity.map((activity, index) => (
              <li 
                key={index} 
                className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <p className="text-sm text-gray-700">{activity.description}</p>
                <span className="text-xs text-gray-500">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h2>
          <div className="h-64">
            <Bar 
              data={performanceChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100 // Since accuracy is a percentage
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



