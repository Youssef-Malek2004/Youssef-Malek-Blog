import type { Node, Edge } from "reactflow";
import { MarkerType } from "reactflow";

export type NodeStatus = "done" | "inProgress" | "notStarted";

export type NodeMeta = {
  label: string;
  resources: string[];
  deadline: string;
  description?: string;
};

const baseNodeStyle: React.CSSProperties = {
  padding: 12,
  borderRadius: 8,
  border: "2px solid #2e7d32",
  fontWeight: "bold",
  fontSize: "14px",
  textAlign: "center",
  background: "white",
};

export const createNode = (
  id: string,
  label: string,
  x: number,
  y: number,
  status: NodeStatus,
  isDark: boolean,
  resources: string[],
  deadline: string,
  description?: string
): Node<NodeMeta> => {
  const borderColor = status === "done" ? "#38A169" : status === "inProgress" ? "#ECC94B" : "#E53E3E";
  const bgColor = isDark ? "#1A202C" : status === "inProgress" ? "#FFFFE0" : "white";

  return {
    id,
    data: { label, resources, deadline, description },
    position: { x, y },
    type: "default",
    style: {
      ...baseNodeStyle,
      background: bgColor,
      border: `2px solid ${borderColor}`,
      color: isDark ? "white" : "black",
    },
  };
};

const edgeColor = {
  done: "#38A169",
  inProgress: "#ECC94B",
  notStarted: "#E53E3E",
};

export const createEdge = (id: string, source: string, target: string, status: NodeStatus): Edge => ({
  id,
  source,
  target,
  type: "smoothstep",
  markerEnd: { type: MarkerType.ArrowClosed },
  style: {
    stroke: edgeColor[status],
    strokeWidth: 2,
  },
  label: status === "done" ? "✅ Done" : status === "inProgress" ? "🟡 In Progress" : "🔴 Not Started",
  labelStyle: {
    fontSize: 12,
    fill: "#444",
    fontWeight: 600,
  },
});
