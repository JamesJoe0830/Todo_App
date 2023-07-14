import React, {useState} from 'react';
import './TodoList.css';
export default function TodoInsert({ todoList,setTodoList,total,setTotal}) {
    const [value,setValue] = useState("");

    const handleChange = (e) =>{
        setValue(e.target.value);
    };
    const handleSubmit = (e)=>{
        e.preventDefault(); // submit 누를때 새로고침 방지
        // let newTodo
        if (value !== "") {
            let newTodo = {
                id : Date.now(),
                text : value,
                checked: false,
            };
            setTodoList((prev)=>[...prev,newTodo]);
            setTotal((prevTotal) => prevTotal + 1); // 입력될때마다 total 몇개인지 값 올려주기
        }else{
            alert("빈칸을 입력하셨습니다.");
        };
        setValue("");
    };

    return (
        <div className='TodoInsert__wrapper'>
            <form className='TodoInsert' onSubmit={handleSubmit}>
                <input className='TodoInput' value ={value} placeholder="새로운 할 일을 입력하세요" onChange={handleChange} autoFocus/>
            <button className='submitButton' type ="submit" onClick={handleSubmit}>
                입력
            </button>
            </form>
        </div>
    );
}

