const express = require("express");
const { limit, sum } = require("../database");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    let meals = await knex("meal");

    //Returns all meals that are cheaper than maxPrice.
    if(request.query.maxPrice !== undefined) {
      const reqPrice = Number(request.query.maxPrice);
      if(isNaN(reqPrice)) {
        response.status(400).send({"message": "MaxPrice should be a number"});
      } else {
        meals = await knex("meal").where('price', '<', reqPrice);
      }
    } 
    
    //Returns all meals that still have available spots left
    if(request.query.availableReservations !== undefined) {
      const reqValue = request.query.availableReservations;
      if(reqValue === "true") {
        meals = await knex("meal")
          .select('meal.id', 'meal.title', 'max_reservations', knex.raw('(max_reservations - sum(number_of_guests)) as available_reservations'))
          .sum('number_of_guests as number_of_guests')
          .innerJoin('reservation', 'meal.id', 'reservation.meal_id')
          .groupBy('meal.id').having('available_reservations','>',0)
      } else if(reqValue === 'false') {
        meals = await knex("meal")
        .select('meal.id', 'meal.title', 'max_reservations', knex.raw('(max_reservations - sum(number_of_guests)) as available_reservations'))
        .innerJoin('reservation', 'meal.id', 'reservation.meal_id')
        .groupBy('meal.id').having('available_reservations','<=',0)
      } else {
        response.status(400).send({"message": "availableReservations should be a boolean value true or false"});
      }
    }

    //Returns all meals that partially match the given title. Rød grød will match the meal with the title Rød grød med fløde
    if(request.query.title !== undefined) {
      const reqTitle = request.query.title;
      if(!isNaN(reqTitle)) {
        response.status(400).send({"message": "title should be a string"});
      } else {
        meals = await knex("meal").where('title', 'like', `%${reqTitle}%`);
      }
    }

    //Returns all meals where the date for when is after the given date
    if(request.query.dateAfter !== undefined) {
      const reqDateAfter = request.query.dateAfter;
      const regx = /\d{4}[-/]\d{1,2}[-/]\d{1,2}/g;
      if(!(isNaN(request.query.dateAfter) && !isNaN(Date.parse(request.query.dateAfter))) || !reqDateAfter.match(regx)) {
        response.status(400).send({"message": "dateAfter should be a date and should be in either of the format yyyy-mm-dd or yyyy/mm/dd"});
      } else {
        meals = await knex("meal").where('when' , '>' , reqDateAfter)
      }
    }

    //Returns all meals where the date for when is before the given date
    if(request.query.dateBefore !== undefined) {
      const reqDateBefore = request.query.dateBefore;
      const regx = /\d{4}[-/]\d{1,2}[-/]\d{1,2}/g;
      if(!(isNaN(request.query.dateBefore) && !isNaN(Date.parse(request.query.dateBefore))) || !reqDateBefore.match(regx)) {
        response.status(400).send({"message": "dateBefore should be a date and should be in either of the format yyyy-mm-dd or yyyy/mm/dd"});
      } else {
        meals = await knex("meal").where('when' , '<=' , reqDateBefore)
      }
    }

    //Returns the given number of meals
    if(request.query.limit !== undefined) {
      const reqLimit = Number(request.query.limit);
      if(isNaN(reqLimit)) {
        response.status(400).send({"message": "Limit should be a number"});
      } else {
        meals =  await knex("meal").limit(reqLimit);
      }
    }

    //Returns all meals sorted by the given key. Allows when, max_reservations and price as keys. Default sorting order = asc
    //Returns all meals sorted in the given direction
    if(request.query.sort_key !== undefined) {
      const reqSortKey = request.query.sort_key.toLowerCase();
      const reqSortDir = request.query.sort_dir;
      const keys = ["when", "max_reservations", "price"];

      if(!isNaN(reqSortKey) || !keys.includes(reqSortKey)) {
        response.status(400).send({"message": "sort_key should be a String & should be the value in ['when', 'max_reservations', 'price']"});
      } else if(reqSortDir === undefined || reqSortDir.toLowerCase() === 'asc') {
        meals =  await knex("meal").orderBy(reqSortKey);
      } else if(reqSortDir.toLowerCase() === 'desc'){
        meals =  await knex("meal").orderBy(reqSortKey, 'desc');
      } else {
        response.status(400).send({"message": "sort_dir value should be either asc or desc"});
      }
    }

    if(meals !== undefined) {
      if(meals.length !== 0) {
        response.json(meals);
      } else {
        response.status(404).send({"message": 'Data not found for the requested search'});
      }
    } 
   
  } catch (error) {
    throw error;
  }
});

//Returns all reviews for a specific meal
router.get("/:meal_id/reviews", async (request, response) => {
  try {
    const mealId_reviews = await knex("review").where({'meal_id' : request.params.meal_id});
    (mealId_reviews.length !== 0) ? response.json(mealId_reviews) : response.status(404).send(`No review is available with this meal_id`)
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
