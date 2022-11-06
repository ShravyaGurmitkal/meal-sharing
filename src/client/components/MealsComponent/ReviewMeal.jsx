import React from "react";
import { useState } from "react";
import ReviewMealForm from "../FormsComponent/ReviewMealForm";
import "../MealsComponent.css"

export default function ReviewMeal(props) {
    const {mealId} = props;
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [mealReviewStatus, setMealReviewStatus] = useState()

    function showReviewMealForm() {
        setShowReviewForm(!showReviewForm)
    }

    function handleMealReviewStatus(status) {
        setMealReviewStatus(status);
        setShowReviewForm(!showReviewForm);
    }

    return (
        <>  
            {mealReviewStatus === 201 && <h2 className='success-message'>Success! Thank you for Reviewing this Meal</h2>}
            {mealReviewStatus === 500 && <h2 className='error-message'>Server Error!! Please Try Again </h2>}
            <div>
                <button onClick={showReviewMealForm}>Review Meal Form</button>
            </div>
            {showReviewForm && <ReviewMealForm mealId={mealId} handleMealReviewStatus={handleMealReviewStatus}/> }
        </>
    )
}