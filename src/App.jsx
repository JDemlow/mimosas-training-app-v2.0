import React from "react";
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
import TrainingMaterials from "./pages/trainingMaterials";
import { AuthContextProvider } from "./compontents/context/AuthContext";
import ProtectedRoute from "./compontents/ProtectedRoute";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/account"
            element={
              <>
                <Header />
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/employees"
            element={
              <>
                <Header />
                <Employees />
              </>
            }
          />
          <Route
            path="/tasks"
            element={
              <>
                <Header />
                <TodoApp />
              </>
            }
          />
          <Route
            path="/trainingmaterials"
            element={
              <>
                <Header />
                <TrainingMaterials />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
