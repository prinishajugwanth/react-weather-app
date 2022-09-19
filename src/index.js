import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Search from "./components/Search";

import React from "react";
import ReactDOM from "react-dom/client";
import Stack from "react-bootstrap/Stack";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <div className="WeatherApp">
      <Stack gap={3}>
        <header className="Header">Weather Application</header>
        <Search className="Search" />
        <footer className="Footer">
          <small>
            This page was designed by Prinisha Jugwanth and is an{" "}
            <a href="https://github.com/prinishajugwanth/Weather_project ">
              open-source code
            </a>
          </small>
        </footer>
      </Stack>
    </div>
  </React.StrictMode>
);
