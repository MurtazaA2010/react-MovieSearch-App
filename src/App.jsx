import { useState, useEffect } from "react";
import './App.css'
import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=b169cf0";

function App() {
  const [movies, setMovies] = useState([])
  const [serachTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    let apiUrl = API_URL;
  
    if (title) {
      apiUrl = `${API_URL}&s=${title}`;
    } else {
      // Add logic to generate a random search query
      const randomSearchQuery = "random"; // You can replace this with your logic
      apiUrl = `${API_URL}&s=${randomSearchQuery}`;
    }
  
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies();
  }, []);


  return (
    <>
      <div className="app">
        <h1>Movie Home</h1>

        <div className="search">
          <input placeholder="Search for movies"
            value={serachTerm}
            onChange={(e) => setSearchTerm(e.target.value)} />

          <img src={SearchIcon} alt="search" onClick={() => searchMovies(serachTerm)} />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />

            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}

      </div>
    </>
  )
}

export default App
