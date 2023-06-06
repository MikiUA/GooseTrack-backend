// const { EMPTYHANDLER } = require('../TODOhandler');
const { Task } = require('../../models/tasks/task');
const { HttpError, ctrlWrapper } = require("../../helpers");

const getAllTasks = async (req, res) => {
    const result = await Task.find({}, "-createdAt -updatedAt");
    res.json(result);
}

const addTask = async(req, res, next)=> {
    const result = await Task.create(req.body);
    res.status(201).json(result);
}
    
const updateTaskById = async(req, res, next)=> {
    const { id } = req.params;
    const result = await Task.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);        
}

const updatePriorityById = async(req, res, next)=> {
    const { id } = req.params;
    const result = await Task.findByIdAndUpdate(id, req.body, {new: true});
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json(result);        
}

const deleteTaskById = async(req, res, next)=> {
    const { id } = req.params;
    const result = await Task.findByIdAndRemove(id);
    if (!result) {
        throw HttpError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })    
}

module.exports = {
    getAllTasks: ctrlWrapper(getAllTasks),
    addTask: ctrlWrapper(addTask),
    updateTaskById: ctrlWrapper(updateTaskById),
    updatePriorityById: ctrlWrapper(updatePriorityById),
    deleteTaskById: ctrlWrapper(deleteTaskById),    
};

// router.get('/tasks', EMPTYHANDLER);
// router.post('/tasks', EMPTYHANDLER);
// router.patch('/tasks/:taskID', EMPTYHANDLER);
// router.delete('/tasks/:taskID', EMPTYHANDLER);

