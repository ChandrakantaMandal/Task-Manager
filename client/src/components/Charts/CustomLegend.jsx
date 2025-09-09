import React from "react";

const CustomLegend = ({ payload = [] }) => {
  
  if (!payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {payload.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center space-x-2 mx-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color || entry.payload?.fill }}
          />
          <span className="text-sm font-medium text-gray-700">
            {entry.value || entry.payload?.status || entry.payload?.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
