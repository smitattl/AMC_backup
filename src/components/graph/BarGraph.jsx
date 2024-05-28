import React from "react";
import Plot from "react-plotly.js";

const BarGraph = ({ data = null }) => {
  const annotationOffset = 10;
  const lineLength = 10;
  const lineWidth = 2;
  const shapes = data[0]?.x.map((category, index) => ({
    type: "line",
    xref: "x",
    yref: "y",
    x0: category,
    x1: category,
    y0: data[0].y[index],
    y1: data[0].y[index] + lineLength,
    line: {
      color: "#1f77b4",
      width: lineWidth,
    },
  }));

  const layout = {
    xaxis: { title: "Month" },
    yaxis: { title: "Percentage", titlestandoff: 100 },
    annotations: data[0]?.y.map((value, index) => ({
      x: data[0].x[index],
      y: value + annotationOffset,
      text: value,
      xanchor: "center",
      yanchor: "bottom",
      showarrow: false,
      font: {
        size: 12,
        color: "#1f77b4",
        family: "Arial",
      },
    })),
    shapes: shapes,
    hovermode: "closest",
    hoverinfo: "none",
    hoverlabel: {
      bgcolor: "#FAFAFA",
      font: { color: "#1f77b4" },
      bordercolor: "#1f77b4",
      borderwidth: 2,
      borderpad: 4,
      borderRadius: 4,
    },
    autosize: true,
    margin: {
      l: 80,
      r: 40,
      b: 80,
      t: 80,
      pad: 4,
    },
    responsive: true,
  };
  const config = {
    displayModeBar: false,
  };
  return <Plot data={data} layout={layout} config={config} />;
};

export default BarGraph;
