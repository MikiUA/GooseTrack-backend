const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const taskPath = path.join(__dirname, "tasks.json");

// const getAllTasks = async (owner) => {
//   const data = await Task.find({ owner });
//   return result;
// };

const getAllTasks = async () => {
    const data = await fs.readTask(taskPath);
    return JSON.parse(data);
}

const addTask = async(data) => {
    const tasks = await getAll();
    const newTask = {
        id: nanoid(),
        ...data,
    }
    tasks.push(newTask);
    await fs.writeFile(taskPath, JSON.stringify(tasks, null, 2));
    return newTask;
}

const updateTaskById = async(id, data) => {
    const tasks = await getAll();
    const index = tasks.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    tasks[index] = {id, ...data};
    await fs.writeFile(taskPath, JSON.stringify(tasks, null, 2));
    return tasks[index];
}

const deleteTaskById = async(id) => {
    const tasks = await getAll();
    const index = tasks.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = tasks.splice(index, 1);
    await fs.writeFile(taskPath, JSON.stringify(tasks, null, 2));
    return result;
}

module.exports = {
    getAllTasks,
    addTask,
    updateTaskById,
    deleteTaskById    
};