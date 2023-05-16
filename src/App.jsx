import "../src/index.css";
import Employee from "./compontents/Employee";
import { useState } from "react";
import TodoApp from "./compontents/TodoApp";
import AddEmployee from "./compontents/AddEmployee";
import { v4 as uuidv4 } from "uuid";
import EditEmployee from "./compontents/EditEmployee";
import Header from "./compontents/Header";
import Employees from "./pages/Employees";

function App() {
  return (
    <Header>
      <Employees />
      <TodoApp />
    </Header>
  );
}

export default App;
