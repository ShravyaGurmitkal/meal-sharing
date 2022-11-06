import React from "react";
import logo from "../assets/images/meal_logo.png";
import { Link } from "react-router-dom";
import "./Header.css"

export default function Header() {
    return (
        <header className="header" id="header">
            <div className="titleDiv">
                <h1>Meals Sharing</h1>
            </div>

            <nav>
                <ul className="headerNavUl">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/meals"> ReserveMeal</Link>
                    </li>
                    <li>
                        <Link to="/createmeal">CreateMeal</Link>
                    </li>
                    <li>
                        <Link to="/mealReviews">Reviews</Link>
                    </li>
                    <li>
                        <a href="#footer">Contact</a>
                    </li>
                </ul>
            </nav>              
        </header>
    )
}