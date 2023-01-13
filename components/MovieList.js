const MovieList = (props) => {
  const listItems = props.movies.map((movie) => 
    <li key={movie._id} onClick={clickHandler.bind(this, movie)}><a href="#">{movie.Film}</a></li>
  );

  return (
    <ul>{listItems}</ul>
  );

  function clickHandler(movie) {
    props.setInfoOpen(true)
    props.setInfoData(movie)
  }
}

export default MovieList