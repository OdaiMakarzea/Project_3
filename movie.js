class Movie {
  constructor(title, director, releaseYear, genre) {
    this.title = title;
    this.director = director;
    this.releaseYear = releaseYear;
    this.genre = genre;
  }

  getDetails() {
    return `Title: ${this.title}\nDirector: ${this.director}\nRelease Year: ${this.releaseYear}\nGenre: ${this.genre}`;
  }
}
module.exports = {
  Movie,
};
