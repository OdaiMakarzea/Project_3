const { Movie } = require('./movie');
const { readMovieCatalog, writeMovieCatalog } = require('./fileHandler');
const fetch = require('node-fetch');

class MovieManager {
  constructor() {
    this.catalog = readMovieCatalog();
  }

  displayCatalog() {
    this.catalog.forEach((movie) => {
      if (movie instanceof Movie) {
        console.log(movie.getDetails());
      } else {
        console.log('Invalid movie object:', movie);
      }
    });
  }
  

  addMovie(title, director, releaseYear, genre) {
    const movie = new Movie(title, director, releaseYear, genre);
    this.catalog.push(movie);
    writeMovieCatalog(this.catalog);
  }

  updateMovie(index, title, director, releaseYear, genre) {
    const movie = this.catalog[index];
    if (title) {
      movie.title = title;
    }
    if (director) {
      movie.director = director;
    }
    if (releaseYear) {
      movie.releaseYear = releaseYear;
    }
    if (genre) {
      movie.genre = genre;
    }
    writeMovieCatalog(this.catalog);
  }

  deleteMovie(index) {
    if (index < 0 || index >= this.catalog.length) {
      console.log('Invalid movie index.');
      return;
    }
  
    this.catalog.splice(index, 1);
    writeMovieCatalog(this.catalog);
    console.log('Movie deleted successfully!');
  }

  getMovieCount() {
    return this.catalog.length;
  }

  getMovieByIndex(index) {
    return this.catalog[index];
  }

  searchByTitle(title) {
    return this.catalog.filter((movie) => movie.title.toLowerCase().includes(title.toLowerCase()));
  }

  searchByDirector(director) {
    return this.catalog.filter((movie) => movie.director.toLowerCase().includes(director.toLowerCase()));
  }

  filterByGenre(genre) {
    return this.catalog.filter((movie) => movie.genre.toLowerCase() === genre.toLowerCase());
  }

  filterByReleaseYear(releaseYear) {
    return this.catalog.filter((movie) => movie.releaseYear === releaseYear);
  }

  async fetchMovieData(title) {
    const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=YOUR_API_KEY`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie data.');
    }
    const movieData = await response.json();
    return {
      title: movieData.Title,
      director: movieData.Director,
      releaseYear: movieData.Year,
      genre: movieData.Genre,
      plot: movieData.Plot,
      ratings: movieData.Ratings.map((rating) => `${rating.Source} (${rating.Value})`),
    };
  }
}

module.exports = {
  MovieManager,
};
