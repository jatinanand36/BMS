const Joi = require('@hapi/joi');
const { objectId } = require('./customValidation');

const addBoard = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        userInfo: Joi.object().required()
    }),
};

const getBoardById = {
    params: Joi.object().keys({
        id: Joi.string().required().custom(objectId)
    }),
    userInfo: Joi.object().required()
};

const deleteBoardById = {
    body: Joi.object().keys({
        id: Joi.string().required().custom(objectId),
        userInfo: Joi.object().required()
    }),
};

const addItemOnBoard = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        rating: Joi.number().required(),
        status: Joi.string().required().valid('Todo', 'Doing', 'Done'),
        description: Joi.string(),
        boardId: Joi.string().required(),
        userInfo: Joi.object().required()
    }),
};

const updateStatusItemOnBoard = {
    body: Joi.object().keys({
        itemIndex: Joi.number().required(),
        status: Joi.string().required().valid('Todo', 'Doing', 'Done'),
        boardId: Joi.string().required(),
        userInfo: Joi.object().required()
    }),
};

const deleteItemBoard = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        boardId: Joi.string().required(),
        userInfo: Joi.object().required()
    }),
};

module.exports = {
    getBoardById,
    deleteBoardById,
    addBoard,
    addItemOnBoard,
    updateStatusItemOnBoard,
    deleteItemBoard
}