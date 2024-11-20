/** @format */

import WatchedMovie from "./WatchedMovie";

export default function WatchedMoviesList({ watched, odDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          odDeleteWatched={odDeleteWatched}
        />
      ))}
    </ul>
  );
}
