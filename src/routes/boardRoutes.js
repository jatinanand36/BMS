const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const boardValidation = require('../validation/boardValidation');
const validate = require('../validation/validate');

router.route('/add').post(validate(boardValidation.addboard), boardController.addBoard);
router.route('/list/:id').get(validate(boardValidation.getBoardById), boardController.getBoardById);
router.route('/list/').get(boardController.getAllBoardList);
router.route('/delete/').post(validate(boardValidation.deleteBoardById), boardController.deleteBoardById);
router.route('/addItem').post(validate(boardValidation.addItemOnBoard), boardController.addItemOnBoard);
router.route('/changeStatusItem').post(validate(boardValidation.updateStatusItemOnBoard), boardController.updateStatusItemOnBoard);
router.route('/deleteItem').post(validate(boardValidation.deleteItemBoard), boardController.deleteItemBoard);
router.route('/reset').post(boardController.resetBoards);

module.exports = router;