const { Schema, model } = require("mongoose");
const { mongooseHandler } = require("../helpers/errorHandling");

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
        type: String,
        enum: priorityList,
        default: false,
    },
    date: {
        type: String,
        match: dateRegexp,
        required: [true, 'Set data for task'],
    },
    category: {
        type: String,
        enum: categoryList,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, { versionKey: false, timestamps: true });


taskSchema.post("save", mongooseHandler);

const Task = model("task", taskSchema);
module.exports = Task