// @ts-nocheck
import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import {AppBar, Toolbar, Typography, IconButton} from "@mui/material";
import AddTodo from "./AddTodo.js";
import AgGridColumn from "ag-grid-react/lib/shared/agGridColumn.js";

import './App.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from "@mui/icons-material/Delete";

function App() {

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://fiteap-123-default-rtdb.europe-west1.firebasedatabase.app/items/.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
    Object.defineProperty(item, "id", {value: keys[index]}));
    setTodos(valueKeys);
  }

  const addTodo = (newTodo) => {
    fetch("https://fiteap-123-default-rtdb.europe-west1.firebasedatabase.app/items/.json",
    {
      method: "POST",
      body: JSON.stringify(newTodo)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const deleteTodo = (id) => {
    fetch(`https://fiteap-123-default-rtdb.europe-west1.firebasedatabase.app/items/${id}.json`,
    {
      method: "DELETE",
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }


  return (
    <div className="App">
      <AppBar position="static"><Toolbar><Typography variant="h5">Todolist with Firebase</Typography></Toolbar></AppBar>

      <div style={ {marginTop: "1em"}}>
        <AddTodo addTodo={addTodo} />
      </div>

      <div className="ag-theme-material" style={ {height: 400, width: "70%", minWidth: 600, margin: 'auto', marginTop: "1em" } }>
        <AgGridReact rowData={todos} animateRows={true}>
          <AgGridColumn sortable={true} filter={true} field='description' />
          <AgGridColumn sortable={true} filter={true} field='date' />
          <AgGridColumn sortable={true} filter={true} field='priority' />
          <AgGridColumn 
            headerName=''
            field='id' 
            width={90}
            cellRenderer={ params => 
              <IconButton onClick={() => deleteTodo(params.value)} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            }
          />      
        </AgGridReact>
      </div>

    </div>
  );
}

export default App;
