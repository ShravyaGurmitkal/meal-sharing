const express = require("express");
const router = express.Router();
const knex = require("../database");

//Returns all reviews
router.get("/", async (request, response) => {
  try {
    const allReviews = await knex("review");
    (allReviews.length !== 0) ? response.json(allReviews) : response.status(404).send(`No reviews are available`)
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Returns the review by id
router.get("/:id", async (request, response) => {
  try {
    const idReview = await knex("review").where({'id' : request.params.id});
    (idReview.length !== 0) ? response.json(idReview) : response.status(404).send(`No review is available with this id`)
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Adds a new review to the database
router.post("/", async (request, response) => {
  try {
    const newReview = request.body;
    let mealids = await knex("meal").select("id");
    mealids = mealids.map(id => id.id);
    if(Object.keys(newReview).length === 0) {
      response.status(400).send('Please send the fields to post review')
    } else if(mealsids.includes(newReview.meal_id)){
      const [reviewId] = await knex("review").insert({
        "title": newReview.title,
        "description": newReview.description,
        "meal_id": newReview.meal_id,
        "stars": newReview.stars,
        "created_date": newReview.created_date
     });

      const allReviews = await knex("review");
      response.status(201).json({ message: "Created review", id: reviewId, reviews: allReviews})
    } else{
      response.status(400).send({"message": "no meal is available with this mealId to post review"})
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Updates the Review by id
router.put("/:id", async (request, response) => {
  try {
    const updateReview = request.body;
    if(Object.keys(updateReview).length === 0) {
      response.status(400).send('Please send the fields to update')
    } else {
      const updatedId = await knex("review").where({'id': request.params.id}).update(updateReview);
      const allReviews = await knex("review");
      if(updatedId !== 0) {
        response.json({ message: "Updated review", updateStatus: updatedId, reviews: allReviews }) ;
      } else {
        response.status(404).json({ message: "No review is available with this id", updateStatus: updatedId, reviews: allReviews });
      }
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Deletes the review by id
router.delete("/:id", async (request, response) => {
  try {
    const deletedId = await knex("review").where({'id': request.params.id}).del();
    const allReviews = await knex("review");
    if (deletedId !== 0) {
      response.json({ message: "Deleted review", deleteStatus: deletedId, reviews: allReviews }) 
    } else{ 
      response.status(404).json({ message: "No review is available with this id", deleteStatus: deletedId, reviews: allReviews})
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;