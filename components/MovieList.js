import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const MovieList = (props) => {
  const listItems = props.movies.map((movie) => 
    <ListItem
      key={movie._id}
      sx={{boxShadow:2,margin:3,borderRadius:2,maxWidth:300}}
    >
      <ListItemText
        onClick={clickHandler.bind(this, movie)}
        primary={movie.Film}
        secondary=''
      />
    </ListItem>
  )

  return (
    <Box>
      <List dense={false}>
      {listItems}

      </List>
    </Box>
  )

  function clickHandler(movie) {
    props.setInfoOpen(true)
    props.setInfoData(movie)
  }
}

export default MovieList