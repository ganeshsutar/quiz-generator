import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

// Configure Amplify only if valid outputs exist with auth config
const hasValidConfig = outputs &&
  typeof outputs === "object" &&
  "auth" in outputs &&
  outputs.auth !== null &&
  typeof outputs.auth === "object" &&
  "user_pool_id" in outputs.auth;

if (hasValidConfig) {
  Amplify.configure(outputs as Parameters<typeof Amplify.configure>[0]);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
