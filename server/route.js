const express = require("express");
const CityModel = require("./model");
const app = express();

app.get("/city", async (request, response) => {
  const cities = await CityModel.find({city:"GRANBY"}).limit(1);
  //const results = await cities.toArray();

  try {
  console.log(cities);
    response.send(cities.state);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;
