import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import "./index.css";

function PieChartGraph({ data = [] }) {
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
    <PieChart height={500} width={500}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        labelLine={true}
        label={({ cx, cy, midAngle, outerRadius, value, index }) => {
          const RADIAN = Math.PI / 180;
          const radius = 25 + outerRadius;
          const x = cx + radius * Math.cos(-midAngle * RADIAN);
          const y = cy + radius * Math.sin(-midAngle * RADIAN);
          return (
            <text
              x={x}
              y={y}
              fill={COLORS[index % COLORS.length]}
              fontSize={15}
              fontFamily="sans-serif"
              textAnchor={x > cx ? "start" : "end"}
              dominantBaseline="central"
            >
              {value}
            </text>
          );
        }}
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={COLORS[index % COLORS.length]}
            stroke={COLORS[index % COLORS.length]}
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
