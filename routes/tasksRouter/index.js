const express = require('express');

const ctrl = require("../../controllers/tasks/tasks");

const { validateBodyTasks, isValidId }  = require('../../middleware');

const { schemas }  = require('../../models/tasks/task'); 

const router = express.Router();

router.get("/", ctrl.getAllTasks);

router.post("/", validateBodyTasks(schemas.addSchemaTasks), ctrl.addTask);

router.patch("/:id/priority", isValidId, validateBodyTasks(schemas.updatePriorityTasksSchema), ctrl.updatePriorityById);

router.put("/:id", isValidId, validateBodyTasks(schemas.addSchemaTasks), ctrl.updateTaskById);

router.delete("/:id", isValidId, ctrl.deleteTaskById);

module.exports = { router }