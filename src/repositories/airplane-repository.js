const CrudRepository = require("./crud-repository");
const { Airplanes } = require('../models');

class AirplaneRepository extends CrudRepository {
    constructor(model) {
        super(Airplanes)

    }
}

module.exports = AirplaneRepository;