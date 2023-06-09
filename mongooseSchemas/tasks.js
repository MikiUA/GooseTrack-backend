const { Schema, model } = require("mongoose");
const { mongooseHandler } = require("../helpers/errorHandling");

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
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
}, { versionKey: false, timestamps: true });


taskSchema.post("save", mongooseHandler);

const Task = model("task", taskSchema);
module.exports = Task