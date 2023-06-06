const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../../helpers");

const priorityList = ['low', 'medium', 'high'];
const categoryList = ['to-do', 'in-progress', 'done'];
const dateRegexp = /^\d{4}-\d{2}-\d{2}$/;                   

const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Set title for task'],
    },
    start: {
        type: String,
        required: [true, 'Set start for task'],
    },
    end: {
        type: String,
        required: [true, 'Set end for task'],
    },
    priority: {
        type: Boolean,
        enum: priorityList,
        default: false,
    },
    data: {
        type: String,
        match: dateRegexp,
        required: [true, 'Set data for task'],
    },
    category: {
        type: Boolean,
        enum: categoryList,
        default: false,
    },
}, { versionKey: false, timestamps: true });

taskSchema.post("save", handleMongooseError);

const addSchemaTasks = Joi.object({
    titleTasks: Joi.string()
        .min(3)
        .max(250)
        .required(),
    startTasks: Joi.string().required(),
    endTasks: Joi.string().required(),
    priorityTasks: Joi.boolean().valid(...priorityList).required(),
    dataTasks: Joi.date().pattern(dateRegexp).required(),
    categoryTasks: Joi.boolean().valid(...categoryList).required(),
});

const updatePriorityTasksSchema = Joi.object({
    priorityTasks: Joi.boolean().valid(...priorityList).required(),
})

const schemas = {
    addSchemaTasks,
    updatePriorityTasksSchema,
}

const Task = model("task", taskSchema);

module.exports = {
    Task,
    schemas,
}
