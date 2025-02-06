import React from "react";
import { ReactFlow, Controls, Background, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./FlowChart.css";

const FlowChart = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onSelectionChange,
}) => {
  // Generate a key based on the node IDs to force re-rendering of the MiniMap on changes.
  const minimapKey = nodes.map((node) => node.id).join("-");

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onSelectionChange={onSelectionChange}
      fitView
      minZoom={0.1}
      maxZoom={10}
      style={{ width: "100%", height: "100%" }}
    >
      <MiniMap />
      <Controls />
      <Background variant="dots" gap={12} size={1} />
    </ReactFlow>
  );
};

export default FlowChart;
