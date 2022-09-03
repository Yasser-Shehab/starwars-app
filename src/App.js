import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import useHttp from "./hooks/use-http";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  // const {sendRequest : addMovie} = useHttp({url:'https://react-http-c6eb2-default-rtdb.europe-west1.firebasedatabase.app/movies.json'})

  const transformTasks = useCallback((tasksObj) => {
    const loadedMovies = [];

    for (const key in tasksObj) {
      loadedMovies.push({
        id: key,
        title: tasksObj[key].title,
        openingText: tasksObj[key].openingText,
      });
    }

    setMovies(loadedMovies);
  }, []);
  const { isLoading, error, sendRequest: fetchMovies } = useHttp(transformTasks);

  useEffect(() => {
    fetchMovies({
      url: "https://react-http-c6eb2-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
    });
  }, []);

  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://react-http-c6eb2-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
