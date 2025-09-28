import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import Dashboard from "./Dashboard";
import Form from "./Form";
const baseUrl = "http://localhost:3000";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/form">form</Link>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
