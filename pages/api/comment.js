import { insertCollectionDoc } from '../../utils/mongodb.js'

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user, comment, movieId } = req.body

    try {
      const commentId = await insertCollectionDoc("comments", { user, comment, movieId })
    
      res.status(200).json({ error: null, id: commentId })
    } catch (e) {
      console.log("add comment failed with error", e)
      res.status(500).json({ error: e.toString()})
    }
  } else {
    res.status(404).json();
  }
}