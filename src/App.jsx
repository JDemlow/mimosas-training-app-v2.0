import React from "react";
import "../src/index.css";
import Employee from "./components/Employee";
import Footer from "./components/Footer";
import { useState } from "react";
import TodoApp from "./components/TodoApp";
import AddEmployee from "./components/AddEmployee";
import { v4 as uuidv4 } from "uuid";
import EditEmployee from "./components/EditEmployee";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Account from "./components/Account";
import TrainingMaterials from "./pages/TrainingMaterials";
import { AuthContextProvider } from "./components/context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

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
                <Account />
                <Footer />
              </>
            }
          />
          <Route
            path="/employees"
            element={
              <>
                <Header />
                <Employees />
                <Footer />
              </>
            }
          />
          <Route
            path="/tasks"
            element={
              <>
                <Header />
                <TodoApp />
                <Footer />
              </>
            }
          />
          <Route
            path="/trainingmaterials"
            element={
              <>
                <Header />
                <TrainingMaterials />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
