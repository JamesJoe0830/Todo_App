import React, { useEffect, useState } from "react";
import "./Pages.css";
import planQuotes from "../data/quotes";
import TodoInsert from "../components/TodoInsert";
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import {BsCheckCircle} from "react-icons/bs";
export default function Home() {
  const [start, setStart] = useState(false);
  const [randomQuote, setRandomQuote] = useState("");
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      text: "리액트 기초 알아보기",
      checked: false,
    },
    {
      id: 2,
      text: "컴포넌트 스타일링 하기",
      checked: false,
    },
    {
      id: 3,
      text: "투두리스트 만들기",
      checked: false,
    },
  ]);
  let today = new Date();
  let year = String(today.getFullYear()).slice(-2);
  let month = today.getMonth();
  let date = today.getDate();

  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(todoList.length);
  const [detailText, setDetailText] = useState(0);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editedText, setEditedText] = useState("");

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * planQuotes.length);
    setRandomQuote(planQuotes[randomIndex].quote);
  };

  const handleStart = () => {
    setStart((start) => !start);
  };

  const handleChecked = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          checked: !todo.checked,
        };
      } else {
        return todo;
      }
    });
    setTodoList(newTodoList);
    setCount(newTodoList.filter((todo) => todo && todo.checked).length);

    // setTodoList((prevTodoList) => {
    //   return prevTodoList.map((todo) => {
    //     if (todo.id === id) {
    //       return {
    //         ...todo,
    //         checked: !todo.checked,
    //       };
    //     }
    // return todo;
    // });
    // });
  };

  const handleMouseEnter = () => {
    setDetailText((detailText) => true);
  };
  const handleMouseLeave = () => {
    setDetailText((detailText) => false);
  };
  const handleDelete = (id) => {
    alert("삭제하시겠습니까?");

    setTotal((prevTotal) => prevTotal - 1);
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
    // setTodoList((prevTodoList) => prevTodoList.filter((data) => data.id !== id));
    //filter를 통해서 id와 일치하지 않는 값들만 setTodoList에 반환
  };
  const handleChange = (e) =>{
    setEditedText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let newTodoList = todoList.map((data)=>{
      if (data.id === editingId){
        data.text = editedText;
      }
      return data;
    })
    setTodoList(newTodoList);
    setEditing(false);
  };

  useEffect(() => {
    console.log(todoList);
    getRandomQuote(total);
  }, [start, todoList]);

  if (!start) {
    return (
      <div className="home__wrapper">
        <div className="todo__wrapper">
          <div className="date__Information">
            {" "}
            {year}년 {month}월 {date}일{" "}
          </div>
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
      </div>
    );
  } else if (start) {
    return (
      <div className="home__wrapper">
        <div className="todo__planQuotes">
          <div className="date__Information">
            {" "}
            {year}년 {month}월 {date}일{" "}
          </div>
          <div className="todo_goals">🔥달성률: {(count / total) * 100}%</div>
          <div className="todo__title">오늘의 명언</div>"{randomQuote}"
        </div>
        <div className="todoList__wrapper">
          <div className="start__title">TO DO LIST</div>

          <TodoInsert
            todoList={todoList}
            setTodoList={setTodoList}
            total={total}
            setTotal={setTotal}
            editing={editing}
          />
          <div className="todoList__container">
            {todoList.map((todo) => (
              <div className="todoItem" key={todo.id}>
                <input
                  type="checkbox"
                  className="todoItem__checkbox"
                  checked={todo.checked}
                  onChange={(e) => {
                    handleChecked(todo.id);
                    // console.log('total',total);
                    // console.log('cnt',count);
                  }}
                />
                <div
                  className={
                    todo.checked ? "todoItem__completeText" : "todoItem__text"
                  }
                  onMouseEnter={
                    todo.text.length > 20 ? handleMouseEnter : undefined
                  }
                  onMouseLeave={
                    todo.text.length > 20 ? handleMouseLeave : undefined
                  }
                >
                  {editing && editingId === todo.id ? (
                    <form onSubmit = {handleSubmit}>
                      <input value={editedText} onChange={handleChange} onSubmit = {handleSubmit} autoFocus/>
                    </form>
                  ) : todo.text.length > 20 && !detailText ? (
                    todo.text.slice(0, 20).concat("...")
                  ) : (
                    todo.text
                  )}
                </div>
                {editing && editingId === todo.id ?<button onClick={handleSubmit} className="todoItem__confirm
"> <BsCheckCircle/> </button>: <button
                  className="todoItem__editing"
                  onClick={() => {
                    setEditing(true);
                    setEditingId(todo.id);
                    setEditedText(todo.text);
                  }}
                >
                  <CiEdit />
                </button>}
                
                <button
                  className="todoItem__delete"
                  onClick={() => {
                    handleDelete(todo.id);
                    console.log(todoList);
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
