import { Link } from "react-router-dom";

function HomeScreen() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Home</h1>
        <Link to="/documents">Manage Documents</Link>
      </div>
    </div>
  );
}

export default HomeScreen;
