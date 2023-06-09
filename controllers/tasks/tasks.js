// const { EMPTYHANDLER } = require('../TODOhandler');

const { CustomError, middlewareHandler: handled } = require("../../helpers/errorHandling");
const { Task } = require("../../mongooseSchemas");

const getAllTasks = async (req, res, next) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 31 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Task.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "name email");
    res.json(result);
}

const addTask = async (req, res, next) => {
    const { _id: owner } = req.user;
    const result = await Task.create({ ...req.body, owner });
    res.status(201).json(result);
}

const updateTaskById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw CustomError(404, "Not found");
    }
    res.json(result);
}

const updatePriorityById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw CustomError(404, "Not found");
    }
    res.json(result);
}

const deleteTaskById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Task.findByIdAndRemove(id);
    if (!result) {
        throw CustomError(404, "Not found");
    }
    res.json({
        message: "Delete success"
    })
}

module.exports = {
    getAllTasks: handled(getAllTasks),
    addTask: handled(addTask),
    updateTaskById: handled(updateTaskById),
    updatePriorityById: handled(updatePriorityById),
    deleteTaskById: handled(deleteTaskById),
};

// router.get('/tasks', EMPTYHANDLER);
// router.post('/tasks', EMPTYHANDLER);
// router.patch('/tasks/:taskID', EMPTYHANDLER);
// router.delete('/tasks/:taskID', EMPTYHANDLER);

