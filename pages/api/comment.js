import { insertCollectionDoc } from '../../utils/mongodb.js'
import { isString } from '../../utils/stringChecker'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user, comment, movieId } = req.body

    if (!isString(user) ||
      !isString(comment) ||
      !isString(movieId)
    ) {
      res.status(400).json({
        error: 'invalid arguments'
      });
      return
    }

    try {
      const commentId = await insertCollectionDoc('comments', { user, comment, movieId })
    
      res.status(200).json({ error: null, id: commentId })
    } catch (e) {
      console.log('add comment failed with error', e)
      res.status(500).json({ error: e.toString()})
    }
  } else {
    res.status(404).json();
  }
}