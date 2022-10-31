import React from "react";
import logo from "./assets/images/meal_logo.png";

export default function Header() {
    return (
        <header>
            <div>
                <img src={logo}/>
            </div>
            <nav>
                <p>Meal</p>
            </nav>
        </header>
    )
}