import React from "react";
import { useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom'
import ReserveMeal from "./ReserveMeal";
import ReviewMeal from "./ReviewMeal";
import "../MealsComponent.css"

export default function MealsById() {
    const location = useLocation()
    const fromReserveMeal = location.state?.fromReserveMeal
    const fromReviewMeal = location.state?.fromReviewMeal
    const { id } = useParams();
    const [idMeal, setIdMeal] = useState([]);

    const fetchIdMeals = useCallback(() => {
        fetch(`/api/meals/${id}`)
          .then((r) => r.json())
          .then((r) => setIdMeal(r));
    },[])

    useEffect(() => {
        fetchIdMeals();
      }, []);


    return (
        <div className="contentDisplayDiv">
            {idMeal.length === 0 ? 
                <h2 className="error-message">No meals to display with this id: {id}</h2>: 
                <>
                    <ul>
                        {idMeal.map(meal => {
                            return(
                                <li key={meal.id} className="listContent">
                                    <h2>Mealid: {meal.id}</h2>
                                    <h3>Title: {meal.title}</h3>
                                    <h4>Description: {meal.description}</h4>
                                    <p>Price: {meal.price}</p>
                                    <p>Max_reservations: {meal.max_reservations}</p>
                                </li>
                            )
                        })}
                    </ul>
                </>
            }
            {
                fromReserveMeal && <ReserveMeal mealId={id}/>
            }

            {
                fromReviewMeal && <ReviewMeal mealId={id}/>
            }
        </div>    
    )
}