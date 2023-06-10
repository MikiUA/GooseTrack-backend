const express = require('express');

const ctrl = require("../../controllers/tasks/tasks");

const { validateBodyTasks, isValidId, authentificateUser } = require('../../middleware');

const { taskSchemas: schemas } = require('../../validationSchemas');

const router = express.Router();

router.get("/", authentificateUser, ctrl.getAllTasks);
router.post("/", authentificateUser, validateBodyTasks(schemas.addSchemaTasks), ctrl.addTask);
router.patch("/:id", authentificateUser, isValidId, validateBodyTasks(schemas.updateTasksSchema), ctrl.updateTaskById);
router.put("/:id", authentificateUser, isValidId, validateBodyTasks(schemas.addSchemaTasks), ctrl.replaceTaskById);
router.delete("/:id", authentificateUser, isValidId, ctrl.deleteTaskById);

module.exports = { router }