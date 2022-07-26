import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./Navbar.module.css";
import { UserContext } from "../../Context/UserContext";
import ProfileChip from "../profileChip/ProfileChip";

function Navbar() {
  const { userDetail, setUserDetail } = useContext(UserContext);

  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("topics");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");

    setUserDetail({
      name: "",
      email: "",
      topics: [],
    });

    navigate("/");
  }

  return (
    <nav className={styles.navbar}>
      <div>
        <Link to="/">
          <h1>AssureNews</h1>
        </Link>
      </div>

      {!userDetail.name ? (
        <div>
          <Link to="/login">
            <button>Register/Login</button>
          </Link>
        </div>
      ) : null}

      {userDetail.name ? (
        <div>
          <ProfileChip handleLogout={handleLogout} />
        </div>
      ) : null}
    </nav>
  );
}

export default Navbar;
