import { NavLink } from "react-router";

export default function NavBar() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        <NavLink to="/">All</NavLink>
        <NavLink to="/new">Add New</NavLink>
      </div>
      <div>
        <button
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
}
