import { h } from "preact";
import { Router } from "preact-router";

import Header from "./Header";

// Code-splitting is automated for `routes` directory
import Home from "../routes/home";
import About from "../routes/about";

const App = () => (
  <div id="app">
    <Header />
    <Router>
      <Home path="/" />
      <About path="/about/" user="me" />
    </Router>
  </div>
);

export default App;
