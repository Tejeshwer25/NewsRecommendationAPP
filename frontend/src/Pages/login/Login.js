import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Form from "../../Components/form/Form";
import styles from "./Login.module.css";
import { UserContext } from "../../Context/UserContext";

function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { userDetail, loadUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (userDetail.name) {
      navigate("/home");
    }
  }, [userDetail.name, navigate]);

  function updateData(e) {
    if (error) setError("");

    const field = e.target.name;
    const value = e.target.value;
    setLoginData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);
    const URL = "http://localhost:4000/api/user/login";

    try {
      const res = await axios.post(URL, loginData);
      const data = res.data;
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("name", data.name);
      sessionStorage.setItem("id", data._id);
      sessionStorage.setItem("topics", data.newsTopics);

      loadUser();

      navigate("/home");
    } catch (e) {
      const errorMsg = e.response.data;
      const parser = new DOMParser();
      const doc = parser
        .parseFromString(errorMsg, "text/html")
        .querySelector("pre").innerHTML;
      setError(doc.split("<br>")[0]);
    }
    setLoading(false);
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <div className={styles.loginHeader}>
          <h2>Login</h2>
          <p>Hey, Enter your details to sign in to your account</p>

          {error ? <p className={styles.loginError}>{error}</p> : <></>}
        </div>
        <Form
          formType="Login"
          updateData={updateData}
          data={loginData}
          submitForm={submitForm}
        />

        <p>
          Don't have an account? <Link to="/register">Register Now</Link>
        </p>

        {loading ? <p className={styles.loginLoader}>Loading...</p> : <></>}
      </div>
    </div>
  );
}

export default Login;
