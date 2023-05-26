const { Movie } = require('./movie');
const { writeMovieCatalog } = require('./fileHandler');

const movieData = [
  {
    "title": "The Shawshank Redemption",
    "director": "Frank Darabont",
    "releaseYear": 1994,
    "genre": "Drama"
  },
  {
    "title": "The Godfather",
    "director": "Francis Ford Coppola",
    "releaseYear": 1972,
    "genre": "Crime, Drama"
  },
  {
    "title": "Pulp Fiction",
    "director": "Quentin Tarantino",
    "releaseYear": 1994,
    "genre": "Crime, Drama"
  },
  {
    "title": "The Dark Knight",
    "director": "Christopher Nolan",
    "releaseYear": 2008,
    "genre": "Action, Crime, Drama"
  },
  {
    "title": "Inception",
    "director": "Christopher Nolan",
    "releaseYear": 2010,
    "genre": "Action, Adventure, Sci-Fi"
  }
];

const catalog = movieData.map(movie => new Movie(movie.title, movie.director, movie.releaseYear, movie.genre));
writeMovieCatalog(catalog);
