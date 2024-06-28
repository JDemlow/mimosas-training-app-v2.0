import React from "react";
import "../src/index.css";
import Footer from "./components/Footer";
import TrainingPage from "./pages/TrainingPage";
import TierOnePage from "./pages/TierOnePage"; // Import the new page
import TierTwoPage from "./pages/TierTwoPage"; // Import the new page
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/Signin";
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
          <Route
            path="/account"
            element={
              <>
                <Header />
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/employees"
            element={
              <>
                <Header />
                <ProtectedRoute>
                  <Employees />
                </ProtectedRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/training/:employeeId" // Update the path to include :employeeId
            element={
              <>
                <Header />
                <ProtectedRoute>
                  <TrainingPage />
                </ProtectedRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/trainingmaterials"
            element={
              <>
                <Header />
                <ProtectedRoute>
                  <TrainingMaterials />
                </ProtectedRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/tier1/:employeeId" // Add the route for the TierOnePage
            element={
              <>
                <Header />
                <ProtectedRoute>
                  <TierOnePage />
                </ProtectedRoute>
                <Footer />
              </>
            }
          />
          <Route
            path="/tier2/:employeeId" // Add the route for the TierTwoPage
            element={
              <>
                <Header />
                <ProtectedRoute>
                  <TierTwoPage />
                </ProtectedRoute>
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
