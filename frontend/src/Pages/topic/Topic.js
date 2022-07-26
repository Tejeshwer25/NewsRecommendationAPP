import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../../Components/card/Card";

function Topic() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const topic = location.pathname.split("/")[1];
  const URL = "https://newsapi.org/v2/top-headlines";
  const key = "bbd4a97c4e77492ea5e40af254ebf2f9";

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`${URL}?category=${topic}&apiKey=${key}`);
      const data = res.data.articles;
      setData(data);
    }

    fetchData();
  }, [topic]);

  return (
    <div>
      <h2>{topic.toUpperCase()}</h2>
      <div>
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

export default Topic;
