import { findCollectionDoc } from '../utils/mongodb.js'

const getMovieList = async () => {
  try {
    let movies = await findCollectionDoc("movies", {}, false)

    /*movies.map((data) => {
      data._id = data._id.toString()
    })*/

    return JSON.parse(JSON.stringify(movies))
  } catch (e) {
    console.log("get movie data failed with error", e)
  }
}

export { getMovieList }