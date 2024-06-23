// controllers/todoController.js

import Todo from "../models/todo.js";

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render("index", { todos });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Create a todo
export const createTodo = async (req, res) => {
  const { task } = req.body;
  try {
    const newTodo = new Todo({ task });
    await newTodo.save();
    res.redirect("/todos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.redirect("/todos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};
