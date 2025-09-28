// Entry point for the build script in your package.json
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { setAuthHeaders } from "./apis/axios";

document.addEventListener("DOMContentLoaded", () => {
  setAuthHeaders();
  const root = document.getElementById("root");
  if (root) {
    ReactDOM.createRoot(root).render(<App />);
  }
});
