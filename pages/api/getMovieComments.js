import { findCollectionDoc } from '../../utils/mongodb.js'

export default async function handler(req, res) {
  const movieId = req.query.movieId

  try {
    const comments = await findCollectionDoc('comments', { movieId }, false)
  
    res.status(200).json(JSON.parse(JSON.stringify(comments)))
  } catch (e) {
    console.log('getMovieComments failed with error', e)
    res.status(500).json({ error: e.toString()})
  }
}