import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css"
import TestComponent from "./components/TestComponent/TestComponent";
import Header from "./components/Header";
import Allmeals from "./components/Allmeals";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Header></Header>
        <Allmeals></Allmeals>
        <p>test</p>
      </Route>
      <Route exact path="/lol">
        <Header></Header>
        <p>lol</p>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}

export default App;
