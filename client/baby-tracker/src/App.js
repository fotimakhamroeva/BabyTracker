import React, { useContext, useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Button from './components/Button'
import Navbar from "./components/Navbar";
import RegistrationPage from "./components/RegistrationPage";
import LoginPage from "./components/LoginPage"
import NewBaby from "./components/NewBaby"
import BabyList from "./components/BabyList"
import BabyDetailsPage from "./components/BabyDetailsPage"
import { UserContextProvider } from "./context/userContext";
import Cookies from 'js-cookie';
import "./App.scss";

function App() {
  const isLoggedIn = Cookies.get('user_email') && Cookies.get('BabyTrackerSession')
  const [isUserLoggedIn, setUserLoggedIn] = useState(isLoggedIn);
  return (
    <div className="app container">
      <UserContextProvider isUserLoggedIn={isUserLoggedIn} setUserLoggedIn={setUserLoggedIn}>
        <header className="App-header">
          <Navbar />
        </header>
        <Routes>
          <Route path="/" element= { (!isUserLoggedIn) ? <Navigate replace to="/login" /> : <BabyList /> } />
          <Route path="/register" element={ (isUserLoggedIn) ? <Navigate replace to="/" /> : <RegistrationPage />} />
          <Route path="/login" element={ (isUserLoggedIn) ? <Navigate replace to="/" /> : <LoginPage />} />
          <Route path="/newbaby" element= { (!isUserLoggedIn) ? <Navigate replace to="/login" /> : <NewBaby />} />
          <Route path="/user" element= { (!isUserLoggedIn) ? <Navigate replace to="/login" /> : <BabyList />} />
          <Route path="/babydetails/:id" element= { (!isUserLoggedIn) ? <Navigate replace to="/login" /> : <BabyDetailsPage /> } />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
