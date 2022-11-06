import React from "react";
import { useEffect, useState, useCallback } from "react";
import ReserveMealForm from "../FormsComponent/ReserveMealForm";
import "../MealsComponent.css";

export default function ReserveMeal(props) {
    const {mealId} = props;
    const [availReservations, setAvailReservations] = useState();
    const [reservationsLeft, setReservationsLeft] = useState();
    const [showForm, setShowForm] = useState(false)
    const [mealReserveStatus, setMealReserveStatus] = useState()

    const fetchAvailableReservations = useCallback(() => {
        fetch("api/meals/?availableReservations=true")
            .then((res) => res.json())
            .then((res) => {
                setAvailReservations(res);})
    },[])

    useEffect(() => {
        fetchAvailableReservations();
    }, []);

    function renderAvailableReservations() {
        const reservation = availReservations.find(meal => meal.id === Number(mealId));
        let availableReservations;
        if(!reservation) {
            availableReservations = 0;
        } else if(reservation.available_reservations === null) {
            availableReservations = reservation.max_reservations;
        } 
        else {
            availableReservations = reservation.available_reservations;
        }
        if(reservationsLeft != availableReservations) 
            setReservationsLeft(availableReservations)

        return (  <h2>Available_reservations: {availableReservations}</h2> )
    }
    
    function showReserveMealForm() {
        setShowForm(!showForm)
    }

    function handleMealReserveStatus(status) {
        setMealReserveStatus(status);
        setShowForm(!showForm);
        fetchAvailableReservations();
    }

    return (
        <>  
            {mealReserveStatus === 201 && <h2 className='success-message'>Success! Thank you for Reserving this Meal</h2>}
            {mealReserveStatus === 500 && <h2 className='error-message'>Server Error!! Please Try Again </h2>}
            { availReservations && renderAvailableReservations()}
            <div>
                   { reservationsLeft !==0 && <button onClick={showReserveMealForm}>Reserve Meal Form</button>}
            </div>
            {showForm && reservationsLeft !==0 && <ReserveMealForm mealid={mealId} handleMealReserveStatus={handleMealReserveStatus}/> }
            {reservationsLeft === 0 && <h2>Sorry!!!No reservations available for this meal..</h2>}
        </>
    )
}