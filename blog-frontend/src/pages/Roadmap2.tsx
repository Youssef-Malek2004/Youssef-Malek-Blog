import { useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import type { Node as FlowNode } from "reactflow";
import "reactflow/dist/style.css";
import { useTheme } from "next-themes";

import { createNode, createEdge, type NodeStatus, type NodeMeta } from "../components/RoadmapHelper";
import { useIsMobile } from "../hooks/UseMobile";

/* ----------------------------- static data ----------------------------- */

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

/* ----------------------------- component ------------------------------ */

export default function Roadmap() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const isMobile = useIsMobile();

  const nodes = nodeData.map(([id, label, x, y, status, resources, deadline]) =>
    createNode(id, label, x, y, status, dark, resources, deadline)
  );
  const edges = edgeData.map(([id, source, target, status]) => createEdge(id, source, target, status));

  const [selectedNode, setSelectedNode] = useState<FlowNode<NodeMeta> | null>(null);

  /* --------------------------- layout ------------------------- */
  const desktopWidthPct = 30; // sidebar width = 30 % of viewport
  const mobileHeightPct = 45; // bottom-sheet height = 45 % of viewport

  const panelStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        height: `${mobileHeightPct}vh`,
        background: dark ? "#2D3748" : "#ffffff",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        transform: selectedNode ? "translateY(0)" : `translateY(${mobileHeightPct}vh)`,
        transition: "transform 0.35s ease",
        boxShadow: "0 -4px 14px rgba(0,0,0,0.25)",
        zIndex: 1201,
        padding: "1.25rem 1.5rem",
        color: dark ? "white" : "black",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      }
    : {
        position: "fixed",
        top: 0,
        right: 0,
        width: `${desktopWidthPct}vw`,
        height: "100vh",
        background: dark ? "#2D3748" : "#ffffff",
        transform: selectedNode ? "translateX(0)" : `translateX(${desktopWidthPct}vw)`,
        transition: "transform 0.35s ease",
        boxShadow: "-4px 0 14px rgba(0,0,0,0.25)",
        zIndex: 1201,
        padding: "1.5rem",
        color: dark ? "white" : "black",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
      };

  /* --------------------------- markup ------------------------- */

  return (
    <>
      {/* -------- main canvas -------- */}
      <div style={{ padding: "1rem", display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "100%",
            height: "85vh",
            maxWidth: "1200px",
            border: "2px solid #cc2277",
            borderRadius: 12,
            padding: "1rem",
            position: "relative",
            background: dark ? "#1A202C" : "#fff",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              color: "#cc2277",
              marginBottom: "1rem",
              textAlign: "center",
            }}
          >
            My AI Learning Roadmap
          </h2>

          <div style={{ width: "100%", height: "calc(100% - 2rem)" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              onNodeClick={(_, node) => setSelectedNode(node)}
              panOnScroll
              zoomOnScroll
              zoomOnPinch
              panOnDrag
              fitView
              fitViewOptions={{ padding: 0.3 }}
            >
              <Controls />
              <Background gap={20} color={dark ? "#444" : "#eee"} />
            </ReactFlow>
          </div>
        </div>
      </div>

      {/* -------- backdrop (click-to-close) -------- */}
      {selectedNode && (
        <div
          onClick={() => setSelectedNode(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 1200,
          }}
        />
      )}

      {/* -------- sidebar / bottom-sheet -------- */}
      <div style={panelStyle} onClick={(e) => e.stopPropagation()}>
        {selectedNode && (
          <>
            {/* close button */}
            <button
              onClick={() => setSelectedNode(null)}
              style={{
                alignSelf: "flex-end",
                background: "transparent",
                border: "none",
                fontSize: "1.35rem",
                fontWeight: 700,
                cursor: "pointer",
                color: dark ? "#F56565" : "#E53E3E",
              }}
              aria-label="Close details panel"
            >
              ×
            </button>

            {/* content */}
            <h3 style={{ margin: "0 0 0.5rem" }}>{selectedNode.data.label}</h3>

            <hr style={{ border: 0, height: 1, background: dark ? "#4A5568" : "#E2E8F0", margin: "0.75rem 0" }} />

            <p style={{ margin: 0 }}>
              <strong>Deadline:</strong> {selectedNode.data.deadline}
            </p>

            <hr style={{ border: 0, height: 1, background: dark ? "#4A5568" : "#E2E8F0", margin: "0.75rem 0" }} />

            <p style={{ margin: 0, marginBottom: "0.5rem" }}>
              <strong>Resources</strong>
            </p>
            <ul style={{ paddingLeft: "1.2rem", margin: 0, lineHeight: 1.5 }}>
              {selectedNode.data.resources.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
