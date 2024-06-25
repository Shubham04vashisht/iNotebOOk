import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  let location = useLocation();
  let navigate=useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-md bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="logo navbar-brand" to="/">
            iNotebOOk
          </Link>
          {!localStorage.getItem('token')?
            <form className="d-flex">
              <Link className="login btn btn-outline-light mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="signup btn btn-outline-light mx-1" to="/signup" role="button">
                Signup
              </Link>
            </form>:<button onClick={handleLogOut} className="btn btn-outline-light">Log Out</button>}
        </div>
      </nav>
    </>
  );
};
export default Navbar;
