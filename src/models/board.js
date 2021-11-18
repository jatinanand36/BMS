const mongoose = require('mongoose');
const { updateIfCurrentPlugin } = require('mongoose-update-if-current');
const item = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: false },
    rating: { type: Number, required: true },
    updatedOn: { type: Date, required: true, default: new Date().toISOString() },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdOn: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { _id: false, versionKey: false });

const BoardSchema = mongoose.Schema({
    name: { type: String, required: true },
    items: { type: [item] },
    updatedOn: { type: Date, required: true, default: new Date().toISOString() },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdOn: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, required: true }
});

BoardSchema.plugin(updateIfCurrentPlugin);

const Board = module.exports = mongoose.model('boards', BoardSchema);