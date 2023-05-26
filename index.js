const readline = require('readline');
const { MovieManager } = require('./movieManager');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const movieManager = new MovieManager();

function displayMenu() {
  console.log('\n==== Movie Catalog CLI ====');
  console.log('1. Display Movie Catalog');
  console.log('2. Add New Movie');
  console.log('3. Update Movie Details');
  console.log('4. Delete Movie');
  console.log('5. Search and Filter');
  console.log('6. Fetch Movie Data');
  console.log('0. Exit');
  console.log('===========================\n');
  rl.question('Enter your choice: ', handleMenuChoice);
}

function handleMenuChoice(choice) {
  switch (choice) {
    case '0':
      rl.close();
      break;
    case '1':
      movieManager.displayCatalog();
      displayMenu();
      break;
    case '2':
      promptAddMovieDetails();
      break;
    case '3':
      promptUpdateMovie();
      break;
    case '4':
      promptDeleteMovie();
      break;
    case '5':
      promptSearchAndFilter();
      break;
    case '6':
      promptFetchMovieData();
      break;
    default:
      console.log('Invalid choice. Please try again.');
      displayMenu();
  }
}

function promptAddMovieDetails() {
  console.log('\n==== Add New Movie ====');
  rl.question('Title: ', (title) => {
    rl.question('Director: ', (director) => {
      rl.question('Release Year: ', (releaseYear) => {
        rl.question('Genre: ', (genre) => {
          movieManager.addMovie(title, director, releaseYear, genre);
          console.log('Movie added successfully!');
          displayMenu();
        });
      });
    });
  });
}

function promptUpdateMovie() {
  console.log('\n==== Update Movie ====');
  movieManager.displayCatalog();
  rl.question('Enter the index of the movie to update: ', (index) => {
    const movieCount = movieManager.getMovieCount();
    if (isNaN(index) || index < 0 || index >= movieCount) {
      console.log('Invalid movie index. Please try again.');
      promptUpdateMovie();
    } else {
      const validIndex = parseInt(index);
      rl.question('Enter the updated title (leave blank to keep existing): ', (title) => {
        rl.question('Enter the updated director (leave blank to keep existing): ', (director) => {
          rl.question('Enter the updated release year (leave blank to keep existing): ', (releaseYear) => {
            rl.question('Enter the updated genre (leave blank to keep existing): ', (genre) => {
              movieManager.updateMovie(validIndex, title, director, releaseYear, genre);
              console.log('Movie updated successfully!');
              displayMenu();
            });
          });
        });
      });
    }
  });
}


function promptDeleteMovie() {
  console.log('\n==== Delete Movie ====');
  movieManager.displayCatalog();
  rl.question('Enter the index of the movie to delete: ', (index) => {
    if (isNaN(index) || index < 0 || index >= movieManager.getMovieCount()) {
      console.log('Invalid movie index. Please try again.');
      promptDeleteMovie();
    } else {
      movieManager.deleteMovie(index);
      console.log('Movie deleted successfully!');
      displayMenu();
    }
  });
}

function promptSearchAndFilter() {
  console.log('\n==== Search and Filter ====');
  console.log('1. Search by Title');
  console.log('2. Search by Director');
  console.log('3. Filter by Genre');
  console.log('4. Filter by Release Year');
  console.log('0. Go back');
  rl.question('Enter your choice: ', (choice) => {
    switch (choice) {
      case '0':
        displayMenu();
        break;
      case '1':
        promptSearchByTitle();
        break;
      case '2':
        promptSearchByDirector();
        break;
      case '3':
        promptFilterByGenre();
        break;
      case '4':
        promptFilterByReleaseYear();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        promptSearchAndFilter();
    }
  });
}

function promptSearchByTitle() {
  console.log('\n==== Search by Title ====');
  rl.question('Enter the movie title: ', (title) => {
    const results = movieManager.searchByTitle(title);
    displaySearchResults(results);
    promptSearchAndFilter();
  });
}

function promptSearchByDirector() {
  console.log('\n==== Search by Director ====');
  rl.question('Enter the movie director: ', (director) => {
    const results = movieManager.searchByDirector(director);
    displaySearchResults(results);
    promptSearchAndFilter();
  });
}

function promptFilterByGenre() {
  console.log('\n==== Filter by Genre ====');
  rl.question('Enter the genre: ', (genre) => {
    const results = movieManager.filterByGenre(genre);
    displaySearchResults(results);
    promptSearchAndFilter();
  });
}

function promptFilterByReleaseYear() {
  console.log('\n==== Filter by Release Year ====');
  rl.question('Enter the release year: ', (releaseYear) => {
    const results = movieManager.filterByReleaseYear(releaseYear);
    displaySearchResults(results);
    promptSearchAndFilter();
  });
}

function displaySearchResults(results) {
  console.log('\n==== Search Results ====');
  if (results.length === 0) {
    console.log('No movies found.');
  } else {
    results.forEach((movie) => {
      console.log(`${movie.title} (${movie.director}, ${movie.releaseYear}, ${movie.genre})`);
    });
  }
  console.log('========================');
}

function promptFetchMovieData() {
  console.log('\n==== Fetch Movie Data ====');
  rl.question('Enter the movie title: ', async (title) => {
    try {
      const movieData = await movieManager.fetchMovieData(title);
      console.log('\n==== Movie Data ====');
      console.log('Title:', movieData.title);
      console.log('Director:', movieData.director);
      console.log('Release Year:', movieData.releaseYear);
      console.log('Genre:', movieData.genre);
      console.log('Plot:', movieData.plot);
      console.log('Ratings:', movieData.ratings.join(', '));
      console.log('=====================');
      displayMenu();
    } catch (error) {
      console.log('Error fetching movie data:', error.message);
      displayMenu();
    }
  });
}

function startApp() {
  console.log('Welcome to the Movie Catalog CLI Application!');
  displayMenu();
}

startApp();
