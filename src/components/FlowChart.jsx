import React, { useState, useEffect } from "react";
import { ReactFlow, Controls, Background, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./FlowChart.css";

const FlowChart = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onSelectionChange,
  onConnect,
}) => {
  const [minimapKey, setMinimapKey] = useState(0);

  // Update the minimap key whenever nodes change to force re-rendering
  useEffect(() => {
    setMinimapKey((prevKey) => prevKey + 1);
  }, [nodes]);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onSelectionChange={onSelectionChange}
        onConnect={onConnect}
        fitView
        minZoom={0.1}
        maxZoom={100} // High maxZoom for "infinite" zoom-like behavior
        style={{ width: "100%", height: "100%" }}
        panOnScroll={true}
      >
        <MiniMap />
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
