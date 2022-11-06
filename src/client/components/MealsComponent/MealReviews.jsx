import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../MealsComponent.css"

export default function MealReviews() {
    const [allMealsReviews, setAllMealsReviews] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    const fetchAllMealsReviews = () => {
        setIsloading(true);
        fetch("/api/reviews")
          .then((r) => r.json())
          .then((r) => setAllMealsReviews(r))
          .then(() => {
            setIsloading(false);
          });
    }

    useEffect(() => {
        fetchAllMealsReviews();
    }, []);
    
    return (
        <div className="contentDisplayDiv">
            <h1 style={{fontStyle:"italic"}}>Reviews</h1>
            <button><Link to={{pathname: "/meals",
                                state: { fromReviewMeal: true },
                            }} >Add Meal Review</Link></button>
            {isLoading && <p>loading....</p>}
            {allMealsReviews.length === 0  ? 
                    <p>No Reviews are available</p> : 
                    <ul>
                        {allMealsReviews.map((mealReview => {
                            return(
                                <li key={mealReview.id} className="listContent">
                                    <h2 style={{color: "olive"}}>ReviewId: {mealReview.id}</h2>
                                    <h3>Mealid: {mealReview.meal_id}</h3>
                                    <h3>ReviewTitle: {mealReview.title}</h3>
                                    <h4>ReviewDescription: {mealReview.description}</h4>
                                    <p>ReviewStars: {mealReview.stars}</p>
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