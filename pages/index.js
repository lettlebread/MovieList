import React, { useState } from "react";

import InfoDialog from '../components/InfoDialog'
import MovieList from "../components/MovieList";

import { getMovieList } from '../controllers/movie.js'

export async function getServerSideProps() {
  let movies = await getMovieList()
  return { props: { movies: JSON.parse(JSON.stringify(movies)) } };
}

function Home(props) {
  const [movies, setMovies] = useState(props.movies)
  const [infoOpen, setInfoOpen] = useState(false)
  const [infoData, setInfoData] = useState({
    Film: '',
    Genre: ''
  })


  function setSearch(keyWord) {
    setMovies(props.movies.filter((movie) => {
      return movie.Film.includes(keyWord)
    }))
  }

  function handleClose() {
    setInfoOpen(false)
  }

  return (
    <>
      <h1>Movies</h1>
      <div>
        <input onChange={(e)=>setSearch(e.target.value)}></input>
      </div>
      <div>
        <MovieList movies={movies} setInfoOpen={setInfoOpen} setInfoData={setInfoData}></MovieList>
      </div>
      <div>
        <InfoDialog handleClose={handleClose} infoData={infoData} infoOpen={infoOpen}></InfoDialog>
      </div>
    </>
  )
}

export default Home