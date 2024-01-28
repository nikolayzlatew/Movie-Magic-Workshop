const Cast = require('../models/Cast');
const Movie = require('../models/Movie');

exports.getAll = () => Cast.find();
exports.create = (castData) => Cast.create(castData);

