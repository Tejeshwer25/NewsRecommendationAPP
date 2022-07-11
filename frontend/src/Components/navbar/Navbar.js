import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div>
        <h1>AssureNews</h1>
      </div>

      <div>
        <Link to="/login">
          <button>Register/Login</button>
        </Link>
      </div>

      {/* <div>
        <p>User Profile</p>
      </div> */}
    </nav>
  );
}

export default Navbar;
