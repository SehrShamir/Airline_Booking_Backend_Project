const { StatusCodes } = require('http-status-codes');
const AirplaneService = require('../sevices/airplane-service');

const { SuccessResponse, ErrorResponse } = require('../utils/common');

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
        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: airplanes
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}
async function getAirplane(req, res) {
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        if (!airplane) {
            return res.status(StatusCodes.NOT_FOUND).json({
                success: false,
                message: 'Airplane not found',
                data: {},
                error: { explanation: 'Airplane with the specified id was not found' }
            });
        }
        return res.status(StatusCodes.OK).json({
            ...SuccessResponse,
            data: airplane
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            ...ErrorResponse,
            error
        });
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
};