import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Button from './components/Button'
import Navbar from "./components/Navbar";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage"
import NewBaby from "./components/NewBaby"
import BabyList from "./components/BabyList"
import BabyDetailsPage from "./components/BabyDetailsPage"
import { UserContextProvider } from "./context/userContext";
import "./App.scss";

function App() {
  return (
    <div className="app container">
      <UserContextProvider>
        <header className="App-header">
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/newbaby" element={<NewBaby />} />
          <Route path="/user" element={<BabyList />} />
          <Route path="/newbaby" element={<NewBaby />} />
          <Route path="/babydetails" element={<BabyDetailsPage />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
