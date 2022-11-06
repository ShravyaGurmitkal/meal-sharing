import React from "react";
import { useState } from "react";
import "./Forms.css";

export default function ReviewMealForm (props) {
    const { mealId, handleMealReviewStatus } = props;
    const [values, setValues] = useState({
        title: '',
        description: '',
        stars: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleTitleInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            title: event.target.value,
        }));
    };

    const handleDescriptionInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            description: event.target.value,
        }));
    };

    const handleStarsInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            stars: event.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/reviews", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": values.title,
                "description": values.description,
                "meal_id": Number(mealId),
                "stars": values.stars,
                "created_date": new Date()
            }),
            }) .then ((res) => {
                setSubmitted(true);
                handleMealReviewStatus(res.status);
            }).catch ((error) =>
            console.log(error));
    };

    return (
        <div className="formsDiv">
            <h2>Review Meal Form</h2>
            <form method="post" onSubmit={handleSubmit}>
                <div className="formInputs">
                    <input
                        id="title"
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={values.title}
                        onChange={handleTitleInputChange}
                        required
                    />

                    <input
                        id="description"
                        type="text"
                        placeholder="Description"
                        name="description"
                        value={values.description}
                        onChange={handleDescriptionInputChange}
                        required
                    />

                    <input
                        id="stars"
                        type="number"
                        placeholder="stars"
                        name="stars"
                        value={values.stars}
                        onChange={handleStarsInputChange}
                        min="1"
                        required
                    />
                </div>

                <div className="formSubmissonButton">
                    <button type="submit">Review Meal</button> 
                </div>
               
            </form>
            {submitted && <div className='success-message'>Your details are submitted wait for Reviewing meal </div>}
        </div>
    )
}