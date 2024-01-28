const Movie = require('../models/Movie');


exports.getAll = () => Movie.find();


exports.search =  (title, genre, year) => {
    let query = {};

    if (title) {
        query.title = new RegExp(title, 'i');
    }

    if (genre) {
        query.genre = genre.toLowerCase();
    }

    if (year) {
        query.year = year;
    }

    return Movie.find(query);
}

exports.getOne = (movieId) => Movie.findById(movieId).populate('casts');

exports.create = (movieData) => Movie.create(movieData);

exports.attach = async (movieId, castId) => {
    const movie = await this.getOne(movieId);

    // TODO: validate castId if exist
    // TODO: validate if cast is already added
    movie.casts.push(castId);

    return movie.save();
}

