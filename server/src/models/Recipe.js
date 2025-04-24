const { Schema, model } = require("mongoose");
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  recommendList: {
    type: [Schema.Types.ObjectId],
    ref: "User",
  },
  owner: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Recipe = model("Recipe", recipeSchema);
module.exports = { Recipe };
