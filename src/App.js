import React, { useState, useEffect } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import useHttp from "./hooks/use-http";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  // const {sendRequest : addMovie} = useHttp({url:'https://react-http-c6eb2-default-rtdb.europe-west1.firebasedatabase.app/movies.json'})

  const { isLoading, error, sendRequest: fetchMovies } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedMovies = [];

      for (const key in tasksObj) {
        loadedMovies.push({
          id: key,
          title: tasksObj[key].title,
          openingText: tasksObj[key].openingText,
        });
      }
      setMovies(loadedMovies);
    };

    fetchMovies(
      {
        url: "https://react-http-c6eb2-default-rtdb.europe-west1.firebasedatabase.app/movies.json",
      },
      transformTasks
    );
  }, []);

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
        <AddMovie />
      </section>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
