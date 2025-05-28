import { useState } from "react";
import ReactFlow, { Background, Controls, useNodesState, useEdgesState } from "reactflow";
import type { Node } from "reactflow";
import "reactflow/dist/style.css";
import { useTheme } from "next-themes";

import { createNode, createEdge, type NodeStatus, type NodeMeta } from "../components/RoadmapHelper";

const nodeData: [string, string, number, number, NodeStatus, string[], string][] = [
  ["1", "Math Foundations", 400, 0, "done", ["3Blue1Brown", "Khan Academy"], "March 2025"],
  ["2", "Linear Algebra", 200, 120, "done", ["MIT OCW", "Linear Algebra Book"], "April 2025"],
  ["3", "Probability & Stats", 600, 120, "done", ["Khan Academy", "StatQuest"], "April 2025"],
  ["4", "ML Basics", 400, 240, "inProgress", ["Andrew Ng ML", "ISLP Book"], "May 2025"],
  ["5", "Deep Learning", 400, 360, "notStarted", ["DL Specialization", "FastAI"], "June 2025"],
  ["6", "Projects", 250, 480, "notStarted", ["Titanic Dataset", "Kaggle"], "June 2025"],
  ["7", "MLOps & Deployment", 550, 480, "notStarted", ["Designing ML Systems", "MadeWithML"], "July 2025"],
];

const edgeData: [string, string, string, NodeStatus][] = [
  ["e1-2", "1", "2", "done"],
  ["e1-3", "1", "3", "done"],
  ["e2-4", "2", "4", "inProgress"],
  ["e3-4", "3", "4", "inProgress"],
  ["e4-5", "4", "5", "notStarted"],
  ["e5-6", "5", "6", "notStarted"],
  ["e6-7", "6", "7", "notStarted"],
];

const getStatusColor = (status: NodeStatus) => {
  switch (status) {
    case "done":
      return "#38A169";
    case "inProgress":
      return "#ECC94B";
    case "notStarted":
      return "#E53E3E";
  }
};

export default function Roadmap() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const initialNodes = nodeData.map(([id, label, x, y, status, resources, deadline]) =>
    createNode(id, label, x, y, status, dark, resources, deadline)
  );
  const initialEdges = edgeData.map(([id, source, target, status]) => createEdge(id, source, target, status));

  const [nodes, , onNodesChange] = useNodesState<NodeMeta>(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node<NodeMeta> | null>(null);

  const handleNodeClick = (_: unknown, node: Node<NodeMeta>) => {
    setSelectedNode(node);
  };

  return (
    <div style={{ width: "70%", height: "85vh", padding: "1rem", paddingTop: "2rem", margin: "0 auto", position: "relative" }}>
      <h2 style={{ fontSize: "1.75rem", color: "#cc2277", marginBottom: "1rem" }}>My AI Learning Roadmap</h2>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onNodeClick={handleNodeClick}
      >
        <Controls />
        <Background gap={20} color={dark ? "#444" : "#eee"} />
      </ReactFlow>

      {selectedNode && (
        <div
          style={{
            position: "absolute",
            top: selectedNode.position.y + 100,
            left: selectedNode.position.x + 80,
            background: dark ? "#2D3748" : "#f9f9f9",
            padding: "1rem",
            borderRadius: 8,
            border: `2px solid ${getStatusColor(getNodeStatus(selectedNode.id))}`,
            width: 250,
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            zIndex: 999,
            color: dark ? "white" : "black",
          }}
        >
          <strong>{selectedNode.data.label}</strong>
          <p style={{ margin: "8px 0" }}>Deadline: {selectedNode.data.deadline}</p>
          <p style={{ marginBottom: 4 }}>Resources:</p>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {selectedNode.data.resources.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function getNodeStatus(id: string): NodeStatus {
  const found = nodeData.find((n) => n[0] === id);
  return found ? found[4] : "notStarted";
}
