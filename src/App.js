/** @format */

import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Main from "./components/Main";
import Box from "./components/Box";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import SelectedMovie from "./components/SelectedMovie";
import StarRating from "./components/StarRating";
import WatchedMoviesList from "./components/WatchedMoviesList";

const KEY = "77664bd9";

export default function App() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedID, setSelectedID] = useState(null);
  const [watched, setWatched] = useState([]);

  function handleSelecteMovie(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function handleCloseMovie() {
    setSelectedID(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
          if (!res.ok) throw new Error("Something went wrong with fetching movies.");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movi not found.");

          console.log(data.Search);
          setMovies(data.Search);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelecteMovie} />
          )}
        </Box>
        <Box>
          {selectedID ? (
            <SelectedMovie selectedID={selectedID} onCloseMovie={handleCloseMovie} />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />{" "}
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
