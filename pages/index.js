import { Box } from '@mui/system'
import React, { useState } from 'react'

import InfoDialog from '../components/InfoDialog'
import MovieList from '../components/MovieList'
import TitleBar from '../components/TitleBar'

import { getMovieList } from '../controllers/movie.js'

export async function getServerSideProps() {
  let movies = await getMovieList()
  return { props: { movies } }
}

function Home(props) {
  const [ movies, setMovies ] = useState(props.movies)
  const [ infoOpen, setInfoOpen ] = useState(false)
  const [ infoData, setInfoData ] = useState({})

  function setSearch(keyWord) {
    setMovies(props.movies.filter((movie) => {
      return movie.Film.toLowerCase().includes(keyWord)
    }))
  }

  function handleClose() {
    setInfoOpen(false)
  }

  return (
    <>
      <Box sx={{background:'white'}}>
        <TitleBar setSearch={setSearch}></TitleBar>
        <MovieList movies={movies} setInfoOpen={setInfoOpen} setInfoData={setInfoData}></MovieList>
        <InfoDialog handleClose={handleClose} infoData={infoData} infoOpen={infoOpen}></InfoDialog>
      </Box>
    </>
  )
}

export default Home