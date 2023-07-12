import React, { useEffect, useState } from "react";
import "./Pages.css";
import planQuotes from "../data/quotes";
export default function Home() {
  const [start, setStart] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * planQuotes.length);
    setRandomQuote(planQuotes[randomIndex].quote);
  };
  const handleStart = () => {
    setStart((start) => !start);
  };

  useEffect(() => {
    getRandomQuote();
  }, [start]);
  if (!start) {
    return (
      <div className="home__wrapper">
        <div className="start__wrapper">
          <div className="start__title">TODO LIST</div>
          <div className="start__QuotesBackground"></div>
          <div className="start__planQuotes">"{randomQuote}"</div>
          <button
            className="start__button"
            onClick={() => {
              handleStart();
            }}
          >
            시작하기
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="home__wrapper">
        <div className="todo__planQuotes">
            <div className="todo__title">오늘의 명언</div>"{randomQuote}"</div>
        <div className="todo__wrapper">
          <div className="start__title">TODO LIST</div>
          <button
            className="end__button"
            onClick={() => {
              handleStart();
            }}
          >
            나가기
          </button>
        </div>
      </div>
    );
  }
}
