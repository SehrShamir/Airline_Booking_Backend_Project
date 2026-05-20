const { AirplaneRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();
async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    }
    catch (error) {
        // Convert repository/DB errors into AppError so controllers send consistent responses
        if (error.name && error.name.toLowerCase().includes('sequel')) {
            throw new AppError(error.message || 'Database error while creating airplane', StatusCodes.BAD_REQUEST);
        }
        if (error.name === 'TypeError') {
            throw new AppError('Cannot create a new Airplane object', StatusCodes.BAD_REQUEST);
        }
        throw new AppError(error.message || 'Internal server error', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    }
    catch (error) {
        throw new AppError('Cannot fetch data of all  the Airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createAirplane,
    getAirplanes
}