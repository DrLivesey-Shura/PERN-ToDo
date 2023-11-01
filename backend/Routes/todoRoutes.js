const routes = require("express").Router();
const pool = require("../db");

// Routes

//Create a todo
routes.post("/", async (req, res) => {
  try {
    const { description } = req.body;
    const new_todo = await pool.query(
      "INSERT INTO public.todo (description) VALUES($1) RETURNING * ",
      [description]
    );
    res.json(new_todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//GET All Todos
routes.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo;");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//GET A sepecific Todo
routes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const thisTodo = await pool.query(`SELECT * FROM todo WHERE todo_id=${id}`)
    //OR
    const thisTodo = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [
      id,
    ]);
    res.json(thisTodo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//UPDATE A todo
routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE public.todo SET description=$1 WHERE todo_id=$2",
      [description, id]
    );
    res.json("todo was updated");
  } catch (error) {
    console.log(error.message);
  }
});

//DELETE Todo
routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query(
      "DELETE FROM public.todo WHERE todo_id=$1",
      [id]
    );
    res.json("todo was DELETED");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = routes;
