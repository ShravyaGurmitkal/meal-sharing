import React from "react";
import { useState } from "react";
import CreateMealForm from "../FormsComponent/CreateMealForm";
import Allmeals from "../Allmeals";
import "../MealsComponent.css"

export default function CreateMeal() {
    const [showMealForm, setShowMealForm] = useState(false);
    const [mealCreationStatus, setMealCreationStatus] = useState(true);

    function showCreateMealForm() {
        setShowMealForm(!showMealForm);
    }

    function handleMealCreationStatus (status){
        setMealCreationStatus(status);
        setShowMealForm(!showMealForm);
    }

    return (
        <>
            <div className="contentDisplayDiv">
                {mealCreationStatus === 201 &&  <h2 className='success-message'>Success! New meal is created ↓</h2>}
                {mealCreationStatus === 500 && <h2 className='error-message'>Server Error!! Please Try Again </h2>}
                <div style={{margin: "2em"}}>
                    <button onClick={showCreateMealForm}>Create Meal Form</button>
                </div>
                {showMealForm && <CreateMealForm handleMealCreationStatus={handleMealCreationStatus}/>}
            </div>

            <>
                {mealCreationStatus || mealCreationStatus === 201 ? <Allmeals /> : <></>}
            </>
        </>
    )
}