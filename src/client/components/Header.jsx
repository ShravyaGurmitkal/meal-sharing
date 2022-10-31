import React from "react";
import logo from "../assets/images/meal_logo.png";

export default function Header() {
    return (
        <header className="header">
            <div>
                <img src={logo} alt="mealSharingLogo" height="5em" width="5em"/>
            </div>
            <nav className="headerNav">
                <p>Home</p>
                <p>AboutUs</p>
                <p>ContactUS</p>
            </nav>
        </header>
    )
}