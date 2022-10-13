const express = require("express");
const router = express.Router();
const knex = require("../database");

//Returns all meals
router.get("/", async (request, response) => {
  try {
    const allMeals = await knex("meal");
    (allMeals.length !== 0) ? response.json(allMeals) : response.status(404).send(`No meals are available`)
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Returns the meal by id
router.get("/:id", async (request, response) => {
  try {
    const idMeals = await knex("meal").where({'id' : request.params.id});
    (idMeals.length !== 0) ? response.json(idMeals) : response.status(404).send(`No meal is available with this id`)
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Adds a new meal to the database
router.post("/", async (request, response) => {
  try {
    const newMeal = request.body;
    const [mealId] = await knex("meal").insert({
      "title": newMeal.title,
      "description": newMeal.description,
      "location": newMeal.location,
      "when": newMeal.when,
      "max_reservations": newMeal.max_reservations,
      "price": newMeal.price,
      "created_date": newMeal.created_date
    });
    const allMeals = await knex("meal");

    response.status(201).json({ message: "Created meal", id: mealId, meals: allMeals })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Updates the meal by id
router.put("/:id", async (request, response) => {
  try {
    const updateMeal = request.body;
    if(Object.keys(updateMeal).length === 0) {
      response.status(400).send('Please send the fields to update')
    } else {
      const updatedId = await knex("meal").where({'id': request.params.id}).update(updateMeal);
      const allMeals = await knex("meal");
      (updatedId !== 0) ? response.json({ message: "Updated meal", updateStatus: updatedId, meals: allMeals }) : response.status(404).json({ message: "No meal is available with this id", updateStatus: updatedId, meals: allMeals })
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Deletes the meal by id
router.delete("/:id", async (request, response) => {
  try {
    const deletedId = await knex("meal").where({'id': request.params.id}).del();
    const allMeals = await knex("meal");
    (deletedId !== 0) ? response.json({ message: "Deleted meal", deleteStatus: deletedId, meals: allMeals }) : response.status(404).json({ message: "No meal is available with this id", deleteStatus: deletedId, meals: allMeals })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;