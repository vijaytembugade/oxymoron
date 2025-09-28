import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import Dashboard from "./Dashboard";
import Form from "./Form";
import Details from "./Details";
const baseUrl = "http://localhost:3000";

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Link to="/form">form</Link>
      <Link to="/">Home</Link>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/form" element={<Form />} />
          <Route exact path="/task/:slug" element={<Details/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
