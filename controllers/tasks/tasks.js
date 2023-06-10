// const { EMPTYHANDLER } = require('../TODOhandler');

const { CustomError, middlewareHandler: handled } = require("../../helpers/errorHandling");
const { Task } = require("../../mongooseSchemas");

function getCurrentDateFormatted(nextMonth = false) {
    const currentDate = new Date();
    if (nextMonth) currentDate.setMonth(currentDate.getMonth() + 1);

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`
}

const getAllTasks = async (req, res, next) => {
    const owner = req.user;
    const { startDate = (getCurrentDateFormatted()), endDate = getCurrentDateFormatted(true) } = req.query;
    const result = await Task.find({
        owner, date: {
            $gt: startDate,
            $lt: endDate
        }
    }, "-createdAt -updatedAt");
    res.json(result);
}

const addTask = async (req, res, next) => {
    const owner = req.user;
    const result = await Task.create({ ...req.body, owner });
    res.status(201).json(result);
}

const replaceTaskById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw CustomError(404, "Not found");
    }
    res.json(result);
}

const updateTaskById = async (req, res, next) => {
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
    replaceTaskById: handled(replaceTaskById),
    updateTaskById: handled(updateTaskById),
    deleteTaskById: handled(deleteTaskById),
};

// router.get('/tasks', EMPTYHANDLER);
// router.post('/tasks', EMPTYHANDLER);
// router.patch('/tasks/:taskID', EMPTYHANDLER);
// router.delete('/tasks/:taskID', EMPTYHANDLER);

