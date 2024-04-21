import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

function PieChartGraph({ data = [], increaseHeight = false }) {
  const COLORS = [
    "#a2a2a3",
    "#ffd700",
    "#e6be8a",
    "#727372",
    "#cd7f32",
    "#253aa7",
    "#ffcf20",
    "#f21f99",
    "#df5891",
    "#afd6e4",
    "#b0ee6e",
    "#f9a458",
    "#5870a1",
    "#6a747c",
    "#4271e1",
    "#608592",
    "#12383c",
  ];

  return (
    <PieChart
      width={increaseHeight ? 400 : 250}
      height={increaseHeight ? 400 : 250}
    >
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={70}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            // fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend
        formatter={(value, entry, index) => {
          return (
            <span
              style={{
                color: COLORS[index],
              }}
            >
              {value}
            </span>
          );
        }}
      />
    </PieChart>
  );
}

export default PieChartGraph;
