import React from "react";
import { useState } from "react";
import "./Forms.css";

export default function ReserveMealForm(props) {
    const {mealid, handleMealReserveStatus} = props;
    const [values, setValues] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        numberOfGuests: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleFullNameInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            fullName: event.target.value,
        }));
    };

    const handlePhoneNumberInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            phoneNumber: event.target.value,
        }));
    };

    const handleEmailInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            email: event.target.value,
        }));
    };

    const handleNOGInputChange = (event) => {
        event.persist();
        setValues((values) => ({
            ...values,
            numberOfGuests: event.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("api/reservations", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number_of_guests : values.numberOfGuests,
                meal_id: mealid,
                created_date: new Date(),
                contact_phonenumber: values.phoneNumber,
                contact_name: values.fullName,
                contact_email: values.email
            }),
            }) .then ((res) => {
                setSubmitted(true);
                handleMealReserveStatus(res.status);
            }).catch ((error) =>
            console.log(error));
    };

    return (
        <div className="formsDiv">
            <h1>Reservation Form</h1>
            {submitted && <div className='success-message'>Your details are submitted wait for reservation </div>}
            <form method="post" onSubmit={handleSubmit}>
                <div className="formInputs">
                    <input
                        id="full-name"
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        value={values.fullName}
                        onChange={handleFullNameInputChange}
                        required
                    />

                    <input
                        id="phone-number"
                        type="tel"
                        placeholder="Mobile Number"
                        name="phoneNumber"
                        value={values.phoneNumber}
                        onChange={handlePhoneNumberInputChange}
                        minLength="8"
                        maxLength="10"
                        required
                    />

                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        onChange={handleEmailInputChange}
                        required
                    />

                    <input
                        id="num-of-guests"
                        type="number"
                        placeholder="Number Of Guests"
                        name="numberOfGuests"
                        value={values.numberOfGuests}
                        onChange={handleNOGInputChange}
                        min="1"
                        required
                    />  
                </div>

                <div className="formSubmissonButton">
                    <button type="submit">Reserve Meal</button> 
                </div>
               
            </form>
        </div>
    )
}