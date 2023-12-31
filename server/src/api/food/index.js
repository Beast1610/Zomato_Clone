import express from "express";

import { FoodModel } from "../../database/allModels";

const Router = express.Router();

/**
 * Route     /:_id
 * Des       Create New Food Item
 * Params    none
 * Access    Public
 * Method    POST
 */
Router.post("/addFood", async (req, res) => {
  try {
    console.log(req.body);
    const newfood = await FoodModel.create(req.body);
    if (newfood) return res.status(200).json({ status: succes, data: newfood });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
})

/**
 * Route     /:_id
 * Des       Get food based on id
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const foods =await FoodModel.findById(_id);
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /r/:_id
 * Des       Get all food based on particular restaurant
 * Params    _id
 * Access    Public
 * Method    GET
 */
Router.get("/r/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const foods = await FoodModel.find({
      restaurant: _id,
    });
    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /c/:category
 * Des       Get all food based on particular category
 * Params    category
 * Access    Public
 * Method    GET
 */
Router.get("/c/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await FoodModel.find({
      category: { $regex: category, $options: "i" },
    });

    if (!foods)
      return res
        .status(404)
        .json({ error: `No food matched with ${category}` });

    return res.json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// /c/non
// non === non - veg;
// non === nonsdfwae;

export default Router;