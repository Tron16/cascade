import React, { useState } from "react";
import { useNodesState, useEdgesState } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import FlowChart from "./components/FlowChart";
import "./App.css";

function App() {
  const initialNodes = [
    {
      id: "root",
      type: "input",
      data: { label: "Which client should we take on?" },
      position: { x: 300, y: 25 },
      style: { animation: "fadeIn 1s ease-in-out" },
    },
    {
      id: "node-1",
      data: { label: "Client Impact & Alignment" },
      position: { x: 50, y: 150 },
      style: { animation: "slideInLeft 1s ease-in-out" },
    },
    {
      id: "node-2",
      data: { label: "Feasibility & Resources" },
      position: { x: 250, y: 150 },
      style: { animation: "fadeIn 1s ease-in-out" },
    },
    {
      id: "node-3",
      data: { label: "Reputation & Networking Opportunities" },
      position: { x: 450, y: 150 },
      style: { animation: "slideInRight 1s ease-in-out" },
    },
    {
      id: "node-4",
      data: { label: "Financial & Logistical Considerations" },
      position: { x: 650, y: 150 },
      style: { animation: "fadeIn 1s ease-in-out" },
    },
  ];

  const initialEdges = [
    { id: "edge-1", source: "root", target: "node-1", animated: true },
    { id: "edge-2", source: "root", target: "node-2", animated: true },
    { id: "edge-3", source: "root", target: "node-3", animated: true },
    { id: "edge-4", source: "root", target: "node-4", animated: true },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [weights, setWeights] = useState({
    "node-1": 0.25,
    "node-2": 0.25,
    "node-3": 0.25,
    "node-4": 0.25,
  });

  const updateWeight = (nodeId, value) => {
    setWeights((prev) => ({
      ...prev,
      [nodeId]: value,
    }));
  };

  // Update selected nodes based on selection changes in React Flow
  const handleSelectionChange = (selection) => {
    setSelectedNodes(selection.nodes);
  };

  // Adds a new node at a random position
  const addNode = () => {
    const offsetY = 100; // Offset to position the new node below the longest branch
    // Find the node with the maximum y position
    const bottomNode = nodes.reduce(
      (maxNode, node) =>
        node.position.y > maxNode.position.y ? node : maxNode,
      nodes[0]
    );

    const newNodeId = `node-${new Date().getTime()}`;
    const newNode = {
      id: newNodeId,
      data: { label: "New Node" },
      position: {
        x: bottomNode.position.x,
        y: bottomNode.position.y + offsetY,
      },
      style: { animation: "fadeIn 1s ease-in-out" },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  // Removes the currently selected node(s)
  const removeSelectedNode = () => {
    if (!selectedNodes || selectedNodes.length === 0) return;
    const selectedIds = selectedNodes.map((node) => node.id);
    setNodes((nds) => nds.filter((node) => !selectedIds.includes(node.id)));
  };

  return (
    <div className="app">
      <div className="node-controls">
        <button onClick={addNode}>Add Node</button>
        <button onClick={removeSelectedNode}>Remove Selected Node</button>
      </div>
      <div className="flow-container">
        <FlowChart
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onSelectionChange={handleSelectionChange}
        />
      </div>
    </div>
  );
}

export default App;
