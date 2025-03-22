import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
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
} from 'chart.js';

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
  });
  const [processingHistory, setProcessingHistory] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    psnr: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("Received WebSocket message:", message);

      if (message.type === "stats") {
        console.log("Updating system stats with:", message.data);
        setSystemStats(message.data); // Update system stats in real-time
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array ensures this runs only once

  // Log updated system stats
  useEffect(() => {
    console.log("Updated systemStats:", systemStats);
  }, [systemStats]);

  // Fetch initial data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching system stats...");
        const statsResponse = await axios.get('http://localhost:5000/api/system-stats');
        console.log("System stats response:", statsResponse.data);

        console.log("Fetching processing history...");
        const historyResponse = await axios.get('http://localhost:5000/api/processing-history');
        console.log("Processing history response:", historyResponse.data);

        console.log("Fetching performance metrics...");
        const metricsResponse = await axios.get('http://localhost:5000/api/performance-metrics');
        console.log("Performance metrics response:", metricsResponse.data);

        console.log("Fetching recent activity...");
        const activityResponse = await axios.get('http://localhost:5000/api/recent-activity');
        console.log("Recent activity response:", activityResponse.data);

        // Update state with fetched data
        setSystemStats(statsResponse.data);
        setProcessingHistory(historyResponse.data);
        setPerformanceMetrics(metricsResponse.data);
        setRecentActivity(activityResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Chart data for processing history
  const historyChartData = {
    labels: processingHistory.map((entry) => entry.date),
    datasets: [
      {
        label: 'Processed Images',
        data: processingHistory.map((entry) => entry.count),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Chart data for PSNR
  const psnrChartData = {
    labels: ['PSNR'],
    datasets: [
      {
        label: 'PSNR',
        data: [systemStats.psnr],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
    ],
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">System Dashboard</h1>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Processed Images</h2>
          <p className="text-2xl">{systemStats.processedImages}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Successful Images</h2>
          <p className="text-2xl">{systemStats.successfulImages}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Avg. Processing Time</h2>
          <p className="text-2xl">{systemStats.avgProcessingTime.toFixed(2)} ms</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Success Rate</h2>
          <p className="text-2xl">{systemStats.successRate.toFixed(2)}%</p>
        </div>
      </div>

      {/* Processing History Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Processing History (Last 7 Days)</h2>
        <Line data={historyChartData} />
      </div>

      {/* Performance Metrics */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Performance Metrics</h2>
        <Bar data={psnrChartData} />
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <ul>
          {recentActivity.map((activity, index) => (
            <li key={index} className="mb-2">
              {activity.description} - <span className="text-gray-500">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;