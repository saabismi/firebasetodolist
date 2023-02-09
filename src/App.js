import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import {AppBar, Toolbar, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";

import './App.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://fiteap-123-default-rtdb.europe-west1.firebasedatabase.app/items/.json')
    .then(response => response.json())
    .then(data => setTodos(Object.values(data)))
    .catch(err => console.error(err))
  }

  const columnDefs = [
    {field:"description", sortable:true, filter:true, suppressMovable:true},
    {field:"date", sortable:true, filter:true, suppressMovable:true},
    {field:"priority", sortable:true, filter:true, suppressMovable:true},
  ]

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className="App">

      <AppBar position="static"><Toolbar><Typography variant="h5">Todolist with Firebase</Typography></Toolbar></AppBar>

      <div className="ag-theme-material" style={ {height: 400, width: "70%", minWidth: 600, margin: 'auto', marginTop: "1em" } }>
        <AgGridReact rowData={todos} columnDefs={columnDefs} animateRows={true} />
      </div>

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add a new task
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add task info</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" id="description" label="Description" type="text" />
          <TextField margin="dense" id="date" label="Date" type="text" />
          <TextField margin="dense" id="priority" label="Urgency level" type="text" />
          <DialogActions>
            <Button color="primary" variant="contained" onClick={handleClose}>Cancel</Button>
            <Button color="primary" variant="contained" onClick={handleClose}>Save</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default App;
