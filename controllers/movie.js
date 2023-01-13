import { findCollectionDoc } from '../utils/mongodb.js'

const getMovieList = async () => {
  try {
    let movies = await findCollectionDoc('movies', {}, false)

    return JSON.parse(JSON.stringify(movies))
  } catch (e) {
    console.log('get movie data failed with error', e)
    return []
  }
}

export { getMovieList }