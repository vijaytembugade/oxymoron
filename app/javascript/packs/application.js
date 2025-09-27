// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "../stylesheets/application.scss"
import ReactRailsUJS from "react_ujs";
import App from "../src/App";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

setAuthHeaders();
initializeLogger();

const componentsContext = { App };
ReactRailsUJS.getConstructor = (name) => {
  return componentsContext[name];
};