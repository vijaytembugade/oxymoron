import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router";
import Dashboard from "./Dashboard";
import Form from "./Form";
import Details from "./Details";
const baseUrl = "http://localhost:3000";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "./Signup/Signup";
import styled from "styled-components";
import PrivateRoute from "./PrivateRoutes";
import Login from "./Login/Login";
import { getFromLocalStorage } from "../apis/axios";
import isEmpty from "lodash/isEmpty";

const queryClient = new QueryClient();

const App = () => {
  const authToken = getFromLocalStorage("authToken");

  const isAuthed = !isEmpty(authToken);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <LinkContainer>
            <Link to="/">Home</Link>
            <Link to="/form">form</Link>
            <Link exact to="/signup">
              Signup
            </Link>
            <Link exact to="/login">
              Login
            </Link>
          </LinkContainer>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute
                  exact
                  path="/"
                  element={<Dashboard />}
                  condition={isAuthed}
                  redirectRoute="/login"
                />
              }
            />
            <Route
              exact
              path="/form"
              element={
                <PrivateRoute
                  exact
                  path="/"
                  element={<Form />}
                  condition={isAuthed}
                  redirectRoute="/login"
                />
              }
            />
            <Route
              exact
              path="/task/:slug"
              element={
                <PrivateRoute
                  exact
                  path="/"
                  element={<Details />}
                  condition={isAuthed}
                  redirectRoute="/login"
                />
              }
            />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
`;
