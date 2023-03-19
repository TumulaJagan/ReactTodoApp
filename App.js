import React, { useState } from 'react';
import TodoList from './components/TodoList';
import UserDetails from './components/UserDetails';
import { makeStyles,withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    margin: '50px 20px',
  },
  todoList:{
   height:'900px'
  }
});

function App() {
  const [selectedTodo, setSelectedTodo] = useState(null);
   
  const handleTodoClick = (todo) => {
        setSelectedTodo(todo);
      }

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TodoList onTodoClick={handleTodoClick} className={classes.todoList} />
      <UserDetails todo={selectedTodo} />
    </div>
  );
}

export default withStyles(useStyles, { withTheme: true })(App);