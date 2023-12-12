import React from "react";
import "./featuredfeed.css"; 

const Featuredfeed = ({ articles }) => {
  return (
    <div className="news-grid">
      {/* {articles.map((article, index) => (
        <div key={index} className="news-item">
          <img src={article.image} alt={article.title} />
          <div className="news-content">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default Featuredfeed;
