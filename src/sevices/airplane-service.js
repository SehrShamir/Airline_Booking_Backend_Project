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
        if (error.name == 'TyepeError') {
            throw new AppError('Cannot create a new Airplane object ', StatusCodes.BAD_REQUEST);
        }
        throw error;
    }
}
module.exports = {
    createAirplane
}