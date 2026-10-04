import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Admin from "./admin/Admin";
import Login from "./admin/Login";

import "./index.css";

function AdminRoute() {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("adminLoggedIn") === "true"
  );

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    setLoggedIn(false);
  };

  if (!loggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <div
        style={{
          position: "fixed",
          top: "15px",
          right: "20px",
          zIndex: 9999,
        }}
      >
        <button
          type="button"
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            border: "1px solid #343d50",
            borderRadius: "8px",
            background: "#151b29",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <Admin />
    </div>
  );
}

function Root() {
  const path = window.location.pathname;

  // Remove the GitHub Pages / Vite base path
  // so both /admin and /indian-crypto-desk/admin work.
  const normalizedPath =
    path.replace(/^\/indian-crypto-desk/, "") || "/";

  if (
    normalizedPath === "/admin" ||
    normalizedPath.startsWith("/admin/")
  ) {
    return <AdminRoute />;
  }

  return <App />;
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);