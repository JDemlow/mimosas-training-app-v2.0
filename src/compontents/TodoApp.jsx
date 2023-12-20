import "../index.css";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#d69c28] to-[#fe642a]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl fonnt-bold text-center text-gray-800 p-2`,
  form: `flex justify-between pl-8`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-[#f6b42c] hover:bg-[#fe642a] text-slate-100`,
  count: `text-center p-2`,
};

//#f6b42c
//#fe642a
//#d69c28

function TodoApp(props) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const name = searchParams.get("employee");

    // Do something with the employeeName (e.g., set it in state)
    // For now, let's log it to the console
    setEmployeeName(name);
  }, [location.search]);

  // Create todo

  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid training task");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // Read todo from firebase

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  // Update todo in firebase

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Training Tasks</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Employee Task"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              //Functions beinng passed up
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>

        {todos.length < 1 ? null : (
          <p className={style.count}>
            {`${employeeName} has ${todos.length} tasks remaining`}
          </p>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
