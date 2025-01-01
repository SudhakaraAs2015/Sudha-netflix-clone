import express from 'express';
import  {getTrendingMovie, getMovieTrailers , getMovieDetails, getSimalarMovies, getMoviesByCategory}  from '../controllers/movieController.js';

const router = express.Router();

router.get('/trending', getTrendingMovie);
router.get('/:id/trailers', getMovieTrailers);
router.get('/:id/details', getMovieDetails);
router.get('/:id/similar', getSimalarMovies);
router.get('/:category', getMoviesByCategory);


export default router;