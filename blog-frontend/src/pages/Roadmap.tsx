import { useState, useRef, useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import type { Node as FlowNode } from "reactflow";
import "reactflow/dist/style.css";
import { useTheme } from "next-themes";
import { createNode, createEdge, type NodeStatus, type NodeMeta } from "../components/RoadmapHelper";
import { useIsMobile } from "../hooks/UseMobile";

/* ----------------------------- static data ----------------------------- */

const nodeData: [string, string, number, number, NodeStatus, string[], string, string?][] = [
  [
    "1",
    "ML & DL Foundations",
    400,
    0,
    "done",
    ["ISLP (Introduction to Statistical Learning)", "Machine Learning with PyTorch and Scikit-Learn"],
    "March 2025",
    "Basic concepts in ML & DL, setting the stage for more advanced topics.",
  ],
  [
    "2",
    "NLP & Generative DL",
    200,
    120,
    "done",
    ["NLP with Transformers", "Generative Deep Learning"],
    "May 2025",
    "Focused on understanding transformers and text generation.",
  ],
  [
    "3",
    "Time Series",
    400,
    240,
    "inProgress",
    [
      "Time Series Analysis and Its Applications",
      "Deep Learning for Time Series Forecasting Cookbook",
      "Weekly Paper: Transformer Variants",
    ],
    "July 2025",
    "Exploring time series forecasting with both classical and DL approaches.",
  ],
  [
    "4",
    "ML Theory & Math",
    400,
    360,
    "notStarted",
    ["Elements of Statistical Learning", "Math for Machine Learning"],
    "September 2025",
    "Deepening understanding of ML theory and foundational math.",
  ],
  [
    "5",
    "Transformer Deep Dive",
    550,
    120,
    "inProgress",
    ["Attention is All You Need (Vaswani et al.)", "Upcoming Papers ..."],
    "Till the Singularity",
    "Reading core papers and internals of transformers for various modalities.",
  ],
];

const resourceArray = [
  {
    title: "ISLP (Introduction to Statistical Learning",
    usedIn: ["ML & DL Foundations"],
    review:
      "A not-so gentle introduction to statistical learning. Great if you are just learning about ML and has great examples in Python but can get quite lengthy.",
  },
  {
    title: "Machine Learning with PyTorch and Scikit-Learn",
    usedIn: ["ML & DL Foundations"],
    review:
      "Honestly, the best book I've read so far on ML and DL. Brings in complex concepts like GNNs in a fun and simple way - must read!",
  },
  {
    title: "NLP with Transformers",
    usedIn: ["NLP & Generative DL"],
    review: "Covers HuggingFace's ecosystem and modern NLP. Very hands-on and up to date.",
  },
  {
    title: "Generative Deep Learning",
    usedIn: ["NLP & Generative DL"],
    review: "Walks you through generating images, text, and more using DL models. Great for GenAI beginners.",
  },
  {
    title: "Time Series Analysis and Its Applications",
    usedIn: ["Time Series"],
    review: "Still not complete, but enjoying the Math and exercises.",
  },
  {
    title: "Deep Learning for Time Series Forecasting Cookbook",
    usedIn: ["Time Series"],
    review: "Didn't read enough for a review yet!",
  },
  {
    title: "Elements of Statistical Learning",
    usedIn: ["ML Theory & Math"],
    review: "Tried reading this before ISLP and found it really hard, can't wait to try at it again!",
  },
  {
    title: "Math for Machine Learning",
    usedIn: ["ML Theory & Math"],
    review: "Essential math topics like linear algebra, calculus, and probability explained with ML context.",
  },
  {
    title: "Attention is All You Need (Vaswani et al.)",
    usedIn: ["Transformer Deep Dive"],
    review: "Honestly a must read to understand how transformers work, consider reading my bachelor's thesis too, hehe.",
  },
];

const edgeData: [string, string, string, NodeStatus][] = [
  ["e1-2", "1", "2", "done"],
  ["e2-3", "2", "3", "inProgress"],
  ["e3-4", "3", "4", "notStarted"],
  ["e1-5", "1", "5", "inProgress"],
];

/* ----------------------------- component ------------------------------ */

export default function Roadmap() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const isMobile = useIsMobile();
  const scrollRef = useRef<HTMLDivElement>(null);

  const nodes = useMemo(() => {
    return nodeData.map(([id, label, x, y, status, resources, deadline, description]) =>
      createNode(id, label, x, y, status, dark, resources, deadline, description)
    );
  }, [dark]);

  const edges = useMemo(() => {
    return edgeData.map(([id, source, target, status]) => createEdge(id, source, target, status));
  }, []);

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

  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);
  const [hoveredNode, setHoveredNode] = useState<FlowNode<NodeMeta> | null>(null);
  const mousePositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleNodeMouseEnter = (_: unknown, node: FlowNode<NodeMeta>) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHoveredNode(node);
    }, 200); // shorter delay for UX
  };

  const handleNodeMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = null;
    setHoveredNode(null);
  };

  const handleNodeMouseMove = (event: React.MouseEvent) => {
    mousePositionRef.current = { x: event.clientX, y: event.clientY };
  };

  /* --------------------------- markup ------------------------- */

  return (
    <>
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          textAlign: "center",
          padding: "1.5rem",
        }}
      >
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "bold",
            color: "#cc2277",
            marginBottom: "1.25rem",
          }}
        >
          Welcome to My Roadmap
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "1.5rem",
            textAlign: "left",
            maxWidth: "1100px",
            margin: "0 auto 1.5rem",
            fontSize: "1rem",
            color: dark ? "#e2e8f0" : "#1a202c",
            lineHeight: 1.6,
          }}
        >
          <div>
            <div>
              <li>
                <strong>Hover</strong> over any node to <span style={{ fontWeight: 500 }}>see a short description</span>.
              </li>
              <hr style={{ border: 0, borderTop: "1px solid #ccc", margin: "0.75rem 0" }} />
            </div>
            <div>
              <li>
                <strong>Click</strong> a node to open a <span style={{ fontWeight: 500 }}>detailed sidebar panel</span>.
              </li>
              <hr style={{ border: 0, borderTop: "1px solid #ccc", margin: "0.75rem 0" }} />
            </div>
          </div>
          <div>
            <div>
              <li>
                Nodes are arranged by <span style={{ fontWeight: 500 }}>timeline and dependency</span>.
              </li>
              <hr style={{ border: 0, borderTop: "1px solid #ccc", margin: "0.75rem 0" }} />
            </div>
            <div>
              <li>
                Scroll or use the link below to view <strong>resources and personal reviews</strong>.
              </li>
              <hr style={{ border: 0, borderTop: "1px solid #ccc", margin: "0.75rem 0" }} />
            </div>
          </div>
        </div>

        <p
          onClick={() => scrollRef.current?.scrollIntoView({ behavior: "smooth" })}
          style={{
            textDecoration: "underline",
            color: "#3b82f6",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "1rem",
            transition: "color 0.2s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#1d4ed8")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#3b82f6")}
        >
          Go to Resources & Reviews Section
        </p>
      </section>

      <div
        style={{
          marginTop: "2rem",
          textAlign: "center",
          fontSize: "0.95rem",
          color: theme === "dark" ? "#e5e7eb" : "#1f2937",
          lineHeight: 1.6,
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <p>
          If you’d like to <span style={{ color: "#cc2277", fontWeight: 500 }}>propose changes</span> to my roadmap or share any valuable{" "}
          <span style={{ color: "#cc2277", fontWeight: 500 }}>resource advice</span> or even recommendations, feel free to send me a
          personal email. You can find it in the footer.
        </p>
        <p style={{ marginTop: "0.5rem" }}>We’re all in the loop, after all 😉</p>
      </div>

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
            My Learning Roadmap
          </h2>

          <div style={{ width: "100%", height: "calc(100% - 2rem)" }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              onNodeClick={(_, node) => setSelectedNode(node)}
              onNodeMouseEnter={handleNodeMouseEnter}
              onNodeMouseLeave={handleNodeMouseLeave}
              onNodeMouseMove={handleNodeMouseMove}
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

      {hoveredNode && hoveredNode.data.description && (
        <div
          style={{
            position: "fixed",
            top: mousePositionRef.current.y + 12,
            left: mousePositionRef.current.x + 12,
            padding: "0.6rem 0.9rem",
            background: "rgba(0,0,0,0.8)",
            color: "white",
            borderRadius: "8px",
            maxWidth: "260px",
            fontSize: "0.85rem",
            zIndex: 999,
            pointerEvents: "none",
            backdropFilter: "blur(2px)",
            fontStyle: "italic",
            boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          {hoveredNode.data.description}
        </div>
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

            {selectedNode?.data.description && (
              <>
                <hr style={{ border: 0, height: 1, background: dark ? "#4A5568" : "#E2E8F0", margin: "0.75rem 0" }} />
                <strong>Description</strong>
                <p style={{ margin: 0, fontStyle: "italic" }}>{selectedNode.data.description}</p>
              </>
            )}

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

            <hr style={{ border: 0, height: 1, background: dark ? "#4A5568" : "#E2E8F0", margin: "0.75rem 0" }} />
          </>
        )}
      </div>

      <section
        ref={scrollRef}
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem",
            color: "#cc2277",
            textAlign: "center",
          }}
        >
          Resources & Reviews
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "1.25rem",
          }}
        >
          {resourceArray.map((res, i) => (
            <div
              key={i}
              style={{
                border: "1px solid",
                borderColor: theme === "dark" ? "#4b5563" : "#e2e8f0",
                borderRadius: "0.5rem",
                padding: "1rem",
                backgroundColor: theme === "dark" ? "#1c1f24" : "#ffffff",
                color: theme === "dark" ? "#e2e8f0" : "#1a202c",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                transition: "background-color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#cc2277";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme === "dark" ? "#4b5563" : "#e2e8f0";
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  color: theme === "dark" ? "#f9fafb" : "#111827",
                }}
              >
                {res.title}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  marginBottom: "0.5rem",
                  color: theme === "dark" ? "#a1a1aa" : "#4b5563",
                }}
              >
                <span style={{ color: "#cc2277", fontWeight: 500 }}>Used In:</span> {res.usedIn.join(", ")}
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: theme === "dark" ? "#d1d5db" : "#374151",
                }}
              >
                <span style={{ color: "#cc2277", fontWeight: 500 }}>Review:</span> {res.review}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
