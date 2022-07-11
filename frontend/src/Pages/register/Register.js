import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Form from "../../Components/form/Form";
import styles from "../login/Login.module.css";

function Register() {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    newsTopics: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateTopics(e) {
    const topicArray = registerData.newsTopics;
    if (!topicArray.includes(e.target.name)) {
      topicArray.push(e.target.name);
    } else if (e.target.checked === false) {
      const topicArray = registerData.newsTopics;
      const index = topicArray.indexOf(e.target.name);
      topicArray.splice(index, 1);
    }
    setRegisterData({ ...registerData, newsTopics: topicArray });
  }

  function updateData(e) {
    setError("");
    const field = e.target.name;
    const value = e.target.value;

    if (e.target.type === "checkbox") {
      updateTopics(e);
    } else {
      setRegisterData((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    }
  }

  async function submitForm(e) {
    e.preventDefault();
    setLoading(true);

    const URL = "http://localhost:4000/api/user/register";
    try {
      const res = await axios.post(URL, registerData);
      const data = res.data;
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("name", data.name);
      sessionStorage.setItem("id", data._id);
      sessionStorage.setItem("topics", data.newsTopics);

      //   history.push("/");
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
          <h2>Register</h2>
          <p>Hey, Enter your details to register a new account</p>

          {error ? <p className={styles.loginError}>{error}</p> : <></>}
        </div>
        <Form
          formType="Register"
          updateData={updateData}
          data={registerData}
          submitForm={submitForm}
        />

        <p>
          Already have an account? <Link to="/login">Login Now</Link>
        </p>

        {loading ? <p className={styles.loginLoader}>Loading...</p> : <></>}
      </div>
    </div>
  );
}

export default Register;
