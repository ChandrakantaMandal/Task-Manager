import React from "react";
import {
  BarChart,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

const CustomBarChart = ({ data = [] }) => {
  //function to get alternative color
  const getBarColor = (priority) => {
    switch (priority) {
      case "Low":
        return "#10B981"; // green
      case "Medium":
        return "#F59E0B"; // amber
      case "High":
        return "#EF4444"; // red
      default:
        return "#6366F1"; // indigo
    }
  };


  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-b-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.priority}
          </p>
          <p className="text-sm text-gray-600">
            Count:
            <span className="text-sm text-gray-900 font-medium">
              {payload[0].payload.count}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="bg-white">
      <ResponsiveContainer width="100%" height={325}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="priority"
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
          <Bar
            dataKey="count"
            radius={[4, 4, 0, 0]}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.priority)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default CustomBarChart;
