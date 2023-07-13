import React, { useEffect, useState } from "react";
import "./Pages.css";
import planQuotes from "../data/quotes";
import TodoInsert from "../components/TodoInsert";
import { GoTrash } from "react-icons/go";

export default function Home() {
  const [start, setStart] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");
  const [todoList, setTodoList] = useState([
    // {
    //   id: 1,
    //   text: "리액트 기초 알아보기",
    //   checked: false,
    // },
    // {
    //   id: 2,
    //   text: "컴포넌트 스타일링 하기",
    //   checked: false,
    // },
    // {
    //   id: 3,
    //   text: "투두리스트 만들기",
    //   checked: false,
    // },
  ]);

  const [count, setCount] = useState(todoList.length);
  const [total, setTotal] = useState(todoList.length);
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * planQuotes.length);
    setRandomQuote(planQuotes[randomIndex].quote);
  };
  const handleStart = () => {
    setStart((start) => !start);
  };
  const handleChecked = (id) => {
    setTodoList((prevTodoList) => {
      return prevTodoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: !todo.checked,
          };
        }
        //
        return todo;
      });
    });
  };
  const handleDelete = () => {
    alert('삭제하시겠습니까?')
  };

  useEffect(() => {
    getRandomQuote(total);
    setTotal(todoList.length);
  }, [start],[total]);

  if (!start) {
    return (
      <div className="home__wrapper">
        <div className="start__wrapper">
          <div className="start__title">TO DO LIST</div>
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
        <div className="todo_goals">🔥달성률: {count/total*100}%</div>
          <div className="todo__title">오늘의 명언</div>"{randomQuote}"
          
        </div>
        <div className="todo__wrapper">
          <div className="start__title">
            TO DO LIST
          </div>
         
          <TodoInsert todoList={todoList} setTodoList={setTodoList} total={total} setTotal={setTotal} />
          <div className="todoList__container">
            {todoList.map((todo) => (
              <div className="todoItem" key={todo.id}>
                <input
                  type="checkbox"
                  className="todoItem__checkbox"
                  checked={todo.checked}
                  onChange={(e) => {
                    handleChecked(todo.id);
                  }}
                />
                <div
                  className={
                    todo.checked ? "todoItem__completeText" : "todoItem__text"
                  }
                >
                  {todo.text}
                </div>
                <button
                  className="todoItem__delete"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  <GoTrash />
                </button>
              </div>
            ))}
          </div>
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
