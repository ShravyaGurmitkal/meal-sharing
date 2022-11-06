import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import "./MealsComponent.css"

export default function Allmeals(props) {
    const {mealsLink} = props;
    let mealsLinkPath;
    const location = useLocation()
    const fromReviewMeal = location.state?.fromReviewMeal
    const [allMeals, setAllMeals] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    const fetchAllMeals = () => {
        setIsloading(true);
        fetch("/api/meals")
          .then((r) => r.json())
          .then((r) => setAllMeals(r))
          .then(() => {
            setIsloading(false);
          });
    }

    useEffect(() => {
        fetchAllMeals();
    }, []);
    
    if(mealsLink)
        mealsLinkPath = "/meals/";
    
    return (
        <div className="contentDisplayDiv">
            <h1 style={{fontStyle:"italic"}} className="contentDisplayDivheader">Menu</h1>
            {isLoading && <p>loading....</p>}
            {allMeals.length === 0  ? 
                    <p>No meals are available</p> : 
                    <ul  className="contentDisplayDivUl">
                        {allMeals.map((meal => {
                            return(
                                <li key={meal.id} className="listContent">
                                    <h2 style={{color:"olive"}}>Mealid: {meal.id}</h2>
                                    <h2>Title: {meal.title}</h2>
                                    <h3>Description: {meal.description}</h3>
                                    <h4>Max_reservations: {meal.max_reservations}</h4>
                                    <h4>Price: {meal.price}</h4>
                                    {mealsLink && !fromReviewMeal && <button><Link to={{pathname: mealsLinkPath+meal.id,
                                                                state: { fromReserveMeal: true },
                                                                }} >Reserve Meal</Link></button>}
                                    {fromReviewMeal && <button><Link to={{pathname: mealsLinkPath+meal.id,
                                                                state: { fromReviewMeal: true },
                                                                }} >Review Meal</Link></button>}
                                </li>
                            )
                        }))}
                    </ul>
            }
            <div className="topButtonDiv">
                <button><a href="#header">⇪</a></button>
            </div>
        </div>
    )
}