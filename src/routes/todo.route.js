const express=require("express");
const {getTodos,createTodo,deleteTodo,updateTodo} = require("../controllers/todo.controler");
const router = express.Router();

router.get("/get",getTodos)
router.post("/create",createTodo)
router.put("/update/:id",updateTodo)
router.delete("/delete/:id",deleteTodo)


module.exports = router;