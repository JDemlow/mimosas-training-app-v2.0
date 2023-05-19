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
import Signin from "./compontents/Signin";
import Signup from "./compontents/Signup";
import Account from "./compontents/Account";
import { AuthContextProvider } from "./compontents/context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/employees" element={<Employees />} />
          <Route path="/tasks" element={<TodoApp />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
