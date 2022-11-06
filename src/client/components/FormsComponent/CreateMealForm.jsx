import React from "react";
import { useState } from "react";
import "./Forms.css";

export default function CreateMealForm (props) {
    const { handleMealCreationStatus } = props;
    const [values, setValues] = useState({
        title: '',
        description: '',
        location: '',
        maxReservations: '',
        price: '',
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

    const handleLocationInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            location: event.target.value,
        }));
    };

    const handleMaxReservationsInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            maxReservations: event.target.value,
        }));
    };

    const handlePriceInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            price: event.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("api/meals", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": values.title,
                "description": values.description,
                "location": values.location,
                "when": new Date(),
                "max_reservations": values.maxReservations,
                "price": values.price,
                "created_date": new Date()
            }),
            }) .then ((res) => {
                setSubmitted(true);
                handleMealCreationStatus(res.status);
            }).catch ((error) =>
            console.log(error));
    };

    return (
        <div className="formsDiv">
            <h2>Create Meal Form</h2>
            {submitted && <div className='success-message'>Your details are submitted wait for creating meal </div>}
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
                        id="location"
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={values.location}
                        onChange={handleLocationInputChange}
                        required
                    />

                    <input
                        id="max-reservations"
                        type="number"
                        placeholder="Max Reservations"
                        name="maxReservations"
                        value={values.maxReservations}
                        onChange={handleMaxReservationsInputChange}
                        min="1"
                        required
                    />

                    <input
                        id="price"
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={values.price}
                        onChange={handlePriceInputChange}
                        min="1"
                        required
                    />
                </div>

                <div className="formSubmissonButton">
                    <button type="submit">Create Meal</button> 
                </div>
               
            </form>
        </div>
    )
}