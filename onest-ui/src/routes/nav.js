
import { Link, Outlet } from "react-router-dom";

function Nav() {
  return (
    <div className="App">

      <h1>Learn React Router</h1>

      <br/>
      <Link to="/">Home</Link> {" | "}
      <Link to="/projects">Projects</Link> {" | "}
      <Link to="/about">About</Link>
      <br/>
      <Outlet />

    </div>
  );
}

export default Nav;