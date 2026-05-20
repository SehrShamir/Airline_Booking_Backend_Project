const { StatusCodes } = require('http-status-codes');
const AirplaneService = require('../sevices/airplane-service');

const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { error } = require('winston');

async function createAirplane(req, res) {
    try {
        console.log('req body in controller', req.body);
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: parseInt(req.body.capacity, 10)
        });
        return res.status(StatusCodes.CREATED)
            .json({
                success: true,
                message: 'Successfully created an airplane',
                data: airplane,
                error: {}
            });



    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Failed to create an airplane',
            data: {},
            error: err.message
        });
    }
}
async function getAirplanes(req, res) {
    try {
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);

    }
}
module.exports = {
    createAirplane,
    getAirplanes
};