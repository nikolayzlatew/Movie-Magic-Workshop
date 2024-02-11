const router = require('express').Router();

const movieService = require('../services/movieService');
const castService = require('../services/castService');

router.get('/create', (req, res) => {
    res.render('create')
})

router.post('/create', async (req, res) => {
    const newMovie = req.body;

    try {
        await movieService.create(newMovie);

        res.redirect('/');
    } catch (err) {
        console.error(err.message);
        res.redirect('/create')
    }


})

router.get('/movies/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();

    // TODO: This is not perfect, use handlebars helpers

    movie.rating = new Array(Number(movie.rating)).fill(true)

    res.render('details', { movie });
});

router.get('/movies/:movieId/attach', async (req, res) => {
    const movie = await movieService.getOne(req.params.movieId).lean();
    const cast = await castService.getAll().lean();

    //TODO: remove already added cast
    res.render('movie/attach', { ...movie, cast })
})

router.post('/movies/:movieId/attach', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    await movieService.attach(movieId, castId);

    res.redirect(`/movies/${movieId}/attach`);
})

router.get('/movies/:movieId/edit', (req, res) => {
    res.render('movie/edit')
})

module.exports = router;


