const express = require('express');

const ctrl = require("../../controllers/tasks/tasks");

const { validateBodyTasks, isValidId, authentificateUser } = require('../../middleware');

const { taskSchemas: schemas } = require('../../validationSchemas');

const router = express.Router();

router.get("/tasks", authentificateUser, ctrl.getAllTasks);
router.post("/tasks", authentificateUser, validateBodyTasks(schemas.addSchemaTasks), ctrl.addTask);
router.patch("/tasks/:taskID", authentificateUser, isValidId, validateBodyTasks(schemas.updatePriorityTasksSchema), ctrl.updatePriorityById);
router.put("/tasks/:taskID", authentificateUser, isValidId, validateBodyTasks(schemas.addSchemaTasks), ctrl.updateTaskById);
router.delete("/tasks/:taskID", authentificateUser, isValidId, ctrl.deleteTaskById);

module.exports = { router }