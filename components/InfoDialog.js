import React, { useState, useRef, useEffect } from 'react'

import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import CommentList from './CommentList'
import DialogContentText from '@mui/material/DialogContentText'

import axios from 'axios'
import { Box } from '@mui/system'

const InfoDialog = (props) => {
  const { infoOpen, infoData, handleClose } = props
  const [ comments, setComments ] = useState([])
  const firstUpdate  = useRef(true)
  const [ disableBtn, setDisableBtn ] = useState(true)
  const [ userName, setUserName ] = useState('')
  const [ commentText, setCommentText ] = useState('')
  
  useEffect(() => {
    try {
      if(firstUpdate.current) {
        firstUpdate.current = false
      } else {
        axios.get('/api/getMovieComments', { params: { movieId: infoData._id }}).then((res) => {
          console.log('res', res)
          setComments(res.data)
        })
      }
    } catch (e) {
      console.log('err', e)
    }

    return () => {
      setComments([])
      setUserName('')
      setCommentText('')
    }
  }, [infoData])

  useEffect(() => {
    if (userName === '' || commentText == '') {
      setDisableBtn(true)
    } else {
      setDisableBtn(false)
    }
  }, [userName, commentText])

  async function handleAddComment() {
    let data = {
      user: userName,
      comment: commentText,
      movieId: infoData._id
    }
    axios.post('/api/comment', data).then((res) => {
      data._id = res.data.id
      setComments([...comments, data])
      setUserName('')
      setCommentText('')
    })
  }

  return (
    <Box>
      <Dialog open={infoOpen} onClose={handleClose}>
        <DialogTitle>{infoData.Film}</DialogTitle>
        <Divider />
        <DialogContent sx={{'overflow-y':'unset'}}>
          <DialogContentText>
            <div>
              <Typography display='inline'>Gerne:</Typography><Typography display='inline' sx={{color:'black'}}>{infoData.Genre}</Typography>
            </div>
            <div>
              <Typography display='inline'>Studio:</Typography><Typography display='inline' sx={{color:'black'}}>{infoData['Lead Studio']}</Typography>
            </div>
            <div>
              <Typography display='inline'>User Rating:</Typography><Typography display='inline' sx={{color:'black'}}>{infoData['Audience score %']}%</Typography>
            </div>
            <div>
              <Typography display='inline'>Profitability:</Typography><Typography display='inline' sx={{color:'black'}}>{Math.round(infoData.Profitability * 10) / 10}</Typography>
            </div>
            <div>
              <Typography display='inline'>Rotten Tomatoes Rating:</Typography><Typography display='inline' sx={{color:'black'}}>{infoData['Rotten Tomatoes %']}%</Typography>
            </div>
            <div>
              <Typography display='inline'>Worldwide Gross:</Typography><Typography display='inline' sx={{color:'black'}}>{infoData['Worldwide Gross']}</Typography>
            </div>
            <div>
              <Typography display='inline'>Year Release:</Typography><Typography display='inline' sx={{color:'black'}}>{infoData.Year}</Typography>
            </div>
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogContent>
          <Typography variant='h6' gutterBottom>
            Comments
          </Typography>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='User'
            type='text'
            fullWidth
            variant='standard'
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
          />
          <TextField
            margin='dense'
            id='name'
            label='comment'
            type='text'
            fullWidth
            variant='standard'
            value={commentText}
            onChange={(e)=>setCommentText(e.target.value)}
          />
          <Button variant='contained' disabled={disableBtn} onClick={handleAddComment}>add commeent</Button>
          <CommentList comments={comments}></CommentList>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default InfoDialog
