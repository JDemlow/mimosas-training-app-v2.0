import "../src/index.css";
import Employee from "./compontents/Employee";
import { useState } from "react";
import TodoApp from "./compontents/TodoApp";
import AddEmployee from "./compontents/AddEmployee";
import { v4 as uuidv4 } from "uuid";
import EditEmployee from "./compontents/EditEmployee";
import Header from "./compontents/Header";
import Employees from "./pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Header>
      <BrowserRouter>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/tasks" element={<TodoApp />} />
        </Routes>
      </BrowserRouter>
    </Header>
  );
}

export default App;
