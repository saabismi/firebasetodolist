// @ts-nocheck
import React, {useState, useEffect} from "react";
import { AgGridReact } from 'ag-grid-react';
import {AppBar, Toolbar, Typography, IconButton} from "@mui/material";
import AddBook from "./AddBook.js";
import AgGridColumn from "ag-grid-react/lib/shared/agGridColumn.js";

import './App.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import DeleteIcon from "@mui/icons-material/Delete";

function App() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch('https://bookstore-597f8-default-rtdb.europe-west1.firebasedatabase.app/books/.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) =>
    Object.defineProperty(item, "id", {value: keys[index]}));
    setBooks(valueKeys);
  }

  const addBook = (newBook) => {
    fetch("https://bookstore-597f8-default-rtdb.europe-west1.firebasedatabase.app/books/.json",
    {
      method: "POST",
      body: JSON.stringify(newBook)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const deleteBook = (id) => {
    fetch(`https://bookstore-597f8-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
    {
      method: "DELETE",
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }


  return (
    <div className="App">
      <AppBar position="static"><Toolbar><Typography variant="h5">Bookstore database</Typography></Toolbar></AppBar>

      <div style={ {marginTop: "1em"}}>
        <AddBook addBook={addBook} />
      </div>

      <div className="ag-theme-material" style={ {height: 400, width: "80%", minWidth: 700, margin: 'auto', marginTop: "1em" } }>
        <AgGridReact rowData={books} animateRows={true}>
          <AgGridColumn sortable={true} filter={true} field='author' />
          <AgGridColumn sortable={true} filter={true} field='isbn' />
          <AgGridColumn sortable={true} filter={true} field='price' />
          <AgGridColumn sortable={true} filter={true} field='title' width="250px" />
          <AgGridColumn sortable={true} filter={true} field='year' />
          <AgGridColumn 
            headerName=''
            field='id' 
            width={90}
            cellRenderer={ params => 
              <IconButton onClick={() => deleteBook(params.value)} size="small" color="error">
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
