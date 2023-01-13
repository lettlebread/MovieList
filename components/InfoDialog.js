import React, { useState, useRef, useEffect } from "react";

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import CommentList from './CommentList'

import axios from 'axios'

const InfoDialog = (props) => {
    const { infoOpen, infoData, handleClose } = props
    const [comments, setComments] = useState([]);
    const firstUpdate  = useRef(true);
    const [disableBtn, setDisableBtn] = useState(true)
    const [userName, setUserName] = useState('')
    const [commentText, setCommentText] = useState('')
  
    useEffect(() => {
      try {
        if(firstUpdate.current) {
          firstUpdate.current = false
        } else {
          axios.get('/api/getMovieComments', { params: { movieId: infoData._id }}).then((res) => {
            console.log("res", res)
            setComments(res.data)
          })
  
        }
  
      } catch (e) {
        console.log("err", e)
      }
  
      return () => {
        setComments([])
        setUserName("")
        setCommentText("")
      }
    }, [infoData]);
  
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
        setUserName("")
        setCommentText("")
      })
    }
  
    return (
      <Dialog open={infoOpen} onClose={handleClose}>
      <DialogTitle>{infoData.Film}</DialogTitle>
      <DialogContent>
        <div>
          <span>Gerne:</span><span>{infoData.Genre}</span>
        </div>
        <div>
          <span>Studio:</span><span>{infoData["Lead Studio"]}</span>
        </div>
        <div>
          <span>User Rating:</span><span>{infoData["Audience score %"]}%</span>
        </div>
        <div>
          <span>Profitability:</span><span>{Math.round(infoData.Profitability * 10) / 10}</span>
        </div>
        <div>
          <span>Rotten Tomatoes Rating:</span><span>{infoData["Rotten Tomatoes %"]}%</span>
        </div>
        <div>
          <span>Worldwide Gross:</span><span>{infoData["Worldwide Gross"]}</span>
        </div>
        <div>
          <span>Year Release:</span><span>{infoData.Year}</span>
        </div>
        <Divider />
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="User"
          type="text"
          fullWidth
          variant="standard"
          value={userName}
          onChange={(e)=>setUserName(e.target.value)}
        />      
        <TextField
          margin="dense"
          id="name"
          label="comment"
          type="text"
          fullWidth
          variant="standard"
          value={commentText}
          onChange={(e)=>setCommentText(e.target.value)}
        />
        <Button variant="contained" disabled={disableBtn} onClick={handleAddComment}>add commeent</Button>
        <CommentList comments={comments}></CommentList>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
    )
  }

export default InfoDialog
