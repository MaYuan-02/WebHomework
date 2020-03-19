const express = require('express');
const {
    getAllTasks,
    createTask,
    getTask,
    deleteTask
} = require('./controller.js')

const app = express();
app.locals.dataFilePath = "./data.json";



const port = 3000;

app.use(express.json());
app.get("/",(req, res) => res.send('<h1>Welcome!</h1>'));

app.get("/api/tasks", getAllTasks);

app.post("/api/tasks", createTask);

app.get("/api/tasks/:id",getTask);

app.delete("/api/tasks/:id",deleteTask);

app.listen(port, () => console.log(`port ${port} is being listening!`));

exports.app = app;