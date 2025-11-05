import React from "react";
import PropTypes from "prop-types";
import { Route, Navigate } from "react-router-dom";

// React Router v6+/v7 removed Redirect. Use Navigate and element prop on Route.
// Usage example (inside <Routes>):
// <PrivateRoute path="/dashboard" component={Dashboard} condition={isAuthed} redirectRoute="/login" />
const PrivateRoute = ({
  component: Component,
  condition,
  path,
  redirectRoute,
  ...rest
}) => {
  if (!condition) {
    return <Navigate to={redirectRoute} replace />;
  }
  // Pass remaining props to rendered component.
  return <Route path={path} element={<Component {...rest} />} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType])
    .isRequired,
  condition: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  redirectRoute: PropTypes.string.isRequired,
};

export default PrivateRoute;
