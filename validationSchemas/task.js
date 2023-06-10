const Joi = require("joi");

const priorityList = ['low', 'medium', 'high'];
const categoryList = ['to-do', 'in-progress', 'done'];
const dateRegexp = /^\d{4}-\d{2}-\d{2}$/;
const timeRegexp = /^(?:[01]\d|2[0-3]):[0-5]\d$/

const addSchemaTasks = Joi.object({
    title: Joi.string()
        .min(3)
        .max(250)
        .required(),
    start: Joi.string().pattern(timeRegexp).required(),
    end: Joi.string().pattern(timeRegexp).required(),
    priority: Joi.boolean().valid(...priorityList).required(),
    date: Joi.string().pattern(dateRegexp).required(),
    category: Joi.boolean().valid(...categoryList).required(),
});

const updateTasksSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(250),
    start: Joi.string().pattern(timeRegexp),
    end: Joi.string().pattern(timeRegexp),
    priority: Joi.boolean().valid(...priorityList),
    date: Joi.string().pattern(dateRegexp),
    category: Joi.boolean().valid(...categoryList),
})

const schemas = {
    addSchemaTasks,
    updateTasksSchema,
}

module.exports = schemas