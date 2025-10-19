const mongoose = require("mongoose");

//define the schemma
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

//create the model from the schema
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
