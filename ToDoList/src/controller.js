const fs = require("fs");

const {
    asyncReadFile,
    asyncWriteFile
} = require("./dao.js");

exports.getAllTasks = (req, res) => fs.readFile(req.app.locals.dataFilePath, "utf-8", (err,data) => {
        if(err){
            return res.status(500).send();
        }
        res.send(JSON.parse(data));
    });

exports.createTask = async(req, res) => {
    const newTask = req.body;
    const file = await asyncReadFile(req.app.locals.dataFilePath);
    const taskList = JSON.parse(file);
    if(taskList.filter(v => v.id === newTask.id).length != 0){
        res.status(400).send();
    }else{
        taskList.push(newTask);
        await asyncWriteFile(JSON.stringify(taskList), req.app.locals.dataFilePath);
        res.status(201).send(taskList);
    }
}

exports.getTask = async (req, res) => {
    const id = req.params.id;
    const file = await asyncReadFile(req.app.locals.dataFilePath);
    const tasks = JSON.parse(file).filter(v => v.id == id);
    tasks.length == 0 ? res.status(404).send() : res.send(tasks[0]);
}

exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    const file = await asyncReadFile(req.app.locals.dataFilePath);
    const tasks = JSON.parse(file);
    const newTasks = tasks.filter(v => v.id != id);
    if(newTasks.length === tasks.length){
        res.status(404).send();
    }else{
        await asyncWriteFile(JSON.stringify(newTasks), req.app.locals.dataFilePath);
        res.status(204).send();
    }
}
