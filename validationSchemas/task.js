const Joi = require("joi");

const priorityList = ['low', 'medium', 'high'];
const categoryList = ['to-do', 'in-progress', 'done'];
const dateRegexp = /^\d{4}-\d{2}-\d{2}$/;

const addSchemaTasks = Joi.object({
    titleTasks: Joi.string()
        .min(3)
        .max(250)
        .required(),
    startTasks: Joi.string().required(),
    endTasks: Joi.string().required(),
    priorityTasks: Joi.boolean().valid(...priorityList).required(),
    // dataTasks: Joi.date().pattern(dateRegexp).required(),TODO Joi.date().pattern is not a function
    dataTasks: Joi.string().pattern(dateRegexp).required(),
    categoryTasks: Joi.boolean().valid(...categoryList).required(),
});

const updatePriorityTasksSchema = Joi.object({
    priorityTasks: Joi.boolean().valid(...priorityList).required(),
})

const schemas = {
    addSchemaTasks,
    updatePriorityTasksSchema,
}

module.exports = schemas