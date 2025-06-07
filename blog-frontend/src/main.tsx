import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./components/ui/provider";
import App from "./App.tsx";
import "./index.css";
import "katex/dist/katex.min.css";
import "highlight.js/styles/github-dark.css"; // pick any theme you like

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
