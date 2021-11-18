const Board = require('../models/board');
const ApiError = require('../utils/apiError');
const logger = require('../utils/logging');
const boardService = require('../services/boardService');
const { log, response } = require('../../locale/messages');
const { SUCCESS, HTTP_CODES } = require('../../constants/constants');
const boardUtil = require('../utils/boardUtil');

// BOARD CRUD APIS : CREATE
exports.addBoard = async(req, res, next) => {
    try {
        logger.info({ payload: req.body }, log.info.receivedPayloadAddBoard);
        const { name, userInfo } = req.body;
        const board = {
            name: name,
            updatedOn: new Date().toISOString(),
            updatedBy: userInfo.userId,
            createdOn: new Date().toISOString(),
            createdBy: userInfo.userId
        }
        const createdBoard = await boardService.createBoard(board);
        return res.status(HTTP_CODES.SUCCESS).send({ status: SUCCESS, "msg": response.boardAddedSuccessfully, "data": { "boardId": createdBoard._id } })
    } catch (error) {
        logger.error({ payload: req.body, err: error }, log.error.errorOccuredWhileAddingBoard);
        return next(new ApiError(response.unableAddBoard, HTTP_CODES.BADREQUEST));
    }
};

// BOARD CRUD APIS : DELETE
exports.deleteBoardById = async(req, res, next) => {
    try {
        logger.info({}, `log.info.receivedIdDeleteBoard  ${req.body.id}`);
        const board = await boardService.deleteBoardById(req.body.id);
        return res.json({ "status": SUCCESS, "msg": response.deletedBoardSuccessfully, "data": board });
    } catch (error) {
        logger.error({ err: error }, `${log.error.errorOccuredWhileDeletingTheBoard} ${req.params.id}`);
        return next(new ApiError(response.unableDeleteBoard, HTTP_CODES.BADREQUEST));
    }
};
// BOARD CRUD APIS : READ (ITEM AS WELL)
exports.getAllBoardList = async(req, res, next) => {
    try {
        logger.info({ payload: req.body }, log.info.receivedPayloadGetBoardsList);
        let boards = await boardService.getAllBoard();
        let boardsList = boards.map(boardsData => {
            boardsData._id = boardsData._id.toString;
            return boardsData
        })
        return res.status(HTTP_CODES.SUCCESS).send({ "status": SUCCESS, "msg": response.fetchBoardListSuccessfully, "data": boardsList });
    } catch (error) {
        logger.error({ err: error }, log.error.errorOccuredWhileGettingAllBoardList);
        return next(new ApiError(response.commonerror, HTTP_CODES.INTERNALERROR));
    }
};

// GET A BOARD BY ID CRUD APIS : READ (ITEM AS WELL)
exports.getBoardById = async(req, res, next) => {
    try {
        logger.info({}, `log.info.receivedIdGetBoard  ${req.params.id}`);
        let board = await boardService.getBoardById(req.params.id);
        return res.status(HTTP_CODES.SUCCESS).send({ "status": SUCCESS, "msg": response.fetchedBoardSuccessfully, "data": board });
    } catch (error) {
        logger.error({ err: error }, log.error.errorOccuredWhileFetchingTheBoard);
        return next(new ApiError(response.commonerror, HTTP_CODES.INTERNALERROR));
    }
};

// ITEM CRUD APIS : CREATE
exports.addItemOnBoard = async(req, res, next) => {
    try {
        logger.info({ payload: req.body }, log.info.receivedpayloadAddBoard);
        const { boardId, name, rating, status, description } = req.body;
        const item = {
            name: name,
            rating: rating,
            status: status,
            description: description ? description : ''
        }
        const updateBody = {
            $push: {
                items: item
            }
        }
        const addedItemBoard = await boardService.updateBoard(boardId, updateBody);
        return res.status(HTTP_CODES.SUCCESS).send({ status: SUCCESS, "msg": response.boardItemAddedSuccessfully, "data": addedItemBoard });
    } catch (error) {
        logger.error({ payload: req.body, err: error }, log.error.errorOccuredWhileAddingBoard);
        return next(new ApiError(response.unableAddBoardItem, HTTP_CODES.BADREQUEST));
    }
};
// ITEM CRUD APIS : UPDATE
exports.updateStatusItemOnBoard = async(req, res, next) => {
    try {
        logger.info({ payload: req.body }, log.info.receivedpayloadAddBoard);
        const { boardId, itemIndex, status } = req.body;
        const destinationKey = 'items' + '.' + itemIndex + '.' + 'status';
        const setBody = {};
        setBody[`${destinationKey}`] = status;
        const updateBody = {
            $set: setBody
        }
        const changedItemBoard = await boardService.updateBoard(boardId, updateBody);
        return res.json({ "status": SUCCESS, "msg": response.boardItemChangedSuccessfully, "data": changedItemBoard });
    } catch (error) {
        logger.error({ err: error }, `${log.error.errorOccuredWhileChangingTheBoard} ${req.params.id}`);
        return next(new ApiError(response.unableChangeBoardItem, HTTP_CODES.BADREQUEST));
    }
};
// ITEM CRUD APIS : DELETE
exports.deleteItemBoard = async(req, res, next) => {
    try {
        logger.info({ payload: req.body }, log.info.receivedpayloadDeleteBoardItem);
        const { boardId, name } = req.body;
        const updateBody = {
            $pull: {
                items: { name: name }
            }
        }
        const deletedItemBoard = await boardService.updateBoard(boardId, updateBody);
        return res.json({ "status": SUCCESS, "msg": response.deletedBoardItemSuccessfully, "data": deletedItemBoard });
    } catch (error) {
        logger.error({ err: error }, `${log.error.errorOccuredWhileDeletingTheBoard} ${req.params.id}`);
        return next(new ApiError(response.unableDeleteBoardItem, HTTP_CODES.BADREQUEST));
    }
};

// BOARD REST API : UPDATE
exports.resetBoards = async(req, res, next) => {
    try {
        logger.info({ payload: req.body }, log.info.receivedpayloadDeleteBoardItem);

        const deletedItemBoard = await boardUtil.resetStatusBoardItems();
        return res.json({ "status": SUCCESS, "msg": response.deletedBoardItemSuccessfully, "data": deletedItemBoard });
    } catch (error) {
        logger.error({ err: error }, `${log.error.errorOccuredWhileDeletingTheBoard} ${req.params.id}`);
        return next(new ApiError(response.unableDeleteBoardItem, HTTP_CODES.BADREQUEST));
    }
};