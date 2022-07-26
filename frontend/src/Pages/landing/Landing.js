import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Card from "../../Components/card/Card";
import styles from "./Landing.module.css";
import { UserContext } from "../../Context/UserContext";

function Landing() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { userDetail } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAPIData() {
      setLoading(true);
      try {
        const res = await axios.request(options);
        const data = res.data;
        const articles = data.articles;
        setData(articles);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    }

    if (userDetail.name) {
      navigate("/home");
    }

    const options = {
      method: "GET",
      url: "https://api.newscatcherapi.com/v2/latest_headlines",
      params: { lang: "en", page: "1" },
      headers: {
        "x-api-key": "6NvNoCSAo6AzL_MS6m-3AHhhjYrWC-luOOllbBI3QGQ",
      },
    };

    getAPIData();
  }, [navigate, userDetail.name]);

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className={styles.landing}>
          {error === "" ? (
            <>
              {data.map((article) => (
                <Card
                  link={article.link}
                  media={article.media}
                  title={article.title}
                  article={article.summary}
                />
              ))}
            </>
          ) : (
            <p>{error}</p>
          )}
        </div>
      )}
    </>
  );
}

export default Landing;
