import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../Context/UserContext";
import styles from "./ProfileChip.module.css";

function ProfileChip({ handleLogout }) {
  const [displayMenu, setDisplayMenu] = useState(false);

  const { userDetail } = useContext(UserContext);

  return (
    <div
      className={styles.profileChip}
      onClick={() => setDisplayMenu(!displayMenu)}
    >
      <h3>{userDetail.name}</h3>
      {displayMenu ? (
        <div
          className={styles.profileChip_toggleMenu}
          // onMouseEnter={() => setDisplayMenu(true)}
        >
          <ul>
            <Link to="/userAccount">
              <li>Account</li>
            </Link>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfileChip;
