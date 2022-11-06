import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css"
import TestComponent from "./components/TestComponent/TestComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Allmeals from "./components/Allmeals";
import CreateMeal from "./components/MealsComponent/CreateMeal";
import MealsById from "./components/MealsComponent/MealsById";
import MealReviews from "./components/MealsComponent/MealReviews";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Header></Header>
        <Allmeals></Allmeals>
        <Footer></Footer>
      </Route>
    
      <Route exact path="/meals/:id">
        <Header></Header>
        <MealsById></MealsById>
        <Footer></Footer>
      </Route>

      <Route exact path="/meals">
        <Header></Header>
        <Allmeals mealsLink={true}></Allmeals>
        <Footer></Footer>
      </Route>

      <Route exact path="/createmeal">
        <Header></Header>
        <CreateMeal></CreateMeal>
        <Footer></Footer>
      </Route>

      <Route exact path="/mealReviews">
        <Header></Header>
        <MealReviews></MealReviews>
        <Footer></Footer>
      </Route>

      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}

export default App;
