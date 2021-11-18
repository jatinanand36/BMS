const bcrypt = require('bcryptjs');
const logger = require('./logging');
const mongoose = require('mongoose');
const crypto = require('crypto');
const { log } = require('../../locale/messages');
const { TE, MP, HEX } = require('../../constants/constants');
const BOARD = require('../models/board');

const resetStatusBoardItems = async() => {
    let boards = await BOARD.find();
    for (let board; board < boards.length; board++) {
        let items = board && board.items && board.items.length ? boards : [];
        if (items.length) {
            for (let item; item < items.length; item++) {
                if (item.ststus === 'Doing') {
                    // Doing...
                    const destinationKey = 'items' + '.' + item + '.' + 'status';
                    const setBody = {};
                    setBody[`${destinationKey}`] = 'Done';
                    const updateBody = {
                        $set: setBody
                    }
                    await BOARD.updateOne({ _id: mongoose.Types.ObjectId(board._doc._id) }, updateBody);
                }
            }
        }
    }
}

module.exports = {
    resetStatusBoardItems
}