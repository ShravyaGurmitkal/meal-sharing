const express = require("express");
const router = express.Router();
const knex = require("../database");

//Returns all reservations
router.get("/", async (request, response) => {
  try {
    const allReservations = await knex("reservation");
    (allReservations.length !== 0) ? response.json(allReservations) : response.status(404).send(`No reservations are available`)
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Returns the reservation by id
router.get("/:id", async (request, response) => {
  try {
    const idReservations = await knex("reservation").where({'id' : request.params.id});
    (idReservations.length !== 0) ? response.json(idReservations) : response.status(404).send(`No reservation is available with this id`)
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Adds a new reservation to the database
router.post("/", async (request, response) => {
  try {
    const newReservation = request.body;
    const [reservationId] = await knex("reservation").insert({
        "number_of_guests": newReservation.number_of_guests,
        "meal_id": newReservation.meal_id,
        "created_date": newReservation.created_date,
        "contact_phonenumber": newReservation.contact_phonenumber,
        "contact_name": newReservation.contact_name,
        "contact_email": newReservation.contact_email
    });
    const allReservations = await knex("reservation");

    response.status(201).json({ message: "Created reservation", id: reservationId, reservations: allReservations })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Updates the reservation by id
router.put("/:id", async (request, response) => {
  try {
    const updateReservation = request.body
    if(Object.keys(updateReservation).length === 0) {
      response.status(400).send('Please send the fields to update')
    } else {
      const updatedId = await knex("reservation").where({'id': request.params.id}).update(updateReservation);
      const allReservations = await knex("reservation");
      (updatedId !== 0) ? response.json({ message: "Updated reservation", updateStatus: updatedId, reservations: allReservations }) : response.status(404).json({ message: "No reservation is available with this id", updateStatus: updatedId, reservations: allReservations })
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

//Deletes the reservation by id
router.delete("/:id", async (request, response) => {
  try {
    const deletedId = await knex("reservation").where({'id': request.params.id}).del();
    const allReservations = await knex("reservation");
    (deletedId !== 0) ? response.json({ message: "Deleted reservation", deleteStatus: deletedId, reservations: allReservations }) : response.status(404).json({ message: "No reservation is available with this id", deleteStatus: deletedId, reservations: allReservations })
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;