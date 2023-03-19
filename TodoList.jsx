import React, { useState, useEffect } from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Typography

} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    margin: '50px 0',
  },
  todoList: {
    width: '50%',
    marginRight: '20px',
  },
  table: {
    width: 600,
  },
  selectedTableRow: {
    backgroundColor: '#eee',
    cursor: 'pointer',
  },
  tHead:{
    background: '#5865F2'
  },
  headingContainer:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
  },
  textField:{
    marginBottom: '2px'
    
  }
});

function TodoList({ onTodoClick }) {
  const [todos, setTodos] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(data => setTodos(data));
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  }

  const filteredTodos = todos.filter(todo =>
    searchText === '' ||
    todo.id.toString().includes(searchText) ||
    todo.title.includes(searchText) ||
    (todo.completed ? 'Completed' : 'Incomplete').toLowerCase().includes(searchText.toLowerCase())
  );


  const classes = useStyles();

  return (
    <div className={classes.todoList}>
      <div className={classes.headingContainer}>
        <Grid>
          <Typography variant='h5'>ToDos</Typography>
        </Grid>
        <Grid>
        <TextField
        placeholder="🔍Search for user"
        className={classes.textField}
        variant='outlined'
        value={searchText}
        onChange={handleSearchChange}
        />
        </Grid>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="todo table">
          <TableHead className={classes.tHead}>
            <TableRow>
              <TableCell><Typography variant='h6'>ID</Typography></TableCell>
              <TableCell><Typography variant='h6'>Title</Typography></TableCell>
              <TableCell><Typography variant='h6'>Status</Typography></TableCell>
              <TableCell><Typography variant='h6'>Action</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTodos.length>0?filteredTodos.map(todo => (
              <TableRow
                key={todo.id}
                
                className={classes.selectedTableRow}
              >
                <TableCell>{todo.id}</TableCell>
                <TableCell>{todo.title}</TableCell>
                <TableCell>{todo.completed ? 'Completed' : 'Incomplete'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary"onClick={() => onTodoClick(todo)} >
                    View User
                  </Button>
                </TableCell>
              </TableRow>
            )):<TableRow><TableCell>No data found</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default withStyles(useStyles, { withTheme: true })(TodoList);