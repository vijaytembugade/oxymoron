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

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <LinkContainer>
            <Link to="/form">form</Link>
            <Link to="/">Home</Link>
            <Link exact to="/signup">
              Signup
            </Link>
          </LinkContainer>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/form" element={<Form />} />
            <Route exact path="/task/:slug" element={<Details />} />
            <Route exact path="/signup" element={<Signup />} />
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
