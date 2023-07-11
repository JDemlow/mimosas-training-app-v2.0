import "../index.css";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  getDocs,
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

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const currentEmployeeId = "EMPLOYEE_ID"; // Replace with the actual ID of the currently selected employee

  // Create todo
  const createTodo = async (e) => {
    e.preventDefault();
    if (input === "") {
      alert("Please enter a valid training task");
      return;
    }

    await addDoc(collection(db, "employees", currentEmployeeId, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // Log Employees
  useEffect(() => {
    const fetchEmployeeData = async () => {
      console.log("Fetching employee data...");
      const employeeQuerySnapshot = await getDocs(collection(db, "employees"));

      const processEmployee = (employee) => {
        console.log("Employee: " + employee.id);
      };

      employeeQuerySnapshot.forEach((doc) => {
        processEmployee({ id: doc.id, ...doc.data() });
      });
    };

    fetchEmployeeData();
  }, []);

  // Read todos from firebase
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "employees", currentEmployeeId, "todos"),
      (querySnapshot) => {
        let todosArr = [];
        querySnapshot.forEach((doc) => {
          todosArr.push({ ...doc.data(), id: doc.id });
        });
        setTodos(todosArr);
      }
    );
    return () => unsubscribe();
  }, []);

  // Update todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "employees", currentEmployeeId, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "employees", currentEmployeeId, "todos", id));
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
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>

        {todos.length < 1 ? null : (
          <p className={style.count}>
            {`Employee has ${todos.length} tasks remaining`}
          </p>
        )}
      </div>
    </div>
  );
}

export default TodoApp;
