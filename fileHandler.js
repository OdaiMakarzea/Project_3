const fs = require('fs');

function readMovieCatalog() {
  try {
    const catalogData = fs.readFileSync('movies.json', 'utf8');
    return JSON.parse(catalogData);
  } catch (error) {
    console.log('Error reading movie catalog:', error.message);
    return [];
  }
}

function writeMovieCatalog(catalog) {
  try {
    fs.writeFileSync('movies.json', JSON.stringify(catalog, null, 2), 'utf8');
  } catch (error) {
    console.log('Error writing movie catalog:', error.message);
  }
}

module.exports = {
  readMovieCatalog,
  writeMovieCatalog,
};
