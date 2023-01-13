import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';

const CommentList = (props) => {
  const commentItems = props.comments.map((comment) => 
    <ListItem key={comment._id}>
      <ListItemText primary={comment.comment} secondary={comment.user} />
    </ListItem>
  );

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {commentItems}
    </List>
  );
}

export default CommentList