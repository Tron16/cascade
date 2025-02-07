import { useState, useEffect } from "react";
import { useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import FlowChart from "./FlowChart";
import NodeAdder from "./NodeAdder";
import MeetingPanel from "./MeetingPanel";
import "./Workspace.css";

function Workspace() {
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
  const [showNodeAdder, setShowNodeAdder] = useState(false);

  // Undo/Redo stacks for nodes
  const [pastNodes, setPastNodes] = useState([]);
  const [futureNodes, setFutureNodes] = useState([]);

  const updateWeight = (nodeId, value) => {
    setWeights((prev) => ({ ...prev, [nodeId]: value }));
  };

  const handleSelectionChange = (selection) => {
    setSelectedNodes(selection.nodes);
  };

  // Modified addNode to accept a label parameter.
  // Push the current nodes onto the past stack and clear future states.
  const addNode = (label = "New Node") => {
    setPastNodes((prev) => [...prev, nodes]);
    setFutureNodes([]);
    const offsetY = 100; // Position the new node 100px below the current bottom node.
    const bottomNode = nodes.reduce(
      (maxNode, node) =>
        node.position.y > maxNode.position.y ? node : maxNode,
      nodes[0]
    );
    const newNodeId = `node-${new Date().getTime()}`;
    const newNode = {
      id: newNodeId,
      data: { label },
      position: {
        x: bottomNode.position.x,
        y: bottomNode.position.y + offsetY,
      },
      style: { animation: "fadeIn 1s ease-in-out" },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Modified removeSelectedNode to push current nodes onto the past stack and clear future states.
  const removeSelectedNode = () => {
    if (!selectedNodes || selectedNodes.length === 0) return;
    setPastNodes((prev) => [...prev, nodes]);
    setFutureNodes([]);
    const selectedIds = selectedNodes.map((node) => node.id);
    setNodes((nds) => nds.filter((node) => !selectedIds.includes(node.id)));
  };

  // Listen for global Enter key press (when not in an input) to show the NodeAdder.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "Enter" &&
        !showNodeAdder &&
        event.target.tagName !== "INPUT"
      ) {
        setShowNodeAdder(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showNodeAdder]);

  const handleNodeAdderSubmit = (label) => {
    addNode(label);
    setShowNodeAdder(false);
  };

  const handleNodeAdderCancel = () => {
    setShowNodeAdder(false);
  };

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  // Global Undo/Redo handling
  useEffect(() => {
    const handleUndoRedo = (event) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      const ctrlKey = isMac ? event.metaKey : event.ctrlKey;
      if (ctrlKey && event.key.toLowerCase() === "z") {
        // Redo if Shift is pressed; otherwise, Undo.
        if (event.shiftKey) {
          if (futureNodes.length > 0) {
            const lastFuture = futureNodes[futureNodes.length - 1];
            setFutureNodes((prev) => prev.slice(0, prev.length - 1));
            setPastNodes((prev) => [...prev, nodes]);
            setNodes(lastFuture);
          }
        } else {
          if (pastNodes.length > 0) {
            const lastPast = pastNodes[pastNodes.length - 1];
            setPastNodes((prev) => prev.slice(0, prev.length - 1));
            setFutureNodes((prev) => [...prev, nodes]);
            setNodes(lastPast);
          }
        }
      }
    };

    window.addEventListener("keydown", handleUndoRedo);
    return () => window.removeEventListener("keydown", handleUndoRedo);
  }, [pastNodes, futureNodes, nodes]);

  return (
    <div className="app-container">
      <MeetingPanel />
      <div className="flow-container">
        <div className="node-controls">
          <button onClick={() => addNode()}>Add Node</button>
          <button onClick={removeSelectedNode}>Remove Selected Node</button>
        </div>
        <FlowChart
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onSelectionChange={handleSelectionChange}
          onConnect={onConnect}
        />
      </div>
      <NodeAdder
        visible={showNodeAdder}
        onSubmit={handleNodeAdderSubmit}
        onCancel={handleNodeAdderCancel}
      />
    </div>
  );
}

export default Workspace;
