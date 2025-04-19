
"use client";

import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement);

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "User Growth",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "#E31C3D",
    },
  ],
};

const pieData = {
  labels: ["Mentors", "Mentees"],
  datasets: [
    {
      label: "User Distribution",
      data: [320, 925],
      backgroundColor: ["#E31C3D", "#000000"],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  },
};

export default function OverviewTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-background shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold">Total Users</h2>
        <p className="text-gray-500">Since last month</p>
        <p className="text-4xl font-bold mt-4">1,245</p>
        <p className="text-green-500 mt-2">12.5% ↑</p>
      </div>
      <div className="bg-background shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold">Active Mentors</h2>
        <p className="text-gray-500">Since last month</p>
        <p className="text-4xl font-bold mt-4">320</p>
        <p className="text-green-500 mt-2">8.3% ↑</p>
      </div>
      <div className="bg-background shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold">Active Mentees</h2>
        <p className="text-gray-500">Since last month</p>
        <p className="text-4xl font-bold mt-4">925</p>
        <p className="text-green-500 mt-2">15.2% ↑</p>
      </div>
      <div className="col-span-2 bg-background shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">User Growth</h2>
        <Bar data={data} options={options} />
      </div>
      <div className="bg-background shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">User Distribution</h2>
        <Pie data={pieData} options={options} />
      </div>
    </div>
  );
}
