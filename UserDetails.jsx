import React, { useState, useEffect } from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  // TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const useStyles = makeStyles({
  userDetails: {
    width: '50%',
    marginLeft: '20px',
  },
  table: {
    width: 550,
  },
  prompt:{
    textAlign:'center',
    paddingTop: '20%'
  }
});

function UserDetails({ todo }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (todo) {
      fetch(`https://jsonplaceholder.typicode.com/users/${todo.userId}`)
        .then(response => response.json())
        .then(data => setUser(data));
    }
  }, [todo]);

  const classes = useStyles();

  return (
    <div className={classes.userDetails}>
      {user ? (
        <>
        <h1>User Details</h1>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="user details table">
            <TableBody>
            <TableRow>
                  <TableCell>ToDo ID</TableCell>
                  <TableCell>{todo.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ToDo Title</TableCell>
                  <TableCell>{todo.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>{todo.userId}</TableCell>
                </TableRow>
               <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>{user.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        </>
      ) : (
        <Typography className={classes.prompt}variant="h6">Select a todo to see user details</Typography>
      )}
    </div>
  );
}
export default withStyles(useStyles, { withTheme: true })(UserDetails);