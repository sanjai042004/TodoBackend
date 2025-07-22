const TodoModel = require("../models/todo.model");

const getTodos = async (_, res) => {
  try {
    const todos = await TodoModel.find();

    if (!todos) {
      return res
        .status(404)
        .json({ success: false, message: "No todos found" });
    }

    return res.status(200).json({ success: true, data: todos });
  } catch (error) {
    console.error("Error fetching todos:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, isCompleted } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const newTodo = new TodoModel({ title, isCompleted });

    await newTodo.save();

    return res.status(201).json({ success: true, data: newTodo });
    
  } catch (error) {
    console.error("Error creating todo:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, isCompleted } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID is required" });
    }

    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { title, isCompleted },
      { new: true }
    );

    if (!updatedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    return res.status(200).json({ success: true, data: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID is required" });
    }

    const deletedTodo = await TodoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    return res.status(200).json({ success: true, data: deletedTodo });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
