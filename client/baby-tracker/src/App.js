import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Button from './components/Button'
import Navbar from "./components/Navbar";
import RegistrationPage from "./components/RegistrationPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <>
        <Navbar></Navbar>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
