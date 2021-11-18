const { mongo } = require('mongoose');
const Board = require('../models/board');

exports.getBoardById = async(id) => {
    return await Board.findById(id);
};

exports.updateBoard = async(id, updateBody) => {
    return await Board.updateOne({ _id: mongo.ObjectId(id) }, updateBody, { new: true, useFindAndModify: false });
};

exports.getAllBoard = async() => {
    return await Board.find();
};

exports.createBoard = async(payload) => {
    return await Board.create(payload);
}

exports.deleteBoardById = async(id) => {
    return await Board.deleteOne({ "_id": mongo.ObjectId(id) });
}