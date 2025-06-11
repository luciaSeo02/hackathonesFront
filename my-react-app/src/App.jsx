import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import HackathonsList from "./pages/HackathonsList";



function App() {

  return (

    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/hackathons" element={<HackathonsList />} />

    </Routes>
  );
}

export default App;
