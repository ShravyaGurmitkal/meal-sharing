import React from "react";
import { useEffect, useState } from "react";

export default function Allmeals() {
    const [allMeals, setAllMeals] = useState([]);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        setIsloading(true);
        fetch("/api/meals")
          .then((r) => r.json())
          .then((r) => setAllMeals(r))
          .then(() => {
            setIsloading(false);
          });
      }, []);

    return (
        <>
            {isLoading && <p>loading....</p>}
            {allMeals.length === 0  ? 
                    <p>No Results</p> : 
                    <ul>
                        {allMeals.map((meal => {
                            return(
                                <li key={meal.id}>
                                    <h2>Title: {meal.title}</h2>
                                    <p>Description: {meal.description}</p>
                                    <p>Price; {meal.price}</p>
                                </li>
                            )
                        }))}
                    </ul>
            }
        </>
    )
}