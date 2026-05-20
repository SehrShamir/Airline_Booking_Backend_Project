const { StatusCodes } = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');
const { error } = require('winston');

function validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
        ErrorResponse.message = 'Something went wrong while creating an airplane';
        ErrorResponse.error.explanation = 'model number not found in the request';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse

        );
    }
    if (req.body.capacity === undefined) {
        ErrorResponse.message = 'Something went wrong while creating an airplane';
        ErrorResponse.error.explanation = 'capacity not found in the request';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    const capacityNum = Number(req.body.capacity);
    if (isNaN(capacityNum) || !Number.isInteger(capacityNum)) {
        ErrorResponse.message = 'Something went wrong while creating an airplane';
        ErrorResponse.error.explanation = 'capacity should be an integer';
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    req.body.capacity = capacityNum;
    next();
}

module.exports = {
    validateCreateRequest
}   