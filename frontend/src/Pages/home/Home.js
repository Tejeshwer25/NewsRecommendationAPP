import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../../Context/UserContext";
import Heading from "../../Components/heading/Heading";
import Card from "../../Components/card/Card";
import styles from "./Home.module.css";

function Home() {
  const [data, setData] = useState([]);
  const { userDetail } = useContext(UserContext);
  const topics = userDetail.topics;
  const URL = "https://newsapi.org/v2/top-headlines";
  const key = "bbd4a97c4e77492ea5e40af254ebf2f9";

  useEffect(() => {
    async function fetchData() {
      const urls = [];
      userDetail.topics.forEach((topic) => {
        urls.push(`${URL}?category=${topic}&apiKey=${key}`);
      });

      const response = await Promise.all(urls.map((url) => axios.request(url)));
      const data = response.map((res) => res.data.articles);
      const mergedData = [].concat.apply([], data);
      setData(mergedData);
    }

    fetchData();
  }, [userDetail]);

  return (
    <div className={styles.home}>
      <div className={styles.home_section}>
        <Heading tag="2" heading="Selected Topics" />
        <div className={styles.home_cardContainer}>
          {topics.map((topic) => (
            <Link to={`/${topic}`}>
              <Card title={topic} />
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.home_section}>
        <Heading tag="2" heading="Suggested News" />
        {data.map((article) => (
          <Card
            link={article.url}
            media={article.urlToImage}
            title={article.title}
            article={article.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
