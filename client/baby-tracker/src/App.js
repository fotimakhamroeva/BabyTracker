import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Button from './components/Button'
import Navbar from "./components/Navbar";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage"

import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <UserContextProvider>
        <Navbar></Navbar>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
