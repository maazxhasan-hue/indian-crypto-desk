import { useState } from "react";

type LoginProps = {
  onLogin: () => void;
};

function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    /*
     * Temporary development credentials.
     *
     * We will replace this with proper authentication
     * before the website is published.
     */
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      sessionStorage.setItem(
        "adminLoggedIn",
        "true"
      );

      onLogin();
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "#050b17",
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          padding: "35px",
          borderRadius: "22px",
          background: "#151b29",
          border: "1px solid #293246",
          boxSizing: "border-box",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: "0 0 10px",
          }}
        >
          Admin Login
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#8f9bad",
            marginBottom: "30px",
          }}
        >
          Indian Crypto Desk
        </p>

        <label>Username</label>

        <input
          type="text"
          value={username}
          onChange={(event) =>
            setUsername(event.target.value)
          }
          placeholder="Enter username"
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #343d50",
            background: "#202636",
            color: "white",
            boxSizing: "border-box",
          }}
        />

        <label>Password</label>

        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Enter password"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleLogin();
            }
          }}
          style={{
            width: "100%",
            padding: "14px",
            marginTop: "8px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #343d50",
            background: "#202636",
            color: "white",
            boxSizing: "border-box",
          }}
        />

        {error && (
          <p
            style={{
              color: "#ff6b6b",
              marginBottom: "20px",
            }}
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "12px",
            background:
              "linear-gradient(180deg, #0878ff, #0567e7)",
            color: "white",
            fontSize: "17px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;