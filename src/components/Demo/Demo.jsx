import React from "react";
import { useState, useEffect } from "react";
import { ImLink } from "react-icons/im";
import { ImSearch } from "react-icons/im";
import { HiClipboard } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import "./Demo.css";
import { useLazyGetSummaryQuery } from "../../services/article";
import Loading from '../Loading/Loading'
// import LoadingGif from '../../assets/loading.gif'

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const date = new Date();
  const year = date.getFullYear();

  // change the style of link and search icon on focus
  document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.querySelector(".input");
    const linkIcon = document.querySelector(".linkIcon");

    if (inputField && linkIcon) {
      inputField.addEventListener("focus", () => {
        linkIcon.style.color = "green";
      });
      inputField.addEventListener("blur", () => {
        linkIcon.style.color = "red";
      });
    } else {
      console.log("error");
    }
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };

      const updatedAllArticles = [newArticle, ...allArticles];

      setArticle(newArticle);

      setAllArticles(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handelCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  }

  const handelDelete = (index) => {
    const newArticleArray = [...allArticles];
    newArticleArray.splice(index, 1);
    if (newArticleArray.length > 5) {
      newArticleArray.splice(5, newArticleArray.length - 5);
      setAllArticles(newArticleArray)
      console.log(newArticleArray.length)
    }
    else {
      setAllArticles(newArticleArray);
    }
  }
  return (
    <div className="demoContainer">
      <form className="form" onSubmit={handelSubmit}>
        <ImLink className="linkIcon" />
        <input
          type="url"
          placeholder="Enter a URL"
          value={article.url}
          onChange={(e) => {
            setArticle({
              ...article,
              url: e.target.value,
            });
          }}
          required
          className="input"
        />
        <button type="submit" className="submit_btn">
          <ImSearch className="searchIcon" />
        </button>
      </form>
      {/* browse URL History  */}
      <div className="history">
        <h2 style={{ color: "white" }} className="searchHistory">Search <span style={{ color: "#00FFFF" }}>History</span></h2>
        {allArticles.slice(0, 5).map((item, index) => (
          <div
            key={`link-${index}`}
            onClick={() => setArticle(item)}
            className="link_card"
          >
            <div className="copy_btn" onClick={() => handelCopy(item.url)}>
              <HiClipboard className="copyIcon" />
            </div>
            <p style={{ width: "95%" }} className="urlLink">{item.url}</p>
            <span className="deleteUrl" onClick={() => handelDelete(index)}><MdDeleteForever /></span>
          </div>
        ))}
      </div>
      {/* Display result */}
      <div className="result">
        {isFetching ? (
          <div className="loading">
            <Loading />
            {/* <img src={LoadingGif} alt="Loading" /> */}
          </div>
        ) : error ? (
          <p className="errorMsg">
            Unable to fetch.
            <br />
            <span>{error?.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <div className="articleSummary">
              <h2>
                Article <span style={{ color: "#00FFFF" }}>Summary</span>
              </h2>
              <div className="summary_box">
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
      
       
       <footer className="footer">{`© Concise A.I. ${year}`}</footer>
      
    </div>
  );
};

export default Demo;
